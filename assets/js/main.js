'use strict';
window.addEventListener('load', function() {
  var textElement = document.querySelector('#text');
  change_code(textElement);
  textElement.addEventListener('input', function(e) {
    change_code(e.target)
  });

  function change_code(element) {
    var text = element.value;
    if (isogram(text)) {
      // this is temperary and very ugly
      element.style.borderColor = 'black';
      var gacode = document.querySelector('#gacode');
      gacode.textContent = getGASnippet(text);
      Prism.highlightElement(gacode);
    } else {
      // this is temperary and very ugly
      element.style.borderColor = 'red';
    }
  }

  function isogram(text) {
    for (var i = 0; i < text.length; i++) {
      if ((text.match(new RegExp(text[i], 'g')) || []).length > 1) {
        return false;
      }
    }
    return true;
  }

  function getGASnippet(param_list) {
    // html template with placeholders
    var template = '<script>\n  (function(_params){_p0[\'GoogleAnalyticsObject\']=_p4;_p0[_p4]=_p0[_p4]||function(){\n  (_p0[_p4].q=_p0[_p4].q||[]).push(arguments)},_p0[_p4].l=1*new Date();_p5=_p1.createElement(_p2),\n  _p6=_p1.getElementsByTagName(_p2)[0];_p5.async=1;_p5.src=_p3;_p6.parentNode.insertBefore(_p5,_p6)\n  })(_args);\n\n  ga(\'create\', \'UA-XXXXXXXX-X\', \'auto\');\n  ga(\'send\', \'pageview\');\n\n</script>';
    var args = ['window', 'document', '\'script\'', '\'//www.google-analytics.com/analytics.js\'', '\'ga\'']

    // replace the placeholders with variable names or
    // if not enough params in param_list, just hardcode
    // the value
    if (param_list.length == 0) {
      template = template.replace(/_p0/g, args[0]);
    } else {
      template = template.replace(/_p0/g, param_list[0]);
    }
    if (param_list.length <= 1) {
      template = template.replace(/_p1/g, args[1]);
    } else {
      template = template.replace(/_p1/g, param_list[1]);
    }
    if (param_list.length <= 2) {
      template = template.replace(/_p2/g, args[2]);
    } else {
      template = template.replace(/_p2/g, param_list[2]);
    }
    if (param_list.length <= 3) {
      template = template.replace(/_p3/g, args[3]);
    } else {
      template = template.replace(/_p3/g, param_list[3]);
    }
    if (param_list.length <= 4) {
      template = template.replace(/_p4/g, args[4]);
    } else {
      template = template.replace(/_p4/g, param_list[4]);
    }
    if (param_list.length <= 5) {
      template = template.replace(/_p5/g, 'a');
    } else {
      template = template.replace(/_p5/g, param_list[5]);
    }
    if (param_list.length <= 6) {
      template = template.replace(/_p6/g, 'b');
    } else {
      template = template.replace(/_p6/g, param_list[6]);
    }

    // if param_list.length less that 5, remove
    // the extra args that will have hardcoded value
    if (param_list.length < 5) {
      args = args.slice(0, args.length - (5 - param_list.length))
    }
    template = template.replace(/_args/g, args.join(','));
    template = template.replace(/_params/g, param_list.split('').join(','));

    return template;
  }
});
