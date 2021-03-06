
// WATCH LIST View

app.currentWLMap = {};

var WatchlistView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
	 	this.chartlist = [];
        this.viewCreated = false;
		console.log("Watch initialize "+app.userProfileModel);
		_.bindAll(this,'render','update');

	},
	events: {
	        'click #wlchartview': 'renderChartList',
            'click #wlheatview': 'renderHeatMapView',
	        'click #wllistview': 'render'
    	},



        renderHeatMapView: function(){
            if(this.chartlist.length > 0){
                for(var i=0; i < this.chartlist.length ; i++){
                    this.chartlist[i].destroy();
                }
            }
            var template = _.template($('#watch-list-heatmap-template').html(), {coll:this.collection,wlmap:app.watchListMap});
            this.$el.html(template);
            wlLview = this;
            this.chartlist = [];
            var arrr = [];
            arrr.push( ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)']);
            arrr.push(['Global',    null,                 0,                               0]);

            this.collection.each(function(model){
                var symbol = model.get('symbol');
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
                                    wlLview.renderHeatMapView();
                                });

                        }
                    },
                    function(respData) {

                        alert('error');
                    });
                }
                if(assetM.get('assetType') =='E'){
                    var obj = [symbol+" "+assetM.get('changePercent') , 'Global',assetM.get('marktetCap'),parseFloat(assetM.get('changePercent'))*100];
                    arrr.push(obj);
                }
            });
            var datasdsd = google.visualization.arrayToDataTable(arrr);

            // Create and draw the visualization.
            var tree = new google.visualization.TreeMap(document.getElementById('heatmapdiv'));
            tree.draw(datasdsd, {
                minColor: 'red',
                midColor: '#1C1C1C',
                midHighlightColor:'orange',
                maxColor: 'green',
                maxColorValue:200,
                minColorValue:-200,
                headerHeight: 0,
                fontColor: 'white',
                showScale: true});

            google.visualization.events.addListener(tree, 'select', function(item){
               // alert( datasdsd.getValue(tree.getSelection()[0].row,0));
                var sym =       datasdsd.getValue(tree.getSelection()[0].row,0).split(" ");
                Backbone.history.navigate('quotedetails/'+sym[0], true);
                //or show the row details in a div. I will get some help from jquery to select a specific div:
            });
        },
    	renderChartList: function(){
    		if(this.chartlist.length > 0){
    			for(var i=0; i < this.chartlist.length ; i++){
    				this.chartlist[i].destroy();
    			}
    		}
    		var template = _.template($('#watch-list-chart-template').html(), {coll:this.collection,wlmap:app.watchListMap});
		this.$el.html(template);
    		this.chartlist = [];
    		wlLview = this;
    		this.collection.each(function(model){
    			$('#chartsgrid').append("<div class='span4' style='height:180px;' id='chartsgrid"+model.get('symbol')+"'> </div>");
			var ch = new ChartView();
			wlLview.chartlist.push(ch);
			ch.renderTodayChart(model.get('symbol'),"chartsgrid"+model.get('symbol'));				
			
		});
    		
    		
    	},

	render: function() {
	 //TODO: check to see if session is valid -  For now if the api returns invalid session please set the user model to {}
	        if ( !app.userProfileModel.get('session-id')) {
	            app.loginView = new LoginView();
	            app.loginView.render();
	        }
	        else {
	            if(!app.watchListMap){
	            	this.$el.html("Retriveing WATCHLISTTT");
	            	console.log("NO wathclist");
	            	var url = app.apiUrl+'/apps/100/GetWatchlists;jsessionid='+app.userProfileModel.get('session-id');
			$.ajax({
				url:url,
				type:'POST',
				dataType:'',
				data:'source=TAG',
				success:function(data) {
				        var xml = parseXml(data);

					var jsonResponse  = xmlToJson(xml);

					if ( jsonResponse.amtd.error ){
						alert(JSON.stringify(jsonResponse.amtd.error));
					}	
					else
					{ 
					       app.watchListMap = {};
					       var watchlists = jsonResponse.amtd["watchlist-result"]["watchlist"];
					       	for(var i=0;i <watchlists.length;i++){
					       		var wl = watchlists[i];
					       		var id = wl.id;
					       		var name = wl.name;
					       		var wlc = new WatchListModelCollection();
					       		app.watchListMap[name] = wlc;
					       		
					       		var wlsymbol = wl["symbol-list"]["watched-symbol"];
					       		for(var j=0;j <wlsymbol.length;j++){
					       			var symboldetails = wlsymbol[j];
					       			var avgPrice = symboldetails["average-price"];
					       			var quantity = symboldetails["quantity"];
					       			//var assetType = symboldetails["security"]["asset-type"];
					       			var desc = symboldetails["security"]["description"];
					       			var symbol = symboldetails["security"]["symbol"];
					       			var wlObj = new WatchListModel({symbol:symbol,description:desc});
					       			wlObj.setAsset(app.assetcache.getAssetObject(symbol));
					       			wlObj.get('asset').set({description:desc});
					       			wlc.add(wlObj);
					       		}
					       	}
					       	//var template = _.template($('#watch-list-template').html(), {coll:wlc,wlmap:app.watchListMap});
						//this.$el.html(template);
						
						// This is an error
						//Backbone.history.navigate('watchlist', true); 
						app.watchlistView.collection = wlc;
						
						app.watchlistView.render();
						app.watchlistView.collection.on("change",app.watchlistView.update);
						app.watchlistView.collection.on("add",app.watchlistView.render);
						
					}
					console.log(jsonResponse);

				},
				error:function(data){
					console.log(data);
				}
			});
	            	
	            }else{
	                if(this.chartlist.length > 0){
				for(var i=0; i < this.chartlist.length ; i++){
					this.chartlist[i].destroy();
				}
			}
		    
    			this.chartlist = [];
	            	//this.$el.html("showing WATCHLISTTT");
	            	var template = _.template($('#watch-list-template').html(), {coll:this.collection,wlmap:app.watchListMap});
			this.$el.html(template);
			app.currentWLMap= {};
			var symbols='';
			this.collection.each(function(model){
				symbols = symbols+","+model.get('symbol');
				app.currentWLMap[model.get('symbol')]=model;
			});
			addLevel1QuoteSubscription(symbols);
			$("#watchlistTable").tablesorter();
                    this.viewCreated = true;
	            }
        	}
		
	},
	
	renderList: function(name){
		if(this.chartlist.length > 0){
		for(var i=0; i < this.chartlist.length ; i++){
				this.chartlist[i].destroy();
			}
		}
			    
    		this.chartlist = [];
		var symbols='';
		this.collection.each(function(model){
			symbols = symbols+","+model.get('symbol');
			app.currentWLMap[model.get('symbol')]=model;
		});
		unSubscribeLevel1QuoteSubscription(symbols);
		var wlc = app.watchListMap[name];
		app.watchlistView.collection = wlc;
		app.watchlistView.render();
		app.watchlistView.collection.on("change",app.watchlistView.update);
		app.watchlistView.collection.on("add",app.watchlistView.render);
		
	},
	update: function(model) {
		//this.collection.each(this.renderOne);
		var diff = model.get('changedColumns');
		for(var att in diff){
			$("#"+model.cid+att).text(model.get('asset').get(att));
			if(att == 'change' || att == 'changePercent'){
				var val= 0;
				val = model.get('asset').get(att);

				if(model.get('asset').get(att) > 0){
					$("#"+model.cid+att).removeClass().addClass("greenColorText");
					$("#"+model.cid+'changePercent').removeClass().addClass("greenColorText");
				}else {
					$("#"+model.cid+att).removeClass().addClass("redColorText");
					$("#"+model.cid+'changePercent').removeClass().addClass("redColorText");
				}
			}
		}
	}
});