import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { getCurrentUser, updateUser, account } from '../../lib/appwrite'; // Asegúrate de importar tus funciones de Appwrite

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter(); // Usa el hook useRouter para la navegación

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setUsername(currentUser.username);
          setEmail(currentUser.email);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      if (user) {
        const updatedData = { username, email };
        await updateUser(user.$id, updatedData);
        Alert.alert('Éxito', 'Perfil actualizado con éxito');
        // Cerrar sesión después de actualizar el perfil
        await handleLogout();
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo actualizar el perfil: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      // Verificar si el usuario está autenticado antes de intentar cerrar sesión
      const hasSession = await checkSession();
      if (hasSession) {
        await account.deleteSession('current'); // Cierra la sesión actual
        Alert.alert('Éxito', 'Has cerrado sesión con éxito');
        // Redirigir a la pantalla de inicio de sesión
        router.push('/sign-in'); // Usa router.push para redirigir
      } else {
        Alert.alert('Error', 'No hay una sesión activa para cerrar.');
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo cerrar sesión: ${error.message}`);
    }
  };

  const checkSession = async () => {
    try {
      const session = await account.get();  // Revisa si existe alguna sesión activa
      return session ? true : false;  // Devuelve `true` si existe, `false` si no
    } catch (error) {
      console.log('No active session found.');
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Cyber Copias<Text style={styles.logoDot}>.</Text>
        </Text>
      </View>

      <View style={styles.banner}>
        <Image style={styles.bannerImage} source={require('../../assets/images/escritura.jpg')} />
        <Text style={styles.bannerText}>¡Bienvenido a CyberCopias!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¡Gracias por visitarnos!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoDot: {
    color: '#007bff',
  },
  banner: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  bannerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default EditProfile;
