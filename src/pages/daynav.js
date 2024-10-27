import React, { useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Layout from '@theme/Layout';
import Card from '../components/Card';

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

function groupDatesByYearAndMonth(dateSeries) {
    const groupedDates = {};

    dateSeries.forEach(date => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        if (!groupedDates[year]) {
            groupedDates[year] = {};
        }
        if (!groupedDates[year][month]) {
            groupedDates[year][month] = [];
        }
        groupedDates[year][month].push(date);
    });

    return groupedDates;
}

function ByDateNavigationPage() {
    const startDate = '1939-01-01';
    const endDate = '1945-12-31';
    const dateSeries = generateDateSeries(startDate, endDate);
    const groupedDates = groupDatesByYearAndMonth(dateSeries);
    const [activeYear, setActiveYear] = useState(Object.keys(groupedDates)[0]);

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1>年月日导航</h1>
                <div>
                    {Object.keys(groupedDates).map(year => (
                        <button 
                            key={year} 
                            onClick={() => setActiveYear(year)}
                            style={{ marginRight: '10px', fontWeight: year === activeYear ? 'bold' : 'normal' }}
                        >
                            {year}
                        </button>
                    ))}
                </div>
                <div>
                    {groupedDates[activeYear] && Object.keys(groupedDates[activeYear]).sort().map(month => (
                        <div key={month}>
                            <h2>{month}</h2>
                            <div style={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                justifyContent: 'flex-start', 
                                gap: '10px' 
                            }}>
                                {groupedDates[activeYear][month].map(date => (
                                    <Card key={date} date={date} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ByDateNavigationPage;