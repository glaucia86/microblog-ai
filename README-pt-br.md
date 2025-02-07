# Microblog AI

Microblog AI é uma aplicação que demonstra o poder do Azure Static Web Apps combinado com Azure Functions e Server-Side Rendering (SSR) usando o Remix. A aplicação utiliza a inteligência artificial do GPT-4o da Azure OpenAI para permitir a criação de microblogs de maneira simples e intuitiva.

![Microblog AI Page](media/main-page.png)
![Microblog Generate Page](media/generate-page.png)
![Microblog Generated AI Post](media/generated-ai.png)

## Índice

- [Microblog AI](#microblog-ai)
  - [Índice](#índice)
  - [Descrição](#descrição)
    - [Por que SSR com Azure Static Web Apps?](#por-que-ssr-com-azure-static-web-apps)
    - [Execução do Projeto](#execução-do-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Instalação](#instalação)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Descrição

Microblog AI é uma aplicação web que permite aos usuários criar, editar e visualizar microblogs com a ajuda de um modelo de IA avançado. O principal objetivo desta aplicação é demonstrar como o Azure Static Web Apps, em conjunto com Azure Functions e Server-Side Rendering (SSR) usando o Remix, pode ser utilizado para criar aplicações web modernas, escaláveis e eficientes. Essa abordagem combina os benefícios do SSR, como tempos de carregamento mais rápidos e melhor SEO, com a escalabilidade e facilidade de gerenciamento de uma arquitetura serverless.

A aplicação é projetada para ser fácil de usar, com uma interface amigável que permite aos usuários focarem na escrita de conteúdo. Utilizando GPT-4o da Azure OpenAI, os usuários podem gerar ideias e conteúdos de forma inteligente e rápida. O Microblog AI é ideal para escritores, blogueiros e qualquer pessoa que queira compartilhar suas ideias de maneira eficiente.

### Por que SSR com Azure Static Web Apps?

- **Desempenho Melhorado**: O SSR permite que as páginas sejam renderizadas no servidor e enviadas ao cliente pré-renderizadas, resultando em tempos de carregamento mais rápidos e uma experiência de usuário mais fluida.
- **SEO Aprimorado**: Com SSR, os motores de busca podem indexar o HTML renderizado no servidor, melhorando a visibilidade do site nos resultados de busca.
- **Escalabilidade**: Azure Static Web Apps oferece uma solução escalável e gerenciada para hospedar aplicações web, com integração nativa com Azure Functions para lógica de backend.
- **Desenvolvimento Simplificado**: Com Azure Static Web Apps, é fácil configurar pipelines de CI/CD que automatizam o processo de build e deploy, permitindo uma iteração rápida e eficiente.

Para mais informações sobre a abordagem de Hybrid Apps em Azure Static Web Apps, consulte a [documentação oficial](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid).

### Execução do Projeto

Aqui está um exemplo do projeto Microblog AI sendo executado:

![Microblog AI Demo](media/aswa-remix.gif)

## Funcionalidades

- Criação e edição de microblogs.
- Visualização de microblogs.
- Integração com Azure OpenAI para geração de conteúdo inteligente.

## Tecnologias Utilizadas

- **[Remix](https://remix.run/)**: Utilizado para criar a aplicação web com uma abordagem de renderização no servidor e no cliente, proporcionando uma experiência de usuário mais rápida e eficiente.
- **[Tailwind CSS](https://tailwindcss.com/)**: Usado para estilização da aplicação de forma rápida e customizável, permitindo a criação de interfaces modernas e responsivas.
- **[TypeScript](https://www.typescriptlang.org/)**: Utilizado para adicionar tipagem estática ao JavaScript, ajudando a evitar erros comuns e melhorar a manutenção do código.
- **[Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)**: API da Azure utilizada para integrar o modelo GPT-4o, que é responsável pela geração de conteúdo inteligente para os microblogs.
- **[Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview)**: Serviço utilizado para hospedar a aplicação web de forma escalável e com baixo custo, integrado com pipelines de CI/CD.
- **[Azure Functions](https://learn.microsoft.com/azure/azure-functions/)**: Utilizado para criar funções serverless que lidam com a lógica de backend da aplicação, permitindo uma escalabilidade automática conforme a demanda.
- **[GitHub Copilot](https://github.com/features/copilot)**: Ferramenta de assistência de código que ajuda a acelerar o desenvolvimento, fornecendo sugestões de código com base no contexto.
- **[Remix Azure Functions Adapter](https://github.com/scandinavianairlines/remix-azure-functions)**: Adaptador utilizado para integrar o Remix com Azure Functions, facilitando a implementação do SSR.
- **[swa-cli](https://learn.microsoft.com/azure/static-web-apps/static-web-apps-cli-overview)**: Utilitário de linha de comando para desenvolvimento local e implantação de Azure Static Web Apps.

> **Observação**: Este projeto utiliza o modelo de programação Azure Functions v4, o que requer o uso de versões do Node.js até 20.x para garantir compatibilidade.

## Instalação

Para executar esta aplicação localmente, siga os passos abaixo:

1. **Fork o Repositório**:
   - Visite [glaucia86/microblog-ai](https://github.com/glaucia86/microblog-ai) e clique no botão "Fork" para criar uma cópia do projeto no seu GitHub.

2. **Clone o Repositório Forkado**:
   - Clone o repositório forkado para o seu ambiente local e navegue até o diretório do projeto:
  
```bash
git clone <url-do-seu-fork>
cd microblog-ai
```

3. **Instale as Dependências:**
   - Instale todas as dependências do projeto utilizando o npm:

```bash
npm install
```

4. **Configuração do Ambiente:**

   - Crie um arquivo .env no diretório raiz do projeto com as seguintes variáveis de ambiente:

```bash
AZURE_OPENAI_API_KEY=<your-azure-openai-key>
AZURE_OPENAI_ENDPOINT=<your-openai-endpoint>
AZURE_OPENAI_DEPLOYMENT_NAME=<your-openai-model>
AZURE_OPENAI_API_VERSION=<your-openai-api-version>
```

5. **Configuração do Azure Functions:**

  - Crie um arquivo local.settings.json na pasta server com o seguinte conteúdo:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*",
    "CORSCredential": true
  }
}
```

6. **Build do Projeto:**

   - Para compilar o projeto, execute:

```bash
npm run build
```

   - Ou para compilar tanto o root quanto o server (onde se encontra o Azure Functions), execute:

```bash
npm run build:all
```

7. **Rodando a Aplicação:**

   - Para iniciar o servidor de desenvolvimento localmente, execute:

```bash
npm run dev
```

8. **Simulação do Ambiente de Produção:**

   - Se quiser simular como se o arquivo estivesse hospedado no Azure com o Azure Static Web Apps, utilize o comando:

```bash
swa start
```

A aplicação estará disponível em `http://localhost:4280`.

> **Importante**: Esta aplicação requer uma assinatura do Azure com acesso ao Azure OpenAI Service. Certifique-se de ter:
> - Uma assinatura ativa do Azure
> - Acesso ao Azure OpenAI Service
> - Um modelo GPT-4 implantado chamado 'gpt-4o'
> - Credenciais de API válidas (endpoint e chave)

Para mais informações como implementar um modelo LLMs no Azure Foundry, consulte a [documentação oficial](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/deployments-overview).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Ao contribuir para este repositório, você concorda que suas contribuições serão licenciadas sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

