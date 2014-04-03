var tpl = require('../../tpl'),
    mus = require('../../mustache').render;

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
          'CommonJS', 'Compiler'
        ],
        test : [1, 2, 3]
      },
      {
        title: 'Странные символы',
        items: [
          'Что-то', 'Еще что-то'
        ]
        , test: ['TEST', ['XX', 2]]
      }
    ]};

  it('should render like Mustache does', function () {
    var html_i = tpl(template, model),
        html_m = mus(template, model);
    expect(html_i).toBe(html_m);
  });
});
