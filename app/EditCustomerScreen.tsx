import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCustomerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;  

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) {
        Alert.alert("Error", "ID pelanggan tidak valid.");
        return;
      }

      try {
        const response = await fetch(`http://10.0.2.2:8000/api/customer/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from API:", errorData);
          Alert.alert("Error", `Gagal mengambil data pelanggan: ${errorData.message || response.statusText}`);
          return;
        }

        const data = await response.json();
        setName(data.name);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (error) {
        console.error("Error fetching customer:", error);
        Alert.alert("Error", "Gagal mengambil data pelanggan. Coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSave = async () => {
    if (!name) {
      Alert.alert("Error", "Nama harus diisi.");
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:8000/api/customer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          address,
        }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Data pelanggan berhasil diperbarui.");
        navigation.goBack();  
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Gagal memperbarui data pelanggan: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      Alert.alert("Error", "Terjadi kesalahan. Coba lagi.");
    }
  };

  // Menampilkan loading jika data masih dimuat
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Memuat data pelanggan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Pelanggan</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Pelanggan"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Telepon</Text>
      <TextInput
        style={styles.input}
        placeholder="Nomor Telepon"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
