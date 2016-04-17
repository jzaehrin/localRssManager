
$(document).ready(function(){
    $('#addRssForm').submit(function (e){
        e.preventDefault();

        name = this.elements['Name'].value;
        url = this.elements['URL'].value;

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
    });
    $('#showAddRssForm').click(function(){
       if($(this).hasClass('open')){
           $(this).removeClass('open');
           $('#addRssFormContainer').css('display', 'none');
           $(this).text('+');
       }else{
           $(this).addClass('open');
           $('#addRssFormContainer').css('display', 'block');
           $(this).text('-');
       }
    });
});

