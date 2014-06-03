[ember-pikaday](https://github.com/Frozenfire92/ember-pikaday)
=============

[Pikaday](https://github.com/dbushell/Pikaday) support in [Ember.js](http://emberjs.com/) via components. Uses [Moment.js](http://momentjs.com/) for beautification.

#### Authors:
- [Joel Kuntz](https://github.com/Frozenfire92)
- [Glavin Wiechert](https://github.com/Glavin001)


## Usage

1) Install via Bower

```bash
bower install --save ember-pikaday
```

2) Add library references to your index.html

```html
<link rel="stylesheet" href="bower_components/pikaday/css/pikaday.css">

<script src="bower_components/pikaday/pikaday.js"></script>
<script src="bower_components/ember-pikaday/build/lib.js"></script>
```

3) Use in your project

This will bind `your(Date/String)Property` to the date picker

```handlebars
{{pik-a-day date=yourDateProperty}}
or
{{pik-a-day value=yourStringProperty}}
```


## Developing

After cloning repository, install library dependencies.

```bash
npm install
bower install
```

Then build with `grunt`.

```bash
grunt serve
```
