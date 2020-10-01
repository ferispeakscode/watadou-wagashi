import React, { Component } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl'; 
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        suppliers: state.suppliers
    };
};

const Mission = () => {
    return (
        <Card title="Our Mission">
            <Text>
                We wish to share the art of wagashi (Japanese traditional confectionaries) and Japanese culture with the world.
            </Text>
        </Card>
    );
};

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {

        const renderSupplier = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        };

        if (this.props.suppliers.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Our Suppliers'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.suppliers.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Our Suppliers'>
                        <Text>{this.props.suppliers.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        return(
            <ScrollView>
                <Mission />
                <Card title='Our Suppliers'>
                    <FlatList
                        data={this.props.suppliers.suppliers}
                        renderItem={renderSupplier}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);

