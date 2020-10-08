import React, { Component } from 'react';
import { Alert, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { deleteOrder } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        orders: state.orders
    };
};

const mapDispatchToProps = {
    deleteOrder: id => (deleteOrder(id))
};

class OrderHistory extends Component {

    static navigationOptions = {
        title: 'My Order History'
    }

    render() {
        const renderOrderItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Order Details?',
                            'Are you sure you wish to delete the details for this order from history? (Note: For cancellations, please contact us directly.)',
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
                            title={
                                <View>
                                    <Text style={{fontSize: 20}}>Customer Name: {item.name}</Text>
                                </View>}
                            subtitle={
                                <View style={{marginLeft: 20}}>
                                    <Text>Wagashi Type: {item.type}</Text>
                                    <Text>Number Ordered: {item.number}</Text>
                                    <Text>Pickup Date: {item.date}</Text>
                                    {/* <Text>Gift Wrap: {item.gift}</Text> */}
                                </View>
                            }
                        />
                    </Animatable.View>
                </Swipeout>
            );
        };

        return(
            <FlatList
                data={this.props.orders.orders.filter(order => order.id === order.id)}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);