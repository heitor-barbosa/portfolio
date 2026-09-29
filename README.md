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
- `src/App.tsx`: componentes e interações, incluindo o calendário de contribuições.
- `api/github-contributions.ts`: função serverless que consulta a API GraphQL do GitHub sem expor o token.
- `src/styles.css`: identidade visual, cores por tema, animações e breakpoints.
- `public/curriculo-heitor-barbosa.pdf`: cópia do PDF original para download. O arquivo continua em português, inclusive na interface em inglês, com essa informação no link.

Idioma e tema ficam salvos no `localStorage`. A primeira visita usa português e tema escuro. As fontes são hospedadas junto com o site, sem requisições ao Google Fonts. Animações respeitam `prefers-reduced-motion`; controles têm nomes acessíveis; o menu fecha com Escape; os projetos usam o elemento nativo `dialog`.

## Histórico do GitHub

O calendário consulta as contribuições públicas de [heitor-barbosa](https://github.com/heitor-barbosa/) por meio da função serverless `/api/github-contributions`. O token fica somente no servidor e nunca é incluído no JavaScript enviado ao navegador.

Para ativar a integração:

1. Crie um token no GitHub. Para exibir apenas atividade pública, não é necessário conceder acesso de escrita nem acesso a repositórios privados.
2. Na Vercel, abra **Settings → Environment Variables** e crie `GITHUB_TOKEN` para os ambientes Production e Preview.
3. Faça um novo deploy para a função receber a variável.

Para testar a função e o frontend juntos localmente, crie um arquivo `.env.local` com `GITHUB_TOKEN=...` e execute `npx vercel dev`. Os arquivos `.env*` locais são ignorados pelo Git; `.env.example` documenta apenas o nome da variável. Nunca use o prefixo `VITE_` para esse token.

Se o GitHub estiver indisponível, o CDN da Vercel pode reutilizar uma resposta válida anterior por até 24 horas. O navegador também guarda o último calendário válido por sete dias. Sem nenhum cache, o site mostra uma mensagem discreta, mantém o link direto para o perfil e oferece o botão **Tentar novamente**; o restante do portfólio continua funcionando.

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

Os testes verificam troca e persistência de idioma e tema, detalhes dos projetos, fechamento do menu, cópia de e-mail, destinos dos links e os estados de sucesso e falha da integração com o GitHub. Os testes em jsdom não substituem inspeção visual em navegador. `npm run format` formata o código com Prettier.

## Integração contínua

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) valida pull requests e pushes para `main` no GitHub Actions:

1. **Static analysis:** instala as dependências com `npm ci`, verifica os tipos com TypeScript e a formatação com Prettier.
2. **Dynamic tests:** executa os testes de componentes e interações com Vitest e Testing Library.
3. **Production build:** gera a aplicação com Vite e armazena a pasta `dist` como artefato do GitHub Actions por sete dias.

O build só começa se as análises e os testes forem aprovados. A pipeline usa `actions/checkout`, `actions/setup-node` e `actions/upload-artifact`.

O deploy não faz parte deste workflow. A integração Git da Vercel publica automaticamente previews de pull requests e a versão de produção quando a branch `main` é atualizada. Nenhum token ou secret da Vercel é necessário no GitHub Actions.

O download do currículo inclui os dados de contato presentes no PDF original.
