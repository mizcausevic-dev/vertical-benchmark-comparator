import { describe, expect, it } from "vitest";
import { benchmarkRegister, comparisonMatrix, investmentPosture, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the benchmark summary", () => {
    expect(summary().verticalsTracked).toBeGreaterThan(0);
  });

  it("returns the benchmark register view", () => {
    expect(benchmarkRegister().length).toBeGreaterThan(0);
  });

  it("returns the comparison matrix view", () => {
    expect(comparisonMatrix().length).toBeGreaterThan(0);
  });

  it("returns the investment posture view", () => {
    expect(investmentPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.verticalsTracked).toBeGreaterThan(0);
  });
});
