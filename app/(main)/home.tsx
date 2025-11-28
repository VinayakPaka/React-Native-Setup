import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const categories = [
    { id: 1, name: "Fruits", icon: "🍎", color: "bg-red-100" },
    { id: 2, name: "Vegetables", icon: "🥬", color: "bg-green-100" },
    { id: 3, name: "Dairy", icon: "🥛", color: "bg-blue-100" },
  ];

  const products = [
    {
      id: 1,
      name: "Tomatoes",
      price: "₹49",
      image: "🍅",
      category: "Vegetables",
    },
    { id: 2, name: "Bananas", price: "₹39", image: "🍌", category: "Fruits" },
    { id: 3, name: "Milk", price: "₹65", image: "🥛", category: "Dairy" },
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
        
        <View className='bg-emerald-600 px-4 pt-2 pb-4'>
          {/* Header with location */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white text-xs opacity-90">Delivery to</Text>
              <View className='flex-row items-center'>
                <Text className='text-white text-base font-bold mr-1'>Home ▼</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-white text-xl font-semibold">
                📍 Change
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              style={{ flex: 1, color: '#1F2937' }}
              placeholder="Search for products..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View> 
    
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({})