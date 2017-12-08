import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo} from 'react-native-textinput-effects';

import Http from './Http'

var StorageKey = 'sync-login-user';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        };
    }

    componentWillMount() {
        let that = this;
        AsyncStorage.getItem(StorageKey).then((value) => {
            if(value) {
                let user = JSON.parse(value);
                that.setState({phone:user.login,password:user.password})
            }
        });
    }

    componentDidMount() {

    }

    onLogin() {

        if (!this.state.password || !this.state.phone) {
            Alert.alert('提示', '手机号码或者密码不能填空!');
            return;
        }
        let that = this;
        Http.post('/api/post/user/login',
            {
                username: that.state.phone,
                password: that.state.password
            },
            res => {
                console.log('login', res)
                if (res.code === 20000) {
                    Http.token = res.data.token;
                    let user = res.data;
                    user.password = that.state.password;
                    AsyncStorage.setItem(StorageKey, JSON.stringify(user));

                    that.props.navigation.navigate('MainView', {user: user})
                }
            },
            err => {
                Alert.alert('提示', '手机号码或者密码错误!');
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#2b2b2b'
                />
                <View style={styles.header}>
                    <Text style={styles.title}>私有图库</Text>
                </View>
                <View style={styles.inputs}>
                    <Hideo
                        iconClass={FontAwesomeIcon}
                        iconName={'phone'}
                        iconColor={'white'}
                        iconSize={30}
                        iconBackgroundColor={'#2d8cfb'}
                        inputStyle={{color: '#464949'}}
                        keyboardType={'phone-pad'}
                        value={this.state.phone}
                        onChangeText={(text) => {
                            this.setState({phone: text})
                        }}
                    />
                    <Hideo
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'white'}
                        iconSize={30}
                        iconBackgroundColor={'#2d8cfb'}
                        inputStyle={{color: '#464949'}}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
                    <Text style={{color: "#fff", fontSize: 18}}>进入图库</Text>
                </TouchableOpacity>
            </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',

    },
    header: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        color: "#ccc"
    },
    inputs: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 150
    },
    input: {
        marginTop: 10,
    },
    button: {
        height: 45,
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d8cfb',
    }
});

export default LoginView;