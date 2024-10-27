import React from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Layout from '@theme/Layout';
import Cardbydate from '../components/Cardbydate';

// 使用插件
dayjs.extend(isSameOrBefore);

function generateDateSeries(startDate, endDate, formatString = 'YYYY-MM-DD') {
    const dateSeries = [];
    let currentDate = dayjs(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
        dateSeries.push(currentDate.format(formatString));
        currentDate = currentDate.add(1, 'day');
    }

    return dateSeries;
}

function groupDatesByMonth(dateSeries) {
    const groupedDates = {};

    dateSeries.forEach(date => {
        const month = date.slice(5, 7);
        if (!groupedDates[month]) {
            groupedDates[month] = [];
        }
        groupedDates[month].push(date);
    });

    return groupedDates;
}

function MonthNavigationPage() {
    const startDate = '1939-01-01';
    const endDate = '1945-12-31';
    const dateSeries = generateDateSeries(startDate, endDate);
    const groupedDates = groupDatesByMonth(dateSeries);

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1>日期导航</h1>
                {Object.keys(groupedDates).sort().map(month => (
                    <div key={month}>
                        <h2>{month}</h2>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'flex-start', 
                            gap: '10px' 
                        }}>
                            {groupedDates[month].map(date => (
                                <Cardbydate key={date} date={date} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default MonthNavigationPage;