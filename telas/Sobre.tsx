import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

//Componente de Texto
import Texto from '../componentes/Texto'

//Logo da marca
import Logo from '../componentes/Logo'

//Tema central
import { cores, fontes, tamanhosFonte, espacos, raios } from '../tema'

export default function Sobre() {

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Logo />
      </View>

      {/* SOBRE NÓS */}
      <View style={styles.sobreSection}>
        <Text style={styles.sectionTitle}>Sobre a Feltrin Noivas</Text>
        <View style={styles.divider}/>
        <Texto estiloEspecifico={styles.texto}>A Feltrin Noivas é uma loja especializada no aluguel de vestidos de noiva que nasceu com o objetivo de fazer cada noiva encontrar o vestido perfeito para o seu grande dia. Com uma equipe dedicada, a loja se destaca pelo cuidado, transparência e atendimento à cliente.
        {'\n'}{'\n'}
        Hoje atendemos noivas em várias cidades, estados e até em outras regiões!
        {'\n'}
        Todas saem realizadas com a experiência que oferecemos!!!!
        {'\n'}
        Todos os atendimentos são feitos com muito carinho, dedicação e profissionalismo, disponíveis por WhatsApp ou Instagram.
        {'\n'}{'\n'}
        Veja como funciona nosso processo: nossa equipe ajuda você a escolher, provar e reservar o vestido ideal, cuidando de cada detalhe até o dia do casamento.
        </Texto>
      </View>

      {/* VÍDEO */}
      <View style={styles.videoSection}>
        <Text style={styles.videoTitle}>Conheça Nossa Coleção</Text>
        <View style={styles.video}>
          <YoutubePlayer
            height={250}
            width={330}
            videoId="FiSyMZE28TI"
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Feltrin Noivas - Todos os direitos reservados</Text>
        <Text style={styles.footerSubText}>Conecte conosco pelo WhatsApp ou Instagram</Text>
      </View>

      <StatusBar style="dark" animated />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  header: {
    backgroundColor: cores.branco,
    paddingBottom: espacos.md,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },

  // Títulos de seção
  sectionTitle: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.titulo,
    fontWeight: '600',
    color: cores.texto,
  },
  divider: {
    height: 2,
    width: 48,
    backgroundColor: cores.primaria,
    marginTop: espacos.sm,
    marginBottom: espacos.base,
    borderRadius: 1,
  },

  // SOBRE NÓS
  sobreSection: {
    paddingHorizontal: espacos.base,
    paddingTop: espacos.lg,
    paddingBottom: espacos.sm,
  },
  texto: {
    color: cores.textoCorpo,
    lineHeight: 24,
    fontSize: tamanhosFonte.corpoGrande,
  },

  // VÍDEO
  videoSection: {
    paddingHorizontal: espacos.base,
    paddingVertical: espacos.lg,
    backgroundColor: cores.fundoSuave,
    marginTop: espacos.lg,
  },
  videoTitle: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.titulo,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: espacos.base,
    textAlign: 'center',
  },
  video: {
    width: 330,
    height: 250,
    alignSelf: "center",
    backgroundColor: cores.fundoForte,
    borderRadius: raios.md,
    overflow: 'hidden',
  },

  // Footer
  footer: {
    backgroundColor: cores.branco,
    paddingVertical: espacos.lg,
    paddingHorizontal: espacos.base,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    marginTop: espacos.lg,
  },
  footerText: {
    color: cores.texto,
    fontSize: tamanhosFonte.corpo,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: fontes.padrao,
    marginBottom: espacos.sm,
  },
  footerSubText: {
    color: cores.textoSuave,
    fontSize: tamanhosFonte.pequeno,
    textAlign: 'center',
    fontFamily: fontes.padrao,
  },
});
