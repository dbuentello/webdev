var app = app || {}

app.QuoteDetailView = Backbone.View.extend({
	el:'.page',
    initialize: function () {

       this.render();
    },
	render: function () {
			console.log('render quote detail view');
			var tmp = _.template(utils.templates['QuoteDetailView'], {name:'Quote Details'});
			this.$el.html(tmp);
	}
});