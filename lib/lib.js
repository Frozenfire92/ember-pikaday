require('build/temp/template');

Ember.Pikaday = Ember.Namespace.create();
Ember.Pikaday.VERSION = '0.1.6';

Ember.libraries.register('Ember Pikaday', Ember.Pikaday.VERSION);

require('lib/components/*');
