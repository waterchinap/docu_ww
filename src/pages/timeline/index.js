import React from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@docusaurus/Link';
import Box from '@mui/material/Box';
import jsonData from '/data.json';

const DateNavigation = () => {
  // 提取年份和月份
  const years = Object.keys(jsonData);
  const months = years.reduce((acc, year) => {
    acc[year] = Object.keys(jsonData[year]).sort();
    return acc;
  }, {});

  return (
    <Layout title="Date Navigation" description="Navigate through dates and events">
      <div style={{ padding: '20px' }}>
        <Tabs defaultValue={null} values={years.map((year) => ({ label: year, value: year }))}>
          {years.map((year) => (
            <TabItem key={year} value={year}>
              <Tabs defaultValue={null} values={months[year].map((month) => ({ label: month, value: `${year}-${month}` }))}>
                {months[year].map((month) => (
                  <TabItem key={month} value={`${year}-${month}`}>
                    <div>
                      <h3>{month}</h3>
                      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
                        {jsonData[year][month].map((dateInfo) => (
                          <Card key={dateInfo.date} style={{ margin: '4px' }}>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                <Link to={`/docs/byday/${dateInfo.date}`}>{dateInfo.date}</Link>
                              </Typography>
                              <Typography color="textSecondary">
                                距开战: {dateInfo.days_to}
                              </Typography>
                              {dateInfo.event && (
                                <Typography variant="body2" component="p">
                                  {dateInfo.event}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </div>
                  </TabItem>
                ))}
              </Tabs>
            </TabItem>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default DateNavigation;