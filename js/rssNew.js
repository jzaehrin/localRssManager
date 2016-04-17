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
        this.readed = this.check_readed();

        this.$article = $('<div/>',{
            class: 'article',
            id: this.id
        });

        $container.append(this.$article);

        if(this.readed){
            this.display_small();
        }else{
            this.display_all();
        }

        this.$article.click(function(){
            var readed_list = JSON.parse(localStorage.getItem(this.rssHash));
            console.log(readed_list);

            if(this.readed){
                this.readed = false;
                localStorage.setItem(this.rssHash, JSON.stringify(readed_list.splice(this.index, 1)));
                this.display_all();
            }
            else{
                this.readed = true;
                this.index = readed_list.length;
                localStorage.setItem(this.rssHash, JSON.stringify(readed_list[this.index] = this.link.crypt()));
                this.display_small();
            }

        });
    },

    check_readed: function(){
        var readed_list = JSON.parse(localStorage.getItem(this.rssHash));
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

    display_small: function(){
        this.$article.empty();

        this.$article.append($('<h1/>', {
            class: 'title'
        }).text(this.title));
    },

    display_all: function(){
        this.$article.empty();

        this.$article.append($('<h1/>',{
            class: 'title'
        })
        .text(this.title))
        .append($('<p/>', {
            class: 'content'
        }).text(this.description))
        .append($('<a/>', {
            class: 'link',
            href: this.link
        }).text('voir plus...'));
    }
}

RSSNew.prototype.constructor = RSSNew;