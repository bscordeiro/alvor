interface ShowcaseSection {
  id: string
  label: string
  hint: string
}

const SHOWCASE_SECTIONS: ShowcaseSection[] = [
  { id: "buttons", label: "Buttons", hint: "Showcase" },
  { id: "typography", label: "Typography", hint: "Showcase" },
  { id: "tables", label: "Tables", hint: "Showcase" },
  { id: "forms", label: "Forms", hint: "Showcase" },
  { id: "tabs-accordion", label: "Tabs & Accordion", hint: "Showcase" },
  { id: "indicators", label: "Indicators", hint: "Showcase" },
  { id: "cards", label: "Cards", hint: "Showcase" },
  { id: "dialog", label: "Dialog", hint: "Showcase" },
  { id: "semantic-roles", label: "Semantic roles", hint: "Showcase" },
  { id: "navigation", label: "Navigation", hint: "Showcase" },
  { id: "overlays", label: "Overlays", hint: "Showcase" },
  { id: "list-groups", label: "List groups", hint: "Showcase" },
  { id: "async-states", label: "Async states", hint: "Showcase" },
  { id: "data-table", label: "Data table", hint: "Showcase" },
  { id: "account", label: "Account", hint: "Showcase" },
  { id: "toasts", label: "Toasts", hint: "Showcase" },
]

export { SHOWCASE_SECTIONS }
export type { ShowcaseSection }
