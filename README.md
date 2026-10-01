# Guia do Hóspede — Estalagem Mande Ville

Guia digital para hóspedes, feito em React, TypeScript e Vite e pensado primeiro para celular. Roda direto no navegador, sem instalação e sem nenhum serviço de IA.

## Executar localmente

Use Node.js 22.12+ (validado com Node.js 24).

```sh
npm install
npm run dev
```

Abra http://localhost:3000. O guia não precisa de chave de API para funcionar.

## Verificar e compilar

```sh
npm run lint
npm run build
npm run preview
```

## Onde alterar o conteúdo

Tudo fica em `src/data/guideData.ts`:

- `HERO_SLIDES`: fotos do carrossel (arquivos em `public/`), descrições e legendas. O carrossel troca de foto sozinho a cada cinco segundos.
- `POUSADA_INFO.whatsappPhone`: número do WhatsApp da recepção, no formato `55` + DDD + número.
- `LAT` / `LNG` e `LOCATION_INFO`: localização usada no mapa e nos botões do Waze e do Google Maps.
- `WIFI_NETWORKS`, `MINIBAR_ITEMS` e `GUIDE_CATEGORIES`: redes Wi-Fi, preços do frigobar e categorias do menu.

## Clima

O clima de Monte Verde vem da API gratuita do [Open-Meteo](https://open-meteo.com), que não exige chave. Ele se atualiza a cada 15 minutos. Sem internet, o guia mostra a última leitura por até uma hora e depois oculta o clima.

## Funcionamento offline

Um service worker guarda os arquivos do guia para que ele continue abrindo mesmo com a internet instável. O mapa e o clima precisam de conexão.
