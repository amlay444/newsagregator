import * as React from 'react';
import { Appbar} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = () => {
    return (
        <SafeAreaProvider>
        <Appbar.Header style={{marginTop:40, bckgroundColor:'silver'}}>
            <Appbar.Content title="Home Screen"/>
     </Appbar.Header>
     </SafeAreaProvider>
    );
};

export default Header