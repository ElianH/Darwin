import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, ListView, Alert, Image, TextInput, TouchableWithoutFeedback, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from './NavBar';
import LinearGradient from 'react-native-linear-gradient';

export default class CitiesView extends Component {
	  
  isSearching = false;
  text = '';
  
  constructor(props) {
	super(props);
  }
  
  	goToCitiesPage(localizedStrings, citiesJson){
		Actions.citiesPage({
			localizedStrings: localizedStrings, 
			citiesJson: citiesJson,
		});
	}
	
	goToGeneralMapPage(localizedStrings, citiesJson){ 
		Actions.generalMapPage({
			localizedStrings: localizedStrings, 
			markers: citiesJson,
			showFilters: false,
			onMarkerClick: this.goToCityPage,
			onListButtonClick: this.goToCitiesPage
		}); 
	}
	
	goToCityPage(localizedStrings, selectedCity){ 
		Actions.cityPage({localizedStrings: localizedStrings, selectedCity: selectedCity}); 
	}
  
  render() {
	
	// navigation	
	//const goToCityPage = (selectedCity) => { 
	//	Actions.cityPage({localizedStrings: this.props.localizedStrings, selectedCity: selectedCity}); 
	//};
	
	//const goToGeneralMapPage = () => { Actions.generalMapPage({
	//		localizedStrings: this.props.localizedStrings, 
	//		markers: this.props.citiesJson,
	//		showFilters: false,
	//		onMarkerClick: goToCityPage
	//	}); 
	//};

	// filtered cities
	var filterText = this.text.toLowerCase();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	var newFilter = this.props.citiesJson.slice().filter((item)=> { return (filterText === '' || item.name.toLowerCase().indexOf(filterText) !== -1) });
	var filteredDataSource = ds.cloneWithRows(newFilter);

	// nav bar title
	var upperCaseDestinations = this.props.localizedStrings.destinations.toUpperCase();
	
    return (
	
		<View style={styles.citiesBackground}>
			<StatusBar hidden={false} backgroundColor='#000' />
			<NavBar style={{height:50}} 
				title={upperCaseDestinations} 
				localizedStrings={this.props.localizedStrings}
				enableSearch={true}
				onSearchChanged={(isSearching, text) => { 
					this.isSearching = isSearching;  
					this.text = text;
				}}
				onMapButtonClick={() => { this.goToGeneralMapPage(this.props.localizedStrings, this.props.citiesJson); }}/>
			<ListView style={styles.citiesListView}
				keyboardShouldPersistTaps={true}
				dataSource={filteredDataSource}
				renderRow={(city) => {
					return (
						<TouchableHighlight style={styles.cityButton} onPress={() => { this.goToCityPage(this.props.localizedStrings, city) }}>
							<Image style={styles.cityButtonBackgroundImage} borderRadius={6} source={{uri: city.mainImageSrc}}>
								<LinearGradient 
									start={{x: 0.0, y: 0.0}} 
									end={{x: 0.0, y: 1.0}} 
									borderRadius={6} 
									colors={["transparent", "#000D"]} 
									locations={[-0.5,1.3]} 
									style={styles.linearGradient}
									>
									<View  style={styles.cityButtonBackgroundImageView}>
										<View style={styles.cityButtonTextView}>
											<Text style={styles.cityButtonText}>{city.name.toUpperCase()}</Text>
										</View>
										<Text style={styles.cityButtonShortDescriptionText}>{city.shortDescription}</Text>
										<View style={styles.cityButtonIconsView}/>
									</View>
								</LinearGradient>
							</Image>
						</TouchableHighlight>
					)
				}}
			/>
		</View>
    )
  }
}

const styles = StyleSheet.create({
	
	citiesBackground: {
		flex: 1,
		backgroundColor: '#000',
		alignSelf: 'stretch',
		flexDirection: 'column'
	},
	citiesListView: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'column'
	},
	cityButton: {
		marginBottom: 5,
		marginTop: 5,
		marginLeft: 7,
		marginRight: 7,
		alignSelf: 'stretch',
		height: 250,
	},
	cityButtonBackgroundImage: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1,
	},
	cityButtonBackgroundImageView: {
		alignSelf: 'stretch',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'column',
	},
	cityButtonTextView: {
		alignSelf: 'stretch',
	},
	cityButtonShortDescriptionText: {
		fontSize: 20,
		marginLeft: 10,
		marginTop: -5,
		alignSelf: 'flex-start',
		fontFamily: 'sans-serif-light',
		color: '#888'
	},
	cityButtonText: {
		fontSize: 40,
		marginLeft: 10,
		alignSelf: 'flex-start',
		fontFamily: 'Brandon_bld',
		color: '#F4F4F4'
	},
	cityButtonIconsView: {
		height:40
	},
	linearGradient: {
        backgroundColor: "transparent",
        position: "absolute",
		borderRadius: 6,
		justifyContent: 'flex-end',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
	}
});