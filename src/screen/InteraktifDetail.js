import React from 'react';
import { View, 
    // TouchableOpacity, 
    // Image, 
    Share, 
    // Text 
} from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import HeaderBack from '../components/HeaderBack';

class InteraktifDetail extends React.Component {

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
                title: 'MSpace - M Radio Powering You',
                url: 'https://mradiofm.com/',
                message: `${this.props.kontenItem.JUDUL}\n\nLihat Selengkapnya di MSpace\nhttps://app.mradiofm.com/restapi/interaktif/share/${this.props.kontenItem.SLUG}`,
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
                <HeaderBack title={`Interaktif`} />
                <WebView
                    source={{ uri: `https://blive.billionaires.id/restapi/interaktif/data/${this.props.kontenItem.ID}` }}
                    startInLoadingState
                    javaScriptEnabled
                />
                
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {
        kontenItem: state.konten.interaktifItem
    };
}

export default connect(mapStateToProps)(InteraktifDetail);