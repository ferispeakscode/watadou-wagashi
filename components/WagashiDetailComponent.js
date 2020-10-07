import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        wagashi: state.wagashi,
        comments: state.comments,
        favorites: state.favorites
    };
};

//dispatch reducers using thunk
const mapDispatchToProps = {
    postFavorite: wagashiId => (postFavorite(wagashiId)),
    postComment: (wagashiId, rating, author, text) => (postComment(wagashiId, rating, author, text))
};

function RenderWagashi(props) {

    const {wagashi} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const recognizeComment = ({dx}) => (dx > 200) ? true : false;
    const recognizeOrder = ({dy}) => (dy > 100) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + wagashi.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'Yes',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (recognizeComment(gestureState)) {
                props.onShowModal();
            } else if (recognizeOrder(gestureState)) {
                Alert.alert(
                    'Make an Order?',
                    'Would you like to proceed to the order screen? Press "Yes" to confirm.',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'Yes',
                            onPress: () => props.makeOrder()
                        }
                    ]
                );
            }
        }
    });

    const shareWagashi = (title, message, url) => {
        Share.share({
            title,
            message: `${title}: ${message} ${url}`,
            url
        }, {
            dialogTitle: 'Share ' + title
        });
    };

    if (wagashi) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={wagashi.name}
                    image={{uri: baseUrl + wagashi.image}}>
                    <Text style={{margin: 10}}>
                        {wagashi.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon 
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#F56476'
                            raised
                            reverse
                            onPress={() => props.favorite ? console.log('Already set as a favorite') : props.markFavorite()}
                        />
                        <Icon 
                            style={styles.cardItem}
                            name='pencil'
                            type='font-awesome'
                            color='#FFC60A'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                        <Icon 
                            style={styles.cardItem}
                            name='share'
                            type='font-awesome'
                            color='#AE323B'
                            raised
                            reverse
                            onPress={() => shareWagashi(wagashi.name, wagashi.description, baseUrl + wagashi.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating 
                    style={{alignItems: 'flex-start', paddingVertical:'5%'}}
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class WagashiDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            author: '',
            text: '',
            showModal: false
        }
    }

    markFavorite(wagashiId) {
        this.props.postFavorite(wagashiId);
    }

    makeOrder() {
        this.props.navigation.navigate('Order');
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(wagashiId) {
        this.props.postComment(wagashiId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            text: '',
            showModal: false
        });
    }

    static navigationOptions = {
        title: 'Wagashi Details'
    }

    render () {
        const wagashiId = this.props.navigation.getParam('wagashiId');
        const wagashi = this.props.wagashi.wagashi.filter(wagashi => wagashi.id === wagashiId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.wagashiId === wagashiId);
        console.log("rendered comments are:" + comments);
        console.log(this.props.comments.comments);

        return (
            <ScrollView>
                <RenderWagashi wagashi={wagashi} 
                    favorite={this.props.favorites.includes(wagashiId)}
                    markFavorite={() => this.markFavorite(wagashiId)}
                    onShowModal={() => this.toggleModal()}
                    makeOrder={() => this.makeOrder()}
                />
                <RenderComments comments={comments} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating 
                            style={{paddingVertical: 10}}
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({rating: rating})}
                        />
                        <Input 
                            placeholder='Author'
                            leftIcon={{type: 'font-awesome', name:'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(author) => this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input 
                            placeholder='Comment'
                            leftIcon={{type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(text) => this.setState({text: text})}
                            value={this.state.text}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.handleComment(wagashiId);
                                    this.resetForm();
                                }}
                                color='#AE323B'
                                title='Submit'
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#3B374B'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WagashiDetail);