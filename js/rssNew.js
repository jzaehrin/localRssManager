RSSNew = function(rssHash, id, title, description, link, date,$container) {

    this.rssHash = rssHash;

    this.id = id;

    this.title = title;

    this.description = description;

    this.link = link;

    this.init($container);
}

RSSNew.prototype = {
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

        this.$article.find('.readStatus').click(function(){
            console.log(this);
            var readed_list = JSON.parse(localStorage.getItem(self.rssHash));
            console.log(readed_list);

            if(self.readed){
                self.readed = false;
                readed_list.splice(self.index, 1);
                localStorage.setItem(self.rssHash, JSON.stringify(readed_list));
                self.display_all();
            }
            else{
                self.readed = true;
                self.index = readed_list.length;
                readed_list[self.index] = self.id;
                localStorage.setItem(self.rssHash, JSON.stringify(readed_list));
                self.display_small();
            }

        });
    },

    check_readed: function(){
        var readed_list = JSON.parse(localStorage.getItem(this.rssHash));
        console.log(this.rssHash);
        console.log(readed_list);

        if(readed_list == null){
            localStorage.setItem(this.rssHash, JSON.stringify([]));
            return false;
        }

        if((this.index = $.inArray(this.link.crypt(), readed_list)) >= 0){
            return true;
        }

        return false;

    },

    display_init: function(){
        this.$article.empty();

        this.$article.append(
            '<h1 class="title">'+this.title+'<p class="readStatus"></p></h1>'
        );

    },
    display_small: function(){
        this.$article.addClass('readed');

        this.$article.find('.content').remove();
        this.$article.find('.link').remove();
    },

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
    }
}

RSSNew.prototype.constructor = RSSNew;
