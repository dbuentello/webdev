

var app = app || {};
// Make the sure the DOM is loaded before go and do something
$(function() {
	console.log('starting application');


    utils.loadTemplates(['QuoteDetailView','QuoteDetailSubView','newSubView','ChartView','BalanceView'], function(){
            app.mainView = new MainView();
            app.accountEvent = _.extend({}, Backbone.Events);
            var dummyCollection  = new WatchListModelCollection()
            app.watchlistView = new WatchlistView({collection: dummyCollection});
            app.chartView = new ChartView();
            app.assetcache = new AssetCache();
            app.streamerResponseReaderHelper = new StreamerResponseReaderHelper();           
            app.balanceView = new BalanceView();
            Backbone.history.start();

        }
      ) ;

});
