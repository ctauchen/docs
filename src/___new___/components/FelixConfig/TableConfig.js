import React from 'react';
import DOMPurify from 'dompurify';
import styles from './styles.module.css';

const getSanitizedData = ({ fieldData }) => ({
  sanitizedDescription: { __html: DOMPurify.sanitize(fieldData.DescriptionHTML) },
  sanitizedSchema: { __html: DOMPurify.sanitize(fieldData.StringSchemaHTML) },
});

const TableConfig = ({ fieldData }) => {
  const { sanitizedDescription, sanitizedSchema } = getSanitizedData({ fieldData });

  return (
    <table className={styles.felixTable}>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Key</td>
          <td>
            <code>{fieldData.NameConfigFile || 'No Default Value'}</code>
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td dangerouslySetInnerHTML={sanitizedDescription} />
        </tr>
        <tr>
          <td>Schema</td>
          <td dangerouslySetInnerHTML={sanitizedSchema} />
        </tr>
        <tr>
          <td>Default</td>
          <td>{fieldData.YAMLDefault === '' ? 'none' : <code>{fieldData.YAMLDefault}</code>}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableConfig;
