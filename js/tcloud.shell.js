tcloud.shell = (function(){
 var 
  configMap = {
    main_html : String()
    + '<div class="tcloud-shell-head">'
    + '<div class="tcloud-shell-head-logo"></div>'
    + '<div class="tcloud-shell-head-search"></div>'
    + '</div>'
    + '<div class="tcloud-shell-main">'
    + '<div class="tcloud-shell-main-nav"></div>'
    + '<div class="tcloud-shell-main-content"></div>'
    + '</div>'
    + '<div class="tcloud-shell-foot"></div>'
    + '<div class="tcloud-shell-chat"></div>'
    + '<div class="tcloud-shell-modal"></div>',
    chat_extend_time: 1000,
    chat_retract_time:300,
    chat_extend_height:450,
    chat_retract_height:15,
    chat_extended_title:'Click to retreat',
    chat_retracted_title:'Click to extend'
  },
  stateMap = {
    $container:null,
    is_chat_retracted:true
  },
  jqueryMap ={},
  setJqueryMap, toggleChat, onClickChat,initModule;

  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = {
      $container:$container,
      $chat:$container.find('.tcloud-shell-chat')
    };
  };

  //Begin DOM method /toggleChat/
  //Purpose: Extends or retracts chat slider
  //Arguments:
  // *do_extend - if true, extends slider, if flase retracts it
  // *callback: -optional function to execute at end of animation
  // Settings:
  //  *chat_extend_time, chat_retract_time, chat_extend_height, chat_retract_height
  //  Returns: boolean
  //   *true - slider animation activated
  //   *false - slider animation not activated
  //
  toggleChat = function(do_extend, callback) {
    var 
     px_chat_ht = jqueryMap.$chat.height(),
     is_open = px_chat_ht === configMap.chat_extend_height,
     is_closed = px_chat_ht === configMap.chat_retract_height,
     is_sliding = ! is_open && ! is_closed;

     if(is_sliding) {return false;} //avoid race condition

     if(do_extend) {
       jqueryMap.$chat.animate(
         {height:configMap.chat_extend_height},
         configMap.chat_extend_time,
         function(){
          jqueryMap.$chat.attr('title', configMap.chat_extended_title);
          stateMap.is_chat_retracted = false;
          if(callback){callback(jqueryMap.$chat);}
         }
       );

       return true;
     }
     //End extend chat slider
     jqueryMap.$chat.animate(
      {height:configMap.chat_retract_height},
      configMap.chat_retract_time,
      function(){
        jqueryMap.$chat.attr('title', configMap.chat_retracted_title);
        stateMap.is_chat_retracted = true;
        if(callback){callback(jqueryMap.$chat);}
      }
     );

     return true;
  };

  onClickChat = function(event) {
    if(toggleChat(stateMap.is_chat_retracted)) {
      $.uriAnchor.setAnchor({
        chat:(stateMap.is_chat_retracted?'open':'closed')
      });
    }
    return false;
  };

  initModule = function($container){
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    stateMap.is_chat_retracted = true;
    jqueryMap.$chat.attr('title', configMap.chat_retracted_title)
                    .click(onClickChat);
  };

  return {initModule:initModule};
}());
