Ember.Pikaday.PikadayComponent = Ember.Component.extend({

    /**
    HTML tag of this component's element.
    */
    tagName: 'input',

    /**
    Two-way bindings to element's attributes.
    */
    attributeBindings: ['type', 'placeholder', 'date', 'value'],

    /**
    Input type
    */
    type: 'text',

    /**
    Placeholder
    */
    placeholder: null,

    /**
    Pickaday object
    */
    picker: null,

    /**
    Moment format for input field. String format of date.
    */
    format: 'L',

    /**
    The current date. Default is today's date.
    */
    date: new Date(),

    /**
    String form of the date.
    */
    value: '',

    /**
    Boolean used for setting utc mode
    */
    utc: false,

    /**
    Date variable used for minimum date
    */
    minDate: null,

    /**
    Date variable used for minimum date
    */
    maxDate: null,

    /**
    Options object for passing other configuration parameters
    */
    options: {},

    /**
    Date field is updated. Triggers sync with Pikaday picker.
    */
    dateDidChange: function() {
        var self = this;
        // Get date & format
        if (self.get('utc')) { // If UTC mode enabled use moment's parser
            date = moment.utc(self.get('date'));
        } else {
            date = moment(self.get('date'));
        }
        var format = self.get('format');
        // Validate date
        if (date.isValid()) {
            // Set string value form of date
            var newValue = date.format(format);
            // Check if value has changed
            if (!Ember.isEqual(newValue, self.get('value'))) {
                // Value is different
                // Save the new value
                self.set('value', newValue);
                // Set the new current date on the picker
                self.get('picker').setDate(date.format(format));
            }
        }
    }.observes('date'),

    /**
    The value of the textbox has changed. syncs with Pikaday
    */
    valueDidChange: function() {
        var date = moment(this.get('value'));
        if (date.isValid()) {
            this.set('date', date.toDate());
        } else if (this.get('value').trim() === '') {
            this.set('date', null);
        }
        // else: Value is invalid. Wait for it to validate.
    }.observes('value'),

    /**
    The value of the minimum date has changed. syncs with Pikaday
    */
    minDateDidChange: function() {
        var date = moment(this.get('minDate'));
        if(date.isValid()) {
            this.get('picker').setMinDate(date);

            if(this.get('date') < date) {
                this.set('date', date);
            }
        }
    }.observes('minDate'),

    /**
    The value of the minimum date has changed. syncs with Pikaday
    */
    maxDateDidChange: function() {
        var date = moment(this.get('maxDate'));
        if(date.isValid()) {
            this.get('picker').setMaxDate(date);

            if(this.get('date') > date) {
                this.set('date', date);
            }
        }
    }.observes('maxDate'),

    /**
    Inserts the input element into the DOM
    */
    didInsertElement: function() {
        var self = this;
        // Setup bindings to input field
        var $el = self.$();
        $el.keyup(function(event) {
            var val = $el.val();
            self.set('value', val);
        });
        var format = self.get('format');
        // Merge options
        var options = $.extend({}, this.get('options'), {
            field: $el[0],
            format: format,
            onSelect: function(date) {
                self.set('date', date);
            }
        });
        // Init Pikaday
        var picker = new Pikaday(options);
        // Remember the picker
        self.set('picker', picker);
        // Trigger update
        self.dateDidChange();
    },

    /**
    Removes the input element from the DOM
    */
    willDestroyElement: function() {
        var picker = this.get('picker');
        if (picker) {
            picker.destroy();
        }
        this.set('picker', null);
    }

});

Ember.Handlebars.helper('pik-a-day', Ember.Pikaday.PikadayComponent);
