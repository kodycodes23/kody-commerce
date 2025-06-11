import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useCart } from '../../context/CartContext';

export default function TabLayout() {
  const { cartCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#60B5FF',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabWrapper}>
              <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
                <Feather
                  name="home"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
              <Text style={[styles.tabLabel, { color: focused ? '#60B5FF' : 'black' }]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Cart',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={styles.cartIconContainer}>
               <View style={styles.tabWrapper}>
              <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
                <Ionicons
                  name="cart-outline"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
              <Text style={[styles.tabLabel, { color: focused ? '#60B5FF' : 'black' }]}>
                Cart
              </Text>
            </View>
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favourites',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabWrapper}>
              <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
              <Text style={[styles.tabLabel, { color: focused ? '#60B5FF' : 'black' }]}>
                Favourites
              </Text>
            </View>
          ),
        }}
      /><Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabWrapper}>
            <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={focused ? 'white' : 'black'}
              />
            </View>
            <Text style={[styles.tabLabel, { color: focused ? '#60B5FF' : 'black' }]}>
              Profile
            </Text>
          </View>
        ),
      }}
    />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 24,
  },
  cartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  defaultTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  focusedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#60B5FF',
  },
  // tabLabel: {
  //   fontSize: 12,
  //   fontWeight: '500',
  //   marginTop: 2,
  // },
  tabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperFocused: {
    backgroundColor: '#60B5FF',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
