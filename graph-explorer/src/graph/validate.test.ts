import { describe, expect, it } from "vitest";
import datamodel from "../../../examples/datamodel-graph.json";
import dependency from "../../../examples/dependency-graph.json";
import domain from "../../../examples/domain-graph.json";
import pipeline from "../../../examples/pipeline-graph.json";
import team from "../../../examples/team-graph.json";
import type { GraphDataset } from "./types";
import { validateDataset } from "./validate";

const examples: GraphDataset[] = [
  dependency,
  team,
  domain,
  datamodel,
  pipeline,
] as GraphDataset[];

describe("validateDataset", () => {
  it("accepts all five shipped example datasets", () => {
    expect(examples).toHaveLength(5);
    for (const dataset of examples) {
      const result = validateDataset(dataset);
      expect(result.ok, dataset.id).toBe(true);
      expect(result.issues, dataset.id).toEqual([]);
      const ids = dataset.nodes.map((node) => node.id);
      expect(new Set(ids).size, dataset.id).toBe(ids.length);
      for (const link of dataset.links) {
        expect(ids, `${dataset.id} source ${link.source}`).toContain(
          link.source,
        );
        expect(ids, `${dataset.id} target ${link.target}`).toContain(
          link.target,
        );
      }
    }
  });

  it("rejects duplicate ids and missing endpoints", () => {
    const broken: GraphDataset = {
      id: "broken",
      title: "Broken",
      description: "",
      nodes: [
        { id: "a", label: "A", group: "g" },
        { id: "a", label: "A2", group: "g" },
      ],
      links: [{ source: "a", target: "missing" }],
    };
    const result = validateDataset(broken);
    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.code === "duplicate-id")).toBe(
      true,
    );
    expect(
      result.issues.some((issue) => issue.code === "missing-endpoint"),
    ).toBe(true);
  });
});
