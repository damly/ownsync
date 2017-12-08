import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    CameraRoll,
    TouchableOpacity,
    Dimensions
} from 'react-native';

let width = Dimensions.get('window').width;

import Http from './Http'
import Container from './Container'

class MainView extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: [
                {title: '本地图库', key: 'local', data: []},
                {title: '公共图库', key: 'public', data: []},
                {title: '私有图库', key: 'private', data: []}
            ]
        };
    }

    componentWillMount() {
        let fetchParams = {
            first: 10000000,
            assetType: 'Photos'
        };
        let that = this;

        CameraRoll.getPhotos(fetchParams).then((data) => {
            let edges = data.edges;
            let local = [];
            for (let i in edges) {
                local.push(edges[i].node.image.uri);
            }
            console.log('local photo', local);
            that.state.data[0].data = local;
            that.state.data[1].data = local;
            that.state.data[2].data = local;
            that.forceUpdate();
        }).catch(err => {
            console.log('local photo', err)
        })
    }

    onRight() {

    }

    renderItem(row, index) {

        return (
            <TouchableOpacity key={'thumb' + index} style={styles.card}
                              onPress={()=>this.props.navigation.navigate('PhotoView', row)}>
                <Image style={styles.thumb} source={{uri: row.data[0]}}/>
                <View style={styles.footer}>
                    <Text style={styles.title}>{row.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (

            <Container
                title={'媒体库'}
                titleColor={'#ccc'}
                backgroundColor={'#3C3F41'}
                rightButtonTitle={'同步'}
                rightButtonTitleColor={'#ccc'}
                onRightButtonPress={this.onRight.bind(this)}
            >
                <ListView style={{marginTop:10}}
                    contentContainerStyle={styles.list}
                    dataSource={this.ds.cloneWithRows(this.state.data)}
                    renderRow={this.renderItem.bind(this)}
                />
            </Container>)
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
        flexWrap: 'wrap',
    },
    card: {
        margin:5,
        width: (width-40)/2,
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
    }
});

export default MainView;