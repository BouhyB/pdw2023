export enum ApiCodeResponse{
  TEST = 'api.result.test',
  NO_TOKEN_FOUNDED= 'api.security.error.no-token-found',
  USER_NOT_FOUND= 'api.security.error.user-not-found',
  TOKEN_EXPIRED= 'api.security.error.token-expired',
  SIGNUP_ERROR= 'api.security.error.signup',
  CREDENTIAL_DELETE_ERROR= 'api.security.error.credential-delete',
  USER_ALREADY_EXIST= 'api.security.error.user-exist',
  TOKEN_GEN_ERROR= 'api.security.error.token-generation ',
}
