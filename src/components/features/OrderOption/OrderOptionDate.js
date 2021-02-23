import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import enGb from 'date-fns/locale/en-GB';
import styles from './OrderOption.scss';

const startDate = new Date();
const endDate = new Date().setDate(new Date().getDate() + 365);


const OrderOptionDate = ({currentValue, setOptionValue}) => {
  useEffect(() => {
    setOptionValue(startDate);
  }, []);

  registerLocale('en-gb', enGb);

  return (
    <div>
      <DatePicker
        className={styles.input}
        selected={currentValue}
        minDate={startDate}
        maxDate={endDate}
        dateFormat='dd-MM-yyyy'
        todayButton='Today'
        locale='en-gb'
        onChange={date => setOptionValue(date)}
      />
    </div>
  );
};

OrderOptionDate.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
