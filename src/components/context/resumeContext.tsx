import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the interface for the context type
interface ResumeContextProviderProps {
    children: ReactNode;
}

interface ModalContentType {
    heading: string;
    paragraph?: string;
    buttonLabel?: string;
    image?: string;
    backgroundImage?: string;
    country?: string;
    color?: string;
    onCloseFunc?: () => void;
}

interface ResumeContextType {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalContent: ModalContentType;
    setModalContent: React.Dispatch<React.SetStateAction<ModalContentType>>;
}


// Create the context with a default value of null
export const ResumeContext = createContext<ResumeContextType | null>(null);

// Custom hook to use the EditorContext
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorContextProvider');
    }
    return context;
}

// Provider component to wrap around the parts of the app that need this context
const ResumeContextProvider: React.FC<ResumeContextProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContentType>({ heading: '', paragraph: '', buttonLabel: '', onCloseFunc: () => {} });

    // Define the values to provide in the context
    const values = {
        isModalOpen,
        setIsModalOpen,
        modalContent,
        setModalContent
    };

    // Return the provider component with the context value
    return (
        <ResumeContext.Provider value={values}>
            {children}
        </ResumeContext.Provider>
    );
};

export default ResumeContextProvider;