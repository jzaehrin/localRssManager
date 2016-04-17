
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
           $('#addRssFormContainer').removeClass('openAddRssForm');
           $(this).text('+');
       }else{
           $(this).addClass('open');
           $('#addRssFormContainer').addClass('openAddRssForm');
           $(this).text('-');
       }
    });
    /*$('#showAddRssForm').click(function(){
      console.log($(this));

      if($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(this).parent().find("#addRssFormContainer").animate({'height': "auto"},200);
        $(this).text("+");
      } else {
        $(this).addClass("open");
        $(this).parent().find("#addRssFormContainer").animate({'height': "0"},200);
        $(this).text("-");
      }*/
      // if(!$(this).hasClass('open')){
          //  $(this).addClass('open');
          //  $('#addRssFormContainer').animate({'height': "auto", 'display': 'block'},200);
          //  $(this).text('-');
      //  }
});
