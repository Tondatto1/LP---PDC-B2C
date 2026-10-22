export interface PartnerConfig {
  id: string; // Identificador da URL (slug, ex: 'agroforte', 'parceiro1', 'carlos')
  name: string; // Nome visível do parceiro ou empresa
  message: string; // Mensagem pré-definida do WhatsApp para este parceiro
  phone?: string; // Telefone específico (opcional, padrão: 5567999034874)
  tag?: string; // Categoria ou observação opcional
  createdAt?: string;
}

export interface ActivePartnerState {
  id: string;
  name: string;
  message: string;
  phone: string;
  isPartner: boolean;
  whatsappUrl: string;
}

export const DEFAULT_WHATSAPP_PHONE = '5567999034874';
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá, gostaria de fazer parte da turma 33 do Campeão em Vendas.';

// Construtor oficial da mensagem padronizada de indicação de parceiro
export function buildPartnerDefaultMessage(identifier: string): string {
  return `Olá, venho através da indicação do(a) ${identifier}, e gostaria de saber mais sobre o Campeão em Vendas - turma 33?`;
}

const STORAGE_CUSTOM_PARTNERS_KEY = 'agro_custom_partners_list';
const STORAGE_ACTIVE_PARTNER_KEY = 'agro_active_partner_info';

// Lista de parceiros pré-configurados padrão com a mensagem oficial
export const INITIAL_PARTNERS: PartnerConfig[] = [
  {
    id: 'agroforte',
    name: 'AgroForte Consultoria',
    message: buildPartnerDefaultMessage('AgroForte Consultoria'),
    phone: DEFAULT_WHATSAPP_PHONE,
    tag: 'Consultoria Parceira'
  },
  {
    id: 'cooperativa',
    name: 'Cooperativa Agro',
    message: buildPartnerDefaultMessage('Cooperativa Agro'),
    phone: DEFAULT_WHATSAPP_PHONE,
    tag: 'Cooperativa'
  },
  {
    id: 'consultor-sul',
    name: 'Consultoria Sul Agronegócios',
    message: buildPartnerDefaultMessage('Consultoria Sul Agronegócios'),
    phone: DEFAULT_WHATSAPP_PHONE,
    tag: 'Parceiro Regional'
  }
];

// Utilitário para formatar slugs em nomes legíveis (ex: 'marcos-silva' -> 'Marcos Silva')
export function formatSlugToName(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Obter parceiros cadastrados (iniciais + customizados no localStorage)
export function getAllPartners(): PartnerConfig[] {
  try {
    const stored = localStorage.getItem(STORAGE_CUSTOM_PARTNERS_KEY);
    const custom: PartnerConfig[] = stored ? JSON.parse(stored) : [];
    
    // Evita duplicatas de ID mantendo os customizados por último
    const map = new Map<string, PartnerConfig>();
    INITIAL_PARTNERS.forEach(p => map.set(p.id.toLowerCase(), p));
    custom.forEach(p => map.set(p.id.toLowerCase(), p));
    
    return Array.from(map.values());
  } catch {
    return INITIAL_PARTNERS;
  }
}

// Salvar um novo parceiro personalizado
export function savePartner(partner: Omit<PartnerConfig, 'createdAt'> & { createdAt?: string }): PartnerConfig {
  const cleanId = partner.id
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-_]/g, '-');

  const newPartner: PartnerConfig = {
    ...partner,
    id: cleanId,
    name: partner.name.trim(),
    message: partner.message.trim(),
    phone: partner.phone?.replace(/\D/g, '') || DEFAULT_WHATSAPP_PHONE,
    createdAt: partner.createdAt || new Date().toISOString()
  };

  try {
    const existing = getAllPartners();
    const updated = existing.filter(p => p.id.toLowerCase() !== cleanId);
    updated.push(newPartner);
    localStorage.setItem(STORAGE_CUSTOM_PARTNERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  return newPartner;
}

// Deletar um parceiro personalizado
export function deletePartner(id: string): void {
  try {
    const stored = localStorage.getItem(STORAGE_CUSTOM_PARTNERS_KEY);
    if (stored) {
      const custom: PartnerConfig[] = JSON.parse(stored);
      const filtered = custom.filter(p => p.id.toLowerCase() !== id.toLowerCase());
      localStorage.setItem(STORAGE_CUSTOM_PARTNERS_KEY, JSON.stringify(filtered));
    }
  } catch {
    // ignore
  }
}

// Montar a URL completa do WhatsApp
export function buildWhatsAppUrl(phone: string = DEFAULT_WHATSAPP_PHONE, message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Detectar o parceiro atual a partir da URL ou da sessão anterior
export function detectActivePartner(): ActivePartnerState {
  if (typeof window === 'undefined') {
    return {
      id: '',
      name: '',
      message: DEFAULT_WHATSAPP_MESSAGE,
      phone: DEFAULT_WHATSAPP_PHONE,
      isPartner: false,
      whatsappUrl: buildWhatsAppUrl(DEFAULT_WHATSAPP_PHONE, DEFAULT_WHATSAPP_MESSAGE)
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  
  // Parâmetros aceitos na URL para identificar o parceiro
  const partnerParam = 
    urlParams.get('parceiro') ||
    urlParams.get('ref') ||
    urlParams.get('p') ||
    urlParams.get('partner') ||
    urlParams.get('utm_source');

  // Parâmetro opcional de mensagem personalizada direta via URL (ex: &msg=...)
  const directMessageParam = urlParams.get('msg') || urlParams.get('mensagem');

  // Se veio parâmetro na URL
  if (partnerParam && partnerParam.trim() !== '') {
    const rawId = partnerParam.trim().toLowerCase();
    const allPartners = getAllPartners();
    const matched = allPartners.find(p => p.id.toLowerCase() === rawId);

    if (matched) {
      // Parceiro já cadastrado
      const finalMessage = directMessageParam || matched.message;
      const finalPhone = matched.phone || DEFAULT_WHATSAPP_PHONE;

      const state: ActivePartnerState = {
        id: matched.id,
        name: matched.name,
        message: finalMessage,
        phone: finalPhone,
        isPartner: true,
        whatsappUrl: buildWhatsAppUrl(finalPhone, finalMessage)
      };

      try {
        sessionStorage.setItem(STORAGE_ACTIVE_PARTNER_KEY, JSON.stringify(state));
        localStorage.setItem(STORAGE_ACTIVE_PARTNER_KEY, JSON.stringify(state));
      } catch {}

      return state;
    } else {
      // Parceiro dinâmico (não cadastrado antes, mas informado na URL, ex: ?ref=joao)
      const formattedName = formatSlugToName(partnerParam);
      const identifierLabel = formattedName || partnerParam;
      const dynamicMessage = directMessageParam || buildPartnerDefaultMessage(identifierLabel);

      const state: ActivePartnerState = {
        id: rawId,
        name: identifierLabel,
        message: dynamicMessage,
        phone: DEFAULT_WHATSAPP_PHONE,
        isPartner: true,
        whatsappUrl: buildWhatsAppUrl(DEFAULT_WHATSAPP_PHONE, dynamicMessage)
      };

      try {
        sessionStorage.setItem(STORAGE_ACTIVE_PARTNER_KEY, JSON.stringify(state));
        localStorage.setItem(STORAGE_ACTIVE_PARTNER_KEY, JSON.stringify(state));
      } catch {}

      return state;
    }
  }

  // Se não tem na URL, tenta recuperar de sessão anterior para não perder atribuição
  try {
    const saved = sessionStorage.getItem(STORAGE_ACTIVE_PARTNER_KEY) || localStorage.getItem(STORAGE_ACTIVE_PARTNER_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.isPartner) {
        return {
          ...parsed,
          whatsappUrl: buildWhatsAppUrl(parsed.phone || DEFAULT_WHATSAPP_PHONE, parsed.message)
        };
      }
    }
  } catch {}

  // Padrão sem parceiro
  return {
    id: '',
    name: '',
    message: DEFAULT_WHATSAPP_MESSAGE,
    phone: DEFAULT_WHATSAPP_PHONE,
    isPartner: false,
    whatsappUrl: buildWhatsAppUrl(DEFAULT_WHATSAPP_PHONE, DEFAULT_WHATSAPP_MESSAGE)
  };
}

// Gerar link compartilhável para um parceiro
export function generatePartnerLink(partnerId: string, customMessage?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://seusite.com';
  const cleanId = encodeURIComponent(partnerId.toLowerCase().trim());
  let url = `${origin}?ref=${cleanId}`;
  
  if (customMessage && customMessage.trim() !== '') {
    url += `&msg=${encodeURIComponent(customMessage.trim())}`;
  }
  
  return url;
}
