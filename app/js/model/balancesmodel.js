var app = app || {};

var Balance = Backbone.Model.extend({
    defaults: {
        initial: 0,
        current: 0,
        change: 0
    },
    initialize:function(){
      this.initial =0;
      this.current=0;
      this.change=0;
    },
    addBalance:function(addBalance){
            var initial = parseFloat(this.get('initial')) + parseFloat(addBalance.get('initial'));
            this.set({initial: initial});
            
            var current = parseFloat(this.get('current')) + parseFloat(addBalance.get('current'));
            this.set({current: current});
            
            var change = parseFloat(this.get('change')) + parseFloat(addBalance.get('change'));
            this.set({change: change});               
           
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
    },
    addAllBalance:function(accountBalance){
        var roundTrips = parseFloat(this.get('roundTrips')) + parseFloat(accountBalance.get('roundTrips'));
        this.set({roundTrips: roundTrips});
        var availableFundsForTrading = parseFloat(this.get('availableFundsForTrading')) + parseFloat(accountBalance.get('availableFundsForTrading'));
        this.set({availableFundsForTrading : availableFundsForTrading});
       
        var accountValue = this.get('accountValue');       
        accountValue.addBalance(accountBalance.get('accountValue'));
        this.set({accountValue : accountValue});
        if (accountValue.get('change') > 0){
            this.set({todayNetChangeColor: 'greenColorText'});
        }
        else if (accountValue.get('change') < 0) {
            this.set({todayNetChangeColor: 'redColorText'});
        }
        var moneyMarketBalance = this.get('moneyMarketBalance');   
        moneyMarketBalance.addBalance(accountBalance.get('moneyMarketBalance'));
        this.set({moneyMarketBalance : moneyMarketBalance});
        
        var longStockValue = this.get('longStockValue');   
        longStockValue.addBalance(accountBalance.get('longStockValue'));
        this.set({longStockValue : longStockValue});
        
        var longOptionValue = this.get('longOptionValue');   
        longOptionValue.addBalance(accountBalance.get('longOptionValue'));
        this.set({longOptionValue :longOptionValue });
        
        var shortStockValue = this.get('shortStockValue');   
        shortStockValue.addBalance(accountBalance.get('shortStockValue'));
        this.set({shortStockValue : shortStockValue});
        
        var mutualFundValue = this.get('mutualFundValue');   
        mutualFundValue.addBalance(accountBalance.get('mutualFundValue'));
        this.set({mutualFundValue :mutualFundValue});
        
        var bondValue = this.get('bondValue');   
        bondValue.addBalance(accountBalance.get('bondValue'));
        this.set({bondValue : bondValue});
        
        var shortOptionValue = this.get('shortOptionValue');   
        shortOptionValue.addBalance(accountBalance.get('shortOptionValue'));
        this.set({shortOptionValue : shortOptionValue});
        
        var pendingDeposits = this.get('pendingDeposits');  
        pendingDeposits.addBalance(accountBalance.get('pendingDeposits'));
        this.set({pendingDeposits : pendingDeposits});
        
        var savingsBalance = this.get('savingsBalance');   
        savingsBalance.addBalance(accountBalance.get('savingsBalance'));
        this.set({savingsBalance : savingsBalance});
        
        var marginBalance = this.get('marginBalance');  
        marginBalance.addBalance(accountBalance.get('marginBalance'));
        this.set({marginBalance : marginBalance});
        
        var shortBalance = this.get('shortBalance');   
        shortBalance.addBalance(accountBalance.get('shortBalance'));
        this.set({shortBalance : shortBalance});
        
        var longMarginableValue = this.get('longMarginableValue');   
        longMarginableValue.addBalance(accountBalance.get('longMarginableValue'));
        this.set({longMarginableValue :longMarginableValue });
        
        var shortMarginableValue = this.get('shortMarginableValue');  
        shortMarginableValue.addBalance(accountBalance.get('shortMarginableValue'));
        this.set({shortMarginableValue :shortMarginableValue });
        
        var marginEquity = this.get('marginEquity');   
        marginEquity.addBalance(accountBalance.get('marginEquity'));
        this.set({marginEquity : marginEquity});
        
        var equityPercentage = this.get('equityPercentage');  
        equityPercentage.addBalance(accountBalance.get('equityPercentage'));
        this.set({equityPercentage : equityPercentage});
        
        var cashForWithdrawal = this.get('cashForWithdrawal');   
        cashForWithdrawal.addBalance(accountBalance.get('cashForWithdrawal'));
        this.set({cashForWithdrawal :cashForWithdrawal });
        
        var cashDebitCallValue = this.get('cashDebitCallValue');   
        cashDebitCallValue.addBalance(accountBalance.get('cashDebitCallValue'));
        this.set({cashDebitCallValue :cashDebitCallValue});
        
        var unsettledCash = this.get('unsettledCash');   
        unsettledCash.addBalance(accountBalance.get('unsettledCash'));
        this.set({unsettledCash : unsettledCash});
        
        var stockBuyingPower = parseFloat(this.get('stockBuyingPower')) + parseFloat(accountBalance.get('stockBuyingPower'));
        this.set({stockBuyingPower : stockBuyingPower});
        
        var optionBuyingPower = parseFloat(this.get('optionBuyingPower')) + parseFloat(accountBalance.get('optionBuyingPower'));
        this.set({optionBuyingPower : optionBuyingPower});
        
        var dayTradingBuyingPower = parseFloat(this.get('dayTradingBuyingPower')) + parseFloat(accountBalance.get('dayTradingBuyingPower'));
        this.set({dayTradingBuyingPower : dayTradingBuyingPower});
        
        var dayEquityCallValue = parseFloat(this.get('dayEquityCallValue')) + parseFloat(accountBalance.get('dayEquityCallValue'));
        this.set({dayEquityCallValue : dayEquityCallValue});
        
        var cashBal = parseFloat(this.get('cashBal')) + parseFloat(accountBalance.get('cashBal'));
        this.set({cashBal : cashBal});
           
    }        
    
});


