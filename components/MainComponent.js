import React, { Component } from 'react';
import Home from './HomeComponent';
import Catalog from './CatalogComponent';
import WagashiDetail from './WagashiDetailComponent';
import Favorites from './FavoritesComponent';
import Order from './OrderComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchComments, fetchPromotions, fetchWagashi, fetchSuppliers } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

const mapDispatchToProps = {
    fetchWagashi,
    fetchComments,
    fetchPromotions,
    fetchSuppliers
};

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({navigation}) => ({
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
        })
    }
);

const CatalogNavigator = createStackNavigator(
    {
        Catalog: { screen: Catalog },
        WagashiDetail: { screen: WagashiDetail }
    },
    {
        initialRouteName: 'Catalog',
        navigationOptions: ({navigation}) => ({
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
        })
    }
);

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#4F171B'
            },
            headerTintColor: '#EAE8ED',
            headerTitleStyle: {
                color: '#EAE8ED'
            },
            headerLeft: <Icon
                name='heart'
                type='font-awesome'
                iconStyle={{margin: 20, color: '#EAE8ED'}}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const OrderNavigator = createStackNavigator(
    {
        Order: { screen: Order },
    },
    {
        navigationOptions: ({navigation}) => ({
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
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
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
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({navigation}) => ({
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
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View>
                    <Image
                        source={require('./images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex: 2}}>
                    <Text style={{fontFamily: 'Kaushan-Script', fontSize: 28, color: '#AE323B', marginRight: 10}}>Wagashi</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
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
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'Favorite Wagashi',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='heart'
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
        drawerBackgroundColor: '#E5D5C7',
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: '#AE323B',
            inactiveTintColor: '#1E1E24'
        }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#E5D5C7',
        height: 180,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 30
    },
    drawerImage: {
        marginLeft: 10,
        height: 160,
        width: 160
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);