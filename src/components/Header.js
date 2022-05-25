import React from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
    retrieveDataAds,
    stopVisualRadio,
    playVisualLandscape
} from '../actions'

class Header extends React.Component {

    render() {
        return (
            <View style={styles.viewStyle}>
                <Image
                    source={require('../../assets/hdi.png')}
                    resizeMode='contain'
                    style={styles.imageStyle} />

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
                            this.props.stopVisualRadio();
                            this.props.playVisualLandscape();
                            Actions.landscape();
                        }}>
                        <Image
                            source={require('../../assets/logo_fullscreen.png')}
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
                            style={styles.image2Style}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
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
        zIndex: 10
    },
    imageStyle: {
        height: 35,
        width: 35,
        marginLeft: 10,
        marginBottom: 10
    },
    image2Style: {
        height: 25,
        width: 25,
        marginRight: 10,
    }
}

const mapStateToProps = state => {
    return {
        adsDefault: state.ads.dataadsdefault
    }
}

export default connect(mapStateToProps, {
    retrieveDataAds,
    stopVisualRadio,
    playVisualLandscape
})(Header);