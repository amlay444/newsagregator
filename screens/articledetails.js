import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../supabase';

const ArticleDetails = () => {
    const route = useRoute();
    const { article, userId } = route.params;  // Ensure userId is passed along with article

    useEffect(() => {
        // Log the article view when the component mounts
        const logArticleView = async () => {
            try {
                const { error } = await supabase
                    .from('articles')
                    .insert([
                        {
                            article_id: article.url,  // Assuming URL is used as a unique identifier
                            article_name: article.title,
                            user_id: userId,
                            opened_at: new Date().toISOString()  // Current timestamp
                        }
                    ]);

                if (error) {
                    console.error("Error logging article view:", error.message);
                } else {
                    console.log("Article view logged successfully");
                }
            } catch (error) {
                console.error("Error logging article view:", error.message);
            }
        };

        logArticleView();
    }, [article, userId]);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: article.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.date}>Published At: {article.date}</Text>
            <Text style={styles.description}>{article.description}</Text>
            <Text style={styles.sentiment}>Sentiment: {article.sentiment}</Text>
            <Text style={styles.url}>{article.url}</Text>
            <Button title="Read More" onPress={() => Linking.openURL(article.url)} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
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
        color: 'green',
        marginBottom: 10,
    },
    url: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10,
    },
});

export default ArticleDetails;