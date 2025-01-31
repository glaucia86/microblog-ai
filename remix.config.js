/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  server: '@scandinavianairlines/remix-azure-functions',
  // Atualizamos o caminho para corresponder à estrutura do projeto
  serverBuildPath: 'build/server/index.js', // Note que removemos o ./
  serverModuleFormat: 'cjs',
  future: {
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
