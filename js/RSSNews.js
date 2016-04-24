/** Jonathan Zaehringer
 * Object RSS New
 * Use for generate new from the RSS and interact with it for mark the new is readed or not.
 *
 * @param rssHash String; URL Hashed of the RSS
 * @param title String; New's title
 * @param description String; New's content
 * @param link String; New's link
 * @param date Date; New's date
 * @param $container Object; Div for contain the new
 *
 */
RSSNews = function(rssHash, title, description, link, date, $container) {
    this.App = window.App;

    this.rssHash = rssHash;

    this.id = link.crypt();

    this.title = title;

    this.description = description;

    this.link = link;

    this.init($container);
}

RSSNews.prototype = {
    init: function($container){
        var self = this;
        this.readed = this.check_readed();

        this.$article = $('<div/>',{
            class: 'article',
            id: this.id
        });

        $container.append(this.$article);

        this.display_init();
        if(this.readed){
            this.display_small();
        }else{
            this.display_all();
        }

        /* reading flag */
        this.$article.find('.readStatus').click(function(){
            if(self.readed){
                self.readed = false;
                self.App.localStorage.remove_value_in(self.rssHash, self.id);
                self.display_all();
            }
            else{
                self.readed = true;
                self.App.localStorage.add_value_in(self.rssHash, self.id);
                self.display_small();
            }
        });
    },

    check_readed: function(){
        console.info(this.App.localStorage.get_item(this.rssHash));

        return this.App.localStorage.value_is_present(this.rssHash, this.id);
    },

    /* Initial display */
    display_init: function(){
        this.$article.empty();

        this.$article.append(
            '<h1 class="title">'+this.title+'<p class="readStatus"></p></h1>'
        );

    },
    /* Readed News */
    display_small: function(){
        this.$article.addClass('readed');

        this.$article.find('.content').remove();
        this.$article.find('.link').remove();
        this.$article.find('.clear').remove();
    },

    /* Total news */
    display_all: function(){
        this.$article.removeClass('readed');

        this.$article.append($('<p/>', {
            class: 'content'
        }).html(this.description))
        this.$article.append($('<a/>', {
            class: 'link',
            href: this.link,
            target: "_blank"
        }).text('voir plus...').click(function(e){
            e.stopPropagation();
        }));
        this.$article.append($('<div/>', {
            class: 'clear'
        }));
    }
}

RSSNews.prototype.constructor = RSSNews;