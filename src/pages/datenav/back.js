import React from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@docusaurus/Link';
import Box from '@mui/material/Box';
import jsonData from './datenav.json';

const DateNavigation = () => {
  // 提取年份和月份
  const months = Object.keys(jsonData).sort();
  const days = months.reduce((acc, month) => {
    acc[month] = Object.keys(jsonData[month]).sort();
    return acc;
  }, {});

  // 输出 days 对象的内容
  // console.log('days:', days);

  return (
    <Layout title="Date Navigation" description="Navigate through dates and events">
      <div style={{ padding: '20px' }}>
        <Tabs defaultValue={null} values={months.map((month) => ({ label: month + '月', value: month }))}>
          {months.map((month) => (
            <TabItem key={month} value={month}>
              <div>
                <h3>{month}月</h3>
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
                  {days[month].map((day) => {
                    const dayData = jsonData[month][day];
                    // 输出 jsonData[month][day] 的内容
                    // console.log(`jsonData[${month}][${day}]:`, dayData);

                    // 检查 dayData 是否为 null 或 undefined
                    if (dayData === null || dayData === undefined) {
                      return null; // 如果 dayData 为 null 或 undefined，不渲染该卡片
                    }

                    return (
                      <Card key={day}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            <Link to={`/docs/bydate/${dayData.sdate}`}>{dayData.sdate}</Link>
                          </Typography>
                          {dayData.out !== null && dayData.out.length > 0 ? (
                            <Typography variant="body2" component="p">
                              {dayData.out.map((event, index) => (
                                <div key={index}>{event}</div>
                              ))}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              </div>
            </TabItem>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default DateNavigation;