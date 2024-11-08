import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

interface CustomerCardProps {
  navigation: any;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ navigation }) => (
  <Card>
    <Card.Title>Total Pelanggan</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>50 Pelanggan</Text>
          <Button
            icon={<Icon name="user" type="font-awesome" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Pelanggan"
            onPress={() => navigation.navigate('CustomerScreen')}
          />
  </Card>
);

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

