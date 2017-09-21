$(document).ready(() => {
    (function() {
        $("input[name='create-save']").click(function() {
            ChangeSaveClass($(this));
            let value = $('.file-text').val();
            BindOpenFile();
            let name;
            let folder;
            if (localStorage.getItem("login") === "true") {
                name = $("li.active").text();
                folder = $("p.folder").text();
                $(this).removeClass("save-change");
                Modify(value, name, folder);
            } else {
                alert(2);
                name = $("input[name='filename']").val();
                folder = "temp";
                Create(value, name, folder);
            }
        });
    })();
});

function Create(value, name, folder) {
    alert(value, name, folder);
    $.ajax({
        type: 'POST',
        url: '/create',
        data: {
            text: value,
            name: name,
            folder: folder
        },
        success: function(res) {
            $("input[name='download']").attr('class', '');
            $("input[name='download']").removeAttr('disabled');
            $("input[name='download']").val('Download ' + res.msg + ' ');
            $("input[name='download']").click(function() {
                Warning();
                setTimeout(() => {
                    HideWarning();
                    window.location.href = res.path;
                    DisableDownload();
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }, 5000);
            });
        },
        error: function(err) {
            console.error(err.message);
        }
    });
}

function Modify(value, name, folder) {
    $.ajax({
        type: 'POST',
        url: '/modify',
        data: {
            text: value,
            name: name,
            folder: folder
        },
        success: function(res) {
            console.log(res);
            //setTimeout(OpenFile, 0);
        },
        error: function(err) {
            console.error(err.message);
        }
    });
}