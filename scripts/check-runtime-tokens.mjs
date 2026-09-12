import { readFile } from "node:fs/promises"

const [generated, runtime] = await Promise.all([
  readFile("src/design-theme.css", "utf8"),
  readFile("src/index.css", "utf8"),
])

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function readToken(source, name) {
  const match = source.match(new RegExp(`${escapeRegExp(name)}\\s*:\\s*([^;]+);`))
  return match?.[1]?.trim().toLowerCase()
}

const colorMappings = [
  ["--color-primary", "--brand"],
  ["--color-primary-hover", "--brand-hover"],
  ["--color-secondary", "--muted-foreground"],
  ["--color-background", "--paper"],
  ["--color-surface", "--canvas"],
  ["--color-sidebar", "--sidebar"],
  ["--color-text", "--ink"],
  ["--color-text-secondary", "--muted-foreground"],
  ["--color-on-primary", "--brand-ink"],
  ["--color-success", "--success"],
  ["--color-info", "--info"],
  ["--color-warning", "--warning"],
  ["--color-danger", "--danger"],
  ["--color-light", "--light"],
  ["--color-dark", "--dark"],
]
const radiusMappings = [
  ["--radius-sm", "0.375rem"],
  ["--radius-md", "0.5rem"],
  ["--radius-lg", "0.75rem"],
  ["--radius-xl", "1rem"],
]
const failures = []

for (const [generatedName, runtimeName] of colorMappings) {
  const expected = readToken(generated, generatedName)
  const actual = readToken(runtime, runtimeName)
  if (!expected || !actual || expected !== actual) {
    failures.push(`${runtimeName}: expected ${expected ?? "missing"}, found ${actual ?? "missing"}`)
  }
}

for (const [name, expected] of radiusMappings) {
  const actual = readToken(runtime, name)
  if (actual !== expected) {
    failures.push(`${name}: expected ${expected}, found ${actual ?? "missing"}`)
  }
}

if (failures.length > 0) {
  console.error("Runtime design token drift detected:")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Runtime design tokens verified (${colorMappings.length} color mappings, ${radiusMappings.length} radii).`)
