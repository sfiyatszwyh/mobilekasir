import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>(''); // State untuk email/username
  const [password, setPassword] = useState<string>(''); // State untuk kata sandi

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan Kata Sandi tidak boleh kosong!');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.message === 'Login successful') {
        // Simpan token ke AsyncStorage
        await AsyncStorage.setItem('token', data.token); // Menyimpan token
        
        Alert.alert('Sukses', 'Login berhasil!');
        router.push('/home'); // Navigasi ke halaman home setelah login berhasil
      } else {
        Alert.alert('Error', data.message || 'Login gagal!');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      Alert.alert('Error', 'Terjadi kesalahan. Periksa koneksi internet Anda.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Teks Selamat Datang */}
      <Text style={styles.welcomeText}>Selamat Datang!</Text>
      
      {/* Input Email/Username */}
      <TextInput
        placeholder="Masukkan Email/Username"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Input Kata Sandi */}
      <TextInput
        placeholder="Masukkan Kata Sandi"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Lupa Kata Sandi */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
      </TouchableOpacity>

      {/* Tombol Masuk */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Masuk</Text>
      </TouchableOpacity>

      {/* Daftar Akun */}
      <View style={styles.registerContainer}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={styles.registerText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  registerText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
