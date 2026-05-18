import fastifyStatic from "@fastify/static";
import fastifyCookie from "@fastify/cookie";
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";

import path from "path";
import {
    COOKIE_STRING,
    USER_ENCODED,
    idTokenServer,
    newIdTokenServer,
} from "./server/server-common";
import { ENV_SERVER, HOST_SERVER, PORT_SERVER } from "./server/server-config";
import { get, isArray, isEmpty } from "lodash";

// TODO Add instrumnetation to this server.
const port = PORT_SERVER ?? 8080;
const fastify = Fastify({
    logger: false,
});
// Middleware to parse cookies
fastify.register(fastifyCookie);
const distPath = path.resolve(__dirname, "..", "dist");

fastify.register(fastifyStatic, {
  root: distPath,
  prefix: "/",
});

fastify.get("/health", async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({ status: "running" });
});

fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies[idTokenServer] ?? COOKIE_STRING;
    let userToken;
    let decodedUserDetails: unknown;
    if (ENV_SERVER !== "DEVELOPMENT") {
        userToken = get(request.headers, "id-token", "");
        if (isArray(userToken)) {
            userToken = userToken[0];
        }
        if (userToken && !isEmpty(userToken)) {
            decodedUserDetails = JSON.parse(atob(userToken));
        }
    } else {
        userToken = USER_ENCODED;
        decodedUserDetails = userToken;
    }

    if (!isEmpty(decodedUserDetails)) {
        reply.setCookie(newIdTokenServer, token, { path: "/" });
    }
    return reply.sendFile("index.html");
});

fastify.setNotFoundHandler(async (request, reply) => {
    if (request.raw.url?.startsWith("/assets/")) {
    reply.code(404).send();
    return;
  }
  return reply.sendFile("index.html");
});

async function main(): Promise<void> {
    try {
        fastify.listen({ port, host: HOST_SERVER }, async (err, address) => {
            if (err) {
                console.error(String(err));
            }
            console.log(`Server listening at ${address}`);
        });
    } catch (err) {
        console.log("Failed to initialize Fastify server ...");
        console.log(err);
    }
}

// Run the application
void main();
