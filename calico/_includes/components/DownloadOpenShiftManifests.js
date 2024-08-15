import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import variables from '../../variables';

export default function DownloadOpenShiftManifests() {
  const { prodname, releaseTitle, calicoReleasesURL } = variables;
  
  return (
    <>
      <p>Download the {prodname} manifests for OpenShift:</p>
      <CodeBlock id='data-download-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${calicoReleasesURL}/${releaseTitle}/ocp.tgz | tar xvz --strip-components=1 -C calico`}
      </CodeBlock>
    </>
  );
}
