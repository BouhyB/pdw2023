import {ApiCodeResponse, ApiException} from '@common/api';

export class UserNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.USER_NOT_FOUND, 200);
    }
}