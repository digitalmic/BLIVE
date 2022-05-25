import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

class HeaderBack extends React.Component {

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableWithoutFeedback onPress={() => {
                        Actions.pop();
                    }}>
                        <Image
                            source={require('../../assets/logo_back_wt.png')}
                            style={styles.image3Style} />
                    </TouchableWithoutFeedback>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={{
                            marginLeft: 10,
                            color: '#FFF',
                            fontSize: 20,
                            // fontFamily: 'louisbold'
                        }} >
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }

}

const styles = {
    viewStyle: {
        backgroundColor:"#3e0001",
        flexDirection: 'row',
        alignItems: 'center',
        height: 85,
        paddingTop: 30,
        overflow: 'hidden',
        // shadowColor: '#111',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 4,
        justifyContent: 'space-between',
    },
    image3Style: {
        height: 30,
        width: 30,
        marginLeft: 20
    }
}

export default HeaderBack;