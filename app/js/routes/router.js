

	var app = app || {};

	<!-- Router -->
	var Router = Backbone.Router.extend({
		routes: {
			'':'home',
			'loggedin':'home',
			'watchlist':'watchlist',
			'watchlistname/:name':'watchlistname',
            'chart':'chart',
            'news':'news',
            'newsdetail/:newsid':'newsdetail',
            'quotedetails/:symbol': 'quotedetails',
            'optionchain': 'optionchain',
            'positions':'positions',
            'custom':'custom',
            'balance':'balances'
            }	
	});

    app.router = new Router();

    app.router.on('route:home',function(actions){
        app.mainView.render();
        if (!this.newssubview){
            this.newssubview = new app.NewsSubView();
        }
        this.newssubview.render("newsDivForMain"); //newsDivForMain


    });
	
    app.router.on('route:watchlist',function(actions){
            app.watchlistView.render();

    });

    app.router.on('route:watchlistname',function(name){
        app.watchlistView.renderList(name);

    });
    
     app.router.on('route:chart',function(actions){
		
        app.chartView.render();

    });
    
    app.router.on('route:news',function(actions){
	if (!this.newssubview){
	    this.newssubview = new app.NewsSubView();
	 }
	 this.newssubview.render("page");
    
    });
    
    app.router.on('route:newsdetail',function(newsid){
    	
    	this.newssubview.loadNewsDetails(newsid,"newdetailssectionspan", "newheadsectionspan");
        
    });


    app.router.on('route:quotedetails', function (symbol){

        if (!this.quoteDetailView){
            this.quoteDetailView = new app.QuoteDetailView();
        }
        var that = this;
        var assetM = app.assetcache.getAssetObject(symbol);
        if(assetM.get('modLoaded') != true){
            getAssetFastLook(symbol,function(resp) {
                    var respJson = JSON.parse(resp);
                    if(respJson.Results.length > 0 ){
                        var assetM = app.assetcache.getAssetObject(symbol);
                        assetM.set("assetType",respJson.Results[0].i);
                        //need to call the snapquotes to get the details
                        getAssetOverView(symbol,function(resp) {
                                alert('Success');
                            },
                            function(respData) {
                                var respJson = JSON.parse(respData.responseText);
                                assetM.setMODDetails(respJson);
                                that.quoteDetailView.render(symbol);
                                $('#quotedetailschartholder').empty();
                                app.chartView.renderTodayChart(symbol,"quotedetailschartholder");

                                if (!this.newssubview){
                                    this.newssubview = new app.NewsSubView();
                                }
                                this.newssubview.render("QuoteDetailNewsView"); //newsDivForMain

                            });

                    }
                },
                function(respData) {

                    alert('error');
                });
        }  else{
            that.quoteDetailView.render(symbol);
            $('#quotedetailschartholder').empty();
            app.chartView.renderTodayChart(symbol,"quotedetailschartholder");
        }

        
    });
    
   app.router.on('route:balances',function(actions){
        app.balanceView.render();
    });
    
    app.router.on('route:optionchain',function(actions){
            app.optionchainView.render();
    });
    
    app.router.on('route:positions',function(actions){
                app.poistionsView.render();
    });

    app.router.on('route:custom',function(actions){
        app.customView.render();
    });

