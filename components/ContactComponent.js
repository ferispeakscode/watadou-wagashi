import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['shokunin@wagashi.co'],
            subject: 'Inquiry Regarding Wagashi',
            body: 'To whom it may concern:'
        });
    }

    render() {
        return(
            <ScrollView>
                <Card title="Contact Information" wrapperStyle={{margin: 20}}>
                    <Text>9 Wagashi Lane</Text>
                    <Text>New York, NY 10001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A.</Text>
                    <Text>Phone: 1-202-314-1512</Text>
                    <Text>Email: shokunin@wagashi.co</Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: '#AE323B', margin: 40}}
                        icon={<Icon
                            name='envelope-o'
                            type='font-awesome'
                            color='#EAE8ED'
                            iconStyle={{marginRight: 10}}
                        />}
                        onPress={() => this.sendMail()}
                    />
                </Card>
            </ScrollView>
        );
    }

}

export default Contact;