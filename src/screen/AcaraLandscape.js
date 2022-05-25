import React from 'react';
import {
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image, 
    Text, 
    TouchableOpacity, 
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

import HeaderBack from '../components/HeaderBack';

import { retrieveAcara, resetAcara, selectKontenLandscape } from '../actions';

class AcaraLandscape extends React.Component {

    constructor(props) {
        super(props);
        this.props.retrieveAcara(this.props.idAcara, 1);
    }

    onRefresh() {
        this.props.resetAcara();
        this.props.retrieveAcara(this.props.idAcara, 1);
    }

    handleLoadMore = () => {
        console.log('run load more ' + this.props.totalpage + " " + this.props.page);
        if (!this.props.refreshing) {
            if (this.props.totalpage > this.props.page) {
                console.log('retrieve data next page');
                let page = parseInt(this.props.page) + 1;
                console.log(page);
                this.props.retrieveAcara(this.props.idAcara, page);
            }
        }
    };

    renderFooter = () => {
        if (!this.props.refreshing) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000', margin: 30 }}
            />
        );
    };

    renderItem = (data) => {
        return (
            <TouchableOpacity
                key={data.item.ID}
                style={{ marginLeft: 10, marginRight: 10 }}
                onPress={() => {
                    this.props.selectKontenLandscape(data.item);
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
                        source={data.item.GAMBAR != null ? { uri: `https://blive.billionaires.id/assets/img/konten/${data.item.GAMBAR}` } : require('../../assets/default.jpg')}
                        style={{
                            height: 90,
                            width: 120,
                            borderRadius:4,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        resizeMode='cover'>
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
                                color: '#000',
                                fontSize: 12,
                                // fontFamily: 'louisbold'
                            }}>
                            {data.item.JUDUL}
                        </Text>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 11,
                                // fontFamily: 'louis',
                                color: '#AAA'
                            }}>
                            {data.item.HARI}, {data.item.TGL}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <HeaderBack title={this.props.acara} />
                <FlatList
                    data={this.props.dataList}
                    renderItem={this.renderItem}
                    keyExtractor={data => data.ID}
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.props.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    ListHeaderComponent={<View style={{marginTop: 10}}/>}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.handleLoadMore.bind(this)}
                />
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#FFF',
        flex: 1
    }
}

const mapStateToProps = state => {

    return {
        dataList: state.acara.data,
        refreshing: state.acara.loading,
        totalpage: state.acara.totalpage,
        page: state.acara.page,
        idAcara: state.acara.idAcara,
        acara: state.acara.namaAcara
    };
}

export default connect(mapStateToProps, { retrieveAcara, resetAcara, selectKontenLandscape })(AcaraLandscape);
