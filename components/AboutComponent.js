import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        suppliers: state.suppliers
    };
};

const Mission = () {
    return (
        <Card title="Our Mission">
            <Text>
                We wish to share the art of wagashi (Japanese traditional confectionaries) and Japanese culture with the world.
            </Text>
        </Card>
    );
};

class About extends Component {

}

export default connect(mapStateToProps)(About);

