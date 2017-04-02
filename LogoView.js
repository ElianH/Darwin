import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, Alert, Image, ListView, ActivityIndicator, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LogoView extends Component {
 
	jsonEngUrl = 'https://s3-sa-east-1.amazonaws.com/wirestorage/jsons/JSON_ENG.json';
	jsonEspUrl = 'https://s3-sa-east-1.amazonaws.com/wirestorage/jsons/JSON_ESP.json';
	usingRemoteJson = true;
 
	constructor(props) {
		super(props);	
		this.changeLanguageENG = this.changeLanguageENG.bind(this);
		this.changeLanguageESP = this.changeLanguageESP.bind(this);

		const localizationENG = require('./localization_ENG.js');
		this.state = {
		  localizedStrings: localizationENG.ENG,
		  isLoading: true
		};

		this.getJsonENG();
	}

	getJsonENG() {
		if (this.usingRemoteJson){
			this.getJsonAsync(this.jsonEngUrl);
		}
		else {
			var json = require('./jsons/JSON_ENG.json');
			this.state = {
				localizedStrings: this.state.localizedStrings,
				citiesJson: json,
				//isLoading: false
			};
			this.prefetchImages();
		}
	}
	
	getJsonESP() {
		if (this.usingRemoteJson){
			this.getJsonAsync(this.jsonEspUrl);
		}
		else {
			var json = require('./jsons/JSON_ESP.json');
			this.state = {
				localizedStrings: this.state.localizedStrings,
				citiesJson: json,
				//isLoading: false
			};
		}
	}
	
	prefetchImages(){
		
		var uris = []
		
		this.state.citiesJson.slice().map((city)=> {
			// load city images
			uris.push(city.mainImageSrc);
			if (city.otherImages != null){
				city.otherImages.slice().map((otherImage)=>uris.push(otherImage.imageSrc));
			}
			// load city menu images
			city.cityMenus.map((cityMenu)=> {
				if (uris.indexOf(cityMenu.imageSrc)<0){
					uris.push(cityMenu.imageSrc);
				}
				// load city menu item images
				cityMenu.items.slice().map((item)=>{
					uris.push(item.mainImageSrc);
					if (item.otherImages != null){
						item.otherImages.slice().map((otherImage)=>uris.push(otherImage.imageSrc));
					}
				});
			});
		});
		
		var imagePrefetch = [];
		for (let uri of uris) {
			imagePrefetch.push(Image.prefetch(uri));
		}
		Promise.all(imagePrefetch).then(results => {
			isLoading: false
			console.log("All images prefetched in parallel");
		});
	}
  
	getJsonAsync(url) {
		return fetch(url)
			.then((responseJson) => {
				/* Alert.alert("JSON OK!", "Response Body -> " + JSON.stringify(responseJson._bodyInit))*/
				this.state = {
					localizedStrings: this.state.localizedStrings,
					citiesJson: JSON.parse(responseJson._bodyInit),
					isLoading: false
				};
				Actions.refresh();
				return responseJson._bodyInit;
			})
			.catch((error) => { 
				Alert.alert("ERROR:", "Response Body -> " + JSON.stringify(error))
				console.error(error);
			});
	}
  
	changeLanguageENG(){
		const localizationENG = require('./localization_ENG.js');
		this.state = {
			citiesJson: this.state.citiesJson,
			isLoading: this.state.isLoading,
			localizedStrings: localizationENG.ENG
		};
		this.getJsonENG();
		Actions.refresh();
		this.goToGeneralMapPage(this.state.localizedStrings, this.state.citiesJson);
		//Alert.alert('',this.state.localizedStrings.languageChanged);
	}	

	changeLanguageESP(){
		
		const localizationESP = require('./localization_ESP.js');
		this.state = {
			citiesJson: this.state.citiesJson,
			isLoading: this.state.isLoading,
			localizedStrings: localizationESP.ESP
		};
		this.getJsonESP();
		Actions.refresh();
		this.goToGeneralMapPage(this.state.localizedStrings, this.state.citiesJson);
		//Alert.alert('',this.state.localizedStrings.languageChanged);
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

		const logoBackgroundImageSource = require('./img/JPGs/background_grey.jpg');
		const loginImageSource = require('./img/Icons/arrow_forward/android/drawable-xhdpi/ic_arrow_forward_black_24dp.png');
		const logoImageSource = require('./img/LOGO.png');

		//<StatusBar hidden={false} backgroundColor='#000' />
		
		if (this.state.isLoading) {
			return (
				<View style={styles.logoView}>
					<Image style={styles.logoBackgroundImage} source={logoBackgroundImageSource}>
						<View style={styles.languages}>
						</View>
						<View style={styles.logoBackground}>
							<Image style={styles.logoImage} source={logoImageSource}/>
						</View>
						<View style={styles.loginButtons}>
							<ActivityIndicator style={styles.loading} size="large" color='#F4F4F4' />
						</View>
					</Image>
				</View>
			)
		}
		
		return (
			<View style={styles.logoView}>
				<Image style={styles.logoBackgroundImage} source={logoBackgroundImageSource}>
					
					<View style={styles.logoBackground}>
						<Image style={styles.logoImage} source={logoImageSource}/>
					</View>
					
					<View style={styles.languages}>
						<TouchableHighlight style={styles.languageButton} underlayColor='#175389' onPress={this.changeLanguageENG}>
							<Text style={styles.languageButtonText}>ENGLISH</Text>
						</TouchableHighlight>
						<TouchableHighlight style={styles.languageButton} underlayColor='#175389' onPress={this.changeLanguageESP}>
							<Text style={styles.languageButtonText}>ESPAÑOL</Text>
						</TouchableHighlight>
					</View>
					
				</Image>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
	logoView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
	},
	logoBackgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		width: null,
		height: null,
	},
	logoImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
	},
	loginImage: {
		width: 30,
		height: 30,
		marginLeft:10,
	},
	loginButtonsView: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	facebookLoginImage: {
		width: 30,
		height: 30,
		marginLeft:10,
	},
	languages: {
		flex: 1,
		paddingTop: 10,
		alignSelf: 'stretch',
		alignItems: 'stretch',
		justifyContent: 'center',
		flexDirection: 'row'
	},	
	languageButton: {
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 1,
		width: 150,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	languageButtonText: {
		fontSize: 14,
		fontFamily: 'Brandon_bld',
		textAlign: 'center',
		color: '#F4F4F4'
	},
	logoBackground: {
		flex: 4,
		justifyContent: 'center',
	},
	logoText: {
		fontSize: 80,
		fontFamily: '1942',
		textAlign: 'center',
		color: '#F4F4F4'
	},
	loginButtons: {
		flex: 4,
		marginBottom: 5,
		marginTop: 5,
		marginLeft: 0,
		marginRight: 0,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	loginButton: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#CCCCCC55',
		borderWidth:2,
		borderColor: '#FFF',
		marginBottom: 35,
		width: 280,
		height: 45,
	},
	facebookLoginButton: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#3b599855',
		borderWidth: 2,
		borderColor: '#FFF',
		marginBottom: 10,
		width: 280,
		height: 45,
	},
	loginButtonText: {
		flex:1,
		flexDirection: 'column',
		alignSelf: 'center',
		fontSize: 20,
		marginLeft: 10,
		fontFamily: 'Roboto',
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#F4F4F4'
	},
	loading:{
		alignSelf: 'stretch',
		justifyContent: 'center',
	},
});
