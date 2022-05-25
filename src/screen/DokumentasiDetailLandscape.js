import React from 'react';
import {
    View,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    Share,
    Text
} from 'react-native';
import WebView from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class DokumentasiDetailLandscape extends React.Component {

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
    }

    getSnapshotBeforeUpdate() {
        console.log('getSnapshotBeforeUpdate');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                title: 'BLive',
                url: `https://blive.billionaires.id/restapi/dokumentasi/share/${this.props.kontenItem.SLUG}`,
                message: `${this.props.kontenItem.JUDUL}\n\nLihat Selengkapnya di Blive\nhttps://blive.billionaires.id/restapi/dokumentasi/share/${this.props.kontenItem.SLUG}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {

        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    // backgroundColor: '#00238600',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 85,
                    paddingTop: 30,
                    overflow: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableWithoutFeedback onPress={() => {
                            Actions.pop();
                        }}>
                            <Image
                                source={require('../../assets/logo_back_wt.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginLeft: 20
                                }} />
                        </TouchableWithoutFeedback>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={{
                                color: '#FFF',
                                // fontFamily: 'ebrima',
                                fontSize: 22,
                                marginLeft: 10
                            }} >
                            {this.props.kontenItem.RUBRIK}
                    </Text>
                    </View>
                </View>
                <WebView
                    source={{ uri: `https://blive.billionaires.id/restapi/dokumentasi/data/${this.props.kontenItem.ID}` }}
                    startInLoadingState
                    javaScriptEnabled
                />
                <TouchableOpacity 
                    onPress={this.onShare}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 50,
                        height: 50,
                        margin: 25,
                        backgroundColor: '#3e0001',
                        borderRadius: 50,
                        shadowColor: '#111',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/logo_share_wt.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {
        kontenItem: state.konten.dokumentasiItem
    };
}

export default connect(mapStateToProps)(DokumentasiDetailLandscape);