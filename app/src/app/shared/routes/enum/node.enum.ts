export enum AppNode {
  AUTHENTICATED = 'dashboard',
  PUBLIC = 'account',
  REDIRECT_TO_PUBLIC = AppNode.PUBLIC,
  REDIRECT_TO_AUTHENTICATED = AppNode.AUTHENTICATED,
  MEMBER = 'profile',
  DETAIL = 'dashboard/profile/detail',
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  UPDATE_PROFILE = 'dashboard/profile/update',
  FALL_BACK = '**',
}
