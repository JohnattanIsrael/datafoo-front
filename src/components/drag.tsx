import React, { useState, useEffect } from 'react';
import './styles.css';

interface ApiFormProps {
    // Define your props here
}

const Drag: React.FC<ApiFormProps> = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        console.log('mousePosition:', mousePosition);
    }, [mousePosition]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) {
                const offsetX = event.clientX - buttonPosition.x;
                const offsetY = event.clientY - buttonPosition.y;
                const finalX = finalPosition.x + offsetX;
                const finalY = finalPosition.y + offsetY;
                setButtonPosition({ x: event.clientX, y: event.clientY });
                setFinalPosition({ x: finalX, y: finalY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            console.log('Button Position:', buttonPosition);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, buttonPosition, finalPosition]);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsDragging(true);
        setButtonPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <div>
            <div
                className='draggable-div'
                style={{ position: 'absolute', left: `${finalPosition.x}px`, top: `${finalPosition.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                Drag Me
            </div>
            <div>
                Mouse Position: {mousePosition.x}, {mousePosition.y}
            </div>
        </div>
    );
};

export default Drag;
