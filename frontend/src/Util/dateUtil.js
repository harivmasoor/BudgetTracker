export const formattedDate = (date) => {
    if (!date || date ==="") return date
    return date.split('T')[0]; // Extract the date part
  };