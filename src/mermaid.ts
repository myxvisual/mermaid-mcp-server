import fs from 'fs';
import path from 'path';

export function about() {
    return (
        `Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired text definitions and a renderer to create and modify complex diagrams. The main purpose of Mermaid is to help documentation catch up with development.

Diagramming and documentation costs precious developer time and gets outdated quickly. But not having diagrams or docs ruins productivity and hurts organizational learning.
Mermaid addresses this problem by enabling users to create easily modifiable diagrams. It can also be made part of production scripts (and other pieces of code).`
    );
}

export function listDiagrams() {
    // @ref https://github.com/mermaid-js/mermaid/blob/797ba43d6e63af44538390b93b3674302c5ed545/packages/mermaid/src/docs/.vitepress/config.ts#L151
    const items = [
        { type: 'flowchart', name: 'Flowchart', example: '/syntax/flowchart' },
        { type: 'sequenceDiagram', name: 'Sequence Diagram', example: '/syntax/sequenceDiagram' },
        { type: 'classDiagram', name: 'Class Diagram', example: '/syntax/classDiagram' },
        { type: 'stateDiagram', name: 'State Diagram', example: '/syntax/stateDiagram' },
        {
            type: 'entityRelationshipDiagram',
            name: 'Entity Relationship Diagram',
            example: '/syntax/entityRelationshipDiagram',
        },
        { type: 'userJourney', name: 'User Journey', example: '/syntax/userJourney' },
        { type: 'gantt', name: 'Gantt', example: '/syntax/gantt' },
        { type: 'pie', name: 'Pie Chart', example: '/syntax/pie' },
        { type: 'quadrantChart', name: 'Quadrant Chart', example: '/syntax/quadrantChart' },
        { type: 'requirementDiagram', name: 'Requirement Diagram', example: '/syntax/requirementDiagram' },
        { type: 'gitgraph', name: 'GitGraph (Git) Diagram', example: '/syntax/gitgraph' },
        { type: 'c4', name: 'C4 Diagram', example: '/syntax/c4' },
        { type: 'mindmap', name: 'Mindmaps', example: '/syntax/mindmap' },
        { type: 'timeline', name: 'Timeline', example: '/syntax/timeline' },
        { type: 'zenuml', name: 'ZenUML', example: '/syntax/zenuml' },
        { type: 'sankey', name: 'Sankey', example: '/syntax/sankey' },
        { type: 'xyChart', name: 'XY Chart', example: '/syntax/xyChart' },
        { type: 'block', name: 'Block Diagram', example: '/syntax/block' },
        { type: 'packet', name: 'Packet', example: '/syntax/packet' },
        { type: 'kanban', name: 'Kanban', example: '/syntax/kanban' },
        { type: 'radar', name: 'Radar', example: '/syntax/radar' },
    ];

    return items.map((item) => {
        return {
            ...item,
            description: `More Details about ${item?.name}, see examples below.`,
        };
    });
}

export function getDiagram(type: string) {
    const diagrams = listDiagrams();
    const diagram = diagrams.find((d) => d.type === type) ?? null;

    return diagram;
}

export function getDiagramExamples(type: string) {
    const diagram = getDiagram(type);
    if (!diagram) {
        return '';
    }

    const examples = fs.readFileSync(path.join(process.cwd(), `./${diagram.example}.md`), 'utf-8');

    return examples ?? '';
}
