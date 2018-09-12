var GS_WL = {
  name : "Google Script _ Web Library",
  version : "1.0.0",

  include :  function (filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
  },

  include_js :  function (filename) {
    return "<script>"+this.include(filename)+"</script>"
  },

  include_css :  function (filename) {
    return "<style>"+this.include(filename)+"</style>"
  },

  init :  function (e) {
   this.setRequest(e)
  },  

  getRequest : function(){
    var cache = CacheService.getUserCache();  
    return cache.get("request")
  },

  setRequest : function(e){
    var cache = CacheService.getUserCache();  
    cache.put("request",e );
  },

}
