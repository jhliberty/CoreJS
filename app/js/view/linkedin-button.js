var Button = require('view/social-button');

var LinkedInButton = Button.extend({

    id: 'linkedin',

    src: '//platform.linkedin.com/in.js',

    template: '<script type="IN/Share" data-url="' + location.href.replace(/#.*/, '') + '" data-counter="top"></script>'

});

module.exports = LinkedInButton;