# Fork

The reason for this fork was to reorganise the project to be closer to Angular 2 and Angular CLI project layout.

## Changes

* Renamed `client` to `src`
* Use Angular 1.5 components
* Use Angular Material
* Build-specific environment files via Webpack
* Use named ui-router views to allow components to determine the layout e.g. which toolbar to display
* Got rid of `src/app/components` directory
* Removed top-level `app` component in favour of directly setting root layout in `index.html`

## Updated file structure

```
src
..index.html
..environments/
....environment.dist.js * the production environment settings
....environment.js * the development environment settings
⋅⋅app/
⋅⋅⋅⋅app.module.js * app entry file
....app.theme.scss * app root theme 
....shared/ * all shared components and services
....layout/ * all layout specific components e.g. toolbar, sidenav
....home/ * a default home route
....example/ * a simple `/example` route
```

The `generator` Gulp task has also been updated to match the new layout style:

```
generator/
..component/
....temp.component.html * the component HTML
....temp.component.js * the component itself
....temp.component.scss * the component styles
....temp.module.js * the module of the component
....temp.spec.js * the component tests
```

The `generator` is invoked via:

```
$ npm run component -- --name example
```

## Configuring the environment

The static environment configuration data is stored within `src/environments` as:

* `environment.dist.js` - production environment
* `environment.js` - development environment

Webpack has been configured to include the correct file based on the environment being built.  Note that this is effectively configured outside of Angular.

To include the current environment file use the following import:

```
import {environment} from 'environment'
```

As an example consider a simple environment where we just want to know if we are in production or not.

`src/environments/environment.js`
```
{
  production: false
}
```

`src/environments/environment.dist.js`
```
{
  production: true
}
```

`src/app/test-controller.js`
```
import {environment} from 'environment'

export class TestController {
  constructor() {
    this.message = 'Is production? ' + environment.production;
  }
}
```

## TODO: Unpin Angular version

Had to pin the version of Angular to `1.5.9` due to the Angular Material not supporting `1.6.0+` yet.

```
$ npm install angular@1.5.9 angular-animate@1.5.9 angular-aria@1.5.9 --save
```

Follow https://github.com/angular/material/issues/10111 for when it's safe to unpin the above.
