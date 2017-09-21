$(document).ready(function() {
    CreateAnonymFile();
    UploadFile();
    localStorage.setItem("login", "false");
});

function CreateAnonymFile() {
    $(".select[data-type='create']").click(function() {
        Edit();
        $('.file-text').val("");
        $("input[name='filename']").val("");
    });
}

function UploadFile() {
    $('.open-label').click(function(e) {
        let file = new FormData(document.forms[0]);
        //alert(file);
        $.ajax({
            url: '/upload',
            data: file,
            cashe: false,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data) {
                Edit();
                $("input[name='filename']").val(data.filename);
                $(".file-text").val(data.data);
                //alert(data);
            }
        });
    });
}

/*(function() {
    $("input[type='button']:first-child").click(function() {
        let value = $('.file-text').val();
        let name = $("input[name='filename']").val();
        $.ajax({
            type: 'POST',
            url: '/create',
            data: {
                text: value,
                name: name
            },
            success: function(res) {
                $("input[name='download']").attr('class', '');
                $("input[name='download']").removeAttr('disabled');
                $("input[name='download']").val('Download ' + res[1] + ' ');
                $("input[name='download']").click(function() {
                    Download(res[0], res[1]);
                });
            },
            error: function(err) {
                alert(err.message);
            }
        });
    });
})();*/