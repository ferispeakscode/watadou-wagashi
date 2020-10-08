import React, { Component } from 'react';
import { Alert, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteOrder } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        wagashi: state.wagashi,
        favorites: state.favorites,
        orders: state.orders
    };
};

const mapDispatchToProps = {
    deleteOrder: orderId => (deleteOrder(orderId))
};

class OrderHistory extends Component {

    static navigationOptions = {
        title: 'My Orders'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Order?',
                            'Are you sure you wish to delete these order details from favorites?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => console.log(item.name + 'not deleted.'),
                                },
                                {
                                    text: "Yes",
                                    onPress: () => this.props.deleteOrder(item.id)
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                }
            ];

            return(
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem 
                            title={item.name}
                            subtitle={item.shortDescription}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('OrderDetail', { orderId: item.id })}
                        />
                    </Animatable.View>
                </Swipeout>
            );
        };

        // if (this.props.wagashi.isLoading) {
        //     return <Loading />;
        // }
        // if (this.props.wagashi.errMess) {
        //     return (
        //         <View>
        //             <Text>{this.props.wagashi.errMess}</Text>
        //         </View>
        //     );
        // }
        return(
            <FlatList
                data={this.props.wagashi.wagashi.filter(
                    w => this.props.favorites.includes(w.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);