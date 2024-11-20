import React from 'react';
import { useEditor } from '../context/editorContext';
import './Toolset.css';


type ToolsetProps = {
    // Define props here
};

const Toolset: React.FC<ToolsetProps> = () => {
    const { elementEditing } = useEditor();
    // Component logic here

    
    return (
        // JSX markup here
        <div id='toolset'>
            <div className='toolset-wrapper'>#{elementEditing}</div>
            
        </div>
    );
};

export default Toolset;