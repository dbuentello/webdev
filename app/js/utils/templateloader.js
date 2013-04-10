window.utils = {
    templates:{},

    loadTemplates: function(names, callback){
        var that = this;
        var loadTemplate = function(index){
            var name = names[index];
            console.log('Loading template: ' + name);
            $.get('app/js/template/' + name + '.html', function(data) {
                that.templates[name] = data;
                index++;
                if(index < names.length){
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        }
       loadTemplate(0); // note sure about this logic here but
    }
}