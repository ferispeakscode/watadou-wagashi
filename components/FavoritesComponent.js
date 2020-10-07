import React, { Component } from 'react';
import { Alert, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        wagashi: state.wagashi,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: wagashiId => deleteFavorite(wagashiId)
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
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
                            'Delete Favorite?',
                            'Are you sure you wish to delete ' + item.name + ' from favorites?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => console.log(item.name + 'not deleted.'),
                                },
                                {
                                    text: "Yes",
                                    onPress: () => this.props.deleteFavorite(item.id)
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
                            onPress={() => navigate('WagashiDetail', { wagashiId: item.id })}
                        />
                    </Animatable.View>
                </Swipeout>
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
                data={this.props.wagashi.wagashi.filter(
                    w => this.props.favorites.includes(w.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);