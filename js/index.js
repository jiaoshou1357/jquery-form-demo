 $(function(){
    /* 控制点击动画的效果   */
   $(".la").click( function(){
        
         /*if(!$(this).hasClass('scaleMove')){
          $(this).addClass("scaleMove")
          $(this).removeClass('scaleMove_leave')
          $(this).parent().find('input').addClass('isShadow')
          $(this).parent().find('input').focus()
         }else{
           if($(this).parent().find('input').val()==''){
             $(this).parent().find('input').removeClass('isShadow')
              $(this).addClass('scaleMove_leave')
              $(this).removeClass('scaleMove')
           }
         }*/  
          
        var _this=$(this)
        if($(this).css("top")!=="-30px"){
           $(this).animate({top:"-30px","font-size":"14px"},300)
           $(this).parent().find("input").focus()
       }else{
          if(_this.parent().find("input").val()==''){
            _this.animate({top:"0px","font-size":"18px"},300)
          }
       } 
   })

   $(".la").mouseover(function(){
       $(this).parent().find("input").unbind("blur")
    })
    $(".la").mouseout(function(){
       $(this).parent().find("input").bind("blur",function(){
            var _this=$(this)
           if(_this.parent().find(".la").css("top")=="-30px"){
            
            if(_this.val()==''){
                 _this.parent().find(".la").animate({top:"0px","font-size":"18px"},300)
           }
          }
       })
    })
    /*動畫結束*/

    var firstEnter=false   //第一次進來不做驗證函數
    var submitOver=false  //防止重复提交
    function checkUser(val){
       if(val!==""){
         return  true
       }else {
        return  false
       }
     }
    function checkPhone(val){
       var phone=/^[0-9]{8,}$/
       if(phone.test(val)){
         return true
       }else{
        return false
       }
     }
    function checkEmail(val){
        var email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(email.test(val)){
          return true
        }else{
          return false
        }
      }
     function checkAgree(val){
        if(val==false){
          return  false
        }else{
          return true
        }
      }
      function checkSelect(val){
        if(val==''){
          return false
        }else{
          return true
        }
      }
  
    // 验证所有input (type=text) i参数代表要验证的表单元素dom，fn是一个表单验证规则函数
    function testInputText(i,fn){
       var bool=false
       i.change(function(){
         if(!fn($(this).val())){
             $(this).parent().find(".error").css("display","block")
             bool=false
         }else{
            $(this).parent().find(".error").css("display","none")
             bool=true
         }
        
     })
     i.bind('input propertychange',function(){

         if(!fn($(this).val())){
             $(this).parent().find(".error").css("display","block")
              bool=false
         }else{
            $(this).parent().find(".error").css("display","none")
            bool=true
         }
      });
     i.blur(function(){
       if(!fn($(this).val())){
             $(this).parent().find(".error").css("display","block")
             bool=false
         }else{
            $(this).parent().find(".error").css("display","none")
            bool=true
         }
     })
       if(firstEnter){
            if(!fn(i.val())){
             i.parent().find(".error").css("display","block")
                 bool=false
           }else{
               i.parent().find(".error").css("display","none")
                  bool=true
           }
       }
       return bool
    }

    // 验证所有select i参数代表要验证的表单元素dom，fn是一个表单验证规则函数
    function testSelect(i,fn){
        var bool=false
        i.change(function(){
         if(!fn($(this).val())){
             $(this).addClass("box_shadow")
             bool=false
         }else{
            $(this).removeClass("box_shadow")
            bool=true
         }
        })
         i.blur(function(){
         if(!fn($(this).val())){
             $(this).addClass("box_shadow")
             bool=false
         }else{
            $(this).removeClass("box_shadow")
             bool=true
         }
       })
       if(firstEnter){
          if(!fn(i.val())){
                i.addClass("box_shadow")
                 bool=false
           }else{
                i.removeClass("box_shadow")
                 bool=true
           }
       }
       return bool
    }
     
     /*驗證所有的checkbox*/
     function testCheckbox(i){

         var bool=false
         i.change(function(){
           if(i.is(":checked")==false){
              i.parent().find(".error").css("display","block")
              bool=false
           }else{
              i.parent().find(".error").css("display","none")
              bool=true
           }  
         })

         if(firstEnter){
             if(i.is(":checked")==false){
              i.parent().find(".error").css("display","block")
              bool=false
             }else{
              i.parent().find(".error").css("display","none")
              bool=true
             }
         }
         
         return bool
         
     }

    var userNameDom=$(".userName")
    testInputText(userNameDom,checkUser)

   
    var phoneNumberDom=$(".phoneNumber")
    testInputText(phoneNumberDom,checkPhone)

    
    var emailDom=$(".email")
    testInputText(emailDom,checkEmail)
    
    
    var f_userNameDom=$(".f_userName")
    testInputText(f_userNameDom,checkUser)
     
     
    var f_phoneDom=$(".f_phone")
    testInputText(f_phoneDom,checkPhone)
    
    
    var f_emailDom=$(".f_email")
    testInputText(f_emailDom,checkEmail)

    var agree_oneDom=$(".agree_one")
      testCheckbox(agree_oneDom)
    
   
    var ageDom=$(".age")
    testSelect(ageDom,checkSelect)

   /*切換是否和朋友一起*/
   $(":input[type='radio']").change(function(){
       if($(this).val()=="yes"){
           f_phoneDom.parent().find("input").css("display","block") 
           f_emailDom.parent().find("input").css("display","block") 
           f_userNameDom.parent().find("input").css("display","block") 
       }else{

         f_phoneDom.parent().find("input").css("display","none") 
         f_emailDom.parent().find("input").css("display","none") 
         f_userNameDom.parent().find("input").css("display","none") 
       }
   })
   /*切換是否和朋友一起end*/

   /*表單提交驗證*/
   $(".btn>div").click(function(){
       firstEnter=true
       if(submitOver){
        alert("不能重複提交")
       }
       if(!submitOver){
            
          if($(":input[type='radio']:checked").val()=="yes"){
                if(
                   testInputText(userNameDom,checkUser)&&
                   testInputText(phoneNumberDom,checkPhone)&&
                   testInputText(emailDom,checkEmail)&&
                   testInputText(f_userNameDom,checkUser)&&
                   testInputText(f_phoneDom,checkPhone)&&
                   testInputText(f_emailDom,checkEmail)&&
                   testSelect(ageDom,checkSelect)&&
                   testCheckbox(agree_oneDom)
                ){
                    $("#form").submit()
                    alert("提交成功")  //
                   submitOver=true
                   location.href='index.html'
               }else{
                     testInputText(userNameDom,checkUser)
                     testInputText(phoneNumberDom,checkPhone)
                     testInputText(emailDom,checkEmail)
                     testSelect(ageDom,checkSelect)
                     testCheckbox(agree_oneDom)
                     testInputText(f_userNameDom,checkUser)
                     testInputText(f_phoneDom,checkPhone)
                     testInputText(f_emailDom,checkEmail)
               }
          }else{
                if(
                   testInputText(userNameDom,checkUser)&&
                   testInputText(phoneNumberDom,checkPhone)&&
                   testInputText(emailDom,checkEmail)&&
                   testSelect(ageDom,checkSelect)&&
                   testCheckbox(agree_oneDom)
                ){
                    $("#form").submit()
                    alert("提交成功")  //
                    submitOver=true
                    location.href='index.html'
               }else{
                     testInputText(userNameDom,checkUser)
                     testInputText(phoneNumberDom,checkPhone)
                     testInputText(emailDom,checkEmail)
                     testSelect(ageDom,checkSelect)
                     testCheckbox(agree_oneDom)
               }
          }

       }


   })
  /*表單提交驗證end*/
})