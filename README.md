# mermaid-mcp-server MCP Server

Mermaid diagram information MCP server

This is a TypeScript-based MCP server that provides access to Mermaid diagram information via the Model Context Protocol (MCP). It exposes tools to discover and retrieve details about various Mermaid diagram types.
## Tools
- `about`: Provides a general description of Mermaid.
- `list_diagrams`: Lists all available Mermaid diagram types with their names and types.
- `get_diagram`: Get detailed information about a specific diagram type.
  - Parameters: `diagramType` (string, required) - The type of the diagram (e.g., "flowchart", "sequenceDiagram").
- `get_diagram_examples`: Get example syntax for a specific diagram type.
  - Parameters: `diagramType` (string, required) - The type of the diagram (e.g., "flowchart", "sequenceDiagram").

## Development
