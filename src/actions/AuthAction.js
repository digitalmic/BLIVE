import {
    LOGIN,
    LOGOUT,
    CHECKING
} from './type';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import axios from 'axios';

const isLoggedIn = (dispatch, data) => {
    dispatch({
        type: LOGIN,
        payload: data
    })
}

const isLoggedOut = (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: null
    })
}

const sendToServer = (data) => {

    let formData = new FormData();
    formData.append('uid', data.uid);
    formData.append('username', data.displayName);
    formData.append('email', data.email == null ? "" : data.email);
    formData.append('hp', data.phoneNumber == null ? "" : data.phoneNumber);
    formData.append('photo', data.photoURL);

    axios({
        method: 'post',
        url: 'https://blive.billionaires.id/mobilemodule/registerUserApp',
        data: formData,
        config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    })
        .then(function (response) {
            console.log('respon data:');
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('respon data:');
            console.log(error);
        });
}

export const cekLogin = () => {
    return (dispatch) => {

        dispatch({
            type: CHECKING
        })

        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                isLoggedIn(dispatch, user);
                sendToServer(user);
            } else {
                isLoggedOut(dispatch);
            }
        });
    }
}

export const logout = () => {

    firebase.auth().signOut();

    return {
        type: LOGOUT,
        payload: null
    };
}

export const facebookLogin = () => {

    return async (dispatch) => {

        dispatch({
            type: CHECKING
        })

        try {
            await Facebook.initializeAsync({
                appId: '782373489043302',
            });
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                const facebookProfileData = await firebase.auth().signInWithCredential(credential);

                isLoggedIn(dispatch, facebookProfileData.user);
                sendToServer(facebookProfileData.user);
            } else {
                isLoggedOut(dispatch);
            }

        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
            isLoggedOut(dispatch);
        }

    }

}

export const googleLogin = () => {

    return async (dispatch) => {

        dispatch({
            type: CHECKING
        })

        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
                const googleProfileData = await firebase.auth().signInWithCredential(credential);

                isLoggedIn(dispatch, googleProfileData.user);
                sendToServer(googleProfileData.user);
            } else {
                isLoggedOut(dispatch);
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
            isLoggedOut(dispatch);
        }
    }

}

export const appleLogin = () => {

    return async (dispatch) => {

        dispatch({
            type: CHECKING
        })

        try {

            console.log('sign in with apple');
            const nonce = Math.random().toString(36).substring(2, 10);
            const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)

            const { identityToken } = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ],
                nonce: hashedNonce
            })

            if (identityToken !== '') {

                console.log('identify token');
                console.log(identityToken);

                const provider = new firebase.auth.OAuthProvider('apple.com');
                const credential = provider.credential({
                    idToken: identityToken,
                    rawNonce: nonce
                });

                console.log('credential');
                console.log(credential);

                const profileData = await firebase.auth().signInWithCredential(credential);

                isLoggedIn(dispatch, profileData.user);
                // sendToServer(profileData.user);
            } else {
                isLoggedOut(dispatch);
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
            isLoggedOut(dispatch);
        }
    }

}