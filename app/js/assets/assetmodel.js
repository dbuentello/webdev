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
		return this.get('high') + " - " +this.get('low');
	},
	
	yearRange: function(){
		return this.get('yearHigh') + " - " +this.get('yearLow');
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