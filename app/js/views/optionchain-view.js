
// WATCH LIST View

app.currentWLMap = {};

var OptionChainView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
	 	_.bindAll(this,'render','update');

	},
	
	render: function() {	 
		if ( !app.userProfileModel.get('session-id')) {
		    app.loginView = new LoginView();
		    app.loginView.render();
		}else {
		 	if(!app.optionchainMap){
				app.optionchainMap = {};
				//get the option chain
				getOptionChain('AAPL',function(data) { 
					var xml = parseXml(data);
					var jsonResponse  = xmlToJson(xml);
					var optionchains = jsonResponse.amtd["option-chain-results"]["option-date"];
					for(var i=0;i <optionchains.length;i++){
						var optiondatedetails = optionchains[i];
						var date = optiondatedetails["date"];
						var dateToExpire = optiondatedetails["days-to-expiration"];
						var expirationType = optiondatedetails["expiration-type"];
						var strikes = optiondatedetails["option-strike"];

						var opc = new OptionChainListModelCollection();
						app.optionchainMap[date] = opc;

						for(var j=0;j <strikes.length;j++){
							var strikeDetails = strikes[j];
							var callObj = strikeDetails["call"];
							var putObj = strikeDetails["put"];
							var callSymb = callObj["option-symbol"];
							var putSymb = putObj["option-symbol"];
							
							var strikePrice = strikeDetails["strike-price"];

							var opObj = new OptionChainListModel({callSymbol:callSymb,putSymbol:putSymb,strikePrice:strikePrice, date:date});
							var assetc = app.assetcache.getAssetObject(callSymb);
							assetc.set("assetType","O");
							assetc.setOptionDetails(callObj);
							
							var assetp = app.assetcache.getAssetObject(putSymb);
							assetp.set("assetType","O");
							assetp.setOptionDetails(putObj);

							opObj.setCallAsset(assetc);
							opObj.setPutAsset(assetp);
							opc.add(opObj);							

						}
						app.optionchainView.collection = opc;					
					}
					app.optionchainView.render();
					//app.optionchainView.collection.on("change",app.watchlistView.update);
					//app.optionchainView.collection.on("add",app.watchlistView.render);
					
				},
				function(respData) {
				});	
			}else{
				this.$el.html("showing Option chiansd");
				var tmp = _.template(utils.templates["optionchainview"], {coll:this.collection,opmap:app.optionchainMap});
				this.$el.html(tmp);
				/*var template = _.template($('#watch-list-template').html(), {coll:this.collection,wlmap:app.watchListMap});
				this.$el.html(template);
				app.currentWLMap= {};
				var symbols='';
				this.collection.each(function(model){
					symbols = symbols+","+model.get('symbol');
					app.currentWLMap[model.get('symbol')]=model;
				});
				addLevel1QuoteSubscription(symbols);
				$("#watchlistTable").tablesorter(); */
			}
		
		}
		
	},
	
	
	update: function(model) {
	
	}
});