var tpl = require('../../app/js/tpl'),
    mus = require('../../app/js/mustache').render;

describe('tpl', function(){

    var template =
    '{{#items}}' +
        '<div>' +
        '{{title}}' +
        '<ul>' +
            '{{#items}}<li>{{.}}</li>{{/items}}' +
        '</ul>' +
        '[{{#test}}<p>&nbsp;&nbsp;&nbsp;&nbsp;-{{.}}</p>{{/test}}]'+
        '</div>' +
    '{{/items}}';

    var model = {
        items: [
            {
                title: 'Modularity',
                items: [
//            {title: 'CommonJS'},
//            {title: 'Compiler'},
                    'CommonJS', 'Compiler'
                ],
                test : [1, 2, 3]
            },
            {
                title: 'Странные символы',
                items: [
//            {title: 'Что-то'},
//            {title: 'Еще что-то'}
                    'Что-то', 'Еще что-то'
                ]
                , test: ['TEST', ['XX', 2]]
            }
        ]};

    it('should render as Mustache does', function () {
        var html_i = tpl(template, model);
        var html_m = mus(template, model);
        expect(html_i).toBe(html_m);
    });
/*
    var n = 1,
        i;

    console.time('CORE');
    for (i = n; i--;)html_i = tpl(template, model);
    console.timeEnd('CORE');

    console.time('MUST');
    for (i = n; i--;)html_m = mus(template, model);
    console.timeEnd('MUST');
*/
});
