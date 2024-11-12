import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Customer = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
};

const CustomerScreen: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/customer');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin menghapus pelanggan ini?",
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: async () => {
            try {
              const response = await fetch(`http://10.0.2.2:8000/api/customer/${id}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                setCustomers(customers.filter(customer => customer.id !== id));
                Alert.alert("Sukses", "Pelanggan berhasil dihapus.");
              } else {
                Alert.alert("Error", "Gagal menghapus pelanggan.");
              }
            } catch (error) {
              console.error("Error deleting customer:", error);
              Alert.alert("Error", "Terjadi kesalahan. Coba lagi.");
            }
          }
        },
      ]
    );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const renderCustomer = ({ item }: { item: Customer }) => (
    <View style={styles.customerItem}>
      <View style={styles.iconContainer}>
        <FontAwesome name="user" size={24} color="#4CAF50" />
      </View>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        {item.phone && <Text style={styles.customerDetails}>📞 {item.phone}</Text>}
        {item.address && <Text style={styles.customerDetails}>🏠 {item.address}</Text>}
      </View>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push(`/EditCustomerScreen?id=${item.id}`)}
      >
        <FontAwesome name="edit" size={20} color="#FFA726" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => deleteCustomer(item.id)}
      >
        <FontAwesome name="trash" size={20} color="#E57373" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading customers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Pelanggan</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCustomer}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/TambahCustomerScreen')}>
        <Text style={styles.mainButtonText}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  customerItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  actionButton: {
    marginHorizontal: 6,
  },
  mainButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  customerDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default CustomerScreen;
