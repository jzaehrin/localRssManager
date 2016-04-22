$(document).ready(function(){
    App.init($);

    settings = App.localStorage.get_item(App.config.storage.settings);

    if(settings == false) {
        settings = App.config.storage.defaultSettings;
    }
    App.$form.settings.container.find('#nbArticle').attr('value', settings['count']);
    App.$form.settings.container.find('#descLength').attr('value', settings['limit']);
});
