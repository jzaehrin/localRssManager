RSSNew = function(rssHash, id, title, description, link, date, readed, $container) {

    this.rssHash = rssHash;

    this.id = id;

    this.title = title;

    this.description = description;

    this.link = link;

    this.readed = readed;

    //this.init($container);
}

RSSNew.prototype = {
    init: function($container){
        
    },
}

RSSNew.prototype.constructor = RSSNew;