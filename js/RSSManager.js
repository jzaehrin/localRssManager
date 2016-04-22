var RSSManager = function(id, name, url, options) {

    this.id = id;

    this.name = name;

    this.url = url;

    this.App = window.App;

    var defaultOptions = {
        count: "5",
        limit: "200"
    };

    this.options = $.extend({},defaultOptions, options);

    this.init();
};

RSSManager.prototype = {
    init: function(){
        var self = this;

        this.$btn = $('<button/>',{
            class: 'btn btnRss',
            id: this.id
        }).text(this.name).append($('<p/>', {
            class: 'delete'
        }).click(function(){
            self.delete();
        }));

        this.$btn.click(function(){
            removeClicked();
            $(this).addClass('clicked');
            self.App.$container.rss.FeedEk({
                FeedUrl : self.url,
                MaxCount : self.options['count'],
                ShowDesc : true,
                ShowPubDate:true,
                DescCharacterLimit: self.options['limit'],
                TitleLinkTarget:'_blank',
                DateFormat:'DD/MM/YYYY',
                DateFormatLang:'en',
                rssHash: self.id
            });
        });

        this.App.$container.button.append(this.$btn);
    },
    delete: function(){
        var App = this.App;
        App.$container.rss.empty();
        this.$btn.remove();
        App.localStorage.remove_item(this.id);

        App.localStorage.remove_value_in(App.config.storage.feed, this.id);
    }
};

RSSManager.prototype.constructor = RSSManager;