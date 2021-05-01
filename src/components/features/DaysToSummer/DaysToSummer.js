import React from 'react';
import styles from './DaysToSummer.scss';

const DaysToSummer = () => {
  const currentTime = new Date();

  const nextSummer = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 21, 0, 0, 0, 0));
  const endOfSummer = new Date(Date.UTC(currentTime.getUTCFullYear(),  8, 23, 0, 0, 0, 0));

  //if it is already summer, component should NOT show anything
  if(nextSummer.getTime() < currentTime.getTime() && endOfSummer.getTime() > currentTime.getTime()){
    return null;
  } else {
    if(currentTime.getTime() >= endOfSummer){
      nextSummer.setUTCDate(currentTime.setUTCFullYear()+1);
    }

    const daysToSummer = Math.round((nextSummer.getTime() - currentTime.getTime()) / 1000 / 60 / 60 / 24);

    return (
      <div className={styles.component}>{daysToSummer} {daysToSummer == 1? 'day' : 'days'} till summer!</div>
    );
  }
};

export default DaysToSummer;
