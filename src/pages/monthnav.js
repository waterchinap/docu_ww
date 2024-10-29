import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Cardmonth from '../components/Cardmonth';

function ByDateNavigationPage() {
    const years = Array.from({ length: 1945 - 1939 + 1 }, (_, i) => 1939 + i);
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const year_month = years.flatMap(year => 
        months.map(month => `${year}-${month}`)
      );

    return (
        <Layout >
            <h3 style={{
                    padding: 20
                }}>按年月导航</h3>
            <div style={{
                    padding: 20, 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'flex-start', 
                    gap: '5px' 
                }}>
                {year_month.map(item =>(<Cardmonth key= {item} date={item}/>))}
            </div>
        </Layout>
    );
}

export default ByDateNavigationPage;