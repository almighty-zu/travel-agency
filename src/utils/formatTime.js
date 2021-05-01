export const formatTime = timeInSec => {
  if(!timeInSec || isNaN(timeInSec) || timeInSec < 0){
    return null;
  } else {
    let hh = Math.floor(timeInSec / (60*60));
    let mm = Math.floor(timeInSec / 60 % 60);
    let ss = Math.floor(timeInSec % 60);
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;
    return `${hh}:${mm}:${ss}`;
  }
};

