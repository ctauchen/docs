import React from 'react';

const TableCRD = ({ fieldData }) => (
  <table>
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>Key</td>
      <td><code>{fieldData.NameYAML || 'No Default Value'}</code></td>
      </tr>
      <tr>
        <td>Description</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.DescriptionHTML }} />
      </tr>
      <tr>
        <td>Schema</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.YAMLSchemaHTML }} />
      </tr>
      <tr>
        <td>Default</td>
        <td>
                    {fieldData.YAMLDefault === '' ? (
                      'none'
                    ) : (
                      <code>{fieldData.YAMLDefault}</code>
                    )}
                  </td>
      </tr>
    </tbody>
  </table>
);

const TableConfig = ({ fieldData }) => (
  <table>
    <thead>
      <tr>
        <th>AttributeConfig</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>Key</td>
      <td><code>{fieldData.NameConfigFile || 'No Default Value'}</code></td>
      </tr>
      <tr>
        <td>Description</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.DescriptionHTML }} />
      </tr>
      <tr>
        <td>Schema</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.StringSchemaHTML }} />
      </tr>
      <tr>
        <td>Default</td>
        <td>
                    {fieldData.YAMLDefault === '' ? (
                      'none'
                    ) : (
                      <code>{fieldData.YAMLDefault}</code>
                    )}
                  </td>
      </tr>
    </tbody>
  </table>
);

const TableEnv = ({ fieldData }) => (
  <table>
    <thead>
      <tr>
        <th>AttributeEnv</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>Key</td>
      <td><code>{fieldData.NameEnvVar.toUpperCase() || 'No Default Value'}</code></td>
      </tr>
      <tr>
        <td>Description</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.DescriptionHTML }} />
      </tr>
      <tr>
        <td>Schema</td>
        <td dangerouslySetInnerHTML={{ __html: fieldData.StringSchemaHTML }} />
      </tr>
      <tr>
        <td>Default</td>
        <td>
                    {fieldData.StringDefault === '' ? (
                      'none'
                    ) : fieldData.GoType === '*v1.Duration' ? (
                      <>
                        <code>{fieldData.StringDefault}</code> ({fieldData.ParsedDefault})
                      </>
                    ): (
                      <code>{fieldData.StringDefault}</code>
                    )}
                  </td>
      </tr>
    </tbody>
  </table>
);

function FelixConfigTable({ configType, fieldData }) {
  let table;


  // Determine which table to render based on the configType
  switch (configType) {
    case 'yaml':
      table = <TableCRD fieldData={fieldData} />;
      break;
    case 'config':
      table = <TableConfig fieldData={fieldData} />;
      break;
    case 'env':
      table = <TableEnv fieldData={fieldData} />;
      break;
    default:
      table = <p>Unknown config type</p>;
  }

  return (
    <div>
      {table}
    </div>
  );
}

export default FelixConfigTable;
