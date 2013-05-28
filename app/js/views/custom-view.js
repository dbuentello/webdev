var app = app || {};

var CustomView = Backbone.View.extend({
    el: '.page',
    initialize: function() {

    },
    render:function(){
        var template = _.template(utils.templates['CustomView'], {});
        this.$el.html(template);

        var ch = new ChartView();
        ch.renderTodayChart('AAPL',"container");

        var ch1 = new ChartView();
        ch1.renderTodayChart('AAPL',"container1");

        var testnews = new app.NewsSubView();
        testnews.render("container6");

        $( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
        $( "#draggable3" ).resizable({
            resize: function() {
                ch.chartInstance.setSize(
                    this.offsetWidth - 20,
                    this.offsetHeight - 20,
                    false
                );
            }
        })

        $( "#draggable5" ).draggable({ containment: "#containment-wrapper", scroll: false });
        $( "#draggable5" ).resizable({
            resize: function() {
                ch1.chartInstance.setSize(
                    this.offsetWidth - 20,
                    this.offsetHeight - 20,
                    false
                );
            }
        })
        $( "#draggable6" ).draggable({ containment: "#containment-wrapper", scroll: false });
        $( "#draggable6" ).resizable({
            resize: function() {
                $('#container6').resize(
                    this.offsetWidth - 20,
                    this.offsetHeight - 20,
                    false
                );
            }
        })


    }
});


