var Button = require('view/social-button');

var TwitterButton = Button.extend({

    id: 'twitter-wjs',

    src: '//platform.twitter.com/widgets.js',

    template: '<a href="https://twitter.com/share" class="twitter-share-button" data-size="large" data-url="' + location.href.replace(/#.*/, '') + '">Tweet</a>'

});

module.exports = TwitterButton;