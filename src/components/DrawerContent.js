import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

import { logout } from '../actions'

class DrawerContent extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderColor: '#333',
                        padding: 10,
                        marginTop: 30
                    }}>
                    <Image
                        source={this.props.user ? { uri: `${this.props.user.photoURL}` } : require('../../assets/hdi.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 4,
                        }}
                        resizeMode='contain' />
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
                                    paddingLeft: 10,
                                    paddingRight: 4,
                                    fontSize: 16,
                                    color: '#FFF',
                                    // fontFamily: 'louisbold',
                                }}>
                                {this.props.user ? `${this.props.user.displayName}` : 'BLive'}
                            </Text>
                        </View>
                        <Text
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 14,
                                color: '#AAA',
                                // fontFamily: 'louis',
                            }}>
                            {this.props.user ? `${this.props.user.email}` : "New Media"}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#333',
                        padding: 10
                    }}>
                    <TouchableOpacity
                        onPress={async () => {
                            let result = await WebBrowser.openBrowserAsync('https://www.instagram.com/mictransformer/');
                            console.log(result);
                        }}
                        style={{
                            margin: 10,
                            flexDirection: 'row',
                            borderRadius: 4,
                        }}>
                        <Image
                            style={{
                                marginRight: 10,
                                height: 25,
                                width: 25
                            }}
                            source={require('../../assets/logo_ig.png')}
                            resizeMode='cover' />
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#AAA',
                                fontSize: 18,
                                // fontFamily: 'louisbold',
                            }}>
                            @instagram
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            let result = await WebBrowser.openBrowserAsync('https://www.facebook.com/mictransformer');
                            console.log(result);
                        }}
                        style={{
                            margin: 10,
                            flexDirection: 'row',
                            borderRadius: 4,
                        }}>
                        <Image
                            style={{
                                marginRight: 10,
                                height: 25,
                                width: 25
                            }}
                            source={require('../../assets/logo_fb.png')}
                            resizeMode='cover' />
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#AAA',
                                fontSize: 18,
                                // fontFamily: 'louisbold',
                            }}>
                            @facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://wa.me/628113578000');
                        }}
                        style={{
                            margin: 10,
                            flexDirection: 'row',
                            borderRadius: 4,
                        }}>
                        <Image
                            style={{
                                marginRight: 10,
                                height: 25,
                                width: 25
                            }}
                            source={require('../../assets/logo_wa.png')}
                            resizeMode='cover' />
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#AAA',
                                fontSize: 18,
                                // fontFamily: 'louisbold',
                            }}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        padding: 10
                    }}>
                    {this.props.isloggedin ? (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.logout();
                            }}
                            style={{
                                margin: 10,
                                flexDirection: 'row',
                                borderRadius: 4,
                            }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#AAA',
                                    fontSize: 18,
                                    // fontFamily: 'louis',
                                }}>
                                Log Out
                                </Text>
                        </TouchableOpacity>
                    ) : (
                            <View />
                        )}

                    <TouchableOpacity
                        onPress={() => {
                            Actions.profile();
                        }}
                        style={{
                            margin: 10,
                            flexDirection: 'row',
                            borderRadius: 4,
                        }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#AAA',
                                fontSize: 18,
                                // fontFamily: 'louis',
                            }}>
                            About Us
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 20
                }}>
                    <Text
                        style={{ color: '#777', fontSize: 11, fontWeight: 'bold' }}>
                        {`App Version ${Constants.manifest.version}`}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isloggedin: state.auth.isloggedin
    }
}

export default connect(mapStateToProps, { logout })(DrawerContent);