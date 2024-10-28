import React from 'react';
import dayjs from 'dayjs';

function Cardtimeline({ date, event }) {
    // const formattedDate = date.slice(2);
    // 计算日期差
    const baseDate = dayjs('1939-09-01');
    const currentDate = dayjs(date);
    const daysDifference = currentDate.diff(baseDate, 'day');
    return (
        <div className='mycard'>
            <a href={`docs/byday/${date}`}>{date.slice(5)}</a>
            <div>{daysDifference}</div>
            {event ? (
                <p>{event}</p>
            ) : (
                <p></p>
            )}
        </div>
    );
}

export default Cardtimeline;