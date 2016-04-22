App = {
    init: function(JQuery) {
        if (!this.singleton) {
            this.$ = JQuery;
            this.initVars();

            this.initEvent();

            this.$form.addRss.container.slideUp();
            this.$form.settings.container.slideUp();

            this.loadButtons();

            this.singleton = true;
        }
    },
    $: null,
    singleton: false,
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
    $container: {
        button: null,
        rss: null,
    },
    config: {
        storage: {
            feed: 'rssFeed',
            settings: 'rssSettings',
            defaultSettings: {
                'count': 5,
                'limit': 200
            }

        }
    },
    initVars: function(){
        this.$form.addRss = this.$.extend({}, this.$form.addRss, { button: this.$('#addRssFormButton'), container: this.$('#addRssFormContainer')});

        this.$form.settings = this.$.extend({}, this.$form.settings, { button: this.$('#SettingsFormButton'), container: this.$('#SettingsFormContainer')});

        this.$container = this.$.extend({}, this.$container, { button: this.$('#btnContainer'), rss: this.$('#rssContainer')})
    },
    initEvent: function(){
        var self = this;

        //Initialisation
        this.$form.addRss.container.find('form').submit(function (e){
            var addRss = self.$form.addRss;
            e.preventDefault();

            var name = this.elements['Name'].value;
            var url = this.elements['URL'].value;

            if(url == "" || name == ""){
                return false;
            }

            self.localStorage.add_value_in(self.config.storage.feed, [url.crypt(), name, url]);

            self.loadButtons();
            this.reset();
            self.FormAction.closeForm(addRss.button, addRss.container, addRss.imgOff);
        });

        this.$form.settings.container.find('form').submit(function (e){
            var settings = self.$form.settings;
            e.preventDefault();

            var nbArticle = this.elements['nbArticle'].value;
            var descLength = this.elements['descLength'].value;

            if(descLength == "" || descLength == ""){
                return false;
            }

            this.localStorage.update_item(this.config.storage.setting, {'count' : nbArticle, 'limit' : descLength});

            loadButton(this.$container.button);
            this.FormAction.closeForm(settings.button, settings.container, settings.imgOff);
        });

        this.$form.addRss.button.click(function(){
            var App = window.App;
            if($(this).hasClass('open')){
                App.FormAction.closeForm(this, App.$form.addRss.container, App.$form.addRss.imgOff);
            }else{
                App.FormAction.closeAllForm(self.$form);
                App.FormAction.openForm(this, App.$form.addRss.container, App.$form.addRss.imgOn);
            }
        });

        this.$form.settings.button.click(function(){
            var App = window.App;
            if($(this).hasClass('open')){
                App.FormAction.closeForm(this, App.$form.settings.container, App.$form.settings.imgOff);
                App.FormAction.hideDeleteRssButton(App.$container.button.find('button'));
            }else{
                App.FormAction.closeAllForm(self.$form);
                App.FormAction.openForm(this, App.$form.settings.container, App.$form.settings.imgOn);
                App.FormAction.showDeleteRssButton(App.$container.button.find('button'));
            }
        });
    },
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
        }
    },
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
            var obj = new RSSManager(item[0], item[1], item[2], settings);
            console.info(obj);
        });
    }
}


