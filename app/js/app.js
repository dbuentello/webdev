
var app = app || {};
// Make the sure the DOM is loaded before go and do something
$(function() {
	console.log('starting application');

	app.mainView = new MainView();
	var dummyCollection  = new WatchListModelCollection()
	app.watchlistView = new WatchlistView({collection: dummyCollection});
        Backbone.history.start();
});