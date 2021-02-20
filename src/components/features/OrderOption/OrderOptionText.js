import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({limit, currentValue, setOptionValue}) => (
  <div>
    <input
      className={styles.input}
      type='text'
      value={currentValue}
      maxLength={limit}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  limit: PropTypes.number,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
