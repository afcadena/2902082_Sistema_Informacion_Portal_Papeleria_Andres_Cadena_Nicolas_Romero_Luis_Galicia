import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const specialCategories = [
  { name: "Papel", image: require('../../assets/images/blog_papelarte_abril.jpeg') },
  { name: "Coleccionables", image: require('../../assets/images/coleccionables.jpg') },
  { name: "Escritura", image: require('../../assets/images/escritura.jpg') },
  // Agrega más categorías especiales según sea necesario
];

const categories = [
  { name: "Cuadernos", image: require('../../assets/images/cuaderno.jpg') },
  { name: "Arte", image: require('../../assets/images/Arte.jpg') },
  { name: "Accesorios", image: require('../../assets/images/accesorios.jpg') },
  // Agrega más categorías según sea necesario
];

const newProducts = [
  { name: "Cuaderno 2024", image: require('../../assets/images/cuaderno.jpg'), price: "$25.00" },
  { name: "Set de Pinturas", image: require('../../assets/images/Arte.jpg'), price: "$40.00" },
  { name: "Agenda 2024", image: require('../../assets/images/accesorios.jpg'), price: "$30.00" },
  // Agrega más productos nuevos según sea necesario
];

const Home = () => {
  const router = useRouter();
  const [headerVisible, setHeaderVisible] = React.useState(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        setHeaderVisible(currentOffset < 100);
      },
    }
  );

  const handleLogout = () => {
    // Aquí agregas la lógica para cerrar sesión
    // Por ejemplo, limpiar el estado de autenticación
    console.log('Cerrar sesión');
    // Redirigir al usuario a la pantalla de inicio de sesión
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Oculta la barra de estado */}
      <StatusBar hidden={true} />
      <Animated.View style={[styles.header, { transform: [{ translateY: headerVisible ? 0 : -100 }] }]}>
        <Text style={styles.logo}>Cybercopias</Text>
        {/* Botón de cierre de sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Home Section */}
        <View style={styles.home}>
          <Image source={require('../../assets/images/escritura.jpg')} style={styles.backgroundImage} />
          <View style={styles.content}>
            <Text style={styles.title}>Bienvenido Cliente</Text>
            <Text style={styles.subtitle}>Gran variedad de materiales</Text>
            <Text style={styles.paragraph}>
              Somos tu destino para materiales de papelería de calidad. Ofrecemos una amplia gama de productos, atención personalizada y un compromiso con la sostenibilidad.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/profile')}>
              <Text style={styles.btnText}>Ver ahora</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Special Categories Section */}
        <View style={styles.specialCategoriesSection}>
          <Text style={styles.heading}>Categorías Especiales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialCategories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`/category/${category.name.toLowerCase()}`)}>
                <View style={styles.categoryCard}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.heading}>Nuestras Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`/category/${category.name.toLowerCase()}`)}>
                <View style={styles.categoryCard}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* New Products Section */}
        <View style={styles.newProductsSection}>
          <Text style={styles.heading}>Novedades</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newProducts.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <Image source={product.image} style={styles.productImage} />
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => console.log('Agregar al carrito')}>
                  <Text style={styles.addButtonText}>Agregar al carrito</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinea el logo y el botón de cierre de sesión
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 8,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111418',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d', // Color rojo para el botón de cierre de sesión
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  home: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginTop: 50, // Añadir margen superior para bajar el texto
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#007bff', // Cambiar el color del botón a azul
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  specialCategoriesSection: {
    marginBottom: 20,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111418',
  },
  categoryCard: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#111418',
    marginTop: 8,
  },
  productCard: {
    width: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111418',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#111418',
  },
  addButton: {
    backgroundColor: '#007bff', // Cambiar el color del botón a azul
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
  },
});

export default Home;
