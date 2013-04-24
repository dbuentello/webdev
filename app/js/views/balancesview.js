var app = app || {};
var BalanceView = Backbone.View.extend({
    el: '.page',  
    model:this.balanceModel,
    initialize: function() {
         this.balanceModel = new BalanceModel();
         this.initialLoad = true;
        _.bindAll(this, 'render');
        this.balanceModel.bind('change', this.render);
    },
    render: function() {       
        var template = _.template(utils.templates['BalanceView'], {model:this.balanceModel});
        // var template = _.template(utils.templates['ChartView']);
        this.$el.html(template);     
        if(this.initialLoad)
             this.getBalance();                   
        return this;
    },
    getBalance: function() {
       this.initialLoad = false;
        var url = 'https://apis.tdameritrade.com/apps/100/BalancesAndPositions;accountid=' + app.tdaUser.get('primaryAccount').get('accountNum');
        $.ajax({
            url: url,
            type: 'POST',
            dataType: '',
            data: 'source=TAG,type=b',
            success: function(data) {
                var xml = parseXml(data);
                var jsonResponse = xmlToJson(xml);
                if (jsonResponse.amtd.error) {
                    alert(JSON.stringify(jsonResponse.amtd.error));
                }
                else {
                        var balanceData = jsonResponse.amtd['balance'];
                        app.balanceView.balanceModel.set({accountID:balanceData["account-id"]});
                         app.balanceView.balanceModel.set({cashBalance:{initial:balanceData["cash-balance"]["initial"],current:balanceData["cash-balance"]["current"],change:balanceData["cash-balance"]["change"]}});
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
});