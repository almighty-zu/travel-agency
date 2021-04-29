import React from 'react';
import styles from './HappyHourAdd.scss';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component {

  constructor(){
    super();

    /* run this.forceUpdate() every second */
    setInterval(() => this.forceUpdate(), 1000);
  }

  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  };

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render() {
    const countdownTime = this.getCountdownTime();
    const {title, promoDescription} = this.props;
    if(countdownTime > 23*60*60) {
      return (
        <div className={styles.component}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.promoDescription}>{promoDescription}</div>
        </div>
      );
    } else {
      return (
        <div className={styles.component}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.promoDescription}>{countdownTime}</div>
        </div>
      );
    }
  }
}

export default HappyHourAd;
