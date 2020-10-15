#!/usr/bin/env node
let exec = require('child_process').exec;
let path = process.argv[1].replace(/[\w.?]*?$/, '');

exec('npm run build')
console.log(`Building project..`)

exec('cp ' + path + '/src/assets/json ' +  path + '/dist')
exec('cp ' + path + '/CNAME ' +  path + '/dist')
console.log(`Copying json files..`)

exec('git add .')
exec('git commit -m "update dist folder"')
exec('git push')

exec('git push origin --delete gh-pages')
exec('git subtree push --prefix dist origin gh-pages')
console.log(`Updating github pages...`)