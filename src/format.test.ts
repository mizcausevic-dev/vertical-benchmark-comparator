import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the benchmark summary", () => {
    const output = formatSummary({
      verticalsTracked: 6,
      topTierVerticals: 2,
      underpoweredVerticals: 1,
      strongestSignals: 3,
      averageBenchmarkScore: 77,
      investableRevenueMillions: 139,
      leadingMessage: "The benchmark set is promising overall."
    });

    expect(output).toContain("Vertical Benchmark Comparator");
    expect(output).toContain("Top-tier verticals: 2");
    expect(output).toContain("Investable revenue: $139M");
  });
});
