import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { ActionButton, GoogleButton, InputField } from './components';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [authState, setAuthState] = useState('login');
  const anim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(anim, { toValue: 1, duration: 2500, useNativeDriver: false })
    ]).start();
  }, [anim]);

  const triggerFlip = (nextState) => {
    // 1. Giramos hasta 90° (se vuelve invisible)
    Animated.timing(flipAnim, { toValue: 90, duration: 400, useNativeDriver: false }).start(() => {
      // 2. Cambiamos el estado mientras está invisible
      setAuthState(nextState);
      // 3. Regresamos el giro a 0°
      Animated.timing(flipAnim, { toValue: 0, duration: 400, useNativeDriver: false }).start();
    });
  };

  const renderContent = () => {
    if (authState === 'register') return (
      <>
        <Text style={styles.title}>Registrarse</Text>
        <InputField placeholder="Correo Electrónico" />
        <InputField placeholder="Contraseña" secureTextEntry />
        <InputField placeholder="Confirmar Contraseña" secureTextEntry />
        <ActionButton title="Crear Cuenta" primary onPress={() => {}} />
        <TouchableOpacity onPress={() => triggerFlip('login')} style={styles.switchBtn}><Text style={styles.switchText}>¿Ya tienes cuenta? Inicia Sesión</Text></TouchableOpacity>
      </>
    );
    if (authState === 'forgot') return (
      <>
        <Text style={styles.title}>Recuperar</Text>
        <View style={styles.noteBox}><Text style={styles.noteText}>Te enviaremos un correo de confirmación para restablecer tu cuenta.</Text></View>
        <InputField placeholder="Correo Electrónico" />
        <ActionButton title="Enviar" primary onPress={() => {}} />
        <TouchableOpacity onPress={() => triggerFlip('login')} style={styles.switchBtn}><Text style={styles.switchText}>Volver al Inicio</Text></TouchableOpacity>
      </>
    );
    return (
      <>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <InputField placeholder="Correo Electrónico" />
        <InputField placeholder="Contraseña" secureTextEntry />
        <ActionButton title="Entrar" primary onPress={() => {}} />
        <TouchableOpacity onPress={() => triggerFlip('forgot')}><Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>
        <Text style={styles.orText}>— o —</Text>
        <GoogleButton onPress={() => {}} />
        <TouchableOpacity onPress={() => triggerFlip('register')} style={styles.switchBtn}><Text style={styles.switchText}>¿No tienes cuenta? Regístrate</Text></TouchableOpacity>
      </>
    );
  };

  const goldSize = anim.interpolate({ inputRange: [0, 1], outputRange: [height * 1.5, 0] });
  const logoSize = anim.interpolate({ inputRange: [0, 1], outputRange: [70, 150] });
  const logoX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -width / 2 + 70] });
  const logoY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -height / 2 + 80] });
  const logoTint = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: ['#121212', '#D4AF37', '#D4AF37'] });
  const formOpacity = anim.interpolate({ inputRange: [0.6, 1], outputRange: [0, 1] });
  
  const spin = flipAnim.interpolate({ inputRange: [0, 90], outputRange: ['0deg', '90deg'] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Animated.View style={[styles.goldBackground, { width: goldSize, height: goldSize, borderRadius: height, transform: [{ translateX: logoX }, { translateY: logoY }] }]} />
      <Animated.View style={[styles.logoContainer, { transform: [{ translateX: logoX }, { translateY: logoY }] }]}>
        <Animated.Image source={require('./assets/icon.png')} style={{ width: logoSize, height: logoSize, tintColor: logoTint }} resizeMode="contain" />
      </Animated.View>
      
      <View style={styles.formContainer}>
        <Animated.View style={{ opacity: formOpacity, transform: [{ rotateY: spin }] }}>
          {renderContent()}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' },
  goldBackground: { position: 'absolute', backgroundColor: '#D4AF37' },
  logoContainer: { position: 'absolute', zIndex: 5 },
  formContainer: { width: '85%', marginTop: 120, zIndex: 10, minHeight: 480, justifyContent: 'center' },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '700', marginBottom: 25, textAlign: 'center' },
  orText: { color: '#555', textAlign: 'center', marginVertical: 12 },
  forgotText: { color: '#D4AF37', textAlign: 'center', marginTop: 10 },
  switchBtn: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#888' },
  noteBox: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 8, marginBottom: 15 },
  noteText: { color: '#AAA', textAlign: 'center' }
});