var ParseDb = function (appId, restId) {
  if (!appId || !restId) {
    throw("Both parameters are required appId, restId.");
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
    return ParseTable (this,tableName);
  }
  var arrayAdd = function (table, id, field, elements, method) {
    return pm.arrayAdd(table, id, field, elements, method);
  }
  return {addItem       : addItem,
          updateItem    : updateItem,
          getItem       : getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField,
          getTable      : getTable,
          arrayAdd      : arrayAdd
         };
}
//parseDb - экземпляр класса базы данных ParseDb в Parse.com
var ParseTable = function (parseDb,tableName) {
  var addItem = function (object) {
    return parseDb.addItem(tableName,object);
  }
  var updateItem = function (id, object) {
    return parseDb.updateItem(tableName, id, object);
  }
  var getItem = function (id) {
    return parseDb.getItem(tableName,id);
  }
  var getIncludeItem = function (id, fieldToInclude) {
    return parseDb.getIncludeItem(tableName, id, fieldToInclude);
  }
  var incrementField = function (id, field, amount) {
    return parseDb.incrementField (tableName, id, field, amount);
  }
  var getName = function() {
    return tableName;
  }
  var getRecord = function (id) {
    return ParseRecord (this,id);
  }
  var arrayAdd = function (id, field, elements, method) {
    return parseDb.arrayAdd(tableName, id, field, elements, method);
  }
  return {addItem       : addItem,
          updateItem    : updateItem,
          getItem       : getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField,
          getName       : getName,
          getRecord     : getRecord,
          arrayAdd      : arrayAdd
         };
}
//ParseRecord - класс строки таблицы
//parseTable - экземпляр класса ParseTable
var ParseRecord = function (parseTable, id) {
  var updateItem = function (object) {
    return parseTable.updateItem (id, object);
  }
  var getItem = function () {
    return parseTable.getItem (id);
  }
  var getIncludeItem = function (fieldToInclude) {
    return parseTable.getIncludeItem (id, fieldToInclude);
  }
  var incrementField = function (field, amount) {
    return parseTable.incrementField (id, field, amount);
  }
  var arrayAdd = function (field, elements, method) {
    return parseTable.arrayAdd (id, field, elements, method);
  }
  return {updateItem: updateItem,
          getItem       : getItem,
          getIncludeItem: getIncludeItem,
          incrementField: incrementField,
          arrayAdd      : arrayAdd
         }
}