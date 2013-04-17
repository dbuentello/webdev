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
		assettype:""
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
		this.set({divDate:new Date(respJson.Overview.ExDivDate)});
		this.set({marktetCap:respJson.Overview.MarketCap});
		this.set({sector:respJson.Overview.Sector});
		this.set({industry:respJson.Overview.Industry});
		this.set({peRatio:respJson.Overview.PERatio});
		this.set({divYield:respJson.Overview.AnnualDividend});
		this.set({histVolatility:respJson.Overview.HistoricalVolatility});
	},
	
	
	
	set: function(key, value, options) {
	    // Normalize the key-value into an object
	    if (_.isObject(key) || key == null) {
	        attrs = key;
	        options = value;
	    } else {
	        attrs = {};
	        attrs[key] = value;
	    }
	
	    // Go over all the set attributes and make your changes
	    for (attr in attrs) {
	        if (attr == 'change') {
	            attrs['changePercent'] = (attrs['change'] /(this.get('last')- attrs['change'] ) * 100).toFixed(2);
	        }
	    }
	
	    return Backbone.Model.prototype.set.call(this, attrs, options);
	}
});