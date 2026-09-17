import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatbotPanelContextType {
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const ChatbotPanelContext = createContext<ChatbotPanelContextType | undefined>(undefined);

export const ChatbotPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);
  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  // Listen for global custom events across windows / pages
  useEffect(() => {
    const handleOpen = () => setIsPanelOpen(true);
    const handleClose = () => setIsPanelOpen(false);
    const handleToggle = () => setIsPanelOpen((prev) => !prev);

    window.addEventListener('open-ckb-chatbot', handleOpen);
    window.addEventListener('close-ckb-chatbot', handleClose);
    window.addEventListener('toggle-ckb-chatbot', handleToggle);

    return () => {
      window.removeEventListener('open-ckb-chatbot', handleOpen);
      window.removeEventListener('close-ckb-chatbot', handleClose);
      window.removeEventListener('toggle-ckb-chatbot', handleToggle);
    };
  }, []);

  return (
    <ChatbotPanelContext.Provider value={{ isPanelOpen, openPanel, closePanel, togglePanel }}>
      {children}
    </ChatbotPanelContext.Provider>
  );
};

export const useChatbotPanel = () => {
  const context = useContext(ChatbotPanelContext);
  if (!context) {
    return {
      isPanelOpen: false,
      openPanel: () => {
        window.dispatchEvent(new CustomEvent('open-ckb-chatbot'));
      },
      closePanel: () => {
        window.dispatchEvent(new CustomEvent('close-ckb-chatbot'));
      },
      togglePanel: () => {
        window.dispatchEvent(new CustomEvent('toggle-ckb-chatbot'));
      },
    };
  }
  return context;
};
