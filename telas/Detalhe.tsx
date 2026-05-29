import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//Tema central
import { cores, fontes, tamanhosFonte, espacos, raios, sombra } from '../tema'

const LARGURA_IMG = Dimensions.get('window').width;

export default function Detalhe({ route, navigation }: any) {

  const { vestido } = route.params;
  const [indiceCarrossel, setIndiceCarrossel] = useState(0);

  const handleScrollCarrossel = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const indice = Math.round(scrollX / LARGURA_IMG);
    setIndiceCarrossel(indice);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Carrossel de imagens */}
        <View style={styles.carrosselContainer}>
          <FlatList
            data={vestido.imagens}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={item} style={styles.imagemCarrossel} resizeMode="cover" />
            )}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={handleScrollCarrossel}
            showsHorizontalScrollIndicator={false}
          />

          {/* Botão voltar circular sobre a foto */}
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={cores.texto} />
          </TouchableOpacity>

          {vestido.imagens.length > 1 ? (
            <Text style={styles.carrosselContador}>
              {indiceCarrossel + 1} / {vestido.imagens.length}
            </Text>
          ) : null}
        </View>

        {/* Informações do vestido */}
        <View style={styles.info}>
          <Text style={styles.estilo}>{vestido.estilo}</Text>
          <Text style={styles.titulo}>{vestido.titulo}</Text>
          <Text style={styles.preco}>{vestido.preco}</Text>

          <View style={styles.divider} />

          <Text style={styles.descricao}>{vestido.descricao}</Text>

          <Text style={styles.detalhe}>
            Silhueta {vestido.estilo} em {vestido.cor}. Tamanho {vestido.tamanho} disponível
            para prova e ajuste na loja, com orientação da equipe para o melhor caimento.
          </Text>
        </View>
      </ScrollView>

      {/* Botão de contato fixo no rodapé */}
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botaoWhatsApp} activeOpacity={0.85}>
          <Ionicons name="logo-whatsapp" size={20} color={cores.branco} />
          <Text style={styles.botaoWhatsAppTexto}>Entrar em Contato</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },
  scrollContent: {
    paddingBottom: espacos.lg,
  },

  // Carrossel
  carrosselContainer: {
    position: 'relative',
  },
  imagemCarrossel: {
    width: LARGURA_IMG,
    height: 440,
    backgroundColor: cores.fundoSuave,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 44,
    left: espacos.base,
    width: 40,
    height: 40,
    borderRadius: raios.full,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
    ...sombra,
  },
  carrosselContador: {
    position: 'absolute',
    bottom: espacos.md,
    right: espacos.base,
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.pequeno,
    color: cores.branco,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: espacos.sm,
    paddingVertical: espacos.xs,
    borderRadius: raios.full,
    overflow: 'hidden',
  },

  // Informações
  info: {
    paddingHorizontal: espacos.base,
    paddingTop: espacos.lg,
  },
  estilo: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.micro,
    color: cores.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: espacos.xs,
  },
  titulo: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.tituloGrande,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.sm,
  },
  preco: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.titulo,
    fontWeight: '600',
    color: cores.texto,
  },
  divider: {
    height: 1,
    backgroundColor: cores.borda,
    marginVertical: espacos.base,
  },
  descricao: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.textoCorpo,
    lineHeight: 24,
    marginBottom: espacos.md,
  },
  detalhe: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpo,
    color: cores.textoSuave,
    lineHeight: 22,
  },

  // Rodapé com CTA
  rodape: {
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingHorizontal: espacos.base,
    paddingTop: espacos.md,
    paddingBottom: espacos.lg,
    backgroundColor: cores.branco,
  },
  botaoWhatsApp: {
    backgroundColor: cores.whatsapp,
    paddingVertical: 14,
    borderRadius: raios.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espacos.sm,
  },
  botaoWhatsAppTexto: {
    color: cores.branco,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
    fontFamily: fontes.padrao,
  },
});
