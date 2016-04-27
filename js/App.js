/** Jonathan Zaehringer
 * Singleton of the localRssManager. Contain the initialisation of the App. Get all necessary DOM Object for all Object.
 * Contain default configuration and usefull function
 *
 * Don't forgot the initalisation after the loading of the DOM.
 */
App = {
    init: function(JQuery) {
        if (!this.singleton) {
            this.$ = JQuery;
            this.initVars();

            this.initEvent();

            // Initialisation of from at close
            this.$form.addRss.container.slideUp();
            this.$form.settings.container.slideUp();

            this.loadButtons();

            this.singleton = true;
        }
    },
    $: null,
    singleton: false,
    /* Form for settings and Adding rss */
    $form: {
        addRss:{
            button: null,
            container: null,
            imgOff: "img/signs.svg",
            imgOn: "img/line.svg"
        },
        settings:{
            button: null,
            container: null,
            imgOff: false,
            imgOn: false
        }

    },
    /* container for the application */
    $container: {
        button: null,
        rss: null,
    },
    config: {
        /* configuration for storage and default value for FeedEK */
        storage: {
            feed: 'rssFeed',
            settings: 'rssSettings',
            defaultSettings: {
                'count': 5,
                'limit': 200
            }

        }
    },
    /* Initialisation of vars */
    initVars: function(){
        this.$form.addRss = this.$.extend({}, this.$form.addRss, { button: this.$('#addRssFormButton'), container: this.$('#addRssFormContainer')});

        this.$form.settings = this.$.extend({}, this.$form.settings, { button: this.$('#SettingsFormButton'), container: this.$('#SettingsFormContainer')});

        this.$container = this.$.extend({}, this.$container, { button: this.$('#btnContainer'), rss: this.$('#rssContainer')})
    },
    /* Initialisation of event for form of settings and adding rss */
    initEvent: function(){
        var self = this;

        /* Adding RSS form */
        this.$form.addRss.container.find('form').submit(function (e){
            var addRss = self.$form.addRss;
            e.preventDefault();

            var name = this.elements['Name'].value;
            var url = this.elements['URL'].value;

            if(url == "" || name == ""){
                return false;
            }

            self.localStorage.add_value_in(self.config.storage.feed, [name, url]);

            self.loadButtons();
            this.reset();
            self.FormAction.closeForm(addRss.button, addRss.container, addRss.imgOff);
        });

        this.$form.addRss.button.click(function(){
            var App = window.App;
            if($(this).hasClass('open')){
                App.FormAction.closeForm(this, App.$form.addRss.container, App.$form.addRss.imgOff);
            }else{
                App.FormAction.closeAllForm(self.$form);
                App.FormAction.hideDeleteRssButton(App.$container.button.find('button'));
                App.FormAction.openForm(this, App.$form.addRss.container, App.$form.addRss.imgOn);
            }
        });

        /* settings form */
        this.$form.settings.container.find('form').submit(function (e){
            var settings = self.$form.settings;
            e.preventDefault();

            var nbArticle = this.elements['nbArticle'].value;
            var descLength = this.elements['descLength'].value;

            if(descLength == "" || descLength == ""){
                return false;
            }

            self.localStorage.update_item(self.config.storage.settings, {'count' : nbArticle, 'limit' : descLength});

            self.loadButtons();
            self.FormAction.closeForm(settings.button, settings.container, settings.imgOff);
        });

        this.$form.settings.button.click(function(){
            if($(this).hasClass('open')){
                self.FormAction.closeForm(this, self.$form.settings.container, self.$form.settings.imgOff);
                self.FormAction.hideDeleteRssButton(self.$container.button.find('button'));
            }else{
                self.FormAction.closeAllForm(self.$form);
                self.FormAction.openForm(this, self.$form.settings.container, self.$form.settings.imgOn);
                self.FormAction.showDeleteRssButton(self.$container.button.find('button'));
            }
        });
    },
    /* custom localStorage function */
    localStorage: {
        get_item: function(index){
            if(!localStorage.isPresent(index)){
                return false;
            }

            return JSON.parse(localStorage.getItem(index));
        },
        remove_item: function(index){
            if(!localStorage.isPresent(index)){
                return false;
            }

            localStorage.removeItem(index);
            return true;
        },
        add_item: function(index, value){
            if(localStorage.isPresent(index)){
                return false;
            }

            localStorage.setItem(index, JSON.stringify(value));
            return true;
        },
        update_item: function(index, value){
            localStorage.setItem(index, JSON.stringify(value));
            return true;
        },
        add_value_in: function(index, value){
            if(!localStorage.isPresent(index)){
                this.add_item(index, [value]);
                return true;
            }

            var table = this.get_item(index);

            table.push(value);

            this.update_item(index, table);

            return true;
        },
        remove_value_in: function(index, value){
            if(!localStorage.isPresent(index)){
                return false;
            }

            var table = this.get_item(index);

            table.splice(table.indexOf(value), 1);

            this.update_item(index, table);

            return true;
        },
        value_is_present: function(index, value){
            if(!localStorage.isPresent(index)){
                return false;
            }

            if(($.inArray(value, this.get_item(index))) < 0){
                return false;
            }

            return true;
        }
    },
    /* form action function */
    FormAction: {
        closeForm: function(obj, form, img){
            $(obj).removeClass('open');

            if (img != false) {
                $(obj).find('.image').first().attr('src', img);
            }

            $(form).slideUp();
        },
        openForm: function(obj, form, img) {
            $(obj).addClass('open');

            if (img != false){
                $(obj).find('.image').first().attr('src', img);
            }

            $(form).slideDown();
        },
        closeAllForm: function(table){
            for (var key in table){
                form = table[key];
                this.closeForm(form.button, form.container, form.imgOff);
            }
        },
        showDeleteRssButton: function(list){
            list.each(function(){
                $(this).find('.delete').addClass('showDelete');
            })
        },
        hideDeleteRssButton: function(list){
            list.each(function(){
                $(this).find('.delete').removeClass('showDelete');
            });
        }
    },
    /* loading/reloading of rss buttons */
    loadButtons: function(){
        console.log(this);
        this.$container.button.empty();

        var feeds = this.localStorage.get_item(this.config.storage.feed);
        var settings = this.localStorage.get_item(this.config.storage.settings);

        if(settings == false){
            settings = {};
        }

        if(feeds == false){
            this.$form.addRss.button.trigger('click');
            feeds = [];
        }

        console.info(feeds);
        this.$(feeds).each( function( i, item ) {
            var obj = new RSSManager(item[0], item[1], settings);
            console.info(obj);
        });
    },
    removeClickedStatus: function() {
        var $buttons = this.$container.button.find('button');
        console.info($buttons);

        $buttons.each(function () {
            $(this).removeClass('clicked');
        });
    }
}



