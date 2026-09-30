export type CategoryId =
  | 'checkin-checkout'
  | 'wifi'
  | 'cafe-da-manha'
  | 'frigobar'
  | 'lareira'
  | 'arrumacao'
  | 'itens-esquecidos'
  | 'localizacao'
  | 'resumo-geral';

export interface MinibarItem {
  id: string;
  name: string;
  volume: string;
  price: number;
  priceFormatted: string;
  category: string;
}

export interface WifiNetwork {
  id: string;
  ssid: string;
  password: string;
  coverage: string;
  description: string;
}

export interface GuideCategory {
  id: CategoryId;
  number: string;
  title: string;
  subtitle: string;
  quickHighlight: string;
  keywords: string[];
}

export { default as HERO_IMAGE_PATH } from '../assets/images/hero_chalet_serra_1790791791957.jpg';
export { default as BREAKFAST_IMAGE_PATH } from '../assets/images/breakfast_colonial_serra_1790791802793.jpg';
export { default as FIREPLACE_IMAGE_PATH } from '../assets/images/fireplace_cozy_chalet_1790791814980.jpg';

export const HERO_SLIDES = [
  {
    src: `${import.meta.env.BASE_URL}WhatsApp Image 2026-09-04 at 15.57.36.jpeg`,
    alt: 'Jardim da estalagem com araucárias e vista para as montanhas',
    caption: 'Um refúgio na Serra da Mantiqueira',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp Image 2026-09-04 at 15.57.37 (1).jpeg`,
    alt: 'Chalés da estalagem cercados pela vegetação de Monte Verde',
    caption: 'Chalés em meio à natureza',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp Image 2026-09-04 at 15.57.37.jpeg`,
    alt: 'Interior do chalé com cama de casal, cama de solteiro e sofá',
    caption: 'Aconchego em cada detalhe',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp Image 2026-09-04 at 15.57.36 (1).jpeg`,
    alt: 'Banheira de hidromassagem junto à janela com vista para a mata',
    caption: 'Seu momento de tranquilidade',
  },
];

export const POUSADA_INFO = {
  name: 'Estalagem Mande Ville',
  brandTitle: 'Estalagem Mandeville',
  subtitle: 'Guia do Hóspede',
  location: 'Monte Verde · Serra da Mantiqueira, MG',
  welcomeTitle: 'Sejam muito bem-vindos à Estalagem Mandeville!',
  welcomeText:
    'Preparamos algumas informações importantes para tornar sua estadia ainda mais confortável em nossos chalés na serra.',
  closingText: 'Desejamos uma excelente estadia!',
  checkInTime: '15h00',
  checkOutTime: '12h00',
  breakfastTime: '08h30 às 10h30',
  housekeepingLimit: 'Até às 13h30',
  firewoodPrice: 'R$ 30,00',
  whatsappPhone: '5535991660221', // Recepção: (35) 99166-0221
};

export const LAT = -22.8683593;
export const LNG = -46.0310388;

export const LOCATION_INFO = {
  region: 'Monte Verde · Camanducaia, MG',
  coordinates: `${LAT}, ${LNG}`,
  googleMapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
  wazeUrl: `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
  embedUrl: `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`,
};

export const WIFI_NETWORKS: WifiNetwork[] = [
  {
    id: 'mandeville-main',
    ssid: 'Estalagemmandeville',
    password: 'Ville123',
    coverage: 'Rede Principal · Chalés e Salão',
    description: 'Conexão estável em toda a área da pousada e chalés.',
  },
  {
    id: 'mandeville-starlink',
    ssid: 'Starlink',
    password: 'a1314b**',
    coverage: 'Internet via Satélite · Alta Velocidade',
    description: 'Opção adicional de alta velocidade para trabalho remoto e streaming.',
  },
];

export const MINIBAR_ITEMS: MinibarItem[] = [
  {
    id: 'agua-mineral',
    name: 'Água Mineral',
    volume: '510ml',
    price: 5.0,
    priceFormatted: 'R$ 5,00',
    category: 'Hidratação',
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola Lata',
    volume: '350ml',
    price: 8.0,
    priceFormatted: 'R$ 8,00',
    category: 'Refrigerante',
  },
  {
    id: 'guarana-antarctica',
    name: 'Guaraná Antarctica',
    volume: 'Lata 350ml',
    price: 8.0,
    priceFormatted: 'R$ 8,00',
    category: 'Refrigerante',
  },
  {
    id: 'heineken',
    name: 'Heineken',
    volume: 'Long Neck / Lata',
    price: 15.0,
    priceFormatted: 'R$ 15,00',
    category: 'Cerveja Premium',
  },
];

export const CHECKOUT_CHECKLIST = [
  {
    id: 'chargers',
    label: 'Carregadores de celular, notebook e cabos conectados às tomadas',
    area: 'Cabeceira e mesas',
  },
  {
    id: 'wardrobe',
    label: 'Casacos, roupas e calçados em armários, gavetas e cabides',
    area: 'Quarto e closet',
  },
  {
    id: 'bathroom',
    label: 'Nécessaire, óculos, joias e itens de higiene pessoal',
    area: 'Banheiro e bancada',
  },
  {
    id: 'bedding',
    label: 'Celular, livros ou documentos entre os travesseiros e cobertores',
    area: 'Cama e poltronas',
  },
  {
    id: 'keys',
    label: 'Devolução da chave do chalé e acerto de consumo do frigobar/lenha',
    area: 'Recepção',
  },
];

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'checkin-checkout',
    number: '01',
    title: 'Check-in & Check-out',
    subtitle: 'Horários de entrada, saída e recepção',
    quickHighlight: 'Entrada 15h00 · Saída até 12h00',
    keywords: ['check-in', 'checkout', 'check-out', 'horario', 'horários', 'entrada', 'saida', 'saída', '15h', '12h', 'recepção'],
  },
  {
    id: 'wifi',
    number: '02',
    title: 'Wi-Fi & Conexão',
    subtitle: 'Redes disponíveis e cópia rápida de senhas',
    quickHighlight: 'Estalagemmandeville · Starlink',
    keywords: ['wifi', 'wi-fi', 'internet', 'senha', 'rede', 'starlink', 'ville123', 'conexao'],
  },
  {
    id: 'cafe-da-manha',
    number: '03',
    title: 'Café da Manhã',
    subtitle: 'Horário de atendimento e local do salão',
    quickHighlight: 'Das 08h30 às 10h30 · Salão de Café',
    keywords: ['cafe', 'café', 'manha', 'manhã', 'salao', 'salão', 'refeicao', '08h30', '10h30', 'pao', 'queijo'],
  },
  {
    id: 'frigobar',
    number: '04',
    title: 'Frigobar',
    subtitle: 'Tabela de preços das bebidas no chalé',
    quickHighlight: 'Água, Refrigerantes e Heineken',
    keywords: ['frigobar', 'bebidas', 'agua', 'água', 'coca', 'guarana', 'guaraná', 'heineken', 'cerveja', 'precos', 'preços', 'valores'],
  },
  {
    id: 'lareira',
    number: '05',
    title: 'Lenha para Lareira',
    subtitle: 'Solicitação de lenha extra e dicas de uso',
    quickHighlight: 'Lenha para lareira · R$ 30,00',
    keywords: ['lenha', 'lareira', 'fogo', 'aquecimento', 'frio', '30', 'chalé'],
  },
  {
    id: 'arrumacao',
    number: '06',
    title: 'Arrumação do Chalé',
    subtitle: 'Como solicitar a limpeza diária do seu chalé',
    quickHighlight: 'Chave na recepção até às 13h30',
    keywords: ['arrumacao', 'arrumação', 'limpeza', 'camareira', 'chave', 'toalha', '13h30', 'recepcao'],
  },
  {
    id: 'itens-esquecidos',
    number: '07',
    title: 'Itens Esquecidos',
    subtitle: 'Aviso importante sobre pertences e Correios',
    quickHighlight: 'Monte Verde não possui Correios · Confira sua mala',
    keywords: ['itens', 'esquecidos', 'pertences', 'mala', 'correios', 'bagagem', 'achados', 'perdidos', 'lupa'],
  },
  {
    id: 'localizacao',
    number: '08',
    title: 'Localização',
    subtitle: 'Mapa e rotas até a estalagem pelo Waze ou Google Maps',
    quickHighlight: 'Monte Verde · Camanducaia, MG',
    keywords: ['localizacao', 'localização', 'endereco', 'endereço', 'mapa', 'rota', 'waze', 'google maps', 'como chegar', 'gps'],
  },
  {
    id: 'resumo-geral',
    number: '09',
    title: 'Comunicado Completo',
    subtitle: 'Todas as informações importantes em uma única página',
    quickHighlight: 'Leitura rápida de todas as regras',
    keywords: ['resumo', 'completo', 'tudo', 'geral', 'informacoes', 'informações', 'comunicado'],
  },
];
