import React from 'react';

function Cardmonth({date}) {

    return (
        <div className='mycard'>
            <a href={`docs/bymonth/${date}`}>{date}</a>
        </div>
    );
}

export default Cardmonth;