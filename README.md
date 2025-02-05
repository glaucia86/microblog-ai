# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Local Setup

To run this application locally, follow these steps:

1. Fork the repository:
   - Visit [glaucia86/microblog-ai](https://github.com/glaucia86/microblog-ai)
   - Click on the "Fork" button

2. Clone your forked repository and install dependencies:
   
```bash
git clone <your-forked-repo-url>
cd microblog-ai
npm install
```

1. Create a `.env` file in the root directory with the following content:
```env
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_ENDPOINT=<your-endpoint>
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
AZURE_OPENAI_API_VERSION=2024-08-01-preview
```

1. Create a `local.settings.json` file in the server folder:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AZURE_OPENAI_API_KEY": "<your-api-key>",
    "AZURE_OPENAI_ENDPOINT": "<your-endpoint>",
    "AZURE_OPENAI_DEPLOYMENT_NAME": "gpt-4o",
    "AZURE_OPENAI_API_VERSION": "2024-08-01-preview"
  },
  "Host": {
    "LocaHttpPort": 7071,
    "CORS": "*",
    "CORSCredential": true
  }
}
```

1. Start the development server:
```bash
npm run dev
```

> **Important**: This application requires an Azure subscription with access to Azure OpenAI Service. Make sure you have:
> - An active Azure subscription
> - Access to Azure OpenAI Service
> - A deployed GPT-4 model named 'gpt-4o'
> - Valid API credentials (endpoint and key)

## Installing NVM

### Windows:
1. Download the NVM for Windows installer from: https://github.com/coreybutler/nvm-windows/releases
2. Run the downloaded `nvm-setup.exe`
3. Open a new terminal and verify installation:
   
```bash
nvm --version
```

