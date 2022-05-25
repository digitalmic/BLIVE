import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TextInput,
    Animated
} from 'react-native';
import { Video } from 'expo-av';
import WebView from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import * as WebBrowser from 'expo-web-browser';

import CardItem from '../components/CardItem';

import {
    cekLogin,
    retrieveMessage,
    sendMessage,
    inputMessageChange,
    retrieveOnAir,
    sendMessageKonten,
} from '../actions'

const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

class Highlight extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            fadeAnim: new Animated.Value(deviceWidth)
        }
    }

    formatDate = (timestamp) => {
        let date = new Date(timestamp);
        return `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    }

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            this.fadeOut();
        }, 4000);
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: deviceWidth,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    componentDidMount() {
        this.props.retrieveMessage();
        this.props.retrieveOnAir();
    }

    renderItemHighlight = (data) => {
        return (
            <CardItem
                gambar={{ uri: data.item._embedded['wp:featuredmedia'][0].source_url }}
                acara={data.item._embedded['wp:term'][0][0].name}
                judul={data.item.title.rendered}
                link={data.item.link}
                item={data.item}
            />
        );
    }

    render() {

        let renderChat = [];
        if (this.props.chat.length != 0) {
            this.props.chat.slice(-4).forEach((item, i) => {
                const thisItem = (
                    <View
                        key={item._id}
                        style={{
                            flexDirection: 'row',
                            paddingRight: 10,
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
                                        paddingRight: 5,
                                        fontSize: 13,
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
                                    lineHeight: 14,
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
            <View
                style={{
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    bottom: 5,
                    left: 10,
                    right: 10,
                    zIndex: 10
                }}>

                <TouchableOpacity
                    style={{
                        marginBottom: 5,
                    }}
                    onPress={() => {
                        Actions.chat();
                    }}>
                    <View>
                        {renderChat}
                    </View>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    marginBottom: 5
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: '#DDD',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderRadius: 50,
                        backgroundColor: '#FFFFFF33'
                    }}>
                        <TextInput
                            ref={input => { this.chatInput = input }}
                            style={{
                                color: '#FFF',
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 14,
                            }}
                            autoCorrect={false}
                            placeholder='Chat'
                            placeholderTextColor='white'
                            textAlign='left'
                            onChangeText={(text) => { this.props.inputMessageChange(text) }}
                        />
                    </View>
                    <TouchableHighlight
                        style={{
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            this.chatInput.clear();
                            if (this.props.isloggedin && this.props.textChat !== "") {

                                this.props.sendMessage({
                                    text: this.props.textChat,
                                    user: {
                                        _id: this.props.user.uid,
                                        name: this.props.user.displayName.length > 20 ? this.props.user.displayName.slice(0, 20) : this.props.user.displayName,
                                        avatar: this.props.user.photoURL
                                    }
                                })

                                // if (this.props.kontenOnAir.length) {
                                //     this.props.sendMessageKonten(this.props.kontenOnAir[0].ID, {
                                //         text: this.props.textChat,
                                //         user: {
                                //             _id: this.props.user.uid,
                                //             name: this.props.user.displayName.length > 20 ? this.props.user.displayName.slice(0, 20) : this.props.user.displayName,
                                //             avatar: this.props.user.photoURL
                                //         }
                                //     })
                                // }

                            } else {
                                Actions.chat();
                            }
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#128c7e',
                                flexDirection: 'row',
                                overflow: 'hidden',
                                borderColor: '#ddd',
                                shadowColor: '#111',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 4,
                                marginLeft: 5,
                                width: 30,
                                height: 30,
                                borderRadius: 50
                            }}>
                            <Image
                                style={{ width: 15, height: 15 }}
                                source={require('../../assets/logo_send_wt.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );

        return (
            <View
                style={{
                    // flex: 1,
                    backgroundColor: '#000'
                    // backgroundColor: '#3e0001',
                }}>
                {this.props.isVisual ? (
                    this.props.isVerified ? (
                        <View
                            style={{
                                backgroundColor: '#000',
                                overflow: 'hidden',
                                height: deviceWidth / 8 * 11
                            }}>

                            {this.props.dataLiveStreaming.length ?
                                this.props.dataLiveStreaming[0].JUDUL.slice(0, 5) == "https" ? (
                                    <View
                                        style={{
                                            marginTop: 80,
                                            width: deviceWidth,
                                            height: deviceWidth / 16 * 9
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
                                            height: deviceWidth / 4 * 3
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
                                            height: deviceWidth / 4 * 3
                                        }}
                                    />
                                )}

                            <Image
                                source={
                                    this.props.dataHighlight.length ?
                                        this.props.dataHighlight[4].FLAG == 2 ? {
                                            uri: `https://blive.billionaires.id/assets/img/highlight/${this.props.dataHighlight[4].GAMBAR}`
                                        } :
                                            null :
                                        null
                                }
                                resizeMode='cover'
                                style={{
                                    flex: 1,
                                    width: deviceWidth,
                                }}
                            />
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
                                    {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                // this.props.selectKonten(this.props.highlightchosen[0]);
                            }}>
                            <ImageBackground
                                source={
                                    // this.props.dataOnAir.length ? {
                                    //     uri: `https://blive.billionaires.id/assets/img/acara/${this.props.dataOnAir[0].GAMBAR}`
                                    // } :
                                    require('../../assets/registration.jpg')}
                                style={{
                                    flex: 1,
                                    marginBottom: 10,
                                    overflow: 'hidden',
                                    height: deviceWidth / 8 * 11 - 10,
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
                                    {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                                </Text>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    )
                ) : (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            // this.props.selectKonten(this.props.highlightchosen[0]);
                        }}>
                        <ImageBackground
                            source={
                                this.props.dataHighlight.length ?
                                    this.props.dataHighlight[0].FLAG == 2 ? {
                                        uri: `https://blive.billionaires.id/assets/img/highlight/${this.props.dataHighlight[0].GAMBAR}`
                                    } :
                                        require('../../assets/hdi_splash.jpg') :
                                    require('../../assets/hdi_splash.jpg')
                            }
                            style={{
                                flex: 1,
                                marginBottom: 10,
                                overflow: 'hidden',
                                height: deviceWidth / 8 * 11 - 10,
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
                                {this.props.dataOnAir.length ? this.props.dataOnAir[0].JUDUL : ` `}
                            </Text>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                )}

                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: 0
                            // top: deviceWidth / 7 + 80,
                            // zIndex: 2
                        },
                        {
                            left: this.state.fadeAnim, // Bind opacity to animated value
                        },
                    ]}>
                    <TouchableHighlight
                        onPress={async () => {
                            // let result = await WebBrowser.openBrowserAsync(
                            //     this.props.adsFade.length ? this.props.adsFade[0].LINK : 'https://wa.me/628113400988'
                            // );
                            // console.log(result);
                        }}>
                        <Image
                            source={
                                this.props.adsFade.length ?
                                    { uri: `https://blive.billionaires.id/assets/img/ads/${this.props.adsFade[0].GAMBAR}` } :
                                    null
                            }
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                overflow: 'hidden',
                                height: deviceWidth / 8 * 11,
                                width: deviceWidth,
                                justifyContent: 'flex-start'
                            }} />
                    </TouchableHighlight>
                </Animated.View>

                {chat}

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isloggedin: state.auth.isloggedin,
        chat: state.chat.messages,
        textChat: state.chat.text,
        isVerified: state.visual.isVerified,
        isVisual: state.visual.isVisual,
        dataOnAir: state.konten.dataOnAir,
        dataHighlight: state.konten.dataHighlight,
        dataLiveStreaming: state.konten.dataLiveStreaming,
        adsFade: state.ads.dataadsfade,
    }
}

export default connect(mapStateToProps, {
    cekLogin,
    retrieveMessage,
    sendMessage,
    inputMessageChange,
    retrieveOnAir,
    sendMessageKonten,
})(Highlight);