import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { categories } from '@/utils/constants';
import CategoryCard from '@/components/CategoryCard';
import { productsApi } from '@/utils/api';

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

const Categories = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
      console.log('✅ Fetched products for categories:', data.length);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate product count for each category
  const getProductCount = (categoryName: string): number => {
    return products.filter((p) => p.category === categoryName).length;
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle category press - navigate to filtered products
  const handleCategoryPress = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* Header Section */}
      <View className="bg-emerald-600 px-4 pt-2 pb-4">
        <Text className="text-white text-2xl font-bold mb-3">
          Browse Categories
        </Text>

        {/* Search Bar */}
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            style={{ flex: 1, color: '#1F2937' }}
            placeholder="Search categories..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-gray-400 ml-2">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Grid */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="text-gray-500 mt-2">Loading categories...</Text>
        </View>
      ) : filteredCategories.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-6xl mb-4">🔍</Text>
          <Text className="text-xl font-bold text-gray-800 mb-2">
            No categories found
          </Text>
          <Text className="text-gray-500 text-center">
            {searchQuery
              ? `No categories match "${searchQuery}"`
              : 'No categories available at the moment'}
          </Text>
          {searchQuery && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              className="bg-emerald-600 px-6 py-3 rounded-lg mt-4"
            >
              <Text className="text-white font-semibold">Clear Search</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              productCount={getProductCount(item.name)}
              onPress={() => handleCategoryPress(item.name)}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Categories;