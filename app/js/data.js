module.exports = {
    items: [
        {
            title: 'Modularity',
            'desc': 'Divide and Conquer. Modular code is easier to develop, to maintain and to test. With CoreJS you can divide your application into modules.',
            items: [
                {
                    title: 'CommonJS',
                    items: [
                        'CoreJS modules follow a widely known CommonJS pattern',
                        c(0,
                            '// required modules',
                            'var moduleA = <b>require</b>(\'module-a\'),',
                            '    moduleB = <b>require</b>(\'module-b\');\n',
                            '// module code\n',
                            '// stuff that this module exports',
                            '<b>module.exports</b> = ...;'
                        ),
                        c(0,
                            '// another way to export:',
                            '<b>exports.app</b> = {/* app config, for example */};',
                            '<b>exports.etc</b> = \'other value\';'
                        ),
                        'You don\'t need to use a define() wrapper in your modules, just follow the Node.js module syntax.',
                        'You don\'t need to recompile project on each change: in development mode modules are loaded one by one and compiled on the fly.',
                        'For production all required modules are collected and compiled together:'
                    ]
                },
                {
                    title: 'Compiling',
                    items: [
                        'Serving many files over a possibly slow connection could be slower than serving one file.',
                        'To compile your project and create a production build, run:',
                        c(0, 'grunt compile'),
                        'During the compilation process, the compiler takes only required modules and minimizes your JavaScript.',
                        'The dependency tree is being built starting from the entry module, all other modules do not get into the compiled code.',
                        'CoreJS is as light as you want it to be.'
                    ]
                }
            ]
        },
        {
            title: 'Code Reuse',
            'desc': 'You might have heard about ' + a('http://en.wikipedia.org/wiki/Don%27t_repeat_yourself', 'DRY principle') + ' and ' + a('http://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)', 'inheritance') + ' as one of the ways to be DRY. There are several ways to do inheritance in JavaScript.',
            items: [
                {
                    title: 'Inheritance',
                    items: [
                        'Inheritance with CoreJS is pretty simple.',
                        'Core has an .extend() method which is used to inherit:',
                        c(0,
                            '// Model inherits from Core',
                            'var Model = <b>Core.extend</b>({',
                            '    constructor: function () {/* constructor */},',
                            '    method1: function () {},',
                            '    method2: function () {}',
                            '});'
                        ),
                        'Another way:',
                        c(0,
                            'var Model = function () {/* constructor */};\n',
                            'Model.prototype = {',
                            '    method1: function () {},',
                            '    method2: function () {}',
                            '};\n',
                            '// Model inherits from Core',
                            'Model = <b>Core.extend</b>(Model);'
                        ),
                        'Every Core\'s child has an .extend() method as well. For example, the Events component, being a child of Core, can be inherited from:',
                        c(0,
                            'var View = <b>Events.extend</b>({',
                            '    /* ... */',
                            '});'
                        ),
                        'You can override methods and make super calls:',
                        c(0,
                            'var View = Events.extend({',
                            '    constructor: function () { // <b>overriding</b> parent (Events) constructor',
                            '        Events.call(this); // calling <b>super</b> (optional)',
                            '        // some other stuff',
                            '    }',
                            '});'
                        ),
                        'You can make super calls using the .superclass property as well:',
                        c(0,
                            'var View = Events.extend({',
                            '    constructor: function () { // overriding parent (Events) constructor',
                            '        View.<b>superclass</b>.constructor.call(this); // calling <b>super</b> (optional)',
                            '        // some other stuff',
                            '    }',
                            '});'
                        )
                    ]
                },
                {
                    title: 'Components Library',
                    items: [
                        'CoreJS is as rich as you want it to be.',
                        'CoreJS has a growing library of pluggable components, just require() what you need.'
                    ]
                }
            ]
        },
        {
            title: 'Components Wiring',
            'desc': 'There are many articles telling you why wiring up the components through the ' + a('http://www.yuiblog.com/blog/2006/06/01/global-domination/', 'global scope') + ' is bad, but ' + a('http://blog.millermedeiros.com/namespaces-are-old-school/', 'namespaces') + ' are ' + a('http://weblogs.asp.net/bleroy/archive/2012/09/03/namespaces-are-obsolete.aspx', 'evil') + ' too. If you have something like <span class="pre">app.header.menu.update()</span>, most probably you are doing something wrong. So, how are we going to wire up the components together? One of the solutions is Dependency Injection.',
            items: [
                {
                    title: 'Dependency Injection',
                    items: [
                        'Dependency Injection helps to wire up the components together without polluting the global scope or using namespaces.', '&nbsp;',
                        'There are 2 ways to register a dependency:',
                        c(0,
                            'Core.register(\'dep\', [\'dependency\', \'example\']);\n',
                            'Core(\'dep\', [\'dependency\', \'example\']); // same as above'
                        ),
                        'Every component inherited from Core has the .register() method as well. For example, View being a child of Core can register dependencies as well:',
                        c(0, 'View.register(\'dep\', [1, 2, 3]); // same as Core.register(\'dep\', [1, 2, 3]);'),
                        'To inject dependencies into a method (when inheriting from Core or any child of Core), specify an <b>Injector Array</b> as any method.',
                        '<b>Injector Array</b> is any array which elements are strings, except the last element, a function to inject dependencies into:',
                        c(0,
                            '// Model inherits from Core',
                            'var Model = <b>Core.extend</b>({',
                            '    method: ' + t('Injector Array tells the Dependency Injector to inject dependency \'dep\' as parameter \'d\'', '[\'dep\',') + ' function (d) {',
                            '        console.log(d); // will output [\'dependency\', \'example\']',
                            '    }]',
                            '});'
                        ),
                        'Besides the .extend() method, you can inject dependencies directly.',
                        'To inject dependencies into a function, pass an <b>Injector Array</b> to Core.',
                        c(0,
                            '// Core(injector_array) returns a function with injected dependencies',
                            'var f = Core(' + t('Injector Array tells the Dependency Injector to inject dependencies:<br/>\'dep1\' as d1 parameter<br/>\'dep2\' as d2 parameter', '[\'dep1\', \'dep2\', function(d1, d2) {}]') + ');'
                        ),
                        'And you can get dependencies directly as well.',
                        'To get a registered dependency, pass its name to Core:',
                        c(0, 'var d = Core(\'dep\'); // returns resolved dependency, [\'dependency\', \'example\']'),
                        'To get several dependencies, pass their names as an array to Core:',
                        c(0, 'var a = Core([\'dep1\', \'dep2\']); // returns an array of resolved dependencies'),
                        // '<span class="nb">!</span>When you use the .extend() method, pass Injector Arrays without wrapping them in Core(injector_array), CoreJS lets you be concise. Consider <a href="#Combined Example">an example</a>.', '&nbsp;',
                        'To un-register a dependency, pass its name to Core.unregister():',
                        c(0, 'Core.unregister(\'dep\'); // un-registers a dependency'),
                        'To un-register all dependencies, call Core.reset():',
                        c(0, 'Core.reset(); // un-registers all dependencies')
                        /*TODO and unregister /?\ and reset*/
                    ]
                },
                {
                    title: 'Dynamic Dependencies',
                    items: [
                        'Dependencies are lazily resolved',
                        c(0,
                            '// function fn is defined before the dependency \'lazy\' is provided',
                            'var fn = Core([\'lazy\', function (l) { console.log(l) }]);\n',
                            '// dependency <b>lazily</b> provided',
                            'Core.register(\'lazy\', \'Yeee!\');\n',
                            'fn(); // outputs \'Yeee!\' in console'
                        ),
                        'Dependencies can be modified',
                        c(0,
                            '// dependency <b>modified</b>',
                            'Core.register(\'lazy\', \'Woot!\');\n',
                            'fn(); // outputs \'Woot!\' in console\n'
                        ),
                        'Dependencies can be unregistered',
                        c(0,
                            '// dependency <b>unregistered</b>',
                            'Core.unregister(\'lazy\');\n',
                            'fn(); // outputs \'undefined\' in console\n'
                        )
                    ]
                }
            ]
        }
    ],

    'combined': {
        title: 'Combined Example',
        items: [
            'Let\'s bring it all together.',
            'Despite all these features are nice to have, the maximum sweetness is achieved when all features of CoreJS are used all together (<span class="action"><span class="d">hover</span><span class="m">touch</span></span> the underlined code to see comments):',
            c('main.js',
                'var Core = require(\'core\'),',
                '    Router = require(\'router\'),',
                '    Sidebar = require(\'sidebar\');\n',
                'Core.' + t('registering an instance of Router component as \'router\'', 'register(\'router\', new Router)') + ';',
                'Core.' + t('registering an array as \'menu\'', 'register(\'menu\', [1, 2, 3])') + ';',
                'new Sidebar({$container: $(\'#sidebar\')});'
            ),
            'Note that there is no need to wrap the Injector Arrays into a Core() call, this is done automagically:',
            c('sidebar.js',
                'var View = require(\'view\');\n',
                'var Sidebar = View.extend({\n',
                '    ' + t('overriding parent constructor', 'constructor') + ': ' + t('Injector Array tells the Dependency Injector to inject \'router\' into this function', '[\'router\', function') + ' (' + t('dependency \'router\', an instance of Router would be injected here', 'router') + ', options) {',
                '        ' + t('super call', 'View.call') + '(this, options);',
                '        ' + t('instance of Router component', 'router') + '.on(\'route\', this.update, this);',
                '    }],\n',
                '    ' + t('overriding parent .update() method', 'update') + ': ' + t('Injector Array tells the Dependency Injector to inject \'menu\' into this function', '[\'menu\',') + ' ' + t('parent .update() method as the function to inject into', 'View.prototype.update') + '],\n',
                '    template: \'&lt;ul>{{#items}}&lt;li>{{.}}&lt;/li>{{/items}}&lt;/ul>\'\n',
                '});\n',
                'module.exports = Sidebar;'
            ),
            'And finally, include CoreJS in your page and specify a path to the entry module:',
            c('index.html',
                '&lt;div id="sidebar"&gt;&lt;/div&gt;',
                '&lt;script src="js/core.js" data-main="js/<b>main.js</b>"&gt;&lt;/script&gt;'
            )
        ]
    },

    'conclusion': [
        'CoreJS is under active development, so come back later to see more',
        'However, if you already like it, feel free to <a href="http://indamix.github.io/">contact me</a> or <a class="spread">spread the word</a>'
    ], /*

     features: [
     'Small size: 1.3 kB gzipped',// of compiled production build/core
     'No dependencies'
     // CoreJS itself has none. However, some of the components do.
     // View depends on any library that implements jQuery interface (jQuery, Zepto, jQlite)
     ]*/

    id: function () {
        return this.title.replace(/\s+/g, '_');
    }
};

var slice = Array.prototype.slice;

function c() {
    var lines = slice.call(arguments, 1);
    for (var i = lines.length; i--;) {
        lines[i] = lines[i].replace(/(\/\/.*)|(\/\*.*\*\/)/, '<span class="comment">$1$2</span>');
    }
    return {
        code: lines.join('\n'),
        file: arguments[0]
    };
}

function t(tooltip, text) {
    return '<i title="' + tooltip + '">' + text + '</i>';
}

function a(href, text) {
    return '<a target="_blank" href="' + href + '">' + text + '</a>';
}