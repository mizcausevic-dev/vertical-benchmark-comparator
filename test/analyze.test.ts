import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleVerticalBenchmarkComparator } from "../src/data/sampleVerticalBrief.js";
import type { VerticalBenchmarkComparatorItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleVerticalBenchmarkComparator.length);
  });

  it("counts top-tier verticals", () => {
    const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.topTierVerticals).toBeGreaterThan(0);
  });

  it("counts underpowered verticals", () => {
    const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.underpoweredVerticals).toBeGreaterThan(0);
  });

  it("sums investable revenue", () => {
    const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.investableRevenueMillions).toBe(139);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.verticalsTracked).toBe(0);
    expect(report.summary.averageBenchmarkScore).toBe(0);
    expect(report.summary.leadingMessage).toContain("promising overall");
  });

  it("hits low and medium benchmark branches explicitly", () => {
    const fixtures: VerticalBenchmarkComparatorItem[] = [
      {
        id: "low-branch",
        lane: "AI flagship lane",
        dimension: "CATEGORY_FIT",
        action: "INVEST",
        verticalCluster: "AI governance",
        boardQuestion: "Can this lane lead the benchmark set now?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Stable.",
        benchmarkNarrative: "This lane is benchmark-ready.",
        comparativeReality: "Proof is aligned with the narrative.",
        riskHeadline: "Very little benchmark risk.",
        benchmarkSignal: "Strong category fit and proof.",
        missingProof: "None",
        evidenceArtifacts: ["benchmark packet"],
        opportunityMoves: ["keep flagship current"],
        relatedSurfaces: ["scorecard.kineticgain.com"],
        companyTags: ["Google"],
        benchmarkScore: 88,
        proofDepthScore: 86,
        commercialPullScore: 84,
        repeatabilityScore: 82,
        executionDragScore: 14,
        investableRevenueMillions: 5,
        headline: "Flagship lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the flagship current."
      },
      {
        id: "watch-branch",
        lane: "Watch lane",
        dimension: "COMMERCIAL_PULL",
        action: "WATCH",
        verticalCluster: "FinTech",
        boardQuestion: "Where does the benchmark start weakening?",
        owner: "Revenue owner",
        audience: "Finance committee",
        currentPosture: "Watch state.",
        benchmarkNarrative: "The lane is promising.",
        comparativeReality: "Proof is thinner than the demand story.",
        riskHeadline: "Commercial pull is visible.",
        benchmarkSignal: "One benchmark gap is forming.",
        missingProof: "Recent comparison packet",
        evidenceArtifacts: ["comparison packet"],
        opportunityMoves: ["refresh packet"],
        relatedSurfaces: ["merchant.kineticgain.com"],
        companyTags: ["Tableau"],
        benchmarkScore: 72,
        proofDepthScore: 69,
        commercialPullScore: 70,
        repeatabilityScore: 64,
        executionDragScore: 28,
        investableRevenueMillions: 7,
        headline: "Watch the lane.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the comparison packet."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].benchmarkAssessment.severity).toBe("LOW");
    expect(report.items[0].dragAssessment.severity).toBe("LOW");
    expect(report.items[1].benchmarkAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].proofDepthAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].commercialPullAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].repeatabilityAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].dragAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("promising overall");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.verticalsTracked).toBe(sampleVerticalBenchmarkComparator.length);
  });
});
