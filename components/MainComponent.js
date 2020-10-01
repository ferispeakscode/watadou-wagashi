import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';

import Catalog from './CatalogComponent';
import WagashiDetail from './WagashiDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners, fetchWagashi, fetchSuppliers } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners,
    fetchWagashi,
    fetchSuppliers
};

const CatalogNavigator = createStackNavigator(
    {
        Catalog: { screen: Catalog },
        WagashiDetail: { screen: WagashiDetail }
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
            },
            headerLeft: <Icon
                name='list-alt'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
                onPress={() => navigation.toggleDrawer()}
            />
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
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color: '#EAE8ED'
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
                backgroundColor: '#4F171B'
            },
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color: '#EAE8ED'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
                onPress={() => navigation.toggleDrawer()}
            />
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
                backgroundColor: '#4F171B'
            },
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color:'#EAE8ED'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
                onPress={() => navigation.toggleDrawer()}
            />
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
                backgroundColor: '#4F171B'
            },
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color:'#EAE8ED'
            },
            headerLeft: <Icon 
                name='question'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
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
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color:'#EAE8ED'
            },
            headerLeft: <Icon 
                name='tree'
                type='font-awesome'
                iconStyle={{margin: 20}}
                onPress={() => navigation.toggleDrawer()}
            />
        }
    }
);



const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
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
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: { 
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='question'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } 
        }
    },
    {
        drawerBackgroundColor: '#E5D5C7'
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
        this.props.fetchWagashi();
        this.props.fetchSuppliers();
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