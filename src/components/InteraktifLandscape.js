import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ImageBackground,
    FlatList,
    Dimensions,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Draggable from 'react-native-draggable';

import { selectInteraktifLandscape } from '../actions';

const deviceWidth = Dimensions.get('window').height;

class InteraktifLandscape extends React.Component {

    renderInteraktif = (data) => {
        return (
            <TouchableHighlight
                key={data.item.ID}
                style={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginLeft: 10,
                    backgroundColor: '#FFF'
                }}
                onPress={() => {
                    this.props.selectInteraktifLandscape(data.item);
                }}>
                <ImageBackground
                    source={data.item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/interaktif/${data.item.GAMBAR}` } : require('../../assets/album_art.jpg')}
                    style={{
                        height: 125 / 3 * 4,
                        width: 125,
                        justifyContent: 'flex-end'
                    }}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={{
                            position: 'absolute',
                            height: 125,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                    />
                    {new Date().getTime() <
                        new Date(data.item.TGL.slice(6, 10),
                            data.item.TGL.slice(3, 5) - 1,
                            data.item.TGL.slice(0, 2),
                            data.item.TGL.slice(11, 13)).getTime() ? (
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

                    <Text ellipsizeMode='tail' numberOfLines={3}
                        style={{
                            marginHorizontal: 10,
                            fontSize: 12,
                            // fontFamily: 'louisbold',
                            color: '#FFF'
                        }}>
                        {data.item.JUDUL}
                    </Text>
                    <Text ellipsizeMode='tail' numberOfLines={1}
                        style={{
                            paddingBottom: 10,
                            marginHorizontal: 10,
                            fontSize: 11,
                            // fontFamily: 'louis',
                            color: '#AAA'
                        }}>
                        {data.item.HARI}, {data.item.TGL}
                    </Text>
                </ImageBackground>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <FlatList
                    horizontal={true}
                    ListFooterComponent={<View style={{ marginRight: 10 }} />}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.dataLive}
                    renderItem={this.renderInteraktif}
                    keyExtractor={data => data.ID}
                />
                <Draggable
                    x={deviceWidth - 74}
                    y={105}
                    minX={deviceWidth - 75}
                    minY={104}
                    maxX={deviceWidth - 73}
                    maxY={106}
                    isCircle
                    renderColor='#dd8bf7'
                    onShortPressRelease={() => {
                        Linking.openURL('https://wa.me/628113578000');
                    }}>
                    <View
                    // style={{margin: 5}}
                    >
                        <Text style={{
                            color: '#FFF',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginHorizontal: 10,
                            marginBottom: 2,
                            // borderRadius: 50,
                            includeFontPadding: false,
                            // backgroundColor: '#0FF'
                        }}>
                            +
                    </Text>
                    </View>
                </Draggable>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        dataLive: state.konten.dataInteraktif
    };
}

export default connect(mapStateToProps, { selectInteraktifLandscape })(InteraktifLandscape);