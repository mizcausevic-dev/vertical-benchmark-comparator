export type BenchmarkDimension =
  | "CATEGORY_FIT"
  | "EXEC_SIGNAL"
  | "EVIDENCE_DEPTH"
  | "COMMERCIAL_PULL"
  | "IMPLEMENTATION_REPEATABILITY"
  | "INVESTMENT_PRIORITY";

export type BenchmarkAction = "INVEST" | "MAINTAIN" | "WATCH" | "DEPRIORITIZE";

export type BenchmarkSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface VerticalBenchmarkComparatorItem {
  id: string;
  lane: string;
  dimension: BenchmarkDimension;
  action: BenchmarkAction;
  verticalCluster: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  benchmarkNarrative: string;
  comparativeReality: string;
  riskHeadline: string;
  benchmarkSignal: string;
  missingProof: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  benchmarkScore: number;
  proofDepthScore: number;
  commercialPullScore: number;
  repeatabilityScore: number;
  executionDragScore: number;
  investableRevenueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface BenchmarkAssessment {
  severity: BenchmarkSeverity;
  ok: boolean;
  message: string;
}

export interface VerticalBenchmarkComparatorReportItem extends VerticalBenchmarkComparatorItem {
  benchmarkAssessment: BenchmarkAssessment;
  proofDepthAssessment: BenchmarkAssessment;
  commercialPullAssessment: BenchmarkAssessment;
  repeatabilityAssessment: BenchmarkAssessment;
  dragAssessment: BenchmarkAssessment;
  compositePriorityScore: number;
}

export interface VerticalBenchmarkComparatorSummary {
  verticalsTracked: number;
  topTierVerticals: number;
  underpoweredVerticals: number;
  strongestSignals: number;
  averageBenchmarkScore: number;
  investableRevenueMillions: number;
  leadingMessage: string;
}

export interface VerticalBenchmarkComparatorExport {
  generatedAt: string;
  summary: VerticalBenchmarkComparatorSummary;
  items: VerticalBenchmarkComparatorReportItem[];
}

export interface VerticalBenchmarkComparatorPayload {
  report: VerticalBenchmarkComparatorExport;
  benchmarkRegister: ReturnType<typeof import("./services/verticalBriefService.js").benchmarkRegister>;
  comparisonMatrix: ReturnType<typeof import("./services/verticalBriefService.js").comparisonMatrix>;
  investmentPosture: ReturnType<typeof import("./services/verticalBriefService.js").investmentPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: VerticalBenchmarkComparatorItem[];
}
