import React from 'react';
import dayjs from 'dayjs';

function Card() {
    // 计算日期差
    const baseDate = dayjs('2022-02-24');
    const currentDate = dayjs();
    const daysDifference = currentDate.diff(baseDate, 'day');
    const wwday = dayjs('1939-09-01').add(daysDifference, 'day')
    const date = wwday.format('YYYY-MM-DD')

    return (
        <div className='mycard'>
            <a href={`docs/byday/${date}`}>二战第{daysDifference}天</a>
        </div>
    );
}

export default Card;