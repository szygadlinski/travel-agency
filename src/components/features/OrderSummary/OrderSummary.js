import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';

const OrderSummary = props => {
  const finalCost = formatPrice(calculateTotal(props.tripCost, props.options));
  return <h2 className={styles.component}>Total: <strong>{finalCost}</strong></h2>;
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
