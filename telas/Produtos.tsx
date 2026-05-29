import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View, TextInput, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Dimensions, Modal, FlatList, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//Logo da marca
import Logo from '../componentes/Logo'

//Dados compartilhados dos vestidos e depoimentos
import { vestidos, destaques, avaliacoes } from '../dados/produtos'

//Tema central
import { cores, fontes, tamanhosFonte, espacos, raios, sombra } from '../tema'

const SCREEN = Dimensions.get('window');
const REVIEW_PAGE_W = SCREEN.width - espacos.base * 2;
const MODAL_W = Math.min(SCREEN.width - espacos.base * 2, 430);
const IDS_DESTAQUES = new Set(destaques.map((item) => item.id));

export default function Produtos() {

  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [indiceReview, setIndiceReview] = useState(0);
  const [vestidoSelecionado, setVestidoSelecionado] = useState<any>(null);
  const [indiceCarrossel, setIndiceCarrossel] = useState(0);
  const reviewsRef = useRef<ScrollView>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndiceReview((prev) => {
        const next = (prev + 1) % avaliacoes.length;
        reviewsRef.current?.scrollTo({ x: next * REVIEW_PAGE_W, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleScrollReviews = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / REVIEW_PAGE_W);
    const clamped = Math.min(Math.max(index, 0), avaliacoes.length - 1);
    setIndiceReview(clamped);
  };

  const abrirDetalhes = (vestido: any) => {
    setIndiceCarrossel(0);
    setVestidoSelecionado(vestido);
  };

  const fecharDetalhes = () => {
    setVestidoSelecionado(null);
    setIndiceCarrossel(0);
  };

  const handleScrollCarrossel = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const indice = Math.round(scrollX / MODAL_W);
    setIndiceCarrossel(indice);
  };

  // Filtra por tamanho E texto (nome ou estilo), excluindo destaques, limitado a 6
  const busca = termoBusca.trim().toLowerCase();
  const produtosExibir = vestidos
    .filter((vestido) => filtroSelecionado === 'Todos' || vestido.tamanho === filtroSelecionado)
    .filter((vestido) =>
      busca === '' ||
      vestido.titulo.toLowerCase().includes(busca) ||
      vestido.estilo.toLowerCase().includes(busca)
    )
    .filter((vestido) => !IDS_DESTAQUES.has(vestido.id))
    .slice(0, 6);

  // Card de vestido
  const CardVestido = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => abrirDetalhes(item)}>
      <View style={styles.cardImageWrapper}>
        <Image source={item.imagem} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Tam. {item.tamanho}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardEstilo} numberOfLines={1}>{item.estilo}</Text>
        <Text style={styles.cardTitulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.cardPreco}>{item.preco}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Header com Logo */}
      <View style={styles.header}>
        <Logo />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Campo de busca */}
        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={18} color={cores.textoSuave} />
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar por nome ou estilo"
            placeholderTextColor={cores.textoSuave}
            value={termoBusca}
            onChangeText={setTermoBusca}
          />
          {termoBusca !== '' ? (
            <TouchableOpacity onPress={() => setTermoBusca('')}>
              <Ionicons name="close-circle" size={18} color={cores.textoSuave} />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Destaques</Text>
        <View style={styles.gradeDuasColunas}>
          {destaques.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.gradeItem}>
              <CardVestido item={item} />
            </View>
          ))}
        </View>

        {/* Depoimentos */}
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Depoimentos de Noivas</Text>
          <View style={styles.reviewsScrollWrap}>
            <ScrollView
              ref={reviewsRef}
              horizontal
              pagingEnabled
              decelerationRate="fast"
              scrollEventThrottle={16}
              onScroll={handleScrollReviews}
              showsHorizontalScrollIndicator={false}
            >
              {avaliacoes.map((item) => (
                <View key={item.id} style={styles.reviewPage}>
                  <View style={styles.reviewCard}>
                    <Text style={styles.reviewName}>{item.nome}</Text>
                    <View style={styles.starsContainer}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Text key={index} style={styles.star}>
                          {index < item.estrelas ? '★' : '☆'}
                        </Text>
                      ))}
                    </View>
                    <Text style={styles.reviewText}>{item.texto}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.dotsContainerReviews}>
            {avaliacoes.map((_, index) => (
              <View key={index} style={[styles.dot, index === indiceReview && styles.activeDot]} />
            ))}
          </View>
        </View>

        {/* Filtros de tamanho */}
        <View style={styles.filtrosSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtrosContainer}>
            {['Todos', 'P', 'M', 'G'].map((filtro) => (
              <TouchableOpacity
                key={filtro}
                style={[styles.filtroButton, filtroSelecionado === filtro && styles.filtroButtonActive]}
                onPress={() => setFiltroSelecionado(filtro)}
              >
                <Text style={[styles.filtroButtonText, filtroSelecionado === filtro && styles.filtroButtonTextActive]}>
                  {filtro === 'Todos' ? 'Todos' : `Tam. ${filtro}`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Produtos</Text>
        {produtosExibir.length > 0 ? (
          <View style={styles.gradeDuasColunas}>
            {produtosExibir.map((item) => (
              <View key={item.id} style={styles.gradeItem}>
                <CardVestido item={item} />
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.semResultado}>Nenhum vestido encontrado para a sua busca.</Text>
        )}
      </ScrollView>

      <Modal
        visible={vestidoSelecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={fecharDetalhes}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={fecharDetalhes} />

          {vestidoSelecionado ? (
            <View style={styles.modalCard}>
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalScrollContent}
              >
                <View style={styles.carrosselContainer}>
                  <FlatList
                    data={vestidoSelecionado.imagens}
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

                  <TouchableOpacity style={styles.botaoFechar} onPress={fecharDetalhes}>
                    <Ionicons name="close" size={24} color={cores.texto} />
                  </TouchableOpacity>

                  {vestidoSelecionado.imagens.length > 1 ? (
                    <Text style={styles.carrosselContador}>
                      {indiceCarrossel + 1} / {vestidoSelecionado.imagens.length}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.info}>
                  <Text style={styles.estilo}>{vestidoSelecionado.estilo}</Text>
                  <Text style={styles.titulo}>{vestidoSelecionado.titulo}</Text>
                  <Text style={styles.preco}>{vestidoSelecionado.preco}</Text>

                  <View style={styles.divider} />

                  <Text style={styles.descricao}>{vestidoSelecionado.descricao}</Text>

                  <Text style={styles.detalhe}>
                    Silhueta {vestidoSelecionado.estilo} em {vestidoSelecionado.cor}. Tamanho {vestidoSelecionado.tamanho} disponível
                    para prova e ajuste na loja, com orientação da equipe para o melhor caimento.
                  </Text>
                </View>
              </ScrollView>

              <View style={styles.rodape}>
                <TouchableOpacity style={styles.botaoWhatsApp} activeOpacity={0.85}>
                  <Ionicons name="logo-whatsapp" size={20} color={cores.branco} />
                  <Text style={styles.botaoWhatsAppTexto}>Entrar em Contato</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </Modal>

      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  // Header (branco com linha inferior, estilo top-nav)
  header: {
    backgroundColor: cores.branco,
    paddingBottom: espacos.md,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },

  scrollContent: {
    paddingHorizontal: espacos.base,
    paddingTop: espacos.base,
    paddingBottom: espacos.lg,
  },

  // Busca (pílula com borda fina)
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacos.sm,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.full,
    paddingHorizontal: espacos.base,
    paddingVertical: espacos.md,
    marginBottom: espacos.lg,
    ...sombra,
  },
  buscaInput: {
    flex: 1,
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.texto,
    padding: 0,
  },

  sectionTitle: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.titulo,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.md,
  },

  // Depoimentos
  reviewsSection: {
    paddingVertical: espacos.lg,
    marginBottom: espacos.lg,
  },
  reviewsTitle: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.titulo,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.base,
    textAlign: 'center',
  },
  reviewsScrollWrap: {
    width: REVIEW_PAGE_W,
    alignSelf: 'center',
  },
  reviewPage: {
    width: REVIEW_PAGE_W,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewCard: {
    width: 300,
    backgroundColor: cores.branco,
    borderRadius: raios.md,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacos.base,
    ...sombra,
  },
  reviewName: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: espacos.md,
  },
  star: {
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.estrela,
    marginRight: espacos.xs,
  },
  reviewText: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpo,
    color: cores.textoCorpo,
    lineHeight: 20,
  },
  dotsContainerReviews: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: espacos.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: raios.full,
    backgroundColor: cores.borda,
    marginHorizontal: espacos.xs,
  },
  activeDot: {
    backgroundColor: cores.primaria,
    width: 10,
    height: 10,
    borderRadius: raios.full,
  },

  // Filtros (chips)
  filtrosSection: {
    marginBottom: espacos.base,
  },
  filtrosContainer: {
    flexDirection: 'row',
    gap: espacos.sm,
    paddingVertical: espacos.xs,
  },
  filtroButton: {
    paddingHorizontal: espacos.base,
    paddingVertical: espacos.sm,
    borderRadius: raios.full,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
  },
  filtroButtonActive: {
    backgroundColor: cores.texto,
    borderColor: cores.texto,
  },
  filtroButtonText: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.pequeno,
    color: cores.texto,
    fontWeight: '500',
  },
  filtroButtonTextActive: {
    color: cores.branco,
  },

  // Grade
  gradeDuasColunas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  gradeItem: {
    flexBasis: '48%',
    maxWidth: '48%',
    marginBottom: espacos.base,
  },

  // Card de vestido
  card: {
    backgroundColor: cores.branco,
    borderRadius: raios.md,
    overflow: 'hidden',
    width: '100%',
  },
  cardImageWrapper: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: raios.md,
    backgroundColor: cores.fundoSuave,
  },
  badge: {
    position: 'absolute',
    top: espacos.sm,
    left: espacos.sm,
    paddingHorizontal: espacos.md,
    paddingVertical: espacos.xs,
    borderRadius: raios.full,
    backgroundColor: cores.branco,
    ...sombra,
  },
  badgeText: {
    color: cores.texto,
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.micro,
    fontWeight: '600',
  },
  cardContent: {
    paddingTop: espacos.sm,
  },
  cardEstilo: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.micro,
    color: cores.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: espacos.xxs,
  },
  cardTitulo: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.xs,
    minHeight: 40,
  },
  cardPreco: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpo,
    color: cores.texto,
  },

  semResultado: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.textoSuave,
    textAlign: 'center',
    paddingVertical: espacos.xl,
  },

  // Modal de detalhes
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: espacos.base,
  },
  modalCard: {
    width: MODAL_W,
    maxHeight: '88%',
    backgroundColor: cores.branco,
    borderRadius: raios.md,
    overflow: 'hidden',
    ...sombra,
  },
  modalBody: {
    flexShrink: 1,
  },
  modalScrollContent: {
    paddingBottom: espacos.base,
  },
  carrosselContainer: {
    position: 'relative',
  },
  imagemCarrossel: {
    width: MODAL_W,
    height: 300,
    backgroundColor: cores.fundoSuave,
  },
  botaoFechar: {
    position: 'absolute',
    top: espacos.sm,
    right: espacos.sm,
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
  info: {
    paddingHorizontal: espacos.base,
    paddingTop: espacos.base,
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
