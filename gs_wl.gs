var GS_WL = {
  name : "Google Script _ Web Library",
  version : "0.0.2",
  routes : [],
  favicon : "",
  title : "",

  display : function(filename){
   return HtmlService.createTemplateFromFile(filename).evaluate()
 },

 include :  function (filename) {
  return this.getContent();
  },

  includeJs :  function (filename) {
    return "<script>"+this.include(filename)+"</script>"
  },

  includeCss :  function (filename) {
    return "<style>"+this.include(filename)+"</style>"
  },

  init :  function (e,title,favicon) {
   this.setRequest(e)
   this.title = title == "" ? "Google Script _ Web Library" : title
   this.favicon = favicon == "" ? "Google Script _ Web Library" : favicon
  },  

  getRequest : function(){
    var cache = CacheService.getUserCache();  
    return JSON.parse(cache.get("GS_WL_request"))
  },

  getPage : function(){
    var parameter = this.getRequest().parameter
    var page = "";
    if(parameter.hasOwnProperty("page")){
      return parameter.page
    }else{
      return "index"
    }
  },

  setRequest : function(e){
    var cache = CacheService.getUserCache();  
    cache.put("GS_WL_request", JSON.stringify(e) );
  },

  setRoute : function(route,file,title,favicon){
    file = file == null ? route : file
    title = title == null ? this.title : title
    favicon = favicon == null ? this.favicon : favicon
    this.routes[route] = [file,title,favicon]
  },

  getRoute : function(route){
    return this.routes[route] == undefined ? [] : this.routes[route]
  },

  getUrl : function(route){
    return  ScriptApp.getService().getUrl() + "?page="+route
  },

  executeRoute : function(){
    var route = this.getRoute(this.getPage())
    if( route.length == 0){
      route = this.getRoute("index")
      if(route.length ==0) return ContentService.createTextOutput("GS WL INDEX").setMimeType(ContentService.MimeType.TEXT);
    }
    if(route[2] == "")  return  this.display(route[0]).setTitle(route[1]);
    return  this.display(route[0]).setTitle(route[1]).setFaviconUrl(route[2]);
  },
}
