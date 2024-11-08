import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

interface TransactionCardProps {
  navigation: any;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ navigation }) => (
  <Card>
          <Card.Title>Transaksi Terbaru</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>Hari Ini: 20 Transaksi</Text>
          <Button
            icon={<Icon name="money" type="font-awesome" color="#ffffff" />}
            buttonStyle={styles.button}
            title="Lihat Transaksi"
            onPress={() => navigation.navigate('TransactionScreen')}
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

export default TransactionCard;

