import React from 'react';
import {
    View,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';

import {
    retrieveDataAds,
} from '../actions'

const deviceWidth = Dimensions.get('window').width;

class BannerAds extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sliderActiveSlide: 0
        }
    }

    componentDidMount(){
        this.props.retrieveDataAds();
    }

    _renderBanner = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    height: deviceWidth / 4,
                    backgroundColor: '#000'
                }}
                onPress={async () => {
                    let result = await WebBrowser.openBrowserAsync(item.LINK);
                    console.log(result);
                }}
                >
                <ImageBackground
                    source={{ uri: `https://blive.billionaires.id/assets/img/ads/${item.GAMBAR}` }}
                    resizeMode={'cover'}
                    style={{
                        // marginLeft: 10,
                        // marginRight: 10,
                        // borderBottomEndRadius: 4,
                        // borderBottomStartRadius: 4,
                        overflow: 'hidden',
                        height: deviceWidth / 4
                    }}>

                </ImageBackground>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <View 
                style={{
                    // marginHorizontal: 10
                }}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.adsCarousel}
                    renderItem={this._renderBanner}
                    sliderWidth={deviceWidth}
                    itemWidth={deviceWidth}
                    inactiveSlideScale={1}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={5000}
                    autoplayInterval={5000}
                    onSnapToItem={(index) => { this.setState({ sliderActiveSlide: index }) }}
                />
                <Pagination
                dotsLength={this.props.adsCarousel.length}
                activeDotIndex={this.state.sliderActiveSlide}
                containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    left: 0,
                    right: 0,
                    zIndex: 3
                }}
                dotColor={'rgba(255, 255, 255, 1)'}
                dotStyle={{
                    marginHorizontal: 1
                }}
                inactiveDotColor={'#000000'}
                inactiveDotOpacity={0.8}
                inactiveDotScale={0.6}
                carouselRef={this._carousel}
                tappableDots={!!this._carousel}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        adsCarousel: state.ads.dataadscarousel
    }
}

export default connect(mapStateToProps, {
    retrieveDataAds,
})(BannerAds);