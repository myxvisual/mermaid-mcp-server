import fs from 'fs';
import path from 'path';

export function gerDirname() {
    // __dirname is not available in ES modules, so we use import.meta.url
    return path.dirname(new URL(import.meta.url).pathname);
}

export function readme() {
    return (
        `Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired text definitions and a renderer to create and modify complex diagrams. The main purpose of Mermaid is to help documentation catch up with development.

Diagramming and documentation costs precious developer time and gets outdated quickly. But not having diagrams or docs ruins productivity and hurts organizational learning.
Mermaid addresses this problem by enabling users to create easily modifiable diagrams. It can also be made part of production scripts (and other pieces of code).`
    );
}

export function listDiagrams() {
    // @ref https://github.com/mermaid-js/mermaid/blob/797ba43d6e63af44538390b93b3674302c5ed545/packages/mermaid/src/docs/.vitepress/config.ts#L151
    const items = [
        { type: 'flowchart', name: 'Flowchart', example: '/syntax/flowchart', description: 'A Gantt chart is a type of bar chart, first developed by Karol Adamiecki in 1896, and independently by Henry Gantt in the 1910s, that illustrates a project schedule and the amount of time it would take for any one project to finish. Gantt charts illustrate number of days between the start and finish dates of the terminal elements and summary elements of a project.' },
        { type: 'sequenceDiagram', name: 'Sequence Diagram', example: '/syntax/sequenceDiagram', description: "A Sequence diagram is an interaction diagram that shows how processes operate with one another and in what order." },
        { type: 'classDiagram', name: 'Class Diagram', example: '/syntax/classDiagram', description: "In software engineering, a class diagram in the Unified Modeling Language (UML) is a type of static structure diagram that describes the structure of a system by showing the system's classes, their attributes, operations (or methods), and the relationships among objects." },
        { type: 'stateDiagram', name: 'State Diagram', example: '/syntax/stateDiagram', description: "A state diagram is a type of diagram used in computer science and related fields to describe the behavior of systems. State diagrams require that the system described is composed of a finite number of states; sometimes, this is indeed the case, while at other times this is a reasonable abstraction." },
        {
            type: 'entityRelationshipDiagram',
            name: 'Entity Relationship Diagram',
            example: '/syntax/entityRelationshipDiagram',
            description: "An entity–relationship model (or ER model) describes interrelated things of interest in a specific domain of knowledge. A basic ER model is composed of entity types (which classify the things of interest) and specifies relationships that can exist between entities (instances of those entity types)."
        },
        { type: 'userJourney', name: 'User Journey', example: '/syntax/userJourney', description: "A User Journey map is a visualization of the process that a person goes through in order to accomplish a goal, typically in the context of a product or service." },
        { type: 'gantt', name: 'Gantt', example: '/syntax/gantt', description: "A Gantt chart is a type of bar chart that illustrates a project schedule. It shows the start and finish dates of the terminal elements and summary elements of a project." },
        { type: 'pie', name: 'Pie Chart', example: '/syntax/pie', description: "A pie chart (or a circle chart) is a circular statistical graphic, which is divided into slices to illustrate numerical proportion." },
        { type: 'quadrantChart', name: 'Quadrant Chart', example: '/syntax/quadrantChart', description: "A quadrant chart is a visual representation of data that is divided into four quadrants, used to plot data points on a two-dimensional grid." },
        { type: 'requirementDiagram', name: 'Requirement Diagram', example: '/syntax/requirementDiagram', description: "A Requirement diagram provides a visualization for requirements and their connections, to each other and other documented elements. The modeling specs follow those defined by SysML v1.6." },
        { type: 'gitgraph', name: 'GitGraph (Git) Diagram', example: '/syntax/gitgraph', description: "A Git Graph is a pictorial representation of git commits and git actions(commands) on various branches." },
        { type: 'c4', name: 'C4 Diagram', example: '/syntax/c4', description: "The C4 model is a lean graphical notation technique for modelling the architecture of software systems. It provides a way to describe a system at different levels of detail." },
        { type: 'mindmap', name: 'Mindmaps', example: '/syntax/mindmap', description: "A mind map is a diagram used to visually organize information into a hierarchy, showing relationships among pieces of the whole." },
        { type: 'timeline', name: 'Timeline', example: '/syntax/timeline', description: "A timeline is a type of chart which visually shows a series of events in chronological order over a linear timescale." },
        { type: 'zenuml', name: 'ZenUML', example: '/syntax/zenuml', description: "ZenUML is a Domain Specific Language (DSL) for generating sequence diagrams from text, focusing on interactions between participants." },
        { type: 'sankey', name: 'Sankey', example: '/syntax/sankey', description: "A sankey diagram is a visualization used to depict a flow from one set of values to another, where the width of the arrows is proportional to the flow quantity." },
        { type: 'xyChart', name: 'XY Chart', example: '/syntax/xyChart', description: "An XY chart, also known as a scatter plot or XY graph, is a two-dimensional chart that shows the relationship between two variables." },
        { type: 'block', name: 'Block Diagram', example: '/syntax/block', description: "Block diagrams are an intuitive and efficient way to represent complex systems, processes, or architectures visually using blocks and connectors." },
        { type: 'packet', name: 'Packet', example: '/syntax/packet', description: "A packet diagram is a visual representation used to illustrate the structure and contents of a network packet." },
        { type: 'kanban', name: 'Kanban', example: '/syntax/kanban', description: "A Kanban diagram allows you to create visual representations of tasks moving through different stages of a workflow." },
        { type: 'radar', name: 'Radar', example: '/syntax/radar', description: "A radar diagram (also known as spider chart or star chart) is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point." },
    ];

    return items;
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

    const examples = fs.readFileSync(path.join(gerDirname(), `../${diagram.example}.md`), 'utf-8');

    return examples ?? '';
}

export function getDiagramTypes() {
    return listDiagrams().map((d) => d.type);
}
