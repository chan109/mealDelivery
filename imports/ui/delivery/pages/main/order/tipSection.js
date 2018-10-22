import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import { check } from 'meteor/check';
import './tipSection.html';
import { utilHelpers, sessionManager } from './../../../utils';

const SELECTEDORDER = 'selectedOrder';
const ORDERCHECKOUT = 'orderCheckout';
const TIPSPERCENTAGE = 'tipsPercentage';
const TAXRATE = 0.05;

function getTotalExceptTax() {
  const temp = Session.get(SELECTEDORDER);
  if (temp == null) return 0;
  let totalPrice = temp.map(data => data.order.price * data.quantity);
  totalPrice = totalPrice.reduce((accumulator, value) => accumulator + value);
  return totalPrice;
}

Template.tipSection.helpers({
  tipsAmountAndFinalTotalPrice() {
    const totalExceptTax = Number(Session.get(sessionManager.TOTALPRICE));
    const orderTotal = {};
    let tipsPercentage = 10;
    if (Session.get(TIPSPERCENTAGE) == null) {
      Session.set(TIPSPERCENTAGE, 10);
    } else {
      tipsPercentage = Session.get(TIPSPERCENTAGE);
      check(tipsPercentage, Number);
    }

    const discountAmount = Session.get(sessionManager.DISCOUNT) == null ? 0 : Session.get(sessionManager.DISCOUNT);
    if (Session.get('tips-helper-flag') === true) {
      orderTotal.tipsAmount = Number(utilHelpers.roundUp(tipsPercentage * 0.01 * totalExceptTax, 2));
      Session.set('tips-helper-flag', false);
    } else {
      orderTotal.tipsAmount = Number(utilHelpers.roundUp(tipsPercentage * 0.01 * (totalExceptTax - discountAmount), 2));
    }

    orderTotal.tipsAmount = Number(utilHelpers.roundUp(tipsPercentage * 0.01 * (totalExceptTax - discountAmount), 2));
    orderTotal.finalPriceExceptTips = Number(utilHelpers.roundUp(totalExceptTax * 1.05, 2));
    orderTotal.finalTotalPrice = Number(utilHelpers.roundUp((orderTotal.tipsAmount + (totalExceptTax - discountAmount) + ((totalExceptTax - discountAmount) * TAXRATE)), 2));
    orderTotal.tax = Number(utilHelpers.roundUp((totalExceptTax - discountAmount) * 0.05, 2));

    Session.set(ORDERCHECKOUT, { tipsAmount: orderTotal.tipsAmount, finalTotalPrice: orderTotal.finalTotalPrice, priceBeforeTax: totalExceptTax, priceAfterTax: orderTotal.finalPriceExceptTips, tax: orderTotal.tax });
    return { tipsAmount: orderTotal.tipsAmount, finalTotalPrice: orderTotal.finalTotalPrice };
  },
});

Template.tipSection.events({
  'click .tipsSubSection'(e) {
    const tipAmount = Number(e.target.getAttribute('value'));
    $('.tipsSubSection').removeClass('selectedTipsSection');
    $(e.currentTarget).addClass('selectedTipsSection');

    Session.set(TIPSPERCENTAGE, tipAmount);
  },
  'focusout .tipsSubSectionTotal'(e) {
    const discountAmount = Session.get(sessionManager.DISCOUNT) == null ? 0 : Session.get(sessionManager.DISCOUNT);

    Session.set('tips-helper-flag', true);

    const tipsAmount = e.target.value;
    const matchNumberRegex = /^\d+$/;
    const isPriceBeforeTax = Session.get(ORDERCHECKOUT);
    if (isPriceBeforeTax == null) return null;
    const priceBeforeTax = isPriceBeforeTax.priceBeforeTax;

    if ((tipsAmount.split('$').length !== 1 && tipsAmount[1].match(matchNumberRegex) == null) || (tipsAmount.split('$').length === 1 && tipsAmount[0].match(matchNumberRegex) == null)) {
      alert('Only number is accepted in the tipsSection field. By default, tip is set back to 10%.');
      $('.tipsSubSection').removeClass('selectedTipsSection');
      $('.default').addClass('selectedTipsSection');
      Session.set(TIPSPERCENTAGE, 10);
      return null;
    }
    $('.tipsSubSection').removeClass('selectedTipsSection');
    if (tipsAmount.split('$').length !== 1) {
      Session.set(TIPSPERCENTAGE, (Number(tipsAmount.split('$')[1]) / Number(priceBeforeTax - discountAmount)) * 100);
      return null;
    }

    Session.set(TIPSPERCENTAGE, (Number(tipsAmount.split('$')[0]) / Number(priceBeforeTax - discountAmount)) * 100);
    return null;
  }
});
