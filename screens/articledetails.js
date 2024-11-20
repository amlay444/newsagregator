import React, { useEffect } from 'react';
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
import { supabase } from '../supabase';

const ArticleDetails = () => {
    const route = useRoute();
    const { article, userId } = route.params; // Ensure userId is passed along with article

    useEffect(() => {
        const logArticleView = async () => {
            try {
                const { error } = await supabase
                    .from('articles')
                    .insert([
                        {
                            article_id: article.url, // Assuming URL is used as a unique identifier
                            article_name: article.title,
                            user_id: userId,
                            opened_at: new Date().toISOString(), // Current timestamp ensures uniqueness
                        },
                    ]);

                if (error) {
                    console.error('Error logging article view:', error.message);
                } else {
                    console.log('Article view logged successfully');
                }
            } catch (error) {
                console.error('Error logging article view:', error.message);
            }
        };

        logArticleView();
    }, [article, userId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Image source={{ uri: article.urlToImage }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Text style={styles.date}>Published At: {article.date}</Text>
                    <Text style={styles.description}>{article.description}</Text>
                    <Text style={styles.sentiment}>Sentiment: {article.sentiment}</Text>
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
        overflow: 'hidden', // Ensures image doesn't bleed outside boundaries
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
