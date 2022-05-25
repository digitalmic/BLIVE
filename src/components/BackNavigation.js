import React from "react";
import {BackHandler} from "react-native";
import {Actions} from "react-native-router-flux";

class BackNavigation extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log('button back press ' + Actions.currentScene);
            if(Actions.currentScene == "mainscene"){
                console.log("exit app");
                BackHandler.exitApp();
            }
        });
    }

    // componentWillUnmount(){
    //     console.log("Unmounting app, removing listeners");
    //     BackHandler.removeEventListener('hardwareBackPress');
    // }

    render() {
        return this.props.children;
    }

}

export default BackNavigation;