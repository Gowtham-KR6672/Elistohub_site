// @ts-check
/**
 * Production server for Node hosts (Render, Railway, a VPS…). Run with `npm start` after `npm run build`.
 *
 * - Serves the built site from dist/ (long caching for hashed files in /assets)
 * - Sends page URLs like /contact to index.html so React Router can show them
 * - Handles the contact form at /api/contact.php (same URL the PHP version uses on BigRock)
 *
 * Listens on $PORT (set automatically by Render), default 3000.
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
import { createContactHandler } from "./contact-handler.mjs";

const ROOT = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY_BYTES = 64 * 1024;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".xml"]);
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const handleContact = createContactHandler(process.env);

/** @param {import("node:http").ServerResponse} res @param {number} status @param {unknown} body */
function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...SECURITY_HEADERS });
  res.end(JSON.stringify(body));
}

/** @param {import("node:http").IncomingMessage} req @returns {Promise<string>} */
function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    /** @type {Buffer[]} */
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** @param {string} filePath */
async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} filePath
 * @param {string} cacheControl
 */
function sendFile(req, res, filePath, cacheControl) {
  const ext = extname(filePath).toLowerCase();
  const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""));
  /** @type {Record<string, string>} */
  const headers = {
    "Content-Type": TYPES[/** @type {keyof typeof TYPES} */ (ext)] ?? "application/octet-stream",
    "Cache-Control": cacheControl,
    Vary: "Accept-Encoding",
    ...SECURITY_HEADERS,
  };
  if (gzip) headers["Content-Encoding"] = "gzip";
  res.writeHead(200, headers);
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  const stream = createReadStream(filePath);
  stream.on("error", () => res.destroy());
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}

const server = createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }

  // Contact form
  if (pathname === "/api/contact.php" || pathname === "/api/contact") {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      sendJson(res, 405, { ok: false, message: "Method not allowed." });
      return;
    }
    try {
      const forwarded = String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim();
      const result = await handleContact({
        body: await readBody(req),
        ip: forwarded || req.socket.remoteAddress || "unknown",
        origin: req.headers.origin,
        host: req.headers.host,
      });
      sendJson(res, result.status, result.body);
    } catch (error) {
      console.error("[contact] Request failed", error);
      sendJson(res, 400, { ok: false, message: "Bad request." });
    }
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  // Never expose hidden files (.htaccess) or PHP sources.
  if (pathname.split("/").some((part) => part.startsWith(".")) || pathname.endsWith(".php")) {
    res.writeHead(404).end("Not found");
    return;
  }

  const filePath = resolve(ROOT, `.${pathname}`);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + sep)) {
    res.writeHead(404).end("Not found");
    return;
  }

  if (pathname !== "/" && (await isFile(filePath))) {
    const immutable = pathname.startsWith("/assets/");
    sendFile(req, res, filePath, immutable ? "public, max-age=31536000, immutable" : "public, max-age=3600");
    return;
  }

  // A missing file (e.g. an old /assets/... link) is a real 404, not the app page.
  if (extname(pathname)) {
    res.writeHead(404).end("Not found");
    return;
  }

  // Page URLs (/, /contact, /services, unknown pages…) are handled by React Router.
  sendFile(req, res, resolve(ROOT, "index.html"), "no-cache");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Elistohub site running on port ${PORT}`);
});
