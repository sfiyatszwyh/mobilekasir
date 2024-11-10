import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';


const ProductCard: React.FC = () => {
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/product');
        const data = await response.json();
        setProductCount(data.length);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProducts();
  }, []);
  return(
    <Card>
          <Card.Title>Total Produk</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>{productCount} Produk</Text>
          <Button
            icon={<Icon name="shopping-cart" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Produk"
            onPress={() => router.push('/ProductScreen')}
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

export default ProductCard;

