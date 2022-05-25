import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';

import HeaderBack from '../components/HeaderBack';
import Login from '../components/Login';

import { cekLogin, retrieveLiveEvent, kirimRegisterData } from '../actions';

const deviceHeight = Dimensions.get('window').height;

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.props.retrieveLiveEvent();
        this.state = {
            verified: false,
            pickerKatagori: 0,
            uploading: false,
            textInputNama: "",
            textInputAlamat: "",
            textInputKota: "",
            textInputUsia: "",
            textInputHp: ""
        }
    }

    _renderPickerKatagori() {
        return this.props.dataLive.map(
            data => {
                return <Picker.Item key={data.ID} label={`${data.JUDUL} ${data.START} `} value={data.ID} />
            });
    }

    _renderUploading = () => {
        if (this.props.isLoading) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        zIndex: 2,
                    }}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
    };

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}>
                <StatusBar style="light" />
                {!this.props.isloggedin ? (
                    <View
                        style={{
                            flex: 1
                        }}>
                        <HeaderBack title="Login" />
                        <Login />
                    </View>
                ) : (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        style={{ flex: 1 }}>
                        <HeaderBack title="Form Registrasi" />
                        <ScrollView>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 20,
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    Event
                                </Text>

                                <Picker
                                    style={{
                                        marginLeft: 10,
                                        paddingRight: 10,
                                        color: '#666',
                                        fontSize: 16,
                                    }}
                                    selectedValue={this.state.pickerKatagori}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ pickerKatagori: itemValue })}>

                                    <Picker.Item key={0} label={`Pilih Event Anda`} value={0} />
                                    {this._renderPickerKatagori()}

                                </Picker>

                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        // fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    Nama
                                </Text>

                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: '#DDD',
                                }}>
                                    <TextInput
                                        ref={input => { this.chatInput = input }}
                                        style={{
                                            color: '#666',
                                            fontSize: 16,
                                        }}
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Nama Lengkap Anda'
                                        placeholderTextColor='#AAA'
                                        textAlign='left'
                                        onChangeText={(text) => { this.setState({ textInputNama: text }) }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 10,
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        // fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    Alamat
                                </Text>

                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: '#DDD',
                                }}>
                                    <TextInput
                                        ref={input => { this.chatInput = input }}
                                        style={{
                                            color: '#666',
                                            fontSize: 16,
                                        }}
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Alamat tempat Anda tinggal'
                                        placeholderTextColor='#AAA'
                                        textAlign='left'
                                        onChangeText={(text) => { this.setState({ textInputAlamat: text }) }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 10,
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        // fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    Kota
                                </Text>

                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: '#DDD',
                                }}>
                                    <TextInput
                                        ref={input => { this.chatInput = input }}
                                        style={{
                                            color: '#666',
                                            fontSize: 16,
                                        }}
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Nama Kota tempat Anda tinggal'
                                        placeholderTextColor='#AAA'
                                        textAlign='left'
                                        onChangeText={(text) => { this.setState({ textInputKota: text }) }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 10,
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        // fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    Usia
                                </Text>

                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: '#DDD',
                                }}>
                                    <TextInput
                                        ref={input => { this.chatInput = input }}
                                        style={{
                                            color: '#666',
                                            fontSize: 16,
                                        }}
                                        keyboardType='number-pad'
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='berapa usia Anda saat ini'
                                        placeholderTextColor='#AAA'
                                        textAlign='left'
                                        onChangeText={(text) => { this.setState({ textInputUsia: text }) }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 10,
                                    marginHorizontal: 10
                                }}>

                                <Text
                                    style={{
                                        color: '#000',
                                        // fontFamily: 'louisbold',
                                        fontSize: 20,
                                        margin: 10
                                    }}>
                                    No. HP
                                </Text>

                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: '#DDD',
                                }}>
                                    <TextInput
                                        ref={input => { this.chatInput = input }}
                                        style={{
                                            color: '#666',
                                            fontSize: 16,
                                        }}
                                        keyboardType='number-pad'
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='contoh: 08101111111'
                                        placeholderTextColor='#AAA'
                                        textAlign='left'
                                        onChangeText={(text) => { this.setState({ textInputHp: text }) }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: '#0F0',
                                    marginTop: 30,
                                    marginBottom: 10,
                                    marginHorizontal: 10
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.kirimRegisterData(
                                            this.state.pickerKatagori,
                                            this.props.user.uid,
                                            this.state.textInputNama,
                                            this.state.textInputAlamat,
                                            this.state.textInputKota,
                                            this.state.textInputUsia,
                                            this.state.textInputHp
                                        )
                                    }}
                                    style={{ margin: 10, overflow: 'hidden', borderRadius: 4, }}>
                                    <Text
                                        style={{
                                            backgroundColor: '#f55451',
                                            color: '#FFF',
                                            textAlign: 'center',
                                            // fontFamily: 'louisbold',
                                            fontSize: 16,
                                            padding: 15,

                                        }}>
                                        Register
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        {this._renderUploading()}
                    </KeyboardAvoidingView>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isloggedin: state.auth.isloggedin,
        dataLive: state.konten.dataLive,
        isLoading: state.konten.loadingRegister,
    }
}

export default connect(mapStateToProps, { cekLogin, retrieveLiveEvent, kirimRegisterData })(Register);