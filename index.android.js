import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import LogoView from './LogoView';
import CitiesView from './CitiesView';
import CityView from './CityView2';
import CityMenuView from './CityMenuView';
import GeneralMapView from './GeneralMapView';
import InfoView from './InfoView';
import DealsView from './DealsView';
import PlanYourTripView from './PlanYourTripView';

export default class Darwin extends Component {
  render() {
    return (
      <Router style={{backgroundColor:'#000'}} >
        <Scene style={{backgroundColor:'#000'}} key="root">
          <Scene  key="logoPage" component={LogoView} title="Logo" hideNavBar={true} initial={true} />
		  <Scene key="citiesPage" component={CitiesView} hideNavBar={true} title="Cities" />
		  <Scene key="cityPage" component={CityView} hideNavBar={true} title="City" />
		  <Scene key="cityMenuPage" component={CityMenuView} hideNavBar={true} title="City Menu" />
		  <Scene key="generalMapPage" component={GeneralMapView} hideNavBar={true} title="Map" />
		  <Scene key="infoPage" component={InfoView} hideNavBar={true} title="Info" />
		  <Scene key="dealsPage" component={DealsView} hideNavBar={true} title="Deals" />
		  <Scene key="planYourTripPage" component={PlanYourTripView} hideNavBar={true} title="PlanYourTrip" />
		  <Scene key="weatherPage" component={InfoView} hideNavBar={true} title="Weather" />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('Darwin', () => Darwin);
