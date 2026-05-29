import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

//Logo da marca
import Logo from '../componentes/Logo'

//Tema central
import { cores, fontes, tamanhosFonte, espacos, raios } from '../tema'

export default function BoasVindas({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Marca */}
      <View style={styles.marca}>
        <Image
          source={require('../assets/icone.png')}
          style={styles.logoImagem}
          resizeMode="contain"
        />
        <Logo />
        <Text style={styles.tagline}>
          O vestido perfeito para o seu grande dia.
        </Text>
      </View>

      {/* Botão de entrada */}
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.85}
        onPress={() => navigation.replace('Menu')}
      >
        <Text style={styles.botaoTexto}>Entrar na loja</Text>
      </TouchableOpacity>

      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacos.xl,
  },
  marca: {
    alignItems: 'center',
    marginBottom: espacos.xl,
  },
  logoImagem: {
    width: 120,
    height: 120,
    marginBottom: espacos.base,
  },
  tagline: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.textoSuave,
    textAlign: 'center',
    marginTop: espacos.sm,
  },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    paddingHorizontal: espacos.xl,
    borderRadius: raios.sm,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  botaoTexto: {
    color: cores.branco,
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
  },
});
