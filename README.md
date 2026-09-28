# Heitor Barbosa — Portfólio

Portfólio pessoal em React, TypeScript e Vite, com conteúdo baseado no currículo fornecido. Interface responsiva em português brasileiro e inglês, temas claro e escuro, estudos de projetos em modal, download do currículo e contato.

## Executar

Requer Node.js 22.12+ (validado com Node 24).

```bash
npm install
npm run dev
```

O terminal informa o endereço local. Para gerar a versão estática de produção:

```bash
npm run build
npm run preview
```

O resultado está em `dist/`. A configuração de caminhos relativos permite servir a aplicação em um subdiretório, como um projeto do GitHub Pages.

## Personalização

- `src/content.ts`: textos dos dois idiomas, projetos, trajetória, contatos e links.
- `src/App.tsx`: componentes e interações. `GitHubActivity` contém o espaço reservado às contribuições.
- `src/styles.css`: identidade visual, cores por tema, animações e breakpoints.
- `public/curriculo-heitor-barbosa.pdf`: cópia do PDF original para download. O arquivo continua em português, inclusive na interface em inglês, com essa informação no link.

Idioma e tema ficam salvos no `localStorage`. A primeira visita usa português e tema escuro. As fontes são hospedadas junto com o site, sem requisições ao Google Fonts. Animações respeitam `prefers-reduced-motion`; controles têm nomes acessíveis; o menu fecha com Escape; os projetos usam o elemento nativo `dialog`.

## Histórico do GitHub

O espaço reservado está identificado como **integração em breve** e já aponta para [heitor-barbosa](https://github.com/heitor-barbosa/). As células neutras são decorativas: não representam commits e não há números de contribuições inventados. Nenhuma API é chamada no navegador.

Para ativar o histórico, substitua o conteúdo de `GitHubActivity` por dados verificados de contribuições. Se a integração exigir autenticação, consulte o GitHub em um backend ou em uma etapa de build e entregue apenas os dados públicos necessários ao frontend. Não coloque um token em variáveis `VITE_*`, pois elas são incluídas no código público.

## Conteúdo e referências visuais

Os números de 170 clientes, 90 clientes automatizados, 20 usuários e a redução de mais de 30 para cerca de 3 segundos vêm do currículo. Os três projetos descrevem atuação profissional e pesquisa, sem links de demonstração inventados. Os painéis ilustrados são composições conceituais feitas em CSS/SVG, não capturas dos sistemas das empresas.

Referências consultadas no Mobbin:

- [Framer — apresentação pessoal](https://mobbin.com/sites/sections/dfdebaf9-051b-4bf3-bf6e-999dc21ef1d2): apresentação do profissional e contraste visual.
- [Pentagram — portfólio](https://mobbin.com/sites/sections/21fcb0a7-5769-483c-aa47-9841911d884c): navegação enxuta e hierarquia dos trabalhos.
- [Studio Freight — sobre](https://mobbin.com/sites/sections/06c6b62d-fd69-4c7d-85d2-2893f5623e31): tipografia editorial e ilustração técnica.

## Verificação

```bash
npm test
npm run build
```

Os testes verificam troca e persistência de idioma e tema, detalhes dos projetos, fechamento do menu, cópia de e-mail e destinos dos links. Os testes em jsdom não substituem inspeção visual em navegador. `npm run format` formata o código com Prettier.

O site não foi publicado automaticamente. O download do currículo inclui os dados de contato presentes no PDF original.
