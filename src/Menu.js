import React, { Component } from 'react';
import {
	View,
	Alert,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	SafeAreaView
} from 'react-native';
import { Colors, Images, FontSizes } from './theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '@text';
import { deviceWidth, deviceHeight, windowHeight } from '@ResponsiveDimensions';
import { NavigationActions } from 'react-navigation';
import store from './Store';
import { ArrowText } from '@components';

const CHECK_ROUTES = [ 'DiscussionStarter', 'CardGame' ];
export default class Menu extends Component {
	goto(routeName) {
		this.props.navigation.navigate('DrawerClose');
		if (store.activeRoute == routeName) return;

		let goToRoute = (routeName) => {
			setTimeout(() => {
				var key = `${routeName} ${store.routesInStack.length}`;
				store.activeRoute = routeName;
				store.routesInStack.push(key);
				this.props.navigation.navigate({ routeName, key });
			}, 500);
		};

		if (CHECK_ROUTES.includes(store.activeRoute)) {
			setTimeout(() => {
				const { navigate, goBack } = this.props.navigation;
				Alert.alert(
					'Are you sure?',
					'Any information you have entered will be deleted.',
					[
						{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{
							text: 'YES',
							onPress: () => {
								goToRoute(routeName);
							}
						}
					],
					{ cancelable: false }
				);
			}, 500);
		} else {
			goToRoute(routeName);
		}
	}

	goBackToOnboarding() {
		const resetAction = NavigationActions.reset({
			index: 0,
			key: null,
			actions: [ NavigationActions.navigate({ routeName: 'OnBoardingScreen' }) ]
		});
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: Colors.darkNavy }}>
				<View style={styles.circle_above}>
					<Image source={Images.dtt_blue} style={styles.logo} />
				</View>
				<View style={styles.menu}>
					<TouchableOpacity style={styles.menuItem}>
						<ArrowText light bold color={Colors.white}>
							About this app
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goBackToOnboarding()}>
						<ArrowText light bold color={Colors.white}>
							Welcome slides
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('DiscussionStarter')}>
						<ArrowText light bold color={Colors.white}>
							Use discussion starter
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('CardGame')}>
						<ArrowText light bold color={Colors.white}>
							Start discussion cards
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('UserGuides')}>
						<ArrowText light bold color={Colors.white}>
							App instructions
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('Resources')}>
						<ArrowText light bold color={Colors.white}>
							Resource library
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('GetHelp')}>
						<ArrowText light bold color={Colors.white}>
							Looking after yourself
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem}>
						<ArrowText light bold color={Colors.white}>
							Take our survey
						</ArrowText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('Page')}>
						<ArrowText light bold color={Colors.white}>
							Privacy Policy
						</ArrowText>
					</TouchableOpacity>
				</View>
				<Image
					source={Images.logo_footer}
					resizeMode={'contain'}
					style={{
						width: deviceHeight(20),
						height: deviceHeight(5),
						marginBottom: deviceWidth(1),
						alignSelf: 'center'
					}}
				/>
				<Image
					source={Images.flying_doctor_logo}
					resizeMode={'contain'}
					style={{
						width: deviceHeight(20),
						height: deviceHeight(5.5),
						marginBottom: deviceWidth(1),
						alignSelf: 'center'
					}}
				/>
				<SafeAreaView style={{ backgroundColor: Colors.darkNavy }}>
					<View style={styles.footer}>
						<Text style={styles.text_footer}>Funded by the Australian Goverment</Text>
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: Colors.Navy
	},

	circle_above: {
		width: deviceWidth(30),
		height: deviceWidth(30),
		borderRadius: deviceWidth(15),
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: deviceWidth(5)
	},

	logo: {
		width: deviceWidth(23),
		height: deviceWidth(23),
		resizeMode: 'contain'
	},

	icon_dtt: {
		tintColor: '#fff'
	},

	menu: {
		flex: 1,
		padding: 24
	},

	menuItem: {
		paddingVertical: deviceWidth(1.2)
	},

	footer: {
		paddingHorizontal: 8,
		backgroundColor: Colors.darkNavy,
		justifyContent: 'center',
		alignItems: 'center',
		height: deviceHeight(5)
	},

	text_footer: {
		color: '#fff',
		fontSize: 16,
		fontStyle: 'italic'
	}
});
