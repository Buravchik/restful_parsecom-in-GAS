function ParseMachine(appId, restId) {    
  this._options = {    
    "headers": {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key"  : restId
    }
  };
  this._baseUrl = "https://api.parse.com/1/";
  
  this._optionsCreate = Object.create(this._options);
  this._optionsCreate.method = "post";
  this._optionsCreate.contentType = "application/json";
  
  this._optionsLoad = Object.create(this._options);
  this._optionsLoad.method = "get";
  
  this._optionsInclude = Object.create(this._optionsLoad);
  
  this._optionsUpdate = Object.create(this._optionsCreate);
  this._optionsUpdate.method = "put";
  
  this._optionsIncrement = Object.create(this._optionsUpdate);
  
  this._optionsArray = Object.create(this._optionsUpdate);//they are same
}

ParseMachine.prototype = {
  create : function (table,payload) { 
    this._optionsCreate.payload = JSON.stringify(payload);
    var response = UrlFetchApp.fetch (this._baseUrl + "classes/"+table, this._optionsCreate);
    this._optionsCreate.payload = "";
    return response;
  },
  load : function (table,id) {
    var response = UrlFetchApp.fetch(this._baseUrl + "classes/"+table+'/'+id, this._optionsLoad);
    return response;
  },
  includeLoad : function (table, id, incl) {  
    var response = UrlFetchApp.fetch(this._baseUrl + "classes/"+table+'/'+id+"?include="+incl, this._optionsInclude);
    return response;
  },
  update : function(table, id, payload) {
    this._optionsUpdate.payload = JSON.stringify(payload);
    var response = UrlFetchApp.fetch(this._baseUrl + "classes/"+table+"/"+id, this._optionsUpdate);
    this._optionsUpdate.payload = "";
    return response;
  },
  increment : function (table, id, field, amount) {
    this._optionsIncrement.payload = '{"'+field+'":{"__op":"Increment","amount":'+amount+'}}';
    var response = UrlFetchApp.fetch(this._baseUrl + "classes/"+table+"/"+id, this._optionsIncrement);
    return response;
  },
  arrayAdd : function (table, id, field, elements, method) {
    if ((method != "Add") && (method != "AddUnique") && (method != "Delete")) {
      throw ("Method must be one of 'Add', 'AddUnique', 'Delete'."); 
    }
    this._optionsArray.payload = {};
    this._optionsArray.payload[field] = {"__op":method,"objects":elements};
    this._optionsArray.payload = JSON.stringify(this._optionsArray.payload);
    var response = UrlFetchApp.fetch(this._baseUrl + "classes/"+table+"/"+id, this._optionsArray);
    return response;
  }
};