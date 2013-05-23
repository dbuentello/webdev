
// Main Application View
var app = app || {};

var MainView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
		console.log("initialize");

	},		

	render: function() {
		console.log('rendering');

        //TODO: check to see if session is valid -  For now if the api returns invalid session please set the user model to {}
        if ( !app.userProfileModel.get('session-id')) {
            app.loginView = new LoginView();
            app.loginView.render();
        }
        else {
            var coll = new WatchListModelCollection();
            var template = _.template($('#tda-main-page').html(), {});
            this.$el.html(template);

            getMarketOverView(function(resp) {

                },
                function(respData) {
                    var respJson = JSON.parse(respData.responseText);
                });

            var symbolarry = ["$DJI","$SPX.X","$COMPX"];
            var symbol = "";
            for(var i = 0;i < symbolarry.length;i++){
                symbol = symbolarry[i];
                var assetM = app.assetcache.getAssetObject(symbol);

                //loading the chart
                var ch = new ChartView();
                k = i+1;
                tabname = "tabchart"+k;
                ch.renderTodayChart(symbol,tabname);
                coll.add(assetM);
            }
            addLevel1QuoteSubscription("$DJI,$SPX.X,$COMPX");
            this.collection = coll;
        }


	}
});