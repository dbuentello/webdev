/**
 * Created with IntelliJ IDEA.
 * User: wjshea
 * Date: 4/9/13
 * Time: 2:53 PM
 * To change this template use File | Settings | File Templates.
 */
var app = app || {};

app.quoteDetailView = new QuoteDetailView.extend({

    .el = '.page',
    symbol = null,
    initilize
:
function () {


}
,

render: function () {
    var template = _.template($('#tda-quote-page').html(), {});
    this.$el.html(template);

}
,
update: function () {

}

})
;
