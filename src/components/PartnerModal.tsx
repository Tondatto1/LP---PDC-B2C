import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Plus, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Link as LinkIcon,
  Trash2,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { usePartner } from '../context/PartnerContext';
import { 
  generatePartnerLink, 
  buildWhatsAppUrl, 
  DEFAULT_WHATSAPP_PHONE,
  buildPartnerDefaultMessage
} from '../services/partnerService';

export const PartnerModal: React.FC = () => {
  const { 
    isPartnerModalOpen, 
    closePartnerModal, 
    partnersList, 
    addNewPartner, 
    removePartner, 
    copyToClipboard 
  } = usePartner();

  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newPhone, setNewPhone] = useState(DEFAULT_WHATSAPP_PHONE);
  const [formSuccess, setFormSuccess] = useState(false);

  if (!isPartnerModalOpen) return null;

  const handleCopyLink = async (partnerId: string, customMsg?: string) => {
    const url = generatePartnerLink(partnerId, customMsg);
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedId(partnerId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId.trim() || !newName.trim()) return;

    const messageToSave = newMessage.trim() || 
      buildPartnerDefaultMessage(newName.trim());

    addNewPartner({
      id: newId,
      name: newName,
      message: messageToSave,
      phone: newPhone || DEFAULT_WHATSAPP_PHONE,
      tag: 'Parceiro'
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('list');
      setNewId('');
      setNewName('');
      setNewMessage('');
    }, 1200);
  };

  const livePreviewUrl = generatePartnerLink(newId || 'nome-do-parceiro');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white relative shrink-0">
          <button 
            onClick={closePartnerModal}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestão de Links & Parcerias</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Links Personalizados para Parceiros
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
            Gere URLs com identificador exclusivo e mensagens personalizadas para cada parceiro ou afiliado.
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5 border-b border-white/10">
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 ${
                activeTab === 'list'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Parceiros Cadastrados ({partnersList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 ${
                activeTab === 'create'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Gerar Novo Link de Parceiro</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'list' ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Como funciona:</strong> Quando o visitante entra com o link do parceiro (ex: <code className="bg-emerald-100/90 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold text-xs">?ref=parceiro</code>), o site reconhece o parceiro e direciona os botões do WhatsApp com a mensagem pré-definida exclusiva dele.
                </div>
              </div>

              <div className="space-y-3">
                {partnersList.map((partner) => {
                  const partnerUrl = generatePartnerLink(partner.id);
                  const isCopied = copiedId === partner.id;

                  return (
                    <div 
                      key={partner.id} 
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-emerald-300 transition-all flex flex-col gap-3 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                              {partner.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-mono font-bold">
                              ref={partner.id}
                            </span>
                            {partner.tag && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                {partner.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleCopyLink(partner.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                              isCopied
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 hover:bg-emerald-600 text-white'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar Link</span>
                              </>
                            )}
                          </button>

                          <a
                            href={partnerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                            title="Abrir página com o link do parceiro"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => removePartner(partner.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Remover parceiro"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* URL Box */}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 overflow-x-auto">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate select-all">{partnerUrl}</span>
                      </div>

                      {/* WhatsApp Pre-defined Message preview */}
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700">
                        <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5 leading-relaxed">
                          <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
                            Mensagem pré-definida no WhatsApp:
                          </span>
                          <span className="italic text-slate-700">"{partner.message}"</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreatePartner} className="space-y-4">
              {formSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs sm:text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Parceiro e link criados com sucesso! Redirecionando para a lista...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Identificador na URL (Slug / Código) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs font-bold">
                    ?ref=
                  </span>
                  <input
                    type="text"
                    required
                    value={newId}
                    onChange={e => setNewId(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    placeholder="ex: cooperativa-sul ou marcos"
                    className="w-full pl-16 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-bold"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Apenas letras minúsculas, números e traços. Esse valor irá no final da URL.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Nome do Parceiro ou Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="ex: Cooperativa Regional Agro ou Marcos Silva"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Mensagem Pré-definida do WhatsApp *
                </label>
                <textarea
                  rows={3}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder={`ex: ${buildPartnerDefaultMessage(newName || '(identificador)')}`}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Esta mensagem aparecerá pré-preenchida no WhatsApp quando o lead clicar no botão.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Número do WhatsApp de Atendimento
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="5567999034874"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Padrão atual: 67 99903-4874 (DDD + Número sem espaços ou símbolos)
                </span>
              </div>

              {/* Live Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Prévia do Link Gerado:
                </span>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-emerald-800 truncate select-all">
                  {livePreviewUrl}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 transition cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Salvar Parceiro & Gerar Link</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Dica: você também pode abrir este painel a qualquer momento adicionando <code className="font-mono text-slate-700">?parceiros=1</code> na URL.</span>
          <button
            onClick={closePartnerModal}
            className="font-bold text-slate-700 hover:text-emerald-700 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
