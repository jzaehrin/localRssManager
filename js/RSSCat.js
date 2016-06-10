/** Jonathan Zaehringer
 * Object RSS Manager
 * Use for generate button form localStorage and interaction with it
 *
 * @param name String; Name gived for the RSS
 * @param url String; URL of the RSS
 * @param settings Object; loading settings
 *
 */
var RSSCat = function(name, items, settings) {

    this.name = name;

    this.items = items;

    this.App = window.App;

    var defaultSettings = {
        count: "5",
        limit: "200",
        category: false
    };

    this.settings = $.extend({},defaultSettings, settings);
    this.settings.category = name;

    this.init();
};

RSSCat.prototype = {
    init: function(){
        var self = this;

        this.$btn = $('<button/>',{
            class: 'btn btnRss cat'
        }).text(this.name).append($('<p/>', {
            class: 'delete'
        }).click(function(){
            self.delete();
        }));

        this.$cat = $('<div>', {
            class: 'catBtnContainer',
            id: this.id
        })
        this.$div = $('<div>', {
            class: 'categoryContainer',
            id: this.id
        }).append(this.$btn).append(this.$cat);

        this.$btn.click(function(){
            if($(this).hasClass('open')){
                self.App.category.closeCategory(this, self.$cat);
            }
            else {
                self.App.category.openCategory(this, self.$cat);
            }
        });



        this.App.$container.button.append(this.$div);

        $.extend(this.settings, {'container': this.$cat});

        $(this.items).each(function(i, item){
            new RSSButton(item[0], item[1], self.settings);
        });
        self.App.category.closeCategory(this.$btn, this.$cat);
    },
    delete: function(){
        var App = this.App;

        $.each(App.localStorage.get_item(this.name),function(){
            App.localStorage.remove_item(this);
        });

        App.localStorage.remove_item(this.name);

        App.localStorage.remove_value_in(App.config.storage.feed, this.name);

        App.$container.rss.empty();
        this.$btn.remove();
        App.loadButtons();
    }
};

RSSCat.prototype.constructor = RSSCat;