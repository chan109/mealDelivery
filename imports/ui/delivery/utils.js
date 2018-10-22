import Framework7 from 'framework7';

function getSampleOrder() {
  return sampleOrder;
}

function getSampleDishes() {
  return sampleDishes;
}

function getSampleUser() {
  return sampleUser;
}

function getOrderDetailFinal() {
  return sampleOrderDetailFinal;
}

function roundUp(num, precision) {
  // precision = Math.pow(10, precision);
  // return Math.ceil(num * precision) / precision;
  return parseFloat(num).toFixed(precision);
}

function toDomainobject(obj) {
  return {
    address: {
      name: obj.formatted_address,
      postCode: obj.address_components[obj.address_components.length - 1].long_name,
      city: obj.vicinity.toLowerCase(),
      unitNumber: obj.unitNumber,
      url: obj.url
    }
  };
}

const f7Object = new Framework7({
  router: false, // prevent framework 7 to override flow router link
  touch: {
    materialRipple: false,
    tapHold: false,
    fastClicks: false,
  }
});

export const AREATABLE = {
  A: 'vancouver',
  B: 'richmond',
  C: 'burnaby'
};

export const myAppManager = f7Object;

export const mock = {
  mockSOrder: getSampleOrder,
  mockDishes: getSampleDishes,
  mockUser: getSampleUser,
  mockOrderDetailFinal: getOrderDetailFinal
};

export const utilHelpers = {
  roundUp,
  toDomainobject
};

export const sessionManager = {
  CLICKEDORDERSESSION: 'clickedOrderSession',
  HEADERTITLESESSION: 'headerTitle',
  TIMESESSION: 'timeSession',
  STARTINGTIME: 'startingTime',
  ENDTIME: 'endTime',
  RIDERALLORDER: 'riderAllorder',
  QUERY: 'query',
  RIDERALLFORONE: 'riderAllForOne',
  ORDERSCOUNT: 'ordersCount',
  LOCATIONSESSION: 'geoLocation',
  SELECTCITY: 'selectedCity',
  SELECTED_ORDER_STATUS: 'selectedOrderStatus',
  TOTALPRICE: 'totalPrice',
  ISFINISHED: 'isFinished',
  CURCITY: 'curCity',
  SELECTEDORDER: 'selectedOrder',
  DISCOUNT: 'discount',
  SHARESESSION: 'shareSession',
  INVITEHELPER: 'inviteHelper'
};

export const VALIDCITY = { vancouver: 1, richmond: 1, burnaby: 1 };

export const timeSlots = ['11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm'];

