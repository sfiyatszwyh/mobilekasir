import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const TambahProdukScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');

  const handleSubmit = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Nama dan Harga harus diisi.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock) || 0, // Nilai default 0 jika kosong
          category_id: 1, // Set ID kategori sesuai kebutuhan
        }),
      });

      if (response.ok) {
        Alert.alert('Sukses', 'Produk berhasil ditambahkan.');
        router.back(); // Kembali ke layar sebelumnya
      } else {
        Alert.alert('Error', 'Gagal menambahkan produk.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan. Coba lagi.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Produk</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Tahu Bulat"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        placeholder="Rp 0"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Stok</Text>
      <TextInput
        style={styles.input}
        placeholder="di isi ya"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={styles.input}
        placeholder="Deskripsikan produk kamu"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TambahProdukScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
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
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
