import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import bellIcon from '../../assets/images/notification.png';
import searchIcon from '../../assets/images/search.png';
import { PRODUCTS } from '../../data/product';

// Header Component
const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Full Logo</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
      <Image
        source={bellIcon}
        style={styles.notificationIcon}
        resizeMode="contain"
      />
      </TouchableOpacity>
    </View>
    <Text style={styles.deliveryAddress}>DELIVERY ADDRESS</Text>
    <Text style={styles.address}>Umuezike Road, Oyo State</Text>
  </View>
);

// Product Card Component
const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <Image source={product.image} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const handleProductPress = (product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header />

      <ScrollView style={styles.content}>
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search...</Text>
      </View>

        <Text style={styles.categoryTitle}>Technology</Text>
        <Text style={styles.categorySubtitle}>Smartphones, Laptops & Accessories</Text>

        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 20,
    height: 20
  },
  deliveryAddress: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    flexDirection: 'row',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "contain"
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
