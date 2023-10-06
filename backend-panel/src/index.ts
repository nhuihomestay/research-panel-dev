// import app from './server';
// import './LoadEnv';

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log('Simple project server started on port: ' + port);
// });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
require("./LoadEnv");
const port = process.env.PORT || 3000;
server_1.default.listen(port, () => {
    console.log('Simple project server started on port: ' + port);
});
//# sourceMappingURL=index.js.map