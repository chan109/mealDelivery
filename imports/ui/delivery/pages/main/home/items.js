import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { myAppManager, sessionManager, AREATABLE } from '../../../utils';


import Menus from '../../../../../api/menu/models/menus';
import Dishes from '../../../../../api/menu/models/dishes';
import './items.html';

const SELECTEDORDER = 'selectedOrder';

Template.items.onCreated(() => {
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('menus.list');
});

Template.items.helpers({
  foods() {
    // wait util the current location session is set
    if (Session.get(sessionManager.LOCATIONSESSION) == null) return null;
    let currentCity = Session.get(sessionManager.LOCATIONSESSION).vicinity.toLowerCase();
    currentCity = (_.invert(AREATABLE))[currentCity];
    let temp3 = Session.get('ff-item');
    if (temp3 == null) {
      temp3 = moment().format();
      Session.set('ff-item', temp3);
    }

    let dishesIdToReturn = '';
    if (moment(temp3).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      dishesIdToReturn = Menus.find({
        $and: [
          {
            serveFrom: {
              $lt: moment().toDate(),
            },
          },
          {
            serveTo: {
              $gte: moment().toDate(),
            }
          },
          {
            stock: { $gt: 0 }
          },
          {
            area: currentCity
          }
        ]
      });
    } else {
      dishesIdToReturn = Menus.find({
        $and: [
          {
            serveFrom: {
              $gte: moment(moment(temp3).format('YYYY-MM-DD')).startOf('days').toDate(),
            },
          },
          {
            serveTo: {
              $lte: moment(moment(temp3).format('YYYY-MM-DD')).endOf('days').toDate(),
            }
          },
          {
            stock: { $gt: 0 }
          },
          {
            area: currentCity
          }
        ]
      });
    }
    return dishesIdToReturn;
  },
  dishData() {
    return Dishes.findOne(this.dishId);
  },
  isItemSelected() {
    const that = this;
    const temp = Session.get(SELECTEDORDER);
    if (temp == null) return null;
    return Session.get(SELECTEDORDER) != null && Session.get(SELECTEDORDER).filter(data => data.order._id === that._id).length !== 0;
  },
  orderedItems() {
    const that = this;
    let temp = Session.get(SELECTEDORDER);
    if (temp == null) return null;
    temp = Session.get(SELECTEDORDER).filter(function(data) { return data.order._id === that._id; });
    if (temp.length !== 0) {
      return temp[0].quantity;
    }
    return null;
  }
});

Template.items.events({
  'click .home-food-add-one'() {
    if (!Meteor.user().isBlocked) {
      const currentSelectedOrders = Session.get(SELECTEDORDER);
      const that = this;
      if (currentSelectedOrders == null) {
        Meteor.call('Menus.checkStock', { stock: 1, menuId: that._id }, function(err, res) {
          if (err != null) {
            myAppManager.dialog.alert('库存不够', '提示');
            return null;
          }
          Session.set(SELECTEDORDER, [{ order: that, quantity: 1 }]);
        });
      } else if (currentSelectedOrders.filter(data => that._id === data.order._id).length === 0) {
        Meteor.call('Menus.checkStock', { stock: 1, menuId: that._id }, function(err, res) {
          if (err != null) {
            myAppManager.dialog.alert('库存不够', '提示');
            return null;
          }
          currentSelectedOrders.push({ order: that, quantity: 1 });
          Session.set(SELECTEDORDER, currentSelectedOrders);
        });
      } else {
        const temp = currentSelectedOrders.map(function(data) {
          const dataToReturn = data;
          if (dataToReturn.order._id === that._id) {
            if (dataToReturn.quantity === that.stock) {
              myAppManager.dialog.alert('库存不够', '提示');
              return dataToReturn;
            }
            dataToReturn.quantity += 1;
            return dataToReturn;
          }
          return data;
        });
        Session.set(SELECTEDORDER, temp);
      }
    } else {
      alert('账户出错无法下单, 如有疑问请联系客服');
    }
  },
  'click .home-food-remove-one'() {
    const that = this;
    const currentSelectedOrders = Session.get(SELECTEDORDER);
    if (currentSelectedOrders == null) return null;
    const targetOrder = currentSelectedOrders.filter(data => that._id === data.order._id);
    if (targetOrder.length === 0) {
      return null;
    }
    let temp = currentSelectedOrders.map((data) => {
      const dataToReturn = data;
      if (dataToReturn.order._id === that._id) {
        if (targetOrder[0].quantity > 0) {
          dataToReturn.quantity -= 1;
        } else {
          dataToReturn.quantity = 0;
        }
        return dataToReturn;
      }
      return data;
    });

    temp = temp.filter(data => data.quantity !== 0);
    Session.set(SELECTEDORDER, temp);
    return null;
  }
});
