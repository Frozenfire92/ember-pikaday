require('build/temp/template');

Ember.emberPikaday = Ember.Namespace.create();
Ember.emberPikaday.VERSION = '0.1.0';

Ember.libraries.register('ember-pikaday', Ember.emberPikaday.VERSION);

require('lib/components/*');
