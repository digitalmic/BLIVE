import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Image,
    ImageBackground,
    Text,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback,
    // TouchableOpacity,
    FlatList,
    // Linking,
    RefreshControl
} from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';
import Draggable from 'react-native-draggable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import WebView from 'react-native-webview';

// import Header from '../components/Header'
import DokumentasiLandscape from '../components/DokumentasiLandscape';
import Interaktif from '../components/InteraktifLandscape';
// import Konten from '../components/Konten'

import {
    cekLogin,
    retrieveKonten,
    retrieveOnAir,
    retrieveDokumentasi,
    retrieveInteraktif,
    retrieveHighlight,
    retrieveLiveStreaming,
    selectKontenLandscape,
    selectAcaraLandscape,
    verifiedUser,
    stopVisualLandscape,
    playVisualLandscape,
    playVisualRadio
} from '../actions';

const deviceWidth = Dimensions.get('window').height;
const deviceHeight = Dimensions.get('window').width;

class MainSceneLandscape extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 0,
            showAttribute: true
        }
    }

    switchToLandscape() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    switchToPotrait() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    componentDidMount() {
        console.log('main component did mount');

        this.intervalRetrieveData = setInterval(() => {
            this.onRefresh();
        }, 900000);

        this._verified();
    }

    componentWillUnmount() {
        this.switchToPotrait();
    }

    formatDate = (timestamp) => {
        let date = new Date(timestamp);
        return `${("0" + date.getHours()).slice(-2)}:${date.getMinutes()}`;
    }

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
        const dataItem = data.item.konten.slice(-4);
        let renderItem = [];
        dataItem.forEach((item, i) => {
            if (i != 0) {
                let addon = (<View></View>);

                if (item.VIDEO != "") {
                    addon = (<View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 40,
                        height: 40,
                        backgroundColor: '#00000000',
                        borderRadius: 50,
                        borderColor: '#FFF',
                        borderWidth: 3,
                    }}>
                        <Image
                            source={require('../../assets/logo_play_wt.png')}
                            style={{ height: 25, width: 25, }}
                            resizeMode='cover' />
                    </View>);
                }
                const thisItem = (
                    <TouchableHighlight
                        key={item.ID}
                        style={{ marginLeft: 10, marginRight: 10 }}
                        onPress={() => {
                            this.props.selectKontenLandscape(item);
                        }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                height: 100,
                                overflow: 'hidden',
                                borderRadius: 4,
                                borderColor: '#ddd',
                                marginBottom: 10
                            }}>
                            <ImageBackground
                                source={item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${item.GAMBAR}` } : require('../../assets/album_art.jpg')}
                                style={{
                                    width: 135,
                                    height: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode='cover'>
                                {/* {addon} */}
                            </ImageBackground>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={3}
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 12,
                                        color: '#FFF'
                                    }}>
                                    {item.JUDUL}
                                </Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 11,
                                        color: '#FFF'
                                    }}>
                                    {item.HARI}, {item.TGL}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                );
                renderItem.push(thisItem);
            }
        })

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
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
                            // fontFamily: 'tommy'
                        }}>
                        {data.item.rubrik}
                    </Text>
                    <TouchableHighlight
                        style={{
                            margin: 10
                        }}
                        onPress={() => {
                            this.props.selectAcaraLandscape(data.item.id_rubrik, data.item.rubrik);
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 40,
                                alignItems: 'center',
                                alignSelf: 'center'
                            }}>
                            <Text style={{
                                marginLeft: 10,
                                // fontFamily: 'tommy',
                                fontSize: 14,
                                color: '#FFF'
                                // color: '#666'
                            }}>
                                Lihat Semua
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <TouchableHighlight
                        style={{ flex: 1, marginLeft: 10, marginBottom: 10 }}
                        onPress={() => {
                            this.props.selectKontenLandscape(data.item.konten[0]);
                        }}>
                        <View
                            style={{
                                overflow: 'hidden',
                                borderRadius: 4,
                            }}>
                            <ImageBackground
                                source={data.item.konten[0].GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${data.item.konten[0].GAMBAR}` } : require('../../assets/album_art.jpg')}
                                style={{
                                    height: 320,
                                    justifyContent: 'flex-end'
                                }}>

                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={{
                                        position: 'absolute',
                                        height: 110,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                                {new Date().getTime() <
                                    new Date(data.item.konten[0].TGL.slice(6, 10),
                                        data.item.konten[0].TGL.slice(3, 5) - 1,
                                        data.item.konten[0].TGL.slice(0, 2),
                                        data.item.konten[0].TGL.slice(11, 13)).getTime() ? (
                                    <Text style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: 60,
                                        borderRadius: 4,
                                        marginTop: 10,
                                        marginLeft: 10,
                                        fontSize: 11,
                                        // fontFamily: 'louisbold',
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                        backgroundColor: '#F00'
                                    }}>
                                        PREMIERE
                                    </Text>
                                ) : (<View></View>)}

                                <Text ellipsizeMode='tail' numberOfLines={2}
                                    style={{
                                        marginHorizontal: 10,
                                        fontSize: 12,
                                        // fontFamily: 'louisbold',
                                        color: '#FFF'
                                    }}>
                                    {data.item.konten[0].JUDUL}
                                </Text>
                                <Text ellipsizeMode='tail' numberOfLines={1}
                                    style={{
                                        paddingBottom: 10,
                                        marginHorizontal: 10,
                                        fontSize: 11,
                                        // fontFamily: 'louis',
                                        color: '#AAA'
                                    }}>
                                    {data.item.konten[0].HARI}, {data.item.konten[0].TGL}
                                </Text>
                            </ImageBackground>
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1 }}>
                        {renderItem}
                    </View>
                </View>
            </View>
        );
    }

    render() {

        this.switchToLandscape();

        let renderChat = [];
        if (this.props.chat.length != 0) {
            this.props.chat.slice(-4).forEach((item, i) => {
                const thisItem = (
                    <View
                        key={item._id}
                        style={{
                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                        <Image
                            source={{ uri: `${item.user.avatar}` }}
                            style={{
                                width: 30,
                                height: 30,
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 50,
                            }}
                            resizeMode='cover' />
                        <View
                            style={{
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={{
                                        color: '#FFF',
                                        paddingLeft: 10,
                                        paddingRight: 4,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                    }}>
                                    {item.user.name}
                                </Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={{
                                        fontStyle: 'italic',
                                        paddingRight: 10,
                                        fontSize: 10,
                                        color: '#FFF'
                                    }}>
                                    {this.formatDate(item.createdAt)}
                                </Text>
                            </View>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={2}
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 13,
                                    color: '#FFF'
                                }}>
                                {item.text}
                            </Text>
                        </View>
                    </View>
                )
                renderChat.push(thisItem);
            })
        }

        const chat = (
            <View style={{
                position: 'absolute',
                justifyContent: 'flex-end',
                top: 0,
                left: 10,
                paddingBottom: 45,
                width: deviceWidth / 3,
                height: deviceHeight,
                opacity: this.state.showAttribute ? 100 : 0
            }}>
                <TouchableHighlight
                    onPress={() => {
                        Actions.chat();
                    }}>
                    <View>
                        {renderChat}
                    </View>
                </TouchableHighlight>
            </View>
        );

        const highlight = (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000',
                }}>
                <View
                    style={{
                        // backgroundColor: '#3e0001',
                        overflow: 'hidden',
                        height: deviceHeight
                    }}>

                    {this.props.isVisual ? (
                        this.props.isVerified ? (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (this.state.showAttribute) {
                                        this.setState({ showAttribute: false })
                                    } else {
                                        this.setState({ showAttribute: true })
                                    }
                                }}>
                                <View
                                    style={{
                                        backgroundColor: '#000',
                                        overflow: 'hidden',
                                        height: deviceHeight
                                    }}>
                                    {this.props.dataLiveStreaming.length ?
                                        this.props.dataLiveStreaming[0].JUDUL.slice(0, 5) == "https" ? (
                                            <View
                                                style={{
                                                    width: deviceWidth,
                                                    height: deviceHeight
                                                }}>
                                                <WebView
                                                    source={{ uri: `https://blive.billionaires.id/restapi/live/streaming` }}
                                                    allowsInlineMediaPlayback={true}
                                                    mediaPlaybackRequiresUserAction={false}
                                                    useWebKit={true}
                                                />
                                            </View>
                                        ) : (
                                            <Video
                                                source={{ uri: this.props.dataLiveStreaming[0].JUDUL }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay
                                                style={{
                                                    height: deviceHeight
                                                }}
                                            />
                                        ) : (
                                            <Video
                                                source={{ uri: 'http://wowza58.indostreamserver.com:1935/blive/stream/playlist.m3u8' }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay
                                                style={{
                                                    height: deviceHeight
                                                }}
                                            />
                                        )}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            justifyContent: 'flex-start',
                                            opacity: this.state.showAttribute ? 100 : 0
                                        }}>
                                        <Text ellipsizeMode='tail' numberOfLines={5}
                                            style={{
                                                marginTop: 70,
                                                paddingLeft: 10,
                                                width: 200,
                                                fontSize: 22,
                                                color: '#FFFFFF'
                                            }}>
                                            {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (this.state.showAttribute) {
                                        this.setState({ showAttribute: false })
                                    } else {
                                        this.setState({ showAttribute: true })
                                    }
                                }}>
                                <ImageBackground
                                    source={
                                        // this.props.dataOnAir.length ? {
                                        //     uri: `https://blive.billionaires.id/assets/img/acara/${this.props.dataOnAir[0].GAMBAR}`
                                        // } :
                                        require('../../assets/registration.jpg')}
                                    style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Text ellipsizeMode='tail' numberOfLines={5}
                                        style={{
                                            marginTop: 70,
                                            paddingLeft: 10,
                                            width: 200,
                                            fontSize: 22,
                                            color: '#FFFFFF',
                                            opacity: this.state.showAttribute ? 100 : 0
                                        }}>
                                        {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                                    </Text>
                                </ImageBackground>
                            </TouchableWithoutFeedback>
                        )) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (this.state.showAttribute) {
                                    this.setState({ showAttribute: false })
                                } else {
                                    this.setState({ showAttribute: true })
                                }
                            }}>
                            <ImageBackground
                                source={
                                    this.props.dataHighlight.length ?
                                        this.props.dataHighlight[1].FLAG == 2 ? {
                                            uri: `https://blive.billionaires.id/assets/img/highlight/${this.props.dataHighlight[1].GAMBAR}`
                                        } :
                                            require('../../assets/logo_landscape.jpg') :
                                        require('../../assets/logo_landscape.jpg')
                                }
                                style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    justifyContent: 'flex-start'
                                }}>
                                <Text ellipsizeMode='tail' numberOfLines={5}
                                    style={{
                                        marginTop: 70,
                                        paddingLeft: 10,
                                        width: 200,
                                        fontSize: 22,
                                        color: '#FFFFFF',
                                        opacity: this.state.showAttribute ? 100 : 0
                                    }}>
                                    {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                                </Text>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    )}
                    <View
                        style={{
                            position: 'absolute',
                            justifyContent: 'flex-start'
                        }}>
                        <Text ellipsizeMode='tail' numberOfLines={5}
                            style={{
                                marginTop: 70,
                                paddingLeft: 10,
                                width: 200,
                                fontSize: 22,
                                color: '#FFFFFF'
                            }}>
                            {this.props.dataOnAir.length ? this.props.dataOnAir[0].NAMA : ` `}
                        </Text>
                    </View>
                </View>

                {chat}

                <DokumentasiLandscape />

                {this.props.dataInteraktif.length ? this.renderInteraktif() : <View />}

            </View>
        )

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000',
                }}>
                <StatusBar style="light" />
                <View style={{
                    // backgroundColor: '#3e0001',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 75,
                    paddingTop: 35,
                    overflow: 'hidden',
                    elevation: 4,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    opacity: this.state.showAttribute ? 100 : 0
                }}>
                    <Image
                        source={require('../../assets/hdi.png')}
                        resizeMode='contain'
                        style={{
                            height: 35,
                            width: 35,
                            marginLeft: 10,
                            marginBottom: 10
                        }} />

                    <Text
                        style={{
                            // backgroundColor:'red',
                            flex: 1,
                            marginLeft: 10,
                            marginBottom: 5,
                            color: '#FFF',
                            fontSize: 20,
                        }}>
                        BLive
                    </Text>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                console.log('landscape press');
                                this.props.stopVisualLandscape();
                                this.props.playVisualRadio();
                                Actions.pop();
                            }}>
                            <Image
                                source={require('../../assets/logo_fullscreen_exit.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                    // marginRight: 10,
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Actions.drawerOpen();
                            }}>
                            <Image
                                source={require('../../assets/logo_dot_wt.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    marginRight: 10,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    ListHeaderComponent={highlight}
                    showsVerticalScrollIndicator={false}
                    data={this.props.konten.length ? this.props.konten : []}
                    renderItem={this.renderKonten}
                    keyExtractor={data => data.id_rubrik}
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.props.loading}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
                <Draggable
                    x={deviceWidth - 80}
                    y={180}
                    minX={0}
                    minY={90}
                    maxX={deviceWidth}
                    maxY={deviceHeight}
                    imageSource={require('../../assets/TVlogo.png')}
                    renderSize={this.state.showAttribute ? 45 : 0}
                    renderColor='transparent'
                    onShortPressRelease={() => {
                        // this.removeValue();
                        if (this.props.isVisual) {
                            this.props.stopVisualLandscape();
                        } else {
                            this.props.playVisualLandscape();
                        }
                    }
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        chat: state.chat.messages,
        isVerified: state.visual.isVerified,
        isVisual: state.visual.isVisualLandscape,
        isloggedin: state.auth.isloggedin,
        loading: state.konten.loading,
        dataOnAir: state.konten.dataOnAir,
        dataHighlight: state.konten.dataHighlight,
        dataInteraktif: state.konten.dataInteraktif,
        dataLiveStreaming: state.konten.dataLiveStreaming,
        konten: state.konten.data,
    };
}

export default connect(mapStateToProps, {
    cekLogin,
    retrieveKonten,
    retrieveOnAir,
    retrieveDokumentasi,
    retrieveInteraktif,
    retrieveHighlight,
    retrieveLiveStreaming,
    selectKontenLandscape,
    selectAcaraLandscape,
    verifiedUser,
    stopVisualLandscape,
    playVisualLandscape,
    playVisualRadio
})(MainSceneLandscape);