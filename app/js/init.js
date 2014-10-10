require(['underscore'], function (_) {
  var printer = function (el, i, ls) {
    return '' + el;
  };
  console.log(_.map([1, 2, 3], printer));
});
