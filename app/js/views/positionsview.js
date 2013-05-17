var app = app || {};

var PoistionsView = Backbone.View.extend({
    el: '.page',    
     initialize: function() {
         
     },
     render:function(){
         var template = _.template(utils.templates['PositionView'], {});      
        this.$el.html(template); 
     }
});


