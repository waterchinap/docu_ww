import React from 'react';

function Card({ date }) {
    // 去掉前面的两个数字
    const formattedDate = date.slice(5);

    return (
        <div className='mycard'>
            <a href={`docs/bydate/${formattedDate}`}>{formattedDate}</a>
        </div>
    );
}

export default Card;