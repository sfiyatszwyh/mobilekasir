import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert } from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
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
    <View style={{ padding: 20 }}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
