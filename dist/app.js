"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
require("./styles/tailwind.css");
const Sidebar_1 = __importDefault(require("./renderer/components/Sidebar"));
const container = document.getElementById('root');
if (container) {
    const root = (0, client_1.createRoot)(container);
    root.render((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'bg-background-green-100 min-h-screen' }, { children: (0, jsx_runtime_1.jsx)(Sidebar_1.default, {}, void 0) }), void 0));
}
//# sourceMappingURL=app.js.map