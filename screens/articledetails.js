import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Linking,
    Button,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For "Don't show again" preference
import { supabase } from '../supabase';
import ExplanationModal from '../config/explanationmodal';

const ArticleDetails = () => {
    const route = useRoute();
    const { article, userId } = route.params; // Ensure userId is passed along with article
    const [isModalVisible, setModalVisible] = useState(false);
    const [polarity, setPolarity] = useState(null); // State for polarity
    const [subjectivity, setSubjectivity] = useState(null); // State for subjectivity

    useEffect(() => {
        const logArticleView = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('article_id, polarity, subjectivity')
                    .eq('article_id', article.url)
                    .single();

                if (data) {
                    // If data exists, use the fetched polarity and subjectivity
                    setPolarity(data.polarity);
                    setSubjectivity(data.subjectivity);
                    console.log('Article already logged:', data);
                } else if (error && error.code === 'PGRST116') {
                    const newPolarity = Math.random() * 2 - 1; // Generate random polarity (-1 to 1)
                    const newSubjectivity = Math.random(); // Generate random subjectivity (0 to 1)
                    const { error: insertError } = await supabase
                        .from('articles')
                        .insert([{
                            article_id: article.url,
                            article_name: article.title,
                            user_id: userId,
                            polarity: newPolarity,
                            subjectivity: newSubjectivity,
                            opened_at: new Date().toISOString(),
                        }]);
                    if (insertError) {
                        console.error('Error logging article view:', insertError.message);
                    } else {
                        // After inserting, update the state with the new polarity and subjectivity
                        setPolarity(newPolarity);
                        setSubjectivity(newSubjectivity);
                        console.log('Article view logged successfully');
                    }
                } else {
                    console.error('Error fetching article data:', error.message);
                }
            } catch (error) {
                console.error('Error logging article view:', error.message);
            }
        };

        const showExplanationMessage = async () => {
            try {
                const hasSeenMessage = await AsyncStorage.getItem('hasSeenPolarityMessage');
                if (!hasSeenMessage) {
                    setModalVisible(true);
                }
            } catch (error) {
                console.error('Error showing explanation message:', error);
            }
        };

        logArticleView();
        showExplanationMessage();
    }, [article, userId]);

    const handleModalClose = async () => {
        await AsyncStorage.setItem('hasSeenPolarityMessage', 'true');
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ExplanationModal isVisible={isModalVisible} onClose={handleModalClose} />
            <ScrollView style={styles.container}>
                <Image source={{ uri: article.urlToImage }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Text style={styles.date}>Published At: {article.date}</Text>
                    <Text style={styles.description}>{article.description}</Text>
                    {/* Render the polarity and subjectivity */}
                    <Text style={styles.sentiment}>
                        Polarity: {polarity !== null ? polarity.toFixed(2) : 'Loading...'} | 
                        Subjectivity: {subjectivity !== null ? subjectivity.toFixed(2) : 'Loading...'}
                    </Text>
                    <Button title="Read More" onPress={() => Linking.openURL(article.url)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    content: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    sentiment: {
        fontSize: 16,
        color: 'darkred',
        marginBottom: 10,
    },
});

export default ArticleDetails;
