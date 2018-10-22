import { Accounts } from 'meteor/accounts-base';
import { SMS } from 'meteor/mys:accounts-phone';
import { Random } from 'meteor/random';

SMS.twilio = {
  FROM: '+16046707368',
  ACCOUNT_SID: 'ACcbf23e3060e965c7225cef11f5d6d9ab',
  AUTH_TOKEN: 'af6782c5e5eef98a9611f01db243dde3'
};

SMS.phoneTemplates = {
  text(user, code) {
    return `您的验证码: ${code}`;
  }
};

Accounts.onCreateUser((options, user) => ({
  ...user,
  role: 'customer',
  becomingRider: false,
  city: 'unknown',
  invitationCode: Random.id(6)
}));
