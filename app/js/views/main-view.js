
// Main Application View
var app = app || {};

var MainView = Backbone.View.extend({
	el: '.page',
	initialize: function(){
		console.log("initialize");
	},		

	render: function() {
		console.log('rendering');

        //TODO: check to see if session is valid -  For now if the api returns invalid session please set the user model to {}
        if ( !app.userProfileModel.get('session-id')) {
            app.loginView = new LoginView();
            app.loginView.render();
        }
        else {
            var template = _.template($('#tda-main-page').html(), {});
            this.$el.html(template);
        }


	}
});