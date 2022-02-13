import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export var CartridgeModel = function (_a) {
    var color = _a.color, image = _a.image, fov = _a.fov, width = _a.width, height = _a.height;
    var _b = useState(""), framePath = _b[0], setFramePath = _b[1];
    useEffect(function () {
        var path = "".concat(window.location.protocol, "//").concat(window.location.host, "/cartridgeModel/?qsfov=").concat(fov, "&qscolor=").concat(color, "&qsimage=").concat(image);
        setFramePath(path);
    }, [color, image, fov]);
    return (_jsx("iframe", { title: "cartridge model", src: framePath, width: width, height: height }, void 0));
};
