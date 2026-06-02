import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("vertical-benchmark-comparator app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Vertical Benchmark Comparator");
  });

  it("serves the benchmark register route", async () => {
    const response = await request(app).get("/benchmark-register");
    expect(response.status).toBe(200);
  });

  it("serves the comparison matrix route", async () => {
    const response = await request(app).get("/comparison-matrix");
    expect(response.status).toBe(200);
  });

  it("serves the investment posture route", async () => {
    const response = await request(app).get("/investment-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.verticalsTracked).toBeGreaterThan(0);
  });

  it("serves the benchmark register API", async () => {
    const response = await request(app).get("/api/benchmark-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the comparison matrix API", async () => {
    const response = await request(app).get("/api/comparison-matrix");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
