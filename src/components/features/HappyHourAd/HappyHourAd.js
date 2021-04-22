import React from 'react';
import styles from './HappyHourAdd.scss';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component {
  render() {
    const { title, promoDescription } = this.props;
    return (
      <div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{promoDescription}</div>
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};

export default HappyHourAd;
