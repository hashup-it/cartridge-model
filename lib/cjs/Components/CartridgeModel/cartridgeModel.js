"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartridgeModel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var CartridgeModel = function (_a) {
    var color = _a.color, image = _a.image, fov = _a.fov, width = _a.width, height = _a.height;
    var _b = (0, react_1.useState)(""), framePath = _b[0], setFramePath = _b[1];
    (0, react_1.useEffect)(function () {
        var path = "".concat(window.location.protocol, "//").concat(window.location.host, "/cartridgeModel/?qsfov=").concat(fov, "&qscolor=").concat(color, "&qsimage=").concat(image);
        setFramePath(path);
    }, [color, image, fov]);
    return ((0, jsx_runtime_1.jsx)("iframe", { title: "cartridge model", src: framePath, width: width, height: height }, void 0));
};
exports.CartridgeModel = CartridgeModel;
