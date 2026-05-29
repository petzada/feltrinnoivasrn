import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

//Componente de Texto
import Texto from '../componentes/Texto'

//Logo da marca
import Logo from '../componentes/Logo'

//Tema central
import { cores, fontes, tamanhosFonte, espacos, raios, sombra } from '../tema'

export default function Perfil() {

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [nome, setNome] = useState('Marina Oliveira');
  const [email, setEmail] = useState('marina.oliveira@email.com');
  const [telefone, setTelefone] = useState('(11) 98765-4321');

  const [modoEdicao, setModoEdicao] = useState(false);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Texto estiloEspecifico={styles.permissionText}>
            Precisamos de acesso à câmera para continuar
          </Texto>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Permitir Câmera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header com Logo */}
      <View style={styles.header}>
        <Logo />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* Cabeçalho de conta: avatar + nome/email */}
        <View style={styles.accountHeader}>
          <View style={styles.avatarContainer}>
            <CameraView style={styles.avatar} facing={facing} />
            <TouchableOpacity
              style={styles.botaoRotacao}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="reload" size={18} color={cores.branco} />
            </TouchableOpacity>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountNome} numberOfLines={1}>{nome}</Text>
            <Text style={styles.accountEmail} numberOfLines={1}>{email}</Text>
          </View>
        </View>

        {/* Meus dados */}
        <Text style={styles.secaoTitulo}>Meus dados</Text>
        <Card style={styles.card}>
          <Card.Content>

            {/* Campo Nome */}
            <View style={styles.fieldGroup}>
              <Texto estiloEspecifico={styles.label}>Nome completo</Texto>
              <TextInput
                style={[styles.input, modoEdicao && styles.inputEditavel]}
                placeholder="Seu nome"
                placeholderTextColor={cores.textoSuave}
                value={nome}
                onChangeText={setNome}
                keyboardType="default"
                editable={modoEdicao}
              />
            </View>

            {/* Campo Email */}
            <View style={styles.fieldGroup}>
              <Texto estiloEspecifico={styles.label}>E-Mail</Texto>
              <TextInput
                style={[styles.input, modoEdicao && styles.inputEditavel]}
                placeholder="seu@email.com"
                placeholderTextColor={cores.textoSuave}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={modoEdicao}
              />
            </View>

            {/* Campo Telefone */}
            <View style={styles.fieldGroup}>
              <Texto estiloEspecifico={styles.label}>Telefone</Texto>
              <TextInput
                style={[styles.input, modoEdicao && styles.inputEditavel]}
                placeholder="(11) 99999-9999"
                placeholderTextColor={cores.textoSuave}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                editable={modoEdicao}
              />
            </View>

            {/* Botões de Ação */}
            <View style={styles.botoesSection}>
              {!modoEdicao ? (
                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => setModoEdicao(true)}
                >
                  <Ionicons name="pencil" size={18} color={cores.branco} />
                  <Text style={styles.botaoEditarTexto}>Editar dados</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.botoesDuplados}>
                  <TouchableOpacity
                    style={[styles.botaoAcao, styles.botaoCancelar]}
                    onPress={() => setModoEdicao(false)}
                  >
                    <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.botaoAcao, styles.botaoSalvar]}
                    onPress={() => {
                      setModoEdicao(false);
                      alert('Perfil atualizado com sucesso!');
                    }}
                  >
                    <Ionicons name="checkmark" size={18} color={cores.branco} />
                    <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </Card.Content>
        </Card>

      </ScrollView>

      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },

  // Header
  header: {
    backgroundColor: cores.branco,
    paddingBottom: espacos.md,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: espacos.base,
    paddingVertical: espacos.lg,
    paddingBottom: espacos.xl,
  },

  // Cabeçalho de conta
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacos.base,
    marginBottom: espacos.lg,
  },
  avatarContainer: {
    position: 'relative',
    width: 110,
    height: 110,
  },
  avatar: {
    flex: 1,
    borderRadius: raios.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botaoRotacao: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: cores.texto,
    width: 34,
    height: 34,
    borderRadius: raios.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cores.branco,
  },
  accountInfo: {
    flex: 1,
  },
  accountNome: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '600',
    color: cores.texto,
  },
  accountEmail: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.pequeno,
    color: cores.textoSuave,
    marginTop: espacos.xxs,
  },

  // Títulos de seção
  secaoTitulo: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.pequeno,
    fontWeight: '600',
    color: cores.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: espacos.md,
  },

  // Card de dados
  card: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: espacos.lg,
    ...sombra,
  },
  fieldGroup: {
    marginBottom: espacos.base,
  },
  label: {
    fontFamily: fontes.padrao,
    fontSize: tamanhosFonte.pequeno,
    fontWeight: '600',
    color: cores.textoSuave,
    marginBottom: espacos.xs,
    textAlign: 'left',
    lineHeight: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.sm,
    paddingHorizontal: espacos.md,
    paddingVertical: espacos.md,
    fontSize: tamanhosFonte.corpoGrande,
    color: cores.texto,
    fontFamily: fontes.padrao,
    backgroundColor: cores.fundoSuave,
  },
  inputEditavel: {
    borderColor: cores.texto,
    borderWidth: 2,
    backgroundColor: cores.branco,
  },

  // Permissão
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacos.lg,
  },
  permissionText: {
    fontSize: tamanhosFonte.corpoGrande,
    textAlign: 'center',
    marginBottom: espacos.lg,
    color: cores.texto,
  },
  permissionButton: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    paddingHorizontal: espacos.xl,
    borderRadius: raios.sm,
  },
  permissionButtonText: {
    color: cores.branco,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
    fontFamily: fontes.padrao,
  },

  // Botões de Ação
  botoesSection: {
    marginTop: espacos.sm,
  },
  botaoEditar: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    borderRadius: raios.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espacos.sm,
  },
  botaoEditarTexto: {
    color: cores.branco,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
    fontFamily: fontes.padrao,
  },
  botoesDuplados: {
    flexDirection: 'row',
    gap: espacos.md,
  },
  botaoAcao: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: raios.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espacos.sm,
  },
  botaoCancelar: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.texto,
  },
  botaoCancelarTexto: {
    color: cores.texto,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
    fontFamily: fontes.padrao,
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
  },
  botaoSalvarTexto: {
    color: cores.branco,
    fontSize: tamanhosFonte.corpoGrande,
    fontWeight: '500',
    fontFamily: fontes.padrao,
  },
});
