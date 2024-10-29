import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import eventsData from '/events.json';

const TodayEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = dayjs().format('MM-DD');

    // 查找与今天日期（月和日）相同的事件
    const todayEvents = eventsData.events.filter(event => {
      const eventDate = dayjs(event.date).format('MM-DD');
      return eventDate === today;
    });

    // 如果找到匹配的事件，则将其日期和事件组合成字符串
    const eventStrings = todayEvents.map(event => `${event.date}: ${event.event}`);

    setEvents(eventStrings);
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        <div>
          {events.map((event, index) => (
            <h3 key={index}>{event}</h3>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default TodayEvent;