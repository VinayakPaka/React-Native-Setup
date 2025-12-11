import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Category } from '@/utils/constants';

interface CategoryCardProps {
  category: Category;
  productCount: number;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${category.color} rounded-xl p-4 mb-4 shadow-sm`}
      style={{ width: '48%' }}
      activeOpacity={0.7}
    >
      {/* Category Icon */}
      <View className="items-center mb-2">
        <Text className="text-5xl mb-1">{category.icon}</Text>
      </View>

      {/* Category Name */}
      <Text className="text-base font-bold text-gray-800 text-center mb-1">
        {category.name}
      </Text>

      {/* Product Count */}
      <Text className="text-sm text-gray-600 text-center">
        {productCount} {productCount === 1 ? 'product' : 'products'}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
