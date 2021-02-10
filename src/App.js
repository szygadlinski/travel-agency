import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';
import PropTypes from 'prop-types';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
import Countries from './components/views/Countries/CountriesContainer';
import Regions from './components/views/Regions/RegionsContainer';
import Info from './components/views/Info/Info';
import Trip from './components/views/Trip/TripContainer';
import Country from './components/views/Country/CountryContainer';
import NotFound from './components/views/NotFound/NotFound';

import styles from './App.scss';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render(){

    const mapStyles = function(styles){
      return {
        opacity: styles.opacity,
        top: `${styles.top}px`,
      };
    };

    const transition = {
      atEnter: {
        opacity: 0,
        top: 200,
      },
      atLeave: {
        opacity: 0,
        top: 0,
      },
      atActive: {
        opacity: 1,
        top: 0,
      },
    };

    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            location={location}
            atEnter={transition.atEnter}
            atLeave={transition.atLeave}
            atActive={transition.atActive}
            className={styles.switchWrapper}
            mapStyles={mapStyles}
          >
            <Route exact path='/' component={Home} />
            <Route exact path='/trips' component={Trips} />
            <Route exact path='/countries' component={Countries} />
            <Route exact path='/regions' component={Regions} />
            <Route exact path='/info' component={Info} />
            <Route exact path='/trips/:id' component={Trip} />
            <Route exact path='/countries/:id' component={Country} />
            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
