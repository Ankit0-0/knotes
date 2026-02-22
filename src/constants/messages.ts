export const PASSWORD_ERROR_MESSAGES = {
  MIN_LENGTH_ERROR_MESSAGE : "Password must be at least 8 characters long",
  MAX_LENGTH_ERROR_MESSAGE : "Password must be at most 20 characters long",
  UPPER_CASE_ERROR_MESSAGE : 'Password must contain at least one uppercase letter',
  LOWERCASE_ERROR_MESSAGE : 'Password must contain at least one lowercase letter',
  NUMBER_ERROR_MESSAGE : 'Password must contain at least one number',
  SPECIAL_CHARACTER_ERROR_MESSAGE : 'Password must contain at least one special character (!@#$%^&*)',
  PASSWORD_MISMATCH_ERROR_MESSAGE : 'Passwords do not match',
};


export const SUCCESS = {
  USER_FOUND: 'User Found',
  REGISTRATION_SUCCESSFUL: 'Registration successful',
  LOGIN_SUCCESSFUL: 'Login successful',
};

export const ERROR = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_USER_DATA: 'Invalid user data',
  USER_NOT_FOUND: 'User not found',
  INVALID_EXPIRED_OTP: 'Invalid/Expired OTP',
  USER_EXISTS_WITH_EMAIL_MOBILE: 'User already exists with the provided Email and Mobile number',
  USER_EXISTS_WITH_EMAIL: 'User already exists with the provided Email',
  USER_EXISTS_WITH_MOBILE: 'User already exists with the provided Mobile number',
  USERID_CANNOT_BE_BLANK: 'userId cannot be blank',
  ENTER_VALID_NAME: 'Please provide a valid name',
  ENTER_VALID_EMAIL: 'Please provide a valid email address',
  ENTER_VALID_MOBILE: 'Please provide a valid 10-digit mobile number',
  BAD_REQUEST: 'Bad Request',
  ORIGIN_HEADER_IS_MISSING: 'Origin header is missing',
  ACCESS_FORBIDDEN: 'Access Forbidden',
  ROUTE_NOT_FOUND: 'Route not found or wrong API method',
};
