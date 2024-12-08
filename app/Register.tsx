import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'; // Pastikan sudah diinstal dengan `npm install expo-checkbox`

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleRegister = async () => {
    if (!agree) {
      Alert.alert('Error', 'Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Akun</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nama"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Kata Sandi"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox value={agree} onValueChange={setAgree} color={agree ? '#007BFF' : undefined} />
        <Text style={styles.checkboxLabel}>
          Menyetujui <Text style={styles.linkText}>Syarat & Ketentuan</Text> serta{' '}
          <Text style={styles.linkText}>Kebijakan Privasi</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    flexShrink: 1,
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
