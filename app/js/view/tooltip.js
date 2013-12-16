var View = require('view');

var Tooltip = View.extend({

    constructor: function (options) {
        View.call(this);
        this.$container.addClass('tooltip');
        $(document.body)
            .on('mouseenter touchstart', options.selector, this.show.bind(this))
            .on('mouseleave touchend', options.selector, this.hide.bind(this));
    },

    show: function (e) {
        var elm = e.target,
            $elm = $(elm),
            offset = $elm.offset(),
            title = elm.title;

        if (title) {
            elm.removeAttribute('title');
            elm.setAttribute('data-title', title);
        } else {
            title = elm.getAttribute('data-title');
        }

        this.$container.appendTo(document.body).html(title);
        offset.top -= this.$container.height() + 20;
        this.$container.offset(offset);
        e.preventDefault();
    },

    hide: function () {
        this.$container.detach();
    }

});

module.exports = Tooltip;