const dayjs = require('dayjs');
const fs = require('fs');

// 读取timeline.json文件
const timelineData = JSON.parse(fs.readFileSync('static/timeline.json', 'utf8'));

// 生成日期列表
let startDate = dayjs('1939-01-01');
const endDate = dayjs('1945-12-31');

const dateList = [];

while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
  dateList.push(startDate.format('YYYY-MM-DD'));
  startDate = startDate.add(1, 'day');
}

// 创建对象数组
const dateObjects = dateList.map(date => {
  const daysSince19390901 = dayjs(date).diff(dayjs('1939-09-01'), 'day');
  return {
    date: date,
    num: daysSince19390901,
    date_router: `bydate/${date}`,
    month_router: `bymonth/${date.slice(5)}`
  };
});

// 合并timeline.json数据
const mergedData = dateObjects.map(dateObj => {
  const timelineEvent = timelineData.World_War_II_Important_Time_Nodes.find(event => event.date === dateObj.date);
  return {
    ...dateObj,
    ...timelineEvent
  };
});

// 将合并后的数据写入新的JSON文件
fs.writeFileSync('static/mergedData.json', JSON.stringify(mergedData, null, 2), 'utf8');

console.log('合并完成，结果已写入mergedData.json文件');