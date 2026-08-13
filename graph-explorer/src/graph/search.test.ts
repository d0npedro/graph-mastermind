import { describe, expect, it } from "vitest";
import { neighborsOf, nodeMatchesQuery } from "./search";
import type { GraphNode } from "./types";

const node: GraphNode = {
  id: "pkg-api",
  label: "HTTP-API",
  group: "adapters",
  description: "Routen und Auth-Grenzen",
};

describe("nodeMatchesQuery", () => {
  it("matches label, id, group, and description case-insensitively", () => {
    expect(nodeMatchesQuery(node, "http")).toBe(true);
    expect(nodeMatchesQuery(node, "PKG-API")).toBe(true);
    expect(nodeMatchesQuery(node, "Adapter")).toBe(true);
    expect(nodeMatchesQuery(node, "auth-grenzen")).toBe(true);
    expect(nodeMatchesQuery(node, "nicht-da")).toBe(false);
  });

  it("treats a blank query as a match so the graph stays undimmed", () => {
    expect(nodeMatchesQuery(node, "   ")).toBe(true);
    expect(nodeMatchesQuery(node, "")).toBe(true);
  });
});

describe("neighborsOf", () => {
  it("lists inbound and outbound neighbors with link labels", () => {
    const nodes: GraphNode[] = [
      node,
      { id: "pkg-domain", label: "Domain", group: "core" },
      { id: "app-web", label: "Web-App", group: "apps" },
    ];
    const neighbors = neighborsOf(
      "pkg-api",
      nodes,
      [
        { source: "pkg-api", target: "pkg-domain", label: "übersetzt" },
        { source: "app-web", target: "pkg-api", label: "ruft" },
      ],
    );
    expect(neighbors).toEqual([
      {
        id: "pkg-domain",
        label: "Domain",
        linkLabel: "übersetzt",
        direction: "out",
      },
      {
        id: "app-web",
        label: "Web-App",
        linkLabel: "ruft",
        direction: "in",
      },
    ]);
  });
});
