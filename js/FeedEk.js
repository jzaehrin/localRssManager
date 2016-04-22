/*
* FeedEk jQuery RSS/ATOM Feed Plugin v3.0 with YQL API
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com   
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            DescCharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en",
            googleApi: false,
            rssHash: ""
        }, opt);

        var App = window.App;
        
        var id = $(this).attr("id"), i, s = "", dt;
        $("#" + id).empty();
        if (def.FeedUrl == undefined) return;
        $("#" + id).append('<img id="loader" src="img/loader.gif" />');

        var YQLstr = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url ="' + def.FeedUrl + '" LIMIT ' + def.MaxCount;

        var url = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(YQLstr) + "&format=json&diagnostics=false&callback=?";

        if(def.googleApi){
            url = "http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q="+def.FeedUrl+"&num="+def.MaxCount;
        }

        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                if (!(data.query.results.rss instanceof Array)) {
                    data.query.results.rss = [data.query.results.rss];
                }
                $.each(data.query.results.rss, function (e, itm) {
                    var title = itm.channel.item.title;
                    var description = itm.channel.item.description;
                    if (def.DescCharacterLimit > 0 && itm.channel.item.description.length > def.DescCharacterLimit) {
                        var description = itm.channel.item.description.substring(0, def.DescCharacterLimit) + '...';
                    }
                    var link = itm.channel.item.link;
                    var date = new Date(itm.channel.item.pubDate);
                    if ($.trim(def.DateFormat).length > 0) {
                        try {
                            moment.lang(def.DateFormatLang);
                            date = moment(date).format(def.DateFormat);
                        }
                        catch (e){date = date.toLocaleDateString();}
                    }
                    else {
                        date = date.toLocaleDateString();
                    }

                    console.info(new RSSNew(def.rssHash, link.crypt(), title, description, link, date, $("#" + id)));
                });
            }
        });
    };
})(jQuery);