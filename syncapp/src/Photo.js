import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modalbox';
import Container from './Container'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class PhotoView extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            title: '',
            key: '',
            dataSource: this.ds.cloneWithRows([]),
            select: {
                data: null,
                index: 0
            },
            hidden: true
        };
    }

    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        console.log('photo:', this.props.navigation.state.params)
        let params = this.props.navigation.state.params
        this.setState({
            title: params.title,
            key: params.key,
            dataSource: this.ds.cloneWithRows(params.data)
        });
    }

    onRight() {

    }

    onItemPress(row, index) {
        let value = {
            data: row,
            index: index
        };
        this.setState({select: value});
        this.refs.view.open()
    }

    renderItem(row, index) {

        return (
            <TouchableOpacity key={'thumb' + index} style={styles.card} onPress={() => this.onItemPress(row, index)}>
                <Image style={styles.thumb} source={{uri: row}}/>
            </TouchableOpacity>
        )
    }

    renderModal() {
        if (this.state.select.data) {
            return (
                <Image style={styles.image} source={{uri: this.state.select.data}}/>
            )
        }

        return null;
    }

    onClosed() {
       // this.setState({hidden: false});
    }

    onOpened() {
       // this.setState({hidden: true});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Container
                    title={this.state.title}
                    titleColor={'#ccc'}
                    backgroundColor={'#3C3F41'}
                    rightButtonTitle={'同步'}
                    rightButtonTitleColor={'#ccc'}
                    onRightButtonPress={this.onRight.bind(this)}
                >
                    <ListView style={{marginTop: 10, width: width}}
                              enableEmptySections={true}
                              contentContainerStyle={styles.list}
                              dataSource={this.state.dataSource}
                              renderRow={this.renderItem.bind(this)}
                    />
                </Container>
                <Modal style={styles.modal} ref={"view"}
                       coverScreen={true}
                       onOpened={this.onOpened.bind(this)}
                       onClosed={this.onClosed.bind(this)}
                >
                    {this.renderModal()}
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
    },
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    card: {
        margin: 5,
        width: (width - 40) / 2,
        height: 120,
        borderRadius: 5,
        shadowColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        backgroundColor: '#3C3F41',
        alignItems: 'center'
    },
    thumb: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        borderRadius: 5,
        resizeMode: Image.resizeMode.cover
    },
    footer: {
        height: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#cccccca0'
    },
    title: {
        color: '#333',
        marginLeft: 5
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    image: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    }
});

export default PhotoView;