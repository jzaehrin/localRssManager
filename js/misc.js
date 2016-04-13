String.prototype.crypt = function(){
    return btoa(this.valueOf());
};