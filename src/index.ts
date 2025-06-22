#!/usr/bin/env node
import { McpServer }  from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import * as mermaid from "./mermaid.js";

const server = new McpServer(
  {
    name: "mermaid-mcp-server",
    title: "Mermaid diagram MCP server",
    version: "1.0.7",
  },
);

server.registerTool("readme",
  {
    title: "Readme",
    description: "about this tool",
  },

  async () => ({
    content: [{ type: "text", text: mermaid.readme() }]
  }),
);

server.registerTool("list_diagrams",
  {
    title: "List Diagrams",
    description: "list available diagrams, if want to create a diagram, must use the `get_diagram` abd `get_diagram_examples` tools to learn about the diagram",
  },
  async () => ({
    content: [{ type: "text", text: JSON.stringify(mermaid.listDiagrams()) }]
  }),
);

server.registerTool("get_diagram",
  {
    title: "Get Diagram",
    description: "get diagram of a type, if want to create a diagram, must use the `get_diagram_examples` tool to see examples",
    inputSchema: {
      diagramType: z.enum(mermaid.getDiagramTypes() as [string]),
    },
  },
  async (args: { diagramType: string }) => {
    const diagram = mermaid.getDiagram(args.diagramType);
    if (!diagram) {
      throw new Error("No diagram found");
    }
    return {
      content: [{ type: "text", text: JSON.stringify(diagram) }]
    };
  },
);

server.registerTool("get_diagram_examples",
  {
    title: "Get Diagram Examples",
    description: "get examples of a diagram",
    inputSchema: {
      diagramType: z.enum(mermaid.getDiagramTypes() as [string]),
    },
  },
  async (args: { diagramType: string }) => {
    const examples = mermaid.getDiagramExamples(args.diagramType);
    return {
      content: [{ type: "text", text: examples }]
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
