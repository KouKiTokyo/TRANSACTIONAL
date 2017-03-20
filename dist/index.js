(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Nested"] = factory();
	else
		root["Nested"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var tools = __webpack_require__(5);
exports.tools = tools;
__export(__webpack_require__(7));
__export(__webpack_require__(18));
var eventsApi = __webpack_require__(6);
exports.eventsApi = eventsApi;
var mixins_1 = __webpack_require__(7);
Object.extend = function (protoProps, staticProps) { return mixins_1.Mixable.extend(protoProps, staticProps); };
Object.assign || (Object.assign = tools.assign);
Object.log = tools.log;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_plus_1 = __webpack_require__(0);
var validation_1 = __webpack_require__(27);
var traversable_1 = __webpack_require__(10);
var assign = object_plus_1.tools.assign, trigger2 = object_plus_1.eventsApi.trigger2, trigger3 = object_plus_1.eventsApi.trigger3, on = object_plus_1.eventsApi.on, off = object_plus_1.eventsApi.off;
var ItemsBehavior;
(function (ItemsBehavior) {
    ItemsBehavior[ItemsBehavior["share"] = 1] = "share";
    ItemsBehavior[ItemsBehavior["listen"] = 2] = "listen";
    ItemsBehavior[ItemsBehavior["persistent"] = 4] = "persistent";
})(ItemsBehavior = exports.ItemsBehavior || (exports.ItemsBehavior = {}));
var Transactional = (function () {
    function Transactional(cid) {
        this._events = void 0;
        this._changeToken = {};
        this._transaction = false;
        this._isDirty = null;
        this._owner = void 0;
        this._ownerKey = void 0;
        this._validationError = void 0;
        this.cid = this.cidPrefix + cid;
    }
    Transactional.prototype.dispose = function () {
        if (this._disposed)
            return;
        this._owner = void 0;
        this._ownerKey = void 0;
        this.off();
        this.stopListening();
        this._disposed = true;
    };
    Transactional.prototype.initialize = function () { };
    Transactional.prototype.onChanges = function (handler, target) {
        on(this, this._changeEventName, handler, target);
    };
    Transactional.prototype.offChanges = function (handler, target) {
        off(this, this._changeEventName, handler, target);
    };
    Transactional.prototype.listenToChanges = function (target, handler) {
        this.listenTo(target, target._changeEventName, handler);
    };
    Transactional.prototype.transaction = function (fun, options) {
        if (options === void 0) { options = {}; }
        var isRoot = exports.transactionApi.begin(this);
        fun.call(this, this);
        isRoot && exports.transactionApi.commit(this);
    };
    Transactional.prototype.updateEach = function (iteratee, options) {
        var isRoot = exports.transactionApi.begin(this);
        this.each(iteratee);
        isRoot && exports.transactionApi.commit(this);
    };
    Transactional.prototype.set = function (values, options) {
        if (values) {
            var transaction = this._createTransaction(values, options);
            transaction && transaction.commit();
        }
        return this;
    };
    Transactional.prototype.parse = function (data, options) { return data; };
    Transactional.prototype.deepGet = function (reference) {
        return traversable_1.resolveReference(this, reference, function (object, key) { return object.get ? object.get(key) : object[key]; });
    };
    Transactional.prototype.getOwner = function () {
        return this._owner;
    };
    Transactional.prototype.getStore = function () {
        var _owner = this._owner;
        return _owner ? _owner.getStore() : this._defaultStore;
    };
    Transactional.prototype.map = function (iteratee, context) {
        var arr = [], fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee;
        this.each(function (val, key) {
            var result = fun(val, key);
            if (result !== void 0)
                arr.push(result);
        });
        return arr;
    };
    Transactional.prototype.mapObject = function (iteratee, context) {
        var obj = {}, fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee;
        this.each(function (val, key) {
            var result = iteratee(val, key);
            if (result !== void 0)
                obj[key] = result;
        });
        return obj;
    };
    Object.defineProperty(Transactional.prototype, "validationError", {
        get: function () {
            var error = this._validationError || (this._validationError = new validation_1.ValidationError(this));
            return error.length ? error : null;
        },
        enumerable: true,
        configurable: true
    });
    Transactional.prototype.validate = function (obj) { };
    Transactional.prototype.getValidationError = function (key) {
        var error = this.validationError;
        return (key ? error && error.nested[key] : error) || null;
    };
    Transactional.prototype.deepValidationError = function (reference) {
        return traversable_1.resolveReference(this, reference, function (object, key) { return object.getValidationError(key); });
    };
    Transactional.prototype.eachValidationError = function (iteratee) {
        var validationError = this.validationError;
        validationError && validationError.eachError(iteratee, this);
    };
    Transactional.prototype.isValid = function (key) {
        return !this.getValidationError(key);
    };
    Transactional.prototype.valueOf = function () { return this.cid; };
    Transactional.prototype.toString = function () { return this.cid; };
    Transactional.prototype.getClassName = function () {
        var name = this.constructor.name;
        if (name !== 'Subclass')
            return name;
    };
    return Transactional;
}());
Transactional = __decorate([
    object_plus_1.mixins(object_plus_1.Messenger),
    object_plus_1.extendable
], Transactional);
exports.Transactional = Transactional;
exports.transactionApi = {
    begin: function (object) {
        return object._transaction ? false : (object._transaction = true);
    },
    markAsDirty: function (object, options) {
        var dirty = !options.silent;
        if (dirty)
            object._isDirty = options;
        object._changeToken = {};
        object._validationError = void 0;
        return dirty;
    },
    commit: function (object, initiator) {
        var originalOptions = object._isDirty;
        if (originalOptions) {
            while (object._isDirty) {
                var options = object._isDirty;
                object._isDirty = null;
                trigger3(object, object._changeEventName, object, options, initiator);
            }
            object._transaction = false;
            var _owner = object._owner;
            if (_owner && _owner !== initiator) {
                _owner._onChildrenChange(object, originalOptions);
            }
        }
        else {
            object._isDirty = null;
            object._transaction = false;
        }
    },
    aquire: function (owner, child, key) {
        if (!child._owner) {
            child._owner = owner;
            child._ownerKey = key;
            return true;
        }
        return child._owner === owner;
    },
    free: function (owner, child) {
        if (owner === child._owner) {
            child._owner = void 0;
            child._ownerKey = void 0;
        }
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __webpack_require__(9);
exports.Record = transaction_1.Record;
var object_plus_1 = __webpack_require__(0);
var define_1 = __webpack_require__(23);
var typespec_1 = __webpack_require__(12);
exports.ChainableAttributeSpec = typespec_1.ChainableAttributeSpec;
var transactions_1 = __webpack_require__(1);
var attributes_1 = __webpack_require__(8);
__export(__webpack_require__(8));
var assign = object_plus_1.tools.assign, defaults = object_plus_1.tools.defaults, omit = object_plus_1.tools.omit, getBaseClass = object_plus_1.tools.getBaseClass;
transaction_1.Record.define = function (protoProps, staticProps) {
    if (protoProps === void 0) { protoProps = {}; }
    var BaseConstructor = getBaseClass(this), baseProto = BaseConstructor.prototype, staticsDefinition = object_plus_1.tools.getChangedStatics(this, 'attributes', 'collection', 'Collection'), definition = assign(staticsDefinition, protoProps);
    if ('Collection' in this && this.Collection === void 0) {
        object_plus_1.tools.log.error("[Model Definition] " + this.prototype.getClassName() + ".Collection is undefined. It must be defined _before_ the model.", definition);
    }
    var dynamicMixin = define_1.compile(this.attributes = getAttributes(definition), baseProto._attributes);
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    assign(dynamicMixin.properties, protoProps.properties || {});
    assign(dynamicMixin, omit(definition, 'attributes', 'collection', 'defaults', 'properties', 'forEachAttr'));
    object_plus_1.Mixable.define.call(this, dynamicMixin, staticProps);
    defineCollection.call(this, definition.collection || definition.Collection);
    return this;
};
transaction_1.Record.predefine = function () {
    transactions_1.Transactional.predefine.call(this);
    this.Collection = getBaseClass(this).Collection.extend();
    this.Collection.prototype.model = this;
    createSharedTypeSpec(this, attributes_1.SharedType);
    return this;
};
transaction_1.Record._attribute = attributes_1.AggregatedType;
createSharedTypeSpec(transaction_1.Record, attributes_1.SharedType);
function getAttributes(_a) {
    var defaults = _a.defaults, attributes = _a.attributes, idAttribute = _a.idAttribute;
    var definition = typeof defaults === 'function' ? defaults() : attributes || defaults || {};
    if (idAttribute && !(idAttribute in definition)) {
        definition[idAttribute] = void 0;
    }
    return definition;
}
function defineCollection(collection) {
    if (typeof collection === 'function') {
        this.Collection = collection;
        this.Collection.prototype.model = this;
    }
    else {
        this.Collection.define(collection || {});
    }
}
Object.defineProperties(Date, {
    microsoft: {
        get: function () {
            return new typespec_1.ChainableAttributeSpec({
                type: Date,
                _attribute: attributes_1.MSDateType
            });
        }
    },
    timestamp: {
        get: function () {
            return new typespec_1.ChainableAttributeSpec({
                type: Date,
                _attribute: attributes_1.TimestampType
            });
        }
    }
});
Number.integer = function (x) { return x ? Math.round(x) : 0; };
Number.integer._attribute = attributes_1.NumericType;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
function createSharedTypeSpec(Constructor, Attribute) {
    Constructor.hasOwnProperty('shared') ||
        Object.defineProperty(Constructor, 'shared', {
            get: function () {
                return new typespec_1.ChainableAttributeSpec({
                    value: null,
                    type: Constructor,
                    _attribute: Attribute
                });
            }
        });
}
exports.createSharedTypeSpec = createSharedTypeSpec;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __webpack_require__(9);
var object_plus_1 = __webpack_require__(0);
var notEqual = object_plus_1.tools.notEqual, assign = object_plus_1.tools.assign;
var AnyType = (function () {
    function AnyType(name, a_options) {
        this.name = name;
        this.getHook = null;
        this.options = a_options;
        var options = assign({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
        options.getHooks = options.getHooks.slice();
        options.transforms = options.transforms.slice();
        options.changeHandlers = options.changeHandlers.slice();
        var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, changeEvents = options.changeEvents, validate = options.validate, getHooks = options.getHooks, transforms = options.transforms, changeHandlers = options.changeHandlers;
        this.value = value;
        this.type = type;
        this.propagateChanges = changeEvents !== false;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        if (options.isRequired) {
            this.validate = wrapIsRequired(this.validate);
        }
        transforms.unshift(this.convert);
        if (this.get)
            getHooks.unshift(this.get);
        this.initialize.call(this, options);
        if (getHooks.length) {
            var getHook_1 = this.getHook = getHooks.reduce(chainGetHooks);
            var validate_1 = this.validate;
            this.validate = function (record, value, key) {
                return validate_1.call(this, record, getHook_1.call(record, value, key), key);
            };
        }
        if (transforms.length) {
            this.transform = transforms.reduce(chainTransforms);
        }
        if (changeHandlers.length) {
            this.handleChange = changeHandlers.reduce(chainChangeHandlers);
        }
    }
    AnyType.create = function (options, name) {
        var type = options.type, AttributeCtor = options._attribute || (type ? type._attribute : AnyType);
        return new AttributeCtor(name, options);
    };
    AnyType.prototype.canBeUpdated = function (prev, next, options) { };
    AnyType.prototype.transform = function (value, options, prev, model) { return value; };
    AnyType.prototype.convert = function (value, options, prev, model) { return value; };
    AnyType.prototype.isChanged = function (a, b) {
        return notEqual(a, b);
    };
    AnyType.prototype.handleChange = function (next, prev, model) { };
    AnyType.prototype.create = function () { return new this.type(); };
    AnyType.prototype.clone = function (value, record) {
        if (value && typeof value === 'object') {
            if (value.clone)
                return value.clone();
            var proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return JSON.parse(JSON.stringify(value));
            }
        }
        return value;
    };
    AnyType.prototype.dispose = function (record, value) { };
    AnyType.prototype.validate = function (record, value, key) { };
    AnyType.prototype.toJSON = function (value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    AnyType.prototype.createPropertyDescriptor = function () {
        var _a = this, name = _a.name, getHook = _a.getHook;
        if (name !== 'id') {
            return {
                set: function (value) {
                    transaction_1.setAttribute(this, name, value);
                },
                get: getHook ?
                    function () {
                        return getHook.call(this, this.attributes[name], name);
                    } :
                    function () {
                        return this.attributes[name];
                    }
            };
        }
    };
    AnyType.prototype.initialize = function (name, options) { };
    AnyType.prototype._log = function (level, text, value, record) {
        object_plus_1.tools.log[level]("[Attribute Update] " + record.getClassName() + "." + this.name + ": " + text, value, 'Attributes spec:', record._attributes);
    };
    return AnyType;
}());
exports.AnyType = AnyType;
transaction_1.Record.prototype._attributes = { id: AnyType.create({ value: void 0 }, 'id') };
transaction_1.Record.prototype.defaults = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return { id: attrs.id };
};
function chainChangeHandlers(prevHandler, nextHandler) {
    return function (next, prev, model) {
        prevHandler.call(this, next, prev, model);
        nextHandler.call(this, next, prev, model);
    };
}
function chainGetHooks(prevHook, nextHook) {
    return function (value, name) {
        return nextHook.call(this, prevHook.call(this, value, name), name);
    };
}
function chainTransforms(prevTransform, nextTransform) {
    return function (value, options, prev, model) {
        return nextTransform.call(this, prevTransform.call(this, value, options, prev, model), options, prev, model);
    };
}
function wrapIsRequired(validate) {
    return function (record, value, key) {
        return value ? validate.call(this, record, value, key) : 'Required';
    };
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = __webpack_require__(1);
var object_plus_1 = __webpack_require__(0);
var EventMap = object_plus_1.eventsApi.EventMap, trigger2 = object_plus_1.eventsApi.trigger2, trigger3 = object_plus_1.eventsApi.trigger3, on = object_plus_1.eventsApi.on, off = object_plus_1.eventsApi.off, commit = transactions_1.transactionApi.commit, markAsDirty = transactions_1.transactionApi.markAsDirty, _aquire = transactions_1.transactionApi.aquire, _free = transactions_1.transactionApi.free;
function dispose(collection) {
    var models = collection.models;
    collection.models = [];
    collection._byId = {};
    freeAll(collection, models);
    return models;
}
exports.dispose = dispose;
function convertAndAquire(collection, attrs, options) {
    var model = collection.model;
    var record;
    if (collection._shared) {
        record = attrs instanceof model ? attrs : model.create(attrs, options);
        if (collection._shared & transactions_1.ItemsBehavior.listen) {
            on(record, record._changeEventName, collection._onChildrenChange, collection);
        }
    }
    else {
        record = attrs instanceof model ? (options.merge ? attrs.clone() : attrs) : model.create(attrs, options);
        if (!_aquire(collection, record)) {
            var errors = collection._aggregationError || (collection._aggregationError = []);
            errors.push(record);
        }
    }
    var _itemEvents = collection._itemEvents;
    _itemEvents && _itemEvents.subscribe(collection, record);
    return record;
}
exports.convertAndAquire = convertAndAquire;
function free(owner, child) {
    if (owner._shared) {
        if (owner._shared & transactions_1.ItemsBehavior.listen) {
            off(child, child._changeEventName, owner._onChildrenChange, owner);
        }
    }
    else {
        _free(owner, child);
    }
    var _itemEvents = owner._itemEvents;
    _itemEvents && _itemEvents.unsubscribe(owner, child);
}
exports.free = free;
function freeAll(collection, children) {
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        free(collection, child);
    }
    return children;
}
exports.freeAll = freeAll;
function sortElements(collection, options) {
    var _comparator = collection._comparator;
    if (_comparator && options.sort !== false) {
        collection.models.sort(_comparator);
        return true;
    }
    return false;
}
exports.sortElements = sortElements;
function addIndex(index, model) {
    index[model.cid] = model;
    var id = model.id;
    if (id != null) {
        index[id] = model;
    }
}
exports.addIndex = addIndex;
function removeIndex(index, model) {
    delete index[model.cid];
    var id = model.id;
    if (id != null) {
        delete index[id];
    }
}
exports.removeIndex = removeIndex;
function updateIndex(index, model) {
    delete index[model.previous(model.idAttribute)];
    var id = model.id;
    id == null || (index[id] = model);
}
exports.updateIndex = updateIndex;
var CollectionTransaction = (function () {
    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
        this.object = object;
        this.isRoot = isRoot;
        this.added = added;
        this.removed = removed;
        this.nested = nested;
        this.sorted = sorted;
    }
    CollectionTransaction.prototype.commit = function (initiator) {
        var _a = this, nested = _a.nested, object = _a.object, _isDirty = object._isDirty;
        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
            var transaction = nested_1[_i];
            transaction.commit(object);
        }
        if (object._aggregationError) {
            logAggregationError(object);
        }
        for (var _b = 0, nested_2 = nested; _b < nested_2.length; _b++) {
            var transaction = nested_2[_b];
            trigger2(object, 'change', transaction.object, _isDirty);
        }
        var _c = this, added = _c.added, removed = _c.removed;
        for (var _d = 0, added_1 = added; _d < added_1.length; _d++) {
            var record = added_1[_d];
            trigger3(record, 'add', record, object, _isDirty);
            trigger3(object, 'add', record, object, _isDirty);
        }
        for (var _e = 0, removed_1 = removed; _e < removed_1.length; _e++) {
            var record = removed_1[_e];
            trigger3(record, 'remove', record, object, _isDirty);
            trigger3(object, 'remove', record, object, _isDirty);
        }
        if (this.sorted) {
            trigger2(object, 'sort', object, _isDirty);
        }
        if (added.length || removed.length) {
            trigger2(object, 'update', object, _isDirty);
        }
        this.isRoot && commit(object, initiator);
    };
    return CollectionTransaction;
}());
exports.CollectionTransaction = CollectionTransaction;
function logAggregationError(collection) {
    collection._log('error', 'added records already have an owner', collection._aggregationError);
    collection._aggregationError = void 0;
}
exports.logAggregationError = logAggregationError;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Log = (function () {
    function Log() {
        this.stops = {};
        this.throws = {};
        this.logger = typeof console !== 'undefined' ? console : null;
        this.reset();
    }
    Log.prototype.doLogging = function (type, args) {
        var logger = this.logger, logMethod = logger && logger[type];
        if (logMethod)
            logMethod.apply(logger, args);
        if (this.stops[type])
            debugger;
        if (this.throws[type])
            throw new Error("[" + type + "] " + args[0]);
        this.counts[type]++;
    };
    Log.prototype.reset = function () {
        this.level = 2;
        this.counts = { error: 0, warn: 0, info: 0, debug: 0 };
        this.stops = {};
        return this;
    };
    Log.prototype.developer = function (trueDeveloper) {
        this.level = 3;
        this.stops = { error: true, warn: Boolean(trueDeveloper) };
        return this;
    };
    Log.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level > 0)
            this.doLogging('error', args);
    };
    Log.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level > 1)
            this.doLogging('warn', args);
    };
    Log.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level > 2)
            this.doLogging('info', args);
    };
    Log.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level > 3)
            this.doLogging('debug', args);
    };
    Object.defineProperty(Log.prototype, "state", {
        get: function () {
            return ("\nObject.log - Object+ Logging and Debugging Utility\n--------------------------------------------------\nObject.log.counts: Number of logged events by type\n    { errors : " + this.counts.error + ", warns : " + this.counts.warn + ", info : " + this.counts.info + ", debug : " + this.counts.debug + " }\n\nObject.log.level == " + this.level + " : Ignore events which are above specified level \n    - 0 - logging is off;\n    - 1 - Object.log.error(...) only;\n    - 2 - .error() and .warn();\n    - 3 - .error(), .warn(), and .info();\n    - 4 - all of above plus .debug().\n\nObject.log.stops: Stops in debugger for some certain event types\n     { error : " + (this.stops.error || false) + ", warn  : " + (this.stops.warn || false) + ", info  : " + (this.stops.info || false) + ", debug : " + (this.stops.debug || false) + " } \n\nObject.log.throws: Throws expection on some certain event types\n     { error : " + (this.throws.error || false) + ", warn  : " + (this.throws.warn || false) + ", info  : " + (this.throws.info || false) + ", debug : " + (this.throws.debug || false) + " }\n");
        },
        enumerable: true,
        configurable: true
    });
    return Log;
}());
exports.Log = Log;
exports.log = new Log();
function isValidJSON(value) {
    if (value === null) {
        return true;
    }
    switch (typeof value) {
        case 'number':
        case 'string':
        case 'boolean':
            return true;
        case 'object':
            var proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return every(value, isValidJSON);
            }
    }
    return false;
}
exports.isValidJSON = isValidJSON;
function getBaseClass(Class) {
    return Object.getPrototypeOf(Class.prototype).constructor;
}
exports.getBaseClass = getBaseClass;
function getChangedStatics(Ctor) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    var Base = getBaseClass(Ctor), props = {};
    for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
        var name_1 = names_1[_a];
        var value = Ctor[name_1];
        if (value !== void 0 && value !== Base[name_1]) {
            props[name_1] = value;
        }
    }
    return props;
}
exports.getChangedStatics = getChangedStatics;
function isEmpty(obj) {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
exports.isEmpty = isEmpty;
function someArray(arr, fun) {
    var result;
    for (var i = 0; i < arr.length; i++) {
        if (result = fun(arr[i], i)) {
            return result;
        }
    }
}
function someObject(obj, fun) {
    var result;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (result = fun(obj[key], key)) {
                return result;
            }
        }
    }
}
function some(obj, fun) {
    if (Object.getPrototypeOf(obj) === ArrayProto) {
        return someArray(obj, fun);
    }
    else {
        return someObject(obj, fun);
    }
}
exports.some = some;
function every(obj, predicate) {
    return !some(obj, function (x) { return !predicate(x); });
}
exports.every = every;
function getPropertyDescriptor(obj, prop) {
    var desc;
    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
        desc = Object.getOwnPropertyDescriptor(proto, prop);
    }
    return desc;
}
exports.getPropertyDescriptor = getPropertyDescriptor;
function omit(source) {
    var dest = {}, discard = {};
    for (var i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard.hasOwnProperty(name) && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
exports.omit = omit;
function transform(dest, source, fun) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            var value = fun(source[name], name);
            value === void 0 || (dest[name] = value);
        }
    }
    return dest;
}
exports.transform = transform;
function fastAssign(dest, source) {
    for (var name in source) {
        dest[name] = source[name];
    }
    return dest;
}
exports.fastAssign = fastAssign;
function fastDefaults(dest, source) {
    for (var name in source) {
        if (dest[name] === void 0) {
            dest[name] = source[name];
        }
    }
    return dest;
}
exports.fastDefaults = fastDefaults;
function assign(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && assign(dest, other);
        }
    }
    return dest;
}
exports.assign = assign;
function defaults(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name) && !dest.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && defaults(dest, other);
        }
    }
    return dest;
}
exports.defaults = defaults;
Object.setPrototypeOf || (Object.setPrototypeOf = defaults);
function keys(o) {
    return o ? Object.keys(o) : [];
}
exports.keys = keys;
function once(func) {
    var memo, first = true;
    return function () {
        if (first) {
            first = false;
            memo = func.apply(this, arguments);
            func = null;
        }
        return memo;
    };
}
exports.once = once;
var ArrayProto = Array.prototype, DateProto = Date.prototype, ObjectProto = Object.prototype;
function notEqual(a, b) {
    if (a === b)
        return false;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        var protoA = Object.getPrototypeOf(a);
        if (protoA !== Object.getPrototypeOf(b))
            return true;
        switch (protoA) {
            case DateProto: return +a !== +b;
            case ArrayProto: return arraysNotEqual(a, b);
            case ObjectProto:
            case null:
                return objectsNotEqual(a, b);
        }
    }
    return true;
}
exports.notEqual = notEqual;
function objectsNotEqual(a, b) {
    var keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length)
        return true;
    for (var i = 0; i < keysA.length; i++) {
        var key = keysA[i];
        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
            return true;
        }
    }
    return false;
}
function arraysNotEqual(a, b) {
    if (a.length !== b.length)
        return true;
    for (var i = 0; i < a.length; i++) {
        if (notEqual(a[i], b[i]))
            return true;
    }
    return false;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = __webpack_require__(5);
var EventMap = (function () {
    function EventMap(map) {
        this.handlers = [];
        if (map) {
            if (map instanceof EventMap) {
                this.handlers = map.handlers.slice();
            }
            else {
                map && this.addEventsMap(map);
            }
        }
    }
    EventMap.prototype.merge = function (map) {
        this.handlers = this.handlers.concat(map.handlers);
    };
    EventMap.prototype.addEventsMap = function (map) {
        for (var names in map) {
            this.addEvent(names, map[names]);
        }
    };
    EventMap.prototype.bubbleEvents = function (names) {
        for (var _i = 0, _a = names.split(eventSplitter); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this.addEvent(name_1, getBubblingHandler(name_1));
        }
    };
    EventMap.prototype.addEvent = function (names, callback) {
        var handlers = this.handlers;
        for (var _i = 0, _a = names.split(eventSplitter); _i < _a.length; _i++) {
            var name_2 = _a[_i];
            handlers.push(new EventDescriptor(name_2, callback));
        }
    };
    EventMap.prototype.subscribe = function (target, source) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            on(source, event_1.name, event_1.callback, target);
        }
    };
    EventMap.prototype.unsubscribe = function (target, source) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            off(source, event_2.name, event_2.callback, target);
        }
    };
    return EventMap;
}());
exports.EventMap = EventMap;
var EventDescriptor = (function () {
    function EventDescriptor(name, callback) {
        this.name = name;
        if (callback === true) {
            this.callback = getBubblingHandler(name);
        }
        else if (typeof callback === 'string') {
            this.callback =
                function localCallback() {
                    var handler = this[callback];
                    handler && handler.apply(this, arguments);
                };
        }
        else {
            this.callback = callback;
        }
    }
    return EventDescriptor;
}());
exports.EventDescriptor = EventDescriptor;
var _bubblingHandlers = {};
function getBubblingHandler(event) {
    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c, d, e) {
        if (d !== void 0 || e !== void 0)
            trigger5(this, event, a, b, c, d, e);
        if (c !== void 0)
            trigger3(this, event, a, b, c);
        else
            trigger2(this, event, a, b);
    });
}
var EventHandler = (function () {
    function EventHandler(callback, context, next) {
        if (next === void 0) { next = null; }
        this.callback = callback;
        this.context = context;
        this.next = next;
    }
    return EventHandler;
}());
exports.EventHandler = EventHandler;
function listOff(_events, name, callback, context) {
    var head = _events[name];
    var filteredHead, prev;
    for (var ev = head; ev; ev = ev.next) {
        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
            (context && context !== ev.context)) {
            prev = ev;
            filteredHead || (filteredHead = ev);
        }
        else {
            if (prev)
                prev.next = ev.next;
        }
    }
    if (head !== filteredHead)
        _events[name] = filteredHead;
}
function listSend2(head, a, b) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b);
}
function listSend3(head, a, b, c) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c);
}
function listSend4(head, a, b, c, d) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d);
}
function listSend5(head, a, b, c, d, e) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d, e);
}
function listSend6(head, a, b, c, d, e, f) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d, e, f);
}
function on(source, name, callback, context) {
    if (callback) {
        var _events = source._events || (source._events = Object.create(null));
        _events[name] = new EventHandler(callback, context, _events[name]);
    }
}
exports.on = on;
function once(source, name, callback, context) {
    if (callback) {
        var once_1 = tools_1.once(function () {
            off(source, name, once_1);
            callback.apply(this, arguments);
        });
        once_1._callback = callback;
        on(source, name, once_1, context);
    }
}
exports.once = once;
function off(source, name, callback, context) {
    var _events = source._events;
    if (_events) {
        if (callback || context) {
            if (name) {
                listOff(_events, name, callback, context);
            }
            else {
                for (var name_3 in _events) {
                    listOff(_events, name_3, callback, context);
                }
            }
        }
        else if (name) {
            _events[name] = void 0;
        }
        else {
            source._events = void 0;
        }
    }
}
exports.off = off;
var eventSplitter = /\s+/;
function strings(api, source, events, callback, context) {
    if (eventSplitter.test(events)) {
        var names = events.split(eventSplitter);
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_4 = names_1[_i];
            api(source, name_4, callback, context);
        }
    }
    else
        api(source, events, callback, context);
}
exports.strings = strings;
function trigger2(self, name, a, b) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend2(queue, a, b);
        listSend3(all, name, a, b);
    }
}
exports.trigger2 = trigger2;
;
function trigger3(self, name, a, b, c) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend3(queue, a, b, c);
        listSend4(all, name, a, b, c);
    }
}
exports.trigger3 = trigger3;
;
function trigger5(self, name, a, b, c, d, e) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend5(queue, a, b, c, d, e);
        listSend6(all, name, a, b, c, d, e);
    }
}
exports.trigger5 = trigger5;
;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = __webpack_require__(5);
var Mixable = (function () {
    function Mixable() {
        this.initialize.apply(this, arguments);
    }
    Mixable.prototype.initialize = function () { };
    Mixable.create = function (a, b) {
        return new this(a, b);
    };
    Mixable.mixins = function () {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i] = arguments[_i];
        }
        var proto = this.prototype, mergeRules = this._mixinRules || {}, _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();
        for (var _a = 0, mixins_1 = mixins; _a < mixins_1.length; _a++) {
            var mixin = mixins_1[_a];
            if (mixin instanceof Array) {
                return Mixable.mixins.apply(this, mixin);
            }
            if (_appliedMixins.indexOf(mixin) >= 0)
                continue;
            _appliedMixins.push(mixin);
            if (typeof mixin === 'function') {
                tools_1.defaults(this, mixin);
                mergeProps(proto, mixin.prototype, mergeRules);
            }
            else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };
    Mixable.mixTo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var Ctor = args_1[_a];
            Mixable.mixins.call(Ctor, this);
        }
        return this;
    };
    Mixable.mixinRules = function (mixinRules) {
        var Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(mixinRules, Base._mixinRules);
        }
        this._mixinRules = mixinRules;
        return this;
    };
    Mixable.define = function (definition, staticProps) {
        if (definition === void 0) { definition = {}; }
        if (!this.define) {
            tools_1.log.error("[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
            return this;
        }
        this.predefine();
        var proto = this.prototype;
        var protoProps = tools_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
        tools_1.assign(proto, protoProps);
        tools_1.assign(this, staticProps);
        properties && Object.defineProperties(proto, tools_1.transform({}, properties, toPropertyDescriptor));
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };
    Mixable.extend = function (spec, statics) {
        var Subclass;
        if (spec && spec.hasOwnProperty('constructor')) {
            Subclass = spec.constructor;
            __extends(Subclass, this);
        }
        else {
            Subclass = (function (_super) {
                __extends(_Subclass, _super);
                function _Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _Subclass;
            }(this));
        }
        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
    };
    Mixable.predefine = function () {
        var BaseClass = tools_1.getBaseClass(this);
        if (BaseClass.create === this.create) {
            this.create = Mixable.create;
        }
        this.__super__ = BaseClass.prototype;
        return this;
    };
    return Mixable;
}());
Mixable._mixinRules = { properties: 'merge' };
exports.Mixable = Mixable;
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x } : x;
    }
}
function mixinRules(rules) {
    return createDecorator('mixinRules', rules);
}
exports.mixinRules = mixinRules;
function mixins() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    return createDecorator('mixins', list);
}
exports.mixins = mixins;
function extendable(Type) {
    Mixable.mixTo(Type);
}
exports.extendable = extendable;
function predefine(Constructor) {
    Constructor.predefine();
}
exports.predefine = predefine;
function define(spec) {
    if (typeof spec === 'function') {
        spec.define({});
    }
    else {
        return createDecorator('define', spec);
    }
}
exports.define = define;
function createDecorator(name, spec) {
    return function (Ctor) {
        if (Ctor[name]) {
            Ctor[name](spec);
        }
        else {
            Mixable[name].call(Ctor, spec);
        }
    };
}
function mergeObjects(a, b, rules) {
    var x = tools_1.assign({}, a);
    return mergeProps(x, b, rules);
}
var mergeFunctions = {
    pipe: function (a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    },
    mergeSequence: function (a, b) {
        return function () {
            return tools_1.defaults(a.call(this), b.call(this));
        };
    },
    overwrite: function (a, b) {
        return b;
    },
    sequence: function (a, b) {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    },
    reverse: function (a, b) {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    },
    every: function (a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some: function (a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
function mergeProps(target, source, rules) {
    if (rules === void 0) { rules = {}; }
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        if (name_1 === 'constructor')
            continue;
        var sourceProp = Object.getOwnPropertyDescriptor(source, name_1), destProp = tools_1.getPropertyDescriptor(target, name_1), value = destProp && destProp.value;
        if (value != null) {
            var rule = rules[name_1];
            if (rule) {
                target[name_1] = typeof rule === 'object' ?
                    mergeObjects(value, sourceProp.value, rule) : (rule === 'merge' ?
                    mergeObjects(value, sourceProp.value) :
                    mergeFunctions[rule](value, sourceProp.value));
            }
        }
        else {
            Object.defineProperty(target, name_1, sourceProp);
        }
    }
    return target;
}
exports.mergeProps = mergeProps;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(21));
__export(__webpack_require__(20));
__export(__webpack_require__(19));
__export(__webpack_require__(22));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_plus_1 = __webpack_require__(0);
var transactions_1 = __webpack_require__(1);
var trigger3 = object_plus_1.eventsApi.trigger3, assign = object_plus_1.tools.assign, isEmpty = object_plus_1.tools.isEmpty, log = object_plus_1.tools.log, free = transactions_1.transactionApi.free, aquire = transactions_1.transactionApi.aquire, commit = transactions_1.transactionApi.commit, _begin = transactions_1.transactionApi.begin, _markAsDirty = transactions_1.transactionApi.markAsDirty;
var _cidCounter = 0;
var Record = Record_1 = (function (_super) {
    __extends(Record, _super);
    function Record(a_values, a_options) {
        var _this = _super.call(this, _cidCounter++) || this;
        _this.attributes = {};
        var options = a_options || {}, values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
        var attributes = options.clone ? cloneAttributes(_this, values) : _this.defaults(values);
        _this.forEachAttr(attributes, function (value, key, attr) {
            var next = attributes[key] = attr.transform(value, options, void 0, _this);
            attr.handleChange(next, void 0, _this);
        });
        _this.attributes = _this._previousAttributes = attributes;
        _this.initialize(a_values, a_options);
        if (_this._localEvents)
            _this._localEvents.subscribe(_this, _this);
        return _this;
    }
    Record.define = function (protoProps, staticProps) {
        return transactions_1.Transactional.define(protoProps, staticProps);
    };
    Record.defaults = function (attrs) {
        return this.extend({ attributes: attrs });
    };
    Record.prototype.previousAttributes = function () { return new this.Attributes(this._previousAttributes); };
    Object.defineProperty(Record.prototype, "__inner_state__", {
        get: function () { return this.attributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "changed", {
        get: function () {
            var changed = this._changedAttributes;
            if (!changed) {
                var prev = this._previousAttributes;
                changed = {};
                var _a = this, _attributes = _a._attributes, attributes = _a.attributes;
                for (var _i = 0, _b = this._keys; _i < _b.length; _i++) {
                    var key = _b[_i];
                    var value = attributes[key];
                    if (_attributes[key].isChanged(value, prev[key])) {
                        changed[key] = value;
                    }
                }
                this._changedAttributes = changed;
            }
            return changed;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.changedAttributes = function (diff) {
        if (!diff)
            return this.hasChanged() ? assign({}, this.changed) : false;
        var val, changed = false, old = this._transaction ? this._previousAttributes : this.attributes, attrSpecs = this._attributes;
        for (var attr in diff) {
            if (!attrSpecs[attr].isChanged(old[attr], (val = diff[attr])))
                continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };
    Record.prototype.hasChanged = function (key) {
        var _previousAttributes = this._previousAttributes;
        if (!_previousAttributes)
            return false;
        return key ?
            this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) :
            !isEmpty(this.changed);
    };
    Record.prototype.previous = function (key) {
        if (key) {
            var _previousAttributes = this._previousAttributes;
            if (_previousAttributes)
                return _previousAttributes[key];
        }
        return null;
    };
    Record.prototype.isNew = function () {
        return this.id == null;
    };
    Record.prototype.has = function (key) {
        return this[key] != void 0;
    };
    Record.prototype.unset = function (key, options) {
        this.set(key, void 0, options);
        return this;
    };
    Record.prototype.clear = function (options) {
        var _this = this;
        var nullify = options && options.nullify;
        this.transaction(function () {
            _this.forEachAttr(_this.attributes, function (value, key) { return _this[key] = nullify ? null : void 0; });
        }, options);
        return this;
    };
    Record.prototype.getOwner = function () {
        var owner = this._owner;
        return this._ownerKey ? owner : owner && owner._owner;
    };
    Object.defineProperty(Record.prototype, "id", {
        get: function () { return this.attributes[this.idAttribute]; },
        set: function (x) { setAttribute(this, this.idAttribute, x); },
        enumerable: true,
        configurable: true
    });
    Record.prototype.Attributes = function (x) { this.id = x.id; };
    Record.prototype.forEachAttr = function (attrs, iteratee) {
        var _attributes = this._attributes;
        var unknown;
        for (var name_1 in attrs) {
            var spec = _attributes[name_1];
            if (spec) {
                iteratee(attrs[name_1], name_1, spec);
            }
            else {
                unknown || (unknown = []);
                unknown.push("'" + name_1 + "'");
            }
        }
        if (unknown) {
            this._log('warn', "attributes " + unknown.join(', ') + " are not defined", attrs);
        }
    };
    Record.prototype.each = function (iteratee, context) {
        var fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, attributes = this.attributes;
        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var value = attributes[key];
            if (value !== void 0)
                fun(value, key);
        }
    };
    Record.prototype.keys = function () {
        var keys = [], attributes = this.attributes;
        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
            var key = _a[_i];
            attributes[key] === void 0 || keys.push(key);
        }
        return keys;
    };
    Record.prototype.values = function () {
        return this.map(function (value) { return value; });
    };
    Record.prototype._toJSON = function () { return {}; };
    Record.prototype._parse = function (data) { return data; };
    Record.prototype.defaults = function (values) { return {}; };
    Record.prototype.initialize = function (values, options) { };
    Record.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var copy = new this.constructor(this.attributes, { clone: true });
        if (options.pinStore)
            copy._defaultStore = this.getStore();
        return copy;
    };
    Record.prototype.deepClone = function () { return this.clone(); };
    ;
    Record.prototype._validateNested = function (errors) {
        var _this = this;
        var length = 0;
        this.forEachAttr(this.attributes, function (value, name, attribute) {
            var error = attribute.validate(_this, value, name);
            if (error) {
                errors[name] = error;
                length++;
            }
        });
        return length;
    };
    Record.prototype.get = function (key) {
        return this[key];
    };
    Record.prototype.toJSON = function () {
        var _this = this;
        var json = {};
        this.forEachAttr(this.attributes, function (value, key, _a) {
            var toJSON = _a.toJSON;
            if (value !== void 0) {
                var asJson = toJSON.call(_this, value, key);
                if (asJson !== void 0)
                    json[key] = asJson;
            }
        });
        return json;
    };
    Record.prototype.parse = function (data, options) {
        return this._parse(data);
    };
    Record.prototype.set = function (a, b, c) {
        if (typeof a === 'string') {
            if (c) {
                return _super.prototype.set.call(this, (_a = {}, _a[a] = b, _a), c);
            }
            else {
                setAttribute(this, a, b);
                return this;
            }
        }
        else {
            return _super.prototype.set.call(this, a, b);
        }
        var _a;
    };
    Record.prototype.deepSet = function (name, value, options) {
        var _this = this;
        this.transaction(function () {
            var path = name.split('.'), l = path.length - 1, attr = path[l];
            var model = _this;
            for (var i = 0; i < l; i++) {
                var key = path[i];
                var next = model.get ? model.get(key) : model[key];
                if (!next) {
                    var attrSpecs = model._attributes;
                    if (attrSpecs) {
                        var newModel = attrSpecs[key].create();
                        if (options && options.nullify && newModel._attributes) {
                            newModel.clear(options);
                        }
                        model[key] = next = newModel;
                    }
                    else
                        return;
                }
                model = next;
            }
            if (model.set) {
                model.set(attr, value, options);
            }
            else {
                model[attr] = value;
            }
        });
        return this;
    };
    Record.prototype.transaction = function (fun, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin(this);
        fun.call(this, this);
        isRoot && commit(this);
    };
    Record.prototype._createTransaction = function (a_values, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var isRoot = begin(this), changes = [], nested = [], attributes = this.attributes, values = options.parse ? this.parse(a_values, options) : a_values;
        if (values && values.constructor === Object) {
            this.forEachAttr(values, function (value, key, attr) {
                var prev = attributes[key];
                var update;
                if (update = attr.canBeUpdated(prev, value, options)) {
                    var nestedTransaction = prev._createTransaction(update, options);
                    if (nestedTransaction) {
                        nested.push(nestedTransaction);
                        if (attr.propagateChanges)
                            changes.push(key);
                    }
                    return;
                }
                var next = attr.transform(value, options, prev, _this);
                attributes[key] = next;
                if (attr.isChanged(next, prev)) {
                    changes.push(key);
                    attr.handleChange(next, prev, _this);
                }
            });
        }
        else {
            this._log('error', 'incompatible argument type', values);
        }
        if (changes.length && markAsDirty(this, options)) {
            return new RecordTransaction(this, isRoot, nested, changes);
        }
        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
            var pendingTransaction = nested_1[_i];
            pendingTransaction.commit(this);
        }
        isRoot && commit(this);
    };
    Record.prototype._onChildrenChange = function (child, options) {
        var _ownerKey = child._ownerKey, attribute = this._attributes[_ownerKey];
        if (!attribute || attribute.propagateChanges)
            this.forceAttributeChange(_ownerKey, options);
    };
    Record.prototype.forceAttributeChange = function (key, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin(this);
        if (markAsDirty(this, options)) {
            trigger3(this, 'change:' + key, this, this.attributes[key], options);
        }
        isRoot && commit(this);
    };
    Object.defineProperty(Record.prototype, "collection", {
        get: function () {
            return this._ownerKey ? null : this._owner;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.dispose = function () {
        var _this = this;
        if (this._disposed)
            return;
        this.forEachAttr(this.attributes, function (value, key, attribute) {
            attribute.dispose(_this, value);
        });
        _super.prototype.dispose.call(this);
    };
    Record.prototype._log = function (level, text, value) {
        object_plus_1.tools.log[level]("[Model Update] " + this.getClassName() + ": " + text, value, 'Attributes spec:', this._attributes);
    };
    Record.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) || 'Model';
    };
    return Record;
}(transactions_1.Transactional));
Record = Record_1 = __decorate([
    object_plus_1.define({
        cidPrefix: 'm',
        _changeEventName: 'change',
        idAttribute: 'id',
        _keys: ['id']
    })
], Record);
exports.Record = Record;
;
function begin(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.Attributes(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
function markAsDirty(record, options) {
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
function cloneAttributes(record, a_attributes) {
    var attributes = new record.Attributes(a_attributes);
    record.forEachAttr(attributes, function (value, name, attr) {
        attributes[name] = attr.clone(value, record);
    });
    return attributes;
}
function setAttribute(record, name, value) {
    var isRoot = begin(record), options = {}, attributes = record.attributes, spec = record._attributes[name], prev = attributes[name];
    var update;
    if (update = spec.canBeUpdated(prev, value, options)) {
        var nestedTransaction = prev._createTransaction(update, options);
        if (nestedTransaction) {
            nestedTransaction.commit(record);
            if (spec.propagateChanges) {
                markAsDirty(record, options);
                trigger3(record, 'change:' + name, record, prev, options);
            }
        }
    }
    else {
        var next = spec.transform(value, options, prev, record);
        attributes[name] = next;
        if (spec.isChanged(next, prev)) {
            spec.handleChange(next, prev, record);
            markAsDirty(record, options);
            trigger3(record, 'change:' + name, record, next, options);
        }
    }
    isRoot && commit(record);
}
exports.setAttribute = setAttribute;
var RecordTransaction = (function () {
    function RecordTransaction(object, isRoot, nested, changes) {
        this.object = object;
        this.isRoot = isRoot;
        this.nested = nested;
        this.changes = changes;
    }
    RecordTransaction.prototype.commit = function (initiator) {
        var _a = this, nested = _a.nested, object = _a.object, changes = _a.changes;
        for (var _i = 0, nested_2 = nested; _i < nested_2.length; _i++) {
            var transaction = nested_2[_i];
            transaction.commit(object);
        }
        var attributes = object.attributes, _isDirty = object._isDirty;
        for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
            var key = changes_1[_b];
            trigger3(object, 'change:' + key, object, attributes[key], _isDirty);
        }
        this.isRoot && commit(object, initiator);
    };
    return RecordTransaction;
}());
var Record_1;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var referenceMask = /\^|([^.]+)/g;
var CompiledReference = (function () {
    function CompiledReference(reference, splitTail) {
        if (splitTail === void 0) { splitTail = false; }
        var path = reference
            .match(referenceMask)
            .map(function (key) {
            if (key === '^')
                return 'getOwner()';
            if (key[0] === '~')
                return "getStore().get(\"" + key.substr(1) + "\")";
            return key;
        });
        this.tail = splitTail && path.pop();
        this.local = !path.length;
        path.unshift('self');
        this.resolve = new Function('self', "return " + path.join('.') + ";");
    }
    return CompiledReference;
}());
exports.CompiledReference = CompiledReference;
function resolveReference(root, reference, action) {
    var path = reference.match(referenceMask), skip = path.length - 1;
    var self = root;
    for (var i = 0; i < skip; i++) {
        var key = path[i];
        switch (key) {
            case '~':
                self = self.getStore();
                break;
            case '^':
                self = self.getOwner();
                break;
            default: self = self.get(key);
        }
        if (!self)
            return;
    }
    return action(self, path[skip]);
}
exports.resolveReference = resolveReference;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_plus_1 = __webpack_require__(0);
var transactions_1 = __webpack_require__(1);
var record_1 = __webpack_require__(2);
var commons_1 = __webpack_require__(4);
var add_1 = __webpack_require__(15);
var set_1 = __webpack_require__(17);
var remove_1 = __webpack_require__(16);
var trigger2 = object_plus_1.eventsApi.trigger2, on = object_plus_1.eventsApi.on, off = object_plus_1.eventsApi.off, begin = transactions_1.transactionApi.begin, commit = transactions_1.transactionApi.commit, markAsDirty = transactions_1.transactionApi.markAsDirty, omit = object_plus_1.tools.omit, log = object_plus_1.tools.log, assign = object_plus_1.tools.assign, defaults = object_plus_1.tools.defaults;
var _count = 0;
var silentOptions = { silent: true };
var slice = Array.prototype.slice;
var Collection = Collection_1 = (function (_super) {
    __extends(Collection, _super);
    function Collection(records, options, shared) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, _count++) || this;
        _this.models = [];
        _this._byId = {};
        _this.comparator = _this.comparator;
        if (options.comparator !== void 0) {
            _this.comparator = options.comparator;
            options.comparator = void 0;
        }
        _this.model = _this.model;
        if (options.model) {
            _this.model = options.model;
            options.model = void 0;
        }
        _this.idAttribute = _this.model.prototype.idAttribute;
        _this._shared = shared || 0;
        if (records) {
            var elements = toElements(_this, records, options);
            set_1.emptySetTransaction(_this, elements, options, true);
        }
        _this.initialize.apply(_this, arguments);
        if (_this._localEvents)
            _this._localEvents.subscribe(_this, _this);
        return _this;
    }
    Collection.prototype.createSubset = function (models, options) {
        var SubsetOf = this.constructor.subsetOf(this).options.type, subset = new SubsetOf(models, options);
        subset.resolve(this);
        return subset;
    };
    Collection.predefine = function () {
        var Ctor = this;
        this._SubsetOf = null;
        function RefsCollection(a, b, listen) {
            Ctor.call(this, a, b, transactions_1.ItemsBehavior.share | (listen ? transactions_1.ItemsBehavior.listen : 0));
        }
        object_plus_1.Mixable.mixTo(RefsCollection);
        RefsCollection.prototype = this.prototype;
        RefsCollection._attribute = CollectionRefsType;
        this.Refs = this.Subset = RefsCollection;
        transactions_1.Transactional.predefine.call(this);
        record_1.createSharedTypeSpec(this, record_1.SharedType);
        return this;
    };
    Collection.define = function (protoProps, staticProps) {
        if (protoProps === void 0) { protoProps = {}; }
        var staticsDefinition = object_plus_1.tools.getChangedStatics(this, 'comparator', 'model', 'itemEvents'), definition = assign(staticsDefinition, protoProps);
        var spec = omit(definition, 'itemEvents');
        if (definition.itemEvents) {
            var eventsMap = new object_plus_1.EventMap(this.prototype._itemEvents);
            eventsMap.addEventsMap(definition.itemEvents);
            spec._itemEvents = eventsMap;
        }
        return transactions_1.Transactional.define.call(this, spec, staticProps);
    };
    Object.defineProperty(Collection.prototype, "__inner_state__", {
        get: function () { return this.models; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "comparator", {
        get: function () { return this._comparator; },
        set: function (x) {
            var _this = this;
            var compare;
            switch (typeof x) {
                case 'string':
                    this._comparator = function (a, b) {
                        var aa = a[x], bb = b[x];
                        if (aa === bb)
                            return 0;
                        return aa < bb ? -1 : +1;
                    };
                    break;
                case 'function':
                    if (x.length === 1) {
                        this._comparator = function (a, b) {
                            var aa = x.call(_this, a), bb = x.call(_this, b);
                            if (aa === bb)
                                return 0;
                            return aa < bb ? -1 : +1;
                        };
                    }
                    else {
                        this._comparator = function (a, b) { return x.call(_this, a, b); };
                    }
                    break;
                default:
                    this._comparator = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.getStore = function () {
        return this._store || (this._store = this._owner ? this._owner.getStore() : this._defaultStore);
    };
    Collection.prototype._onChildrenChange = function (record, options, initiator) {
        if (options === void 0) { options = {}; }
        if (initiator === this)
            return;
        var idAttribute = this.idAttribute;
        if (record.hasChanged(idAttribute)) {
            commons_1.updateIndex(this._byId, record);
        }
        var isRoot = begin(this);
        if (markAsDirty(this, options)) {
            trigger2(this, 'change', record, options);
        }
        isRoot && commit(this);
    };
    Collection.prototype.get = function (objOrId) {
        if (objOrId == null)
            return;
        if (typeof objOrId === 'object') {
            var id = objOrId[this.idAttribute];
            return (id !== void 0 && this._byId[id]) || this._byId[objOrId.cid];
        }
        else {
            return this._byId[objOrId];
        }
    };
    Collection.prototype.each = function (iteratee, context) {
        var fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, models = this.models;
        for (var i = 0; i < models.length; i++) {
            fun(models[i], i);
        }
    };
    Collection.prototype.map = function (iteratee, context) {
        var fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, models = this.models, mapped = Array(models.length);
        var j = 0;
        for (var i = 0; i < models.length; i++) {
            var x = fun(models[i], i);
            x === void 0 || (mapped[j++] = x);
        }
        mapped.length = j;
        return mapped;
    };
    Collection.prototype._validateNested = function (errors) {
        if (this._shared)
            return 0;
        var count = 0;
        this.each(function (record) {
            var error = record.validationError;
            if (error) {
                errors[record.cid] = error;
                count++;
            }
        });
        return count;
    };
    Collection.prototype.initialize = function () { };
    Object.defineProperty(Collection.prototype, "length", {
        get: function () { return this.models.length; },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.first = function () { return this.models[0]; };
    Collection.prototype.last = function () { return this.models[this.models.length - 1]; };
    Collection.prototype.at = function (a_index) {
        var index = a_index < 0 ? a_index + this.models.length : a_index;
        return this.models[index];
    };
    Collection.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var models = this._shared & transactions_1.ItemsBehavior.share ? this.models : this.map(function (model) { return model.clone(); }), copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
        if (options.pinStore)
            copy._defaultStore = this.getStore();
        return copy;
    };
    Collection.prototype.toJSON = function () {
        return this.models.map(function (model) { return model.toJSON(); });
    };
    Collection.prototype.set = function (elements, options) {
        if (elements === void 0) { elements = []; }
        if (options === void 0) { options = {}; }
        if (options.add !== void 0) {
            this._log('warn', "Collection.set doesn't support 'add' option, behaving as if options.add === true.", options);
        }
        if (options.reset) {
            this.reset(elements, options);
        }
        else {
            var transaction = this._createTransaction(elements, options);
            transaction && transaction.commit();
        }
        return this;
    };
    Collection.prototype.dispose = function () {
        if (this._disposed)
            return;
        var aggregated = !this._shared;
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var record = _a[_i];
            commons_1.free(this, record);
            if (aggregated)
                record.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    Collection.prototype.reset = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin(this), previousModels = commons_1.dispose(this);
        if (a_elements) {
            set_1.emptySetTransaction(this, toElements(this, a_elements, options), options, true);
        }
        markAsDirty(this, options);
        options.silent || trigger2(this, 'reset', this, defaults({ previousModels: previousModels }, options));
        isRoot && commit(this);
        return this.models;
    };
    Collection.prototype.add = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var elements = toElements(this, a_elements, options), transaction = this.models.length ?
            add_1.addTransaction(this, elements, options) :
            set_1.emptySetTransaction(this, elements, options);
        if (transaction) {
            transaction.commit();
            return transaction.added;
        }
    };
    Collection.prototype.remove = function (recordsOrIds, options) {
        if (options === void 0) { options = {}; }
        if (recordsOrIds) {
            return Array.isArray(recordsOrIds) ?
                remove_1.removeMany(this, recordsOrIds, options) :
                remove_1.removeOne(this, recordsOrIds, options);
        }
        return [];
    };
    Collection.prototype._createTransaction = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var elements = toElements(this, a_elements, options);
        if (this.models.length) {
            return options.remove === false ?
                add_1.addTransaction(this, elements, options, true) :
                set_1.setTransaction(this, elements, options);
        }
        else {
            return set_1.emptySetTransaction(this, elements, options);
        }
    };
    Collection.prototype.pluck = function (key) {
        return this.models.map(function (model) { return model[key]; });
    };
    Collection.prototype.sort = function (options) {
        if (options === void 0) { options = {}; }
        if (commons_1.sortElements(this, options)) {
            var isRoot = begin(this);
            if (markAsDirty(this, options)) {
                trigger2(this, 'sort', this, options);
            }
            isRoot && commit(this);
        }
        return this;
    };
    Collection.prototype.push = function (model, options) {
        return this.add(model, assign({ at: this.length }, options));
    };
    Collection.prototype.pop = function (options) {
        var model = this.at(this.length - 1);
        this.remove(model, options);
        return model;
    };
    Collection.prototype.unshift = function (model, options) {
        return this.add(model, assign({ at: 0 }, options));
    };
    Collection.prototype.shift = function (options) {
        var model = this.at(0);
        this.remove(model, options);
        return model;
    };
    Collection.prototype.slice = function () {
        return slice.apply(this.models, arguments);
    };
    Collection.prototype.indexOf = function (modelOrId) {
        var record = this.get(modelOrId);
        return this.models.indexOf(record);
    };
    Collection.prototype.modelId = function (attrs) {
        return attrs[this.model.prototype.idAttribute];
    };
    Collection.prototype.toggle = function (model, a_next) {
        var prev = Boolean(this.get(model)), next = a_next === void 0 ? !prev : Boolean(a_next);
        if (prev !== next) {
            if (prev) {
                this.remove(model);
            }
            else {
                this.add(model);
            }
        }
        return next;
    };
    Collection.prototype._log = function (level, text, value) {
        object_plus_1.tools.log[level]("[Collection Update] " + this.model.prototype.getClassName() + "." + this.getClassName() + ": " + text, value, 'Attributes spec:', this.model.prototype._attributes);
    };
    Collection.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) || 'Collection';
    };
    return Collection;
}(transactions_1.Transactional));
Collection._attribute = record_1.AggregatedType;
Collection = Collection_1 = __decorate([
    object_plus_1.define({
        cidPrefix: 'c',
        model: record_1.Record,
        _changeEventName: 'changes',
        _aggregationError: null
    })
], Collection);
exports.Collection = Collection;
function toElements(collection, elements, options) {
    var parsed = options.parse ? collection.parse(elements, options) : elements;
    return Array.isArray(parsed) ? parsed : [parsed];
}
var CollectionRefsType = (function (_super) {
    __extends(CollectionRefsType, _super);
    function CollectionRefsType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CollectionRefsType;
}(record_1.SharedType));
CollectionRefsType.defaultValue = [];
record_1.createSharedTypeSpec(Collection, record_1.SharedType);
record_1.Record.Collection = Collection;
var Collection_1;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = __webpack_require__(1);
var object_plus_1 = __webpack_require__(0);
var assign = object_plus_1.tools.assign;
var ChainableAttributeSpec = (function () {
    function ChainableAttributeSpec(options) {
        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        if (options)
            assign(this.options, options);
    }
    ChainableAttributeSpec.prototype.check = function (check, error) {
        function validate(model, value, name) {
            if (!check.call(model, value, name)) {
                var msg = error || check.error || name + ' is not valid';
                return typeof msg === 'function' ? msg.call(model, name) : msg;
            }
        }
        var prev = this.options.validate;
        return this.metadata({
            validate: prev ? (function (model, value, name) {
                return prev(model, value, name) || validate(model, value, name);
            }) : validate
        });
    };
    Object.defineProperty(ChainableAttributeSpec.prototype, "isRequired", {
        get: function () {
            return this.metadata({ isRequired: true });
        },
        enumerable: true,
        configurable: true
    });
    ChainableAttributeSpec.prototype.watcher = function (ref) {
        return this.metadata({ _onChange: ref });
    };
    ChainableAttributeSpec.prototype.parse = function (fun) {
        return this.metadata({ parse: fun });
    };
    ChainableAttributeSpec.prototype.toJSON = function (fun) {
        return this.metadata({
            toJSON: typeof fun === 'function' ? fun : (fun ? function (x) { return x && x.toJSON(); } : emptyFunction)
        });
    };
    ChainableAttributeSpec.prototype.get = function (fun) {
        return this.metadata({
            getHooks: this.options.getHooks.concat(fun)
        });
    };
    ChainableAttributeSpec.prototype.set = function (fun) {
        function handleSetHook(next, options, prev, model) {
            if (this.isChanged(next, prev)) {
                var changed = fun.call(model, next, this.name);
                return changed === void 0 ? prev : this.convert(changed, options, prev, model);
            }
            return prev;
        }
        return this.metadata({
            transforms: this.options.transforms.concat(handleSetHook)
        });
    };
    ChainableAttributeSpec.prototype.changeEvents = function (events) {
        return this.metadata({ changeEvents: events });
    };
    ChainableAttributeSpec.prototype.events = function (map) {
        var eventMap = new object_plus_1.EventMap(map);
        function handleEventsSubscribtion(next, prev, record) {
            prev && prev.trigger && eventMap.unsubscribe(record, prev);
            next && next.trigger && eventMap.subscribe(record, next);
        }
        return this.metadata({
            changeHandlers: this.options.changeHandlers.concat(handleEventsSubscribtion)
        });
    };
    Object.defineProperty(ChainableAttributeSpec.prototype, "has", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    ChainableAttributeSpec.prototype.metadata = function (options) {
        var cloned = new ChainableAttributeSpec(this.options);
        assign(cloned.options, options);
        return cloned;
    };
    ChainableAttributeSpec.prototype.value = function (x) {
        return this.metadata({ value: x });
    };
    return ChainableAttributeSpec;
}());
exports.ChainableAttributeSpec = ChainableAttributeSpec;
function emptyFunction() { }
Function.prototype.value = function (x) {
    return new ChainableAttributeSpec({ type: this, value: x });
};
Object.defineProperty(Function.prototype, 'isRequired', {
    get: function () { return this._isRequired || this.has.isRequired; },
    set: function (x) { this._isRequired = x; }
});
Object.defineProperty(Function.prototype, 'has', {
    get: function () {
        return this._has || new ChainableAttributeSpec({ type: this, value: this._attribute.defaultValue });
    },
    set: function (value) { this._has = value; }
});
function toAttributeDescriptor(spec) {
    var attrSpec;
    if (typeof spec === 'function') {
        attrSpec = spec.has;
    }
    else if (spec && spec instanceof ChainableAttributeSpec) {
        attrSpec = spec;
    }
    else {
        var type = inferType(spec);
        if (type && type.prototype instanceof transactions_1.Transactional) {
            attrSpec = type.shared.value(spec);
        }
        else {
            attrSpec = new ChainableAttributeSpec({ type: type, value: spec });
        }
    }
    return attrSpec.options;
}
exports.toAttributeDescriptor = toAttributeDescriptor;
function inferType(value) {
    switch (typeof value) {
        case 'number':
            return Number;
        case 'string':
            return String;
        case 'boolean':
            return Boolean;
        case 'undefined':
            return void 0;
        case 'object':
            return value ? value.constructor : void 0;
    }
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var traversable_1 = __webpack_require__(10);
function parseReference(collectionRef) {
    switch (typeof collectionRef) {
        case 'function':
            return function (root) { return collectionRef.call(root); };
        case 'object':
            return function () { return collectionRef; };
        case 'string':
            var resolve = new traversable_1.CompiledReference(collectionRef).resolve;
            return resolve;
    }
}
exports.parseReference = parseReference;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(24);
__webpack_require__(26);
var store_1 = __webpack_require__(25);
exports.Store = store_1.Store;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = __webpack_require__(1);
var commons_1 = __webpack_require__(4);
var begin = transactions_1.transactionApi.begin, commit = transactions_1.transactionApi.commit, markAsDirty = transactions_1.transactionApi.markAsDirty;
function addTransaction(collection, items, options, merge) {
    var isRoot = begin(collection), nested = [];
    var added = appendElements(collection, items, nested, options, merge);
    if (added.length || nested.length) {
        var needSort = sortOrMoveElements(collection, added, options);
        if (markAsDirty(collection, options)) {
            return new commons_1.CollectionTransaction(collection, isRoot, added, [], nested, needSort);
        }
        if (collection._aggregationError)
            commons_1.logAggregationError(collection);
    }
    isRoot && commit(collection);
}
exports.addTransaction = addTransaction;
;
function sortOrMoveElements(collection, added, options) {
    var at = options.at;
    if (at != null) {
        var length_1 = collection.models.length - added.length;
        at = Number(at);
        if (at < 0)
            at += length_1 + 1;
        if (at < 0)
            at = 0;
        if (at > length_1)
            at = length_1;
        moveElements(collection.models, at, added);
        return false;
    }
    return commons_1.sortElements(collection, options);
}
function moveElements(source, at, added) {
    for (var j = source.length - 1, i = j - added.length; i >= at; i--, j--) {
        source[j] = source[i];
    }
    for (i = 0, j = at; i < added.length; i++, j++) {
        source[j] = added[i];
    }
}
function appendElements(collection, a_items, nested, a_options, forceMerge) {
    var _byId = collection._byId, models = collection.models, merge = (forceMerge || a_options.merge) && !collection._shared, parse = a_options.parse, idAttribute = collection.model.prototype.idAttribute, prevLength = models.length;
    for (var _i = 0, a_items_1 = a_items; _i < a_items_1.length; _i++) {
        var item = a_items_1[_i];
        var model = item ? _byId[item[idAttribute]] || _byId[item.cid] : null;
        if (model) {
            if (merge && item !== model) {
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, a_options);
                transaction && nested.push(transaction);
                if (model.hasChanged(idAttribute)) {
                    commons_1.updateIndex(_byId, model);
                }
            }
        }
        else {
            model = commons_1.convertAndAquire(collection, item, a_options);
            models.push(model);
            commons_1.addIndex(_byId, model);
        }
    }
    return models.slice(prevLength);
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var commons_1 = __webpack_require__(4);
var object_plus_1 = __webpack_require__(0);
var transactions_1 = __webpack_require__(1);
var trigger2 = object_plus_1.eventsApi.trigger2, trigger3 = object_plus_1.eventsApi.trigger3, markAsDirty = transactions_1.transactionApi.markAsDirty, begin = transactions_1.transactionApi.begin, commit = transactions_1.transactionApi.commit;
function removeOne(collection, el, options) {
    var model = collection.get(el);
    if (model) {
        var isRoot = begin(collection), models = collection.models;
        models.splice(models.indexOf(model), 1);
        commons_1.removeIndex(collection._byId, model);
        var notify = markAsDirty(collection, options);
        if (notify) {
            trigger3(model, 'remove', model, collection, options);
            trigger3(collection, 'remove', model, collection, options);
        }
        commons_1.free(collection, model);
        notify && trigger2(collection, 'update', collection, options);
        isRoot && commit(collection);
        return model;
    }
}
exports.removeOne = removeOne;
;
function removeMany(collection, toRemove, options) {
    var removed = _removeFromIndex(collection, toRemove);
    if (removed.length) {
        var isRoot = begin(collection);
        _reallocate(collection, removed.length);
        if (markAsDirty(collection, options)) {
            var transaction = new commons_1.CollectionTransaction(collection, isRoot, [], removed, [], false);
            transaction.commit();
        }
        else {
            isRoot && commit(collection);
        }
    }
    return removed;
}
exports.removeMany = removeMany;
;
function _removeFromIndex(collection, toRemove) {
    var removed = Array(toRemove.length), _byId = collection._byId;
    for (var i = 0, j = 0; i < toRemove.length; i++) {
        var model = collection.get(toRemove[i]);
        if (model) {
            removed[j++] = model;
            commons_1.removeIndex(_byId, model);
            commons_1.free(collection, model);
        }
    }
    removed.length = j;
    return removed;
}
function _reallocate(collection, removed) {
    var prev = collection.models, models = collection.models = Array(prev.length - removed), _byId = collection._byId;
    for (var i = 0, j = 0; i < prev.length; i++) {
        var model = prev[i];
        if (_byId[model.cid]) {
            models[j++] = model;
        }
    }
    models.length = j;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = __webpack_require__(1);
var commons_1 = __webpack_require__(4);
var begin = transactions_1.transactionApi.begin, commit = transactions_1.transactionApi.commit, markAsDirty = transactions_1.transactionApi.markAsDirty;
var silentOptions = { silent: true };
function emptySetTransaction(collection, items, options, silent) {
    var isRoot = begin(collection);
    var added = _reallocateEmpty(collection, items, options);
    if (added.length) {
        var needSort = commons_1.sortElements(collection, options);
        if (markAsDirty(collection, silent ? silentOptions : options)) {
            return new commons_1.CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
        }
        if (collection._aggregationError)
            commons_1.logAggregationError(collection);
    }
    isRoot && commit(collection);
}
exports.emptySetTransaction = emptySetTransaction;
;
function setTransaction(collection, items, options) {
    var isRoot = begin(collection), nested = [];
    var previous = collection.models, added = _reallocate(collection, items, nested, options);
    var reusedCount = collection.models.length - added.length, removed = reusedCount < previous.length ? (reusedCount ? _garbageCollect(collection, previous) :
        commons_1.freeAll(collection, previous)) : [];
    var addedOrChanged = nested.length || added.length, sorted = (commons_1.sortElements(collection, options) && addedOrChanged) || added.length || options.sorted;
    if (addedOrChanged || removed.length || sorted) {
        if (markAsDirty(collection, options)) {
            return new commons_1.CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
        }
        if (collection._aggregationError)
            commons_1.logAggregationError(collection);
    }
    isRoot && commit(collection);
}
exports.setTransaction = setTransaction;
;
function _garbageCollect(collection, previous) {
    var _byId = collection._byId, removed = [];
    for (var _i = 0, previous_1 = previous; _i < previous_1.length; _i++) {
        var record = previous_1[_i];
        if (!_byId[record.cid]) {
            removed.push(record);
            commons_1.free(collection, record);
        }
    }
    return removed;
}
function _reallocate(collection, source, nested, options) {
    var models = Array(source.length), _byId = {}, merge = (options.merge == null ? true : options.merge) && !collection._shared, _prevById = collection._byId, prevModels = collection.models, idAttribute = collection.model.prototype.idAttribute, toAdd = [], orderKept = true;
    for (var i = 0, j = 0; i < source.length; i++) {
        var item = source[i], model = null;
        if (item) {
            var id = item[idAttribute], cid = item.cid;
            if (_byId[id] || _byId[cid])
                continue;
            model = _prevById[id] || _prevById[cid];
        }
        if (model) {
            if (merge && item !== model) {
                if (orderKept && prevModels[j] !== model)
                    orderKept = false;
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, options);
                transaction && nested.push(transaction);
            }
        }
        else {
            model = commons_1.convertAndAquire(collection, item, options);
            toAdd.push(model);
        }
        models[j++] = model;
        commons_1.addIndex(_byId, model);
    }
    models.length = j;
    collection.models = models;
    collection._byId = _byId;
    if (!orderKept)
        options.sorted = true;
    return toAdd;
}
function _reallocateEmpty(self, source, options) {
    var len = source ? source.length : 0, models = Array(len), _byId = {}, idAttribute = self.model.prototype.idAttribute;
    for (var i = 0, j = 0; i < len; i++) {
        var src = source[i];
        if (src && (_byId[src[idAttribute]] || _byId[src.cid])) {
            continue;
        }
        var model = commons_1.convertAndAquire(self, src, options);
        models[j++] = model;
        commons_1.addIndex(_byId, model);
    }
    models.length = j;
    self._byId = _byId;
    return self.models = models;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mixins = __webpack_require__(7);
var tools_1 = __webpack_require__(5);
var eventsource_1 = __webpack_require__(6);
exports.EventMap = eventsource_1.EventMap;
var _eventsApi = __webpack_require__(6);
var mixins = Mixins.mixins, define = Mixins.define, extendable = Mixins.extendable, EventHandler = _eventsApi.EventHandler, strings = _eventsApi.strings, on = _eventsApi.on, off = _eventsApi.off, once = _eventsApi.once, trigger5 = _eventsApi.trigger5, trigger2 = _eventsApi.trigger2, trigger3 = _eventsApi.trigger3;
var eventSplitter = /\s+/;
var _idCount = 0;
function uniqueId() {
    return 'l' + _idCount++;
}
var Messenger = Messenger_1 = (function () {
    function Messenger() {
        this._events = void 0;
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }
    Messenger.prototype.initialize = function () { };
    Messenger.define = function (protoProps, staticProps) {
        var spec = tools_1.omit(protoProps || {}, 'localEvents');
        if (protoProps) {
            var localEvents = protoProps.localEvents, _localEvents = protoProps._localEvents;
            if (localEvents || _localEvents) {
                var eventsMap = new eventsource_1.EventMap(this.prototype._localEvents);
                localEvents && eventsMap.addEventsMap(localEvents);
                _localEvents && eventsMap.merge(_localEvents);
                spec._localEvents = eventsMap;
            }
        }
        return Mixins.Mixable.define.call(this, spec, staticProps);
    };
    Messenger.prototype.on = function (events, callback, context) {
        if (typeof events === 'string')
            strings(on, this, events, callback, context);
        else
            for (var name_1 in events)
                strings(on, this, name_1, events[name_1], context || callback);
        return this;
    };
    Messenger.prototype.once = function (events, callback, context) {
        if (typeof events === 'string')
            strings(once, this, events, callback, context);
        else
            for (var name_2 in events)
                strings(once, this, name_2, events[name_2], context || callback);
        return this;
    };
    Messenger.prototype.off = function (events, callback, context) {
        if (!events)
            off(this, void 0, callback, context);
        else if (typeof events === 'string')
            strings(off, this, events, callback, context);
        else
            for (var name_3 in events)
                strings(off, this, name_3, events[name_3], context || callback);
        return this;
    };
    Messenger.prototype.trigger = function (name, a, b, c, d, e) {
        if (d !== void 0 || e !== void 0)
            trigger5(this, name, a, b, c, d, e);
        else if (c !== void 0)
            trigger3(this, name, a, b, c);
        else
            trigger2(this, name, a, b);
        return this;
    };
    Messenger.prototype.listenTo = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.on(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.listenToOnce = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.once(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.stopListening = function (a_source, a, b) {
        var _listeningTo = this._listeningTo;
        if (_listeningTo) {
            var removeAll = !(a || b), second = !b && typeof a === 'object' ? this : b;
            if (a_source) {
                var source = _listeningTo[a_source.cid];
                if (source) {
                    if (removeAll)
                        delete _listeningTo[a_source.cid];
                    source.off(a, second, this);
                }
            }
            else if (a_source == null) {
                for (var cid in _listeningTo)
                    _listeningTo[cid].off(a, second, this);
                if (removeAll)
                    (this._listeningTo = void 0);
            }
        }
        return this;
    };
    Messenger.prototype.dispose = function () {
        if (this._disposed)
            return;
        this.stopListening();
        this.off();
        this._disposed = true;
    };
    return Messenger;
}());
Messenger = Messenger_1 = __decorate([
    extendable
], Messenger);
exports.Messenger = Messenger;
var slice = Array.prototype.slice;
exports.Events = tools_1.omit(Messenger.prototype, 'constructor', 'initialize');
function addReference(listener, source) {
    var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)), cid = source.cid || (source.cid = uniqueId());
    listeningTo[cid] = source;
}
var Messenger_1;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var generic_1 = __webpack_require__(3);
var ConstructorType = (function (_super) {
    __extends(ConstructorType, _super);
    function ConstructorType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstructorType.prototype.convert = function (value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };
    ConstructorType.prototype.clone = function (value) {
        return value && value.clone ? value.clone() : this.convert(JSON.parse(JSON.stringify(value)));
    };
    return ConstructorType;
}(generic_1.AnyType));
Function.prototype._attribute = ConstructorType;
var PrimitiveType = (function (_super) {
    __extends(PrimitiveType, _super);
    function PrimitiveType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimitiveType.prototype.create = function () { return this.type(); };
    PrimitiveType.prototype.toJSON = function (value) { return value; };
    PrimitiveType.prototype.convert = function (value) { return value == null ? value : this.type(value); };
    PrimitiveType.prototype.isChanged = function (a, b) { return a !== b; };
    PrimitiveType.prototype.clone = function (value) { return value; };
    return PrimitiveType;
}(generic_1.AnyType));
exports.PrimitiveType = PrimitiveType;
Boolean._attribute = String._attribute = PrimitiveType;
var NumericType = (function (_super) {
    __extends(NumericType, _super);
    function NumericType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericType.prototype.convert = function (value, a, b, record) {
        var num = value == null ? value : this.type(value);
        if (num !== num) {
            this._log('warn', 'assigned with Invalid Number', value, record);
        }
        return num;
    };
    NumericType.prototype.validate = function (model, value, name) {
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };
    return NumericType;
}(PrimitiveType));
exports.NumericType = NumericType;
Number._attribute = NumericType;
var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayType.prototype.toJSON = function (value) { return value; };
    ArrayType.prototype.convert = function (value, a, b, record) {
        if (value == null || Array.isArray(value))
            return value;
        this._log('warn', 'assigned with non-array', value, record);
        return [];
    };
    ArrayType.prototype.clone = function (value) { return value && value.slice(); };
    return ArrayType;
}(generic_1.AnyType));
exports.ArrayType = ArrayType;
Array._attribute = ArrayType;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var generic_1 = __webpack_require__(3);
var DateProto = Date.prototype;
var DateType = (function (_super) {
    __extends(DateType, _super);
    function DateType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateType.prototype.convert = function (value, a, b, record) {
        if (value == null || value instanceof Date)
            return value;
        var date = new Date(value), timestamp = date.getTime();
        if (timestamp !== timestamp) {
            this._log('warn', 'assigned with Invalid Date', value, record);
        }
        return date;
    };
    DateType.prototype.validate = function (model, value, name) {
        if (value != null) {
            var timestamp = value.getTime();
            if (timestamp !== timestamp)
                return name + ' is Invalid Date';
        }
    };
    DateType.prototype.toJSON = function (value) { return value && value.toISOString(); };
    DateType.prototype.isChanged = function (a, b) { return (a && a.getTime()) !== (b && b.getTime()); };
    DateType.prototype.clone = function (value) { return value && new Date(value.getTime()); };
    return DateType;
}(generic_1.AnyType));
exports.DateType = DateType;
Date._attribute = DateType;
var msDatePattern = /\/Date\(([0-9]+)\)\//;
var MSDateType = (function (_super) {
    __extends(MSDateType, _super);
    function MSDateType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MSDateType.prototype.convert = function (value) {
        if (typeof value === 'string') {
            var msDate = msDatePattern.exec(value);
            if (msDate) {
                return new Date(Number(msDate[1]));
            }
        }
        return DateType.prototype.convert.apply(this, arguments);
    };
    MSDateType.prototype.toJSON = function (value) { return value && "/Date(" + value.getTime() + ")/"; };
    return MSDateType;
}(DateType));
exports.MSDateType = MSDateType;
var TimestampType = (function (_super) {
    __extends(TimestampType, _super);
    function TimestampType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimestampType.prototype.toJSON = function (value) { return value.getTime(); };
    return TimestampType;
}(DateType));
exports.TimestampType = TimestampType;
function supportsDate(date) {
    return !isNaN((new Date(date)).getTime());
}
if (!supportsDate('2011-11-29T15:52:30.5') ||
    !supportsDate('2011-11-29T15:52:30.52') ||
    !supportsDate('2011-11-29T15:52:18.867') ||
    !supportsDate('2011-11-29T15:52:18.867Z') ||
    !supportsDate('2011-11-29T15:52:18.867-03:30')) {
    DateType.prototype.convert = function (value) {
        return value == null || value instanceof Date ? value : new Date(safeParseDate(value));
    };
}
var numericKeys = [1, 4, 5, 6, 7, 10, 11], isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
function safeParseDate(date) {
    var timestamp, struct, minutesOffset = 0;
    if ((struct = isoDatePattern.exec(date))) {
        for (var i = 0, k; (k = numericKeys[i]); ++i) {
            struct[k] = +struct[k] || 0;
        }
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;
        if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];
            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }
        timestamp =
            Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
    else {
        timestamp = Date.parse(date);
    }
    return timestamp;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __webpack_require__(9);
var generic_1 = __webpack_require__(3);
var transactions_1 = __webpack_require__(1);
var free = transactions_1.transactionApi.free, aquire = transactions_1.transactionApi.aquire;
var AggregatedType = (function (_super) {
    __extends(AggregatedType, _super);
    function AggregatedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregatedType.prototype.clone = function (value) {
        return value ? value.clone() : value;
    };
    AggregatedType.prototype.toJSON = function (x) { return x && x.toJSON(); };
    AggregatedType.prototype.canBeUpdated = function (prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge)
                    return next.__inner_state__;
            }
            else {
                return next;
            }
        }
    };
    AggregatedType.prototype.convert = function (value, options, prev, record) {
        if (value == null)
            return value;
        if (value instanceof this.type) {
            if (value._shared && !(value._shared & transactions_1.ItemsBehavior.persistent)) {
                this._log('error', 'aggregated attribute is assigned with shared collection type', value, record);
            }
            return options.merge ? value.clone() : value;
        }
        return this.type.create(value, options);
    };
    AggregatedType.prototype.dispose = function (record, value) {
        if (value) {
            free(record, value);
            value.dispose();
        }
    };
    AggregatedType.prototype.validate = function (record, value) {
        var error = value && value.validationError;
        if (error)
            return error;
    };
    AggregatedType.prototype.create = function () {
        return this.type.create();
    };
    AggregatedType.prototype.initialize = function (options) {
        options.changeHandlers.unshift(this._handleChange);
    };
    AggregatedType.prototype._handleChange = function (next, prev, record) {
        prev && free(record, prev);
        if (next && !aquire(record, next, this.name)) {
            this._log('error', 'aggregated attribute assigned with object which is aggregated somewhere else', next, record);
        }
    };
    return AggregatedType;
}(generic_1.AnyType));
exports.AggregatedType = AggregatedType;
transaction_1.Record._attribute = AggregatedType;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var generic_1 = __webpack_require__(3);
var transactions_1 = __webpack_require__(1);
var object_plus_1 = __webpack_require__(0);
var on = object_plus_1.eventsApi.on, off = object_plus_1.eventsApi.off, free = transactions_1.transactionApi.free, aquire = transactions_1.transactionApi.aquire;
var shareAndListen = transactions_1.ItemsBehavior.listen | transactions_1.ItemsBehavior.share;
var SharedType = (function (_super) {
    __extends(SharedType, _super);
    function SharedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharedType.prototype.clone = function (value, record) {
        if (!value || value._owner !== record)
            return value;
        var clone = value.clone();
        aquire(record, clone, this.name);
        return clone;
    };
    SharedType.prototype.toJSON = function () { };
    SharedType.prototype.canBeUpdated = function (prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge)
                    return next.__inner_state__;
            }
            else {
                return next;
            }
        }
    };
    SharedType.prototype.convert = function (value, options, prev, record) {
        if (value == null || value instanceof this.type)
            return value;
        var implicitObject = new this.type(value, options, shareAndListen);
        aquire(record, implicitObject, this.name);
        return implicitObject;
    };
    SharedType.prototype.validate = function (model, value, name) { };
    SharedType.prototype.create = function () {
        return null;
    };
    SharedType.prototype._handleChange = function (next, prev, record) {
        if (prev) {
            if (prev._owner === record) {
                free(record, prev);
            }
            else {
                off(prev, prev._changeEventName, this._onChange, record);
            }
        }
        if (next) {
            if (next._owner !== record) {
                on(next, next._changeEventName, this._onChange, record);
            }
        }
    };
    SharedType.prototype.dispose = function (record, value) {
        if (value) {
            if (value._owner === record) {
                free(record, value);
                value.dispose();
            }
            else {
                off(value, value._changeEventName, this._onChange, record);
            }
        }
    };
    SharedType.prototype.initialize = function (options) {
        var attribute = this;
        this._onChange = this.propagateChanges ? function (child, options, initiator) {
            this === initiator || this.forceAttributeChange(attribute.name, options);
        } : ignore;
        options.changeHandlers.unshift(this._handleChange);
    };
    return SharedType;
}(generic_1.AnyType));
exports.SharedType = SharedType;
function ignore() { }


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var attributes_1 = __webpack_require__(8);
var object_plus_1 = __webpack_require__(0);
var typespec_1 = __webpack_require__(12);
var traversable_1 = __webpack_require__(10);
var defaults = object_plus_1.tools.defaults, isValidJSON = object_plus_1.tools.isValidJSON, transform = object_plus_1.tools.transform, log = object_plus_1.tools.log, EventMap = object_plus_1.eventsApi.EventMap;
function compile(rawSpecs, baseAttributes) {
    var myAttributes = transform({}, rawSpecs, createAttribute), allAttributes = defaults({}, myAttributes, baseAttributes), Attributes = createCloneCtor(allAttributes), mixin = {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }),
        defaults: createDefaults(allAttributes),
        _toJSON: createToJSON(allAttributes),
        _localEvents: createEventMap(myAttributes),
        _keys: Object.keys(allAttributes)
    };
    var _parse = createParse(myAttributes, allAttributes);
    if (_parse) {
        mixin._parse = _parse;
    }
    if (!log.level) {
        mixin.forEachAttr = createForEach(allAttributes);
    }
    return mixin;
}
exports.compile = compile;
function createAttribute(spec, name) {
    return attributes_1.AnyType.create(typespec_1.toAttributeDescriptor(spec), name);
}
function createEventMap(attrSpecs) {
    var events;
    for (var key in attrSpecs) {
        var attribute = attrSpecs[key], _onChange = attribute.options._onChange;
        if (_onChange) {
            events || (events = new EventMap());
            events.addEvent('change:' + key, typeof _onChange === 'string' ?
                createWatcherFromRef(_onChange, key) :
                wrapWatcher(_onChange, key));
        }
    }
    return events;
}
function wrapWatcher(watcher, key) {
    return function (record, value) {
        watcher.call(record, value, key);
    };
}
function createWatcherFromRef(ref, key) {
    var _a = new traversable_1.CompiledReference(ref, true), local = _a.local, resolve = _a.resolve, tail = _a.tail;
    return local ?
        function (record, value) {
            record[tail](value, key);
        } :
        function (record, value) {
            resolve(record)[tail](value, key);
        };
}
function createForEach(attrSpecs) {
    var statements = ['var v, _a=this._attributes;'];
    for (var name_1 in attrSpecs) {
        statements.push("( v = a." + name_1 + " ) === void 0 || f( v, \"" + name_1 + "\", _a." + name_1 + " );");
    }
    return new Function('a', 'f', statements.join(''));
}
exports.createForEach = createForEach;
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name_2 in attrSpecs) {
        statements.push("this." + name_2 + " = x." + name_2 + ";");
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
exports.createCloneCtor = createCloneCtor;
function createDefaults(attrSpecs) {
    var assign_f = ['var v;'], create_f = [];
    function appendExpr(name, expr) {
        assign_f.push("this." + name + " = ( v = a." + name + " ) === void 0 ? " + expr + " : v;");
        create_f.push("this." + name + " = " + expr + ";");
    }
    for (var name_3 in attrSpecs) {
        var attrSpec = attrSpecs[name_3], value = attrSpec.value, type = attrSpec.type;
        if (value === void 0 && type) {
            appendExpr(name_3, "i." + name_3 + ".create()");
        }
        else {
            if (isValidJSON(value)) {
                appendExpr(name_3, JSON.stringify(value));
            }
            else if (value === void 0) {
                appendExpr(name_3, 'void 0');
            }
            else {
                appendExpr(name_3, "i." + name_3 + ".value");
            }
        }
    }
    var CreateDefaults = new Function('i', create_f.join('')), AssignDefaults = new Function('a', 'i', assign_f.join(''));
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'], create = false;
    for (var name_4 in allAttrSpecs) {
        var local = attrSpecs[name_4];
        if (local && local.parse)
            create = true;
        if (allAttrSpecs[name_4].parse) {
            var s = "r." + name_4 + " === void 0 ||( r." + name_4 + " = a." + name_4 + ".parse.call( this, r." + name_4 + ", \"" + name_4 + "\") );";
            statements.push(s);
        }
    }
    if (create) {
        statements.push('return r;');
        return new Function('r', statements.join(''));
    }
}
function createToJSON(attrSpecs) {
    var statements = ["var json = {},v=this.attributes,a=this._attributes;"];
    for (var key in attrSpecs) {
        var toJSON = attrSpecs[key].toJSON;
        if (toJSON) {
            statements.push("json." + key + " = a." + key + ".toJSON.call( this, v." + key + ", '" + key + "' );");
        }
    }
    statements.push("return json;");
    return new Function(statements.join(''));
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = __webpack_require__(2);
var commons_1 = __webpack_require__(13);
var record_2 = __webpack_require__(2);
var record_3 = __webpack_require__(2);
var RecordRefType = (function (_super) {
    __extends(RecordRefType, _super);
    function RecordRefType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordRefType.prototype.toJSON = function (value) {
        return value && typeof value === 'object' ? value.id : value;
    };
    RecordRefType.prototype.clone = function (value) {
        return value && typeof value === 'object' ? value.id : value;
    };
    RecordRefType.prototype.isChanged = function (a, b) {
        var aId = a && (a.id == null ? a : a.id), bId = b && (b.id == null ? b : b.id);
        return aId !== bId;
    };
    RecordRefType.prototype.validate = function (model, value, name) { };
    return RecordRefType;
}(record_1.AnyType));
record_2.Record.from = function from(masterCollection) {
    var getMasterCollection = commons_1.parseReference(masterCollection);
    var typeSpec = new record_3.ChainableAttributeSpec({
        value: null,
        _attribute: RecordRefType
    });
    return typeSpec
        .get(function (objOrId, name) {
        if (typeof objOrId === 'object')
            return objOrId;
        var collection = getMasterCollection(this);
        var record = null;
        if (collection && collection.length) {
            record = collection.get(objOrId) || null;
            this.attributes[name] = record;
            record && this._attributes[name].handleChange(record, null, this);
        }
        return record;
    });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = __webpack_require__(2);
var transactions_1 = __webpack_require__(1);
var _store = null;
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Store.prototype.getStore = function () { return this; };
    Store.prototype.get = function (name) {
        var local = this[name];
        if (local || this === this._defaultStore)
            return local;
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };
    Object.defineProperty(Store, "global", {
        get: function () { return _store; },
        set: function (store) {
            if (_store) {
                _store.dispose();
            }
            transactions_1.Transactional.prototype._defaultStore = _store = store;
        },
        enumerable: true,
        configurable: true
    });
    return Store;
}(record_1.Record));
exports.Store = Store;
Store.global = new Store();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var collection_1 = __webpack_require__(11);
var object_plus_1 = __webpack_require__(0);
var commons_1 = __webpack_require__(13);
var record_1 = __webpack_require__(2);
var transactions_1 = __webpack_require__(1);
var fastDefaults = object_plus_1.tools.fastDefaults;
collection_1.Collection.subsetOf = function subsetOf(masterCollection) {
    var SubsetOf = this._SubsetOf || (this._SubsetOf = defineSubsetCollection(this)), getMasterCollection = commons_1.parseReference(masterCollection), typeSpec = new record_1.ChainableAttributeSpec({
        type: SubsetOf
    });
    return typeSpec.get(function (refs) {
        !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
        return refs;
    });
};
function subsetOptions(options) {
    var subsetOptions = { parse: true };
    if (options)
        fastDefaults(subsetOptions, options);
    return subsetOptions;
}
var subsetOfBehavior = transactions_1.ItemsBehavior.share | transactions_1.ItemsBehavior.persistent;
function defineSubsetCollection(CollectionConstructor) {
    var SubsetOfCollection = (function (_super) {
        __extends(SubsetOfCollection, _super);
        function SubsetOfCollection(recordsOrIds, options) {
            var _this = _super.call(this, recordsOrIds, subsetOptions(options), subsetOfBehavior) || this;
            _this.resolvedWith = null;
            return _this;
        }
        Object.defineProperty(SubsetOfCollection.prototype, "__inner_state__", {
            get: function () { return this.refs || this.models; },
            enumerable: true,
            configurable: true
        });
        SubsetOfCollection.prototype.add = function (elements, options) {
            return _super.prototype.add.call(this, elements, subsetOptions(options));
        };
        SubsetOfCollection.prototype.reset = function (elements, options) {
            return _super.prototype.reset.call(this, elements, subsetOptions(options));
        };
        SubsetOfCollection.prototype._createTransaction = function (elements, options) {
            return _super.prototype._createTransaction.call(this, elements, subsetOptions(options));
        };
        SubsetOfCollection.prototype.toJSON = function () {
            return this.refs ?
                this.refs.map(function (objOrId) { return objOrId.id || objOrId; }) :
                this.models.map(function (model) { return model.id; });
        };
        SubsetOfCollection.prototype._validateNested = function () { return 0; };
        SubsetOfCollection.prototype.clone = function (owner) {
            var Ctor = this.constructor, copy = new Ctor([], {
                model: this.model,
                comparator: this.comparator
            });
            if (this.resolvedWith) {
                copy.resolvedWith = this.resolvedWith;
                copy.reset(this.models, { silent: true });
            }
            else {
                copy.refs = this.refs;
            }
            return copy;
        };
        SubsetOfCollection.prototype.parse = function (raw) {
            var resolvedWith = this.resolvedWith, elements = Array.isArray(raw) ? raw : [raw], records = [];
            if (resolvedWith) {
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var element = elements_1[_i];
                    var record = resolvedWith.get(element);
                    if (record)
                        records.push(record);
                }
            }
            else if (elements.length) {
                this.refs = elements;
            }
            return records;
        };
        SubsetOfCollection.prototype.resolve = function (collection) {
            if (collection && collection.length) {
                this.resolvedWith = collection;
                if (this.refs) {
                    this.reset(this.refs, { silent: true });
                    this.refs = null;
                }
            }
            return this;
        };
        SubsetOfCollection.prototype.getModelIds = function () { return this.toJSON(); };
        SubsetOfCollection.prototype.toggle = function (modelOrId, val) {
            return _super.prototype.toggle.call(this, this.resolvedWith.get(modelOrId), val);
        };
        SubsetOfCollection.prototype.addAll = function () {
            return this.reset(this.resolvedWith.models);
        };
        SubsetOfCollection.prototype.toggleAll = function () {
            return this.length ? this.reset() : this.addAll();
        };
        return SubsetOfCollection;
    }(CollectionConstructor));
    SubsetOfCollection = __decorate([
        object_plus_1.define({})
    ], SubsetOfCollection);
    return SubsetOfCollection;
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError = (function () {
    function ValidationError(obj) {
        this.length = obj._validateNested(this.nested = {});
        if (this.error = obj.validate(obj)) {
            this.length++;
        }
    }
    ValidationError.prototype.each = function (iteratee) {
        var _a = this, error = _a.error, nested = _a.nested;
        if (error)
            iteratee(error, null);
        for (var key in nested) {
            iteratee(nested[key], key);
        }
    };
    ValidationError.prototype.eachError = function (iteratee, object) {
        this.each(function (value, key) {
            if (value instanceof ValidationError) {
                value.eachError(iteratee, object.get(key));
            }
            else {
                iteratee(value, key, object);
            }
        });
    };
    return ValidationError;
}());
exports.ValidationError = ValidationError;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
__export(__webpack_require__(11));
__export(__webpack_require__(14));
__export(__webpack_require__(2));
var _1 = __webpack_require__(0);
exports.on = (_a = _1.Events, _a.on), exports.off = _a.off, exports.trigger = _a.trigger, exports.once = _a.once, exports.listenTo = _a.listenTo, exports.stopListening = _a.stopListening, exports.listenToOnce = _a.listenToOnce;
var record_1 = __webpack_require__(2);
exports.Model = record_1.Record;
var _2 = __webpack_require__(0);
exports.Class = _2.Mixable;
var record_2 = __webpack_require__(2);
function value(x) {
    return new record_2.ChainableAttributeSpec({ value: x });
}
exports.value = value;
function transaction(method) {
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result;
        this.transaction(function () {
            result = method.apply(_this, args);
        });
        return result;
    };
}
exports.transaction = transaction;
var _a;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map