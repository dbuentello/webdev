var app = app || {};

var PoistionsView = Backbone.View.extend({
    el: '.page',
    initialize: function() {
        this.symbols = "";
    },
    render:function(){
        var template = _.template(utils.templates['PositionView'], {});
        this.$el.html(template);
        this.createPositionGraph();
        this.createPositionsGrid();
        return this;
    },
    events: {
        'click #expandall': 'expandAll',
        'click #collapseall': 'collapseAll',
        'click #positionGraphBtn': 'renderPositionGraph',
        'click #positionListBtn': 'renderPositionList'
    },
    renderPositionGraph:function(){
        $('#positionGraph').show();
        $("#positionGrid").hide();
    },
    renderPositionList:function(){
        $('#positionGraph').hide();
        $("#positionGrid").show();
    },
    expandAll:function(){
        $("#positionGrid").jqxGrid('expandallgroups');
    },
    collapseAll:function(){
        $("#positionGrid").jqxGrid('collapseallgroups');
    },
    update: function(model) {
        var diff = model.get('changedColumns');

        for(var att in diff){
            $("#"+model.cid+att).text(model.get('asset').get(att));
        }
        if(att == 'change' || att == 'changePercent'){
            var val= 0;
            val = model.get('asset').get(att);
            console.log(att);

            if(model.get('asset').get(att) > 0){
                $("#"+model.cid+att).removeClass().addClass("greenColorText");
            }else {
                $("#"+model.cid+att).removeClass().addClass("redColorText");
            }
        }
    },
    createPositionGraph:function(){
        $("#positionGrid").hide();
        $('#positionGraph').show();
        var activeAccountId = app.tdaUser.get('activeAccount').get('accountNum');
        var collection = app.positionsByAccount[activeAccountId];
        var graphData = new Array();
        collection.each(function(models,i){
            var dic = models.attributes;
            dic['name'] =  models.attributes.underlyingSymbol;
            dic['y']  = Number(models.attributes.currentValue);
            graphData[i] = dic;
        });
        Highcharts.getOptions().colors =   ['#CC3C24', '#63C814B','#A72B13', '#79170A',  '#56AF55', '#CB7221', '#63C151'];
        $('#positionGraph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            theme:{
                colors: ['#CC3C24', '#A72B13', '#79170A', '#63C814B', '#56AF55', '#CB7221', '#63C151']
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b> <br/>Daily Gain: '+ Number(this.point.dayGainPercent*100).toFixed(2) +' % <br/> Gain:' + Number(this.point.gainPercent*100).toFixed(2)+ '%';
                        }
                    }
                }

            },
            series: [{
                type: 'pie',
                name: 'Gain Percentage',
                data: graphData
            }]
        })
    },
    createPositionsGrid:function(){
        $('#positionGraph').hide();
        $("#positionGrid").show();

        var theme = 'bootstrap';
        var activeAccountId = app.tdaUser.get('activeAccount').get('accountNum');
        var collection = app.positionsByAccount[activeAccountId];
        var data = [];
        unSubscribeLevel1QuoteSubscription(this.symbols);
        this.symbols = "";

        collection.each(function(models){
            this.symbols = this.symbols+","+models.attributes.underlyingSymbol;
            var dic = models.attributes;
//            var assetDic = dic['asset'].attributes;
//            for (var field in assetDic){
//                dic[field] = assetDic[field] ;
//            }

            dic['cid'] = models.cid;
            data.push(dic);
        });


        var source =
        {
            localdata: data,
            datafields:
                [
                    { name: 'underlyingSymbol', type: 'string' },
                    { name: 'symbol', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'quantity', type: 'number' },
                    { name: 'closePrice', type: 'number' } ,
                    { name: 'purchasePrice', type: 'number' } ,
                    { name: 'bid', type: 'number'},
                    { name: 'ask', type: 'number' },
                    { name: 'change', type: 'number' },
                    { name: 'changePercent', type: 'number'},
                    { name: 'volume', type: 'number'},
                    { name: 'currentValue', type: 'number'},
                    { name: 'cid', type: 'string' }


                ],
            datatype: "array",
            updaterow: function (rowid, rowdata) {
                // synchronize with the server - send update command
            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source);

        var toThemeProperty = function (className) {
            return className + " " + className + "-" + theme;
        }
        var groupsrenderer = function (text, group, expanded, data) {
            return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: relative;"><span>' + group + '</span></div>';
        } ;
        var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties,rowData) {
            var divId = rowData.cid + columnfield;
            return '<div style="margin: 4px; float: ' + columnproperties.cellsalign + '" id=' + divId + '>' + value + '</div>';
        }

        $("#positionGrid").jqxGrid(
            {
                theme: theme,
                width : "100%",
                height:"90%",
                rowsheight:30,
                source: dataAdapter,
                editable: false,
                groupable: true,
                groupsrenderer: groupsrenderer,
                selectionmode: 'singlerow',
                showgroupsheader:false,
                groups: ['underlyingSymbol'],
                columns: [
                    { text: 'SYM', datafield: 'underlyingSymbol', width:0},
                    { text: 'INSTRUMENT', datafield: 'description', width:'22%'},
                    { text: 'QTY', datafield: 'quantity',columntype: 'textbox', cellsalign: 'right', width: '7%',align:'right'},
                    { text: 'BID', datafield: 'bid', columntype: 'textbox',cellsalign: 'right',align:'right',cellsrenderer:cellsrenderer} ,
                    { text: 'ASK', datafield: 'ask', columntype: 'textbox',cellsalign: 'right',align:'right',cellsrenderer:cellsrenderer} ,
                    { text: 'CHANGE', datafield: 'change', columntype: 'textbox',cellsalign: 'right',align:'right',cellsrenderer:cellsrenderer} ,
                    { text: 'CHNG %', datafield: 'changePercent', columntype: 'textbox',cellsalign: 'right',align:'right',cellsrenderer:cellsrenderer} ,
                    { text: 'VOLUME', datafield: 'volume', columntype: 'textbox',cellsalign: 'right',align:'right',cellsrenderer:cellsrenderer} ,
                    { text: 'CLOSE PRICE', datafield: 'closePrice', columntype: 'textbox',width: '10%',cellsalign: 'right',align:'right'} ,
                    { text: 'PURCHASE PRICE', datafield: 'purchasePrice', columntype: 'textbox',cellsalign: 'right',align:'right'}

                ]
            });
        $("#positionGrid").jqxGrid('hidecolumn', 'underlyingSymbol');
        this.expandAll();
        collection.on("change",app.poistionsView.update);
        addLevel1QuoteSubscription(symbols);
    }
});
