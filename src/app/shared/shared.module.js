import angular from 'angular';

import {PasswordPolicyDirective} from './password-policy.directive';
import {MatchDirective} from './match.directive';

export const SharedModule = angular.module('app.shared', [])
  .directive('passwordPolicy', () => PasswordPolicyDirective)
  .directive('match', () => MatchDirective)
  .name;
