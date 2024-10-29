const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

function generateDateJson() {
    const startDate = dayjs('1939-01-01');
    const endDate = dayjs('1941-12-31');
    const dateJson = {};

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        const year = currentDate.year();
        const month = currentDate.format('MM');
        const day = currentDate.format('DD');

        if (!dateJson[year]) {
            dateJson[year] = {};
        }
        if (!dateJson[year][month]) {
            dateJson[year][month] = [];
        }

        dateJson[year][month].push({
            day: day,
            date: currentDate.format('YYYY-MM-DD')
        });
        currentDate = currentDate.add(1, 'day');
    }

    // 对月份和日期进行排序
    for (const year in dateJson) {
        dateJson[year] = Object.fromEntries(
            Object.entries(dateJson[year]).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        );
        for (const month in dateJson[year]) {
            dateJson[year][month].sort((a, b) => parseInt(a.day) - parseInt(b.day));
        }
    }

    return dateJson;
}

// 调用函数生成 dateJson 并保存到本地文件
const dateJson = generateDateJson();
const jsonContent = JSON.stringify(dateJson, null, 2); // 将对象转换为 JSON 字符串，并格式化输出

// 保存到本地文件
const filePath = path.join(__dirname, 'dateJson.json');
fs.writeFileSync(filePath, jsonContent, 'utf8');

console.log(`dateJson 已保存到 ${filePath}`);