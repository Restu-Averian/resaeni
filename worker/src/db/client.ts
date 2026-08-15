import { createClient } from "@libsql/client/web";
import { Bindings } from "../types/bindings";

export function createDatabaseClient(bindings: Bindings) {
  return createClient({
    url: bindings.TURSO_DATABASE_URL,
    authToken: bindings.TURSO_AUTH_TOKEN,
  });
}
