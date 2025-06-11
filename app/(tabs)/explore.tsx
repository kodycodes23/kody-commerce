import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useCart } from '../../context/CartContext';

// Header Component
const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Full Logo</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Text style={styles.notificationIcon}>🔔</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.deliveryAddress}>DELIVERY ADDRESS</Text>
    <Text style={styles.address}>Umuezike Road, Oyo State</Text>
  </View>
);

// Cart Item Component
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: item.image }} style={styles.cartItemImage} />
    <View style={styles.cartItemInfo}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.stockStatus}>In stock</Text>
    </View>
    <View style={styles.cartItemActions}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function CartScreen() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header />

      <ScrollView style={styles.content}>
        <Text style={styles.cartTitle}>Your Cart</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}

            <View style={styles.orderInfo}>
              <Text style={styles.orderInfoTitle}>Order Info</Text>

              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Subtotal</Text>
                <Text style={styles.orderValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Shipping</Text>
                <Text style={styles.orderValue}>${shipping.toFixed(2)}</Text>
              </View>

              <View style={styles.orderRow}>
                <Text style={styles.orderLabelBold}>Total</Text>
                <Text style={styles.orderValueBold}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout (${total.toFixed(2)})</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 20,
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
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stockStatus: {
    fontSize: 12,
    color: '#00B894',
    fontWeight: '500',
  },
  cartItemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
  },
  orderInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 16,
    color: '#666',
  },
  orderValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  orderLabelBold: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  orderValueBold: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
