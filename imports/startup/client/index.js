// client entry point
import { Meteor } from 'meteor/meteor';
import queryString from 'query-string';

import './deliveryRoutes';
import './adminRoutes';

// const { code } = queryString.parse(location.search);

// Meteor.call('User.wechat', { code }, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });

// subscribe user data for all page
Meteor.subscribe('user.data');
