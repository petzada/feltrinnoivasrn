// Dados dos vestidos e depoimentos

export const vestidos = [
  {
    id: '1',
    titulo: 'Vestido Sereia Clássico',
    tamanho: 'M',
    preco: 'R$ 450/diária',
    estilo: 'Sereia',
    cor: 'Off-white',
    imagem: require('../assets/images/ImagemVestido1.1.png'),
    descricao: 'Elegante vestido modelo sereia que valoriza as curvas com muito charme. Confeccionado em renda francesa com aplicações de pérolas no corpete, decote delicado e cauda média. Acabamento impecável e forro confortável para você se sentir livre durante toda a celebração. Peça higienizada e pronta para o seu grande dia.',
    imagens: [
      require('../assets/images/ImagemVestido1.2.png'),
      require('../assets/images/ImagemVestido1.3.png'),
      require('../assets/images/ImagemVestido1.4.png'),
    ]
  },
  {
    id: '2',
    titulo: 'Vestido Princesa Encanto',
    tamanho: 'G',
    preco: 'R$ 600/diária',
    estilo: 'Princesa',
    cor: 'Branco',
    imagem: require('../assets/images/ImagemVestido2.1.png'),
    descricao: 'Vestido modelo princesa com saia ampla e volumosa em camadas de tule, perfeito para um casamento dos sonhos. Corpete estruturado bordado à mão, alças finas e cauda longa que encanta na entrada. Romântico e atemporal, traz aquele toque de conto de fadas ao seu grande dia.',
    imagens: [
      require('../assets/images/ImagemVestido2.2.png'),
      require('../assets/images/ImagemVestido2.3.png'),
      require('../assets/images/ImagemVestido2.4.png'),
    ]
  },
  {
    id: '3',
    titulo: 'Vestido Tomara que Caia Leve',
    tamanho: 'P',
    preco: 'R$ 380/diária',
    estilo: 'Tomara que caia',
    cor: 'Marfim',
    imagem: require('../assets/images/ImagemVestido3.1.png'),
    descricao: 'Vestido tomara que caia clean e sofisticado, ideal para noivas que buscam leveza e conforto. Tecido fluido de excelente caimento, corpete ajustado e saia evasê discreta. Modelo versátil que combina com cerimônias ao ar livre e festas mais intimistas. Caimento perfeito e fácil de movimentar.',
    imagens: [
      require('../assets/images/ImagemVestido3.2.png'),
      require('../assets/images/ImagemVestido3.3.png'),
      require('../assets/images/ImagemVestido3.4.png'),
    ]
  },
  {
    id: '4',
    titulo: 'Vestido Boho Renda',
    tamanho: 'M',
    preco: 'R$ 420/diária',
    estilo: 'Boho',
    cor: 'Nude',
    imagem: require('../assets/images/ImagemVestido4.1.png'),
    descricao: 'Vestido estilo boho confeccionado em renda delicada, com mangas longas e detalhes vazados nas costas. Caimento solto e despojado, perfeito para casamentos no campo, na praia ou ao entardecer. Romântico e cheio de personalidade, traz leveza e muito conforto para a noiva.',
    imagens: [
      require('../assets/images/ImagemVestido4.2.png'),
      require('../assets/images/ImagemVestido4.3.png'),
      require('../assets/images/ImagemVestido4.4.png'),
    ]
  },
  {
    id: '5',
    titulo: 'Vestido Império Minimalista',
    tamanho: 'P',
    preco: 'R$ 350/diária',
    estilo: 'Império',
    cor: 'Off-white',
    imagem: require('../assets/images/ImagemVestido3.1.png'),
    descricao: 'Vestido de corte império com cintura marcada logo abaixo do busto, alongando a silhueta com elegância. Tecido nobre de caimento fluido, design minimalista e sem excessos. Escolha certeira para a noiva moderna que valoriza o conforto e a sofisticação discreta.',
    imagens: [
      require('../assets/images/ImagemVestido3.2.png'),
      require('../assets/images/ImagemVestido3.3.png'),
      require('../assets/images/ImagemVestido3.4.png'),
    ]
  },
  {
    id: '6',
    titulo: 'Vestido Evasê Glamour',
    tamanho: 'G',
    preco: 'R$ 520/diária',
    estilo: 'Evasê',
    cor: 'Champagne',
    imagem: require('../assets/images/ImagemVestido4.1.png'),
    descricao: 'Vestido evasê em tom champagne com brilho sutil e acabamento glamouroso. Corpete bordado com pedrarias, saia fluida que afina na cintura e abre suavemente até o chão. Sofisticado e elegante, foi pensado para noivas que desejam brilhar do início ao fim da celebração.',
    imagens: [
      require('../assets/images/ImagemVestido4.2.png'),
      require('../assets/images/ImagemVestido4.3.png'),
      require('../assets/images/ImagemVestido4.4.png'),
    ]
  },
];

// Destaques
export const destaques = vestidos.slice(0, 4);

export const avaliacoes = [
  {
    id: '1',
    nome: 'Mariana Silva',
    estrelas: 5,
    texto: 'Aluguei meu vestido aqui e me senti uma princesa no grande dia!',
  },
  {
    id: '2',
    nome: 'Beatriz Santos',
    estrelas: 5,
    texto: 'Atendimento impecável e o vestido coube perfeitamente. Super recomendo!',
  },
  {
    id: '3',
    nome: 'Carla Oliveira',
    estrelas: 4,
    texto: 'Variedade linda de modelos, encontrei o vestido dos meus sonhos.',
  },
  {
    id: '4',
    nome: 'Ana Costa',
    estrelas: 5,
    texto: 'Equipe atenciosa do início ao fim. Indico para todas as noivas!',
  },
];
