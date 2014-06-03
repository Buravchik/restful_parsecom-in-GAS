//D - класс базы данных Parse.com
var D = function (appId, restId) {
  if (!appId || !restId) {
    throw("Должны быть указаны оба обязательных параметра appId, restId.");
  }
  var pm = new ParseMachine (appId,restId);
  var addItem = function (table, object) {
    return pm.create(table, object);
  }
  var updateItem = function (table, id, object) {
    return pm.update (table, id, object);
  }
  var getItem = function (table, id) {
    return pm.load (table, id);
  }
  var getIncludeItem = function (table, id, fieldToInclude) {
    return pm.includeLoad(table, id,fieldToInclude);
  }
  var incrementField = function (table, id, field, amount) {
    return pm.increment(table, id, field, amount);
  }
  var getTable = function(tableName) {
    return T (this,tableName);
  }
  return {addItem       : addItem,
          updateItem    : updateItem,
          getItem       : getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField,
          getTable      : getTable,
         };
}
//T - класс таблицы Parse.com. В нем d - экземпляр класса базы данных Parse.com
var T = function (d,tableName) {
  var addItem = function (object) {
    return d.addItem(tableName,object);
  }
  var updateItem = function (id, object) {
    return d.updateItem(tableName, id, object);
  }
  var getItem = function (id) {
    return d.getItem(tableName,id);
  }
  var getIncludeItem = function (id, fieldToInclude) {
    return d.getIncludeItem(tableName, id, fieldToInclude);
  }
  var incrementField = function (id, field, amount) {
    return d.incrementField (tableName, id, field, amount);
  }
  var getName = function() {
    return tableName;
  }
  var getRecord = function (id) {
    return R (this,id);
  }
  return {addItem       : addItem,
          updateItem    : updateItem,
          getItem       : getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField,
          getName       : getName,
          getRecord     : getRecord
         };
}
//R - класс строки таблицы
var R = function (t, id) {
  var updateItem = function (object) {
    return t.updateItem (id, object);
  }
  var getItem = function () {
    return t.getItem (id);
  }
  var getIncludeItem = function (fieldToInclude) {
    return t.getIncludeItem (id, fieldToInclude);
  }
  var incrementField = function (field, amount) {
    return t.incrementField (id, field, amount);
  }
  return {updateItem: updateItem,
          getItem: getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField
         }
}
function testT() {
 //  var d = new D("<<yourKey>>","<<yourKey>>");
 // var t = d.getTable('Contracts');
 // var r = t.getRecord("jgLKC4PExz");
 //  Logger.log(r.getItem());
 //tests
 //  d.addItem("_User",{username:"aaaaaaaaaaaaaa", password:"bbb"});
 //  d.updateItem("Contracts","jgLKC4PExz", {theirNumber: "10"});
 //  Logger.log(d.getItem("Contracts","jgLKC4PExz"));
 //  Logger.log(d.getIncludeItem("Contracts","jgLKC4PExz","ownerid"));
 //  d.incrementField("Contracts","jgLKC4PExz", "delme", "100");
  
//  t.incrementField("jgLKC4PExz", "delme", "100");
//  Logger.log(t.getItem("jgLKC4PExz"));
//  Logger.log(t.getIncludeItem("jgLKC4PExz","ownerid"));
  //  Logger.log(t.addItem({asdfasdf:235234}));
  //  Logger.log(t.addItem({contractName: "sadfasdfasd", pdfUrl:"235234"}))
  //  Logger.log(t.getName());
  //  Logger.log(t.updateItem("jgLKC4PExz", {theirNumber: "20"}));
  
  //  d.addItem('table',{obj:'obj'});
  //  var t1 = d.getTable('table1');
//  Logger.log(t1.getName());
//  
//  var t2 = d.getTable('table2');
//  Logger.log(t2.getName());
//  t2.addItem({c:888});
//  Logger.log(t1.getName());
}
