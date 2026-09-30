# Guia do Hóspede — Estalagem Mande Ville

Guia em React, TypeScript e Vite, com fotos da pousada em um carrossel na tela inicial.

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

As fotos do carrossel estão em `public/`, e sua ordem, descrições e legendas são configuradas em `HERO_SLIDES`, no arquivo `src/data/guideData.ts`.

O carrossel troca de foto a cada seis segundos e permite navegar por setas, indicadores, teclado ou deslizando no celular. A troca automática pausa durante a interação e respeita a preferência por movimento reduzido.
# guia-digital-estalagem-mande-ville
