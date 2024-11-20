import React from 'react';
import { useEditor } from '../context/editorContext';
import './Editor.css';

const Editor: React.FC = () => {
    const { isEditing, setIsEditing } = useEditor();

    const handleClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div id='editor'>
            <button id='edit-btn' onClick={handleClick}>Click me</button>
        </div>
    );
};

export default Editor;