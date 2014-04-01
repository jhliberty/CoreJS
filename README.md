[CoreJS](http://corejs.github.io)
======

[![CoreJS](http://corejs.github.io/app/i/logo.png "CoreJS")](http://corejs.github.io)

[![CoreJS](http://corejs.github.io/app/i/core.png "CoreJS")](http://corejs.github.io)

======

## Installing CoreJS: single file
CoreJS is [available in GitHub](https://raw.githubusercontent.com/CoreJS/CoreJS/master/core.js) and via Bower:
```bash
bower install corejs
```

## Usage
Include ```core.js``` into your HTML page and specify the path to your main module as the data-main attribute:
```html
<!-- index.html --->
<!-- ... --->
<script data-main="js/main.js" src="bower_components/corejs/core.js"></script>
<!-- ... --->
```
```main.js``` in its turn can have any ```require()``` calls that load all other modules, e.g.

```javascript
/* main.js */
var moduleA = require('module-a'), // loads js/module-a.js
    util = require('folder/util'), // loads js/folder/util.js
    _ = require('bower_components/underscore/underscore');
```
All paths are resolved from your main module path, in this example it is ```js/```

======

## Installing CoreJS: with Components and example application

### Cloning the repo and installing all NPM and Bower modules
```bash
git clone https://github.com/CoreJS/corejs.github.io.git CoreJS && cd $_
npm install
bower install --dev
```

### Starting the application
```bash
grunt serve
```

### Making the production build

Example application comes with the ```compile``` task that takes all required modules and creates a build:
```
grunt compile
```

Deploy is dead simple as well:
```
grunt deploy
```
You may want to change the deploy path in Gruntfile.js
