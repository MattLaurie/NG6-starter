# Fork

The reason for this fork was to reorganise the project to be closer to Angular 2 and Angular CLI project layout.

This layout and changes are definitely not for everyone.  Treat it as a starting off point or even just a reference of one approach that works.

## Why not just use Angular 2?

Angular 2 would definitely be the right technical choice but it was a matter of whether we could find people to do the work.  Moving back to Angular 1 but setting out a clear upgrade path to Angular 2 was the best approach at the time.

One nice feature of staying in Angular 1 though is that Material 1 is much further ahead of Material 2.

## Changes

* Use Angular 1.5 components
* Use Amazon Cognito for managing users
* Use Angular Material
* Build-specific environment files via Webpack
* Use named ui-router views to allow components to determine the layout e.g. which toolbar to display
* Renamed `client` to `src`
* Got rid of `src/app/components` directory
* Removed top-level `app` component in favour of directly setting root layout in `index.html`

## Recommended reading

* [ECMAScript 6 ](https://github.com/lukehoban/es6features#readme)
* [Webpack](http://webpack.github.io)
* [Angular Material](https://material.angularjs.org)
* [Sass](http://sass-lang.com/)
* [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/amazon-cognito-identity-js)
    * [Announcing Your User Pools in Amazon Cognito](https://aws.amazon.com/blogs/mobile/announcing-your-user-pools-in-amazon-cognito/#)
    * [Integrating Amazon Cognito User Pools with API Gateway](https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/)
    * [Accessing Your User Pools using the Amazon Cognito Identity SDK for JavaScript](https://aws.amazon.com/blogs/mobile/accessing-your-user-pools-using-the-amazon-cognito-identity-sdk-for-javascript/)  

## Updated file structure

```
src/
..index.html * the top level page
..environments/
....environment.dist.js * the production environment settings
....environment.js * the development environment settings
⋅⋅app/
⋅⋅⋅⋅app.module.js * app entry
....app.theme.scss * app root theme 
....shared/ * any shared components and services
....layout/ * any layout specific components e.g. toolbar, sidenav
......simple-sidenav/ * a simple side navigation menu
......simple-toolbar/ * a simple top menu
....home/ * a default home "/" route
....example/ * a simple "/example" route
```

Note that the `home` and `example` routes should be discarded in favour of the real application.

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

## Named views with Angular Router

At the top-level `index.html` there are three named Angular Router views: 
* `toolbar` - the top menu
* `sidenav` - the side menu
* `content` - the content

Each defined route can specify what the contents of each of these named views should be.

e.g. a home route might display the `home` component in `content` with the `simpleToolbar` and `simpleSidenav` 
in `toolbar` and `sidenav` respectively:

```
.state('app.home', {
  url: '/',
  views: {
    'content@': {
      component: 'home'
    },
    'toolbar@': {
      component: 'simpleToolbar'
    },
    'sidenav@': {
      component: 'simpleSidenav'
    }
  }
})
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

## Configuring Amazon Cognito

See [cognito/README.md](docs/cognito/README.md) for more details on configuring Amazon Cognito.

Take the details from the User Pool and Federated Identity and place them into the `environments/environment.js` and
`environments/environment.dist.js` files (or create a different environment for production release):

```
export const environment = {
  production: false,
  aws: {
    region: 'us-east-1',
    userPoolId: 'us-east-X_XXXXXXXXX',
    clientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    identityPoolId: 'us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
  }
};
```

## Using Amazon Cognito

The bulk of the work of using Amazon Cognito is handled by the `amazon-cognito-identity-js` library.  The application
should access these library calls via `AuthService`.  This service wraps all of the library calls in Promises to 
make it easier to deal with.

Within `SharedModule` there are two Angular run blocks that handle the basics of getting Amazon Cognito started:

* `authInitialise` - will run to check if a user is authenticated (refreshing credentials if required)
* `authGuard` - will use a `data` property on the route to require users to be authenticated to access the route

Note that these run blocks have been temporarily disabled within `shared/shared.module.js` until the credentials have 
been entered into the environment.

To declare a route as requiring authentication add a `requiresAuth: true` to the `data` block. e.g.

```
.state('app.dashboard', {
  url: '/dashboard',
  views: {
    'content@': {
      component: 'dashboard'
    },
    'toolbar@': {
      component: 'appToolbar'
    },
    'sidenav@': {
      component: 'appSidenav'
    }
  },
  data: {
    requiresAuth: true
  }
});
```

Note if the user is not authenticated the user will be redirect to `app.signin` state (which doesn't exist)

## Accessing services via dependency injection

You want to access your services in your controllers via dependency injection.  The ng-annotate framework will take 
care of giving you the correct controller with one trick: you need to use a pseudo-annotation "ngInject" to indicate 
where you want the injection to occur.

As an example, take the `AuthService` that has been declared in `SharedModule` like a standard Angular `service`.

shared.module.js
```
import {AuthService} from "./auth.service";

export const SharedModule = angular.module('app.shared', [])
  .service('AuthService', AuthService);
```

To access this within the `HomeController` of `HomeComponent` you would do the following: 

home.component.js
```
class HomeController {
  constructor(AuthService) {  
    "ngInject";
    this.auth = AuthService;
  }
}
```

Note that:
* The service is injected by the declared Angular name `AuthService`
* The injection point is declared by the pseudo-annotation `"ngInject"`
* The service is put into the instance of the class as a variable `auth`

You can now use the `auth` variable to access the service 

e.g. a basic signin  

```
  signin(email, password) {
    this.auth.signin(email, password)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.log('error', error);
      });
  }
```

## TODO

### Unpin Angular version

Had to pin the version of Angular to `1.5.9` due to the Angular Material not supporting `1.6.0+` yet.

```
$ npm install angular@1.5.9 angular-animate@1.5.9 angular-aria@1.5.9 --save
```

Follow https://github.com/angular/material/issues/10111 for when it's safe to unpin the above.
