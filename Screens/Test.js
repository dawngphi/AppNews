import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const apiKey = 'YOUR_API_KEY';
const Test = () => {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + apiKey)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BBC News - Top Headlines</Text>
      {articles.map((article, index) => (
        <View key={index} style={styles.article}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      ))}
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      article: {
        marginBottom: 16,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      description: {
        fontSize: 14,
      },
})