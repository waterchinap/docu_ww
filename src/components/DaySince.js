import React from 'react';
import dayjs from 'dayjs';

function DaysSince({date}) {
    const startDate = dayjs(date);
    const today = dayjs();
    const daysSince = today.diff(startDate, 'day');

    return (
        <div>
            <h3>从{date}至今已过 {daysSince} 天</h3>
        </div>
    );
}

export default DaysSince;