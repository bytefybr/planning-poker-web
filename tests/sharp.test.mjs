import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";

// next/image precisa do sharp em produção (standalone); sem ele o Next loga
// "'sharp' is required to be installed in standalone mode" e não otimiza imagens.
const require = createRequire(import.meta.url);

test("sharp está instalado e processa imagem", async () => {
  const sharp = require("sharp");
  const out = await sharp({
    create: { width: 8, height: 8, channels: 3, background: "#ff0000" },
  })
    .webp()
    .toBuffer();
  assert.ok(out.length > 0);
  assert.equal((await sharp(out).metadata()).format, "webp");
});

test("sharp está nas dependencies (não só devDependencies)", () => {
  const pkg = require("../package.json");
  assert.ok(pkg.dependencies?.sharp);
});
