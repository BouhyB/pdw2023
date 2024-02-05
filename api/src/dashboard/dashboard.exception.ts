import {ApiCodeResponse, ApiException} from '@common/api';

export class PublicationCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_CREATE_ERROR, 600);
    }
}
export class PublicationDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_DELETE_ERROR, 600);
    }
}
export class PublicationNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_NOT_FOUND, 600);
    }
}
export class PublicationListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_LIST_ERROR, 600);
    }
}
export class PublicationUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_UPDATE_ERROR, 600);
    }
}
export class PublicationUserCountException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PUBLICATION_COUNT_ERROR, 600);
    }
}
export class LastPublicationException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LAST_PUBLICATION_ERROR, 600);
    }
}
export class ProfileCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PROFILE_CREATE_ERROR, 600);
    }
}
export class ProfileDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PROFILE_DELETE_ERROR, 600);
    }
}
export class ProfileNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PROFILE_NOT_FOUND, 600);
    }
}
export class ProfileListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PROFILE_LIST_ERROR, 600);
    }
}
export class ProfileUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.PROFILE_UPDATE_ERROR, 600);
    }
}
export class CommentCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENT_CREATE_ERROR, 600);
    }
}
export class CommentDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENT_DELETE_ERROR, 600);
    }
}
export class CommentNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENT_NOT_FOUND, 600);
    }
}
export class CommentListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENT_LIST_ERROR, 600);
    }
}
export class CommentUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENT_UPDATE_ERROR, 600);
    }
}
export class UserCommentsException extends ApiException {
    constructor() {
        super(ApiCodeResponse.COMMENTS_USER_ERROR, 600);
    }
}
export class LastCommentException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LAST_COMMENT_ERROR, 600);
    }
}
export class LikeCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LIKE_CREATE_ERROR, 600);
    }
}
export class LikeDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LIKE_DELETE_ERROR, 600);
    }
}
export class LikeNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LIKE_NOT_FOUND, 600);
    }
}
export class LikeListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LIKE_LIST_ERROR, 600);
    }
}
export class LastLikeException extends ApiException {
    constructor() {
        super(ApiCodeResponse.LAST_LIKE_ERROR, 600);
    }
}