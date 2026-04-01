import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "rynth/jsx-runtime";
import * as Rynth from '#~/index';
import { Body, Head, Header, Button, Break, } from '#~/web/elements';
const mode = Rynth.signal(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const counter = Rynth.signal(0);
export const app = _jsxs(_Fragment, { children: [_jsx(Head, {}), _jsxs(Body, { children: [_jsx(Header, { children: _jsx(_Fragment, { children: "My App" }) }), "Counter is ", counter, ".", _jsx(Break, {}), _jsx(Button, { click: () => {
                        counter.value++;
                    }, children: "Click here to increment the counter" })] })] });
