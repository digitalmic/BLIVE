import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ImageBackground,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { selectDokumentasiLandscape } from '../actions';

class DokumentasiLandscape extends React.Component {

    renderDokumentasi = (data) => {
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
                    this.props.selectDokumentasiLandscape(data.item);
                }}>
                <ImageBackground
                    source={data.item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/dokumentasi/${data.item.GAMBAR}` } : require('../../assets/album_art.jpg')}
                    style={{
                        height: 90 / 3 * 4,
                        width: 90 ,
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
            <View style={{marginTop : 10}}>
                <FlatList
                    horizontal={true}
                    ListFooterComponent={<View style={{ marginRight: 10 }} />}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.dataLive}
                    renderItem={this.renderDokumentasi}
                    keyExtractor={data => data.ID}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        dataLive: state.konten.dataDokumentasi
    };
}

export default connect(mapStateToProps, { selectDokumentasiLandscape })(DokumentasiLandscape);