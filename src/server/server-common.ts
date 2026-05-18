import { COOKIE_KEY_SERVER } from "./server-config";

export const idTokenServer = COOKIE_KEY_SERVER;
export const newIdTokenServer = `user_${idTokenServer}`;
export const USER = "user";
export const AUTH_TOKEN = "token";
export const AUTH_REFRESH_TOKEN = "refresh-token";

export const COOKIE_STRING =
    "algorisys-ops|algorisys-ops/b358f5b1-0688-4585-a13d-07ecf5770dc7|00de8ea9-d21d-4a09-920c-529274264978";

export const USER_ENCODED = {
    account_id: "algorisys-ops/903c6706-bcdd-462c-9cf5-59583c41c546",
    email: "kshitij.ukey@algorisys.com",
    name: "Kshitij Ukey",
    ooo_access: false,
    realm_id: "algorisys-ops",
    roles: ["algorisys360_rc_client_user"],
    session_id: "e4a869dd-a707-444b-82af-fff4c48767e0",
};
/**
 * ? Path defines that cookies works for all the subdirectories.
 * ? Domain- Makes cookies specific for that particular domain only.
 * ? expires- 0 means expires on tab close
 *
 */
export const cookiePermissions = `Path=/; expires=0;`;

export const VALIDATE_ROUTES = ["/"];
