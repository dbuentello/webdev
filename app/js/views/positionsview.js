var app = app || {};

var PoistionsView = Backbone.View.extend({
    el: '.page',
    initialize: function() {
        this.symbols = "";
    },
    render:function(){
        var template = _.template(utils.templates['PositionView'], {});
        this.$el.html(template);
        this.createPositionsGrid();
        return this;
    },
    events: {
        'click #expandall': 'expandAll',
        'click #collapseall': 'collapseAll'
    },
    expandAll:function(){
        $("#positionGrid").jqxGrid('expandallgroups');
    },
    collapseAll:function(){
        $("#positionGrid").jqxGrid('collapseallgroups');
    },
    update: function(model) {
        //this.collection.each(this.renderOne);
        var diff = model.get('changedColumns');

        for(var att in diff){
            $("#"+model.cid+att).text(model.get('asset').get(att));
        }
    },
    createPositionsGrid:function(){
        this.positionsLoaded = true;
        var theme = 'bootstrap';
        var activeAccountId = app.tdaUser.get('activeAccount').get('accountNum');
        var collection = app.positionsByAccount[activeAccountId];
        var data = [];
        unSubscribeLevel1QuoteSubscription(this.symbols);
        this.symbols = "";

        collection.each(function(models){
            this.symbols = this.symbols+","+models.attributes.underlyingSymbol;
            var dic = models.attributes;
            dic['cid'] = models.cid;

            var assetDic = dic['asset'].attributes;
            for (var field in assetDic){
                   dic[field] = assetDic[field] ;
            }
            data.push(dic);
        });

        addLevel1QuoteSubscription(symbols);
        collection.on("change",app.poistionsView.update);
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
                editable: true,
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
    }
});
