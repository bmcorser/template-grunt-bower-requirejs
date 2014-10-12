require(['underscore', 'jquery'], function (_) {
  var appendBody = function (el, i, ls) {
    $('body').append($('<p />').text(el).attr({'class': 'appended'}));
    return el + ' appended!';
  };
  console.log(_.map([1, 2, 3], appendBody));
});
