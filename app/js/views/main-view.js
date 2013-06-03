
// Main Application View
var app = app || {};

var MainView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
		console.log("initialize");
        _.bindAll(this,'render','update');
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
            unSubscribeLevel1QuoteSubscription("$DJI,$SPX.X,$COMPX");

            getMarketOverView(function(resp) {

                },
                function(respData) {
                    var respJson = JSON.parse(respData.responseText);
                    /*respJson.EventCounts.ConferenceCalls
                    respJson.EventCounts.Dividends
                    respJson.EventCounts.Earnings
                    respJson.EventCounts.IPOs
                    respJson.EventCounts.Splits


                    respJson.Summary["DJIA"]
                    NASDAQ
                    SPX

                    respJson.Sectors.High.ChangePct
                    respJson.Sectors.High.Name

                    respJson.Sectors.Low.ChangePct
                    respJson.Sectors.Low.Name
                     */
                    $('#tabdesc1').append(respJson.Summary["DJIA"]);
                    $('#tabdesc2').append(respJson.Summary["SPX"]);
                    $('#tabdesc3').append(respJson.Summary["NASDAQ"]);

                    $('#earn').append("Earnings :"+respJson.EventCounts.Earnings);
                    $('#divid').append("Dividends :"+respJson.EventCounts.Dividends);
                    $('#split').append("Splits :"+respJson.EventCounts.Splits);
                    $('#ipos').append("IPOs :"+respJson.EventCounts.IPOs);

                    $('#topsec').append(respJson.Sectors.High.Name +" : "+respJson.Sectors.High.ChangePct.toFixed(2)+ "%");
                    $('#bottomsec').append(respJson.Sectors.Low.Name +" : "+respJson.Sectors.Low.ChangePct.toFixed(2)+ "%");


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
                tabdata = "tabdata"+k;
                ch.renderTodayChart(symbol,tabname);

                $('#'+tabdata).html("</br><span id='"+assetM.cid+"last' >"+assetM.get('last')+" </span>" +
                    "</br><span id='"+assetM.cid+"change' style='padding-right:3px;' >"+assetM.get('change')+"</span>" +
                    "(<span id='"+assetM.cid+"changePercent'>"+assetM.get('changePercent')+"</span>)");

                coll.add(assetM);
            }
            this.collection = coll;
            this.collection.on("change",this.update);
            addLevel1QuoteSubscription("$DJI,$SPX.X,$COMPX");
        }


	} ,
    update: function(model) {
        //this.collection.each(this.renderOne);
        var diff = model.changedAttributes();
        for(var att in diff){
            $("#"+model.cid+att).text(model.get(att));
        }
    }
});