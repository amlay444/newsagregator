import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../config/COLORS';

const EditProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else if (user) {
                setFirstName(user.user_metadata.first_name || '');
                setLastName(user.user_metadata.last_name || '');
                setEmail(user.email || '');
                setPhone(user.user_metadata.phone || '');
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        try {
            const { error } = await supabase.auth.updateUser({
                email: email,
                data: { first_name: firstName, last_name: lastName, phone: phone }
            });

            if (error) throw new Error(error.message);

            Alert.alert('Profile Updated Successfully');
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Password Mismatch', 'New password and confirmation do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Weak Password', 'Password must be at least 6 characters long');
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw new Error(error.message);

            Alert.alert('Password Changed Successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            Alert.alert('Password Change Failed', error.message);
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={80} color="gray" />
                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <View style={styles.formContainer}>
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
            </View>

            <View style={styles.passwordSection}>
                <Text style={styles.passwordSectionTitle}>Change Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showNewPassword ? 'eye' : 'eye-off'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChangeText={(text) => setConfirmNewPassword(text)}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    formContainer: {
        marginTop: 30,
        width: '100%',
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
    passwordSection: {
        marginTop: 30,
    },
    passwordSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center', // Aligns the title to the left
        paddingLeft: 1,    // Slight padding to match input fields
    },
    passwordInputContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    buttonContainer: {
        marginTop: 40,
        width: '100%',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.lighter,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    logoutButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.darker,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProfileScreen