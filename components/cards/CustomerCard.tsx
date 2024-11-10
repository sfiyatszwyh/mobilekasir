import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';


const CustomerCard: React.FC = () => {
  const router = useRouter();
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/customer');
        const data = await response.json();
        setCustomerCount(data.length);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomers();
  }, []);
  return(
    <Card>
    <Card.Title>Total Pelanggan</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>{customerCount} Pelanggan</Text>
          <Button
            icon={<Icon name="user" type="font-awesome" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Pelanggan"
            onPress={() => router.push('/CustomerScreen')}
          />
  </Card>
  );
};

const styles = StyleSheet.create({
  cardText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
  },
});

export default CustomerCard;

