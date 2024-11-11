import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
       <Stack.Screen name="CategoryScreen" options={{ title: 'Categories' }} />
       <Stack.Screen name="CustomerScreen" options={{ title: 'Customers' }} />
       <Stack.Screen name="ProductScreen" options={{ title: 'Katalog Produk' }} />
       <Stack.Screen name="TransactionScreen" options={{ title: 'Transactions' }} />
       <Stack.Screen name="TambahProdukScreen" options={{ title: 'Tambah Produk' }} />
    </Stack>
  );
}
