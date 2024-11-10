import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';


const CategoryCard: React.FC = () => {
  const router = useRouter();
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/cat');
        const data = await response.json();
        setCategoryCount(data.length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card>
      <Card.Title>Total Kategori</Card.Title>
      <Card.Divider />
      <Text style={styles.cardText}>{categoryCount} Kategori</Text>
      <Button
        icon={<Icon name="list" color="#ffffff" />}
        buttonStyle={styles.button}
        title="Lihat Kategori"
        onPress={() => router.push('/CategoryScreen')}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
  },
});

export default CategoryCard;
