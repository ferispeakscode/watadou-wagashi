import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        wagashi: state.wagashi
    };
};

class Catalog extends Component {

    static navigationOptions = {
        title: 'Catalog'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderWagashiItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('WagashiDetail', { wagashiId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        if (this.props.wagashi.isLoading) {
            return <Loading />;
        }
        if (this.props.wagashi.errMess) {
            return (
                <View>
                    <Text>{this.props.wagashi.errMess}</Text>
                </View>
            );
        }
        return(
            <FlatList
                data={this.props.wagashi.wagashi}
                renderItem={renderWagashiItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Catalog);