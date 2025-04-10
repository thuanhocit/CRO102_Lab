import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLazyGetPokemonByNameQuery } from '../redux/pokemonApi';

export default function PokemonScreen() {
  const [pokemonName, setPokemonName] = useState('');
  const [trigger, { data, error, isLoading }] = useLazyGetPokemonByNameQuery();

  const handleSearch = () => {
    if (pokemonName.trim()) {
      trigger(pokemonName.toLowerCase().trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông tin Pokémon {pokemonName}</Text>
      <TextInput
        placeholder="Nhập tên Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="Tìm kiếm Pokémon" color="orange" onPress={handleSearch} />
      </View>

      {isLoading && <Text style={styles.resultText}>Đang tải...</Text>}
      {error && <Text style={styles.resultText}>Không tìm thấy Pokémon.</Text>}
      {data && (
        <Text style={styles.resultText}>
          {JSON.stringify(data.abilities, null, 2)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
});