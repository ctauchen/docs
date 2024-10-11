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
        Array.isArray(group.Fields) && group.Fields.length > 0 ? (
          group.Fields.map((field, index) => (
            <div key={index}>
              <h5><code>{field.NameYAML}</code></h5>
              <p dangerouslySetInnerHTML={{ __html: field.DescriptionHTML }} />
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
                  <td dangerouslySetInnerHTML={{ __html: field.StringSchemaHTML }} />
                </tr>
                <tr>
                  <td>Default</td>
                  <td>
                    {field.StringDefault === "" ? (
                      "none"
                    ) : field.GoType === '*v1.Duration' ? (
                      <>
                        <code>{field.StringDefault}</code> (<code>{field.ParsedDefault}</code>)
                      </>
                    ) : (
                      <code>{field.StringDefault}</code>
                    )}
                  </td>
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
