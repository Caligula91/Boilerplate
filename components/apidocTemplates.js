/**
 * @apiDefine NoAuthTokenError
 *
 * @apiError (400) NoAuthTokenError Error Code <code>1</code> No authorization token was found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Bad Request
 *     {
 *       "message": "No authorization token was found",
 *       "status": 401,
 *       "errorCode": 1,
 *     }
 */

/**
 * @apiDefine MissingParamsError
 *
 * @apiError (400) MissingParamsError Error Code <code>2</code> Missing parameters
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Missing parameters",
 *       "status": 400,
 *       "errorCode": 2,
 *     }
 */

/**
 * @apiDefine NotAcceptable
 *
 * @apiError (406) NotAcceptable Error Code <code>3</code> Not acceptable
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Not acceptable",
 *       "status": 406,
 *       "errorCode": 3,
 *     }
 */

/**
 * @apiDefine NotFound
 *
 * @apiError (404) NotFound Error Code <code>4</code> Not Found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Not Found",
 *       "status": 404,
 *       "errorCode": 4,
 *     }
 */

/**
 * @apiDefine Forbidden
 *
 * @apiError (403) Forbidden Error Code <code>5</code> Insufficient privileges
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Insufficient privileges",
 *       "status": 403,
 *       "errorCode": 5,
 *     }
 */

/**
 * @apiDefine InvalidValue
 *
 * @apiError (400) InvalidValue Error Code <code>6</code> Value is not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Value is not valid",
 *       "status": 400,
 *       "errorCode": 6,
 *     }
 */

/**
 * @apiDefine BadRequest
 *
 * @apiError (400) BadRequest Error Code <code>7</code> Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Bad Request",
 *       "status": 400,
 *       "errorCode": 7,
 *     }
 */

/**
 * @apiDefine CredentialsError
 *
 * @apiError (401) CredentialsError Error Code <code>8</code> Wrong credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Wrong credentials",
 *       "status": 401,
 *       "errorCode": 8,
 *     }
 */

/**
 * @apiDefine ValidEmailError
 *
 * @apiError (400) ValidEmailError Error Code <code>9</code> Please fill a valid email address
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please fill a valid email address",
 *       "status": 400,
 *       "errorCode": 9,
 *     }
 */

/**
 * @apiDefine DuplicateEmailError
 *
 * @apiError (406) DuplicateEmailError Error Code <code>10</code> This email address is already registered
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "This email address is already registered",
 *       "status": 406,
 *       "errorCode": 10,
 *     }
 */

/**
 * @apiDefine UnauthorizedError
 *
 * @apiError (401) UnauthorizedError Error Code <code>11</code> Invalid credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid credentials",
 *       "status": 401,
 *       "errorCode": 11,
 *     }
 */

/**
 * @apiDefine TokenExpired
 *
 * @apiError (401) TokenExpired Error Code <code>12</code> Token expired
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Token expired",
 *       "status": 401,
 *       "errorCode": 12,
 *     }
 */
