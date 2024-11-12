
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const TambahKategoriScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  
  const handleSubmit = async () => {
    if (!name) {
      Alert.alert('Error', 'Nama kategori harus diisi.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/api/cat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (response.ok) {
        Alert.alert('Sukses', 'Kategori berhasil ditambahkan.');
        router.back(); 
      } else {
        Alert.alert('Error', 'Gagal menambahkan kategori.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan. Coba lagi.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Kategori</Text>

      <Text style={styles.label}>Nama Kategori</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama kategori"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TambahKategoriScreen;

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
