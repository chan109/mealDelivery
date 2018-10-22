import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { mock, sessionManager} from '../../../utils';
import './orderDetailFinal.html';

const ORDERCHECKOUT = 'orderCheckout';

Template.orderDetailFinal.helpers({
  orderDetailFinalMock() {
    return mock.mockOrderDetailFinal();
  },
  orderDetailFinal() {
    const order = Session.get(ORDERCHECKOUT);
    if (order == null) return null;
    order.discount = ~(Session.get(sessionManager.DISCOUNT) == null ? 0 : Session.get(sessionManager.DISCOUNT)) + 1;

    // Hardcode delivery fee and discount
    order.deliveryFee = 0;
    return order;
  }
});

