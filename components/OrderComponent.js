import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            number: 1,
            date: '',
            gift: false,
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Order'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleOrder() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            name: '',
            number: 1,
            date: '',
            gift: false,
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Name</Text>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Wagashi</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.number}
                        onValueChange={itemValue => this.setState({number: itemValue})}>
                        <Picker.item label='1' value='1' />
                        <Picker.item label='2' value='2' />
                        <Picker.item label='3' value='3' />
                        <Picker.item label='4' value='4' />
                        <Picker.item label='5' value='5' />
                        <Picker.item label='6' value='6' />
                        <Picker.item label='7' value='7' />
                        <Picker.item label='8' value='8' />
                        <Picker.item label='9' value='9' />
                        <Picker.item label='10' value='10' />
                        <Picker.item label='11' value='11' />
                        <Picker.item label='12' value='12' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Pickup Date</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Pickup Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Gift Box?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.gift}
                        trackColor={{true: '#AE323B', false: null}}
                        onValueChange={value => this.setState({gift: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Order'
                        color='#4F171B'
                        accessibilityLabel='Tap me to make an order for wagashi'
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Order Confirmation</Text>
                        <Text style={styles.modalText}>Name: {this.state.name}</Text>
                        <Text style={styles.modalText}>Number of Wagashi: {this.state.number}</Text>
                        <Text style={styles.modalText}>Pickup Date: {this.state.date}</Text>
                        <Text style={styles.modalText}>Gift Box Needed: {this.state.gift ? 'Yes' : 'No'}</Text>
                        <Button 
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#4F171B'
                            title='Close'
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#4F171B',
        textAlign: 'center',
        color: '#EAE8ED',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Order;