export const formatTime = sourceSeconds => {
  if(sourceSeconds && !isNaN(sourceSeconds) && sourceSeconds > 0){

    const seconds = String(Math.floor(sourceSeconds % 60)).padStart(2, '0');
    const minutes = String(Math.floor(sourceSeconds / 60 % 60)).padStart(2, '0');
    const hours = String(Math.floor(sourceSeconds / 3600)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  } else {
    return null;
  }
};
