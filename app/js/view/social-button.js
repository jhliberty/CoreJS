var View = require('view');

var Button = View.extend({

    constructor: function () {
        View.call(this);
        if (!document.getElementById(this.id)) {
            var js = document.createElement('script');
            js.id = this.id;
            js.src = this.src;
            document.head.appendChild(js);
        }
    }

});

module.exports = Button;