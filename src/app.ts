import express from "express";
import { benchmarkRegister, comparisonMatrix, investmentPosture, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderBenchmarkOverview,
  renderBenchmarkRegister,
  renderComparisonMatrix,
  renderDocs,
  renderInvestmentPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderBenchmarkOverview()));
  app.get("/benchmark-register", (_req, res) => res.type("html").send(renderBenchmarkRegister()));
  app.get("/comparison-matrix", (_req, res) => res.type("html").send(renderComparisonMatrix()));
  app.get("/investment-posture", (_req, res) => res.type("html").send(renderInvestmentPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/benchmark-register", (_req, res) => res.json(benchmarkRegister()));
  app.get("/api/comparison-matrix", (_req, res) => res.json(comparisonMatrix()));
  app.get("/api/investment-posture", (_req, res) => res.json(investmentPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`vertical-benchmark-comparator listening on http://127.0.0.1:${port}`);
  });
}
