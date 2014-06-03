function ParseMachine(appId, restId) {    
  this._options = {    
    "headers": {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key"  : restId
    }
  };
  
  this._optionsCreate = Object.create(this._options);
  this._optionsCreate.method = "post";
  this._optionsCreate.contentType = "application/json";
  
  this._optionsLoad = Object.create(this._options);
  this._optionsLoad.method = "get";
  
  this._optionsInclude = Object.create(this._optionsLoad);
  
  this._optionsUpdate = Object.create(this._optionsCreate);
  this._optionsUpdate.method = "put";
  
  this._optionsIncrement = Object.create(this._optionsUpdate);
}

ParseMachine.prototype = {
  create : function (table,payload) { 
    this._optionsCreate.payload = JSON.stringify(payload);
    var response = UrlFetchApp.fetch("https://api.parse.com/1/classes/"+table, this._optionsCreate);
    this._optionsCreate.payload = "";
    return response;
  },
  load : function (table,id) {
    var response = UrlFetchApp.fetch("https://api.parse.com/1/classes/"+table+'/'+id, this._optionsLoad);
    return response;
  },
  includeLoad : function (table, id, incl) {  
    var include = encodeURIComponent("&indlude=depid");
    var response = UrlFetchApp.fetch("https://api.parse.com/1/classes/"+table+'/'+id+"?include="+incl, this._optionsInclude);
    return response;
  },
  update : function(table, id, payload) {
    this._optionsUpdate.payload = JSON.stringify(payload);
    var response = UrlFetchApp.fetch("https://api.parse.com/1/classes/"+table+"/"+id, this._optionsUpdate);
    this._optionsUpdate.payload = "";
    return response;
  },
  increment : function (table, id, field, amount) {
    this._optionsIncrement.payload = '{"'+field+'":{"__op":"Increment","amount":'+amount+'}}';
    Logger.log(this._optionsIncrement.payload);
    var response = UrlFetchApp.fetch("https://api.parse.com/1/classes/"+table+"/"+id, this._optionsIncrement);
    return response;
  }
};