function closeAddRssForm(obj){
    $(obj).removeClass('open');
    $('#addRssFormContainer').slideUp();
    $(obj).find('#add').attr('src', "img/signs.svg");
}
function openAddRssForm(obj){
    $(obj).addClass('open');
    $('#addRssFormContainer').slideDown();
    $(obj).find('#add').attr('src', "img/line.svg");
}
function closeSettingsForm(obj){
    $(obj).removeClass('open');
    $('#settingsFormContainer').slideUp();
}
function openSettingsForm(obj){
    $(obj).addClass('open');
    $('#settingsFormContainer').slideDown();
}
$(document).ready(function(){
    $('#addRssFormContainer').slideUp();
    $('#settingsFormContainer').slideUp();

    $('#addRssForm').submit(function (e){
        e.preventDefault();

        var name = this.elements['Name'].value;
        var url = this.elements['URL'].value;

        if(url == "" || name == ""){
            return false;
        }

        rssfeed = JSON.parse(localStorage.getItem('rssfeed'));

        if(rssfeed === null){
            rssfeed = [];
        }
        rssfeed.push([url.crypt(), name, url]);

        localStorage.setItem('rssfeed', JSON.stringify(rssfeed));

        console.log(rssfeed);

        loadButton($('#btnContainer'));
        this.reset();
        closeAddRssForm($('#showAddRssForm'));
    });
    $('#settingsForm').submit(function (e){
        e.preventDefault();

        var nbArticle = this.elements['nbArticle'].value;
        var descLength = this.elements['descLength'].value;

        if(descLength == "" || descLength == ""){
            return false;
        }

        var rssSettings = {'count' : nbArticle, 'limit' : descLength};

        localStorage.setItem('rssSettings', JSON.stringify(rssSettings));

        loadButton($('#btnContainer'));
        closeSettingsForm($('#showAddRssForm'));
    });
    $('#showAddRssForm').click(function(){
       if($(this).hasClass('open')){
           closeAddRssForm(this);
       }else{
           openAddRssForm(this);
           closeSettingsForm($('#showSettingsForm'));
       }
    });
    $('#showSettingsForm').click(function(){
       if($(this).hasClass('open')){
           closeSettingsForm(this);
       }
       else{
           openSettingsForm(this);
           closeAddRssForm($('#showAddRssForm'));
       }
    });
});
