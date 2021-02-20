import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => (
  <div className={styles.number}>
    <input
      className={styles.input + ' ' + styles.inputSmall}
      type='number'
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(parseInt(event.currentTarget.value))}
    /> ({formatPrice(price)} of price)
  </div>
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;
