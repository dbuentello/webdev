var app = app || {};
var BalanceView = Backbone.View.extend({
    el: '.page',    
    initialize: function() {
        this.balanceModel = new BalanceModel();
        this.initialLoad = true;
        this.activeAccount = '';
        this.accountMap = {};
        _.bindAll(this, 'render');
        this.balanceModel.bind('change', this.render);
        app.accountEvent.on("account:changeEvent", this.render);
    },
            
    render: function() {       
        var template = _.template(utils.templates['BalanceView'], {model: this.balanceModel, accountMap: app.tdaUser.get('accountsMap'),
            activeAccount: app.tdaUser.get('activeAccount').get('accountNum')});        
        this.$el.html(template);
        if (this.initialLoad) { 
            this.accountMap = app.tdaUser.get('accountsMap');
            if (app.tdaUser.get('multipleAccount'))
                this.getMultipleAccountBalance();
            else
                this.getSingleAccountBalance();
        }
        return this;
    },
            
     events: {     
        'change #accountType':  'changeAccount'  
    },
            
    changeAccount:function(){
        this.activeAccount = $('#accountType').val();    
        var activeAccountModel = this.accountMap[this.activeAccount];
        app.tdaUser.set({activeAccount:activeAccountModel});
        this.balanceModel = app.accountAndBalancesMap[this.activeAccount];       
        app.accountEvent.trigger("account:changeEvent");
        
    },
            
    getSingleAccountBalance: function() {
        this.initialLoad = false;
        if (!app.tdaUser.get('primaryAccount') || !app.userProfileModel.get('session-id')) {
            app.balanceView.clearDetails();
            app.loginView = new LoginView();
            app.loginView.render();
            return;
        }
        var url = 'https://apis.tdameritrade.com/apps/100/BalancesAndPositions;accountid=' + app.tdaUser.get('activeAccount').get('accountNum');
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
                    app.balanceView.balanceModel = app.balanceView.setbalanceModel(balanceData);
                    app.balanceView.render();
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    getMultipleAccountBalance: function() {
        this.initialLoad = false;
        if (!app.tdaUser.get('primaryAccount') || !app.userProfileModel.get('session-id')) {
            app.balanceView.clearDetails();
            app.loginView = new LoginView();
            app.loginView.render();
            return;
        }
        var url = 'https://apista-qae8.tdameritrade.com/apps/100/MultipleBalancesAndPositions;accountid=' + app.tdaUser.get('activeAccount').get('accountNum');
        $.ajax({
            url: url,
            type: 'POST',
            dataType: '',
            data: 'source=TAG',
            success: function(data) {
                var xml = parseXml(data);
                var jsonResponse = xmlToJson(xml);
                if (jsonResponse.amtd.error) {
                    alert(JSON.stringify(jsonResponse.amtd.error));
                }
                else {
                    var balanceData = jsonResponse.amtd["all-accounts"]["all-balances"]["account-balances"];
                    app.accountAndBalancesMap = {};
                    var allBalances = new BalanceModel();
                    allBalances.set({accountID: 'ALL'});
                    for (var i = 0; i < balanceData.length; i++) {
                        if (app.tdaUser.get('activeAccount').get('accountNum') === balanceData[i]["account-id"]) {
                            app.balanceView.balanceModel = app.balanceView.setbalanceModel(balanceData[i]) ;  
                            app.accountAndBalancesMap[balanceData[i]["account-id"]] = app.balanceView.balanceModel;
                            allBalances.addAllBalance(app.balanceView.balanceModel);
                        }
                        else{
                            var balanceModel = app.balanceView.setbalanceModel(balanceData[i]);                            
                            app.accountAndBalancesMap[balanceData[i]["account-id"]] = balanceModel;
                            allBalances.addAllBalance(balanceModel);
                        }   
                        
                    }
                    
                    app.accountAndBalancesMap['ALL'] = allBalances;
                }
                app.balanceView.render();
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    setbalanceModel: function(balanceData) {      
        var balanceModel = new BalanceModel();
        balanceModel.set({accountID: balanceData["account-id"]});
        balanceModel.set({cashBalance: app.balanceView.balanceModel.setBalance(balanceData["cash-balance"])});
        balanceModel.set({accountValue: app.balanceView.balanceModel.setBalance(balanceData["account-value"])});
        balanceModel.set({moneyMarketBalance: app.balanceView.balanceModel.setBalance(balanceData["money-market-balance"])});
        balanceModel.set({longStockValue: app.balanceView.balanceModel.setBalance(balanceData["long-stock-value"])});
        balanceModel.set({longOptionValue: app.balanceView.balanceModel.setBalance(balanceData["long-option-value"])});
        balanceModel.set({shortStockValue: app.balanceView.balanceModel.setBalance(balanceData["short-stock-value"])});
        balanceModel.set({shortOptionValue: app.balanceView.balanceModel.setBalance(balanceData["short-option-value"])});
        balanceModel.set({mutualFundValue: app.balanceView.balanceModel.setBalance(balanceData["mutual-fund-value"])});
        balanceModel.set({bondValue: app.balanceView.balanceModel.setBalance(balanceData["bond-value"])});
        balanceModel.set({accountValue: app.balanceView.balanceModel.setBalance(balanceData["account-value"])});
        balanceModel.set({pendingDeposits: app.balanceView.balanceModel.setBalance(balanceData["pending-deposits"])});
        balanceModel.set({savingsBalance: app.balanceView.balanceModel.setBalance(balanceData["savaings-balance"])});
        balanceModel.set({marginBalance: app.balanceView.balanceModel.setBalance(balanceData["margin-balance"])});
        balanceModel.set({shortBalance: app.balanceView.balanceModel.setBalance(balanceData["short-balance"])});
        balanceModel.set({longMarginableValue: app.balanceView.balanceModel.setBalance(balanceData["long-marginable-value"])});
        balanceModel.set({shortMarginableValue: app.balanceView.balanceModel.setBalance(balanceData["short-marginable-value"])});
        balanceModel.set({marginEquity: app.balanceView.balanceModel.setBalance(balanceData["margin-equity"])});
        balanceModel.set({equityPercentage: app.balanceView.balanceModel.setBalance(balanceData["equity-percentage"])});
        balanceModel.set({cashForWithdrawal: app.balanceView.balanceModel.setBalance(balanceData["cash-for-withdrawal"])});   
        balanceModel.set({cashDebitCallValue: app.balanceView.balanceModel.setBalance(balanceData["cash-debit-call-value"])});   
        balanceModel.set({unsettledCash: app.balanceView.balanceModel.setBalance(balanceData["unsettled-cash"])});   
       
        balanceModel.set({stockBuyingPower: balanceData["stock-buying-power"]});       
        balanceModel.set({optionBuyingPower: balanceData["option-buying-power"]});
        balanceModel.set({dayTradingBuyingPower: balanceData["day-trading-buying-power"]});
        balanceModel.set({availableFundsForTrading: balanceData["available-funds-for-trading"]});
        balanceModel.set({dayEquityCallValue: balanceData["day-equity-call-value"]});
        
        balanceModel.set({bondValue: app.balanceView.balanceModel.setBalance(balanceData["bond-value"])});
        if (balanceModel.get('accountValue').get('change') > 0){
            balanceModel.set({todayNetChangeColor: 'greenColorText'});
        }
        else if (balanceModel.get('accountValue').get('change') < 0) {
            balanceModel.set({todayNetChangeColor: 'redColorText'});
        }
        balanceModel.set({availableFundsForTrading: balanceData["available-funds-for-trading"]});
        var cashBal = parseFloat(balanceModel.get('cashBalance').get('current')) + parseFloat(balanceModel.get('moneyMarketBalance').get('current'));
        balanceModel.set({cashBal: cashBal});
        return balanceModel;
    },
    clearDetails: function() {
        this.initialLoad = true;
    }
});