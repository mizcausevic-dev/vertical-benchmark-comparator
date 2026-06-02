import { describe, expect, it } from "vitest";
import {
  renderBenchmarkOverview,
  renderBenchmarkRegister,
  renderComparisonMatrix,
  renderDocs,
  renderInvestmentPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderBenchmarkOverview()).toContain("Vertical Benchmark Comparator");
  });

  it("renders the benchmark register route", () => {
    expect(renderBenchmarkRegister()).toContain("/benchmark-register");
  });

  it("renders the comparison matrix route", () => {
    expect(renderComparisonMatrix()).toContain("/comparison-matrix");
  });

  it("renders the investment posture route", () => {
    expect(renderInvestmentPosture()).toContain("/investment-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic benchmark data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
