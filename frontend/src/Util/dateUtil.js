export const formattedDate = (date) => {
  if (!date || date === "") return date;

  const dateString = new Date(date).toUTCString();
  const parts = dateString.split(' ');
  
  const day = parts[1];
  const month = parts[2];
  const year = parts[3];
  return `${day} ${month} ${year}`;

  // const newDate = new Date(date);
  // const day = newDate.getDate();
  // const month = newDate.toLocaleString('default', { month: 'long' }); // This will give the full month name
  // const year = newDate.getFullYear();
  // return `${day} ${month} ${year}`;
};


  export const getCurrentMonthYear = (selectedInterval, dateInput) => {
    const newDate = new Date(dateInput);
  
    // Get the current year and month in PST
    const currentYear = newDate.getUTCFullYear();
    const currentMonth = newDate.getUTCMonth();
  
    // Calculate the time zone offset in minutes (for PST)
    const timezoneOffset = -480; // PST offset is UTC-8, which is -480 minutes
  
    // Calculate the start and end dates of the current month with PST offset
    const startDate = new Date(
      Date.UTC(currentYear, currentMonth, 1) - (timezoneOffset * 60 * 1000)
    );
  
    const endDate = new Date(
      Date.UTC(currentYear, currentMonth + 1, 0) - (timezoneOffset * 60 * 1000)
    );
  
    if (selectedInterval !== "monthly") {
      const startOfYear = new Date(Date.UTC(currentYear, 0, 1) - (timezoneOffset * 60 * 1000));
      const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 0) - (timezoneOffset * 60 * 1000));
      return {
        startDate: startOfYear.toISOString().split('T')[0],
        endDate: endOfYear.toISOString().split('T')[0]
      };
    }
  
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };
  