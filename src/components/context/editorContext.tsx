import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the interface for the context type
interface EditorContextType {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    elementEditing: string | null;
    setElementEditing: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value of null
export const EditorContext = createContext<EditorContextType | null>(null);

// Custom hook to use the EditorContext
export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorContextProvider');
    }
    return context;
}

// Define the props type for the provider component
interface EditorContextProviderProps {
    children: ReactNode;
}

// Provider component to wrap around the parts of the app that need this context
const EditorContextProvider: React.FC<EditorContextProviderProps> = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [elementEditing, setElementEditing] = useState<string | null>("");

    // Define the values to provide in the context
    const values = {
        isEditing,
        setIsEditing,
        elementEditing,
        setElementEditing,
    };

    // Return the provider component with the context value
    return (
        <EditorContext.Provider value={values}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorContextProvider;