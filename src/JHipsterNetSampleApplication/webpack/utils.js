const fs = require('fs');
const path = require('path');

module.exports = {
    parseVersion,
    root,
    isExternalLib
};

const _root = path.resolve(__dirname, '..');

const parseString = require('xml2js').parseString;
// return the version number from `pom.xml` file
function parseVersion() {
    let version = null;
    const projectFile = fs.readFileSync(path.resolve(_root, 'JhipsterNetSampleApplication.csproj'), 'utf8');
    parseString(projectFile, (err, result) => {
        if (err) {
            throw new Error('Failed to parse JhipsterNetSampleApplication.csproj: ' + err);
        }
        if (result.Project.PropertyGroup && result.Project.PropertyGroup[0] && result.Project.PropertyGroup[0].Version) {
            version = result.Project.PropertyGroup[0].Version
        }
})
    if (version === null) {
        throw new Error('JhipsterNetSampleApplication.csproj is malformed. No version is defined');
    }
    return version;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function isExternalLib(module, check = /node_modules/) {
    const req = module.userRequest;
    if (typeof req !== 'string') {
        return false;
    }
    return req.search(check) >= 0;
}
