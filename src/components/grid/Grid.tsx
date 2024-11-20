import React from 'react';
import Card from '../card/Card';
import data from '../../api/data.json';
import './Grid.css';

interface GridProps {}

const Grid: React.FC<GridProps> = () => {
    const rows = 5;
    const cols = 11;

    const renderGrid = () => {
        const grid = [];
        
        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= cols; col++) {
                const cardData = data.find(item => item.row === row && item.col === col);
                if (cardData) {
                    grid.push(
                        <div key={`${row}-${col}`} className="grid-item">
                            <Card content={cardData.content} />
                        </div>
                    );
                } else {
                    grid.push(
                        <div key={`${row}-${col}`} className="grid-item empty">
                            {/* Empty cell */}
                        </div>
                    );
                }
            }
        }

        return grid;
    };

    return (
        <div className="grid-container">
            {renderGrid()}
        </div>
    );
};

export default Grid;
