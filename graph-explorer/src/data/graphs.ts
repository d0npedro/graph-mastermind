import datamodel from "../../../examples/datamodel-graph.json";
import dependency from "../../../examples/dependency-graph.json";
import domain from "../../../examples/domain-graph.json";
import project from "../../../examples/graph-mastermind.json";
import pipeline from "../../../examples/pipeline-graph.json";
import team from "../../../examples/team-graph.json";
import type { GraphDataset } from "../graph/types";
import { validateDataset } from "../graph/validate";

export const datasets: GraphDataset[] = [
  project,
  dependency,
  team,
  domain,
  datamodel,
  pipeline,
] as GraphDataset[];

for (const dataset of datasets) {
  const result = validateDataset(dataset);
  if (!result.ok) {
    throw new Error(
      `Invalid dataset ${dataset.id}: ${result.issues.map((i) => i.message).join("; ")}`,
    );
  }
}

export function datasetById(id: string): GraphDataset {
  return datasets.find((dataset) => dataset.id === id) ?? datasets[0];
}
