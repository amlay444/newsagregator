import React, { Component } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Card, Paragraph, Title, Chip } from "react-native-paper";
import { supabase } from '../supabase';
import Header from "../components/AppBar";
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends Component {
    state = {
        articles: [],
        recommendedArticles: [],
        categories: [],
        selectedCategory: null,
        continueReading: [],
        isLoading: true,
        error: null,
        userId: null,
        searchQuery: '',
    };

    async componentDidMount() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error getting user:", error.message);
            return;
        }
        
        if (user) {
            this.setState({ userId: user.id }, async () => {
                await this.fetchUserCategories();
                this.getArticles();
            });
        } else {
            console.error("No user found");
        }
    }

    fetchUserCategories = async () => {
        try {
            const { userId } = this.state;
            if (!userId) {
                throw new Error("User ID is undefined");
            }

            // Query the preferences table
            const { data, error } = await supabase
                .from('preferences')
                .select('categories')
                .eq('user_id', userId);

            if (error) throw error;

            // Check if we have exactly one row
            if (data && data.length === 1) {
                this.setState({ categories: data[0].categories });
            } else if (data.length === 0) {
                // If no preferences exist, create default ones
                const defaultCategories = ['general', 'technology', 'sports'];
                const { data: newData, error: insertError } = await supabase
                    .from('preferences')
                    .insert([
                        { user_id: userId, categories: defaultCategories }
                    ])
                    .select();

                if (insertError) throw insertError;
                if (newData && newData.length === 1) {
                    this.setState({ categories: newData[0].categories });
                }
            } else {
                throw new Error("Multiple preference entries found for user");
            }
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    };

    getArticles = async (category = 'general') => {
        this.setState({ isLoading: true });
        axios
            .get(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=12&apikey=YOUR_API_KEY`)
            .then(response => {
                const articles = response.data.articles.map(article => ({
                    date: article.publishedAt,
                    title: article.title,
                    url: article.url,
                    description: article.description,
                    urlToImage: article.image,
                }));
                this.setState({ articles, isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    handleSearch = async () => {
        const { searchQuery } = this.state;
        if (!searchQuery) return;
        
        this.setState({ isLoading: true });
        axios
            .get(`https://gnews.io/api/v4/search?q=example&lang=en&country=any&max=10&apikey=75cbd76c62f0753219c9aff5102df119`)
            .then(response => {
                const articles = response.data.articles.map(article => ({
                    date: article.publishedAt,
                    title: article.title,
                    url: article.url,
                    description: article.description,
                    urlToImage: article.image,
                }));
                this.setState({ articles, isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    handleArticlePress = (article) => {
        this.props.navigation.navigate('Article', { article });
    };

    render() {
        const { isLoading, articles, categories, selectedCategory, continueReading, recommendedArticles } = this.state;

        return (
            <View style={styles.container}>
                <Header />

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search for articles..."
                        style={styles.searchInput}
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                        onSubmitEditing={this.handleSearch}
                    />
                </View>

                {/* Display User-selected Categories */}
                <ScrollView horizontal contentContainerStyle={styles.categoriesContainer}>
                    {Array.isArray(categories) && categories.map((category, index) => (
                        <Chip
                            key={index}
                            mode="outlined"
                            selected={selectedCategory === category}
                            onPress={() => {
                                this.setState({ selectedCategory: category });
                                this.getArticles(category);
                            }}
                            style={styles.chip}
                        >
                            {category}
                        </Chip>
                    ))}
                </ScrollView>

                <ScrollView contentContainerStyle={styles.scrollView}>
                    {!isLoading ? (
                        articles.map(article => {
                            const { date, title, url, description, urlToImage } = article;
                            return (
                                <Card
                                    key={url}
                                    style={styles.card}
                                    onPress={() => this.handleArticlePress(article)}
                                >
                                    <View style={styles.cardContent}>
                                        <View style={styles.textContainer}>
                                            <Title style={styles.title}>{title}</Title>
                                            <Paragraph style={styles.description}>{description}</Paragraph>
                                            <Text style={styles.date}>Published At: {date}</Text>
                                        </View>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.image} source={{ uri: urlToImage }} />
                                        </View>
                                    </View>
                                </Card>
                            );
                        })
                    ) : (
                        <Text style={styles.loadingText}>Loading...</Text>
                    )}

                    {/* Continue Reading Section */}
                    {continueReading.length > 0 && (
                        <View>
                            <Text style={styles.sectionTitle}>Continue Reading</Text>
                            {continueReading.map((article, index) => (
                                <Text key={index} style={styles.articleTitle}>{article.title}</Text>
                            ))}
                        </View>
                    )}

                    {/* Recommended Articles Section */}
                    {recommendedArticles.length > 0 && (
                        <View>
                            <Text style={styles.sectionTitle}>Recommended Articles</Text>
                            {recommendedArticles.map((article, index) => (
                                <Text key={index} style={styles.articleTitle}>{article.title}</Text>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    categoriesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    chip: {
        marginRight: 10,
    },
    scrollView: {
        paddingBottom: 20,
    },
    card: {
        margin: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        elevation: 1,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10,
    },
    textContainer: {
        flex: 2,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
    date: {
        fontSize: 12,
        color: 'darkgray',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    loadingText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 10,
    },
    articleTitle: {
        fontSize: 16,
        color: '#007BFF',
        marginLeft: 10,
        marginVertical: 5,
    },
});
