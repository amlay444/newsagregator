import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';

const SignupScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const isAlphabetic = (text) => /^[A-Za-z]+$/.test(text);
    const isValidEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    const isValidPhone = (text) => /^[0-9]{0,10}$/.test(text);

    const handleSignup = async () => {
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Invalid input', 'Please enter all required fields');
            return;
        }

        if (!isAlphabetic(firstName) || !isAlphabetic(lastName)) {
            Alert.alert('Invalid input', 'First and Last Name must contain only letters');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Invalid input', 'Please enter a valid email address');
            return;
        }

        if (!isValidPhone(phone)) {
            Alert.alert('Invalid input', 'Phone number must be up to 10 digits');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Invalid input', 'Passwords do not match');
            return;
        }

        try {
            const { user, error } = await supabase.auth.signUp(
                { email: email, password: password },
                { data: { first_name: firstName, last_name: lastName, phone: phone } }
            );

            if (error) throw new Error(error.message);

            Alert.alert('Sign Up Successful', 'Please proceed to set your preferences.');
            navigation.navigate('Preferences');
        } catch (error) {
            Alert.alert('Sign Up Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={(text) => {
                    if (isValidPhone(text)) setPhone(text);
                }}
                keyboardType="phone-pad"
                maxLength={10}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default SignupScreen;
