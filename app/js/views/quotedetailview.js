var app = app || {}

app.QuoteDetailView = Backbone.View.extend({
	el:'.page',
    initialize: function () {

       //this.render();
    },
	render: function (symbol) {
			console.log('render quote detail view');
			var tmp = _.template(utils.templates['QuoteDetailView'], {name:'Quote Details'});
			this.$el.html(tmp);
			this.quoteDetailSubView = new app.QuoteDetailSubView();
            		this.quoteDetailSubView.renderSubView(symbol,'QuoteDetailSubView');
	}
});