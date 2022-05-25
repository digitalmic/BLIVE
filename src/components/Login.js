import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

// import HeaderBack from './HeaderBack';

import { facebookLogin, googleLogin, appleLogin } from '../actions'

class Login extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
      }}>
        <Image
          style={styles.imageLogo}
          source={require("../../assets/hdi.png")}
          resizeMode='contain'
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#4267b2',
            paddingVertical: 10,
            width: 200,
            borderRadius: 4
          }}
          onPress={() => {
            this.props.facebookLogin();
          }}>
          <Text style={styles.textButton}>
            Login with Facebook
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#ea4335',
            marginTop: 10,
            paddingVertical: 10,
            width: 200,
            borderRadius: 4
          }}
          onPress={() => {
            this.props.googleLogin();
          }}>
          <Text style={styles.textButton}>
            Login with Google
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            marginTop: 10,
            paddingVertical: 10,
            width: 200,
            borderRadius: 4
          }}
          onPress={() => {
            this.props.appleLogin();
          }}>
          <Text style={styles.textButton}>
            Login with Apple
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageLogo: {
    height: 150,
    borderRadius: 20,
    marginVertical: 20
  },
  textButton: {
    color: "#fff",
    textAlign: 'center',
    // fontFamily: 'louisbold'
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps, { facebookLogin, googleLogin, appleLogin })(Login);