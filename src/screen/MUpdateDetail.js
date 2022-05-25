import React from 'react';
import {
    View,
} from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import HeaderBack from '../components/HeaderBack';

class MUpdateDetail extends React.Component {

    render() {

        return (
            <View style={{
                flex: 1
            }}>
                <HeaderBack title={this.props.mUpdateItem._embedded ? this.props.mUpdateItem._embedded['wp:term'][0][0].name : "M Update" } />
                { !this.props.mUpdateItem.title ? (
                    <WebView
                        source={{ uri: `https://app.mradiofm.com/restapi/konten/mupdate/${this.props.mUpdateItem.ID}` }}
                        startInLoadingState
                        javaScriptEnabled
                    />
                ) : (
                        <WebView
                            source={{
                                html: `<html>
                                    <head>
                                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                        <!-- Mobile Specific Meta -->
                                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                                        <title>MUpdate</title>
                                        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
                                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

                                        <style>
                                            body,
                                            html {
                                                height: 100%;
                                                min-height: 100%;
                                            }
                                            
                                            body,
                                            p {
                                                color:black;
                                                font-size: 1.05em;
                                                line-height: 1.4;
                                                font-family: Arial, Helvetica, sans-serif;
                                            }
                                        
                                            .material-icons {vertical-align:-15%}
                                        
                                        </style>
                                    </head>
                                    <body>
                                        <div>
                                            <img src="${this.props.mUpdateItem._embedded['wp:featuredmedia'][0].source_url}" alt="Gambar mupdate" style="width:100%"> 
                                            <div class="w3-panel">
                                                <h3>
                                                    <strong>Dispendukcapil Surabaya Siapkan 20 Petugas untuk Handle Call Center </strong>
                                                </h3>
                                                <div class="w3-text-grey w3-medium">
                                                    <i class="material-icons w3-medium">schedule</i> 
                                                        ${this.props.mUpdateItem.date.slice(0,10)} ${this.props.mUpdateItem.date.slice(11,16)}            
                                                </div>
                                            </div>
                                            <div class="w3-panel">
                                                <div class="single-content">
                                                    ${this.props.mUpdateItem.content.rendered}
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <br>
                                        <br>
                                    </body>
                                </html>`
                            }}
                            startInLoadingState
                            javaScriptEnabled
                        />
                    )}
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {
        mUpdateItem: state.konten.item
    };
}

export default connect(mapStateToProps)(MUpdateDetail);