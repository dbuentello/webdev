/**
 * Created with IntelliJ IDEA.
 * User: wjshea
 * Date: 5/23/13
 * Time: 9:54 AM
 * To change this template use File | Settings | File Templates.
 *
 */


 var SymbolListView = Backbone.View.extend({

			symbolLookupCollection: null,
			that: this,
			initialize: function(){
				var that = this;
				symbolLookupCollection = new SymbolLookupCollection();

			});

			},

			render: function(){
				// Render the collection
				_.each(symbolLookupCollection.models, function(item){
						// Render - Finish this today
						console.log(item.get('s'));
						var view = new SymbolListItemView({model:item});
						this.$el.append(view.render().el);
				});
			},

            // Use this function to search
            search: function(searchString){
                var that = this;
                symbolLookupCollection.requestString = searchString;

                symbolLookupCollection.fetch({
                    success: function(){
                        that.render();
                    }
                });
            }
		});

 var SymbolListItemView = Backbone.View.extend({



			initialize: function(){
				console.log(this.model.get("s"));
				// model
			},

			render: function(){
				console.log(this.model.get("s"));
				return this.model.toJSON();

			}
 });
