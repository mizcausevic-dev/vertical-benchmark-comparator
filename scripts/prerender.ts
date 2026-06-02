import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderBenchmarkOverview,
  renderBenchmarkRegister,
  renderComparisonMatrix,
  renderDocs,
  renderInvestmentPosture,
  renderVerification
} from "../src/services/render.js";
import { benchmarkRegister, comparisonMatrix, investmentPosture, payload, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist-static");
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });

const routes: Array<[string, [string, string]]> = [
  ["/", ["index.html", renderBenchmarkOverview()]],
  ["/benchmark-register", ["benchmark-register/index.html", renderBenchmarkRegister()]],
  ["/comparison-matrix", ["comparison-matrix/index.html", renderComparisonMatrix()]],
  ["/investment-posture", ["investment-posture/index.html", renderInvestmentPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
];

for (const [, [filename, html]] of routes) {
  const target = path.join(publicDir, filename);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://benchmark.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://benchmark.kineticgain.com/</loc></url><url><loc>https://benchmark.kineticgain.com/benchmark-register/</loc></url><url><loc>https://benchmark.kineticgain.com/comparison-matrix/</loc></url><url><loc>https://benchmark.kineticgain.com/investment-posture/</loc></url><url><loc>https://benchmark.kineticgain.com/verification/</loc></url><url><loc>https://benchmark.kineticgain.com/docs/</loc></url></urlset>`
);

const apiDir = path.join(publicDir, "api");
mkdirSync(apiDir, { recursive: true });
const apiPayloads: Record<string, unknown> = {
  "dashboard-summary.json": summary(),
  "benchmark-register.json": benchmarkRegister(),
  "comparison-matrix.json": comparisonMatrix(),
  "investment-posture.json": investmentPosture(),
  "risk-map.json": riskMap(),
  "verification.json": verification(),
  "sample.json": payload().sample,
  "payload.json": payload()
};

for (const [filename, value] of Object.entries(apiPayloads)) {
  writeFileSync(path.join(apiDir, filename), JSON.stringify(value, null, 2));
}
