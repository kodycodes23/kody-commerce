import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import heartIcon from '../../assets/images/heart.png';
import bellIcon from '../../assets/images/notification.png';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/product';

// Toast function for both platforms
const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Success', message);
  }
};

// Header Component
const Header = ({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
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

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === parseInt(id as string));

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Item has been added to cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header onBackPress={() => router.back()} />

      <ScrollView style={styles.content}>
        <View style={styles.productDetailContainer}>
          <TouchableOpacity style={styles.favoriteButton}>
          <Image
        source={heartIcon}
        style={styles.favoriteIcon}
        resizeMode="contain"
  />
          </TouchableOpacity>

          <Image source={product.image} style={styles.productDetailImage} />

          <Text style={styles.productDetailName}>{product.name}</Text>
          <Text style={styles.productDetailPrice}>${product.price.toFixed(2)}</Text>

          <Text style={styles.aboutTitle}>About this item</Text>
          <Text style={styles.productDescription}>• {product.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
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
  productDetailContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    height: 24,
    width: 24,
  },
  productDetailImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 24,
  },
  productDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  productDetailPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
