import { app } from "@azure/functions";
import { createRequestHandler } from "@scandinavianairlines/remix-azure-functions";

// @ts-ignore
import * as build from "../build/server/index.js";

app.http("ssr", {
  methods: [
    "GET", "POST", "DELETE",
    "HEAD", "PATCH", "PUT",
    "OPTIONS", "TRACE", "CONNECT"
  ],
  authLevel: "anonymous",
  handler: createRequestHandler({ build })
});
