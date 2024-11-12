import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(''); // URL Gambar produk
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        Alert.alert("Error", "ID produk tidak valid.");
        return;
      }

      try {
        const response = await fetch(`http://10.0.2.2:8000/api/product/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from API:", errorData);
          Alert.alert("Error", `Gagal mengambil data produk: ${errorData.message || response.statusText}`);
          return;
        }

        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImageUrl(data.image_url);  // Ambil URL gambar produk
      } catch (error) {
        console.error("Error fetching product:", error);
        Alert.alert("Error", "Gagal mengambil data produk. Coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Nama dan harga produk harus diisi.");
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:8000/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
        }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Data produk berhasil diperbarui.");
        navigation.goBack();  
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Gagal memperbarui data produk: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Error", "Terjadi kesalahan. Coba lagi.");
    }
  };

  // Menampilkan loading jika data masih dimuat
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Memuat data produk...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Produk</Text>

        {/* Placeholder for product image */}
        <View style={styles.imagePlaceholder}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <Text style={styles.noImageText}>Tidak ada gambar</Text>
          )}
        </View>

        <Text style={styles.label}>Nama Produk</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Produk"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi Produk"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Harga</Text>
        <TextInput
          style={styles.input}
          placeholder="Harga Produk"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 20, // To prevent the last button from being hidden when scrolled
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
    textAlign: 'center',
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
  imagePlaceholder: {
    backgroundColor: '#ececec',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  noImageText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
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
