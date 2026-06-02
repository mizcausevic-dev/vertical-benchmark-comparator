import { analyze } from "../analyze.js";
import { sampleVerticalBenchmarkComparator } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleVerticalBenchmarkComparator, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use AI governance and procurement as the benchmark leaders, keep biotech and nonprofit as repeatability proofs, tighten FinTech before overselling it, and deprioritize robotics until the proof density catches up."
  };
}

export function benchmarkRegister() {
  return sampleVerticalBenchmarkComparator.map((item) => ({
    lane: item.lane,
    verticalCluster: item.verticalCluster,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    benchmarkNarrative: item.benchmarkNarrative,
    benchmarkScore: item.benchmarkScore,
    nextMove: item.nextMove
  }));
}

export function comparisonMatrix() {
  return sampleVerticalBenchmarkComparator.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    riskHeadline: item.riskHeadline,
    benchmarkSignal: item.benchmarkSignal,
    missingProof: item.missingProof,
    evidenceArtifacts: item.evidenceArtifacts,
    benchmarkScore: item.benchmarkScore,
    proofDepthScore: item.proofDepthScore,
    commercialPullScore: item.commercialPullScore,
    repeatabilityScore: item.repeatabilityScore
  }));
}

export function investmentPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    executionDragScore: item.executionDragScore,
    compositePriorityScore: item.compositePriorityScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    compositePriorityScore: item.compositePriorityScore,
    investableRevenueMillions: item.investableRevenueMillions,
    executionDragScore: item.executionDragScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic benchmark data only - no live portfolio finances, customer contracts, or investor materials are included.",
    "Scores are modeled to show how Kinetic Gain can compare vertical posture, proof depth, commercial pull, repeatability, and execution drag in one board-readable benchmark surface.",
    "All routes are read-only and demonstrate benchmark comparison, not production financial advice, market advice, or live investment recommendations."
  ];
}

export function payload() {
  return {
    report,
    benchmarkRegister: benchmarkRegister(),
    comparisonMatrix: comparisonMatrix(),
    investmentPosture: investmentPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleVerticalBenchmarkComparator
  };
}
