# angular-spinkit-multispinner

Multispinner Directive for use with angular-spinkit

This package is an add-on for the [angular-spinkit](https://github.com/Urigo/angular-spinkit) package that
provides easy-to-use directives for adding [SpinKit](https://github.com/tobiasahlin/SpinKit) spinners to
your AngularJs site.

This package displays a random spinner while the route is changing by watching the `$routeChangeStart`,
`$routeChangeSuccess` and `$routeChangeError` events.

# Dependencies

1. AngularJS
  * `bower install --save angular`
2. angular-spinkit
  * `bower install --save angular-spinkit`

# Install

```sh
bower install --save angular-spinkit-multispinner
```

# Setup

Add the `angular-spinkit` CSS and JS to the HTML. Also add the `angular-spinkit-multispinner` JS.

```html
<link rel="stylesheet" href="bower_components/angular-spinkit/build/angular-spinkit.min.css">
<script src="bower_components/angular-spinkit/build/angular-spinkit.js"></script>

<script src="bower_components/angular-spinkit-multispinner/dist/angular-spinkit-multispinner.js">
```

