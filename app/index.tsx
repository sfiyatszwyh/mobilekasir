import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.cardContainer}>
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

        <Card>
          <Card.Title>Total Pelanggan</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>50 Pelanggan</Text>
          <Button
            icon={<Icon name="user" type="font-awesome" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Pelanggan"
            onPress={() => navigation.navigate('CustomerScreen')}
          />
        </Card>

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

        <Card>
          <Card.Title>Transaksi Terbaru</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>Hari Ini: 20 Transaksi</Text>
          <Button
            icon={<Icon name="money" type="font-awesome" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Transaksi"
            onPress={() => navigation.navigate('TransactionScreen')}
          />
        </Card>
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
  cardText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
  },
});

export default HomeScreen;
