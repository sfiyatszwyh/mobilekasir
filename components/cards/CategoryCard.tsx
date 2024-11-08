import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

interface CategoryCardProps {
  navigation: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ navigation }) => (
  <Card>
    <Card.Title>Total Kategori</Card.Title>
    <Card.Divider />
    <Text style={styles.cardText}>10 Kategori</Text>
    <Button
      icon={<Icon name="list" color="#ffffff" />}
      buttonStyle={styles.button}
      title="Lihat Kategori"
      onPress={() => navigation.navigate('CategoryScreen')}
    />
  </Card>
);

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

