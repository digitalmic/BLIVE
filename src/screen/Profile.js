import React from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    Share,
    TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';

import HeaderBack from '../components/HeaderBack';

class Profile extends React.Component {

    state = {
        token: ""
    };

    constructor(props) {
        super(props);
        this._checkToken();
    }

    async _checkToken() {
        try {
            const value = await AsyncStorage.getItem('tokenNotifExpo');
            this.setState({ token: value });
            console.log(value);
        } catch (error) {
            console.log(error);
        }
    };

    onShare = async () => {
        try {
            const result = await Share.share({
                title: 'T Media - Live Visual Radio',
                url: 'https://tmedia.mradiofm.com/',
                message: 'T Media \n\nLive Visual Radio\nhttps://tmedia.mradiofm.com/',
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
            <View style={{ flex: 1 }}>
                <HeaderBack title="About Us" />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF"
                    }}>
                    <Image
                        style={{ 
                            width: 150, 
                            height: 150, 
                            marginVertical: 20, 
                            borderRadius: 20 }}
                            source={require("../../assets/hdi.png")}
                    />

                    {/* <TouchableOpacity
                        // onPress={this.onShare}
                    >
                        <View
                            style={styles.buttonStyle}>
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/logo_share_wt.png')}
                                resizeMode='contain'
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#FFF',
                                    // fontFamily: 'louisbold' 
                                }}>
                                Bagikan ke teman
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.viewStyle}>
                    <Text
                        style={styles.textStyle}>
                        {`v${Constants.manifest.version}`}{'\n'}{this.state.token}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        position: 'relative'
    },
    textStyle: {
        color: '#777',
        textAlign: 'center',
        fontSize: 11
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#00b3eb',
        flexDirection: 'row',
        width: 200,
        height: 40,
        overflow: 'hidden',
        borderRadius: 4,
        borderColor: '#ddd',
        shadowColor: '#111',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        margin: 20
    }
}

export default Profile;