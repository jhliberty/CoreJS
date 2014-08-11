var tpl = require('../../tpl'),
    mus = require('../../mustache').render;

describe('tpl', function(){

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
    var template =
    '{{#items}}' +
      '<div>' +
      '{{title}}' +
      '<ul>' +
        '{{#items}}<li>{{.}}</li>{{/items}}' +
      '</ul>' +
      '[{{#test}}<p>&nbsp;&nbsp;&nbsp;&nbsp;-{{.}}</p>{{/test}}]' +
      '</div>' +
    '{{/items}}';

    var html_i = tpl(template, model),
        html_m = mus(template, model);
    expect(html_i).toBe(html_m);
  });

  it('should render templates with newlines', function () {
    var template =
    '{{#items}}' +
      '<div>\n' +
      '{{title}}\n' +
      '<ul>\n' +
        '{{#items}}<li>{{.}}</li>{{/items}}\n' +
      '</ul>\n' +
      '[{{#test}}<p>&nbsp;&nbsp;&nbsp;&nbsp;-{{.}}</p>{{/test}}]\n' +
      '</div>\n' +
    '{{/items}}';

    var html_i = tpl(template, model),
        html_m = mus(template, model);
    expect(html_i).toBe(html_m);
  });
});
