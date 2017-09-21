let panel = {
    triggered: false,
    editor: false
};

function Warning() {
    $('#download').attr('class', 'download');
}

function HideWarning() {
    $('#download').attr('class', 'hidden-download');
}

function PanelDownload(path, name) {
    $('#download').attr('class', 'download');
    $('.filename').text(name);
    $('.download-link').attr('href', path);
}

function DisableDownload() {
    $("input[name='download']").attr('class', 'disabled');
    $("input[name='download']").attr('disabled', '');
    $("input[name='download']").val('Download');
}

function Edit() {
    $('#welcome').attr('class', 'hidden-welcome');
    $('#create').attr('class', 'visible-create');
    $('footer').attr('class', '');
}

function SignIn() {
    $('#signIn').attr('class', 'signIn');
}

function SignUp() {
    $('#signUp').attr('class', 'signUp');
}

function Enter() {
    // request to server
    let email = $("#in_email").val();
    //alert(email);
    let pass = $("#in_pass").val();
    //alert(pass);
    $.ajax({
        type: "POST",
        url: "/signIn",
        data: {
            email: email,
            pass: pass
        },
        success: function(res) {
            alert(res);
        },
        error: function(res) {
            alert(res.message);
        }
    });
}

function UpAndEnter() {
    // request to server and redirecting
    let name = $('#name').val();
    let surname = $('#surname').val();
    let email = $('#up_email').val();
    let pass = $('#up_pass').val();
    let repeat_pass = $('#repeat_pass').val();
    let word = $('#secret_word').val();
    if (name == "" || surname == "" || email == "" || repeat_pass == "" || pass == "" || word == "") {
        alert('All fields are required');
        return;
    }
    if (pass != repeat_pass) {
        alert('Passwords not match');
        return;
    }
    let data = {
        name: name,
        surname: surname,
        email: email,
        pass: pass,
        word: word
    };
    $.ajax({
        type: "POST",
        url: "/signUp",
        data: data,
        success: (res) => {
            console.log(JSON.stringify(res));
        },
        error: (res) => {
            alert(res.message);
        }
    });
}

function GetFile(filename, folder) {
    let info = {
        filename: filename,
        folder: folder
    };
    $.ajax({
        type: "GET",
        url: "/getUserFile",
        data: info,
        success: (res) => {
            if (res === "") {
                let message = filename + " : file is empty";
                ShowNotification(message)
            } else {
                $('#field-text').text(res);
            }
        },
        error: (res) => {
            console.log(JSON.stringify(res));
        }
    });
}

function ShowNotification(message) {
    $('p.message').text(message);
    ShowHideNotification();
}

function DirectLink(path) {
    if (!panel.triggered) {
        //$("input[name='download']").unbind("click");
        $("input[name='download']").click(function() {
            window.location.href = path;
            //setTimeout(OpenFile, 0);
        });
        panel.triggered = true;
    } else {
        $("input[name='download']").unbind("click");
        $("input[name='download']").click(function() {
            window.location.href = path;
            //setTimeout(OpenFile, 0);
        });
    }
    /*console.log($("input[name='download']").data('events'));
    $("input[name='download']").click(function() {
        window.location.href = path;
        //setTimeout(OpenFile, 0);
    });*/
}

function HideNameField() {
    $("input[name='filename']").addClass("panel-edit-name");
}

function getList(listener) {
    $.ajax({
        type: "GET",
        url: "/getList",
        data: {
            folder: $('p.folder').text()
        },
        success: function(res) {
            //console.log(res);
            BuildList(res[0], listener);
            panel.path = res[1];
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function BuildList(data, listener) {
    let list = $("ul.list");
    let ctrls = $("ul.list-ctrl");
    ctrls.empty();
    list.empty();
    //CrearList(parent);
    //let ul = document.createElement("ul");
    for (let i = 0; i < data.length; i++) {
        let name = $(document.createElement("li"));
        name.text(data[i]);
        name.addClass("file");
        list.append(name);
        let ctrl = $(document.createElement("li"));
        ctrl.attr("data-file", data[i]);
        let edit = $(document.createElement("img"));
        edit.attr({
            "src": "/images/edit.png",
            "alt": "edit file",
            "class": "edit"
        });
        let remove = $(document.createElement("img"));
        remove.attr({
            "src": "/images/remove.png",
            "alt": "remove file",
            "class": "remove"
        });
        //let ctrl_li = $(document.createElement("li"));
        ctrl.append(edit, remove);
        ctrls.append(ctrl);
    }
    if (listener == undefined) return;
    else listener();
    //parent.appendChild(ul);
    //CtrlListeners();
    //OpenFile();
}

/*function CrearList(parent) {
    for (let i = 0; i < parent.children.length; i++) {
        parent.removeChild(parent.children.item(i));
    }
}*/

function ShowDownloadBtn() {
    $("input[name='download']").attr('class', '');
    $("input[name='download']").removeAttr('disabled');
}

function TextareaListener() {
    $("textarea#field-text").on("change keyup parse", function() {
        $("input[name='create-save']").addClass("save-change");
    });
}

function ChangeSaveClass(elem) {
    //$("input[name='create-save']").click(() => {
    $(elem).removeClass("save-change");
    //});
}

function BindOpenFile() {
    if (!panel.editor) {
        OpenFile();
        panel.editor = true;
    } else {
        $(".file").unbind("click");
        OpenFile();
    }
}

function OpenFile() {
    $('.file').click(function() {
        $("input[name='download']").removeAttr("disabled");
        if ($(".file").hasClass("active")) {
            $(".file").removeClass("active");
            $(this).addClass("active");
            ShowEditor($(this).text());
            $("input[name='download']").attr("value", "Download " + $("li.active").text());
            let path = panel.path + "/" + $("li.active").text();
            DirectLink(path);
        } else {
            $(this).addClass("active");
            ShowEditor($(this).text());
            $("input[name='download']").attr("value", "Download " + $("li.active").text());
            let path = panel.path + "/" + $("li.active").text();
            DirectLink(path);
        }
    });
}

function ShowEditor(filename) {
    $('textarea#field-text').text("");
    $('#editFile').addClass('sandbox');
    $('#editFile').removeClass('hidden-sandbox');
    $('#create').addClass("visible-create");
    $('#create').removeClass("hidden-create");
    $("input[name='filename']").val(filename);
    $('footer').addClass('relative-footer');
    $('footer').removeClass('fixed');
    let folder = $('p.folder').text();
    GetFile(filename, folder);
}

function OpenCreateMenu() {
    $("span.new-file").click(function() {
        $("input[name='new-file-name']").val("");
        ShowHideCreateMenu();
    });
}

function CloseCreateMenu() {
    $("p.close-create > span").click(function() {
        ShowHideCreateMenu();
    });
}

function CreateNewFile() {
    $("input[name='create-new-user-file']").click(function() {
        let filename = $("input[name='new-file-name']").val();
        //let pattern = new RegExp('^[a-zA-Z0-9]*\.{1}[a-z]*');
        //alert(!!filename.match(pattern));
        if (filename === "") {
            alert("enter file name")
            return;
        } else {
            $.ajax({
                method: "POST",
                url: "/createUserFile",
                data: {
                    filename: filename,
                    folder: $("p.folder").text()
                },
                success: function(res) {
                    console.log(res);
                    ShowHideCreateMenu();
                    ShowNotification(res.msg);
                    getList(CtrlListeners);
                },
                error: function(err) {
                    console.error(err);
                }
            });
        }
    });
}

function OpenEditMenu() {
    $("img.edit").click(function() {
        ShowHideEditMenu();
        let old_name = $(this).parent().attr("data-file");
        $("input[name='new-name']").val("");
        $("span.old-name").text(old_name);
        //EditName();
    });
}

function EditName() {
    $("input[name='rename-btn']").click(function() {
        if ($("input[name='new-name']").val() === "") return;
        ShowHideEditMenu();
        $.ajax({
            method: "POST",
            url: "/rename-file",
            data: {
                old: $("span.old-name").text(),
                new: $("input[name='new-name']").val(),
                folder: $("p.folder").text()
            },
            success: function(res) {
                ShowNotification(res);
                getList(CtrlListeners);
                //setTimeout(Listeners, 0);
                //alert(res);
            },
            error: function(err) {
                alert(err);
            }
        });
    });
}

function CloseEditMenu() {
    $("p.close-edit > span").click(function() {
        ShowHideEditMenu();
    });
}

function OpenRemoveMenu() {
    $("img.remove").click(function() {
        ShowHideRemoveMenu();
        let old_name = $(this).parent().attr("data-file");
        $("span.remove-name").text(old_name);

    });
}

function RemoveFile() {
    $("input[name='remove-btn']").click(function() {
        ShowHideRemoveMenu();
        $.ajax({
            method: "DELETE",
            url: "/remove-file",
            data: {
                name: $("span.remove-name").text(),
                folder: $("p.folder").text()
            },
            success: function(res) {
                ShowNotification(res);
                getList(CtrlListeners);
                //setTimeout(Listeners, 0);
                //alert(res);
            },
            error: function(err) {
                alert(err);
            }
        });
    });
}

function CloseRemoveMenu() {
    $("p.close-remove > span").click(function() {
        ShowHideRemoveMenu();
    });
}

function ShowHideCreateMenu() {
    $("div.create-user-form").toggleClass("hidden-create-user-form");
}

function ShowHideEditMenu() {
    $("div.edit-name").toggleClass("hidden-edit-name");
}

function ShowHideRemoveMenu() {
    $("div.remove-file").toggleClass("hidden-remove-file");
}

function ShowHideNotification() {
    $('div#notification').toggleClass('hidden-notification');
}

function HideNotification() {
    $('p.close-notification').click((e) => {
        ShowHideNotification();
    });
}

function CtrlListeners() {
    BindOpenFile();
    OpenEditMenu();
    OpenRemoveMenu();
}

function Listeners() {
    BindOpenFile();
    TextareaListener();
    ChangeSaveClass();
    OpenCreateMenu();
    CloseCreateMenu();
    CreateNewFile();
    CloseEditMenu();
    EditName();
    CloseRemoveMenu();
    RemoveFile();
    HideNotification();
}