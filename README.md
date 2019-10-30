# modules-in

Produces a hierarchical dictionary of local modules from a target directory.

```js
// loads modules in a given dir
const lib = require('modules-in')('./lib')

app.post('/user', lib.user.create)
```

## Installation
```bash
# npm
npm i --save modules-in

# yarn
yarn add modules-in
```


## Example

Let's say we have a project structure with some local modules:

- lib
  - user
    - create.js
    - fetch.js
    - update.js
    - delete.js
  - helpers.js
- server.js

In our code, we might be requiring those user modules individually:

```js
const userCreate = require('./lib/user/create')
const userFetch  = require('./lib/user/fetch' )
const userUpdate = require('./lib/user/update')
const userDelete = require('./lib/user/delete')

app.post  ('/user',     userCreate)
app.get   ('/user/:id', userFetch )
app.put   ('/user/:id', userUpdate)
app.delete('/user/:id', userDelete)
```

If we get sick of that, we might add a `lib/user/index.js` file to group them together:

```js
// in lib/user/index.js
module.exports = {
  create: require('./create'),
  fetch:  require('./fetch' ),
  update: require('./update'),
  delete: require('./delete')
}

// elsewhere
const userFns = require('./lib/user/index.js')

app.post  ('/user',     userFns.create)
app.get   ('/user/:id', userFns.fetch )
app.put   ('/user/:id', userFns.update)
app.delete('/user/:id', userFns.delete)
```

That's pretty much what `modules-in` does, except without the need to manually create and manage an explicit grouping module - and it does it recursively:

```js
const lib = require('modules-in')('./lib')

app.post  ('/user',     lib.user.create)
app.get   ('/user/:id', lib.user.fetch )
app.put   ('/user/:id', lib.user.update)
app.delete('/user/:id', lib.user.delete)
```