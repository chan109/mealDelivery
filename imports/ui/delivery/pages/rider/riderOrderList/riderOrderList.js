import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import Orders from '../../../../../api/orders/models/orders';
import { sessionManager } from '../../../utils';

import './riderOrderList.html';
// import './riderOrderListHeader';
import './riderOrder';

Template.riderOrderList.onCreated(() => {
  Meteor.subscribe('orders.riderList', Meteor.userId());
  // Meteor.subscribe('orders.list');
});

Template.riderOrderList.helpers({
  orders() {
    // store the whole order list into the session
    // may need to findByRiderID
    const orders = Orders.find({ rider: Meteor.userId() }).fetch();
    const ordersCount = {
      paid: 0,
      hurry: 0,
      delivered: 0
    };

    orders.forEach((o) => {
      if (o.status === '已派送') {
        ordersCount.delivered += 1;
        return;
      }
      if (o.status === '派送中') ordersCount.paid += 1;
      if (o.isHurry) ordersCount.hurry += 1;
    });
    Session.set(sessionManager.OREDERSCOUNT, ordersCount);
    const query = Session.get(sessionManager.QUERY);
    return Orders.find(query == null ? {} : query, { sort: { orderedAt: -1 } }).fetch();
  }
});
