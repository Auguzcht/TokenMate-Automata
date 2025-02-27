export const savePositions = (nodes) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const positions = {};
    nodes.forEach(node => {
      positions[node.id] = {
        id: node.data.id,
        name: node.data.name,
        x: Math.round(node.position.x),
        y: Math.round(node.position.y),
        ...(node.data.type && { type: node.data.type }),
        label: node.data.label
      };
    });

    const automatonPath = path.join(__dirname, 'automatonDefinition.js');
    const content = fs.readFileSync(automatonPath, 'utf8');
    
    const updatedContent = content.replace(
      /states: {[\s\S]*?},\s*transitions/,
      `states: ${JSON.stringify(positions, null, 2)},\n\n    transitions`
    );

    fs.writeFileSync(automatonPath, updatedContent);
    return true;
  } catch (error) {
    console.error('Failed to save positions:', error);
    return false;
  }
};