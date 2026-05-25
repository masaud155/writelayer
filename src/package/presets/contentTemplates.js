export const contentTemplates = {
  blog: [
    {
      id: "blog-intro",
      title: "Blog intro",
      description: "Headline, hook, and opening paragraph",
      category: "Writing",
      content: "<h2>Start with the reader's problem</h2><p>Open with the situation your audience recognizes, then promise the useful outcome they will get by the end.</p>",
    },
    {
      id: "blog-cta",
      title: "CTA section",
      description: "Conversion block for articles",
      category: "Marketing",
      content: "<div data-callout=\"success\"><h3>Ready to put this into practice?</h3><p>Turn the ideas above into a workflow your team can reuse.</p></div>",
    },
    {
      id: "blog-faq",
      title: "FAQ section",
      description: "Three question starter",
      category: "SEO",
      content: "<h2>Frequently asked questions</h2><h3>What should I know first?</h3><p>Answer the common concern clearly.</p><h3>How long does it take?</h3><p>Set a realistic expectation.</p><h3>What should I do next?</h3><p>Point readers to the next action.</p>",
    },
  ],
  cms: [
    {
      id: "cms-feature-grid",
      title: "Feature grid",
      description: "Structured marketing content",
      category: "CMS",
      content: "<h2>Key features</h2><ul><li><p><strong>Fast setup:</strong> Add the field to any form.</p></li><li><p><strong>Clean output:</strong> Export HTML, Markdown, JSON, or text.</p></li><li><p><strong>Customizable UI:</strong> Use presets, themes, and plugins.</p></li></ul>",
    },
    {
      id: "cms-product-specs",
      title: "Product specs",
      description: "Comparison table starter",
      category: "Commerce",
      content: "<h2>Specifications</h2><table><tbody><tr><th>Attribute</th><th>Detail</th></tr><tr><td>Material</td><td>Premium finish</td></tr><tr><td>Dimensions</td><td>Add exact measurements</td></tr><tr><td>Warranty</td><td>Add coverage terms</td></tr></tbody></table>",
    },
  ],
  email: [
    {
      id: "email-campaign",
      title: "Campaign opener",
      description: "Subject-style heading and body",
      category: "Email",
      content: "<h2>Your next update is ready</h2><p>Hi there,</p><p>Here is the short, useful version of what changed and why it matters.</p><p><strong>Primary action:</strong> Add your email-safe button in your app template.</p>",
    },
  ],
  docs: [
    {
      id: "docs-api-section",
      title: "API section",
      description: "Endpoint docs starter",
      category: "Documentation",
      content: "<h2>API reference</h2><p>Use this section to explain the endpoint, required parameters, and response behavior.</p><pre><code>GET /api/resource</code></pre><div data-callout=\"info\"><p>Include authentication and rate-limit notes here.</p></div>",
    },
    {
      id: "docs-warning",
      title: "Warning callout",
      description: "Important implementation note",
      category: "Documentation",
      content: "<div data-callout=\"warning\"><p><strong>Important:</strong> Test this behavior in a staging environment before enabling it in production.</p></div>",
    },
  ],
  comment: [
    {
      id: "comment-support",
      title: "Support reply",
      description: "Polite triage response",
      category: "Support",
      content: "<p>Thanks for the details. I can reproduce the issue and will check the relevant flow next.</p>",
    },
  ],
  minimal: [
    {
      id: "minimal-bio",
      title: "Profile bio",
      description: "Short bio starter",
      category: "Profile",
      content: "<p>Product-focused builder with a preference for clear systems, thoughtful UI, and practical execution.</p>",
    },
  ],
};

export function getTemplatesForPreset(preset) {
  if (!preset) return [];
  if (typeof preset === "object") return preset.contentTemplates || [];
  return contentTemplates[preset] || [];
}
