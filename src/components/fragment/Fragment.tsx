import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor } from '../context/editorContext';
import './Fragment.css';

type FragmentProps = {
    id?: string;
    classes?: string;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
};

const Fragment: React.FC<FragmentProps> = ({ id, classes, attributes }) => {
    const demoStyles: React.CSSProperties = {
        backgroundColor: 'red',
        width: '200px',
        borderRadius: '10px',
        position: 'absolute', // Necesario para el arrastre
    };
    const { isEditing, setElementEditing } = useEditor();
    const [dynamicStyles, setDynamicStyles] = useState(demoStyles);
    const [level2, setLevel2] = useState('Level 2');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const editCloudRef = useRef(null);

    // Estados y lógica para arrastrar
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Manejadores de eventos para arrastrar
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({
            x: event.clientX - position.x,
            y: event.clientY - position.y,
        });
    };

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setPosition({
            x: event.clientX - dragStart.x,
            y: event.clientY - dragStart.y,
        });
    }, [isDragging, dragStart, setPosition]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, [setIsDragging]);

    const handleEditClick = (id: string) => {
        setIsEditOpen(!isEditOpen);
        setElementEditing(id);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove as any);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove as any);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <>
            <div
                style={{ ...dynamicStyles, left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }}
                id={id}
                className={`fragment ${isEditing ? 'editable' : ''}`}
                {...attributes}
                onMouseDown={handleMouseDown}
            >
                {level2}

                <div className='edit-tool'>
                    <div
                        className={`hover-space ${isEditing ? 'editable' : 'hide'} `}
                        onClick={() => handleEditClick(id)}
                    />
                </div>

            </div>
        </>
    );
};

export default Fragment;