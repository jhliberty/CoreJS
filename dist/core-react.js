/**
 * CoreJS React/JSX adapter
 *
 * @desc Loads React library and adds the JSX support to CoreJS modules
 *
 * To download React, run:
 * bower install react
 *
 * Usage:
 * In your main module, add line:
 * require('core-react')();
 *
 * This file is not needed for production
 *
 * Be sure to precompile your JSX for production
 * http://facebook.github.io/react/docs/tooling-integration.html#jsx
 */

module.exports = function () {
//  window.React = window.React || require('../bower_components/react/react-with-addons.js');
  window.React = window.React || require('../bower_components/react/react.js');
  var transform = require('../bower_components/react/JSXTransformer.js').transform;

  // function in CoreJS loader
  parse = function (code) {
    return transform(code).code;
  };
};