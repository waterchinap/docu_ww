const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

function generateDateJson() {
    const startDate = dayjs('1939-01-01');
    const endDate = dayjs('1945-12-31');
    const referenceDate = dayjs('1939-09-01');
    const dateJson = {};

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        const year = currentDate.year();
        const month = currentDate.format('MM');
        const day = currentDate.format('YYYY-MM-DD');
        const daysTo = currentDate.diff(referenceDate, 'day');

        if (!dateJson[year]) {
            dateJson[year] = {};
        }
        if (!dateJson[year][month]) {
            dateJson[year][month] = [];
        }

        dateJson[year][month].push({
            date: day,
            daysto: daysTo,
            event: '' // 初始化 event 属性
        });
        currentDate = currentDate.add(1, 'day');
    }

    // 对月份进行排序
    Object.keys(dateJson).forEach(year => {
        dateJson[year] = Object.keys(dateJson[year]).sort((a, b) => parseInt(a) - parseInt(b)).reduce((acc, month) => {
            acc[month] = dateJson[year][month];
            return acc;
        }, {});
    });

    return dateJson;
}

function mergeTimelineData(dateJson, timelineData) {
    timelineData.forEach(event => {
        const eventDate = dayjs(event.date);
        const year = eventDate.year();
        const month = eventDate.format('MM');
        const day = eventDate.format('YYYY-MM-DD');

        const dateEntry = dateJson[year][month].find(entry => entry.date === day);
        if (dateEntry) {
            dateEntry.event = event.event;
        }
    });
}

function saveJson(data, filePath) {
    const jsonContent = JSON.stringify(data, null, 4);
    fs.writeFileSync(filePath, jsonContent);
}

function main() {
    // 生成没有合并 events.json 的 date.json
    const dateJson = generateDateJson();
    const dateFilePath = path.join(__dirname, 'static/date.json');
    saveJson(dateJson, dateFilePath);
    console.log('JSON data saved to static/date.json');

    // 读取 timeline.json 文件
    const timelineFilePath = path.join(__dirname, 'static/events.json');
    const timelineData = JSON.parse(fs.readFileSync(timelineFilePath, 'utf8')).events;

    // 合并 timeline.json 数据
    mergeTimelineData(dateJson, timelineData);

    // 保存合并后的数据
    const outputFilePath = path.join(__dirname, 'static/data.json');
    saveJson(dateJson, outputFilePath);
    console.log('JSON data with events saved to static/data.json');
}

main();