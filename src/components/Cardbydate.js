import React from 'react';

function Card({ date }) {
    // 去掉前面的两个数字
    const formattedDate = date.slice(5);

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            padding: '5px', 
            margin: '5px', 
            flex: '0 0 calc(10% - 10px)', 
            textAlign: 'center' 
        }}>
            <a href={`docs/bydate/${formattedDate}`}>{formattedDate}</a>
        </div>
    );
}

export default Card;