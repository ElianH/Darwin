import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, ListView, Image, Dimensions, Alert, Linking} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import ViewPager from 'react-native-viewpager';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import NavBar from './NavBar';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class StickyCityViewHeader extends Component {
	
	constructor(props) {
		super(props);
	}
			
	handleClick = (url) => { 
		Linking.canOpenURL(url).then(supported => { 
			if (supported) { 
				Linking.openURL(url); 
			} else { 
				console.log('Don\'t know how to open URI: ' + url); 
			} 
		}); 
	}; 
			
	render() {
		
		// flat map all items for all menues (this will be passed to th map later)
		var arrays = this.props.selectedCity.cityMenus.slice().map((cityMenu)=>{
			return cityMenu.items.slice().map((item)=>{
				item.menuName = cityMenu.cityMenuName;
				item.menuImageSrc = cityMenu.imageSrc;
				return item; 
			})
		});
		var items = [].concat.apply([], arrays);
		var dealItems = items.slice().filter((item)=> { return (item.hasDeals === 'true' )});
		
		// navigation	
		const goToInfoPage = () => { Actions.infoPage({localizedStrings: this.props.localizedStrings, selectedItem: this.props.selectedCity}); };  
		const goToDealsPage = () => { Actions.dealsPage({localizedStrings: this.props.localizedStrings, items: dealItems}); };  
		const goToPlanYourTripPage = () => { Actions.cityPlanYourTripPage({localizedStrings: this.props.localizedStrings, selectedItem: this.props.selectedCity}); };  
		const goToWeatherPage = () => { Actions.cityWeatherPage({localizedStrings: this.props.localizedStrings, selectedItem: this.props.selectedCity}); };  
			
		// icons
		const informationImageSource = require('./img/Icons/info/android/drawable-xxhdpi/ic_info_outline_black_24dp.png');
		const dealsImageSource = require('./img/Icons/offer/android/drawable-xxhdpi/ic_local_offer_black_24dp.png');
		const planYourTripImageSource = require('./img/Icons/date/android/drawable-xxhdpi/ic_date_range_black_24dp.png');
		const weatherImageSource = require('./img/Icons/clima.png');

		return (
			<View style={styles.fixedMenuView}>	
				<TouchableHighlight style={styles.fixedMenuButton} underlayColor="#33333333" onPress={goToInfoPage}>
					<View style={styles.fixedMenuButtonView}>
						<Image style={styles.fixedMenuButtonImage} tintColor='#EEE'  resizeMode='contain' source={informationImageSource} />
						<Text style={styles.fixedMenuButtonText}>{this.props.localizedStrings.information}</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style={styles.fixedMenuButton} underlayColor="#33333333" onPress={goToDealsPage}>
					<View style={styles.fixedMenuButtonView}>
						<Image style={styles.fixedMenuButtonImage} tintColor='#EEE' resizeMode='contain' source={dealsImageSource} />
						<Text style={styles.fixedMenuButtonText}>{this.props.localizedStrings.deals}</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style={styles.fixedMenuButton} underlayColor="#33333333" onPress={goToPlanYourTripPage}>
					<View style={styles.fixedMenuButtonView}>
						<Image style={styles.fixedMenuButtonImage} tintColor='#EEE' resizeMode='contain' source={planYourTripImageSource} />
						<Text style={styles.fixedMenuButtonText}>{this.props.localizedStrings.planYourTrip}</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style={styles.fixedMenuButton} underlayColor="#33333333" onPress={() => { this.handleClick(this.props.selectedCity.weatherUrl); }}>
					<View style={styles.fixedMenuButtonView}>
						<Image style={styles.fixedMenuButtonImage} tintColor='#EEE'  resizeMode='contain' source={weatherImageSource} />
						<Text style={styles.fixedMenuButtonText}>{this.props.localizedStrings.weather}</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

export default class CityView extends Component {
	
	text = '';
	isSearching = false;
	drawStickyHeader = false;
	
	constructor(props) {
		super(props);
	}
  
  /*
  				<ListView contentContainerStyle={styles.cityMenusListView}
					dataSource={cityMenusDataSource}
					renderHeader={() => 
						<View style={{width:400, height:300}}>			
							<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
								<Text style={styles.cityBackgroundImageText}>{upperCaseCityName}</Text>
							</Image>
							<Text style={styles.cityInformationText}>{this.props.selectedCity.cityInformation}</Text>
						</View>
					}
					renderRow={(cityMenu) => 
						<TouchableHighlight style={styles.cityMenusListViewItem} underlayColor="#E83D01" onPress={() => { goToCityMenuPage(cityMenu) }}>
							<Text style={styles.cityMenusListViewItemText}>{cityMenu.cityMenuName}</Text>
						</TouchableHighlight>
					}>
				</ListView>
				
				<Carousel animate={false} indicatorAtBottom={false} indicatorOffset={0} >
					{this.props.selectedCity.cityMenus.map(function(object, i){
						return 					<View style={styles.container}>
						<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
							</Image>
					</View>
					})}
					<View style={styles.container}>
						<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
							</Image>
					</View>
					<View style={styles.container}>
						<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
							</Image>
					</View>
					<View style={styles.container}>
						<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
							</Image>
					</View>
				</Carousel>
									
										renderHeader={() => 
						<View style={{height:100, flexDirection:'row'}}>			
							<Image style={styles.cityBackgroundImage}
							source={{uri: this.props.selectedCity.mainImageSrc}}>
								<Text style={styles.cityBackgroundImageText}>{upperCaseCityName}</Text>
							</Image>
							<Text style={styles.cityInformationText}>{this.props.selectedCity.cityInformation}</Text>
						</View>
					}
									
					
		const fixedMenuItems = [];
		fixedMenuItems.push('');
		fixedMenuItems.push({imageSrc:informationImageSource, description:'info'});
		
							{fixedMenuItems.map(function(object, i){
						return 					
							<View style={{height:100, width:10, flex:1, margin:1, backgroundColor:'#F00'}}>
								<Image style={{height:50, width: 50}}
									source={object.imageSrc}>
									<Text style={styles.cityBackgroundImageText}>{upperCaseCityName}</Text>
								</Image>
								<Text style={styles.cityInformationText}>{object.description}</Text>
							</View>
					})}
	
  */

	handleScroll (event: Object) {
		console.log(event.nativeEvent.contentOffset.y);
		const offset = event.nativeEvent.contentOffset.y;
		const screenHeight = Dimensions.get('window').height;

		// Somehow figure out a way to check if past halfway only once 
		var x = (offset % screenHeight/2);
		if( x > 0 && x < 40){
		  // Run API call get more posts, then render the new components
		  //FeedActions.getMorePosts(nextUrl, true);
		}
		
		this.drawStickyHeader = this.isSearching || offset > 150;
		
		//this.setState({ offset: offset, drawStickyHeader: drawStickyHeader});
		Actions.refresh();
	}
  
	render() {
		
		// flat map all items for all menues (this will be passed to th map later)
		var arrays = this.props.selectedCity.cityMenus.slice().map((cityMenu)=> { 
			return cityMenu.items.slice().map((item)=>{
				item.typeName = cityMenu.cityMenuName;
				item.typeImageSrc = cityMenu.imageSrc;
				return item;
			}) 
		});
		var allMarkers = [].concat.apply([], arrays);
	
		// navigation	
		const goToCityMenuPage = (selectedCityMenu) => Actions.cityMenuPage({
			localizedStrings: this.props.localizedStrings, 
			selectedCity: this.props.selectedCity,
			selectedCityMenu: selectedCityMenu}); 
		const goToInfoPage = (item) => { Actions.infoPage({
			localizedStrings: this.props.localizedStrings, 
			selectedItem: item}); 
		};  
		const goToGeneralMapPage = () => { Actions.generalMapPage({
				localizedStrings: this.props.localizedStrings, 
				markers: allMarkers,
				showFilters: true,
				onMarkerClick: goToInfoPage
			}); 
		};
	
		// filtered results
		var filterText = this.text.toLowerCase();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var newFilter = this.props.selectedCity.cityMenus.slice().filter((cityMenu)=> { return (filterText === '' || cityMenu.cityMenuName.toLowerCase().indexOf(filterText) !== -1) });
		var filteredDataSource = ds.cloneWithRows(newFilter);
		
		// nav bar title
		var upperCaseCityName = this.props.selectedCity.name.toUpperCase();
			
		// city images (for view pager)
		const vpds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
		var cityImagesDataSource = vpds.cloneWithPages(this.props.selectedCity.otherImages);
	
		// sticky header icons
		const informationImageSource = require('./img/Icons/info/android/drawable-xxhdpi/ic_info_outline_black_24dp.png');
		const dealsImageSource = require('./img/Icons/offer/android/drawable-xxhdpi/ic_local_offer_black_24dp.png');
		const planYourTripImageSource = require('./img/Icons/date/android/drawable-xxhdpi/ic_date_range_black_24dp.png');
		const weatherImageSource = require('./img/Icons/clima.png');
//<!--Image style={styles.cityMenuButtonView} source={{ uri: cityMenu.otherImages[0].imageSrc }}-->
//<!--/Image-->
		
		return (

			<View style={{flex:1,alignSelf:'stretch'}}>
				<NavBar style={{height:50}} 
					title={upperCaseCityName} 
					localizedStrings={this.props.localizedStrings} 
					enableSearch={true}
					onSearchChanged={(isSearching, text) => { 
						this.isSearching = isSearching;  
						this.text = text;
					}}
					onMapButtonClick={goToGeneralMapPage}
				/>
				<View style={styles.cityBackground}>
					<ListView contentContainerStyle={styles.cityMenusListView}
						dataSource={filteredDataSource}
						onScroll={this.handleScroll.bind(this)}
						renderHeader={() => 
							<View style={styles.cityListViewHeader}>
								{
									(!this.isSearching) &&
									<View style={styles.cityImagePagerView}>
										<ViewPager
											dataSource={cityImagesDataSource}
											renderPage={(cityImage) =>
												<View style={styles.cityBackgroundImageView}>
													<Image style={styles.cityBackgroundImage}
														source={{uri: cityImage.imageSrc}}>
													</Image>
												</View>
											}
										/>
									</View>
								}
								<StickyCityViewHeader localizedStrings={this.props.localizedStrings} selectedCity={this.props.selectedCity} />
							</View>
						}
						renderRow={(cityMenu) => {
							return (
							<TouchableHighlight style={styles.cityMenuButton} underlayColor="#33333333" onPress={() => { goToCityMenuPage(cityMenu) }}>
								
								<View style={styles.cityMenuButtonView}>
									<Image style={styles.cityMenuButtonImage} tintColor='#EEEEEE' resizeMode='contain' source={{ uri: cityMenu.imageSrc }} />
									<Text style={styles.cityMenuButtonText}>{cityMenu.cityMenuName}</Text>
								</View>
								
							</TouchableHighlight>
							)
						}}>
					</ListView>
					{
						(this.drawStickyHeader) &&
						<View style={styles.stickyFixedMenuView}>	
							<StickyCityViewHeader localizedStrings={this.props.localizedStrings} selectedCity={this.props.selectedCity} />
						</View>
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
	cityBackground: {
		flex: 1,
		backgroundColor: '#000',
		alignSelf: 'stretch',
		flexDirection: 'column',
	},		
	cityMenusListView: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	cityListViewHeader: {
		alignSelf: 'flex-start',
		flexDirection:'column',
	},
	cityImagePagerView: {
		height:150,
		width: deviceWidth,
	},
	cityBackgroundImageView: {
		flex: 1,
		flexDirection:'column',
	},
	cityBackgroundImage:{
		flex: 1,
	},
	fixedMenuView: {
		height:100, 
		flexDirection:'row',
		width: deviceWidth,
		backgroundColor: '#000',
	},
	fixedMenuButton: {
		backgroundColor:'#444444',
		alignSelf:'stretch',
		alignItems:'center',
		flexDirection:'row',
		justifyContent: 'center',
		flex:1,
	},
	fixedMenuButtonView: {
		flexDirection:'column',
		alignItems:'center',
		alignSelf:'center',
	},
	fixedMenuButtonImage: {
		width:60,
		height:50,
	},
	fixedMenuButtonText: {
		fontSize: 12,
		color: '#EEEEEE',
	},
	stickyFixedMenuView: {
		...StyleSheet.absoluteFillObject,
		position : 'absolute',
		top: -2,
		left: -1,
		height:100,
		flexDirection:'row',
		backgroundColor: '#000',
	},
	cityMenuButton:{
		width: 100,
		height: 120,
		backgroundColor:'#232323',
		alignSelf:'stretch',
		alignItems:'center',
		flexDirection:'row',
		justifyContent: 'center',
		flex:1,
		margin:1,
	},
	cityMenuButtonView: {
		flexDirection:'column',
		alignItems:'center',
		alignSelf:'center',
	},
	cityMenuButtonImage: {
		width:60,
		height:50,
	},
	cityMenuButtonText: {
		fontSize: 12,
		margin:5,
		color: '#EEEEEE',
		justifyContent: 'center'
	},
});