function loadButton($container){
    $container.empty();

    rssfeed = JSON.parse(localStorage.getItem('rssfeed'));

    console.log(rssfeed);
    $(rssfeed).each( function( i, item ) {
        var obj = new RSSManager(item[0], item[1], item[2], $container, $container, {});
        console.log(obj);
    });
}
$(document).ready(function(){
    loadButton($('#btnContainer'));
});