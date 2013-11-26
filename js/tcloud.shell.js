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
    + '<div class="tcloud-shell-modal"></div>'
  },
  stateMap = {$container:null},
  jqueryMap ={},
  setJqueryMap, initModule;

  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = {$container:$container};
  };

  initModule = function($container){
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
  };

  return {initModule:initModule};
}());
