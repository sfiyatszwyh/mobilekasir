import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
       <Stack.Screen name="CategoryScreen" options={{ title: 'Kategori' }} />
       <Stack.Screen name="CustomerScreen" options={{ title: 'Pelanggan' }} />
       <Stack.Screen name="ProductScreen" options={{ title: 'Katalog Produk' }} />
       <Stack.Screen name="TransactionScreen" options={{ title: 'Transaksi' }} />
       <Stack.Screen name="TambahProdukScreen" options={{ title: 'Tambah Produk' }} />
       <Stack.Screen name="TambahCustomerScreen" options={{ title: 'Tambah Pelanggan' }} />
       <Stack.Screen name="TambahCategoryScreen" options={{ title: 'Tambah Kategori Produk' }} />
    </Stack>
  );
}
