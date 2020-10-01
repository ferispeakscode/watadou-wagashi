import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

import Catalog from './CatalogComponent';
import WagashiDetail from './WagashiDetailComponent';
import Order from './OrderComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchComments, fetchPromotions, fetchWagashi, fetchSuppliers } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';

const mapDispatchToProps = {
    fetchComments,
    fetchPromotions,
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

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
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
        About: { screen: About }
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
                name='user-circle'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
                onPress={() => navigation.toggleDrawer()}
            />
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
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

const OrderNavigator = createStackNavigator(
    {
        Order: { screen: Order },
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
                name='plus-circle'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
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
        Order: {
            screen: OrderNavigator,
            navigationOptions: {
                drawerLabel: 'Order Wagashi for Pickup',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='plus-circle'
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
                        name='user-circle'
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
                        name='address-card'
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
        this.props.fetchComments();
        this.props.fetchPromotions();
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