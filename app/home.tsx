import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('username');
      
      if (!token) {
        Alert.alert('Error', 'Anda perlu login terlebih dahulu');
        router.push('/');
        return;
      }

      const response = await fetch('http://10.0.2.2:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const data = await response.json();
      setUsername(data.name || 'Pengguna');
    };
  
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Sukses', 'Anda telah logout.');
      router.push('/');
    } catch (error) {
      console.error('Error saat logout:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat logout.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user-circle" type="font-awesome" size={50} color="#007bff" />
        <Text style={styles.greeting}>
          Halo, <Text style={styles.boldText}>{username}!</Text>
        </Text>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/ProductScreen')}>
          <Icon name="shopping-cart" size={30} color="#007bff" />
          <Text style={styles.cardText}>Produk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/CategoryScreen')}>
          <Icon name="flask" type="font-awesome" size={30} color="#007bff" />
          <Text style={styles.cardText}>Kategori</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/TransactionScreen')}>
          <Icon name="history" type="font-awesome" size={30} color="#007bff" />
          <Text style={styles.cardText}>Riwayat Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/CustomerScreen')}>
          <Icon name="users" type="font-awesome" size={30} color="#007bff" />
          <Text style={styles.cardText}>Pelanggan</Text>
        </TouchableOpacity>
      </View>

      <Button title="Logout" onPress={handleLogout} color="#007bff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
