import type {
  BenchmarkAssessment,
  BenchmarkSeverity,
  VerticalBenchmarkComparatorExport,
  VerticalBenchmarkComparatorItem,
  VerticalBenchmarkComparatorReportItem
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): BenchmarkAssessment {
  let severity: BenchmarkSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDrag(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): BenchmarkAssessment {
  let severity: BenchmarkSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: VerticalBenchmarkComparatorItem[],
  options: { now?: string } = {}
): VerticalBenchmarkComparatorExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: VerticalBenchmarkComparatorReportItem[] = items.map((item) => {
    const benchmarkAssessment = assessStrength(
      item.benchmarkScore,
      84,
      70,
      "This vertical is benchmark-strong enough to lead board and investor narratives.",
      "This vertical is promising, but it still needs tighter proof to justify top-tier positioning.",
      "This vertical is weaker than the current portfolio story implies."
    );

    const proofDepthAssessment = assessStrength(
      item.proofDepthScore,
      82,
      67,
      "Proof depth is strong enough to defend the benchmark position.",
      "Proof depth exists, but more live operator evidence is needed.",
      "Proof depth is too thin for the current benchmark story."
    );

    const commercialPullAssessment = assessStrength(
      item.commercialPullScore,
      80,
      64,
      "Commercial pull is strong enough to justify active investment.",
      "Commercial pull exists, but the demand case is still uneven.",
      "Commercial pull is too weak for the current expansion story."
    );

    const repeatabilityAssessment = assessStrength(
      item.repeatabilityScore,
      78,
      62,
      "The delivery pattern is repeatable enough to scale across adjacent accounts.",
      "The pattern is partly reusable, but still depends on too much custom stitching.",
      "The pattern is still too bespoke to benchmark as a scalable lane."
    );

    const dragAssessment = assessDrag(
      item.executionDragScore,
      20,
      36,
      "Execution drag is low enough to keep investment velocity intact.",
      "Execution drag is visible and should be narrowed before scaling harder.",
      "Execution drag is high enough to distort the benchmark story."
    );

    const compositePriorityScore =
      Math.round(
        ((item.benchmarkScore +
          item.proofDepthScore +
          item.commercialPullScore +
          item.repeatabilityScore +
          (100 - item.executionDragScore)) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      benchmarkAssessment,
      proofDepthAssessment,
      commercialPullAssessment,
      repeatabilityAssessment,
      dragAssessment,
      compositePriorityScore
    };
  });

  const topTierVerticals = reportItems.filter(
    (item) =>
      item.benchmarkAssessment.severity === "LOW" &&
      item.proofDepthAssessment.severity === "LOW" &&
      item.commercialPullAssessment.severity === "LOW"
  ).length;

  const underpoweredVerticals = reportItems.filter(
    (item) =>
      item.benchmarkAssessment.severity === "HIGH" ||
      item.proofDepthAssessment.severity === "HIGH" ||
      item.dragAssessment.severity === "HIGH"
  ).length;

  const strongestSignals = reportItems.filter(
    (item) => item.action === "INVEST" || item.compositePriorityScore >= 78
  ).length;

  const averageBenchmarkScore =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.benchmarkScore, 0) / reportItems.length) * 10) / 10;

  const investableRevenueMillions = reportItems.reduce((sum, item) => sum + item.investableRevenueMillions, 0);

  const leadingMessage =
    topTierVerticals >= 3
      ? "Several vertical lanes are benchmark-strong enough to anchor the next board and investor narrative, but the weaker lanes still need proof depth and repeatability cleanup."
      : underpoweredVerticals <= 2
        ? "The benchmark set is promising overall, but a few lanes still need commercial proof and lower execution drag before they deserve heavier investment."
        : "The current vertical story is too uneven to present as one coherent expansion thesis without first tightening the weakest benchmark lanes."
  ;

  return {
    generatedAt,
    summary: {
      verticalsTracked: reportItems.length,
      topTierVerticals,
      underpoweredVerticals,
      strongestSignals,
      averageBenchmarkScore,
      investableRevenueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: VerticalBenchmarkComparatorItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
