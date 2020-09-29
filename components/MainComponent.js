import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';

import Catalog from './CatalogComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners, fetchWagashi } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners,
    fetchWagashi
};

const CatalogNavigator = createStackNavigator(
    {
        Catalog: { screen: Catalog },
        // WagashiInfo: { screen: WagashiInfo }
    },
    {
        initialRouteName: 'Catalog',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#4F171B'
            },
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color: '#EAE8ED'
            }
        }
    }
);

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color:'#fff'
            },
            headerLeft: <Icon 
                name='address-card'
                type='font-awesome'
                // iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        }
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color:'#fff'
            },
            headerLeft: <Icon 
                name='tree'
                type='font-awesome'
                // iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        }
    }
);



const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Catalog: {
            screen: CatalogNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='list-alt'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Reservation: { 
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: { title: 'About Us'} },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: { title: 'Contact Us'} }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
        this.props.fetchWagashi();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <MainNavigator />
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);