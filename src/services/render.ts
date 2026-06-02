import { benchmarkRegister, comparisonMatrix, investmentPosture, payload, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Vertical Benchmark Comparator";
const domain = "https://verticals.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/benchmark-register", "Benchmark register"],
    ["/comparison-matrix", "Comparison matrix"],
    ["/investment-posture", "Investment posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderBenchmarkOverview() {
  const executiveSummary = summary();
  const lanes = benchmarkRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes.map((item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.verticalCluster)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Narrative:</strong> ${escapeHtml(item.benchmarkNarrative)}</p>
        <p><strong>Benchmark score:</strong> ${item.benchmarkScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`).join("");
  const risks = findings.map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · priority ${item.compositePriorityScore} · drag ${item.executionDragScore} · $${item.investableRevenueMillions}M investable</li>`).join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Vertical benchmarking</span>
      <h1>Which vertical lanes deserve more investment, which ones strengthen the board story today, and which ones still need deeper proof before they earn flagship status?</h1>
      <p class="lede">Vertical Benchmark Comparator turns category fit, executive signal, proof depth, commercial pull, repeatability, and execution drag into one board-readable comparison layer instead of scattered portfolio opinions.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Verticals tracked</span><span class="metric-value">${executiveSummary.verticalsTracked}</span><div class="metric-copy">Modeled vertical lanes in the current executive-facing benchmark set.</div></div>
        <div class="metric"><span class="metric-label">Top-tier lanes</span><span class="metric-value">${executiveSummary.topTierVerticals}</span><div class="metric-copy">Verticals with benchmark, proof, and commercial pull aligned strongly enough to lead the narrative.</div></div>
        <div class="metric"><span class="metric-label">Underpowered lanes</span><span class="metric-value">${executiveSummary.underpoweredVerticals}</span><div class="metric-copy">Lanes where proof depth, repeatability, or drag still weaken the story.</div></div>
        <div class="metric"><span class="metric-label">Investable revenue</span><span class="metric-value">$${executiveSummary.investableRevenueMillions}M</span><div class="metric-copy">Modeled revenue tied to the current benchmark portfolio.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Benchmark register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible comparison pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for comparing vertical posture, proof depth, commercial pull, and investment priority."
  );
}

export function renderBenchmarkRegister() {
  const rows = benchmarkRegister().map((item) => `<tr><td>${escapeHtml(item.verticalCluster)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.benchmarkNarrative)}</td><td>${item.benchmarkScore}</td></tr>`).join("");
  return shell("Benchmark register", "/benchmark-register", `<section class="hero"><span class="eyebrow">Benchmark register</span><h1>Each vertical lane keeps one owner, one board audience, one benchmark story, and one next move attached.</h1><p class="lede">The benchmark register keeps the comparison narrative tied to the exact vertical cluster that should lead, hold, watch, or fall back.</p><div class="nav">${navLinks("/benchmark-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Vertical cluster</th><th>Owner</th><th>Audience</th><th>Action</th><th>Benchmark narrative</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Benchmark-register view showing which verticals deserve heavier board and investor emphasis.");
}

export function renderComparisonMatrix() {
  const rows = comparisonMatrix().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.dimension)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.benchmarkSignal)}</td><td>${escapeHtml(item.missingProof)}</td><td>${item.benchmarkScore}</td><td>${item.proofDepthScore}</td><td>${item.commercialPullScore}</td><td>${item.repeatabilityScore}</td></tr>`).join("");
  return shell("Comparison matrix", "/comparison-matrix", `<section class="hero"><span class="eyebrow">Comparison matrix</span><h1>Weak proof, low repeatability, and excess drag stay visible in one comparison room instead of hiding behind a broad portfolio headline.</h1><p class="lede">This view keeps every vertical benchmark tied to the exact dimension that is strongest, weakest, or most likely to distort the next board story.</p><div class="nav">${navLinks("/comparison-matrix")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Dimension</th><th>Risk headline</th><th>Benchmark signal</th><th>Missing proof</th><th>Benchmark</th><th>Proof</th><th>Pull</th><th>Repeatability</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Comparison-matrix view showing which vertical lanes are strongest and which still need proof or cleanup.");
}

export function renderInvestmentPosture() {
  const rows = investmentPosture().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.executionDragScore}</td><td>${item.compositePriorityScore}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.nextMove)}</td></tr>`).join("");
  return shell("Investment posture", "/investment-posture", `<section class="hero"><span class="eyebrow">Investment posture</span><h1>The comparator keeps invest, maintain, watch, and deprioritize decisions tied to one owner, one drag score, and one next move.</h1><p class="lede">This investment posture helps leaders see which verticals deserve more focus now, which ones should hold steady, and which ones are not ready for heavier capital or board emphasis.</p><div class="nav">${navLinks("/investment-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Drag</th><th>Priority</th><th>Owner</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Investment-posture view for sequencing benchmark leaders, watchers, and deprioritized lanes.");
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell("Verification", "/verification", `<section class="hero"><span class="eyebrow">Verification</span><h1>How this benchmark surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live market or investor forecast.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`, "Verification notes for the Vertical Benchmark Comparator sample and modeled outputs.");
}

export function renderDocs() {
  return shell("Docs", "/docs", `<section class="hero"><span class="eyebrow">Docs</span><h1>Vertical Benchmark Comparator docs</h1><p class="lede">This surface packages vertical fit, proof depth, commercial pull, repeatability, and execution drag into reproducible routes and JSON outputs for board, investor, and executive portfolio reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/benchmark-register</code> keeps benchmark stories, owners, and next moves tied to one vertical lane.</li><li><code>/comparison-matrix</code> compares missing proof, pull, repeatability, and drag.</li><li><code>/investment-posture</code> sequences invest, maintain, watch, and deprioritize decisions.</li><li><code>/api/payload</code> exposes the reproducible benchmark packet.</li></ul></section>`, "Product documentation for Vertical Benchmark Comparator and its board-facing comparison routes.");
}
