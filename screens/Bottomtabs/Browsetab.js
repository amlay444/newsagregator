import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import { supabase } from "../../supabase";

export default class BrowseScreen extends Component {
  state = {
    recommendedArticles: [],
    breakingNews: [],
    categories: [],
    userId: null,
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    if (user) {
      this.setState({ userId: user.id }, async () => {
        await this.fetchUserCategories();
        this.fetchBreakingNews();
        this.fetchRecommendedArticles();
      });
    }
  }

  fetchUserCategories = async () => {
    try {
      const { userId } = this.state;
      if (!userId) throw new Error("User ID is undefined");

      const { data, error } = await supabase
        .from('preferences')
        .select('categories')
        .eq('user_id', userId);

      if (error) throw error;

      if (data && data.length === 1) {
        this.setState({ categories: data[0].categories });
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  fetchBreakingNews = async () => {
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?category=world&apikey=75cbd76c62f0753219c9aff5102df119&lang=en`
      );
      const breakingNews = response.data.articles.map(article => ({
        title: article.title,
        url: article.url,
        description: article.description,
        urlToImage: article.image,
      }));
      this.setState({ breakingNews });
    } catch (error) {
      console.error("Error fetching breaking news:", error.message);
    }
  };

  fetchRecommendedArticles = async () => {
    const { categories } = this.state;
  
    try {
      let fetchCategories = categories;
  
      // Use default categories if no user categories are available
      if (!fetchCategories || fetchCategories.length === 0) {
        console.warn("No user-selected categories found. Fetching default articles.");
        fetchCategories = ["entertainment", "health"]; // Add desired default categories
      }
  
      // Map each category to an API call
      const promises = fetchCategories.map(category =>
        axios.get(
          `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=75cbd76c62f0753219c9aff5102df119&lang=en`
        )
      );
  
      // Wait for all API calls to complete
      const results = await Promise.all(promises);
  
      // Process the data to create a flat list of articles
      const recommendedArticles = results
        .flatMap(result => result.data.articles)
        .map(article => ({
          title: article.title,
          url: article.url,
          description: article.description,
          urlToImage: article.image,
        }));
  
      // Update the state with the fetched articles
      this.setState({ recommendedArticles });
    } catch (error) {
      console.error("Error fetching recommended articles:", error.message);
    }
  };

  handleArticlePress = (article) => {
    this.props.navigation.navigate('Article', { article });
  };
  render() {
    const { breakingNews, recommendedArticles, isLoading } = this.state;
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Breaking News Section */}
          <View>
            <Text style={styles.sectionTitle}>Breaking News</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {breakingNews.map((news, index) => (
                <TouchableOpacity key={index} onPress={() => this.handleArticlePress(news)}>
                  <Card style={styles.newsCard}>
                    <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
                    <Text style={styles.newsTitle}>{news.title}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
  
          {/* Recommended Topics Section */}
          <View>
            <Text style={styles.sectionTitle}>Recommended Topics</Text>
            {recommendedArticles.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommendedArticles.map((article, index) => (
                  <TouchableOpacity key={index} onPress={() => this.handleArticlePress(article)}>
                    <Card style={styles.topicCard}>
                      <Image source={{ uri: article.urlToImage }} style={styles.topicImage} />
                      <Text style={styles.topicTitle}>{article.title}</Text>
                    </Card>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noArticlesMessage}>
                No recommended articles available. Please update your preferences to get personalized recommendations.
              </Text>
            )}
          </View>
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
  content: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  newsCard: {
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    width: 300,
  },
  newsImage: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  topicCard: {
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    width: 250,
  },
  topicImage: {
    height: 130,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  noArticlesMessage: {
    margin: 10,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },  
});
