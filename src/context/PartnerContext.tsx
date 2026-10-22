import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PartnerConfig, 
  ActivePartnerState, 
  getAllPartners, 
  detectActivePartner, 
  savePartner, 
  deletePartner,
  DEFAULT_WHATSAPP_PHONE,
  DEFAULT_WHATSAPP_MESSAGE
} from '../services/partnerService';

interface PartnerContextType {
  activePartner: ActivePartnerState;
  partnersList: PartnerConfig[];
  isPartnerModalOpen: boolean;
  openPartnerModal: () => void;
  closePartnerModal: () => void;
  addNewPartner: (partner: Omit<PartnerConfig, 'createdAt'>) => PartnerConfig;
  removePartner: (id: string) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePartner, setActivePartner] = useState<ActivePartnerState>(() => detectActivePartner());
  const [partnersList, setPartnersList] = useState<PartnerConfig[]>(() => getAllPartners());
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  useEffect(() => {
    // Detect on mount
    const detected = detectActivePartner();
    setActivePartner(detected);

    const handleUrlChange = () => {
      const refreshed = detectActivePartner();
      setActivePartner(refreshed);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Auto-open modal if url contains ?parceiros=1 or ?admin=parceiros
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('parceiros') === '1' || params.get('admin') === 'parceiros' || params.get('gerador') === '1') {
        setIsPartnerModalOpen(true);
      }
    }

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const openPartnerModal = () => setIsPartnerModalOpen(true);
  const closePartnerModal = () => setIsPartnerModalOpen(false);

  const addNewPartner = (partnerData: Omit<PartnerConfig, 'createdAt'>) => {
    const saved = savePartner(partnerData);
    setPartnersList(getAllPartners());
    return saved;
  };

  const removePartner = (id: string) => {
    deletePartner(id);
    setPartnersList(getAllPartners());
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        textArea.remove();
        return success;
      }
    } catch {
      return false;
    }
  };

  return (
    <PartnerContext.Provider
      value={{
        activePartner,
        partnersList,
        isPartnerModalOpen,
        openPartnerModal,
        closePartnerModal,
        addNewPartner,
        removePartner,
        copyToClipboard
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};
