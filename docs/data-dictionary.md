# Data Dictionary

This document summarizes the main data structures managed by VisNeed across the Electron main process, filesystem persistence, and the React renderer.

## Persistent Tree Storage (`src/scripts/treeManager.js`)

### `TreeDocument`
| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `id` | number | Unique identifier generated with `Date.now()` when the tree is created. | Used as filename suffix (`tree_{id}.json`). |
| `name` | string | Display name provided when the tree is created. | Referenced as `projectName` in the renderer. |
| `dictionary` | `DictionaryEntry[]` | Shared vocabulary for predicates, outcomes, and actions. | May be empty. |
| `nodes` | `TreeNode[]` | Serialized decision tree nodes. | Starts empty on creation. |
| `lastModified` | ISO string | Timestamp updated on every save operation. | Added by `saveTreeData`. |

### `DictionaryEntry`
| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Semantic identifier referenced by predicates, actions, and outcomes. |
| `type` | `"string" \| "integer" \| "boolean"` | Declared data type for validation and display. |

### `TreeNode`
| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `id` | number | Node identifier unique within the tree. | Used for graph relationships. |
| `name` | string | Label rendered in the network view and node tables. |
| `connections` | `Connection[]` | Outgoing edges from the node. | May be empty. |
| `outcomes` | `Outcome[] \| "No outcome"` | Effects applied when the node is reached. | UI normalizes missing values to `"No outcome"`. |
| `visualization` | string (optional) | Legacy size flag from sample data. | Not mutated by current UI logic. |

### `Connection`
| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `name` | string | Human-readable identifier (`"{from}-{to}"`). |
| `targetId` | number | Destination node identifier. |
| `gate` | `Gate` | Guards and side effects for traversing the edge. |

### `Gate`
| Field | Type | Description |
| --- | --- | --- |
| `predicates` | `Predicate[] \| "No predicates"` | Conditions required to traverse the connection. |
| `actions` | `Action[] \| "No action"` | Side effects triggered when the connection fires. |

### `Predicate`
| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Dictionary key referenced in the condition. |
| `condition` | string | Comparison operator (`=`, `!=`, `<`, `>`, `<=`, `>=`). |
| `value` | string | Comparison value (stringified). |
| `logicalOperator` | `"" \| "AND" \| "OR"` | Chain operator if multiple predicates are combined. |

### `Action`
| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Dictionary key affected by the action. |
| `operator` | string | Mutation operator (`=`, `!=`, `<`, `>`, `<=`, `>=`, `+`, `-`). |
| `value` | string | Value applied by the action (stringified). |

### `Outcome`
| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Dictionary entry representing the outcome metric. |
| `operator` | string | Outcome operator (`=`, `!=`, `<`, `>`, `<=`, `>=`, `+`, `-`). |
| `value` | string | Outcome value (stringified). |

## Renderer Tree State (`src/renderer/pages/TreePage.jsx`)

### `TreeViewModel`
Derived via `TreeSidebarLeft.transformTreeData` and persisted through `window.treeAPI.saveTree`.

| Field | Type | Description |
| --- | --- | --- |
| `nodesArray` | `TreeNodeView[]` | Nodes used to populate the Vis Network view. |
| `edgesArray` | `EdgeView[]` | Flattened edges derived from node connections. |
| `dictionary` | `DictionaryEntry[]` | Mirrors `TreeDocument.dictionary`. |
| `projectName` | string | Alias for `TreeDocument.name`; shown in the UI header. |

### `TreeNodeView`
| Field | Type | Description |
| --- | --- | --- |
| `id` | number | Node id. |
| `name` | string | UI label. |
| `connections` | `ConnectionView[]` | Simplified connections with string fallbacks. |
| `outcomes` | `Outcome[] \| "No outcome"` | Same semantics as persistence model. |

### `ConnectionView`
| Field | Type | Description |
| --- | --- | --- |
| `name` | string | "{from}-{to}" identifier. |
| `targetId` | number | Destination node id. |
| `gate.predicates` | `Predicate[] \| "No predicates"` | Guard predicates for display. |
| `gate.actions` | `Action[] \| "No action"` | Edge actions for display/editing. |

### `EdgeView`
| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `from` | number | Source node id. |
| `to` | number | Target node id. |
| `predicate` | `Predicate[] \| ["No predicates"]` | First predicate displayed on the edge tooltip. |
| `actions` | `Action \| "No action"` | First action surfaced in the sidebar. |

## Persistent Scenario Storage (`src/scripts/cenarioManager.js`)

### `CenarioDocument`
| Field | Type | Description |
| --- | --- | --- |
| `id` | number | Unique identifier generated with `Date.now()`. |
| `name` | string | Scenario display name. |
| `treeId` | number | Foreign key that links the scenario to a tree. |
| `cenario` | `{ elements: CenarioElement[] }` | Hierarchical scenario payload. |

### `CenarioElement`
| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `id` | number | Generated via `Date.now()` on insertion. |
| `key` | string | Dictionary key associated with the scenario element. |
| `value` | string | Scenario value captured from user input. |
| `children` | `CenarioElement[]` | Recursive child list; defaults to `[]`. |

## IPC Bridge Contracts (`src/preload.js`, `src/main/main.ts`)

### Tree Channels (`window.treeAPI`)
| Channel | Request Signature | Response | Description |
| --- | --- | --- | --- |
| `create-tree` | `(treeName: string)` | `Promise<number>` | Creates a `TreeDocument` and returns its id. |
| `save-tree` | `(treeId: number, data: TreeDocumentPatch)` | `Promise<void>` | Persists nodes, dictionary, and timestamp. |
| `load-tree` | `(treeId: number)` | `Promise<TreeDocument \| null>` | Retrieves a stored tree. |
| `list-tree` | `()` | `Promise<TreeDocument[]>` | Lists all saved trees. |
| `export-tree` | `(treeId: number)` | `Promise<{ dictionary: DictionaryEntry[]; nodes: TreeNode[] } \| null>` | Returns reduced tree for export. |
| `delete-tree` | `(treeId: number)` | `Promise<boolean>` | Removes the persisted tree file. |

### Scenario Channels (`window.cenarioAPI`)
| Channel | Request Signature | Response | Description |
| --- | --- | --- | --- |
| `create-cenario` | `(name: string, treeId: number)` | `Promise<number>` | Creates a `CenarioDocument` attached to a tree. |
| `save-cenario` | `(cenarioId: number, data: { cenario: { elements: CenarioElement[] } })` | `Promise<void>` | Stores scenario elements. |
| `load-cenario` | `(cenarioId: number)` | `Promise<CenarioDocument \| null>` | Retrieves a scenario by id. |
| `list-cenario` | `()` | `Promise<CenarioDocument[]>` | Lists all scenarios. |
| `delete-cenario` | `(cenarioId: number)` | `Promise<boolean>` | Removes the persisted scenario file. |

`TreeDocumentPatch` denotes the subset saved from the renderer (`nodes`, `dictionary`, optional `projectName`). The main process merges it with persisted metadata before writing to disk.

