import React from 'react';
import { View, Image, Text, TouchableHighlight, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { selectKonten } from '../actions';

class CardItemLong extends React.Component {

    render() {

        let addon = (<View></View>);

        if (this.props.konten.VIDEO != "") {
            addon = (<View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
                backgroundColor: '#00000000',
                borderRadius: 50,
                borderColor: '#FFF',
                borderWidth: 3,
            }}>
                <Image
                    source={require('../../assets/logo_play_wt.png')}
                    style={{ height: 20, width: 20, }}
                    resizeMode='cover' />
            </View>);
        }

        return (
            <TouchableHighlight
                style={{ marginLeft: 10, marginRight: 10 }}
                onPress={() => {
                    this.props.selectKonten(this.props.konten);
                }}>
                <View
                    style={{
                        flex: 1,
                        // backgroundColor: '#fff',
                        flexDirection: 'row',
                        height: 90,
                        overflow: 'hidden',
                        elevation: 4,
                        marginBottom: 10
                    }}>
                    <ImageBackground
                        source={this.props.gambar}
                        style={{
                            height: 90,
                            width: 120,
                            borderRadius: 4,
                            overflow: 'hidden',
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
                            numberOfLines={4}
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                color: '#FFF',
                                fontSize: 12,
                                // fontFamily: 'louisbold'
                            }}>
                            {this.props.konten.JUDUL}
                        </Text>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 11,
                                color: '#FFF'
                                // fontFamily: 'louis',
                            }}>
                            {this.props.konten.HARI}, {this.props.konten.TGL}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const mapStateToProps = state => {

    return {
        kontenItem: state.konten.item
    };
}

export default connect(mapStateToProps, { selectKonten })(CardItemLong);