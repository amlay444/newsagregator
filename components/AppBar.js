import * as React from 'react';
import { Appbar} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = () => {
    return (
        <SafeAreaProvider>
            <Appbar.Header style={{ backgroundColor: 'silver' }}>
            </Appbar.Header>
        </SafeAreaProvider>
    );
};

export default Header