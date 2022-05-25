import React from 'react';
import {
    View,
    Text,
    Dimensions,
    // TouchableOpacity,
    TouchableHighlight,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import CardItemLong from '../components/CardItemLong'

import { selectKonten, selectAcara } from '../actions';

const deviceWidth = Dimensions.get('window').width;

class Konten extends React.Component {

    renderHeadline = () => {
        const dataItem = this.props.konten;
        let renderItem = [];
        dataItem.forEach((item, i) => {
            const thisItem = (
                <TouchableHighlight
                    key={item.ID}
                    style={{
                        marginLeft: 10,
                    }}
                    onPress={() => {
                        this.props.selectKonten(item);
                    }}>
                    <ImageBackground
                        source={item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${item.GAMBAR}` } : require('../../assets/album_art.jpg')}
                        style={{
                            height: 90,
                            width: 120,
                            overflow: 'hidden',
                            borderRadius: 4,
                            justifyContent: 'flex-end'
                        }}>
                        {new Date().getTime() <
                            new Date(item.TGL.slice(6, 10),
                                item.TGL.slice(3, 5) - 1,
                                item.TGL.slice(0, 2),
                                item.TGL.slice(11, 13)).getTime() ? (
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
                    </ImageBackground>
                    <View
                        style={{
                            // height: 90,
                            width: 120,
                            marginTop: 10,
                            overflow: 'hidden',
                            borderRadius: 4,
                            justifyContent: 'flex-end'
                        }}>
                        <Text ellipsizeMode='tail' numberOfLines={3}
                            style={{
                                fontSize: 12,
                                // fontFamily: 'louisbold',
                                color: '#FFFFFF'
                            }}>
                            {item.JUDUL}
                        </Text>
                        <Text ellipsizeMode='tail' numberOfLines={1}
                            style={{
                                fontSize: 11,
                                // fontFamily: 'louis',
                                color: '#AAA'
                            }}>
                            {item.HARI}, {item.TGL}
                        </Text>
                    </View>
                </TouchableHighlight>
            );
            renderItem.push(thisItem);
        })

        return renderItem;
    }

    renderItem = () => {
        const dataItem = this.props.konten.slice(0, 4);
        let renderItem = [];
        dataItem.forEach((item, i) => {
            if (i >= 1) {
                const thisItem = (
                    <CardItemLong
                        key={item.ID}
                        gambar={item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${item.GAMBAR}` } : require('../../assets/album_art.jpg')}
                        konten={item}
                    />
                );
                renderItem.push(thisItem);
            }
        })

        return (
            <View>
                {renderItem}
            </View>
        )
    }

    render() {
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
                            // fontFamily: 'tommy'
                        }}>
                        {this.props.acara}
                    </Text>
                    <TouchableHighlight
                        style={{
                            marginRight: 10
                        }}
                        onPress={() => {
                            this.props.selectAcara(this.props.id_acara, this.props.acara);
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

                <TouchableHighlight
                    style={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        marginBottom: 10,
                        marginHorizontal: 10,
                        // backgroundColor: '#FFF'
                    }}
                    onPress={() => {
                        this.props.selectKonten(this.props.konten[0]);
                    }}>
                    <ImageBackground
                        source={this.props.konten[0].GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${this.props.konten[0].GAMBAR}` } : require('../../assets/album_art.jpg')}
                        style={{
                            width: deviceWidth,
                            height: deviceWidth / 2.5,
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
                            new Date(this.props.konten[0].TGL.slice(6, 10),
                                this.props.konten[0].TGL.slice(3, 5) - 1,
                                this.props.konten[0].TGL.slice(0, 2),
                                this.props.konten[0].TGL.slice(11, 13)).getTime() ? (
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
                            {this.props.konten[0].JUDUL}
                        </Text>
                        <Text ellipsizeMode='tail' numberOfLines={1}
                            style={{
                                paddingBottom: 10,
                                marginHorizontal: 10,
                                fontSize: 11,
                                // fontFamily: 'louis',
                                color: '#AAA'
                            }}>
                            {this.props.konten[0].HARI}, {this.props.konten[0].TGL}
                        </Text>
                    </ImageBackground>
                </TouchableHighlight>

                {this.renderItem()}

            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        kontenItem: state.konten.item
    };
}

export default connect(mapStateToProps, { selectKonten, selectAcara })(Konten);