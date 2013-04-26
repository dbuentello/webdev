var app = app || {};

var Balance = Backbone.Model.extend({
    default: {
        initial: 0,
        current: 0,
        change: 0
    },
    initialize:function(){
      this.initial =0;
      this.current=0;
      this.change=0;
    },
    addBalance:function(balance){
            this.initial += balance.initial;
            this.current += balance.current;
            this.change +=balance.change;
    }
});

var BalanceModel = Backbone.Model.extend({
    defaults: {
        accountID: "",
        dayTrader: false,
        roundTrips: 0,
        restrictedClosingTransactionsOnly: false,
        cashBal:0,
        cashBalance: new Balance(),
        moneyMarketBalance: new Balance(),
        longStockValue: new Balance(),
        longOptionValue:new Balance(),
        shortStockValue: new Balance(),
        shortOptionValue: new Balance(),
        mutualFundValue: new Balance(),
        bondValue: new Balance(),
        accountValue: new Balance(),
        todayNetChangeColor:'',
        pendingDeposits: new Balance(),
        savingsBalance: new Balance(),
        marginBalance: new Balance(),
        shortBalance: new Balance(),
        longMarginableValue: new Balance(),
        shortMarginableValue: new Balance(),
        marginEquity: new Balance(),
        equityPercentage: new Balance(),
        stockBuyingPower: 0,
        optionBuyingPower: 0,
        dayTradingBuyingPower: 0,
        availableFundsForTrading: 0,
        maintenanceRequirement: new Balance(),
        maintenanceCallValue: new Balance(),
        regulationTCallValue: new Balance(),
        dayTradingCallValue: new Balance(),
        dayEquityCallValue: 0,
        inCall: '',
        inPortentialCall: '',
        cashForWithdrawal: new Balance(),
        unsettledCash: new Balance(),
        cashDebitCallValue: new Balance(),
        nonMarginableFunds: 0
    },   
    
    setBalance:function(balanceObject){
        var balance = new Balance();
        if(balanceObject){
            balance.set({initial:balanceObject['initial']});
            balance.set({current:balanceObject['current']});
            balance.set({change:balanceObject['change']});
        }
        
        return balance;        
    }    
    
});


