import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import enGb from 'date-fns/locale/en-GB';
import styles from './OrderOption.scss';

const OrderOptionDate = (/*currentValue, setOptionValue*/) => {
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('en-gb', enGb);
  return (
    <div>
      <DatePicker
        className={styles.input}
        selected={startDate}
        minDate={new Date()}
        maxDate={new Date().setDate(new Date().getDate() + 365)}
        dateFormat='dd-MM-yyyy'
        todayButton='Today'
        locale='en-gb'
        onChange={date => setStartDate(date)}
      />
    </div>
  );
};

export default OrderOptionDate;
