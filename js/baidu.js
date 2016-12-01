/**
 * Created by Administrator on 2016/11/29.
 */
$(function(){
    /*拖拽轮播*/
    var ch=$(window).height();
    var num=0;
    var flag=true;


    $("#fullpage").mousedown(function(e){
        e.preventDefault()
    })
    $("#fullpage").mousemove(function(e){
        e.preventDefault()
    })

    touch.on("body","swipeup","#fullpage",up)
    touch.on("body","swipedown","#fullpage",down)

    function up(){

        if(!flag){
            return;
        }
        num++;
        // console.log(num)
        if(num==$("section").length){

            num=$("section").length-1;
            // console.log(num)
        }
        number(num);
        flag=false;
        $("#fullpage").css("marginTop",-num*ch);
        $(".lunbo li").css("background","none").eq(num).css("background","#333");
    }
    function down(){

        if(!flag){
            // console.log("no")
            return;

        }
        // console.log("up")
        num--;
        if(num==-1){
            num=0;
        }
        number(num);
        flag=false;
        $("#fullpage").css("marginTop",-num*ch);
        $(".lunbo li").css("background","none").eq(num).css("background","#333");
    }

    function number(num){
        if(num==$("section").length-1){
            $(".btn").hide();
        }else{
            // for(var i=0;i<$(".l").length-1;i++){
            //     var ll=$(".l")[i].left;
            //     $(".l")[i].left=ll+"20px";
            // }
            $(".btn").show();
        }
        // console.log(num)
    }
    $(".boat").css({
        transform:"marginLeft:0",
        opacity:1
    })
    $("#fullpage")[0].addEventListener("webkitTransitionEnd",move)
    $("#fullpage")[0].addEventListener("mozTransitionEnd",move)
    function move(){
        flag=true;
        // alert(1)
        $("section").each(function(index,obj){
            // if(index==0){
            //     return
            // }
            // console.log(num,index)
            if(index==num){
                $(obj).find(".l").css({
                    marginLeft:0,
                    opacity:1
                })
                $(obj).find(".r").css({
                    marginRight:0,
                    opacity:1
                })
            }else{
                $(obj).find(".l").css({
                    marginLeft:-30,
                    opacity:0
                })
                $(obj).find(".r").css({
                    marginRight:-30,
                    opacity:0
                })
            }
        })
        // }
    }

    /*滚轮轮播*/
    mouseWheel($("#fullpage")[0],up,down);
    $(".lunbo li").click(function(){
        var index=$(this).index();
        // for(var i=0;i<$("section").length-1;i++){
        //     if(index>i){
        //         num=index-1;
        //         up();
        //         console.log(num)
        //         /*为什么这个地方会输出2个num呢？*/
        //     }else if(index<i){
        //         num=index-1;
        //         down();
        //         console.log(num)
        //     }else{
        //         return
        //     }
        // }

        number(index)
        num=index;

        $("#fullpage").css("marginTop",-num*ch);
        $(".lunbo li").css("background","none").eq(index).css("background","#333");

    })
    $(".btn").click(up);

    /*菜单操作*/
    var flag2=true;
    $(".menuOption").click(function(){
        if(flag2){
            /*按钮*/
            $(".menu").css("display","block");
            $(this).find(".menuTl").css({
                transform:"translate(0,5px) rotateZ(45deg)"
            })
            $(this).find(".menuBl").css({
                transform:"translate(0,-5px) rotateZ(-45deg)"
        })

            /*菜单*/
            $(".menu a").each(function(index,obj){
                // console.log(index,obj)
                $(obj).css({
                    opacity:0,
                    transform:"rotateX(90deg)",
                    animation:"menu1 .3s linear "+0.2*index+"s  forwards"
                })
            })
            flag2=false;
        }else{
            /*按钮*/

            $(this).find(".menuTl").css({
                transform:"translate(0,0) rotateZ(0deg)"
            })
            $(this).find(".menuBl").css({
                transform:"translate(0,0) rotateZ(0deg)"
            })
            /*菜单*/
            $(".menu a").each(function(index,obj){
                // console.log(index,obj)
                $(obj).css({
                    opacity:1,
                    transform:"rotateX(0deg)",
                    animation:"menu2 .3s linear "+(1.2-0.2*index)+"s forwards"
                })

            })
            setTimeout(function(){
                // $(".menu").css("display","none");
            })

            flag2=true;

        }
    })

    /*窗口大小发生改变时，浏览器宽高的响应*/
    $(window).resize(function(){
        ch=$(window).height();
        var cw=$(window).width();
        $("#fullpage").css("marginTop",ch*(-num));
        if(cw>1000){
            $(".menu a").css({
                animation:"none",
                opcity:0,
                transform:"rotate(90deg)"
            })
        }
        $(".menuTl,.menuBl").css({
            transform:"translate(0,0) rotate(0deg)"
        })
        flag2=true;

    })


})
