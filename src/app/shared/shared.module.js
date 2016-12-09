import angular from 'angular';

export function authInitialise(AuthService) {
  "ngInject";
  AuthService.configure()
    .then(() => console.log('success'))
    .catch((error) => console.log('error', error));
}

export function authGuard($transitions, AuthService) {
  "ngInject";
  let requiresAuth = {
    to: (state) => state.data && state.data.requiresAuth
  };
  let redirectAuth = (transition) => {
    const url = transition.to().name;
    const params = transition.params();
    let $state = transition.router.stateService;
    return AuthService.isAuthenticated()
      .then(result => {
        if (!result) {
          AuthService.setRedirectState({
            url: url,
            params: params
          });
          return $state.target('app.signin', undefined, { location: true });
        }
      })
  };
  $transitions.onBefore(requiresAuth, redirectAuth, { priority: 10 });
}

export const SharedModule = angular.module('app.shared', [])
  .service('AuthService', AuthService)
//  .run(authGuard) // TODO reenable when Amazon Cognito details are created in each environment file
//  .run(authInitialise) // TODO reenable when Amazon Cognito details are created in each environment file
  .name;
