$(function () {
    $('.dropdown-toggle').dropdown();

    if ($('#sourcecode').length) {
        var value = $('#sourcecode').text();
        var mode = $('#sourcecode').attr('language');
        var pre = $('#sourcecode').get(0);
        var viewer = CodeMirror(function(elt) {
            pre.parentNode.replaceChild(elt, pre);
        }, {
            value: value,
            lineNumbers: true,
            matchBrackets: true,
            lineWrapping: true,
            readOnly: true,
            autofocus: true,
            mode: mode
        });

        if (window.location.hash.startsWith('#L')) {
            var linenumber = parseInt(window.location.hash.substring(2));
            viewer.scrollIntoView(linenumber);
            viewer.markText({line: linenumber-1, ch:0}, {line:linenumber-1}, {css: 'color:red'});
        }

        viewer.on("gutterClick", function(cm, n) {
          var info = cm.lineInfo(n);
          window.location.hash = "L" + (n+1);
        });
    }

    if ($('#md-content').length) {
        var converter = new Showdown.converter({extensions: ['table']});
        $('#md-content').html(converter.makeHtml($('#md-content').text()));
    }

    function paginate() {
        var $pager = $('.pager');

        $pager.find('.next a').one('click', function (e) {
            e.preventDefault();
            $.get(this.href, function (html) {
                $pager.after(html);
                $pager.remove();
                paginate();
            });
        });

        $pager.find('.previous').remove();
    }
    paginate();
});

if ($('#repositories').length) {
    var listOptions = {
        valueNames: ['name']
    };
    var repoList = new List('repositories', listOptions);
}

if ($('#branchList').length) {
    var listBranchOptions = {
        valueNames: ['item']
    };
    var repoList = new List('branchList', listBranchOptions);
}

$('.search').click(function (e) {
    e.stopPropagation();
});