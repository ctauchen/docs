import React, { useState, useEffect } from 'react';
import jsonData from './file.json';
import FelixConfigTable from '../FelixConfigTable';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


const FelixConfig = ({ configType, name }) => {
  const matchedGroup = jsonData.Groups.find(group => group.Name === name);
  // Debugging logs

  if (!matchedGroup) {
    return <p>No matching group found for '{name}'.</p>;
  } 


  let content;

  if (configType === "yaml") {
    content = (
      <div>
        {matchedGroup.Fields.map((field, index) => (
          <div key={index}>
            <h5><code>{field.NameYAML}</code></h5>
            <FelixConfigTable configType="yaml" fieldData={field} />
          </div>
        ))}
      </div>
    );

  } else if (configType === "configenv") {
    content = (
      <div>
        {matchedGroup.Fields.map((field, index) => (
          <div key={index}>
            <h4><code>{field.NameConfigFile}</code></h4>
        <Tabs groupId="operating-systems">
          <TabItem value="apple" label="Configuration file">
             <FelixConfigTable configType='config' fieldData={field}/>
          </TabItem>
          <TabItem value="orange" label="Environment variable">
            <FelixConfigTable configType='env' fieldData={field}/>
          </TabItem>
        </Tabs>
        </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div>
        <p>You got it wrong</p>
      </div>
    );
  };
    return (
      <div>
        {content}
      </div>
    );
  };

export default FelixConfig;
