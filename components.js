import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const COLORS = { accent: '#D4AF37', bg: '#121212', inputBg: '#1A1A1A', white: '#FFFFFF', textDark: '#000000', grey: '#888' };

export const ActionButton = ({ title, onPress, primary }) => (
  <TouchableOpacity style={[styles.button, primary ? styles.primary : styles.secondary]} onPress={onPress}>
    <Text style={[styles.text, primary ? styles.textPrimary : styles.textSecondary]}>{title}</Text>
  </TouchableOpacity>
);

export const GoogleButton = ({ onPress }) => (
  <TouchableOpacity style={styles.googleButton} onPress={onPress}>
    <AntDesign name="google" size={20} color="#000" style={styles.googleIcon} />
    <Text style={styles.googleText}>Continuar con Google</Text>
  </TouchableOpacity>
);

export const InputField = ({ placeholder, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#555"
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
  />
);

const styles = StyleSheet.create({
  button: { paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginVertical: 8, borderWidth: 1 },
  primary: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  secondary: { backgroundColor: 'transparent', borderColor: COLORS.accent },
  text: { fontSize: 15, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  textPrimary: { color: COLORS.bg },
  textSecondary: { color: COLORS.accent },
  googleButton: { flexDirection: 'row', backgroundColor: COLORS.white, paddingVertical: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 10, elevation: 3, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.2, shadowRadius: 3 },
  googleIcon: { marginRight: 12 },
  googleText: { color: COLORS.textDark, fontSize: 16, fontWeight: '600' },
  input: { width: '100%', height: 55, backgroundColor: COLORS.inputBg, color: COLORS.white, paddingHorizontal: 15, borderRadius: 8, marginVertical: 8, borderWidth: 1, borderColor: '#2A2A2A' }
});