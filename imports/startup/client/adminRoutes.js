import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';
import { sessionManager } from '../../ui/delivery/utils';

// pages
import '../../ui/admin/layouts/layout';
import '../../ui/admin/layouts/loginLayout';
import '../../ui/admin/pages/login/login';
import '../../ui/admin/components/sidebar/sidebar';
import '../../ui/admin/components/navbar/navbar';
import '../../ui/admin/pages/dashboard/dashboard';
import '../../ui/admin/pages/menu/menu';
import '../../ui/admin/pages/user/user';
import '../../ui/admin/pages/coupon/coupon';
import '../../ui/admin/pages/order/order';
import '../../ui/admin/pages/order/orderList';

FlowRouter.route('/admin/login', {
  name: 'admin.login',
  action() {
    BlazeLayout.render('adminLoginLayout', { main: 'adminLogin' });
  }
});

const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin'
});

adminRoutes.route('/dashboard', {
  name: 'admin.dashboard',
  action() {
    Session.set('navbarTitle', '区域管理');
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminDashboard' });
  }
});

adminRoutes.route('/menu', {
  name: 'admin.menu',
  action() {
    Session.set('navbarTitle', '菜单管理');
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminMenu' });
  }
});

adminRoutes.route('/user', {
  name: 'admin.user',
  action() {
    Session.set('navbarTitle', '用户管理');
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminUserTable' });
  }
});

adminRoutes.route('/coupon', {
  name: 'admin.coupon',
  action() {
    Session.set('navbarTitle', '优惠券管理');
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminCoupon' });
  }
});

adminRoutes.route('/order', {
  name: 'admin.order',
  action() {
    Session.set('navbarTitle', '订单管理');
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminOrderList' });
  }
});

adminRoutes.route('/order/:city', {
  name: 'admin.order',
  action({ city }) {
    Session.set('navbarTitle', `${city}区域管理`);
    Session.set(sessionManager.SELECTCITY, city);
    BlazeLayout.render('adminLayout', { sidebar: 'adminSidebar', top: 'adminNavbar', main: 'adminOrder' });
  }
});