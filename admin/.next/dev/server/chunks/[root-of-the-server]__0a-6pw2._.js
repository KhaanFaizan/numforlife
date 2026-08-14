module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/admin/app/api/auth/session/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$audit$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/audit-log.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/service.ts [app-route] (ecmascript)");
;
;
;
;
const runtime = "nodejs";
async function GET() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            authenticated: false
        }, {
            status: 401
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        authenticated: true,
        user: session
    });
}
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid JSON body"
        }, {
            status: 400
        });
    }
    const identifier = typeof body.identifier === "string" ? body.identifier.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!identifier || !password) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Email and password are required."
        }, {
            status: 400
        });
    }
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loginAdmin"])(request, {
            identifier,
            password
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$audit$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeAuditLog"])({
            session: user,
            action: "auth.login",
            module: "auth",
            target: user.email,
            request
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            user
        });
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message,
                code: error.code
            }, {
                status: error.status
            });
        }
        if (error instanceof Error && error.message.includes("SESSION_SECRET")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Server authentication is not configured."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unable to sign in."
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminSession"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logoutAdmin"])();
    if (session) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$audit$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeAuditLog"])({
            session,
            action: "auth.logout",
            module: "auth",
            target: session.email,
            request
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
}),
"[project]/packages/shared/lib/auth/admin-users.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureAdminUsersSeeded",
    ()=>ensureAdminUsersSeeded,
    "getAdminUserByKccId",
    ()=>getAdminUserByKccId,
    "requireActiveAdminUser",
    ()=>requireActiveAdminUser,
    "upsertAdminUserEmail",
    ()=>upsertAdminUserEmail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/cms/db.ts [app-route] (ecmascript)");
;
;
;
function mapRow(row) {
    return {
        id: row.id,
        kccUserId: row.kcc_user_id,
        email: row.email,
        role: row.role,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
function nowIso() {
    return new Date().toISOString();
}
function ensureAdminUsersSeeded() {
    const bootstrapKccUserId = process.env.ADMIN_BOOTSTRAP_KCC_USER_ID?.trim();
    if (!bootstrapKccUserId) return;
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const existing = database.prepare("SELECT id FROM admin_users WHERE kcc_user_id = ?").get(bootstrapKccUserId);
    if (existing) return;
    const createdAt = nowIso();
    const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim() || "admin@example.com";
    const role = process.env.ADMIN_BOOTSTRAP_ROLE?.trim() || "super_admin";
    database.prepare(`INSERT INTO admin_users
        (id, kcc_user_id, email, role, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'active', ?, ?)`).run((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(), bootstrapKccUserId, email, role, createdAt, createdAt);
}
function getAdminUserByKccId(kccUserId) {
    ensureAdminUsersSeeded();
    const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare(`SELECT id, kcc_user_id, email, role, status, created_at, updated_at
       FROM admin_users
       WHERE kcc_user_id = ?`).get(kccUserId);
    return row ? mapRow(row) : null;
}
function upsertAdminUserEmail(kccUserId, email) {
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const existing = getAdminUserByKccId(kccUserId);
    if (!existing) return;
    const updatedAt = nowIso();
    database.prepare("UPDATE admin_users SET email = ?, updated_at = ? WHERE kcc_user_id = ?").run(email, updatedAt, kccUserId);
}
function requireActiveAdminUser(kccUserId) {
    const admin = getAdminUserByKccId(kccUserId);
    if (!admin) {
        throw new Error("ADMIN_NOT_REGISTERED");
    }
    if (admin.status !== "active") {
        throw new Error("ADMIN_SUSPENDED");
    }
    return admin;
}
}),
"[project]/packages/shared/lib/auth/audit-log.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listRecentAuditLogs",
    ()=>listRecentAuditLogs,
    "writeAuditLog",
    ()=>writeAuditLog
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/cms/db.ts [app-route] (ecmascript)");
;
;
;
function serializeSnapshot(value) {
    if (value === undefined || value === null) return null;
    try {
        return JSON.stringify(value);
    } catch  {
        return JSON.stringify({
            error: "UNSERIALIZABLE"
        });
    }
}
function requestMeta(request) {
    if (!request) {
        return {
            ip: null,
            userAgent: null
        };
    }
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");
    return {
        ip: ip ?? null,
        userAgent: userAgent ?? null
    };
}
function writeAuditLog(input) {
    const { ip, userAgent } = requestMeta(input.request);
    const createdAt = new Date().toISOString();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare(`INSERT INTO audit_logs
        (id, admin_kcc_user_id, admin_email, admin_role, action, module, target,
         before_json, after_json, reason, ip, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(), input.session.kccUserId, input.session.email, input.session.role, input.action, input.module, input.target ?? null, serializeSnapshot(input.before), serializeSnapshot(input.after), input.reason ?? null, ip, userAgent, createdAt);
}
function listRecentAuditLogs(limit = 50) {
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare(`SELECT id, admin_email, admin_role, action, module, target, created_at
         FROM audit_logs
        ORDER BY created_at DESC
        LIMIT ?`).all(limit);
    return rows.map((row)=>({
            id: row.id,
            adminEmail: row.admin_email,
            adminRole: row.admin_role,
            action: row.action,
            module: row.module,
            target: row.target,
            createdAt: row.created_at
        }));
}
}),
"[project]/packages/shared/lib/auth/errors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthConfigError",
    ()=>AuthConfigError,
    "AuthError",
    ()=>AuthError
]);
class AuthError extends Error {
    code;
    status;
    constructor(code, message, status = 401){
        super(message);
        this.name = "AuthError";
        this.code = code;
        this.status = status;
    }
}
class AuthConfigError extends Error {
    constructor(message){
        super(message);
        this.name = "AuthConfigError";
    }
}
}),
"[project]/packages/shared/lib/auth/jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Decode a JWT payload without verifying the signature (timing/exp only). */ __turbopack_context__.s([
    "decodeJwtPayload",
    ()=>decodeJwtPayload,
    "jwtExpiresAtMs",
    ()=>jwtExpiresAtMs,
    "jwtTokenVersion",
    ()=>jwtTokenVersion
]);
function decodeJwtPayload(token) {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    try {
        const json = Buffer.from(parts[1], "base64url").toString("utf8");
        return JSON.parse(json);
    } catch  {
        return null;
    }
}
function jwtExpiresAtMs(accessToken) {
    const payload = decodeJwtPayload(accessToken);
    if (!payload?.exp) return null;
    return payload.exp * 1000;
}
function jwtTokenVersion(accessToken) {
    const payload = decodeJwtPayload(accessToken);
    return typeof payload?.token_version === "number" ? payload.token_version : null;
}
}),
"[project]/packages/shared/lib/auth/kcc-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KccAuthProvider",
    ()=>KccAuthProvider,
    "createAuthProvider",
    ()=>createAuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$pkce$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/pkce.ts [app-route] (ecmascript)");
;
;
;
const DEFAULT_BASE_URL = "https://auth.bigkpay.com";
function kccBaseUrl() {
    return process.env.KCC_ID_BASE_URL ?? DEFAULT_BASE_URL;
}
function kccClientId() {
    return process.env.KCC_CLIENT_ID ?? "shuyi";
}
async function readKccError(response) {
    try {
        const body = await response.json();
        return body.error_description ?? body.message ?? body.error ?? response.statusText;
    } catch  {
        return response.statusText;
    }
}
function mapTokenResponse(body) {
    if (body.requires_2fa) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("TWO_FACTOR_REQUIRED", "Two-factor authentication is required for this account.", 403);
    }
    const accessToken = body.access_token;
    const idToken = body.id_token;
    const refreshToken = body.refresh_token;
    const expiresIn = body.expires_in;
    const scope = body.scope;
    if (typeof accessToken !== "string" || typeof idToken !== "string" || typeof refreshToken !== "string" || typeof expiresIn !== "number") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("INVALID_TOKEN_RESPONSE", "Unexpected token response from KCC ID.", 502);
    }
    return {
        accessToken,
        idToken,
        refreshToken,
        expiresIn,
        scope: typeof scope === "string" ? scope : "openid profile email"
    };
}
class KccAuthProvider {
    async login(credentials) {
        const { verifier, challenge } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$pkce$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPkcePair"])();
        const clientId = kccClientId();
        const authorizeResponse = await fetch(`${kccBaseUrl()}/kccid/v1/authorize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
                client_id: clientId,
                scope: "openid profile email",
                code_challenge: challenge,
                code_challenge_method: "S256"
            })
        });
        if (authorizeResponse.status === 429) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("RATE_LIMITED", "Too many login attempts. Please wait a minute and try again.", 429);
        }
        if (!authorizeResponse.ok) {
            const message = await readKccError(authorizeResponse);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("INVALID_CREDENTIALS", message || "Invalid email or password.", authorizeResponse.status === 401 ? 401 : 502);
        }
        const authorizeBody = await authorizeResponse.json();
        if (!authorizeBody.code) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("INVALID_AUTHORIZE_RESPONSE", "Missing authorization code.", 502);
        }
        return this.exchangeAuthorizationCode(authorizeBody.code, verifier);
    }
    async refresh(refreshToken) {
        const response = await fetch(`${kccBaseUrl()}/kccid/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: kccClientId()
            })
        });
        if (response.status === 401) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("SESSION_EXPIRED", "Your session expired. Please sign in again.", 401);
        }
        if (!response.ok) {
            const message = await readKccError(response);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("REFRESH_FAILED", message || "Unable to refresh session.", 502);
        }
        return mapTokenResponse(await response.json());
    }
    async logout(refreshToken) {
        await fetch(`${kccBaseUrl()}/kccid/v1/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
                client_id: kccClientId()
            })
        }).catch(()=>{
        // Best-effort remote logout; local session is cleared regardless.
        });
    }
    async getUserInfo(accessToken) {
        const response = await fetch(`${kccBaseUrl()}/kccid/v1/userinfo`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status === 401) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("SESSION_EXPIRED", "Your session expired. Please sign in again.", 401);
        }
        if (!response.ok) {
            const message = await readKccError(response);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("USERINFO_FAILED", message || "Unable to load user profile.", 502);
        }
        const body = await response.json();
        if (typeof body.sub !== "string") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("USERINFO_FAILED", "Invalid user profile response.", 502);
        }
        return {
            sub: body.sub,
            email: typeof body.email === "string" ? body.email : undefined,
            emailVerified: typeof body.email_verified === "boolean" ? body.email_verified : undefined,
            name: typeof body.name === "string" ? body.name : undefined,
            preferredUsername: typeof body.preferred_username === "string" ? body.preferred_username : undefined,
            role: typeof body.role === "string" ? body.role : undefined,
            tokenType: typeof body.token_type === "string" ? body.token_type : undefined
        };
    }
    async exchangeAuthorizationCode(code, codeVerifier) {
        const response = await fetch(`${kccBaseUrl()}/kccid/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code,
                client_id: kccClientId(),
                code_verifier: codeVerifier
            })
        });
        if (!response.ok) {
            const message = await readKccError(response);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("TOKEN_EXCHANGE_FAILED", message || "Unable to complete sign in.", response.status === 401 ? 401 : 502);
        }
        return mapTokenResponse(await response.json());
    }
}
function createAuthProvider() {
    const provider = process.env.AUTH_PROVIDER ?? "kcc";
    if (provider === "kcc") {
        return new KccAuthProvider();
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("PROVIDER_UNSUPPORTED", `Auth provider "${provider}" is not configured.`, 500);
}
}),
"[project]/packages/shared/lib/auth/pkce.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPkcePair",
    ()=>createPkcePair
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
function base64UrlEncode(buffer) {
    return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function createPkcePair() {
    const verifier = base64UrlEncode((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(32));
    const challenge = base64UrlEncode((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(verifier).digest());
    return {
        verifier,
        challenge
    };
}
}),
"[project]/packages/shared/lib/auth/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "consumeLoginAttempt",
    ()=>consumeLoginAttempt,
    "getClientIp",
    ()=>getClientIp
]);
;
const LOGIN_ATTEMPTS = 5;
const WINDOW_MS = 60_000;
const buckets = new Map();
function sweep(now) {
    if (buckets.size < 200) return;
    for (const [key, bucket] of buckets){
        if (bucket.resetsAt <= now) buckets.delete(key);
    }
}
function getClientIp(request) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
    return request.headers.get("x-real-ip") ?? "unknown";
}
function consumeLoginAttempt(ip) {
    const now = Date.now();
    sweep(now);
    const key = `login:${ip}`;
    const existing = buckets.get(key);
    if (!existing || existing.resetsAt <= now) {
        buckets.set(key, {
            count: 1,
            resetsAt: now + WINDOW_MS
        });
        return {
            allowed: true,
            remaining: LOGIN_ATTEMPTS - 1
        };
    }
    if (existing.count >= LOGIN_ATTEMPTS) {
        return {
            allowed: false,
            remaining: 0,
            retryAfterMs: existing.resetsAt - now
        };
    }
    existing.count += 1;
    return {
        allowed: true,
        remaining: LOGIN_ATTEMPTS - existing.count
    };
}
}),
"[project]/packages/shared/lib/auth/service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSessionCookie",
    ()=>clearSessionCookie,
    "getAdminSession",
    ()=>getAdminSession,
    "loginAdmin",
    ()=>loginAdmin,
    "logoutAdmin",
    ()=>logoutAdmin,
    "writeSessionCookie",
    ()=>writeSessionCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$admin$2d$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/admin-users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$kcc$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/kcc-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/session.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function readStoredSession() {
    const raw = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_SESSION_COOKIE"])?.value;
    if (!raw) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decryptSession"])(raw);
}
async function writeSessionCookie(session) {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_SESSION_COOKIE"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptSession"])(session), {
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_SESSION_MAX_AGE"]
    });
}
async function clearSessionCookie() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).delete(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_SESSION_COOKIE"]);
}
async function refreshStoredSession(session) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$kcc$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthProvider"])();
    const tokens = await provider.refresh(session.refreshToken);
    const userInfo = await provider.getUserInfo(tokens.accessToken);
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$admin$2d$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireActiveAdminUser"])(userInfo.sub);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildStoredSession"])({
        kccUserId: userInfo.sub,
        email: userInfo.email ?? admin.email,
        name: userInfo.name ?? userInfo.preferredUsername ?? null,
        role: admin.role,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
    });
}
async function getAdminSession() {
    let session = await readStoredSession();
    if (!session) return null;
    try {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionNeedsRefresh"])(session)) {
            session = await refreshStoredSession(session);
            await writeSessionCookie(session);
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$admin$2d$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireActiveAdminUser"])(session.kccUserId);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPublicSession"])({
            ...session,
            role: admin.role
        });
    } catch  {
        await clearSessionCookie();
        return null;
    }
}
async function loginAdmin(request, credentials) {
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIp"])(request);
    const quota = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["consumeLoginAttempt"])(ip);
    if (!quota.allowed) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("RATE_LIMITED", "Too many login attempts. Please wait a minute and try again.", 429);
    }
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$kcc$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthProvider"])();
    const tokens = await provider.login(credentials);
    const userInfo = await provider.getUserInfo(tokens.accessToken);
    let admin;
    try {
        admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$admin$2d$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireActiveAdminUser"])(userInfo.sub);
    } catch (error) {
        if (error instanceof Error && error.message === "ADMIN_NOT_REGISTERED") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("ADMIN_NOT_REGISTERED", "This account is not authorized to access the admin panel.", 403);
        }
        if (error instanceof Error && error.message === "ADMIN_SUSPENDED") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthError"]("ADMIN_SUSPENDED", "This admin account has been suspended.", 403);
        }
        throw error;
    }
    if (userInfo.email && userInfo.email !== admin.email) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$admin$2d$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertAdminUserEmail"])(userInfo.sub, userInfo.email);
    }
    const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildStoredSession"])({
        kccUserId: userInfo.sub,
        email: userInfo.email ?? admin.email,
        name: userInfo.name ?? userInfo.preferredUsername ?? null,
        role: admin.role,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
    });
    await writeSessionCookie(stored);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPublicSession"])(stored);
}
async function logoutAdmin() {
    const session = await readStoredSession();
    if (session) {
        const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$kcc$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthProvider"])();
        await provider.logout(session.refreshToken);
    }
    await clearSessionCookie();
}
}),
"[project]/packages/shared/lib/auth/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMIN_SESSION_COOKIE",
    ()=>ADMIN_SESSION_COOKIE,
    "ADMIN_SESSION_MAX_AGE",
    ()=>ADMIN_SESSION_MAX_AGE,
    "buildStoredSession",
    ()=>buildStoredSession,
    "decryptSession",
    ()=>decryptSession,
    "encryptSession",
    ()=>encryptSession,
    "sessionNeedsRefresh",
    ()=>sessionNeedsRefresh,
    "toPublicSession",
    ()=>toPublicSession
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/auth/jwt.ts [app-route] (ecmascript)");
;
;
;
;
const ADMIN_SESSION_COOKIE = "nfl_admin_session";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;
function sessionKey() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthConfigError"]("SESSION_SECRET must be set to at least 32 characters for admin authentication.");
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(secret).digest();
}
function encryptSession(session) {
    const iv = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(12);
    const cipher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createCipheriv"])("aes-256-gcm", sessionKey(), iv);
    const plaintext = Buffer.from(JSON.stringify(session), "utf8");
    const encrypted = Buffer.concat([
        cipher.update(plaintext),
        cipher.final()
    ]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([
        iv,
        tag,
        encrypted
    ]).toString("base64url");
}
function decryptSession(value) {
    try {
        const buffer = Buffer.from(value, "base64url");
        const iv = buffer.subarray(0, 12);
        const tag = buffer.subarray(12, 28);
        const encrypted = buffer.subarray(28);
        const decipher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createDecipheriv"])("aes-256-gcm", sessionKey(), iv);
        decipher.setAuthTag(tag);
        const plaintext = Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]);
        return JSON.parse(plaintext.toString("utf8"));
    } catch  {
        return null;
    }
}
function buildStoredSession(input) {
    const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtExpiresAtMs"])(input.accessToken) ?? Date.now() + input.expiresIn * 1000;
    return {
        kccUserId: input.kccUserId,
        email: input.email,
        name: input.name,
        role: input.role,
        accessToken: input.accessToken,
        refreshToken: input.refreshToken,
        expiresAt,
        tokenVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$auth$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtTokenVersion"])(input.accessToken)
    };
}
function sessionNeedsRefresh(session, now = Date.now()) {
    return session.expiresAt - now < 5 * 60 * 1000;
}
function toPublicSession(session) {
    return {
        kccUserId: session.kccUserId,
        email: session.email,
        name: session.name,
        role: session.role
    };
}
}),
"[project]/packages/shared/lib/cms/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
;
;
;
;
const DEFAULT_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "numforlife_web.sqlite");
let db = null;
function migrate(database) {
    database.exec(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      template TEXT NOT NULL DEFAULT 'homepage',
      status TEXT NOT NULL DEFAULT 'published',
      published_version_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cms_page_versions (
      id TEXT PRIMARY KEY,
      page_id TEXT NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
      version_no INTEGER NOT NULL,
      content_json TEXT NOT NULL,
      seo_json TEXT,
      state TEXT NOT NULL CHECK(state IN ('draft', 'published', 'archived')),
      created_at TEXT NOT NULL,
      UNIQUE(page_id, version_no)
    );

    CREATE INDEX IF NOT EXISTS idx_cms_versions_page_state
      ON cms_page_versions(page_id, state);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      kcc_user_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
        CHECK(status IN ('active', 'suspended')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_admin_users_kcc_user_id
      ON admin_users(kcc_user_id);

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_kcc_user_id TEXT NOT NULL,
      admin_email TEXT NOT NULL,
      admin_role TEXT NOT NULL,
      action TEXT NOT NULL,
      module TEXT NOT NULL,
      target TEXT,
      before_json TEXT,
      after_json TEXT,
      reason TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at
      ON audit_logs(created_at DESC);
  `);
    const pageColumns = database.prepare("PRAGMA table_info(cms_pages)").all();
    if (!pageColumns.some((column)=>column.name === "draft_version_id")) {
        database.exec("ALTER TABLE cms_pages ADD COLUMN draft_version_id TEXT");
    }
}
function getDb() {
    if (db) return db;
    const dbPath = process.env.CMS_DATABASE_PATH ?? DEFAULT_PATH;
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(dbPath), {
        recursive: true
    });
    db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    migrate(db);
    return db;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a-6pw2._.js.map