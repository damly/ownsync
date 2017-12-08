import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Navbar from './Navbar'

class Container extends Component {
    constructor(props) {
        super(props);

        this.navPorps = {
            title: props.title,
            height: props.height,
            titleColor: props.titleColor,
            backgroundColor: props.backgroundColor,
            leftButtonTitle: props.leftButtonTitle,
            leftButtonTitleColor: props.leftButtonTitleColor,
            onLeftButtonPress: props.onLeftButtonPress,
            rightButtonTitle: props.rightButtonTitle,
            rightButtonTitleColor: props.rightButtonTitleColor,
            onRightButtonPress: props.onRightButtonPress
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navbar {...this.navPorps}/>
                <View style={styles.child}>
                    {this.props.children}
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
    },
    child: {
        marginTop: 44
    }
});

export default Container;