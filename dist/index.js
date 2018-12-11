(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Nested = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

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
    function getBaseClass(Class) {
        return Object.getPrototypeOf(Class.prototype).constructor;
    }
    function assignToClassProto(Class, definition) {
        var names = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            names[_i - 2] = arguments[_i];
        }
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name_1 = names_1[_a];
            var value = definition[name_1];
            value === void 0 || (Class.prototype[name_1] = value);
        }
    }
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
    function every(obj, predicate) {
        return !some(obj, function (x) { return !predicate(x); });
    }
    function getPropertyDescriptor(obj, prop) {
        var desc;
        for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
            desc = Object.getOwnPropertyDescriptor(proto, prop);
        }
        return desc;
    }
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
    function transform(dest, source, fun) {
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                var value = fun(source[name], name);
                value === void 0 || (dest[name] = value);
            }
        }
        return dest;
    }
    function fastAssign(dest, source) {
        for (var name in source) {
            dest[name] = source[name];
        }
        return dest;
    }
    function fastDefaults(dest, source) {
        for (var name in source) {
            if (dest[name] === void 0) {
                dest[name] = source[name];
            }
        }
        return dest;
    }
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
    function keys(o) {
        return o ? Object.keys(o) : [];
    }
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
    var HashProto = Object.create(null);
    HashProto.hasOwnProperty = ObjectProto.hasOwnProperty;
    function hashMap(obj) {
        var hash = Object.create(HashProto);
        return obj ? assign(hash, obj) : hash;
    }

    var tools = /*#__PURE__*/Object.freeze({
        defaults: defaults,
        isValidJSON: isValidJSON,
        getBaseClass: getBaseClass,
        assignToClassProto: assignToClassProto,
        isEmpty: isEmpty,
        some: some,
        every: every,
        getPropertyDescriptor: getPropertyDescriptor,
        omit: omit,
        transform: transform,
        fastAssign: fastAssign,
        fastDefaults: fastDefaults,
        assign: assign,
        keys: keys,
        once: once,
        notEqual: notEqual,
        hashMap: hashMap
    });

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
    function once$1(source, name, callback, context) {
        if (callback) {
            var once_1 = once(function () {
                off(source, name, once_1);
                callback.apply(this, arguments);
            });
            once_1._callback = callback;
            on(source, name, once_1, context);
        }
    }
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
    function trigger2(self, name, a, b) {
        var _events = self._events;
        if (_events) {
            var queue = _events[name], all = _events.all;
            listSend2(queue, a, b);
            listSend3(all, name, a, b);
        }
    }
    function trigger3(self, name, a, b, c) {
        var _events = self._events;
        if (_events) {
            var queue = _events[name], all = _events.all;
            listSend3(queue, a, b, c);
            listSend4(all, name, a, b, c);
        }
    }
    function trigger5(self, name, a, b, c, d, e) {
        var _events = self._events;
        if (_events) {
            var queue = _events[name], all = _events.all;
            listSend5(queue, a, b, c, d, e);
            listSend6(all, name, a, b, c, d, e);
        }
    }

    var eventsource = /*#__PURE__*/Object.freeze({
        EventMap: EventMap,
        EventDescriptor: EventDescriptor,
        EventHandler: EventHandler,
        on: on,
        once: once$1,
        off: off,
        strings: strings,
        trigger2: trigger2,
        trigger3: trigger3,
        trigger5: trigger5
    });

    var Mixable = (function () {
        function Mixable() {
        }
        Mixable.define = function (protoProps, staticProps) {
            if (protoProps === void 0) { protoProps = {}; }
            var BaseClass = getBaseClass(this);
            staticProps && assign(this, staticProps);
            var mixins = protoProps.mixins, defineMixin = __rest(protoProps, ["mixins"]);
            mixins && this.mixins.merge(mixins);
            this.mixins.mergeObject(this.prototype, defineMixin, true);
            this.mixins.mergeObject(this.prototype, this.mixins.getStaticDefinitions(BaseClass), true);
            this.onDefine && this.onDefine(this.mixins.definitions, BaseClass);
            this.mixins.mergeInheritedMembers(BaseClass);
            return this;
        };
        Mixable.extend = function (spec, statics) {
            var TheSubclass;
            if (spec && spec.hasOwnProperty('constructor')) {
                TheSubclass = spec.constructor;
                __extends(TheSubclass, this);
            }
            else {
                TheSubclass = (function (_super) {
                    __extends(Subclass, _super);
                    function Subclass() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return Subclass;
                }(this));
            }
            predefine(TheSubclass);
            spec && TheSubclass.define(spec, statics);
            return TheSubclass;
        };
        return Mixable;
    }());
    function predefine(Constructor) {
        var BaseClass = getBaseClass(Constructor);
        Constructor.__super__ = BaseClass.prototype;
        Constructor.define || MixinsState.get(Mixable).populate(Constructor);
        MixinsState.get(Constructor);
        Constructor.onExtend && Constructor.onExtend(BaseClass);
    }
    function define(ClassOrDefinition) {
        if (typeof ClassOrDefinition === 'function') {
            predefine(ClassOrDefinition);
            ClassOrDefinition.define();
        }
        else {
            return function (Ctor) {
                predefine(Ctor);
                Ctor.define(ClassOrDefinition);
            };
        }
    }
    function definitions(rules) {
        return function (Class) {
            var mixins = MixinsState.get(Class);
            mixins.definitionRules = defaults(hashMap(), rules, mixins.definitionRules);
        };
    }
    function propertyListDecorator(listName) {
        return function propList(proto, name) {
            var list = proto.hasOwnProperty(listName) ?
                proto[listName] : (proto[listName] = (proto[listName] || []).slice());
            list.push(name);
        };
    }
    function definitionDecorator(definitionKey, value) {
        return function (proto, name) {
            var _a, _b;
            MixinsState
                .get(proto.constructor)
                .mergeObject(proto, (_a = {},
                _a[definitionKey] = (_b = {},
                    _b[name] = value,
                    _b),
                _a));
        };
    }
    var MixinsState = (function () {
        function MixinsState(Class) {
            this.Class = Class;
            this.definitions = {};
            var mixins = getBaseClass(Class).mixins;
            this.mergeRules = (mixins && mixins.mergeRules) || hashMap();
            this.definitionRules = (mixins && mixins.definitionRules) || hashMap();
            this.appliedMixins = (mixins && mixins.appliedMixins) || [];
        }
        MixinsState.get = function (Class) {
            var mixins = Class.mixins;
            return mixins && Class === mixins.Class ? mixins :
                Class.mixins = new MixinsState(Class);
        };
        MixinsState.prototype.getStaticDefinitions = function (BaseClass) {
            var definitions = hashMap(), Class = this.Class;
            return transform(definitions, this.definitionRules, function (rule, name) {
                if (BaseClass[name] !== Class[name]) {
                    return Class[name];
                }
            });
        };
        MixinsState.prototype.merge = function (mixins) {
            var proto = this.Class.prototype, mergeRules = this.mergeRules;
            var appliedMixins = this.appliedMixins = this.appliedMixins.slice();
            for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
                var mixin = mixins_1[_i];
                if (Array.isArray(mixin)) {
                    this.merge(mixin);
                }
                else if (appliedMixins.indexOf(mixin) < 0) {
                    appliedMixins.push(mixin);
                    if (typeof mixin === 'function') {
                        this.mergeObject(this.Class, mixin);
                        var sourceMixins = mixin.mixins;
                        if (sourceMixins) {
                            this.mergeRules = defaults(hashMap(), this.mergeRules, sourceMixins.mergeRules);
                            this.definitionRules = defaults(hashMap(), this.definitionRules, sourceMixins.definitionRules);
                            this.appliedMixins = this.appliedMixins.concat(sourceMixins.appliedMixins);
                        }
                        this.mergeObject(proto, mixin.prototype);
                    }
                    else {
                        this.mergeObject(proto, mixin);
                    }
                }
            }
        };
        MixinsState.prototype.populate = function () {
            var ctors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ctors[_i] = arguments[_i];
            }
            for (var _a = 0, ctors_1 = ctors; _a < ctors_1.length; _a++) {
                var Ctor = ctors_1[_a];
                MixinsState.get(Ctor).merge([this.Class]);
            }
        };
        MixinsState.prototype.mergeObject = function (dest, source, unshift) {
            var _this = this;
            forEachOwnProp(source, function (name) {
                var sourceProp = Object.getOwnPropertyDescriptor(source, name);
                var rule;
                if (rule = _this.definitionRules[name]) {
                    assignProperty(_this.definitions, name, sourceProp, rule, unshift);
                }
                if (!rule || rule === mixinRules.protoValue) {
                    assignProperty(dest, name, sourceProp, _this.mergeRules[name], unshift);
                }
            });
        };
        MixinsState.prototype.mergeInheritedMembers = function (BaseClass) {
            var _a = this, mergeRules = _a.mergeRules, Class = _a.Class;
            if (mergeRules) {
                var proto = Class.prototype, baseProto = BaseClass.prototype;
                for (var name_1 in mergeRules) {
                    var rule = mergeRules[name_1];
                    if (proto.hasOwnProperty(name_1) && name_1 in baseProto) {
                        proto[name_1] = resolveRule(proto[name_1], baseProto[name_1], rule);
                    }
                }
            }
        };
        return MixinsState;
    }());
    var dontMix = {
        function: hashMap({
            length: true,
            prototype: true,
            caller: true,
            arguments: true,
            name: true,
            __super__: true
        }),
        object: hashMap({
            constructor: true
        })
    };
    function forEachOwnProp(object, fun) {
        var ignore = dontMix[typeof object];
        for (var _i = 0, _a = Object.getOwnPropertyNames(object); _i < _a.length; _i++) {
            var name_2 = _a[_i];
            ignore[name_2] || fun(name_2);
        }
    }
    var mixins = function () {
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i] = arguments[_i];
        }
        return (function (Class) { return MixinsState.get(Class).merge(list); });
    };
    var mixinRules = (function (rules) { return (function (Class) {
        var mixins = MixinsState.get(Class);
        mixins.mergeRules = defaults(rules, mixins.mergeRules);
    }); });
    mixinRules.value = function (a, b) { return a; };
    mixinRules.protoValue = function (a, b) { return a; };
    mixinRules.merge = function (a, b) { return defaults({}, a, b); };
    mixinRules.pipe = function (a, b) { return (function (x) {
        return a.call(this, b.call(this, x));
    }); };
    mixinRules.defaults = function (a, b) { return (function () {
        return defaults(a.apply(this, arguments), b.apply(this, arguments));
    }); };
    mixinRules.classFirst = function (a, b) { return (function () {
        a.apply(this, arguments);
        b.apply(this, arguments);
    }); };
    mixinRules.classLast = function (a, b) { return (function () {
        b.apply(this, arguments);
        a.apply(this, arguments);
    }); };
    mixinRules.every = function (a, b) { return (function () {
        return a.apply(this, arguments) && b.apply(this, arguments);
    }); };
    mixinRules.some = function (a, b) { return (function () {
        return a.apply(this, arguments) || b.apply(this, arguments);
    }); };
    function assignProperty(dest, name, sourceProp, rule, unshift) {
        if (dest.hasOwnProperty(name)) {
            var destProp = Object.getOwnPropertyDescriptor(dest, name);
            if (destProp.configurable && 'value' in destProp) {
                dest[name] = unshift ?
                    resolveRule(sourceProp.value, destProp.value, rule) :
                    resolveRule(destProp.value, sourceProp.value, rule);
            }
        }
        else {
            Object.defineProperty(dest, name, sourceProp);
        }
    }
    function resolveRule(dest, source, rule) {
        if (dest === void 0)
            return source;
        if (!rule || source === void 0)
            return dest;
        return rule(dest, source);
    }

    var strings$1 = strings, on$1 = on, off$1 = off, once$2 = once$1, trigger5$1 = trigger5, trigger2$1 = trigger2, trigger3$1 = trigger3;
    var _idCount = 0;
    function uniqueId() {
        return 'l' + _idCount++;
    }
    var Messenger = (function () {
        function Messenger() {
            this._events = void 0;
            this._listeningTo = void 0;
            this.cid = uniqueId();
            this.initialize.apply(this, arguments);
        }
        Messenger.onDefine = function (_a, BaseClass) {
            var localEvents = _a.localEvents, _localEvents = _a._localEvents, properties = _a.properties;
            if (localEvents || _localEvents) {
                var eventsMap = new EventMap(this.prototype._localEvents);
                localEvents && eventsMap.addEventsMap(localEvents);
                _localEvents && eventsMap.merge(_localEvents);
                this.prototype._localEvents = eventsMap;
            }
            if (properties) {
                Object.defineProperties(this.prototype, transform({}, properties, toPropertyDescriptor));
            }
        };
        Messenger.prototype.initialize = function () { };
        Messenger.prototype.on = function (events, callback, context) {
            if (typeof events === 'string')
                strings$1(on$1, this, events, callback, context);
            else
                for (var name_1 in events)
                    strings$1(on$1, this, name_1, events[name_1], context || callback);
            return this;
        };
        Messenger.prototype.once = function (events, callback, context) {
            if (typeof events === 'string')
                strings$1(once$2, this, events, callback, context);
            else
                for (var name_2 in events)
                    strings$1(once$2, this, name_2, events[name_2], context || callback);
            return this;
        };
        Messenger.prototype.off = function (events, callback, context) {
            if (!events)
                off$1(this, void 0, callback, context);
            else if (typeof events === 'string')
                strings$1(off$1, this, events, callback, context);
            else
                for (var name_3 in events)
                    strings$1(off$1, this, name_3, events[name_3], context || callback);
            return this;
        };
        Messenger.prototype.trigger = function (name, a, b, c, d, e) {
            if (d !== void 0 || e !== void 0)
                trigger5$1(this, name, a, b, c, d, e);
            else if (c !== void 0)
                trigger3$1(this, name, a, b, c);
            else
                trigger2$1(this, name, a, b);
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
        Messenger = __decorate([
            define,
            definitions({
                properties: mixinRules.merge,
                localEvents: mixinRules.merge
            })
        ], Messenger);
        return Messenger;
    }());
    var Events = omit(Messenger.prototype, 'constructor', 'initialize');
    function toPropertyDescriptor(x) {
        if (x) {
            return typeof x === 'function' ? { get: x, configurable: true } : x;
        }
    }
    function addReference(listener, source) {
        var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)), cid = source.cid || (source.cid = uniqueId());
        listeningTo[cid] = source;
    }

    var isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production', logEvents = isProduction ?
        ['error', 'info'] :
        ['error', 'warn', 'debug', 'info', 'log'];
    var Logger = (function (_super) {
        __extends(Logger, _super);
        function Logger() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.counter = {};
            return _this;
        }
        Logger.prototype.logToConsole = function (level, filter) {
            return this.on(level, function (topic, msg, props) {
                if (!filter || filter.test(topic)) {
                    var args = ["[" + topic + "] " + msg];
                    for (var name_1 in props) {
                        args.push("\n\t" + name_1 + ":", toString(props[name_1]));
                    }
                    console[level].apply(console, args);
                }
            });
        };
        Logger.prototype.throwOn = function (level, filter) {
            return this.on(level, function (topic, msg, props) {
                if (!filter || filter.test(topic)) {
                    throw new Error("[" + topic + "] " + msg);
                }
            });
        };
        Logger.prototype.count = function (level, filter) {
            var _this = this;
            return this.on(level, function (topic, msg, props) {
                if (!filter || filter.test(topic)) {
                    _this.counter[level] = (_this.counter[level] || 0) + 1;
                }
            });
        };
        Logger.prototype.on = function (a, b) {
            return _super.prototype.on.call(this, a, b);
        };
        Logger = __decorate([
            define
        ], Logger);
        return Logger;
    }(Messenger));
    var toString = typeof window === 'undefined' ?
        function (something) {
            if (something && typeof something === 'object') {
                var __inner_state__ = something.__inner_state__, value = __inner_state__ || something, isArray = Array.isArray(value);
                var body = isArray ? "[ length = " + value.length + " ]" : "{ " + Object.keys(value).join(', ') + " }";
                return something.constructor.name + ' ' + body;
            }
            return JSON.stringify(something);
        }
        : function (x) { return x; };
    var logger = new Logger();
    if (typeof console !== 'undefined') {
        for (var _i = 0, logEvents_1 = logEvents; _i < logEvents_1.length; _i++) {
            var event_1 = logEvents_1[_i];
            logger.logToConsole(event_1);
        }
    }
    var log = logger.trigger.bind(logger);

    function getOwnerEndpoint(self) {
        var collection = self.collection;
        if (collection) {
            return getOwnerEndpoint(collection);
        }
        if (self._owner) {
            var _endpoints = self._owner._endpoints;
            return _endpoints && _endpoints[self._ownerKey];
        }
    }
    function createIOPromise(initialize) {
        var resolve, reject, onAbort;
        function abort(fn) {
            onAbort = fn;
        }
        var promise = new Promise(function (a_resolve, a_reject) {
            reject = a_reject;
            resolve = a_resolve;
            initialize(resolve, reject, abort);
        });
        promise.abort = function () {
            onAbort ? onAbort(resolve, reject) : reject(new Error("I/O Aborted"));
        };
        return promise;
    }
    function startIO(self, promise, options, thenDo) {
        abortIO(self);
        options.ioUpdate = true;
        self._ioPromise = promise
            .then(function (resp) {
            self._ioPromise = null;
            var result = thenDo ? thenDo(resp) : resp;
            triggerAndBubble(self, 'sync', self, resp, options);
            return result;
        })
            .catch(function (err) {
            self._ioPromise = null;
            triggerAndBubble(self, 'error', self, err, options);
            throw err;
        });
        self._ioPromise.abort = promise.abort;
        return self._ioPromise;
    }
    function abortIO(self) {
        if (self._ioPromise && self._ioPromise.abort) {
            self._ioPromise.abort();
            self._ioPromise = null;
        }
    }
    function triggerAndBubble(eventSource) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        eventSource.trigger.apply(eventSource, args);
        var collection = eventSource.collection;
        collection && collection.trigger.apply(collection, args);
    }

    var referenceMask = /\^|(store\.[^.]+)|([^.]+)/g;
    var CompiledReference = (function () {
        function CompiledReference(reference, splitTail) {
            if (splitTail === void 0) { splitTail = false; }
            var path = reference
                .match(referenceMask)
                .map(function (key) {
                if (key === '^' || key === 'owner')
                    return 'getOwner()';
                if (key[0] === '~')
                    return "getStore().get(\"" + key.substr(1) + "\")";
                if (key.indexOf('store.') === 0)
                    return "getStore().get(\"" + key.substr(6) + "\")";
                return key;
            });
            this.tail = splitTail && path.pop();
            this.local = !path.length;
            this.resolve = new Function('self', "\n            var v = self." + path.shift() + ";\n                           \n            " + path.map(function (x) { return "\n                v = v && v." + x + ";\n            "; }).join('') + "\n\n            return v;\n        ");
        }
        return CompiledReference;
    }());
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

    var trigger3$2 = trigger3, on$2 = on, off$2 = off;
    (function (ItemsBehavior) {
        ItemsBehavior[ItemsBehavior["share"] = 1] = "share";
        ItemsBehavior[ItemsBehavior["listen"] = 2] = "listen";
        ItemsBehavior[ItemsBehavior["persistent"] = 4] = "persistent";
    })(exports.ItemsBehavior || (exports.ItemsBehavior = {}));
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
        Transactional_1 = Transactional;
        Transactional.onDefine = function (definitions$$1, BaseClass) {
            if (definitions$$1.endpoint)
                this.prototype._endpoint = definitions$$1.endpoint;
            Messenger.onDefine.call(this, definitions$$1, BaseClass);
        };
        Transactional.onExtend = function (BaseClass) {
            if (BaseClass.create === this.create) {
                this.create = Transactional_1.create;
            }
        };
        Transactional.create = function (a, b) {
            return new this(a, b);
        };
        Transactional.prototype.dispose = function () {
            if (this._disposed)
                return;
            abortIO(this);
            this._owner = void 0;
            this._ownerKey = void 0;
            this.off();
            this.stopListening();
            this._disposed = true;
        };
        Transactional.prototype.initialize = function () { };
        Transactional.prototype.onChanges = function (handler, target) {
            on$2(this, this._changeEventName, handler, target);
        };
        Transactional.prototype.offChanges = function (handler, target) {
            off$2(this, this._changeEventName, handler, target);
        };
        Transactional.prototype.listenToChanges = function (target, handler) {
            this.listenTo(target, target._changeEventName, handler);
        };
        Transactional.prototype.transaction = function (fun, options) {
            if (options === void 0) { options = {}; }
            var isRoot = transactionApi.begin(this);
            var update = fun.call(this, this);
            update && this.set(update);
            isRoot && transactionApi.commit(this);
        };
        Transactional.prototype.assignFrom = function (source) {
            var _this = this;
            this.transaction(function () {
                _this.set(source.__inner_state__ || source, { merge: true });
                var _changeToken = source._changeToken;
                if (_changeToken) {
                    _this._changeToken = _changeToken;
                }
            });
            return this;
        };
        Transactional.prototype.parse = function (data, options) { return data; };
        Transactional.prototype.deepGet = function (reference) {
            return resolveReference(this, reference, function (object, key) { return object.get ? object.get(key) : object[key]; });
        };
        Transactional.prototype.getOwner = function () {
            return this._owner;
        };
        Transactional.prototype.getStore = function () {
            var _owner = this._owner;
            return _owner ? _owner.getStore() : this._defaultStore;
        };
        Transactional.prototype.hasPendingIO = function () { return this._ioPromise; };
        Transactional.prototype.fetch = function (options) { throw new Error("Not implemented"); };
        Transactional.prototype.getEndpoint = function () {
            return getOwnerEndpoint$1(this) || this._endpoint;
        };
        Object.defineProperty(Transactional.prototype, "validationError", {
            get: function () {
                var error = this._validationError || (this._validationError = new ValidationError(this));
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
            return resolveReference(this, reference, function (object, key) { return object.getValidationError(key); });
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
        var Transactional_1;
        Transactional = Transactional_1 = __decorate([
            define,
            definitions({
                endpoint: mixinRules.value
            }),
            mixins(Messenger)
        ], Transactional);
        return Transactional;
    }());
    var transactionApi = {
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
                    trigger3$2(object, object._changeEventName, object, options, initiator);
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
            if (child._owner)
                throw new ReferenceError('Trying to aquire ownership for an object already having an owner');
            child._owner = owner;
            child._ownerKey = key;
        },
        free: function (owner, child) {
            if (owner === child._owner) {
                child._owner = void 0;
                child._ownerKey = void 0;
            }
        }
    };
    function getOwnerEndpoint$1(self) {
        var collection = self.collection;
        if (collection) {
            return getOwnerEndpoint$1(collection);
        }
        if (self._owner) {
            var _endpoints = self._owner._endpoints;
            return _endpoints && _endpoints[self._ownerKey];
        }
    }

    var _begin = transactionApi.begin, _markAsDirty = transactionApi.markAsDirty, commit = transactionApi.commit;
    var trigger3$3 = trigger3;
    function setAttribute(record, name, value) {
        var isRoot = begin(record), options = {};
        if (record._attributes[name].doUpdate(value, record, options)) {
            markAsDirty(record, options);
            trigger3$3(record, 'change:' + name, record, record.attributes[name], options);
        }
        isRoot && commit(record);
    }
    function begin(record) {
        if (_begin(record)) {
            record._previousAttributes = new record.AttributesCopy(record.attributes);
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
    var UpdateRecordMixin = {
        transaction: function (fun, options) {
            if (options === void 0) { options = {}; }
            var isRoot = begin(this);
            fun.call(this, this);
            isRoot && commit(this);
        },
        _onChildrenChange: function (child, options) {
            var _ownerKey = child._ownerKey, attribute = this._attributes[_ownerKey];
            if (!attribute || attribute.propagateChanges)
                this.forceAttributeChange(_ownerKey, options);
        },
        forceAttributeChange: function (key, options) {
            if (options === void 0) { options = {}; }
            var isRoot = begin(this);
            if (markAsDirty(this, options)) {
                trigger3$3(this, 'change:' + key, this, this.attributes[key], options);
            }
            isRoot && commit(this);
        },
        _createTransaction: function (a_values, options) {
            if (options === void 0) { options = {}; }
            var isRoot = begin(this), changes = [], nested = [], _attributes = this._attributes, values = options.parse ? this.parse(a_values, options) : a_values;
            var unknown;
            if (shouldBeAnObject(this, values, options)) {
                for (var name_1 in values) {
                    var spec = _attributes[name_1];
                    if (spec) {
                        if (spec.doUpdate(values[name_1], this, options, nested)) {
                            changes.push(name_1);
                        }
                    }
                    else {
                        unknown || (unknown = []);
                        unknown.push("'" + name_1 + "'");
                    }
                }
                if (unknown) {
                    unknownAttrsWarning(this, unknown, { values: values }, options);
                }
            }
            if (changes.length && markAsDirty(this, options)) {
                return new RecordTransaction(this, isRoot, nested, changes);
            }
            for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
                var pendingTransaction = nested_1[_i];
                pendingTransaction.commit(this);
            }
            isRoot && commit(this);
        }
    };
    function unknownAttrsWarning(record, unknown, props, options) {
        record._log('warn', 'Type-R:UnknownAttrs', "undefined attributes " + unknown.join(', ') + " are ignored.", props, options.logger);
    }
    function constructorsMixin(attrDefs) {
        var attrs = Object.keys(attrDefs);
        var AttributesCopy = new Function('values', "\n        " + attrs.map(function (attr) { return "\n            this." + attr + " = values." + attr + ";\n        "; }).join('') + "\n    ");
        AttributesCopy.prototype = Object.prototype;
        var Attributes = new Function('record', 'values', 'options', "\n        var _attrs = record._attributes;\n\n        " + attrs.map(function (attr) { return "\n            this." + attr + " = _attrs." + attr + ".doInit( values." + attr + ", record, options );\n        "; }).join('') + "\n    ");
        Attributes.prototype = Object.prototype;
        return { Attributes: Attributes, AttributesCopy: AttributesCopy };
    }
    function shouldBeAnObject(record, values, options) {
        if (values && values.constructor === Object)
            return true;
        record._log('error', 'Type-R:InvalidObject', 'update with non-object is ignored!', { values: values }, options.logger);
        return false;
    }
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
                trigger3$3(object, 'change:' + key, object, attributes[key], _isDirty);
            }
            this.isRoot && commit(object, initiator);
        };
        return RecordTransaction;
    }());

    var notEqual$1 = notEqual, assign$1 = assign;
    var emptyOptions = {};
    var AnyType = (function () {
        function AnyType(name, a_options) {
            this.name = name;
            this.getHook = null;
            this.options = a_options;
            var options = assign$1({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
            options.getHooks = options.getHooks.slice();
            options.transforms = options.transforms.slice();
            options.changeHandlers = options.changeHandlers.slice();
            var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, changeEvents = options.changeEvents, validate = options.validate, getHooks = options.getHooks, transforms = options.transforms, changeHandlers = options.changeHandlers;
            this.value = value;
            this.type = type;
            if (!options.hasCustomDefault && type) {
                this.defaultValue = this.create;
            }
            else if (isValidJSON(value)) {
                this.defaultValue = new Function("return " + JSON.stringify(value) + ";");
            }
            else {
                this.defaultValue = this.defaultValue;
            }
            this.propagateChanges = changeEvents !== false;
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
            this.transform = transforms.length ? transforms.reduce(chainTransforms) : this.transform;
            this.handleChange = changeHandlers.length ? changeHandlers.reduce(chainChangeHandlers) : this.handleChange;
            var _a = this, doInit = _a.doInit, doUpdate = _a.doUpdate;
            this.doInit = parse ? function (value, record, options) {
                return doInit.call(this, options.parse && value !== void 0 ? parse.call(record, value, this.name) : value, record, options);
            } : doInit;
            this.doUpdate = parse ? function (value, record, options, nested) {
                return doUpdate.call(this, options.parse && value !== void 0 ? parse.call(record, value, this.name) : value, record, options, nested);
            } : doUpdate;
        }
        AnyType.prototype.canBeUpdated = function (prev, next, options) { };
        AnyType.prototype.transform = function (next, prev, model, options) { return next; };
        AnyType.prototype.convert = function (next, prev, model, options) { return next; };
        AnyType.prototype.isChanged = function (a, b) {
            return notEqual$1(a, b);
        };
        AnyType.prototype.handleChange = function (next, prev, model, options) { };
        AnyType.prototype.create = function () { return void 0; };
        AnyType.prototype.clone = function (value, record) {
            return value;
        };
        AnyType.prototype.dispose = function (record, value) {
            this.handleChange(void 0, value, record, emptyOptions);
        };
        AnyType.prototype.validate = function (record, value, key) { };
        AnyType.prototype.toJSON = function (value, key, options) {
            return value && value.toJSON ? value.toJSON(options) : value;
        };
        AnyType.prototype.createPropertyDescriptor = function () {
            var _a = this, name = _a.name, getHook = _a.getHook;
            if (name !== 'id') {
                return {
                    set: function (value) {
                        setAttribute(this, name, value);
                    },
                    get: (getHook ?
                        function () {
                            return getHook.call(this, this.attributes[name], name);
                        } :
                        function () { return this.attributes[name]; }),
                    configurable: true
                };
            }
        };
        AnyType.prototype.initialize = function (name, options) { };
        AnyType.prototype.doInit = function (value, record, options) {
            var v = value === void 0 ? this.defaultValue() : value, x = this.transform(v, void 0, record, options);
            this.handleChange(x, void 0, record, options);
            return x;
        };
        AnyType.prototype.doUpdate = function (value, record, options, nested) {
            var name = this.name, attributes = record.attributes, prev = attributes[name];
            var next = this.transform(value, prev, record, options);
            attributes[name] = next;
            if (this.isChanged(next, prev)) {
                this.handleChange(next, prev, record, options);
                return true;
            }
            return false;
        };
        AnyType.prototype._log = function (level, code, text, value, record, logger$$1) {
            record._log(level, code, record.getClassName() + "." + this.name + " " + text, {
                'New value': value,
                'Prev. value': record.attributes[this.name]
            }, logger$$1);
        };
        AnyType.prototype.defaultValue = function () {
            return this.value;
        };
        return AnyType;
    }());
    function chainGetHooks(prevHook, nextHook) {
        return function (value, name) {
            return nextHook.call(this, prevHook.call(this, value, name), name);
        };
    }
    function chainTransforms(prevTransform, nextTransform) {
        return function (next, prev, record, options) {
            return nextTransform.call(this, prevTransform.call(this, next, prev, record, options), prev, record, options);
        };
    }
    function chainChangeHandlers(prevHandler, nextHandler) {
        return function (next, prev, record, options) {
            prevHandler.call(this, next, prev, record, options);
            nextHandler.call(this, next, prev, record, options);
        };
    }
    function wrapIsRequired(validate) {
        return function (record, value, key) {
            return value ? validate.call(this, record, value, key) : 'Required';
        };
    }

    var ImmutableClassType = (function (_super) {
        __extends(ImmutableClassType, _super);
        function ImmutableClassType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImmutableClassType.prototype.create = function () {
            return new this.type();
        };
        ImmutableClassType.prototype.convert = function (next) {
            return next == null || next instanceof this.type ? next : new this.type(next);
        };
        ImmutableClassType.prototype.toJSON = function (value, key, options) {
            return value && value.toJSON ? value.toJSON(options) : value;
        };
        ImmutableClassType.prototype.clone = function (value) {
            return new this.type(this.toJSON(value));
        };
        ImmutableClassType.prototype.isChanged = function (a, b) {
            return a !== b;
        };
        return ImmutableClassType;
    }(AnyType));
    var PrimitiveType = (function (_super) {
        __extends(PrimitiveType, _super);
        function PrimitiveType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrimitiveType.prototype.dispose = function () { };
        PrimitiveType.prototype.create = function () { return this.type(); };
        PrimitiveType.prototype.toJSON = function (value) { return value; };
        PrimitiveType.prototype.convert = function (next) { return next == null ? next : this.type(next); };
        PrimitiveType.prototype.isChanged = function (a, b) { return a !== b; };
        PrimitiveType.prototype.clone = function (value) { return value; };
        PrimitiveType.prototype.doInit = function (value, record, options) {
            return this.transform(value === void 0 ? this.value : value, void 0, record, options);
        };
        PrimitiveType.prototype.doUpdate = function (value, record, options, nested) {
            var name = this.name, attributes = record.attributes, prev = attributes[name];
            return prev !== (attributes[name] = this.transform(value, prev, record, options));
        };
        PrimitiveType.prototype.initialize = function () {
            if (!this.options.hasCustomDefault) {
                this.value = this.type();
            }
        };
        return PrimitiveType;
    }(AnyType));
    var NumericType = (function (_super) {
        __extends(NumericType, _super);
        function NumericType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumericType.prototype.create = function () {
            return 0;
        };
        NumericType.prototype.convert = function (next, prev, record, options) {
            var num = next == null ? next : this.type(next);
            if (num !== num) {
                this._log('error', 'Type-R:InvalidNumber', 'Number attribute is assigned with an invalid number', next, record, options.logger);
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
    var ArrayType = (function (_super) {
        __extends(ArrayType, _super);
        function ArrayType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayType.prototype.toJSON = function (value) { return value; };
        ArrayType.prototype.dispose = function () { };
        ArrayType.prototype.create = function () { return []; };
        ArrayType.prototype.convert = function (next, prev, record, options) {
            if (next == null || Array.isArray(next))
                return next;
            this._log('error', 'Type-R:InvalidArray', 'Array attribute assigned with non-array value', next, record, options.logger);
            return [];
        };
        ArrayType.prototype.clone = function (value) {
            return value && value.slice();
        };
        return ArrayType;
    }(AnyType));
    var ObjectType = (function (_super) {
        __extends(ObjectType, _super);
        function ObjectType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObjectType.prototype.create = function () { return {}; };
        ObjectType.prototype.convert = function (next, prev, record, options) {
            if (next == null || typeof next === 'object')
                return next;
            this._log('error', 'Type-R:InvalidObject', 'Object attribute is assigned with non-object value', next, record, options.logger);
            return {};
        };
        return ObjectType;
    }(AnyType));
    function doNothing() { }
    var FunctionType = (function (_super) {
        __extends(FunctionType, _super);
        function FunctionType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FunctionType.prototype.toJSON = function (value) { return void 0; };
        FunctionType.prototype.create = function () { return doNothing; };
        FunctionType.prototype.dispose = function () { };
        FunctionType.prototype.convert = function (next, prev, record, options) {
            if (next == null || typeof next === 'function')
                return next;
            this._log('error', 'Type-R:InvalidFunction', 'Function attribute assigned with non-function value', next, record, options.logger);
            return doNothing;
        };
        FunctionType.prototype.clone = function (value) { return value; };
        return FunctionType;
    }(AnyType));

    var DateType = (function (_super) {
        __extends(DateType, _super);
        function DateType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateType.prototype.create = function () {
            return new Date();
        };
        DateType.prototype.convert = function (next, a, record, options) {
            if (next == null || next instanceof Date)
                return next;
            var date = new Date(next), timestamp = date.getTime();
            if (timestamp !== timestamp) {
                this._log('error', 'Type-R:InvalidDate', 'Date attribute assigned with invalid date', next, record, options.logger);
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
        DateType.prototype.doInit = function (value, record, options) {
            return this.transform(value === void 0 ? this.defaultValue() : value, void 0, record, options);
        };
        DateType.prototype.doUpdate = function (value, record, options, nested) {
            var name = this.name, attributes = record.attributes, prev = attributes[name];
            return this.isChanged(prev, attributes[name] = this.transform(value, prev, record, options));
        };
        DateType.prototype.clone = function (value) { return value && new Date(value.getTime()); };
        DateType.prototype.dispose = function () { };
        return DateType;
    }(AnyType));
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

    var free = transactionApi.free, aquire = transactionApi.aquire;
    var AggregatedType = (function (_super) {
        __extends(AggregatedType, _super);
        function AggregatedType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AggregatedType.prototype.clone = function (value) {
            return value ? value.clone() : value;
        };
        AggregatedType.prototype.toJSON = function (x, key, options) { return x && x.toJSON(options); };
        AggregatedType.prototype.doInit = function (value, record, options) {
            var v = options.clone ? this.clone(value) : (value === void 0 ? this.defaultValue() : value);
            var x = this.transform(v, void 0, record, options);
            this.handleChange(x, void 0, record, options);
            return x;
        };
        AggregatedType.prototype.doUpdate = function (value, record, options, nested) {
            var key = this.name, attributes = record.attributes;
            var prev = attributes[key];
            var update;
            if (update = this.canBeUpdated(prev, value, options)) {
                var nestedTransaction = prev._createTransaction(update, options);
                if (nestedTransaction) {
                    if (nested) {
                        nested.push(nestedTransaction);
                    }
                    else {
                        nestedTransaction.commit(record);
                    }
                    if (this.propagateChanges)
                        return true;
                }
                return false;
            }
            var next = this.transform(value, prev, record, options);
            attributes[key] = next;
            if (this.isChanged(next, prev)) {
                this.handleChange(next, prev, record, options);
                return true;
            }
            return false;
        };
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
        AggregatedType.prototype.convert = function (next, prev, record, options) {
            if (next == null)
                return next;
            if (next instanceof this.type) {
                if (next._shared && !(next._shared & exports.ItemsBehavior.persistent)) {
                    this._log('error', 'Type-R:InvalidCollection', 'aggregated collection attribute is assigned with shared collection type', next, record, options.logger);
                }
                if (options.merge)
                    return next.clone();
                if (next._owner) {
                    this._log('warn', 'Type-R:InvalidOwner', 'object alreay has an owner and was cloned. Use explicit object.clone() to dismiss this warning.', next, record, options.logger);
                    return next.clone();
                }
                return next;
            }
            return this.type.create(next, options);
        };
        AggregatedType.prototype.dispose = function (record, value) {
            if (value) {
                this.handleChange(void 0, value, record, {});
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
        AggregatedType.prototype._handleChange = function (next, prev, record, options) {
            if (prev) {
                free(record, prev);
                options.unset || prev.dispose();
            }
            if (next)
                aquire(record, next, this.name);
        };
        return AggregatedType;
    }(AnyType));

    var on$3 = on, off$3 = off, free$1 = transactionApi.free, aquire$1 = transactionApi.aquire;
    var shareAndListen = exports.ItemsBehavior.listen | exports.ItemsBehavior.share;
    var SharedType = (function (_super) {
        __extends(SharedType, _super);
        function SharedType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SharedType.prototype.doInit = function (value, record, options) {
            var v = options.clone ? this.clone(value, record) : (value === void 0 ? this.defaultValue() : value);
            var x = this.transform(v, void 0, record, options);
            this.handleChange(x, void 0, record, options);
            return x;
        };
        SharedType.prototype.doUpdate = function (value, record, options, nested) {
            var key = this.name, attributes = record.attributes;
            var prev = attributes[key];
            var update;
            if (update = this.canBeUpdated(prev, value, options)) {
                var nestedTransaction = prev._createTransaction(update, options);
                if (nestedTransaction) {
                    if (nested) {
                        nested.push(nestedTransaction);
                    }
                    else {
                        nestedTransaction.commit(record);
                    }
                    if (this.propagateChanges)
                        return true;
                }
                return false;
            }
            var next = this.transform(value, prev, record, options);
            attributes[key] = next;
            if (this.isChanged(next, prev)) {
                this.handleChange(next, prev, record, options);
                return true;
            }
            return false;
        };
        SharedType.prototype.clone = function (value, record) {
            if (!value || value._owner !== record)
                return value;
            var clone = value.clone();
            aquire$1(record, clone, this.name);
            return clone;
        };
        SharedType.prototype.toJSON = function () { };
        SharedType.prototype.canBeUpdated = function (prev, next, options) {
            if (prev && next != null && !(next instanceof this.type)) {
                return next;
            }
        };
        SharedType.prototype.convert = function (next, prev, record, options) {
            if (next == null || next instanceof this.type)
                return next;
            var implicitObject = new this.type(next, options, shareAndListen);
            aquire$1(record, implicitObject, this.name);
            return implicitObject;
        };
        SharedType.prototype.validate = function (model, value, name) { };
        SharedType.prototype.create = function () {
            return null;
        };
        SharedType.prototype._handleChange = function (next, prev, record, options) {
            if (prev) {
                if (prev._owner === record) {
                    free$1(record, prev);
                    options.unset || prev.dispose();
                }
                else {
                    off$3(prev, prev._changeEventName, this._onChange, record);
                }
            }
            if (next) {
                if (next._owner !== record) {
                    on$3(next, next._changeEventName, this._onChange, record);
                }
            }
        };
        SharedType.prototype.dispose = function (record, value) {
            if (value) {
                this.handleChange(void 0, value, record, {});
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
    }(AnyType));
    function ignore() { }
    function shared(T) {
        return T.shared;
    }

    var builtins = [String, Number, Boolean, Date, Object, Array, Function], metatypes = [PrimitiveType, NumericType, PrimitiveType, DateType, ObjectType, ArrayType, FunctionType];
    function getMetatype(Ctor) {
        return Ctor._metatype || resolveBuiltins(Ctor);
    }
    AnyType.create = function (options, name) {
        var type = options.type, AttributeCtor = options._metatype || (type ? getMetatype(type) : AnyType);
        return new AttributeCtor(name, options);
    };
    function resolveBuiltins(Ctor) {
        var idx = builtins.indexOf(Ctor);
        return idx < 0 ? ImmutableClassType : metatypes[idx];
    }

    var assign$2 = assign;
    var ChainableAttributeSpec = (function () {
        function ChainableAttributeSpec(options) {
            this.options = { getHooks: [], transforms: [], changeHandlers: [] };
            if (options)
                assign$2(this.options, options);
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
        Object.defineProperty(ChainableAttributeSpec.prototype, "asProp", {
            get: function () {
                return definitionDecorator('attributes', this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChainableAttributeSpec.prototype, "as", {
            get: function () { return this.asProp; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChainableAttributeSpec.prototype, "isRequired", {
            get: function () {
                return this.required;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChainableAttributeSpec.prototype, "required", {
            get: function () {
                return this.metadata({ isRequired: true });
            },
            enumerable: true,
            configurable: true
        });
        ChainableAttributeSpec.prototype.endpoint = function (endpoint) {
            return this.metadata({ endpoint: endpoint });
        };
        ChainableAttributeSpec.prototype.watcher = function (ref) {
            return this.metadata({ _onChange: ref });
        };
        ChainableAttributeSpec.prototype.parse = function (fun) {
            return this.metadata({ parse: fun });
        };
        ChainableAttributeSpec.prototype.toJSON = function (fun) {
            return this.metadata({
                toJSON: typeof fun === 'function' ? fun : (fun ? function (x, k, o) { return x && x.toJSON(o); } : emptyFunction)
            });
        };
        ChainableAttributeSpec.prototype.get = function (fun) {
            return this.metadata({
                getHooks: this.options.getHooks.concat(fun)
            });
        };
        ChainableAttributeSpec.prototype.set = function (fun) {
            function handleSetHook(next, prev, record, options) {
                if (this.isChanged(next, prev)) {
                    var changed = fun.call(record, next, this.name);
                    return changed === void 0 ? prev : this.convert(changed, prev, record, options);
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
            var eventMap = new EventMap(map);
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
            assign$2(cloned.options, options);
            return cloned;
        };
        ChainableAttributeSpec.prototype.value = function (x) {
            return this.metadata({ value: x, hasCustomDefault: true });
        };
        ChainableAttributeSpec.from = function (spec) {
            if (spec && spec instanceof ChainableAttributeSpec) {
                return spec;
            }
            return typeof spec === 'function' ? type(spec) : value(spec);
        };
        return ChainableAttributeSpec;
    }());
    function emptyFunction() { }
    function type(type, value) {
        if (type instanceof ChainableAttributeSpec)
            return type;
        var defaultValue = type && value === void 0 ? getMetatype(type).defaultValue : value;
        return new ChainableAttributeSpec({
            type: type,
            value: defaultValue,
            hasCustomDefault: defaultValue !== void 0
        });
    }
    function value(x) {
        var Type = inferType(x);
        if (Type && Type.prototype instanceof Transactional) {
            Type = Type.shared;
        }
        return type(Type).value(x);
    }
    function inferType(value) {
        switch (typeof value) {
            case 'number':
                return Number;
            case 'string':
                return String;
            case 'boolean':
                return Boolean;
            case 'function':
                return Function;
            case 'undefined':
                return void 0;
            case 'object':
                return value ? value.constructor : void 0;
        }
    }
    function createSharedTypeSpec(Constructor, Attribute) {
        if (!Constructor.hasOwnProperty('shared')) {
            Object.defineProperty(Constructor, 'shared', {
                get: function () {
                    return new ChainableAttributeSpec({
                        value: null,
                        type: Constructor,
                        _metatype: Attribute
                    });
                }
            });
        }
    }

    function createAttribute(spec, name) {
        return AnyType.create(ChainableAttributeSpec.from(spec).options, name);
    }
    function createAttributesMixin(attributesDefinition, baseClassAttributes) {
        var myAttributes = transform({}, attributesDefinition, createAttribute), allAttributes = defaults({}, myAttributes, baseClassAttributes);
        var ConstructorsMixin = constructorsMixin(allAttributes);
        return __assign({}, ConstructorsMixin, { _attributes: new ConstructorsMixin.AttributesCopy(allAttributes), _attributesArray: Object.keys(allAttributes).map(function (key) { return allAttributes[key]; }), properties: transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }) }, localEventsMixin(myAttributes), { _endpoints: transform({}, allAttributes, function (attrDef) { return attrDef.options.endpoint; }) });
    }
    function localEventsMixin(attrSpecs) {
        var _localEvents;
        for (var key in attrSpecs) {
            var attribute = attrSpecs[key], _onChange = attribute.options._onChange;
            if (_onChange) {
                _localEvents || (_localEvents = new EventMap());
                _localEvents.addEvent('change:' + key, typeof _onChange === 'string' ?
                    createWatcherFromRef(_onChange, key) :
                    wrapWatcher(_onChange, key));
            }
        }
        return _localEvents ? { _localEvents: _localEvents } : {};
    }
    function wrapWatcher(watcher, key) {
        return function (record, value$$1) {
            watcher.call(record, value$$1, key);
        };
    }
    function createWatcherFromRef(ref, key) {
        var _a = new CompiledReference(ref, true), local = _a.local, resolve = _a.resolve, tail = _a.tail;
        return local ?
            function (record, value$$1) {
                record[tail](value$$1, key);
            } :
            function (record, value$$1) {
                resolve(record)[tail](value$$1, key);
            };
    }

    var IORecordMixin = {
        save: function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var endpoint = this.getEndpoint(), json = this.toJSON(options);
            return startIO(this, this.isNew() ?
                endpoint.create(json, options, this) :
                endpoint.update(this.id, json, options, this), options, function (update) {
                _this.set(update, __assign({ parse: true }, options));
            });
        },
        fetch: function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            return startIO(this, this.getEndpoint().read(this.id, options, this), options, function (json) { return _this.set(json, __assign({ parse: true }, options)); });
        },
        destroy: function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            return startIO(this, this.getEndpoint().destroy(this.id, options, this), options, function () {
                var collection = _this.collection;
                if (collection) {
                    collection.remove(_this, options);
                }
                else {
                    _this.dispose();
                }
                return _this;
            });
        }
    };

    var assign$3 = assign, isEmpty$1 = isEmpty;
    var _cidCounter = 0;
    var Record = (function (_super) {
        __extends(Record, _super);
        function Record(a_values, a_options) {
            var _this = _super.call(this, _cidCounter++) || this;
            _this.attributes = {};
            var options = a_options || {}, values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
            isProduction || typeCheck(_this, values, options);
            _this._previousAttributes = _this.attributes = new _this.Attributes(_this, values, options);
            _this.initialize(a_values, a_options);
            if (_this._localEvents)
                _this._localEvents.subscribe(_this, _this);
            return _this;
        }
        Record_1 = Record;
        Record.onDefine = function (definition, BaseClass) { };
        Object.defineProperty(Record, "ref", {
            get: function () {
                var _this = this;
                return type(this)
                    .toJSON(function (x) { return x ? x.id : null; })
                    .parse(function (x) {
                    var _a;
                    return _a = {}, _a[_this.prototype.idAttribute] = x, _a;
                });
            },
            enumerable: true,
            configurable: true
        });
        Record.defaults = function (attrs) {
            return this.extend({ attributes: attrs });
        };
        Record.prototype.save = function (options) { throw new Error('Implemented by mixin'); };
        Record.prototype.destroy = function (options) { throw new Error('Implemented by mixin'); };
        Record.prototype.previousAttributes = function () { return new this.AttributesCopy(this._previousAttributes); };
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
                    var attributes = this.attributes;
                    for (var _i = 0, _a = this._attributesArray; _i < _a.length; _i++) {
                        var attr = _a[_i];
                        var key = attr.name, value$$1 = attributes[key];
                        if (attr.isChanged(value$$1, prev[key])) {
                            changed[key] = value$$1;
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
                return this.hasChanged() ? assign$3({}, this.changed) : false;
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
                !isEmpty$1(this.changed);
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
            var _a;
            var value$$1 = this[key];
            this.set((_a = {}, _a[key] = void 0, _a), __assign({ unset: true }, options));
            return value$$1;
        };
        Record.prototype.clear = function (options) {
            var _this = this;
            var nullify = options && options.nullify;
            this.transaction(function () {
                _this.forEach(function (value$$1, key) { return _this[key] = nullify ? null : void 0; });
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
        Record.prototype.defaults = function (values) {
            if (values === void 0) { values = {}; }
            var defaults$$1 = {}, _attributesArray = this._attributesArray;
            for (var _i = 0, _attributesArray_1 = _attributesArray; _i < _attributesArray_1.length; _i++) {
                var attr = _attributesArray_1[_i];
                var key = attr.name, value$$1 = values[key];
                defaults$$1[key] = value$$1 === void 0 ? attr.defaultValue() : value$$1;
            }
            return defaults$$1;
        };
        Record.prototype.initialize = function (values, options) { };
        Record.prototype.clone = function (options) {
            if (options === void 0) { options = {}; }
            var copy = new this.constructor(this.attributes, { clone: true });
            if (options.pinStore)
                copy._defaultStore = this.getStore();
            return copy;
        };
        Record.prototype._validateNested = function (errors) {
            var length = 0;
            var attributes = this.attributes;
            for (var _i = 0, _a = this._attributesArray; _i < _a.length; _i++) {
                var attribute = _a[_i];
                var name_1 = attribute.name, error = attribute.validate(this, attributes[name_1], name_1);
                if (error) {
                    errors[name_1] = error;
                    length++;
                }
            }
            return length;
        };
        Record.prototype.get = function (key) {
            return this[key];
        };
        Record.prototype.set = function (values, options) {
            if (values) {
                var transaction = this._createTransaction(values, options);
                transaction && transaction.commit();
            }
            return this;
        };
        Record.prototype.toJSON = function (options) {
            var json = {}, attributes = this.attributes;
            for (var _i = 0, _a = this._attributesArray; _i < _a.length; _i++) {
                var attribute = _a[_i];
                var name_2 = attribute.name, value$$1 = attributes[name_2];
                if (value$$1 !== void 0) {
                    var asJson = attribute.toJSON.call(this, value$$1, name_2, options);
                    if (asJson !== void 0)
                        json[name_2] = asJson;
                }
            }
            return json;
        };
        Record.prototype.parse = function (data, options) {
            return data;
        };
        Record.prototype.deepSet = function (name, value$$1, options) {
            var _this = this;
            this.transaction(function () {
                var _a;
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
                    model.set((_a = {}, _a[attr] = value$$1, _a), options);
                }
                else {
                    model[attr] = value$$1;
                }
            });
            return this;
        };
        Object.defineProperty(Record.prototype, "collection", {
            get: function () {
                return this._ownerKey ? null : this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Record.prototype.dispose = function () {
            if (this._disposed)
                return;
            var attributes = this.attributes;
            for (var _i = 0, _a = this._attributesArray; _i < _a.length; _i++) {
                var attr = _a[_i];
                attr.dispose(this, attributes[attr.name]);
            }
            _super.prototype.dispose.call(this);
        };
        Record.prototype._log = function (level, topic, text, props, a_logger) {
            (a_logger || logger).trigger(level, topic, this.getClassName() + ' ' + text, __assign({}, props, { 'Record': this, 'Attributes definition': this._attributes }));
        };
        Record.prototype.getClassName = function () {
            return _super.prototype.getClassName.call(this) || 'Record';
        };
        Record.prototype._createTransaction = function (values, options) { return void 0; };
        Record.prototype.forEach = function (iteratee, context) {
            var fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, attributes = this.attributes;
            for (var key in this.attributes) {
                var value$$1 = attributes[key];
                if (value$$1 !== void 0)
                    fun(value$$1, key);
            }
        };
        Record.prototype.mapObject = function (a_fun, context) {
            var fun = context === void 0 ? a_fun : a_fun.bind(context);
            return transform({}, this.attributes, fun);
        };
        Record.prototype[Symbol.iterator] = function () {
            return new RecordEntriesIterator(this);
        };
        Record.prototype.entries = function () {
            return new RecordEntriesIterator(this);
        };
        Record.prototype.keys = function () {
            var keys$$1 = [];
            this.forEach(function (value$$1, key) { return keys$$1.push(key); });
            return keys$$1;
        };
        var Record_1;
        Record._metatype = AggregatedType;
        Record.id = type(String).value(null);
        Record = Record_1 = __decorate([
            define({
                cidPrefix: 'm',
                _changeEventName: 'change',
                idAttribute: 'id'
            }),
            definitions({
                defaults: mixinRules.merge,
                attributes: mixinRules.merge,
                collection: mixinRules.merge,
                Collection: mixinRules.value,
                idAttribute: mixinRules.protoValue
            })
        ], Record);
        return Record;
    }(Transactional));
    assign$3(Record.prototype, UpdateRecordMixin, IORecordMixin);
    var BaseRecordAttributes = (function () {
        function BaseRecordAttributes(record, x, options) {
            this.id = x.id;
        }
        return BaseRecordAttributes;
    }());
    Record.prototype.Attributes = BaseRecordAttributes;
    var BaseRecordAttributesCopy = (function () {
        function BaseRecordAttributesCopy(x) {
            this.id = x.id;
        }
        return BaseRecordAttributesCopy;
    }());
    Record.prototype.AttributesCopy = BaseRecordAttributesCopy;
    var IdAttribute = AnyType.create({ value: void 0 }, 'id');
    Record.prototype._attributes = { id: IdAttribute };
    Record.prototype._attributesArray = [IdAttribute];
    function typeCheck(record, values, options) {
        if (shouldBeAnObject(record, values, options)) {
            var _attributes = record._attributes;
            var unknown = void 0;
            for (var name_3 in values) {
                if (!_attributes[name_3]) {
                    unknown || (unknown = []);
                    unknown.push("'" + name_3 + "'");
                }
            }
            if (unknown) {
                unknownAttrsWarning(record, unknown, { values: values }, options);
            }
        }
    }
    var RecordEntriesIterator = (function () {
        function RecordEntriesIterator(record) {
            this.record = record;
            this.idx = 0;
        }
        RecordEntriesIterator.prototype.next = function () {
            var record = this.record, metatype = record._attributesArray[this.idx++];
            return {
                done: !metatype,
                value: metatype ? [metatype.name, record[metatype.name]] : void 0
            };
        };
        return RecordEntriesIterator;
    }());

    var assign$4 = assign, defaults$1 = defaults;
    Record.onExtend = function (BaseClass) {
        Transactional.onExtend.call(this, BaseClass);
        var Class = this;
        var DefaultCollection = (function (_super) {
            __extends(DefaultCollection, _super);
            function DefaultCollection() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DefaultCollection.model = Class;
            DefaultCollection = __decorate([
                predefine
            ], DefaultCollection);
            return DefaultCollection;
        }(BaseClass.Collection));
        this.DefaultCollection = DefaultCollection;
        if (Class.Collection === BaseClass.Collection) {
            this.Collection = DefaultCollection;
        }
        createSharedTypeSpec(this, SharedType);
    };
    Record.onDefine = function (definition, BaseClass) {
        var baseProto = BaseClass.prototype;
        var _a = createAttributesMixin(this.attributes = getAttributes(definition), baseProto._attributes), properties = _a.properties, _localEvents = _a._localEvents, dynamicMixin = __rest(_a, ["properties", "_localEvents"]);
        assign$4(this.prototype, dynamicMixin);
        definition.properties = defaults$1(definition.properties || {}, properties);
        definition._localEvents = _localEvents;
        Transactional.onDefine.call(this, definition, BaseClass);
        this.DefaultCollection.define(definition.collection || {});
        this.Collection = definition.Collection;
        this.Collection.prototype.model = this;
        if (definition.endpoint)
            this.Collection.prototype._endpoint = definition.endpoint;
    };
    createSharedTypeSpec(Record, SharedType);
    function getAttributes(_a) {
        var defaults$$1 = _a.defaults, attributes = _a.attributes, idAttribute = _a.idAttribute;
        var definition = attributes || defaults$$1 || {};
        if (idAttribute && !(idAttribute in definition)) {
            definition[idAttribute] = void 0;
        }
        return definition;
    }
    function attr(proto, attrName) {
        if (attrName) {
            if (typeof Reflect !== 'undefined' && Reflect.getMetadata) {
                type(Reflect.getMetadata("design:type", proto, attrName)).asProp(proto, attrName);
            }
            else {
                proto._log('error', 'Type-R:MissingImport', 'Add import "reflect-metadata"; as the first line of your app.');
            }
        }
        else {
            return ChainableAttributeSpec.from(proto).asProp;
        }
    }
    function prop(spec) {
        return spec.asProp;
    }

    var trigger2$2 = trigger2, trigger3$4 = trigger3, on$4 = on, off$4 = off, commit$1 = transactionApi.commit, _aquire = transactionApi.aquire, _free = transactionApi.free;
    function convertAndAquire(collection, attrs, options) {
        var model = collection.model;
        var record;
        if (collection._shared) {
            record = attrs instanceof model ? attrs : model.create(attrs, options);
            if (collection._shared & exports.ItemsBehavior.listen) {
                on$4(record, record._changeEventName, collection._onChildrenChange, collection);
            }
        }
        else {
            record = attrs instanceof model ? (options.merge ? attrs.clone() : attrs) : model.create(attrs, options);
            if (record._owner) {
                record = record.clone();
                var errors = collection._aggregationError || (collection._aggregationError = []);
                errors.push(record);
            }
            _aquire(collection, record);
        }
        var _itemEvents = collection._itemEvents;
        _itemEvents && _itemEvents.subscribe(collection, record);
        return record;
    }
    function free$2(owner, child, unset) {
        if (owner._shared) {
            if (owner._shared & exports.ItemsBehavior.listen) {
                off$4(child, child._changeEventName, owner._onChildrenChange, owner);
            }
        }
        else {
            _free(owner, child);
            unset || child.dispose();
        }
        var _itemEvents = owner._itemEvents;
        _itemEvents && _itemEvents.unsubscribe(owner, child);
    }
    function freeAll(collection, children) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            free$2(collection, child);
        }
        return children;
    }
    function sortElements(collection, options) {
        var _comparator = collection._comparator;
        if (_comparator && options.sort !== false) {
            collection.models.sort(_comparator);
            return true;
        }
        return false;
    }
    function addIndex(index, model) {
        index[model.cid] = model;
        var id = model.id;
        if (id || id === 0) {
            index[id] = model;
        }
    }
    function removeIndex(index, model) {
        delete index[model.cid];
        var id = model.id;
        if (id || id === 0) {
            delete index[id];
        }
    }
    function updateIndex(index, model) {
        delete index[model.previous(model.idAttribute)];
        var id = model.id;
        id == null || (index[id] = model);
    }
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
                logAggregationError(object, _isDirty);
            }
            for (var _b = 0, nested_2 = nested; _b < nested_2.length; _b++) {
                var transaction = nested_2[_b];
                trigger2$2(object, 'change', transaction.object, _isDirty);
            }
            var _c = this, added = _c.added, removed = _c.removed;
            for (var _d = 0, added_1 = added; _d < added_1.length; _d++) {
                var record = added_1[_d];
                trigger3$4(record, 'add', record, object, _isDirty);
                trigger3$4(object, 'add', record, object, _isDirty);
            }
            for (var _e = 0, removed_1 = removed; _e < removed_1.length; _e++) {
                var record = removed_1[_e];
                trigger3$4(record, 'remove', record, object, _isDirty);
                trigger3$4(object, 'remove', record, object, _isDirty);
            }
            if (this.sorted) {
                trigger2$2(object, 'sort', object, _isDirty);
            }
            if (added.length || removed.length) {
                trigger2$2(object, 'update', object, _isDirty);
            }
            this.isRoot && commit$1(object, initiator);
        };
        return CollectionTransaction;
    }());
    function logAggregationError(collection, options) {
        collection._log('error', 'Type-R:InvalidOwner', 'added records already have an owner and were cloned. Use explicit record.clone() to dismiss this wearning.', collection._aggregationError, options.logger);
        collection._aggregationError = void 0;
    }

    var begin$1 = transactionApi.begin, commit$2 = transactionApi.commit, markAsDirty$1 = transactionApi.markAsDirty;
    function addTransaction(collection, items, options, merge) {
        var isRoot = begin$1(collection), nested = [];
        var added = appendElements(collection, items, nested, options, merge);
        if (added.length || nested.length) {
            var needSort = sortOrMoveElements(collection, added, options);
            if (markAsDirty$1(collection, options)) {
                return new CollectionTransaction(collection, isRoot, added, [], nested, needSort);
            }
            if (collection._aggregationError)
                logAggregationError(collection, options);
        }
        isRoot && commit$2(collection);
    }
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
        return sortElements(collection, options);
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
                        updateIndex(_byId, model);
                    }
                }
            }
            else {
                model = convertAndAquire(collection, item, a_options);
                models.push(model);
                addIndex(_byId, model);
            }
        }
        return models.slice(prevLength);
    }

    var trigger2$3 = trigger2, trigger3$5 = trigger3, markAsDirty$2 = transactionApi.markAsDirty, begin$2 = transactionApi.begin, commit$3 = transactionApi.commit;
    function removeOne(collection, el, options) {
        var model = collection.get(el);
        if (model) {
            var isRoot = begin$2(collection), models = collection.models;
            models.splice(models.indexOf(model), 1);
            removeIndex(collection._byId, model);
            var notify = markAsDirty$2(collection, options);
            if (notify) {
                trigger3$5(model, 'remove', model, collection, options);
                trigger3$5(collection, 'remove', model, collection, options);
            }
            free$2(collection, model, options.unset);
            notify && trigger2$3(collection, 'update', collection, options);
            isRoot && commit$3(collection);
            return model;
        }
    }
    function removeMany(collection, toRemove, options) {
        var removed = _removeFromIndex(collection, toRemove, options.unset);
        if (removed.length) {
            var isRoot = begin$2(collection);
            _reallocate(collection, removed.length);
            if (markAsDirty$2(collection, options)) {
                var transaction = new CollectionTransaction(collection, isRoot, [], removed, [], false);
                transaction.commit();
            }
            else {
                isRoot && commit$3(collection);
            }
        }
        return removed;
    }
    function _removeFromIndex(collection, toRemove, unset) {
        var removed = Array(toRemove.length), _byId = collection._byId;
        for (var i = 0, j = 0; i < toRemove.length; i++) {
            var model = collection.get(toRemove[i]);
            if (model) {
                removed[j++] = model;
                removeIndex(_byId, model);
                free$2(collection, model, unset);
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

    var begin$3 = transactionApi.begin, commit$4 = transactionApi.commit, markAsDirty$3 = transactionApi.markAsDirty;
    var silentOptions = { silent: true };
    function emptySetTransaction(collection, items, options, silent) {
        var isRoot = begin$3(collection);
        var added = _reallocateEmpty(collection, items, options);
        if (added.length) {
            var needSort = sortElements(collection, options);
            if (markAsDirty$3(collection, silent ? silentOptions : options)) {
                return new CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
            }
            if (collection._aggregationError)
                logAggregationError(collection, options);
        }
        isRoot && commit$4(collection);
    }
    function setTransaction(collection, items, options) {
        var isRoot = begin$3(collection), nested = [];
        var previous = collection.models, added = _reallocate$1(collection, items, nested, options);
        var reusedCount = collection.models.length - added.length, removed = reusedCount < previous.length ? (reusedCount ? _garbageCollect(collection, previous) :
            freeAll(collection, previous)) : [];
        var addedOrChanged = nested.length || added.length, sorted = (sortElements(collection, options) && addedOrChanged) || added.length || options.sorted;
        if (addedOrChanged || removed.length || sorted) {
            if (markAsDirty$3(collection, options)) {
                return new CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
            }
            if (collection._aggregationError)
                logAggregationError(collection, options);
        }
        isRoot && commit$4(collection);
    }
    function _garbageCollect(collection, previous) {
        var _byId = collection._byId, removed = [];
        for (var _i = 0, previous_1 = previous; _i < previous_1.length; _i++) {
            var record = previous_1[_i];
            if (!_byId[record.cid]) {
                removed.push(record);
                free$2(collection, record);
            }
        }
        return removed;
    }
    function _reallocate$1(collection, source, nested, options) {
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
                model = convertAndAquire(collection, item, options);
                toAdd.push(model);
            }
            models[j++] = model;
            addIndex(_byId, model);
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
            var model = convertAndAquire(self, src, options);
            models[j++] = model;
            addIndex(_byId, model);
        }
        models.length = j;
        self._byId = _byId;
        return self.models = models;
    }

    var trigger2$4 = trigger2, begin$4 = transactionApi.begin, commit$5 = transactionApi.commit, markAsDirty$4 = transactionApi.markAsDirty, assign$5 = assign, defaults$2 = defaults;
    var _count = 0;
    var CollectionRefsType = (function (_super) {
        __extends(CollectionRefsType, _super);
        function CollectionRefsType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CollectionRefsType.defaultValue = [];
        return CollectionRefsType;
    }(SharedType));
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(records, options, shared$$1) {
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
            _this._shared = shared$$1 || 0;
            if (records) {
                var elements = toElements(_this, records, options);
                emptySetTransaction(_this, elements, options, true);
            }
            _this.initialize.apply(_this, arguments);
            if (_this._localEvents)
                _this._localEvents.subscribe(_this, _this);
            return _this;
        }
        Collection_1 = Collection;
        Collection.prototype.createSubset = function (models, options) {
            var SubsetOf = this.constructor.subsetOf(this).options.type, subset = new SubsetOf(models, options);
            subset.resolve(this);
            return subset;
        };
        Collection.onExtend = function (BaseClass) {
            var Ctor = this;
            this._SubsetOf = null;
            function RefsCollection(a, b, listen) {
                Ctor.call(this, a, b, exports.ItemsBehavior.share | (listen ? exports.ItemsBehavior.listen : 0));
            }
            Mixable.mixins.populate(RefsCollection);
            RefsCollection.prototype = this.prototype;
            RefsCollection._metatype = CollectionRefsType;
            this.Refs = this.Subset = RefsCollection;
            Transactional.onExtend.call(this, BaseClass);
            createSharedTypeSpec(this, SharedType);
        };
        Collection.onDefine = function (definition, BaseClass) {
            if (definition.itemEvents) {
                var eventsMap = new EventMap(BaseClass.prototype._itemEvents);
                eventsMap.addEventsMap(definition.itemEvents);
                this.prototype._itemEvents = eventsMap;
            }
            if (definition.comparator !== void 0)
                this.prototype.comparator = definition.comparator;
            Transactional.onDefine.call(this, definition);
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
                updateIndex(this._byId, record);
            }
            var isRoot = begin$4(this);
            if (markAsDirty$4(this, options)) {
                trigger2$4(this, 'change', record, options);
            }
            isRoot && commit$5(this);
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
            this.models.forEach(iteratee, context);
        };
        Collection.prototype.updateEach = function (iteratee) {
            var isRoot = transactionApi.begin(this);
            this.models.forEach(iteratee);
            isRoot && transactionApi.commit(this);
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
        Collection.prototype.first = function () { return this.models[0]; };
        Collection.prototype.last = function () { return this.models[this.models.length - 1]; };
        Collection.prototype.at = function (a_index) {
            var index = a_index < 0 ? a_index + this.models.length : a_index;
            return this.models[index];
        };
        Collection.prototype.clone = function (options) {
            if (options === void 0) { options = {}; }
            var models = this._shared & exports.ItemsBehavior.share ? this.models : this.map(function (model) { return model.clone(); }), copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
            if (options.pinStore)
                copy._defaultStore = this.getStore();
            return copy;
        };
        Collection.prototype.toJSON = function (options) {
            return this.models.map(function (model) { return model.toJSON(options); });
        };
        Collection.prototype.set = function (elements, options) {
            if (elements === void 0) { elements = []; }
            if (options === void 0) { options = {}; }
            if (options.add !== void 0) {
                this._log('warn', "Type-R:InvalidOption", "Collection.set doesn't support 'add' option, behaving as if options.add === true.", options);
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
        Collection.prototype.liveUpdates = function (enabled) {
            var _this = this;
            if (enabled) {
                this.liveUpdates(false);
                var filter_1 = typeof enabled === 'function' ? enabled : function () { return true; };
                this._liveUpdates = {
                    updated: function (json) {
                        filter_1(json) && _this.add(json, { parse: true, merge: true });
                    },
                    removed: function (id) { return _this.remove(id); }
                };
                return this.getEndpoint().subscribe(this._liveUpdates, this).then(function () { return _this; });
            }
            else {
                if (this._liveUpdates) {
                    this.getEndpoint().unsubscribe(this._liveUpdates, this);
                    this._liveUpdates = null;
                }
            }
        };
        Collection.prototype.fetch = function (a_options) {
            var _this = this;
            if (a_options === void 0) { a_options = {}; }
            var options = __assign({ parse: true }, a_options), endpoint = this.getEndpoint();
            return startIO(this, endpoint.list(options, this), options, function (json) {
                var result = _this.set(json, __assign({ parse: true }, options));
                if (options.liveUpdates) {
                    result = _this.liveUpdates(options.liveUpdates);
                }
                return result;
            });
        };
        Collection.prototype.dispose = function () {
            if (this._disposed)
                return;
            var aggregated = !this._shared;
            for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
                var record = _a[_i];
                free$2(this, record);
                if (aggregated)
                    record.dispose();
            }
            this.liveUpdates(false);
            _super.prototype.dispose.call(this);
        };
        Collection.prototype.reset = function (a_elements, options) {
            if (options === void 0) { options = {}; }
            var isRoot = begin$4(this), previousModels = this.models;
            if (a_elements) {
                emptySetTransaction(this, toElements(this, a_elements, options), options, true);
            }
            else {
                this._byId = {};
                this.models = [];
            }
            markAsDirty$4(this, options);
            options.silent || trigger2$4(this, 'reset', this, defaults$2({ previousModels: previousModels }, options));
            var _byId = this._byId;
            for (var _i = 0, previousModels_1 = previousModels; _i < previousModels_1.length; _i++) {
                var toDispose = previousModels_1[_i];
                _byId[toDispose.cid] || free$2(this, toDispose);
            }
            isRoot && commit$5(this);
            return this.models;
        };
        Collection.prototype.add = function (a_elements, options) {
            if (options === void 0) { options = {}; }
            var elements = toElements(this, a_elements, options), transaction = this.models.length ?
                addTransaction(this, elements, options) :
                emptySetTransaction(this, elements, options);
            if (transaction) {
                transaction.commit();
                return transaction.added;
            }
        };
        Collection.prototype.remove = function (recordsOrIds, options) {
            if (options === void 0) { options = {}; }
            if (recordsOrIds) {
                return Array.isArray(recordsOrIds) ?
                    removeMany(this, recordsOrIds, options) :
                    removeOne(this, recordsOrIds, options);
            }
            return [];
        };
        Collection.prototype._createTransaction = function (a_elements, options) {
            if (options === void 0) { options = {}; }
            var elements = toElements(this, a_elements, options);
            if (this.models.length) {
                return options.remove === false ?
                    addTransaction(this, elements, options, true) :
                    setTransaction(this, elements, options);
            }
            else {
                return emptySetTransaction(this, elements, options);
            }
        };
        Collection.prototype.pluck = function (key) {
            return this.models.map(function (model) { return model[key]; });
        };
        Collection.prototype.sort = function (options) {
            if (options === void 0) { options = {}; }
            if (sortElements(this, options)) {
                var isRoot = begin$4(this);
                if (markAsDirty$4(this, options)) {
                    trigger2$4(this, 'sort', this, options);
                }
                isRoot && commit$5(this);
            }
            return this;
        };
        Collection.prototype.unset = function (modelOrId, options) {
            var value$$1 = this.get(modelOrId);
            this.remove(modelOrId, __assign({ unset: true }, options));
            return value$$1;
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
        Collection.prototype._log = function (level, topic, text, value$$1, a_logger) {
            (a_logger || logger).trigger(level, topic, this.model.prototype.getClassName() + "." + this.getClassName() + ": " + text, {
                Argument: value$$1,
                'Attributes spec': this.model.prototype._attributes
            });
        };
        Collection.prototype.getClassName = function () {
            return _super.prototype.getClassName.call(this) || 'Collection';
        };
        Object.defineProperty(Collection.prototype, "length", {
            get: function () { return this.models.length; },
            enumerable: true,
            configurable: true
        });
        Collection.prototype.push = function (model, options) {
            return this.add(model, assign$5({ at: this.length }, options));
        };
        Collection.prototype.pop = function (options) {
            var model = this.at(this.length - 1);
            this.remove(model, __assign({ unset: true }, options));
            return model;
        };
        Collection.prototype.unshift = function (model, options) {
            return this.add(model, assign$5({ at: 0 }, options));
        };
        Collection.prototype.shift = function (options) {
            var model = this.at(0);
            this.remove(model, __assign({ unset: true }, options));
            return model;
        };
        Collection.prototype.slice = function (begin, end) {
            return this.models.slice(begin, end);
        };
        Collection.prototype.indexOf = function (modelOrId) {
            return this.models.indexOf(this.get(modelOrId));
        };
        Collection.prototype.filter = function (iteratee, context) {
            return this.models.filter(toPredicateFunction(iteratee), context);
        };
        Collection.prototype.find = function (iteratee, context) {
            return this.models.find(toPredicateFunction(iteratee), context);
        };
        Collection.prototype.some = function (iteratee, context) {
            return this.models.some(toPredicateFunction(iteratee), context);
        };
        Collection.prototype.forEach = function (iteratee, context) {
            this.models.forEach(iteratee, context);
        };
        Collection.prototype[Symbol.iterator] = function () {
            return this.models[Symbol.iterator]();
        };
        Collection.prototype.values = function () {
            return this.models.values();
        };
        Collection.prototype.entries = function () {
            return this.models.entries();
        };
        Collection.prototype.every = function (iteratee, context) {
            return this.models.every(toPredicateFunction(iteratee), context);
        };
        Collection.prototype.includes = function (idOrObj) {
            return Boolean(this.get(idOrObj));
        };
        Collection.prototype.map = function (iteratee, context) {
            return this.models.map(iteratee, context);
        };
        Collection.prototype.reduce = function (iteratee, init) {
            return init === void 0 ? this.models.reduce(iteratee) : this.models.reduce(iteratee, init);
        };
        var Collection_1;
        Collection._metatype = AggregatedType;
        Collection = Collection_1 = __decorate([
            define({
                cidPrefix: 'c',
                model: Record,
                _changeEventName: 'changes',
                _aggregationError: null
            }),
            definitions({
                comparator: mixinRules.value,
                model: mixinRules.protoValue,
                itemEvents: mixinRules.merge
            })
        ], Collection);
        return Collection;
    }(Transactional));
    function toElements(collection, elements, options) {
        var parsed = options.parse ? collection.parse(elements, options) : elements;
        return Array.isArray(parsed) ? parsed : [parsed];
    }
    createSharedTypeSpec(Collection, SharedType);
    Record.Collection = Collection;
    function toPredicateFunction(iteratee) {
        switch (typeof iteratee) {
            case 'function': return iteratee;
            case 'object':
                var keys_1 = Object.keys(iteratee);
                return function (x) {
                    for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
                        var key = keys_2[_i];
                        if (iteratee[key] !== x[key])
                            return false;
                    }
                    return true;
                };
            default: throw new Error('Invalid iteratee');
        }
    }

    function parseReference(collectionRef) {
        switch (typeof collectionRef) {
            case 'function':
                return function (root) { return collectionRef.call(root); };
            case 'object':
                return function () { return collectionRef; };
            case 'string':
                var resolve = new CompiledReference(collectionRef).resolve;
                return resolve;
        }
    }

    var RecordRefType = (function (_super) {
        __extends(RecordRefType, _super);
        function RecordRefType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RecordRefType.prototype.toJSON = function (value$$1) {
            return value$$1 && typeof value$$1 === 'object' ? value$$1.id : value$$1;
        };
        RecordRefType.prototype.clone = function (value$$1) {
            return value$$1 && typeof value$$1 === 'object' ? value$$1.id : value$$1;
        };
        RecordRefType.prototype.isChanged = function (a, b) {
            var aId = a && (a.id == null ? a : a.id), bId = b && (b.id == null ? b : b.id);
            return aId !== bId;
        };
        RecordRefType.prototype.validate = function (model, value$$1, name) { };
        return RecordRefType;
    }(AnyType));
    function from(path, T) {
        if (T === void 0) { T = Record; }
        return T.from(path);
    }
    Record.from = function from(masterCollection) {
        var getMasterCollection = parseReference(masterCollection);
        var typeSpec = new ChainableAttributeSpec({
            value: null,
            _metatype: RecordRefType
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
                record && this._attributes[name].handleChange(record, null, this, {});
            }
            return record;
        });
    };

    Collection.subsetOf = function subsetOf(masterCollection) {
        var SubsetOf = this._SubsetOf || (this._SubsetOf = defineSubsetCollection(this)), getMasterCollection = parseReference(masterCollection), typeSpec = new ChainableAttributeSpec({
            type: SubsetOf
        });
        return typeSpec.get(function (refs) {
            !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
            return refs;
        });
    };
    function subsetOf(path, T) {
        if (T === void 0) { T = Collection; }
        return T.subsetOf(path);
    }
    var subsetOfBehavior = exports.ItemsBehavior.share | exports.ItemsBehavior.persistent;
    function defineSubsetCollection(CollectionConstructor) {
        var SubsetOfCollection = (function (_super) {
            __extends(SubsetOfCollection, _super);
            function SubsetOfCollection(recordsOrIds, options) {
                var _this = _super.call(this, [], options, subsetOfBehavior) || this;
                _this.resolvedWith = null;
                _this.refs = toArray(recordsOrIds);
                return _this;
            }
            Object.defineProperty(SubsetOfCollection.prototype, "__inner_state__", {
                get: function () { return this.refs || this.models; },
                enumerable: true,
                configurable: true
            });
            SubsetOfCollection.prototype.add = function (a_elements, options) {
                if (options === void 0) { options = {}; }
                var resolvedWith = this.resolvedWith, toAdd = toArray(a_elements);
                if (resolvedWith) {
                    return _super.prototype.add.call(this, resolveRefs(resolvedWith, toAdd), options);
                }
                else {
                    if (toAdd.length) {
                        var isRoot = transactionApi.begin(this);
                        this.refs = this.refs ? this.refs.concat(toAdd) : toAdd.slice();
                        transactionApi.markAsDirty(this, options);
                        isRoot && transactionApi.commit(this);
                    }
                }
            };
            SubsetOfCollection.prototype.reset = function (a_elements, options) {
                if (options === void 0) { options = {}; }
                var resolvedWith = this.resolvedWith, elements = toArray(a_elements);
                return resolvedWith ?
                    _super.prototype.reset.call(this, resolveRefs(resolvedWith, elements), options) :
                    delaySet(this, elements, options) || [];
            };
            SubsetOfCollection.prototype._createTransaction = function (a_elements, options) {
                var resolvedWith = this.resolvedWith, elements = toArray(a_elements);
                return resolvedWith ?
                    _super.prototype._createTransaction.call(this, resolveRefs(resolvedWith, elements), options) :
                    delaySet(this, elements, options);
            };
            SubsetOfCollection.prototype.toJSON = function () {
                return this.refs ?
                    this.refs.map(function (objOrId) { return objOrId.id || objOrId; }) :
                    this.models.map(function (model) { return model.id; });
            };
            SubsetOfCollection.prototype._validateNested = function () { return 0; };
            Object.defineProperty(SubsetOfCollection.prototype, "length", {
                get: function () {
                    return this.models.length || (this.refs ? this.refs.length : 0);
                },
                enumerable: true,
                configurable: true
            });
            SubsetOfCollection.prototype.clone = function (owner) {
                var Ctor = this.constructor, copy = new Ctor([], {
                    model: this.model,
                    comparator: this.comparator
                });
                if (this.resolvedWith) {
                    copy.resolvedWith = this.resolvedWith;
                    copy.refs = null;
                    copy.reset(this.models, { silent: true });
                }
                else {
                    copy.refs = this.refs.slice();
                }
                return copy;
            };
            SubsetOfCollection.prototype.parse = function (raw) {
                return raw;
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
                if (this.resolvedWith) {
                    this.set(this.resolvedWith.models);
                    return this.models;
                }
                throw new Error("Cannot add elemens because the subset collection is not resolved yet.");
            };
            SubsetOfCollection.prototype.toggleAll = function () {
                return this.length ? this.reset() : this.addAll();
            };
            SubsetOfCollection = __decorate([
                define
            ], SubsetOfCollection);
            return SubsetOfCollection;
        }(CollectionConstructor));
        SubsetOfCollection.prototype._itemEvents = void 0;
        return SubsetOfCollection;
    }
    function resolveRefs(master, elements) {
        var records = [];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var el = elements_1[_i];
            var record = master.get(el);
            if (record)
                records.push(record);
        }
        return records;
    }
    function delaySet(collection, elements, options) {
        if (notEqual(collection.refs, elements)) {
            var isRoot = transactionApi.begin(collection);
            collection.refs = elements.slice();
            transactionApi.markAsDirty(collection, options);
            isRoot && transactionApi.commit(collection);
        }
    }
    function toArray(elements) {
        return elements ? (Array.isArray(elements) ? elements : [elements]) : [];
    }

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
                Transactional.prototype._defaultStore = _store = store;
            },
            enumerable: true,
            configurable: true
        });
        return Store;
    }(Record));
    Store.global = new Store();

    var _a;
    if (typeof Symbol === 'undefined') {
        Object.defineProperty(window, 'Symbol', { value: { iterator: 'Symbol.iterator' }, configurable: true });
    }
    var on$5 = (_a = Events, _a.on), off$5 = _a.off, trigger = _a.trigger, once$3 = _a.once, listenTo = _a.listenTo, stopListening = _a.stopListening, listenToOnce = _a.listenToOnce;
    function attributes(attrDefs) {
        var DefaultRecord = (function (_super) {
            __extends(DefaultRecord, _super);
            function DefaultRecord() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DefaultRecord.attributes = attrDefs;
            DefaultRecord = __decorate([
                define
            ], DefaultRecord);
            return DefaultRecord;
        }(Record));
        return DefaultRecord;
    }
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

    exports.Model = Record;
    exports.Class = Mixable;
    exports.on = on$5;
    exports.off = off$5;
    exports.trigger = trigger;
    exports.once = once$3;
    exports.listenTo = listenTo;
    exports.stopListening = stopListening;
    exports.listenToOnce = listenToOnce;
    exports.attributes = attributes;
    exports.transaction = transaction;
    exports.Collection = Collection;
    exports.getOwnerEndpoint = getOwnerEndpoint;
    exports.createIOPromise = createIOPromise;
    exports.startIO = startIO;
    exports.abortIO = abortIO;
    exports.triggerAndBubble = triggerAndBubble;
    exports.tools = tools;
    exports.eventsApi = eventsource;
    exports.EventMap = EventMap;
    exports.Messenger = Messenger;
    exports.Events = Events;
    exports.isProduction = isProduction;
    exports.logEvents = logEvents;
    exports.Logger = Logger;
    exports.logger = logger;
    exports.log = log;
    exports.Mixable = Mixable;
    exports.predefine = predefine;
    exports.define = define;
    exports.definitions = definitions;
    exports.propertyListDecorator = propertyListDecorator;
    exports.definitionDecorator = definitionDecorator;
    exports.MixinsState = MixinsState;
    exports.mixins = mixins;
    exports.mixinRules = mixinRules;
    exports.Record = Record;
    exports.attr = attr;
    exports.prop = prop;
    exports.ChainableAttributeSpec = ChainableAttributeSpec;
    exports.type = type;
    exports.value = value;
    exports.createSharedTypeSpec = createSharedTypeSpec;
    exports.getMetatype = getMetatype;
    exports.AnyType = AnyType;
    exports.ImmutableClassType = ImmutableClassType;
    exports.PrimitiveType = PrimitiveType;
    exports.NumericType = NumericType;
    exports.ArrayType = ArrayType;
    exports.ObjectType = ObjectType;
    exports.doNothing = doNothing;
    exports.FunctionType = FunctionType;
    exports.DateType = DateType;
    exports.AggregatedType = AggregatedType;
    exports.SharedType = SharedType;
    exports.shared = shared;
    exports.from = from;
    exports.subsetOf = subsetOf;
    exports.Store = Store;
    exports.Transactional = Transactional;
    exports.transactionApi = transactionApi;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
