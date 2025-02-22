const remainingTime = (startDate, time) =>{
    const now = Math.floor(new Date().getTime() / 1000);
    const start = startDate;
    const duration = time;
  
    if (start > now) {
      const timeDifference = start - now;
      const days = Math.floor(timeDifference / (60 * 60 * 24));
      const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
      const seconds = timeDifference % 60;
      return {
        state: 'Programmed',
        time: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        days: days,
        hours: hours,
        min: minutes,
        seconds: seconds
      };
    } else if ((start + duration) >= now) {
      const timeDifference = (start + duration) - now;
      const days = Math.floor(timeDifference / (60 * 60 * 24));
      const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
      const seconds = timeDifference % 60;
      return {
        state: 'Ongoing',
        time: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        days: days,
        hours: hours,
        min: minutes,
        seconds: seconds
      };
    } else if ((start + duration) < now) {
      return {
        state: 'Closed',
        time: 'Vote terminé'
      };
    }
}

export default remainingTime