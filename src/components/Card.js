import React from 'react';
import dayjs from 'dayjs';

function Card({ date }) {
    // 去掉前面的两个数字
    const formattedDate = date.slice(2);

    // 计算日期差
    const baseDate = dayjs('1939-09-01');
    const currentDate = dayjs(date);
    const daysDifference = currentDate.diff(baseDate, 'day');

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            padding: '5px', 
            margin: '5px', 
            flex: '0 0 calc(10% - 10px)', 
            textAlign: 'center' 
        }}>
            <a href={`docs/byday/${date}`}>{formattedDate}</a>
            <div>{daysDifference}</div>
        </div>
    );
}

export default Card;