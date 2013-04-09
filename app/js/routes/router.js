<<<<<<< HEAD
	var app = app || {};

	<!-- Router -->
	var Router = Backbone.Router.extend({
		routes: {
			'':'home',
			'watchlist':'watchlist',
			'watchlistname/:name':'watchlistname',
                        'chart':'chart'
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

=======
var app = app || {};

<!-- Router -->
var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'watchlist': 'watchlist',
        'watchlistname/:name': 'watchlistname'
    }
});

app.router = new Router();

app.router.on('route:home', function (actions) {
    app.mainView.render();

});

app.router.on('route:watchlist', function (actions) {
    app.watchlistView.render();
});

app.router.on('route:watchlistname', function (name) {
    app.watchlistView.renderList(name);

});



>>>>>>> b37c51df8e1ce2ef0556cf4379fa14bc6c7cc7e3
