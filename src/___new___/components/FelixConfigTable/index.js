import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';
// Importing the actual JSON data
import configData from '../FelixConfig/file.json';

function FelixConfigTable({ type, field }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {type === 'YAML' ? (
          <>
            <tr>
              <td>Key name</td>
              <td>{field.NameYAML}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td dangerouslySetInnerHTML={{ __html: field.DescriptionHTML }} />
            </tr>
            <tr>
              <td>Schema</td>
              <td dangerouslySetInnerHTML={{ __html: field.YAMLSchemaHTML }} />
            </tr>
            <tr>
              <td>Default</td>
              <td>{field.YAMLDefault}</td>
            </tr>
          </>
        ) : type === 'ConfigEnv' ? (
          <>
            <tr>
              <td>Key name</td>
              <td>{field.NameConfigFile}</td>
            </tr>
            <tr>
              <td>Environment Variable</td>
              <td>{field.NameEnvVar}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td dangerouslySetInnerHTML={{ __html: field.DescriptionHTML }} />
            </tr>
            <tr>
              <td>Schema</td>
              <td dangerouslySetInnerHTML={{ __html: field.StringSchemaHTML }} />
            </tr>
            <tr>
              <td>Default</td>
              <td>{field.StringDefault}</td>
            </tr>
          </>
        ) : (
          <tr>
            <td colSpan="2">Invalid type</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function FelixConfig({ type, group }) {
  // Find the group by name from the JSON data
  const selectedGroup = configData.Groups.find(g => g.Name === group);

  if (!selectedGroup) {
    return <p>Group not found</p>;
  }

  return (
    <>
      <h2>Group: {group} ({type})</h2>
      {selectedGroup.Fields.map((field, index) => (
        <FelixConfigTable key={index} type={type} field={field} />
      ))}
    </>
  );
}

export default FelixConfig;
