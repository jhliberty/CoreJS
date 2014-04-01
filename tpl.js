var blockRe = /{{#(\w*)\b[^}]*}}(.*){{\/\1}}/g,
    valRe = /{{([^{}]*)}}/g,
    dotRe = /{{\.}}/g;

module.exports = function fn(tpl, data) {
  return tpl
    .replace(blockRe, function (tpl, key, subTpl) {
      var arr = data[key],
          s = '';
      if (arr === undefined) return s;
      if (!Array.isArray(arr)) arr = [arr];
      for (var i = 0, len = arr.length; i < len; ++i) {
        var part = fn(subTpl, arr[i]);
        if (part === subTpl) {
          part = part.replace(dotRe, arr[i]);
        }
        s += part;
      }
      return s;
    })
    .replace(valRe, function (tpl, key) {
      var s = data ? data[key] : '';
      return typeof s === 'string' || typeof s === 'number' ? s : tpl;
    }
  );
};
