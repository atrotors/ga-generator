'use strict';
window.addEventListener('load', function() {
  var gacode = document.querySelector('#gacode');
  gacode.textContent = getGASnippet('thisisi');
  Prism.highlightElement(gacode);

  function getGASnippet(param_list) {
    // ignore param_list for now
    var template = '<script>\n  (function(_params){_p0[\'GoogleAnalyticsObject\']=_p4;_p0[_p4]=_p0[_p4]||function(){\n  (_p0[_p4].q=_p0[_p4].q||[]).push(arguments)},_p0[_p4].l=1*new Date();_p5=_p1.createElement(_p2),\n  _p6=_p1.getElementsByTagName(_p2)[0];_p5.async=1;_p5.src=_p3;_p6.parentNode.insertBefore(_p5,_p6)\n  })(_args);\n\n  ga(\'create\', \'UA-XXXXXXXX-X\', \'auto\');\n  ga(\'send\', \'pageview\');\n\n</script>';
    template = template.replace(/_p0/g, 'e');
    template = template.replace(/_p1/g, 'm');
    template = template.replace(/_p2/g, 'p');
    template = template.replace(/_p3/g, 't');
    template = template.replace(/_p4/g, 'y');
    template = template.replace(/_p5/g, 'p');
    template = template.replace(/_p6/g, 'g');
    template = template.replace(/_params/g, 'e,m,p,t,y,p,g');
    template = template.replace(/_args/g, 'window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\'');
    return template;
  }
});
