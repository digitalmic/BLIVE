import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Text,
    // Image,
    RefreshControl,
    Dimensions,
    Vibration,
    ActivityIndicator,
    // TouchableHighlight,
    FlatList,
    // Animated,
    AsyncStorage
} from 'react-native';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import Draggable from 'react-native-draggable';
import { connect } from 'react-redux';
import firebase from 'firebase';
// import * as WebBrowser from 'expo-web-browser';

import Header from '../components/Header'
import Highlight from '../components/Highlight'
import Konten from '../components/Konten'
import BannerAds from '../components/BannerAds';
import Dokumentasi from '../components/Dokumentasi';
import Interaktif from '../components/Interaktif';
import Login from '../components/Login';

import {
    cekLogin,
    retrieveDataAds,
    retrieveOnAir,
    retrieveDokumentasi,
    retrieveKonten,
    retrieveInteraktif,
    retrieveHighlight,
    retrieveLiveStreaming,
    verifiedUser,
    playVisualRadio,
    stopVisualRadio,
} from '../actions'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class MainScene extends React.Component {

    constructor(props) {
        super(props);

        this._notificationSubscription = Notifications.addNotificationReceivedListener(
            this._handleNotification
        );

        this.props.cekLogin();
        this.props.retrieveKonten();
        this.props.retrieveOnAir();
        this.props.retrieveDokumentasi();
        this.props.retrieveInteraktif();
        this.props.retrieveHighlight();
        this.props.retrieveLiveStreaming();
    }

    componentDidMount() {
        console.log('main component did mount');

        this.intervalRetrieveData = setInterval(() => {
            this.onRefresh();
        }, 900000);

        this._verified();
    }

    componentDidUpdate() {
        console.log('main component did update');
    }

    componentWillUnmount() {
        firebase.database().ref('messages').off(); // Close connection Firebase Chat
        clearInterval(this.intervalRetrieveData);
        console.log('main component close');
    }

    removeValue = async () => {
        try {
            await AsyncStorage.removeItem('intro')
        } catch (e) {
            console.log(e);
        }
    }

    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
    };

    _verified() {
        setTimeout(() => {
            this.props.verifiedUser(
                this.props.dataOnAir.length ? true : false,
                this.props.dataOnAir.length ? this.props.dataOnAir[0].ID : 0,
                this.props.user != null ? this.props.user.uid : 0
            );
        }, 2000)
    }

    onRefresh() {
        this.props.retrieveDataAds();
        this.props.retrieveKonten();
        this.props.retrieveOnAir();
        this.props.retrieveDokumentasi();
        this.props.retrieveInteraktif();
        this.props.retrieveHighlight();
        this.props.retrieveLiveStreaming();
        this._verified();
    }

    renderInteraktif = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            flex: 1,
                            fontSize: 22,
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 15,
                            color: '#FFF',
                        }}>
                        Interaktif
                </Text>
                </View>

                <Interaktif />

            </View>
        )
    }

    renderKonten = (data) => {
        return (
            <Konten
                id_acara={data.item.id_rubrik}
                acara={data.item.rubrik}
                konten={data.item.konten}
            />
        )
    }

    render() {
        return (
            this.props.loadingAuth ? (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000'
                  }}>
                    <ActivityIndicator size='large' color='#e82128' />
                  </View>
            ) : (
            !this.props.isloggedin ? (
                <View
                    style={{
                        flex: 1
                    }}>
                    <Login />
                </View>
            ) : (
                <View style={styles.container}>
                    <Header />
                    <StatusBar style="light" />
                    {/* <Highlight /> */}
                    <FlatList
                        style={{ flex: 1 }}
                        ListHeaderComponent={
                            <View>
                                <Highlight />
                                <Dokumentasi />
                                {this.props.dataInteraktif.length ? this.renderInteraktif() : <View />}
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        data={this.props.konten}
                        renderItem={this.renderKonten}
                        keyExtractor={data => data.id_rubrik}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.loading}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        } />
                    <Draggable
                        x={deviceWidth - 60}
                        y={90}
                        minX={0}
                        minY={90}
                        maxX={deviceWidth}
                        maxY={deviceHeight}
                        imageSource={require('../../assets/TVlogo.png')}
                        renderSize={45}
                        renderColor='transparent'
                        onShortPressRelease={() => {
                            // this.removeValue();
                            if (this.props.isVisual) {
                                this.props.stopVisualRadio();
                            } else {
                                // this.props.verifiedUser(
                                //     this.props.dataOnAir.length ? true : false,
                                //     this.props.dataOnAir.length ? this.props.dataOnAir[0].ID : 0, 
                                //     this.props.user != null ? this.props.user.uid : 0
                                //     )
                                this.props.playVisualRadio();
                            }
                        }
                        }
                    />
                    <BannerAds />
                </View>
            )
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
        // backgroundColor: '#3e0001',
    },
});

const mapStateToProps = state => {
    return {
        loadingAuth: state.auth.loading,
        user: state.auth.user,
        isloggedin: state.auth.isloggedin,
        isVisual: state.visual.isVisual,
        loading: state.konten.loading,
        dataOnAir: state.konten.dataOnAir,
        dataInteraktif: state.konten.dataInteraktif,
        konten: state.konten.data,
    }
}

export default connect(mapStateToProps, {
    cekLogin,
    retrieveDataAds,
    retrieveOnAir,
    retrieveKonten,
    retrieveInteraktif,
    retrieveDokumentasi,
    retrieveHighlight,
    retrieveLiveStreaming,
    verifiedUser,
    playVisualRadio,
    stopVisualRadio,
})(MainScene);
