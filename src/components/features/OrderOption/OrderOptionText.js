import React from 'react';
import styles from './OrderOption';
import PropTypes from 'prop-types';

const OrderOptionText = ({name, setOptionValue}) => (
  <div className={styles.component}>
    <input className={styles.input} type='text' placeholder={name}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  name: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
