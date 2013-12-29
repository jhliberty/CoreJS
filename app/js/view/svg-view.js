var View = require('view');

var SvgView = View.extend({

    constructor: function (options) {
        this.width  = options.width;
        this.height = options.height;
        this.path   = options.path;
        View.apply(this, arguments);
    },

    update: function () {
        this.$container.html(
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' +
                'width="' + size(this.width) + '" height="' + size(this.height) + '" ' +
                'viewBox="0 0 100 100" xml:space="preserve">' +
                '<path d="' + this.path + '"/>' +
            '</svg>'
        );
    }

});

var size = function(s) {
    return typeof s === 'string' ? s : s + 'px';
};

module.exports = SvgView;