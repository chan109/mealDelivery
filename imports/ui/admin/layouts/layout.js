import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './layout.html';

Template.adminLayout.onCreated(() => {
  $('head').append('<link rel="stylesheet" href="/css/material-dashboard.css">');
  $('body').append(
    '<script src="/js/core/jquery.min.js"></script>',
    '<script src="/js/core/popper.min.js"></script>',
    '<script src="/js/bootstrap-material-design.js"></script>',
    // '<script src="/js/plugins/moment.min.js"></script>',
    '<script src="/js/plugins/bootstrap-selectpicker.js"></script>',
    '<script src="/js/plugins/bootstrap-tagsinput.js"></script>',
    // '<script src="/js/plugins/jasny-bootstrap.min.js"></script>',
    // '<script src="/js/plugins/jquery.flexisel.js"></script>',
    // '<script src="/js/core/arrive.min.js" type="text/javascript"></script>',
    // '<script src="/js/core/jquery.validate.min.js"></script>',
    // '<script src="/js/core/chartist.min.js"></script>',
    // '<script src="/js/plugins/jquery.bootstrap-wizard.js"></script>',
    // '<script src="/js/plugins/bootstrap-notify.js"></script>',
    // '<script src="/js/plugins/jquery-jvectormap.js"></script>',
    // '<script src="/js/core/nouislider.min.js"></script>',
    // '<script src="/js/core/jquery.select-bootstrap.js"></script>',
    '<script src="/js/plugins/jquery.datatables.js"></script>',
    // '<script src="/js/plugins/sweetalert2.js"></script>',
    '<script src="/js/plugins/fullcalendar.min.js"></script>',
    '<script src="/js/plugins/bootstrap-datetimepicker.min.js"></script>',
    '<script src="/js/material-dashboard.js"></script>'
  );
});

