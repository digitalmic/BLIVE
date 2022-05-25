import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import reducers from './src/reducers';
import Router from './src/Router';

import RegisterNotif from './src/components/RegisterPushNotif';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const dataIntroAndroid = [
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
]

const dataIntroIos = [
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
  {
    imgUrl: require('./assets/hdi_copy.png')
  },
]

const firebaseConfig = {
  apiKey: "AIzaSyBDiALJ8T5YBkkw4VcjxkTTS069FTTJpDU",
  authDomain: "blive-appmobile.firebaseapp.com",
  databaseURL: "https://blive-appmobile-default-rtdb.firebaseio.com",
  projectId: "blive-appmobile",
  storageBucket: "blive-appmobile.appspot.com",
  messagingSenderId: "634540084653",
  appId: "1:634540084653:web:b14e62e906954013766524",
  measurementId: "G-QX89617V91"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
      loadingScreen: true,
      sliderActiveSlide: 0,
      intro: true,
    }
    this._checkToken();
    this._checkIntro();
  }

  async _loadAssets() {
    await Font.loadAsync({
      'tommy': require('./assets/font/Tommy.otf'),
    });
  }

  async _checkToken() {
    console.log('cek token');
    try {
      const value = await AsyncStorage.getItem('tokenNotifExpo');
      console.log(value);
      if (value == null) {
        RegisterNotif();
      } else {
        console.log('app in - send active to server (flag 1)');
      }
    } catch (error) {
      console.log(error);
    }
  };

  async _checkIntro() {
    try {
      const value = await AsyncStorage.getItem('intro');
      if (value == null) {
        this.setState({ loadingScreen: false, intro: true })
      } else {
        this.setState({ loadingScreen: false, intro: false })
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    console.log('app out - send non active to server (flag 0)');
  }

  renderIntro = ({ item, index }) => {
    return (
      <Image
        source={item.imgUrl}
        resizeMode='contain'
        style={{
          overflow: 'hidden',
          width: deviceWidth,
          height: deviceHeight - 150
        }} />
    );
  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          autoHideSplash={true}
          startAsync={this._loadAssets}
          onFinish={() => {
            console.log("Finish App Loading");
            this.setState({ isReady: true })
            // setTimeout(() => { this.setState({ isReady: true }) }, 2000)
          }}
          onError={console.warn}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View
            style={{
              flex: 1,
              // backgroundColor: '#000',
            }}>
            <StatusBar style="auto" />
            {this.state.loadingScreen ? (
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000'
              }}>
                <ActivityIndicator size='large' color='#e82128' />
              </View>
            ) : this.state.intro ? (
              <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#000'
              }}>
                <View style={{
                  flex: 1,
                  marginTop: 50,
                }}>
                  <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={Platform.OS === 'android' ? dataIntroAndroid : dataIntroIos}
                    renderItem={this.renderIntro}
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
                    dotsLength={Platform.OS === 'android' ? dataIntroAndroid.length : dataIntroIos.length}
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
                    inactiveDotColor={'#777'}
                    inactiveDotOpacity={0.8}
                    inactiveDotScale={1}
                    carouselRef={this._carousel}
                    tappableDots={!!this._carousel}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#91228e',
                    paddingVertical: 10,
                    margin: 10,
                    width: 200,
                    borderRadius: 4
                  }}
                  onPress={async () => {
                    this.setState({ intro: false })
                    try {
                      await AsyncStorage.setItem('intro', 'done');
                    } catch (error) {
                      console.log(error);
                    }
                  }}>
                  <Text style={{
                    color: "#fff",
                    textAlign: 'center',
                    // fontFamily: 'louisbold'
                  }}>
                    Ok, Ayo Mulai
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Router />
            )}
          </View>
        </Provider>
      );
    }
  }
}