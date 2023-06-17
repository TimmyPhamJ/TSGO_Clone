var express = require('express');
var router = express.Router();
var normalizedPath = require("path").join(__dirname, "");
let list = require("fs").readdirSync(normalizedPath);

for (let ii = 0; ii < list.length; ii++) {
    const file = list[ii];
    if (file == 'index.js') continue;
    
    let fileName = file.substring(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`));
}

module.exports = router;