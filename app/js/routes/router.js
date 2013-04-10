

	var app = app || {};

	<!-- Router -->
	var Router = Backbone.Router.extend({
		routes: {
			'':'home',
			'watchlist':'watchlist',
			'watchlistname/:name':'watchlistname',
            'chart':'chart',
            'quotedetails/:symbol': 'quotedetails'
		}	
	});

    app.router = new Router();

    app.router.on('route:home',function(actions){
        app.mainView.render();

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


    app.router.on('route:quotedetails', function (symbol){
    console.log('quotedetails - route');
     app.quoteDetailView.render();
});
