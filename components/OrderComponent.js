import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            number: 1,
            date: '',
            gift: false,
        };
    }

    static navigationOptions = {
        title: 'Order Wagashi'
    }

    submitForm = () => {
        Alert.alert(
            "Submit Order?",
            `Customer Name: ${this.state.name}\n\nType of Wagashi: ${this.state.type}\n\nNumber of Wagashi: ${this.state.number}\n\nPickup Date: ${this.state.date}\n\nGiftbox Needed: ${this.state.gift}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => this.resetForm()
                },
                {
                    text: "Submit",
                    onPress: () => this.resetForm()
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            name: '',
            type: '',
            number: 1,
            date: '',
            gift: false,
        });
    }

    render() {
        return (
            <Animatable.View animation ='zoomIn' duration={500} delay={500}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Customer Name</Text>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Type of Wagashi</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.type}
                        onValueChange={itemValue => this.setState({type: itemValue})}>
                        <Picker.item label='Choose' value='' />
                        <Picker.item label='Mejiro' value='Mejiro' />
                        <Picker.item label='Usuzumi-zakura' value='Usuzumi-zakura' />
                        <Picker.item label='Hazakura' value='Hazakura' />
                        <Picker.item label='Shingetsu' value='Shingetsu' />
                        <Picker.item label='Shirabuji' value='Shirabuji' />
                    </Picker>
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
                        onPress={() => this.submitForm()}
                        title='Order'
                        color='#4F171B'
                        accessibilityLabel='Tap me to make an order for wagashi'
                    />
                </View>
            </Animatable.View>
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