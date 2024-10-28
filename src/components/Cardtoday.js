import React from 'react';
import dayjs from 'dayjs';
import Link from '@docusaurus/Link';

function Card() {
    // 计算日期差
    const today = dayjs();
    const date = today.format('YYYY-MM-DD').slice(5)
    return (
        <div className='mycard'>
            {/* <a href={`docs/bydate/${date}`}>二战中的今日</a> */}
            <Link to={`docs/bydate/${date}`}>二战中的今日
            </Link>
        </div>
    );
}

export default Card;