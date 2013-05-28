/**
 * Created with IntelliJ IDEA.
 * User: wjshea
 * Date: 5/23/13
 * Time: 9:51 AM
 * To change this template use File | Settings | File Templates.
 */
var SymbolLookupCollection = Backbone.Collection.extend({

        url: function(){
            var requestUrl = 'https://research.ameritrade.wallst.com/wwws/API/FastLookup/Lookup.asp?user_id=mobileapi&user_password=mobileapi';
            requestUrl = requestUrl + '&q='+this.requestString;
            return requestUrl;
        } ,

        parse: function(data){
            return data.Results;

        }
});