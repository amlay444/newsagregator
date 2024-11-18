import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from './supabase';

export default function AuthScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        // Validate first name, last name, email, and phone number
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            setError("First name must contain only letters.");
            return;
        }
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            setError("Last name must contain only letters.");
            return;
        }
        if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }

        // Proceed with signup if validation passes
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name: firstName, last_name: lastName, phone: phoneNumber }
            }
        });

        if (error) setError(error.message);
        else {
            console.log('User signed up:', user);
            setError(null); // Clear error if signup is successful
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
            />
            <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
                maxLength={10}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 15 }}
            />
            <Button title="Sign Up" onPress={handleSignup} />
            
            {error && <Text style={{ color: 'darkred' }}>{error}</Text>}
        </View>
    );
}
