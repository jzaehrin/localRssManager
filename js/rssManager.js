RSSManager = function(id, name, url, $btnContainer, $rssContainer, options) {

    this.id = id;

    this.name = name;

    this.url = url;

    this.$rssContainer = $rssContainer;

    var defaultOptions = {
        count: "5",
        limit: "200"
    };

    this.options = $.extend({},defaultOptions, options);

    this.init($btnContainer);
};

RSSManager.prototype = {
    init: function($btnContainer){
        var self = this;

        var $btn = $('<button/>',{
            class: 'btn btnRss',
            id: this.id
        }).text(this.name);

        $btn.click(function(){
            self.$rssContainer.FeedEk({
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

        $btnContainer.append($btn);
    },
};

RSSManager.prototype.constructor = RSSManager;