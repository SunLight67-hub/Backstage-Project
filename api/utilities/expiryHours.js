exports.getExpiryHours = () => {
    const date = new Date();
    const hours = date.getHours();
    const remainingHours = (hours >= 1) ? 24 - (hours - 1) : 1 - hours;
  
    return remainingHours;
  };
  