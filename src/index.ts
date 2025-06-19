#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { type ServerResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import z from "zod";
import * as mermaid from "./mermaid.js";

const server = new Server(
  {
    name: "mermaid-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "about",
        description: "About Mermaid",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        },
      },
      {
        name: "list_diagrams",
        description: "List available diagrams",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        },
      },
      {
        name: "get_diagram",
        description: "Get information about a diagram",
        inputSchema: {
          type: "object",
          properties: {
            diagramType: {
              type: "string",
              description: "Type of the diagram",
              enum: mermaid.listDiagrams().map(t => t.type),
              enumNames: mermaid.listDiagrams().map(t => t.name),
            }
          },
          required: ["diagramType"]
        },
      },
      {
        name: "get_diagram_examples",
        description: "Get examples of a diagram",
        inputSchema: {
          type: "object",
          properties: {
            diagramType: {
              type: "string",
              description: "Type of the diagram",
              enum: mermaid.listDiagrams().map(t => t.type),
              enumNames: mermaid.listDiagrams().map(t => t.name),
            }
          },
          required: ["diagramType"]
        },
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const diagramType = String(request.params?.arguments?.diagramType);
  switch (request.params.name) {
    case "about": {
      return {
        content: [{
          type: "text",
          text: mermaid.about(),
        }]
      };
    }
    case "list_diagrams": {
      const diagrams = mermaid.listDiagrams();
      if (!diagrams) {
        throw new Error("No diagrams found");
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(diagrams),
        }]
      };
    }

    case "get_diagram": {
      const diagram = mermaid.getDiagram(diagramType);
      if (!diagram) {
        throw new Error("No diagram found");
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(diagram),
        }]
      };
    }

    case "get_diagram_examples": {
      const examples = mermaid.getDiagramExamples(diagramType);
      if (!examples) {
        throw new Error("No examples found");
      }

      return {
        content: [{
          type: "text",
          text: examples,
        }]
      };
    }
    default:
      throw new Error("Unknown tool");
  }
});


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
