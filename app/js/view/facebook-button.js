var Button = require('view/social-button');

var FacebookButton = Button.extend({

    id: 'facebook-jssdk',

    src: '//connect.facebook.net/en_US/all.js#xfbml=1',

    template: '<div class="fb-like" data-href="' + location.href.replace(/#.*/, '') + '" data-layout="box_count" data-action="like" data-show-faces="true" data-share="true"></div>'

});

module.exports = FacebookButton;