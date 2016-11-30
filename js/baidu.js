/**
 * Created by Administrator on 2016/11/29.
 */
$(function(){
    /*拖拽轮播*/
    var ch=$(window).height();
    var num=0;
    var flag=true;
    touch.on("body","swipeup","#fullpage",up)
    touch.on("body","swipedown","#fullpage",down)

    function up(){
        if(!flag){
            return;
        }
        num++;
        if(num==$("section").length){

            num=$("section").length-1;

        }
        if(num==$("section").length-1){

            $(".btn").hide();
        }else{
            $(".btn").show();
        }

        flag=false;
        $("#fullpage").css("marginTop",-num*ch);
        $(".lunbo li").css("background","none").eq(num).css("background","#333");
    }
    function down(){
        if(!flag){
            return;
        }
        num--;
        if(num==-1){
            num=0;
        }
        if(num==$("section").length-1){

            $(".btn").hide();
        }else{
            $(".btn").show();
        }
        flag=false;
        $("#fullpage").css("marginTop",-num*ch);
        $(".lunbo li").css("background","none").eq(num).css("background","#333");
    }

    $("#fullpage")[0].addEventListener("webkitTransitionEnd",function(){
        flag=true;
    })
    $("#fullpage")[0].addEventListener("mozTransitionEnd",function(){
        flag=true;
    })
    /*滚轮轮播*/
    mouseWheel($("#fullpage")[0],up,down);
    $(".lunbo li").click(function(){
        var index=$(this).index();
        $("#fullpage").css("marginTop",-index*ch);
        $(".lunbo li").css("background","none").eq(index).css("background","#333");

    })
    $(".btn").click(up);

})
