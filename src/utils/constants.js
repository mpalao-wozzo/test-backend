import { ValidationError } from 'apollo-server';

// Days
export const DAY_MONDAY = 'monday';
export const DAY_TUESDAY = 'tuesday';
export const DAY_WEDNESDAY = 'wednesday';
export const DAY_THURSDAY = 'thursday';
export const DAY_FRIDAY = 'friday';
export const DAY_SATURDAY = 'saturday';
export const DAY_SUNDAY = 'sunday';
export const DAYS_ARRAY = [ DAY_MONDAY, DAY_TUESDAY, DAY_WEDNESDAY, DAY_THURSDAY, DAY_FRIDAY, DAY_SATURDAY, DAY_SUNDAY ];

// Booking Player type
export const BOOKING_PLAYER_MEMBER = 'member';
export const BOOKING_PLAYER_EXTERNAL = 'external';
export const BOOKING_PLAYER_FREE = 'free';
export const BOOKING_PLAYERS = [ BOOKING_PLAYER_MEMBER, BOOKING_PLAYER_EXTERNAL, BOOKING_PLAYER_FREE ];

// Periodicity
export const PERIOD_SINGLE = 'single';
export const PERIOD_MONTHLY = 'monthly';
export const PERIODS_ARRAY = [ PERIOD_SINGLE, PERIOD_MONTHLY ];

// Genders
export const GENDER_MALE = 'M';
export const GENDER_FEMALE = 'F';
export const GENDER_MIXT = 'X';
export const GENDERS = [ GENDER_MALE, GENDER_FEMALE, GENDER_MIXT ];

// Roles
export const ROLE_ADMIN = 'admin';
export const ROLE_SUPERADMIN = 'superadmin';
export const ROLE_USER = 'user';
export const ROLES_ARRAY = [ ROLE_ADMIN, ROLE_SUPERADMIN, ROLE_USER ];

// Languages
export const EN = 'en';
export const ES = 'es';
export const LANGS_ARRAY = [ EN, ES ];

// Date formats
export const DATE_FORMAT = 'yyyy/MM/dd';
export const DATE_AND_HOUR_FORMAT = 'yyyy/MM/dd HH:mm';
export const HOUR_FORMAT = 'HH:mm';
export const YEAR_AND_MONTH_FORMAT = 'yyyy/MM';

// Internal constant type
export const CONSTANT_TYPE_STRING = 'string';
export const CONSTANT_TYPE_DATE = 'date';
export const CONSTANT_TYPE_OBJECT = 'object';
export const CONSTANT_TYPE_NUMBER = 'number';
export const CONSTANT_TYPE_BOOLEAN = 'boolean';
export const CONST_TYPES_ARRAY = [
  CONSTANT_TYPE_STRING,
  CONSTANT_TYPE_DATE,
  CONSTANT_TYPE_OBJECT,
  CONSTANT_TYPE_NUMBER,
  CONSTANT_TYPE_BOOLEAN,
];

export const LOCATION_POINT = 'Point';

// Errors
export const WRONG_PARAMS_METHOD = new Error('Wrong params sent to method');
export const WRONG_PARAMS = new ValidationError('Wrong params sent');

// Properties max length
export const MAX_LENGTH_NAME = 75;
export const MAX_LENGTH_DESCRIPTION = 1000;
