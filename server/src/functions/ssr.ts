import { app } from '@azure/functions';
import { createRequestHandler } from '@scandinavianairlines/remix-azure-functions';

const build = require('../../../build/server/index.js');

app.setup({ enableHttpStream: true });

app.http('ssr', {
    methods: [
        'GET',
        'POST',
        'DELETE',
        'HEAD',
        'PATCH',
        'PUT',
        'OPTIONS',
        'TRACE',
        'CONNECT'
    ],
    authLevel: 'anonymous',
    handler: createRequestHandler({
        build,
    }),
    route: '{*path}',
});
