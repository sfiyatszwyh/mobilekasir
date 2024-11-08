import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';

const TransactionCard: React.FC = () => {
  const router = useRouter();

  return (
    <Card>
      <Card.Title>Transaksi Terbaru</Card.Title>
      <Card.Divider />
      <Text style={styles.cardText}>Hari Ini: 20 Transaksi</Text>
      <Button
        icon={<Icon name="money" type="font-awesome" color="#ffffff" />}
        buttonStyle={styles.button}
        title="Lihat Transaksi"
        onPress={() => router.push('/TransactionScreen')}
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

export default TransactionCard;
