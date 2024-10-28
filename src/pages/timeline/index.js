import React, { useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Layout from '@theme/Layout';
import Cardtimeline from '../../components/Cardtimeline';
import eventsData from './timeline.json';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

    // 将事件数据与日期关联
    const eventsMap = eventsData.World_War_II_Important_Time_Nodes.reduce((map, event) => {
        map[event.date] = event.event;
        return map;
    }, {});

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1>关键节点</h1>
                <p>第二行数字为距开战天数。</p>
                <Tabs
                    values={Object.keys(groupedDates).map(year => ({ label: year, value: year }))}
                    onChange={(year) => setActiveYear(year)}
                    defaultValue={activeYear}
                >
                    {Object.keys(groupedDates).map(year => (
                        <TabItem key={year} value={year}>
                            {groupedDates[year] && Object.keys(groupedDates[year]).sort().map(month => (
                                <div key={month}>
                                    <h2>{month}</h2>
                                    <div style={{ 
                                        display: 'flex', 
                                        flexWrap: 'wrap', 
                                        justifyContent: 'flex-start', 
                                        gap: '10px' 
                                    }}>
                                        {groupedDates[year][month].map(date => (
                                            <Cardtimeline key={date} date={date} event={eventsMap[date]} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </TabItem>
                    ))}
                </Tabs>
            </div>
        </Layout>
    );
}

export default ByDateNavigationPage;