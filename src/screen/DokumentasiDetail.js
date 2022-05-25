import React from 'react';
import { View, 
    TouchableOpacity, 
    Image, 
    Share, 
    // Text 
} from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import HeaderBack from '../components/HeaderBack';

class DokumentasiDetail extends React.Component {

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
                <HeaderBack title={`${this.props.kontenItem.RUBRIK}`} />
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

export default connect(mapStateToProps)(DokumentasiDetail);