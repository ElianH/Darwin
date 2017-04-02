import React, { Component } from 'react';
import { Dimensions, Image, ListView, PixelRatio, StyleSheet, Text, View, StatusBar, Alert, TouchableHighlight, Linking} from 'react-native';
import ViewPager from 'react-native-viewpager';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from './ParallaxScrollView'
import NavBar from './NavBar'

export default class InfoView extends Component {

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		
		/*
		var food = [
			{name: "Lettuce", category: "Vegetable"}, 
			{name: "Lettuce1", category: "Vegetable"}, 
			{name: "Lettuce2", category: "Vegetable"}, 
			{name: "Lettuce3", category: "Vegetable"}, 
			{name: "Apple", category: "Fruit"},
			{name: "Orange", category: "Fruit"},
			{name: "Potato", category: "Vegetable"}
		];

		var foodCategoryMap = {}; // Create the blank map
		food.forEach(function(foodItem) {
			if (!foodCategoryMap[foodItem.category]) {
				// Create an entry in the map for the category if it hasn't yet been created
				foodCategoryMap[foodItem.category] = [];
			}
			foodCategoryMap[foodItem.category].push(foodItem);
		});

		const sectionIds = ['a'];
		const rowIds = ['1'];
		this.state =  {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2
				}).cloneWithRowsAndSections (foodCategoryMap)
		};*/
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
  
	renderRow(row) {
		if ((row != null)&&(row.itemType != null)){
			switch (row.itemType) {
				case 'TITLE':
					return (
						<View style={styles.rowView}>
							<Text style={{flex:1, fontSize:18}}>{row.text}</Text>
						</View>
					);
				case 'LINE':
					return (
						<View style={{margin:10, height:2, backgroundColor:'#CCC'}}/>
					);
				case 'TEXT':
					return (
						<View style={styles.rowView}>
							<Text style={{flex:1, fontSize:14}}>{row.text}</Text>
						</View>
					);
				case 'BOLD_TEXT':
					return (
						<View style={styles.rowView}>
							<Text style={{flex:1, fontSize:14, fontWeight:'bold'}}>{row.text}</Text>
						</View>
					);
				case 'DOUBLE_COLUMN_TEXT':
					return (
						<View style={[styles.rowView, {justifyContent:'space-between', flexDirection:'row'}]}>
							<Text>{row.textColumnLeft}</Text>
							<Text>{row.textColumnRight}</Text>
						</View>
					);
				case 'PHONE':
					return (
						<TouchableHighlight style={styles.rowViewTouchable} onPress={() => { this.handleClick(row.number); }}>
							<View>
								<Text style={styles.rowViewTouchableText}>{row.text}</Text>
							</View>
						</TouchableHighlight>
					);
				case 'WEBSITE':
					return (
						<TouchableHighlight style={styles.rowViewTouchable} onPress={() => { this.handleClick(row.url); }}>
							<View>
								<Text style={styles.rowViewTouchableText}>{row.text}</Text>
							</View>
						</TouchableHighlight>
					);
				case 'EMAIL':
					return (
						<TouchableHighlight style={styles.rowViewTouchable} onPress={() => { this.handleClick(row.email); }}>
							<View>
								<Text style={styles.rowViewTouchableText}>{row.text}</Text>
							</View>
						</TouchableHighlight>
					);
				case 'MAP':
					return (
						<TouchableHighlight style={styles.rowViewTouchable} onPress={() => { this.handleClick(row.location); }}>
							<View>
								<Text style={styles.rowViewTouchableText}>{row.text}</Text>
							</View>
						</TouchableHighlight>
					);
				case 'SHARE':
					return (
						<View>
							<Text>SHARE Not supported yet</Text>
						</View>
					);
				case 'FACEBOOK_PAGE':
					return (
						<View>
							<Text>FACEBOOK_PAGE Not supported yet</Text>
						</View>
					);
				case 'DEALS':
					return (
						<View>
							<Text>DEALS Not supported yet</Text>
						</View>
					);
				case 'BOOKING':
					return (
						<View>
							<Text>BOOKING Not supported yet</Text>
						</View>
					);
				case 'SPACE':
					return (
						<View style={{height:100}}>
						</View>
					);
			}
		}
		return ( <View/> );
	}

  render() {
	  
    const { onScroll = () => {} } = this.props;

	// navigation
	const goToInfoPage = (item) => { Actions.infoPage({
			localizedStrings: this.props.localizedStrings, 
			selectedItem: this.props.selectedItem}); 
		};  
	const goToGeneralMapPage = () => { Actions.generalMapPage({
			localizedStrings: this.props.localizedStrings, 
			markers: [ this.props.selectedItem ],
			showFilters: false,
			onMarkerClick: goToInfoPage
		}); 
	};
		
	// city images (for view pager)
	const vpds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
	var otherImages = [];
	if (this.props.selectedItem.otherImages != null){
		otherImages = this.props.selectedItem.otherImages;
	}
	var cityImagesDataSource = vpds.cloneWithPages(otherImages);
	
	// info items
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	var infoItems = [];
	if (this.props.selectedItem.infoItems != null){
		infoItems = this.props.selectedItem.infoItems;
	}
	var infoItemsDataSource = ds.cloneWithRows(infoItems);
		
	
	/*
								<View style={{position: 'absolute',
										  top: 0,
										  width: window.width,
										  backgroundColor: 'rgba(0,0,0,.4)',
										  height: PARALLAX_HEADER_HEIGHT}}/>
										  
										  renderFixedHeader={() => (
					  <View key="fixed-header" style={styles.fixedSection}>
						<Text style={styles.fixedSectionText}
							  onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
						  Scroll to top
						</Text>
					  </View>
					)}
										  
										  renderBackground
										  
										  					renderForeground={() => (
					  <View key="parallax-header" style={ styles.parallaxHeader }>
						<Image style={ styles.avatar } source={{
						  uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
						  width: AVATAR_SIZE,
						  height: AVATAR_SIZE
						}}/>
						<Text style={ styles.sectionSpeakerText }>
						  Talks by Rich Hickey
						</Text>
						<Text style={ styles.sectionTitleText }>
						  CTO of Cognitec, Creator of Clojure
						</Text>
					  </View>
					)}
					
					
					renderFixedHeader={() => (
					  <View key="fixed-header" style={styles.fixedSection}>
						<NavBar style={{height:50}} 
							title=''							
							localizedStrings={this.props.localizedStrings} 
							enableSearch={false}
							onMapButtonClick={goToGeneralMapPage}
						/>
					  </View>
					)}/>
					
								
				<TouchableHighlight style={styles.navBarBackButton} onPress={() => {
					this.text = '';
					this.isSearching = false;
					Actions.pop();
					}}>
					<Image style={styles.navBarBackButtonImage} tintColor='#EEEEEE' source={navBarBackButtonImageSource}/>
				</TouchableHighlight>
				<View style={{flex:1}}/>
				<TouchableHighlight style={styles.navBarMapButton} onPress={() => { this.props.onMapButtonClick(); }}>
					<Image style={styles.navBarMapButtonImage} tintColor='#EEEEEE' source={navBarMapButtonImageSource}/>
				</TouchableHighlight>

				renderSectionHeader={ (sectionData, sectionID) =>	
					<View style={{width:400, height:100, backgroundColor:'#0F0'}}>
						<Text>test section header</Text>
					</View>
				}
				*/
	
	//const navBarBackButtonImageSource = require('./img/Icons/arrow_back/android/drawable-xhdpi/ic_arrow_back_black_24dp.png');
	//const navBarMapButtonImageSource = require('./img/Icons/map/android/drawable-xhdpi/ic_map_black_48dp.png');
	
    return (
		<View style={{flex:1}}>
			<StatusBar hidden={false} backgroundColor='#000' />

			<ListView
				ref="ListView"
				style={styles.container}
				dataSource={ infoItemsDataSource }
				renderRow={this.renderRow}		 
				initialListSize={100} 
				removeClippedSubviews={false}
				renderHeader={() => 
					<View style={{ backgroundColor:'#000', flexDirection:'column', justifyContent: 'space-between', padding:15}}>			
						<Text style={{ color:'#FFF', fontSize:27, fontFamily:'Brandon_bld'}}>{this.props.selectedItem.name.toUpperCase()}</Text>
						<Text style={{ color:'#FFF', fontSize:16, fontFamily:'Brandon_bld'}}>{"Testing the sub header, max six words".toUpperCase()}</Text>
						<Text style={{ color:'#AAA', fontSize:16, fontFamily:'Brandon_bld'}}>Some more info here, six to ten words here</Text>
					</View>
				}

				renderScrollComponent={props => (
				  <ParallaxScrollView
					onScroll={onScroll}
					headerBackgroundColor="#333"
					fadeOutForeground={false}
					stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
					parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
					backgroundSpeed={10}
					
					renderForeground={() => (
						<View key="background" style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT}}>
							<ViewPager
								dataSource={cityImagesDataSource}
								renderPage={(cityImage) =>
									<View style={styles.cityBackgroundImageView}>
										<Image style={styles.cityBackgroundImage}
											source={{uri: cityImage.imageSrc}}>
										</Image>
									</View>
								}/>

						</View>
					)}

					renderStickyHeader={() => (
						<View style={{height:50, backgroundColor:'#000', alignSelf:'stretch', alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
							<Text style={styles.navBarText}>{this.props.selectedItem.name.toUpperCase()}</Text>
						</View>
					)}/>
				)}
			/>
			<View style={styles.navBarView}>
				<NavBar
					title='' 
					style={styles.navBar}
					backgroundColor='transparent'
					localizedStrings={this.props.localizedStrings}
					enableSearch={false}
					onMapButtonClick={goToGeneralMapPage}/>
			</View>
		</View>
    );
  }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({

	navBarView: {
		...StyleSheet.absoluteFillObject,
		position: 'absolute',
		top: 0,
		height: 50,
	},
	navBar: {
		width: window.width,
	},
	navBarText: {
		fontSize: 15,
		fontFamily: 'Brandon_bld',
		color: '#EEE',
		justifyContent:'center',
		alignSelf:'center',
	},	
	cityBackgroundImageView: {
		flex: 1,
		flexDirection:'column',
	},
	cityBackgroundImage:{
		flex: 1,
	},
	container: {
		...StyleSheet.absoluteFillObject,
		position: 'absolute',
		top: 0,
		backgroundColor: 'black'
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: 300,
		justifyContent: 'flex-end'
	},
	stickySectionText: {
		color: 'white',
		fontSize: 20,
		margin: 10
	},
	fixedSection: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 20
	},
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 100
	},
	avatar: {
		marginBottom: 10,
		borderRadius: AVATAR_SIZE / 2
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 24,
		paddingVertical: 5
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 5
	},
	row: {
		overflow: 'hidden',
		paddingHorizontal: 10,
		height: ROW_HEIGHT,
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderBottomWidth: 1,
		justifyContent: 'center'
	},
	rowText: {
		fontSize: 20
	},
	rowView: {
		paddingLeft: 15,
		paddingRight: 15,
	},
	rowViewTouchable: {
		marginTop: 2,
		padding:5,
		marginBottom: 2,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: '#DDD',
	},
	rowViewTouchableText: {
		fontSize: 23,
		fontFamily: 'Brandon_bld',
		color: '#222'
	}
});