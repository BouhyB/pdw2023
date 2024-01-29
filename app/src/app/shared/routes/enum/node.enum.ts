export enum AppNode {
  AUTHENTICATED = 'dashboard',
  PUBLIC = 'account',
  REDIRECT_TO_PUBLIC = AppNode.PUBLIC,
  REDIRECT_TO_AUTHENTICATED = AppNode.AUTHENTICATED,
  MEMBER = 'profile',
  DETAIL = AppNode.AUTHENTICATED +'/'+ AppNode.MEMBER+'/detail/:id',
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  FALL_BACK = '**',
}
