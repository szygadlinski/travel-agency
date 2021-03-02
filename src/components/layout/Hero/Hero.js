import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.scss';
import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import DaysToSummer from '../../features/DaysToSummer/DaysToSummer';

const Hero = ({variant = '', titleText, imageSrc, ...otherProps}) => (
  <div {...otherProps} className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}>
    <DaysToSummer className={styles.daysToSummer} />

    <h2 className={styles.title}>{titleText}</h2>
    <img className={styles.image} src={imageSrc} />

    <div className={styles.happyHour}>
      <HappyHourAd
        title='Happy Hour'
        description='It is your time! Take advantage of Happy Hour! All offers 20% off!'
      />
    </div>
  </div>
);

Hero.propTypes = {
  variant: PropTypes.string,
  titleText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default Hero;
