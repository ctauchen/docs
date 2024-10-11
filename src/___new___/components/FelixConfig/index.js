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
              <h4><code>{field.NameConfigFile}</code></h4>
              <p>{field.Description}</p>

              {/* Render a markdown-like table with hardcoded values */}
              <table>
                <thead>
                <tr>
                  <th>thing1</th>
                  <th>thing2</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Placeholder A1</td>
                  <td>Placeholder B1</td>
                </tr>
                <tr>
                  <td>Placeholder A2</td>
                  <td>Placeholder B2</td>
                </tr>
                <tr>
                  <td>Placeholder A3</td>
                  <td>Placeholder B3</td>
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
