import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { productsApi } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  description?: string;
  stock: number;
  createdAt?: string;
}

const CategoryDetail = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      fetchCategoryProducts();
    }
  }, [name]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all products and filter by category
      const data = await productsApi.getAll();
      const filteredProducts = data.filter(
        (product: Product) => product.category === name
      );
      setProducts(filteredProducts);
      console.log(`✅ Fetched ${filteredProducts.length} products for category: ${name}`);
    } catch (err) {
      console.error('❌ Error fetching category products:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Product) => {
    dispatch(
      addToCart({
        id: item._id,
        name: item.name,
        imageUrl: item.imageUrl,
        category: item.category,
        price: item.price,
        quantity: 1,
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* Header */}
      <View className="bg-emerald-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 w-10 h-10 items-center justify-center"
        >
          <Text className="text-white text-2xl">←</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-white text-2xl font-bold">{name}</Text>
          <Text className="text-white text-sm opacity-90">
            {products.length} {products.length === 1 ? 'product' : 'products'}{' '}
            available
          </Text>
        </View>
      </View>

      {/* Products List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="text-gray-500 mt-2">Loading products...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-4">
          <View className="bg-red-50 rounded-lg p-6 w-full items-center">
            <Text className="text-red-600 font-semibold text-lg mb-2">
              ⚠️ Error
            </Text>
            <Text className="text-red-500 text-sm text-center mb-4">
              {error}
            </Text>
            <TouchableOpacity
              onPress={fetchCategoryProducts}
              className="bg-red-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-6xl mb-4">📦</Text>
          <Text className="text-xl font-bold text-gray-800 mb-2">
            No Products Available
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            There are no products in the {name} category at the moment.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-emerald-600 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Browse Other Categories</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100 flex-row">
              {/* Product Image */}
              <View className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden mr-4">
                <Image
                  source={{
                    uri: item.imageUrl || 'https://via.placeholder.com/150',
                  }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>

              {/* Product Details */}
              <View className="flex-1 justify-between">
                <View>
                  <Text
                    className="text-base font-bold text-gray-800"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {item.category}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      item.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.stock > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
                  </Text>
                </View>

                {/* Price and Add Button */}
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-xl font-bold text-emerald-600">
                    ₹{item.price}
                  </Text>
                  <TouchableOpacity
                    className={`${
                      item.stock > 0 ? 'bg-emerald-600' : 'bg-gray-400'
                    } px-4 py-2 rounded-lg`}
                    onPress={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <Text className="text-white text-sm font-semibold">
                      {item.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryDetail;
