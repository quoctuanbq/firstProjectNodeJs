
$(".barMenu").click(()=>{
    $('.shortMenuContainer').animate({
        width:"toggle"
    });
})
$("#aa").click(()=>{
    $(".shortMenuContainer").animate({
        width:"toggle",
        transition:0.1
    });
})
$(document).on("scroll",()=>{
    if($(document).scrollTop()>150){
        $(".headerAll").slideUp(600,"swing");
        $(".backToTop").show();
    }else{
        $(".headerAll").slideDown(500);
        $(".backToTop").hide();
    }
})
// $('.filter i:last-child').on("click",()=>{
//     $('.filter-ck').show();
//     $('.filter i:first-child').show();
//     $('.filter i:last-child').hide();
//     var k=$("this").attr('id');
// alert(k);
// })
// $('.filter i:first-child').on("click",()=>{
//     $('.filter-ck').hide();
//     $('.filter i:first-child').hide();
//     $('.filter i:last-child').show();
// })

function dodo(kc){
    var k=$(kc).parent().attr('id');
    $("."+k).hide("slow");
    $(kc).hide();
    $($(kc).next()).show();
}  



