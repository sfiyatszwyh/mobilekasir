import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/transaction');
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Gagal mengambil data transaksi');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Memuat data transaksi...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaksi Hari Ini</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.itemName}>ID Transaksi: {item.id}</Text>
            <Text style={styles.amount}>Total Harga: Rp {item.total_price}</Text>
            <Text style={styles.amount}>Pembayaran: Rp {item.payment}</Text>
            <Text style={styles.amount}>Kembalian: Rp {item.change}</Text>
            <Text style={styles.date}>Tanggal: {item.transaction_date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#34495e',
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  amount: {
    fontSize: 16,
    color: '#27ae60',
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: '#95a5a6',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TransactionScreen;
