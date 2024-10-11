import React, { useState, useEffect } from 'react';
import jsonData from './file.json';

const FelixConfig = ({ name }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Find the group that matches the passed 'name' prop
    const matchedGroup = jsonData.Groups.find(
      (group) => group.Name === name
    );

    // Set the matched group to state
    if (matchedGroup) {
      setGroup(matchedGroup);
    } else {
      setGroup(null);
    }
  }, [name]);

  return (
    <div>
      {group ? (
        // Ensure 'Fields' is defined and an array before mapping
        Array.isArray(group.Fields) && group.Fields.length > 0 ? (
          group.Fields.map((field, index) => (
            <div key={index}>
              <h5><code>{field.NameYAML}</code></h5>
              <p>{field.Description}</p>

              {/* Render a markdown-like table with hardcoded values */}
              <table>
                <thead>
                <tr>
                  <th>Description</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Schema</td>
                  <td>{field.StringSchema}</td>
                </tr>
                <tr>
                  <td>StringDefault</td>
                  <td><code>{field.StringDefault}</code></td>
                </tr>
                <tr>
                  <td>StringParsed</td>
                  <td><code>{field.StringParsed}</code></td>
                </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No fields found in the group.</p>
        )
      ) : (
        <p>No matching group found for '{name}'.</p>
      )}
    </div>
  );
};

export default FelixConfig;
