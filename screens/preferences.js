import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../supabase.js';

const categories = [
    { name: 'Technology', color: '#FF6347' },
    { name: 'Science', color: '#4682B4' },
    { name: 'Health', color: '#32CD32' },
    { name: 'Sports', color: '#FFA500' },
    { name: 'Business', color: '#8A2BE2' },
    { name: 'Entertainment', color: '#FF69B4' },
    { name: 'Travel', color: '#20B2AA' },
    { name: 'Food', color: '#FF4500' },
    { name: 'Lifestyle', color: '#00FF7F' },
    { name: 'Politics', color: '#800080' },
    { name: 'Environment', color: '#008080' },
];

const PreferencesScreen = ({ navigation }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else if (user) {
                setUserId(user.id);  // Set the user's UUID
            }
        };
        
        fetchUserId();
    }, []);

    const toggleCategory = (categoryName) => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    const handleContinue = async () => {
        if (!userId) {
            console.error('User ID is not available.');
            return;
        }

        try {
            const { data, error } = await supabase.from('preferences').insert([
                { user_id: userId, categories: selectedCategories }
            ]);

            if (error) {
                console.error('Error inserting data:', error);
            } else {
                console.log('Preferences saved:', data);
                navigation.navigate('Home', { categories: selectedCategories });
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Favorite Categories</Text>
            <Text style={styles.subtitle}>Browse the topics you're interested in</Text>

            <ScrollView contentContainerStyle={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.name}
                        style={[
                            styles.categoryButton,
                            {
                                backgroundColor: selectedCategories.includes(category.name)
                                    ? category.color
                                    : '#f0f8ff',
                                borderColor: category.color,
                            },
                        ]}
                        onPress={() => toggleCategory(category.name)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                { color: selectedCategories.includes(category.name) ? '#fff' : category.color },
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    categoryButton: {
        width: '40%',
        margin: 8,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 18,
    },
    continueButton: {
        backgroundColor: '#4682B4',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PreferencesScreen;
