import { useState, useEffect } from "react";

export function useClock() {
  const [time, setTime] = useState(new Date());

   const days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return {
    time,
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
    day: time.getDay(),
    today: days[time.getDay()]
  };
}