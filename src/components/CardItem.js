import React from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
// import * as WebBrowser from 'expo-web-browser';

import { selectMUpdate } from '../actions';

class CardItem extends React.Component {

    render() {

        return (
            <TouchableHighlight
                style={{
                    marginLeft: 10
                }}
                onPress={() => {
                    this.props.selectMUpdate(this.props.item);
                }}>
                {/* onPress={async () => {
                    let result = await WebBrowser.openBrowserAsync(this.props.link);
                    console.log(result);
                }}> */}
                <View style={styles.containerStyle}>
                    <ImageBackground
                        source={this.props.gambar}
                        style={styles.imageStyle}
                        resizeMode='cover' >
                        {/* {addon} */}
                        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.textStyle}>
                            {this.props.judul}
                        </Text>
                        <Text
                            numberOfLines={1} ellipsizeMode='tail' style={styles.text3Style}>
                            {this.props.acara}
                        </Text>
                    </ImageBackground>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    containerStyle: {
        width: 140,
        overflow: 'hidden',
        marginBottom: 10
    },
    imageStyle: {
        height: 90,
        width: 140,
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    textStyle: {
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 3,
        fontSize: 12,
        // fontFamily: 'louisbold',
        color: '#FFF'
    },
    text3Style: {
        position: 'absolute',
        top: 3,
        left: 0,
        paddingLeft: 5,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 11,
        color: '#444',
        // fontFamily: 'louis',
    }
}

const mapStateToProps = state => {

    return {
        kontenItem: state.konten.item
    };
}

export default connect(mapStateToProps, { selectMUpdate })(CardItem);