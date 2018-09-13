var GSWL = {
  name : "Google Script _ Web Library",
  version : "0.0.2",
  routes : [],
  favicon : "",
  title : "",
  MODE : {
    DISPLAY:0,
    COMPUTE :1,
  },

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
   this.title = title == null ? "Google Script _ Web Library" : title
   this.favicon = favicon == null ? "" : favicon
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

  setRoute : function(route){

    route.title = route.title == null ? this.title : route.title
    route.favicon = route.favicon == null ? this.favicon : route.favicon

    this.routes[route.route] = route
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
      if(route == null) return ContentService.createTextOutput("GS WL INDEX").setMimeType(ContentService.MimeType.TEXT);
    }
    switch(route.mode){
      case GSWL.MODE.DISPLAY:
        if(route.favicon == "")  return  this.display(route.file).setTitle(route.title);
        return  this.display(route.file).setTitle(route.title).setFaviconUrl(route.favicon);
      case GSWL.MODE.COMPUTE:
         return this.display(route.file)
    }

  },

}

function GSWL_route(route, title,  mode, file, favicon){
  this.route = route
  this.mode = mode == null ? GSWL.MODE.DISPLAY : mode
  this.title = title 
  this.file = file == null ? route : file
  this.favicon = favicon 
  return this
}
