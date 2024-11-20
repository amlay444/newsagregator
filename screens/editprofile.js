import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else if (user) {
                setFirstName(user.user_metadata.first_name);
                setLastName(user.user_metadata.last_name);
                setEmail(user.email);
                setPhone(user.user_metadata.phone);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        try {
            const { error } = await supabase.auth.update({
                email: email,
                data: { first_name: firstName, last_name: lastName, phone: phone }
            });

            if (error) throw new Error(error.message);

            Alert.alert('Profile Updated Successfully');
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Logout Failed', error.message);
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={100} color="black" style={styles.icon} />
            <Text style={styles.title}>Edit Profile</Text>
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
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                maxLength={10}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
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
    icon: {
        position: 'absolute',
        top: 40,
        right: 20,
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
    logoutButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF6347',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProfileScreen;
