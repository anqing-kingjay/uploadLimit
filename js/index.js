// uploadUrl  上传后台服务地址

//图片上传及验证
$("input[type='file']").change(function(){
    var id = $(this).attr("id")
    var filesInfo = this.files[0]
    console.log(filesInfo)
    var urls = getObjectURL(filesInfo)
    var img = new Image();
    img.src = urls;
    $("body").append('<img class="new_img"  src='+ urls + ' />')
    console.log($("body").find(".new_img").width())
    var timer = setInterval(function () {
        var width = $(".new_img").width()
        if(width>0){
            clearInterval(timer)

            //图片限制格式
            if(filesInfo.name.indexOf("jpg")>-1 || filesInfo.name.indexOf("png")>-1){

                //限制宽高和大小
                /*if(id == "add-file" && width==750 &&  filesInfo.size<1024*1000){
                    uploadXlsx(id)
                }else if(id == "add-file2" && width==160 ){
                    uploadXlsx(id)
                }else{
                    $("#"+id).siblings(".filename").html("上传图片格式不正确").css("color","red");
                }*/

                uploadXlsx(id,uploadUrl)
            }else{
                $("#"+id).siblings(".filename").html("上传图片格式不正确").css("color","red");
            }
        }
    },100)
    setTimeout(function () {
        clearInterval(timer)
    },2000)

})
function uploadXlsx(id,uploadUrl){
    $.ajaxFileUpload({
        url:uploadUrl,
        secureuri:false,
        fileElementId:id,
        dataType:"text",
        success:function(data,status){
            data = $.parseJSON(data.replace(/<.*?>/ig,""));
            if(data){
                // data.image_url 图片上传后的地址
              $("#"+id).siblings(".filename").html(data.image_url).css("color","#666666");
            }
        },
        error:function(data,status,e){
            alert(status+"," +e);
        }
    });
}
//图片上传创造路径
function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if(window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if(window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}