# DB inspection tooling (read-only)

Isolated from the app build so `mysql2` never enters the application dependency tree.

## Credentials
Supplied via environment variables **only**. Never hardcode them, never commit them.
The account provided by the client is **read-only** and must stay that way.

```bash
cd tools/db-inspect && npm install

DB_HOST=<host> DB_USER=<user> DB_PASS=<password> node inspect.mjs
```

Writes `schema-report.json` — column structure and row counts only.

## Rules
- Aggregates, schema metadata and field shapes only.
- Never read `yzn_member.password` / `encrypt`.
- Never extract, log or commit personal data (emails, phones, names, birth dates).
- SELECT/SHOW only. No writes, ever.
