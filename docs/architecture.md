# Architecture

Vertical Benchmark Comparator is a static-friendly TypeScript executive-intelligence surface for comparing vertical strength, proof depth, commercial pull, repeatability, and execution drag in one board-readable benchmark layer.

## Routes

- `/`
- `/benchmark-register`
- `/comparison-matrix`
- `/investment-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic vertical lanes with benchmark, proof, pull, repeatability, and drag signals.
2. `src/analyze.ts` converts those signals into board-readable benchmark assessments and a composite investment-priority score.
3. `src/services/verticalBriefService.ts` shapes the benchmark register, comparison matrix, investment posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, benchmark register, comparison matrix, investment posture, verification, and docs
- JSON routes for summary, benchmark register, comparison matrix, investment posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
