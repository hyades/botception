var createSchema = require('common').createSchema;
var spamDataFields=require('common').SpamDataFields;
var partnerProfileDataFields=require('common').partnerProfileDataFields;
var clone = require('clone');

var _spamDataFields = clone(spamDataFields);
var _partnerProfileDataFields=clone(partnerProfileDataFields);

setupSchemaConfig = function(){
    var trackerMetaDataSchemaObj={};
    var reducedClickViewDataSchemaObj={};
    var secondaryClickDataSchemaObj ={};
    var clickViewDataSchemaTypeMap={
        'FULL':trackerMetaDataSchemaObj,
        'REDUCED':reducedClickViewDataSchemaObj,
        'SECONDARY':secondaryClickDataSchemaObj
    };

    var partnerProfileDataSchemaObj={};
    var partnerProfileDataSchemaTypeMap={
        'FULL':partnerProfileDataSchemaObj
    };

    createSchema(_partnerProfileDataFields,partnerProfileDataSchemaTypeMap);
    createSchema(_spamDataFields, clickViewDataSchemaTypeMap);

    exports.spamDataFields = _spamDataFields;
    exports.trackerMetaDataSchemaObj = trackerMetaDataSchemaObj;
    exports.reducedClickViewDataSchemaObj = reducedClickViewDataSchemaObj;
    exports.secondaryClickDataSchemaObj = secondaryClickDataSchemaObj;
    exports.partnerProfileDataFields=_partnerProfileDataFields;
    exports.partnerProfileDataSchemaObj=partnerProfileDataSchemaObj;
};

exports.setupSchemaConfig = setupSchemaConfig;


