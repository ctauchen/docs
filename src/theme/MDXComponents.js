import React from 'react';

import MDXComponents from '@theme-original/MDXComponents';
import GeekDetails from '@site/src/components/partials/geek-details';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

const wrap = (Partial) => (props) => {
  return (
    <div className='docs-partial'>
      <Partial {...props} />
    </div>
  );
};

const resolveComponent = (componentName) => {
  return (props) => {
    const { pathname } = useLocation();
    const context = useDocusaurusContext();

    const [, prodnamedash, maybeVersion] = pathname.match(/\/(.*?)\/(.*?)\//);
    const [, ...versions] = context.globalData['docusaurus-plugin-content-docs'][prodnamedash].versions;

    let Component = () => '';
    const isNext = maybeVersion === 'next';
    if (isNext) {
      Component = require(`@site/${prodnamedash}/_includes/components/${componentName}`).default;
    } else {
      const isLatest = !versions.some((v) => v.name === maybeVersion);
      const version = isLatest ? versions.find((v) => v.isLast).name : maybeVersion;
      Component =
        require(`@site/${prodnamedash}_versioned_docs/version-${version}/_includes/components/${componentName}`).default;
    }

    return <Component {...props} />;
  };
};

export default {
  // Re-use the default mapping
  ...MDXComponents,

  // all of our partials
  GeekDetails: wrap(GeekDetails),
  ReqsSys: wrap(resolveComponent('ReqsSys')),
  ReqsKernel: wrap(resolveComponent('ReqsKernel')),
  HostEndpointsUpgrade: wrap(resolveComponent('HostEndpointsUpgrade')),
  InstallOpenshiftBeforeYouBegin: wrap(resolveComponent('InstallOpenshiftBeforeYouBegin')),
  CalicoWindowsInstall: wrap(resolveComponent('CalicoWindowsInstall')),
  PodCidrSed: wrap(resolveComponent('PodCidrSed')),
  EnvironmentFile: wrap(resolveComponent('EnvironmentFile')),
  AutoHostendpointsMigrate: wrap(resolveComponent('AutoHostendpointsMigrate')),
  ConfigureManagedCluster: wrap(resolveComponent('ConfigureManagedCluster')),
  InstallAKS: wrap(resolveComponent('InstallAKS')),
  InstallEKS: wrap(resolveComponent('InstallEKS')),
  InstallGeneric: wrap(resolveComponent('InstallGeneric')),
  InstallGKE: wrap(resolveComponent('InstallGKE')),
  PrivateRegistryRegular: wrap(resolveComponent('PrivateRegistryRegular')),
  UpgradeOperatorSimple: wrap(resolveComponent('UpgradeOperatorSimple')),
  InstallOpenShift: wrap(resolveComponent('InstallOpenShift')),
  InstallOpenShiftManifests: wrap(resolveComponent('InstallOpenShiftManifests')),
  OpenShiftPullSecret: wrap(resolveComponent('OpenShiftPullSecret')),
  OpenShiftPrometheusOperator: wrap(resolveComponent('OpenShiftPrometheusOperator')),
  ReleaseNotes: wrap(resolveComponent('ReleaseNotes')),
  CliConfigIntro: wrap(resolveComponent('CliConfigIntro')),
};
