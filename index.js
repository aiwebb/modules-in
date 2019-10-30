const path = require('path')
const fs = require('fs')

const isDir = dir => fs.lstatSync(dir).isDirectory()

const getModules = dir => {
  const modules = {}

  fs.readdirSync(dir).forEach(entry => {
    const entryName = path.parse(entry).name
    const entryPath = path.resolve(dir, entry)

    try {
      modules[entryName] = isDir(entryPath) ? getModules(entryPath) : require(entryPath)
    }
    catch (err) {}
  })

  return modules
}

module.exports = relativePath => getModules(path.resolve(path.dirname(module.parent.filename), relativePath))