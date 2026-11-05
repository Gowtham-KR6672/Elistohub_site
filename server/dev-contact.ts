/**
 * Local development version of the contact endpoint.
 *
 * `npm run dev` can't run PHP, so this Vite middleware answers POST /api/contact.php using the
 * shared Node handler (server/contact-handler.mjs) and the Brevo values in .env.local.
 * It is never part of the production build.
 */
import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";
import { createContactHandler } from "./contact-handler.mjs";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export function devContactApi(env: Record<string, string>): Plugin {
  return {
    name: "elistohub-dev-contact-api",
    apply: "serve",
    configureServer(server) {
      const logger = server.config.logger;
      const handleContact = createContactHandler(env, {
        info: (msg) => logger.info(msg),
        warn: (msg) => logger.warn(msg),
        error: (msg) => logger.error(msg),
      });

      server.middlewares.use("/api/contact.php", async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, message: "Method not allowed." }));
          return;
        }
        const result = await handleContact({
          body: await readBody(req),
          ip: req.socket.remoteAddress,
          origin: req.headers.origin,
          host: req.headers.host,
        });
        res.statusCode = result.status;
        res.end(JSON.stringify(result.body));
      });
    },
  };
}
