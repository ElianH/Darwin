import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageTwo extends Component {
	render() {
	  const goToPageLogo = () => Actions.pageLogo({localizedStrings: this.props.localizedStrings}); 
	  return (
		<View style={{margin: 128}}>
		  <Text>This is PageTwo!</Text>
		  <Text>{this.props.text}</Text>
		  <Text onPress={goToPageLogo}>Go to Logo!</Text>
		</View>
	  );
	}
}