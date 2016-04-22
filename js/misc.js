String.prototype.crypt = function(){
    return btoa(this.valueOf());
};
Object.getPrototypeOf(localStorage).isPresent = function(index){
    if((this.getItem(index)) == null){
        return false;
    }
    return true;
};

function removeClicked(){
    var $buttons = $('#btnContainer').find('button');
    console.log($buttons);

    $.each($buttons, function(key, obj){
        $(obj).removeClass('clicked');
    });
}