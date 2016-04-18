function loadButton($container){
    $container.empty();

    var rssfeed = JSON.parse(localStorage.getItem('rssfeed'));
    var rssSettings = JSON.parse(localStorage.getItem('rssSettings'));

    if(rssSettings == null){
        rssSettings = {};
    }
    console.log(rssfeed);
    $(rssfeed).each( function( i, item ) {
        var obj = new RSSManager(item[0], item[1], item[2], $container, $("#rssContainer"), rssSettings);
        console.log(obj);
    });
}
$(document).ready(function(){
    loadButton($('#btnContainer'));

    settings = JSON.parse(localStorage.getItem('rssSettings'));

    if(settings == null) {
        settings = {
            'count': 5,
            'limit': 200,
        }
    }
    $('#nbArticle').attr('value',
        settings['count']);
    $('#descLength').attr('value',settings['limit']);
});
