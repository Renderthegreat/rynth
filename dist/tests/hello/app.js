import { jsx as _jsx } from "rynth/jsx-runtime";
import * as Rynth from '#~/index';
import { Body, Header, } from '#~/web/elements';
const mode = Rynth.signal(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const app = _jsx(Body, { children: _jsx(Header, { children: "My App" }) });
