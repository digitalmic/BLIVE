import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Scene, Router, Stack, Drawer } from 'react-native-router-flux';

import Home from '../assets/icon_home.svg';
// import Store from '../assets/icon_store.svg';

import BackNavigation from './components/BackNavigation';
import DrawerContent from './components/DrawerContent';
import MainScene from './screen/MainScene';
import Landscape from './screen/MainSceneLandscape';
import Acara from './screen/Acara';
import AcaraLandscape from './screen/AcaraLandscape';
import KontenDetail from './screen/KontenDetail';
import KontenDetailLandscape from './screen/KontenDetailLandscape';
import DokumentasiDetail from './screen/DokumentasiDetail';
import DokumentasiDetailLandscape from './screen/DokumentasiDetailLandscape';
import InteraktifDetail from './screen/InteraktifDetail';
import InteraktifDetailLandscape from './screen/InteraktifDetailLandscape';
import MUpdateDetail from './screen/MUpdateDetail';
import Chat from './screen/Chat';
import Profile from './screen/Profile';
import Register from './screen/Register';

// Simple component to render something in place of icon
const home = ({ focused, title }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Home
                fill={focused ? '#F00' : '#FFF'}
                height={focused ? 30 : 25}
                width={focused ? 30 : 25} />
            <Text style={{
                color: focused ? '#F00' : '#FFF',
                fontSize: 10,
                fontFamily: 'louisbold',
            }}>
                {title}
            </Text>
        </View>
    );
}

// const store = ({ focused, title }) => {
//     return (
//         <View style={{ alignItems: 'center' }}>
//             <Store
//                 fill={focused ? '#F00' : '#FFF'}
//                 height={focused ? 30 : 25}
//                 width={focused ? 30 : 25} />
//             <Text style={{
//                 color: focused ? '#F00' : '#FFF',
//                 fontSize: 10,
//                 fontFamily: 'louisbold',
//             }}>
//                 {title}
//             </Text>
//         </View>
//     );
// }

const RouterComponent = () => {
    return (
        <BackNavigation>
            <Router>
                <Stack key="root">

                    <Drawer
                        key="drawer"
                        hideNavBar={true}
                        contentComponent={DrawerContent}
                        drawerPosition="right"
                        onExit={() => {
                            console.log('Drawer closed');
                        }}
                        onEnter={() => {
                            console.log('Drawer opened');
                        }}>
                        <Stack>

                            <Scene
                                key="mainscene"
                                // type="reset"
                                hideNavBar={true}
                                component={MainScene}
                                // initial={true}
                                title="Home"
                                icon={home}
                            />

                            <Scene
                                key="landscape"
                                component={Landscape}
                                hideNavBar={true}
                            />

                        </Stack>
                    </Drawer>

                    <Scene
                        key="acara"
                        component={Acara}
                        hideNavBar={true}
                    />

                    <Scene
                        key="acaralandscape"
                        component={AcaraLandscape}
                        hideNavBar={true}
                    />

                    <Scene
                        key="kontendetail"
                        // type="reset"
                        hideNavBar={true}
                        component={KontenDetail}
                    // initial={true}
                    />

                    <Scene
                        key="kontendetaillandscape"
                        // type="reset"
                        hideNavBar={true}
                        component={KontenDetailLandscape}
                    // initial={true}
                    />

                    <Scene
                        key="dokumentasidetail"
                        // type="reset"
                        hideNavBar={true}
                        component={DokumentasiDetail}
                    // initial={true}
                    />

                    <Scene
                        key="dokumentasidetaillandscape"
                        // type="reset"
                        hideNavBar={true}
                        component={DokumentasiDetailLandscape}
                    // initial={true}
                    />

                    <Scene
                        key="interaktifdetail"
                        // type="reset"
                        hideNavBar={true}
                        component={InteraktifDetail}
                    // initial={true}
                    />

                    <Scene
                        key="interaktifdetaillandscape"
                        // type="reset"
                        hideNavBar={true}
                        component={InteraktifDetailLandscape}
                    // initial={true}
                    />

                    <Scene
                        key="mupdatedetail"
                        // type="reset"
                        hideNavBar={true}
                        component={MUpdateDetail}
                    // initial={true}
                    />

                    <Scene
                        key="chat"
                        // type="reset"
                        hideNavBar={true}
                        component={Chat}
                    // initial={true}
                    />

                    <Scene
                        key="profile"
                        component={Profile}
                        hideNavBar={true}
                    />

                    <Scene
                        key="register"
                        component={Register}
                        hideNavBar={true}
                    />

                </Stack>
            </Router>
        </BackNavigation>
    );
};

export default RouterComponent;