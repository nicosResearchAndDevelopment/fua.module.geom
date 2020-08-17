const
    Path = require('path'),
    Fs = require('fs'),
    __project = Path.join(__dirname, ".."),
    package_json = require(Path.join(__project, 'package.json')),
    main_file = Path.join(__project, package_json.main);