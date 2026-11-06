# Feature lifecycle notices

How to mark a page or a section as technology preview or deprecated.

Technology preview and deprecation notices are rendered by one component, so the wording is the same on every page.
Don't write the admonition by hand.

## Whole page

When a page is about the feature, declare it in the front matter and write nothing in the body:

```yaml
---
description: ...
lifecycle_status: tech-preview
lifecycle_feature: Gateway WAF
lifecycle_id: gateway-waf
---
```

- `lifecycle_status` is `tech-preview` or `deprecated`.
  There is no value for generally available: a GA feature says nothing.
- `lifecycle_feature` is the name shown in the notice title.
  Omit it when the page title already names the feature unambiguously.
- `lifecycle_id` is the matching `id` in `data/feature-status.yaml`.
  It is optional, but supply it when the feature has an entry, because it is what lets CI catch a notice that outlived the status it describes.
  Nothing is rendered from it.

`src/remark/lifecycleNoticePlugin.js` places the notice directly after the page's H1.
A page that declares a status but has no H1 fails the build.
So does a misspelled key such as `lifecycle-status`, or a `lifecycle_feature` or `lifecycle_id` without `lifecycle_status`.

Don't use `$[variables]` in these front matter fields.
Substitution there is not reliable: it happens only because the notice is inserted before the variables plugin runs, and that plugin does not wait for its own replacements to finish.
Write the product name out instead.

## Part of a page

When only one section of an otherwise generally available page is affected, or when the notice needs extra guidance such as what to migrate to, place the component yourself:

```mdx
### Selector-scoped configuration

<LifecycleNotice
  status='tech-preview'
  feature='Selector-scoped Felix configuration'
  id='selector-scoped-felix-config'
/>
```

```mdx
<LifecycleNotice status='deprecated' feature='Application layer policy' id='application-layer-policy-envoy'>
  For similar functionality, use [Istio ambient mode](../../compliance/istio/about-istio-ambient.mdx).
</LifecycleNotice>
```

The component is registered globally in `src/theme/MDXComponents.js`, so no import is needed.

## When a feature's status changes

Update `data/feature-status.yaml`, which drives the release notes tables, and update or remove the notice on the feature's pages in the same change.
`yarn test:components` fails when a page and the data file disagree, so the two cannot drift apart silently.
