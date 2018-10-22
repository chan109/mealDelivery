import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';

import { requireAdmin } from '../utils';
import config from '../../startup/server/config';
import Coupons from '../coupon/models/coupons';

const TICKETLIMIT = 4;

// export const signupWithInvitation = new ValidatedMethod({
//   name: 'User.invitation',
//   validate: new SimpleSchema({
//     invitationCode: String
//   }).validator(),
//   run({ invitationCode }) {
//     const isCodeValid = !!Meteor.users.findOne({ invitationCode });
//     if (isCodeValid) {
//       const invitationCoupon = Coupons.findOne({ slug: 'invitation' });
//       Meteor.users.update({
//         _id: this.userId
//       }, {
//         $push: {
//           coupons: {
//             isUsed: false,
//             couponId: invitationCoupon._id,
//             id: Random.id()
//           }
//         }
//       });
//     }
//   },
// });

export const signupWithInvitation = new ValidatedMethod({
  name: 'User.invitation',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ userId }) {
    let isCodeValid = Meteor.users.findOne({ _id: userId });
    if (_.isEmpty(isCodeValid)) {
      return null;
    }
    isCodeValid = isCodeValid.coupons == null || isCodeValid.coupons.filter(data => data.couponType === 'invitation').length <= TICKETLIMIT;

    if (isCodeValid) {
      const invitationCoupon = Coupons.findOne({ slug: 'invitation' });
      Meteor.users.update({
        _id: userId
      }, {
        $push: {
          coupons: {
            isUsed: false,
            couponId: invitationCoupon._id,
            couponType: 'invitation',
            id: Random.id()
          }
        }
      });
    }
  },
});

export const updateUserStats = new ValidatedMethod({
  name: 'User.statusUpdate',
  validate: new SimpleSchema({}).validator(),
  run() {
    Meteor.users.update({
      _id: this.userId
    }, {
      $set: {
        becomingRider: true
      }
    });
  },
});

export const updateUserStatsById = new ValidatedMethod({
  name: 'User.statusUpdateByID',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
    becomingRider: { type: Boolean }
  }).validator(),
  run({ userId, becomingRider }) {
    requireAdmin(this.userId);
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        becomingRider
      }
    });
  },
});

export const updateUserRole = new ValidatedMethod({
  name: 'User.userRoleUpdate',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
    newRole: { type: String }
  }).validator(),
  run({ newRole, userId }) {
    requireAdmin(this.userId);
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        role: newRole
      }
    });
  },
});

export const updateUserArea = new ValidatedMethod({
  name: 'User.areaUpdate',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
    city: { type: String }
  }).validator(),
  run({ userId, city }) {
    requireAdmin(this.userId);
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        city
      }
    });
  },
});

export const toggleBlockUser = new ValidatedMethod({
  name: 'User.toggleblock',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
    isBlocked: Boolean
  }).validator(),
  run({ userId, isBlocked }) {
    requireAdmin(this.userId);
    Meteor.users.update({ _id: userId }, { $set: { isBlocked: !isBlocked } });
  },
});

export const unblockUser = new ValidatedMethod({
  name: 'User.unblock',
  validate: new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ userId }) {
    requireAdmin(this.userId);
    Meteor.users.update({ _id: userId }, { $set: { isBlocked: false } });
  },
});

export const fetchUserWechat = new ValidatedMethod({
  name: 'User.wechat',
  validate: new SimpleSchema({
    code: String,
  }).validator(),
  run({ code }) {
    // get wechat access token
    const APPID = config.WECHAT_APPID;
    const SECRET = config.WECHAT_SECRET;
    const requestTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`;

    const result1 = HTTP.get(requestTokenUrl);

    console.log(result1.content);

    if (result1.statusCode === 200) {
      const { refresh_token, openid } = result1.content;
      const refreshTokenUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${APPID}&grant_type=refresh_token&refresh_token=${refresh_token}`;

      const result2 = HTTP.get(refreshTokenUrl);
      console.log(result2.content);
      if (result2.statusCode === 200) {
        const requestProfileUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${result2.access_token}&openid=${openid}&lang=zh_CN`;

        const { content } = HTTP.get(requestProfileUrl);
        console.log(content);
      }
    }
  },
});

export const updateUserAddress = new ValidatedMethod({
  name: 'User.addressUpdate',
  validate: new SimpleSchema({
    address: { type: Object },
    'address.name': { type: String },
    'address.postCode': { type: String },
    'address.city': { type: String },
    'address.unitNumber': { type: String, optional: true },
    'address.url': { type: String },
  }).validator(),
  run({ address }) {
    console.log(this.userId);
    console.log(Meteor.users.findOne({ _id: this.userId }));
    Meteor.users.update({
      _id: this.userId
    }, {
      $set: {
        address
      }
    });
  },
});