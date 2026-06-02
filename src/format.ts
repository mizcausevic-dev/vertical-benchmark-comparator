import type { VerticalBenchmarkComparatorSummary } from "./types.js";

export function formatSummary(
  summary: VerticalBenchmarkComparatorSummary,
  title = "Vertical Benchmark Comparator"
) {
  return [
    title,
    `Verticals tracked: ${summary.verticalsTracked}`,
    `Top-tier verticals: ${summary.topTierVerticals}`,
    `Underpowered verticals: ${summary.underpoweredVerticals}`,
    `Strongest signals: ${summary.strongestSignals}`,
    `Average benchmark score: ${summary.averageBenchmarkScore}`,
    `Investable revenue: $${summary.investableRevenueMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
