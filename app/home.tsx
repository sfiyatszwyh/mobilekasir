import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryCard from '../components/cards/CategoryCard';
import CustomerCard from '../components/cards/CustomerCard';
import ProductCard from '../components/cards/ProductCard';
import TransactionCard from '../components/cards/TransactionCard';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("Token yang ada:", token);  // Periksa apakah token ada
      if (!token) {
        Alert.alert('Error', 'Anda perlu login terlebih dahulu');
        router.replace('/index');
      }
    };
  
    checkLoginStatus();
  }, []);
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.cardContainer}>
        <CategoryCard navigation={navigation} />
        <CustomerCard navigation={navigation} />
        <ProductCard navigation={navigation} />
        <TransactionCard navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    margin: 10,
  },
});

export default HomeScreen;
