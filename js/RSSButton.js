/** Jonathan Zaehringer
 * Object RSS Manager
 * Use for generate button form localStorage and interaction with it
 *
 * @param name String; Name gived for the RSS
 * @param url String; URL of the RSS
 * @param settings Object; loading settings
 *
 */
var RSSButton = function(name, url, settings) {

    this.id = url.crypt();

    this.name = name;

    this.url = url;

    this.App = window.App;

    var defaultSettings = {
        count: "5",
        limit: "200",
        container: false
    };

    this.settings = $.extend({},defaultSettings, settings);

    this.init();
};

RSSButton.prototype = {
    init: function(){
        var self = this;

        this.$btn = $('<button/>',{
            class: 'ui-btn btnRss',
            id: this.id,
            'data-rel':"close"
        }).text(this.name).append($('<p/>', {
            class: 'delete'
        }).click(function(){
            self.delete();
        }));

        this.$btn.click(function(){
            self.App.removeClickedStatus();
            $(this).addClass('clicked');
            self.App.$container.rss.FeedEk({
                FeedUrl : self.url,
                MaxCount : self.settings['count'],
                ShowDesc : true,
                ShowPubDate:true,
                DescCharacterLimit: self.settings['limit'],
                TitleLinkTarget:'_blank',
                DateFormat:'DD/MM/YYYY',
                DateFormatLang:'en',
                rssHash: self.id
            });
        });

        if(this.settings.container == false) {
            this.App.$container.button.append(this.$btn);
        }
        else{
            this.settings.container.append(this.$btn);
        }
    },
    delete: function(){
        var App = this.App;
        App.$container.rss.empty();
        this.$btn.remove();

        App.localStorage.remove_item(this.id);
        if(this.settings.category == false) {
            App.localStorage.remove_value_in(App.config.storage.feed, this.id);
        }
        else{
            App.localStorage.remove_value_in(this.settings.category, this.id);
        }
    }
};

RSSButton.prototype.constructor = RSSButton;