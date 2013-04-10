var QuoteDetailView = Backbone.View.extend({
	el:'.page',
	render: function () {
			console.log('render');
			var template = _.template($('#tda-loading').html(), {name:'Quote Details'});
			this.$el.html(template);
	}
});