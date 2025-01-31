// server/types.d.ts

// Declaração de tipos para o adaptador Scandinavian Airlines
declare module '@scandinavianairlines/remix-azure-functions' {
  import type { HttpRequest, InvocationContext } from '@azure/functions';

  export interface RequestHandlerOptions {
    build: any;
    urlParser?: (request: HttpRequest) => URL;
  }

  export function createRequestHandler(options: RequestHandlerOptions):
    (request: HttpRequest, context: InvocationContext) => Promise<any>;
}

// Declaração de tipos para o build do Remix
declare module '../build/server/index.js' {
  const build: any;
  export = build;
}