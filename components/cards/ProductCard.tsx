import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

interface ProductCardProps {
  navigation: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ navigation }) => (
  <Card>
          <Card.Title>Total Produk</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>100 Produk</Text>
          <Button
            icon={<Icon name="shopping-cart" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Produk"
            onPress={() => navigation.navigate('ProductScreen')}
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

export default ProductCard;

