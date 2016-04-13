String.prototype.hash = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

$(document).ready(function(){
    $('#form').submit(function (e){
        e.preventDefault();

        name = this.elements['Name'].value;
        url = this.elements['URL'].value;

        rssfeed = JSON.parse(localStorage.getItem('rssfeed'));

        if(rssfeed === null){
            rssfeed = [];
        }
        rssfeed.push([url.crypt(), name, url]);

        localStorage.setItem('rssfeed', JSON.stringify(rssfeed));

        console.log(rssfeed);
    });
});

