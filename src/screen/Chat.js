import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Image
  // KeyboardAvoidingView,
  // Platform
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer
} from 'react-native-gifted-chat';
import { connect } from 'react-redux';

import { filterText } from '../components/FilterText';
import Fire from '../components/ChatFirebase';
import Login from '../components/Login';
import HeaderBack from '../components/HeaderBack';

import { cekLogin, sendMessageKonten } from '../actions'

class Chat extends React.Component {

  state = {
    messages: [],
    displayName: '',
    displayNameVisible: false
  };

  get user() {
    return {
      _id: this.props.user.uid,
      name: this.props.user.displayName.length > 20 ? this.props.user.displayName.slice(0, 20) : this.props.user.displayName,
      avatar: this.props.user.photoURL
    };
  }

  componentDidMount() {
    if (this.props.isloggedin) {
      Fire.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isloggedin && this.props.isloggedin !== prevProps.isloggedin) {
      Fire.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
    }
  }

  renderLoading() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ActivityIndicator size='large' color='00b3eb' />
      </View>
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        timeTextStyle={{
          left: {
            fontSize: 18
          },
          right: {
            fontSize: 18
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#444'
          }
        }}
        textStyle={{
          left: {
            color: '#fff',
            fontSize: 20
          },
          right: {
            fontSize: 20
          }
        }}
        usernameStyle={{
          fontSize: 18
        }}

      />
    );
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#EEE',
        }}
      />
    )
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: '#000',
        }}
      />
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFF'
      }}>
        <StatusBar style="light" />
        {this.props.isloggedin ? (
          <View style={{ flex: 1 }}>
            <HeaderBack title="Chat" />
            <GiftedChat
              renderUsernameOnMessage={true}
              renderLoading={this.renderLoading}
              renderBubble={this.renderBubble}
              renderInputToolbar={this.renderInputToolbar}
              renderComposer={this.renderComposer}
              messages={this.state.messages}
              onSend={messages => {
                for (let i = 0; i < messages.length; i++) {
                  const { text, user } = messages[i];
                  let filteredMessage = filterText(text);
                  const message = {
                    text: filteredMessage,
                    user: user,
                    createdAt: Fire.shared.createdAt,
                  };
                  Fire.shared.append(message);

                  // if (this.props.kontenOnAir.length) {
                  //   this.props.sendMessageKonten(this.props.kontenOnAir[0].ID, {
                  //     text: filteredMessage,
                  //     user: user
                  //   })
                  // }
                }
              }}
              user={this.user}
              onLongPressAvatar={(user) => {
                console.log(user);
                this.setState({ displayNameVisible: true, displayName: user.avatar.length > 52 ? `${user.avatar}??sz=500` : `${user.avatar}?height=500` })
              }}
              onLongPress={(context, message) => {
                console.log('long press');
                // if (this.props.user.uid == message.user._id) {
                //   console.log('message delete');
                //   Fire.shared.delete(message._id);
                // } else {
                //   console.log('different user id');
                // }
              }}
              placeholder={'Tulis Pesan...'}
            />
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.displayNameVisible}>
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)'
              }}>
                <TouchableWithoutFeedback
                  onPress={() => { this.setState({ displayNameVisible: false }) }}>
                  <Image
                    resizeMode={'contain'}
                    source={{ uri: `${this.state.displayName}` }}
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      marginRight: 10
                    }} />
                </TouchableWithoutFeedback>
              </View>
            </Modal>
            {
              // Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
            }
          </View>
        ) : (
          <View
            style={{
              flex: 1
            }}>
            <HeaderBack title="Login" />
            <Login />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isloggedin: state.auth.isloggedin,
    dataOnAir: state.konten.dataOnAir,
  }
}

export default connect(mapStateToProps, { cekLogin, sendMessageKonten })(Chat);
