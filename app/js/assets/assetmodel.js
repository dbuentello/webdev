var app = app || {};

var AssetModel = Backbone.Model.extend({
	defaults:{
		symbol:"",
		bid:"",
		ask:"",
		last:"",
		change:"",
		high:"",
		volume:"",
		changePercent:"",
		dayRange:"",
		description:"",
		assetType:""
	},
	initialize: function(){
		console.log(" initialise watch list object");

	},
	
	dayRange: function(){
		return this.get('low') + " - " +this.get('high');
	},
	
	yearRange: function(){
		return this.get('yearLow') + " - " +this.get('yearHigh');
	},
	
	yearRangeBoxes: function(){
		var resp = "";
		var diff = (this.get('yearHigh') - this.get('yearLow') )/10
		var val1 = this.get('yearLow');
		var val2 = this.get('yearLow')+diff ;
		for(var i=0;i < 10 ; i++){
			if(this.get('last') > val1 && this.get('last') < val2){
				resp  = resp + "<p class='blackbox'>";				
			}else{
				resp  = resp + "<p class='greybox'>";
			}
			val1 = val1+diff;
			val2 = val2+diff;
		}
		
		return resp;
	},
	
	setMODDetails : function(respJson){
		if(respJson.Results != null){
			respJson = respJson.Results[0];
		}else if(respJson.Overview != null){
			respJson = respJson.Overview;
		}
		this.set({divDate:new Date(respJson.ExDivDate)});
		this.set({marktetCap:respJson.MarketCap});
		this.set({sector:respJson.Sector});
		this.set({industry:respJson.Industry});
		this.set({peRatio:respJson.PERatio});
		this.set({divYield:respJson.AnnualDividend});
		this.set({histVolatility:respJson.HistoricalVolatility});
		
		if(this.get('assetType')== 'ETF'){
			this.set({ProspectusLink:respJson.ProspectusLink});
			this.set({NetAssets:respJson.NetAssets});
			this.set({LeveragedETFFactor:respJson.LeveragedETFFactor});
			this.set({InceptionDate:new Date(respJson.InceptionDate)});
			this.set({StrategyText:respJson.StrategyText});
			
		}
	},
	
	setOptionDetails : function(optObj){
		this.set({bid:optObj.bid});
		this.set({ask:optObj.ask});
		this.set({last:optObj.last});
		this.set({ITM:optObj["in-the-money"]});		
	},
	
	set: function(key, value, options) {
	    // Normalize the key-value into an object
	    if (_.isObject(key) || key == null) {
	        attrs = key;
	        options = value;
	    } else {
	        attrs = {};
	        if(key == 'assetType'){
	        	if(value =='EQ'){
	        		value = 'E';
	        	}
	        }
	        attrs[key] = value;
	        
	    }
	
	    // Go over all the set attributes and make your changes
	    for (attr in attrs) {
	        if (attr == 'change') {
	            attrs['changePercent'] = (attrs['change'] /(this.get('last')- attrs['change'] ) * 100).toFixed(2) +"%";
	        }
	    }
	
	    return Backbone.Model.prototype.set.call(this, attrs, options);
	}
});