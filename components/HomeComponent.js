import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        promotions: state.promotions,
        wagashi: state.wagashi,
        suppliers: state.suppliers
    };
};

function RenderItem(props) {
    const {item} = props;
    
    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                    {item.shortDescription}
                </Text>
            </Card>
        );
    }
    return <View />
}

class Home extends Component {

    static navigationOptions = {
        title: 'World of Wagashi'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.wagashi.wagashi.filter(w => w.featured)[0]}
                    isLoading={this.props.wagashi.isLoading}
                    errMess={this.props.wagashi.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem 
                    item={this.props.suppliers.suppliers.filter(supplier => supplier.featured)[0]}
                    isLoading={this.props.suppliers.isLoading}
                    errMess={this.props.suppliers.errMess}
                />
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(Home);