var app = app || {}

app.NewsSubView = Backbone.View.extend({
	el:'.page',
	initialize: function () {
		_.bindAll(this, 'renderAll', 'addItem');
	},
	
	render: function () {
	
		console.log('render news subb view');
		this.collection = new NewsHeadLineModelCollection();
		
		this.$el.html("NEWSSSS ");
		this.collection.on('reset', this.renderAll);
        	//this.collection.on("add",this.addItem);
        	this.collection.fetch();
	},
	
	renderAll: function(collection) {
		var tmp = _.template(utils.templates["newSubView"], {coll:this.collection});
		this.$el.html(tmp);		    
        },
	
	addItem: function(item) {
	       console.log(item);
        },
	
	loadNewsDetails: function(newsid, spanid){
		console.log(newsid);
	}
	
});