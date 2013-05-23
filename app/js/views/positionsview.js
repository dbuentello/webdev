var app = app || {};

var PoistionsView = Backbone.View.extend({
    el: '.page',
    initialize: function() {

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
    createPositionsGrid:function(){
        var theme = 'bootstrap';
        var activeAccountId = app.tdaUser.get('activeAccount').get('accountNum');
        var collection = app.positionsByAccount[activeAccountId];
        var data = [];
        collection.each(function(models){
            data.push(models.attributes);
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
                    { name: 'purchasePrice', type: 'number' }

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
                    { text: 'CLOSE PRICE', datafield: 'closePrice', columntype: 'textbox',width: '10%',cellsalign: 'right',align:'right'} ,
                    { text: 'PURCHASE PRICE', datafield: 'purchasePrice', columntype: 'textbox',cellsalign: 'right',align:'right'}
                ]
            });
        $("#positionGrid").jqxGrid('hidecolumn', 'underlyingSymbol');
    }
});


