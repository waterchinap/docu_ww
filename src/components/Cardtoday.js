import React from 'react';
import dayjs from 'dayjs';
import Link from '@docusaurus/Link';

function Card() {
    // 计算日期差
    const ruwardate = dayjs('2022-02-24');
    const currentDate = dayjs();
    const rudays = currentDate.diff(ruwardate, 'day');
    const wwday = dayjs('1939-09-01').add(rudays, 'day')
    const date = wwday.format('YYYY-MM-DD')
    const mdate = date.slice(5)
    return (
        <>
        <div className='card_container'>
        
        <div className='mycard'>
            <Link to={`docs/bydate/${mdate}`}>更多二战中的今日  </Link>
        </div>
        <h3>俄乌开战已：{rudays} 日</h3>
        <div className='mycard'>
            <Link to={`docs/byday/${date}`}>二战第{rudays}日</Link>
        </div>
        </div>
        </>
    );
}

export default Card;