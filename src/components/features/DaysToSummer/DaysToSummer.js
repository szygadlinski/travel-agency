import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {

  getAmountOfDays(){
    const currentDate = new Date();
    const nextSummer = new Date(Date.UTC(currentDate.getUTCFullYear(), 5, 21, 0, 0, 0));

    if(currentDate.getUTCMonth() > 5){
      nextSummer.setUTCFullYear(currentDate.getUTCFullYear() + 1);
    }

    if(
      currentDate.getUTCMonth() <= 4
      || currentDate.getUTCMonth() >= 9
      || currentDate.getUTCMonth() == 5 && currentDate.getUTCDate() <= 19
      || currentDate.getUTCMonth() == 8 && currentDate.getUTCDate() >= 24
    ){
      return Math.floor((nextSummer.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24) + 1 + ' days to summer!';
    } else if(currentDate.getUTCMonth() == 5 && currentDate.getUTCDate() == 20){
      return '1 day to summer!';
    } else {
      return '';
    }
  }

  render(){
    return(
      <div className={styles.component}>{this.getAmountOfDays()}</div>
    );
  }
}

export default DaysToSummer;
