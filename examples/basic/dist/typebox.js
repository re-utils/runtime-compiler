const __rtcpl_r__ = [], __rtcpl_aot_fns__ = [
	($) => {
		let External = $[1], check_6b7cc2cdfa418a80 = ((value) => External[0].every((refinement, _) => refinement.check(value)));
		return (value) => check_6b7cc2cdfa418a80(value);
	},
	($) => {
		let External = $[0], check_023660d1f3d5eb88 = ((value) => typeof value == "string" && External[0].test(value));
		return (value) => check_023660d1f3d5eb88(value);
	},
	void 0
], evaluate = (_) => __rtcpl_aot_fns__.pop()(__rtcpl_r__), ref = (v) => __rtcpl_r__.push(v) - 1;
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty, __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: !0
	});
	return no_symbols || __defProp(target, Symbol.toStringTag, { value: "Module" }), target;
};
//#endregion
//#region ../../node_modules/typebox/build/system/memory/metrics.mjs
/** TypeBox instantiation metrics */
const Metrics = {
	assign: 0,
	create: 0,
	clone: 0,
	discard: 0,
	update: 0
};
//#endregion
//#region ../../node_modules/typebox/build/guard/string.mjs
function IsBetween(value, min, max) {
	return value >= min && value <= max;
}
function IsRegionalIndicator(value) {
	return IsBetween(value, 127462, 127487);
}
function IsVariationSelector(value) {
	return IsBetween(value, 65024, 65039);
}
function IsCombiningMark$1(value) {
	return IsBetween(value, 768, 879) || IsBetween(value, 6832, 6911) || IsBetween(value, 7616, 7679) || IsBetween(value, 65056, 65071);
}
function CodePointLength(value) {
	return value > 65535 ? 2 : 1;
}
function ConsumeModifiers(value, index) {
	for (; index < value.length;) {
		let point = value.codePointAt(index);
		if (IsCombiningMark$1(point) || IsVariationSelector(point)) index += CodePointLength(point);
		else break;
	}
	return index;
}
function NextGraphemeClusterIndex(value, clusterStart) {
	let startCP = value.codePointAt(clusterStart), clusterEnd = clusterStart + CodePointLength(startCP);
	for (clusterEnd = ConsumeModifiers(value, clusterEnd); clusterEnd < value.length - 1 && value[clusterEnd] === "‍";) {
		let nextCP = value.codePointAt(clusterEnd + 1);
		clusterEnd += 1 + CodePointLength(nextCP), clusterEnd = ConsumeModifiers(value, clusterEnd);
	}
	return IsRegionalIndicator(startCP) && clusterEnd < value.length && IsRegionalIndicator(value.codePointAt(clusterEnd)) && (clusterEnd += CodePointLength(value.codePointAt(clusterEnd))), clusterEnd;
}
function IsGraphemeCodePoint(value) {
	return IsBetween(value, 55296, 56319) || IsBetween(value, 768, 879) || value === 8205;
}
/** Returns the number of grapheme clusters in a string */
function GraphemeCount$1(value) {
	let count = 0, index = 0;
	for (; index < value.length;) index = NextGraphemeClusterIndex(value, index), count++;
	return count;
}
/** Checks if a string has at least a minimum number of grapheme clusters */
function IsMinLength$3(value, minLength) {
	if (minLength === 0) return !0;
	let count = 0, index = 0;
	for (; index < value.length;) if (index = NextGraphemeClusterIndex(value, index), count++, count >= minLength) return !0;
	return !1;
}
/** Checks if a string has at most a maximum number of grapheme clusters */
function IsMaxLength$3(value, maxLength) {
	let count = 0, index = 0;
	for (; index < value.length;) if (index = NextGraphemeClusterIndex(value, index), count++, count > maxLength) return !1;
	return !0;
}
/** Fast check for minimum grapheme length, falls back to full check if needed */
function IsMinLengthFast(value, minLength) {
	if (minLength === 0) return !0;
	let index = 0;
	for (; index < value.length;) {
		if (IsGraphemeCodePoint(value.charCodeAt(index))) return IsMinLength$3(value, minLength);
		if (index++, index >= minLength) return !0;
	}
	return !1;
}
/** Fast check for maximum grapheme length, falls back to full check if needed */
function IsMaxLengthFast(value, maxLength) {
	let index = 0;
	for (; index < value.length;) {
		if (IsGraphemeCodePoint(value.charCodeAt(index))) return IsMaxLength$3(value, maxLength);
		if (index++, index > maxLength) return !1;
	}
	return !0;
}
//#endregion
//#region ../../node_modules/typebox/build/guard/guard.mjs
var guard_exports = /* @__PURE__ */ __exportAll({
	Entries: () => Entries$2,
	EntriesRegExp: () => EntriesRegExp,
	Every: () => Every$1,
	EveryAll: () => EveryAll,
	GraphemeCount: () => GraphemeCount,
	HasPropertyKey: () => HasPropertyKey$1,
	IsArray: () => IsArray$1,
	IsAsyncIterator: () => IsAsyncIterator$1,
	IsBigInt: () => IsBigInt$1,
	IsBoolean: () => IsBoolean$2,
	IsClassInstance: () => IsClassInstance,
	IsConstructor: () => IsConstructor$1,
	IsDeepEqual: () => IsDeepEqual$1,
	IsEqual: () => IsEqual$1,
	IsFunction: () => IsFunction$1,
	IsGreaterEqualThan: () => IsGreaterEqualThan$1,
	IsGreaterThan: () => IsGreaterThan$1,
	IsInteger: () => IsInteger$1,
	IsIterator: () => IsIterator$1,
	IsLessEqualThan: () => IsLessEqualThan$1,
	IsLessThan: () => IsLessThan$1,
	IsMaxLength: () => IsMaxLength$2,
	IsMinLength: () => IsMinLength$2,
	IsMultipleOf: () => IsMultipleOf$1,
	IsNull: () => IsNull$1,
	IsNumber: () => IsNumber$2,
	IsObject: () => IsObject$1,
	IsObjectNotArray: () => IsObjectNotArray$1,
	IsString: () => IsString$2,
	IsSymbol: () => IsSymbol$1,
	IsUndefined: () => IsUndefined$1,
	IsUnsafePropertyKey: () => IsUnsafePropertyKey,
	IsValueLike: () => IsValueLike,
	Keys: () => Keys$1,
	Symbols: () => Symbols,
	TakeLeft: () => TakeLeft,
	Values: () => Values
});
/** Returns true if this value is an array */
function IsArray$1(value) {
	return Array.isArray(value);
}
/** Returns true if this value is an async iterator */
function IsAsyncIterator$1(value) {
	return IsObject$1(value) && Symbol.asyncIterator in value;
}
/** Returns true if this value is bigint */
function IsBigInt$1(value) {
	return IsEqual$1(typeof value, "bigint");
}
/** Returns true if this value is a boolean */
function IsBoolean$2(value) {
	return IsEqual$1(typeof value, "boolean");
}
/** Returns true if this value is a constructor */
function IsConstructor$1(value) {
	if (IsUndefined$1(value) || !IsFunction$1(value)) return !1;
	let result = Function.prototype.toString.call(value);
	return !!(/^class\s/.test(result) || /\[native code\]/.test(result));
}
/** Returns true if this value is a function */
function IsFunction$1(value) {
	return IsEqual$1(typeof value, "function");
}
/** Returns true if this value is integer */
function IsInteger$1(value) {
	return Number.isInteger(value);
}
/** Returns true if this value is an iterator */
function IsIterator$1(value) {
	return IsObject$1(value) && Symbol.iterator in value;
}
/** Returns true if this value is null */
function IsNull$1(value) {
	return IsEqual$1(value, null);
}
/** Returns true if this value is number */
function IsNumber$2(value) {
	return Number.isFinite(value);
}
/** Returns true if this value is an object but not an array */
function IsObjectNotArray$1(value) {
	return IsObject$1(value) && !IsArray$1(value);
}
/** Returns true if this value is an object */
function IsObject$1(value) {
	return IsEqual$1(typeof value, "object") && !IsNull$1(value);
}
/** Returns true if this value is string */
function IsString$2(value) {
	return IsEqual$1(typeof value, "string");
}
/** Returns true if this value is symbol */
function IsSymbol$1(value) {
	return IsEqual$1(typeof value, "symbol");
}
/** Returns true if this value is undefined */
function IsUndefined$1(value) {
	return IsEqual$1(value, void 0);
}
function IsEqual$1(left, right) {
	return left === right;
}
function IsGreaterThan$1(left, right) {
	return left > right;
}
function IsLessThan$1(left, right) {
	return left < right;
}
function IsLessEqualThan$1(left, right) {
	return left <= right;
}
function IsGreaterEqualThan$1(left, right) {
	return left >= right;
}
function IsMultipleOf$1(dividend, divisor) {
	if (IsBigInt$1(dividend) || IsBigInt$1(divisor)) return BigInt(dividend) % BigInt(divisor) === 0n;
	if (!IsNumber$2(dividend) || IsInteger$1(dividend) && 1 / divisor % 1 == 0) return !0;
	let mod = dividend % divisor;
	return Math.min(Math.abs(mod), Math.abs(mod - divisor)) < 1e-10;
}
/** Returns true if the value appears to be an instance of a class. */
function IsClassInstance(value) {
	if (!IsObject$1(value)) return !1;
	let proto = globalThis.Object.getPrototypeOf(value);
	return IsNull$1(proto) ? !1 : IsEqual$1(typeof proto.constructor, "function") && !(IsEqual$1(proto.constructor, globalThis.Object) || IsEqual$1(proto.constructor.name, "Object"));
}
function IsValueLike(value) {
	return IsBigInt$1(value) || IsBoolean$2(value) || IsNull$1(value) || IsNumber$2(value) || IsString$2(value) || IsUndefined$1(value);
}
/** Returns the number of grapheme clusters in the string */
function GraphemeCount(value) {
	return GraphemeCount$1(value);
}
/** Returns true if the string has at most the given number of graphemes */
function IsMaxLength$2(value, length) {
	return IsMaxLengthFast(value, length);
}
/** Returns true if the string has at least the given number of graphemes */
function IsMinLength$2(value, length) {
	return IsMinLengthFast(value, length);
}
/** Returns true if all elements from offset satisfy the callback, short-circuiting on the first failure */
function Every$1(value, offset, callback) {
	for (let index = offset; index < value.length; index++) if (!callback(value[index], index)) return !1;
	return !0;
}
/** Returns true if all elements from offset satisfy the callback, visiting every element regardless of failure */
function EveryAll(value, offset, callback) {
	let result = !0;
	for (let index = offset; index < value.length; index++) callback(value[index], index) || (result = !1);
	return result;
}
/** Takes the left-most element from an array and dispatches to the true arm, or the false arm if empty */
function TakeLeft(array, true_, false_) {
	return IsEqual$1(array.length, 0) ? false_() : true_(array[0], array.slice(1));
}
/** Returns true if the PropertyKey is Unsafe (ref: prototype-pollution). */
function IsUnsafePropertyKey(key) {
	return IsEqual$1(key, "__proto__") || IsEqual$1(key, "constructor") || IsEqual$1(key, "prototype");
}
/** Returns true if this value has this property key */
function HasPropertyKey$1(value, key) {
	return IsUnsafePropertyKey(key) ? Object.prototype.hasOwnProperty.call(value, key) : key in value;
}
/** Returns object entries as `[RegExp, Value][]` */
function EntriesRegExp(value) {
	return Keys$1(value).map((key) => [RegExp(`^${key}$`), value[key]]);
}
/** Returns object entries as `[string, Value][]` */
function Entries$2(value) {
	return Object.entries(value);
}
/** Returns property keys for this object via `Object.getOwnPropertyKeys({ ... })` */
function Keys$1(value) {
	return Object.getOwnPropertyNames(value);
}
/** Returns the property keys for this object via `Object.getOwnPropertyKeys({ ... })` */
function Symbols(value) {
	return Object.getOwnPropertySymbols(value);
}
/** Returns the property values for the given object via `Object.values()` */
function Values(value) {
	return Object.values(value);
}
function DeepEqualObject(left, right) {
	if (!IsObject$1(right)) return !1;
	let keys = Keys$1(left);
	return IsEqual$1(keys.length, Keys$1(right).length) && keys.every((key) => IsDeepEqual$1(left[key], right[key]));
}
function DeepEqualArray(left, right) {
	return IsArray$1(right) && IsEqual$1(left.length, right.length) && left.every((_, index) => IsDeepEqual$1(left[index], right[index]));
}
/** Tests values for deep equality */
function IsDeepEqual$1(left, right) {
	return IsArray$1(left) ? DeepEqualArray(left, right) : IsObject$1(left) ? DeepEqualObject(left, right) : IsEqual$1(left, right);
}
//#endregion
//#region ../../node_modules/typebox/build/guard/emit.mjs
const identifierRegExp = /^[\p{ID_Start}_$][\p{ID_Continue}_$\u200C\u200D]*$/u;
/** Returns true if this value is a valid JavaScript identifier */
function IsIdentifier(value) {
	return identifierRegExp.test(value);
}
function And(left, right) {
	return `(${left} && ${right})`;
}
function Or(left, right) {
	return `(${left} || ${right})`;
}
function Not(expr) {
	return `!(${expr})`;
}
/** Returns true if this value is an array */
function IsArray(value) {
	return `Array.isArray(${value})`;
}
/** Returns true if this value is an async iterator */
function IsAsyncIterator(value) {
	return `Guard.IsAsyncIterator(${value})`;
}
/** Returns true if this value is bigint */
function IsBigInt(value) {
	return `typeof ${value} === "bigint"`;
}
/** Returns true if this value is a boolean */
function IsBoolean$1(value) {
	return `typeof ${value} === "boolean"`;
}
/** Returns true if this value is integer */
function IsInteger(value) {
	return `Number.isInteger(${value})`;
}
/** Returns true if this value is an iterator */
function IsIterator(value) {
	return `Guard.IsIterator(${value})`;
}
/** Returns true if this value is null */
function IsNull(value) {
	return `${value} === null`;
}
/** Returns true if this value is number */
function IsNumber$1(value) {
	return `Number.isFinite(${value})`;
}
/** Returns true if this value is an object but not an array */
function IsObjectNotArray(value) {
	return And(IsObject(value), Not(IsArray(value)));
}
/** Returns true if this value is an object */
function IsObject(value) {
	return `typeof ${value} === "object" && ${value} !== null`;
}
/** Returns true if this value is string */
function IsString$1(value) {
	return `typeof ${value} === "string"`;
}
/** Returns true if this value is symbol */
function IsSymbol(value) {
	return `typeof ${value} === "symbol"`;
}
/** Returns true if this value is undefined */
function IsUndefined(value) {
	return `${value} === undefined`;
}
function IsFunction(value) {
	return `typeof ${value} === "function"`;
}
function IsConstructor(value) {
	return `Guard.IsConstructor(${value})`;
}
function IsEqual(left, right) {
	return `${left} === ${right}`;
}
function IsGreaterThan(left, right) {
	return `${left} > ${right}`;
}
function IsLessThan(left, right) {
	return `${left} < ${right}`;
}
function IsLessEqualThan(left, right) {
	return `${left} <= ${right}`;
}
function IsGreaterEqualThan(left, right) {
	return `${left} >= ${right}`;
}
function IsMinLength$1(value, length) {
	return `Guard.IsMinLength(${value}, ${length})`;
}
function IsMaxLength$1(value, length) {
	return `Guard.IsMaxLength(${value}, ${length})`;
}
function Every(value, offset, params, expression) {
	return IsEqual$1(offset, "0") ? `${value}.every((${params[0]}, ${params[1]}) => ${expression})` : `((value, callback) => { for(let index = ${offset}; index < value.length; index++) if (!callback(value[index], index)) return false; return true })(${value}, (${params[0]}, ${params[1]}) => ${expression})`;
}
function Entries$1(value) {
	return `Object.entries(${value})`;
}
function Keys(value) {
	return `Object.getOwnPropertyNames(${value})`;
}
function HasPropertyKey(value, key) {
	return IsEqual$1(key, "\"__proto__\"") || IsEqual$1(key, "\"constructor\"") ? `Object.prototype.hasOwnProperty.call(${value}, ${key})` : `${key} in ${value}`;
}
function IsDeepEqual(left, right) {
	return `Guard.IsDeepEqual(${left}, ${right})`;
}
function ArrayLiteral(elements) {
	return `[${elements.join(", ")}]`;
}
function ArrowFunction(parameters, body) {
	return `((${parameters.join(", ")}) => ${body})`;
}
function Call(value, arguments_) {
	return `${value}(${arguments_.join(", ")})`;
}
function New(value, arguments_) {
	return `new ${value}(${arguments_.join(", ")})`;
}
function Member(left, right) {
	return `${left}${IsIdentifier(right) ? `.${right}` : `[${Constant(right)}]`}`;
}
function Constant(value) {
	return IsString$2(value) ? JSON.stringify(value) : `${value}`;
}
function Ternary(condition, true_, false_) {
	return `(${condition} ? ${true_} : ${false_})`;
}
function Statements(statements) {
	return `{ ${statements.join("; ")}; }`;
}
function ConstDeclaration(identifier, expression) {
	return `const ${identifier} = ${expression}`;
}
function If(condition, then) {
	return `if(${condition}) { ${then} }`;
}
function Return(expression) {
	return `return ${expression}`;
}
function ReduceAnd(operands) {
	return IsEqual$1(operands.length, 0) ? "true" : operands.reduce((left, right) => And(left, right));
}
function ReduceOr(operands) {
	return IsEqual$1(operands.length, 0) ? "false" : operands.reduce((left, right) => Or(left, right));
}
function PrefixIncrement(expression) {
	return `++${expression}`;
}
function MultipleOf(dividend, divisor) {
	return `Guard.IsMultipleOf(${dividend}, ${divisor})`;
}
//#endregion
//#region ../../node_modules/typebox/build/guard/globals.mjs
function IsBoolean(value) {
	return value instanceof Boolean;
}
function IsNumber(value) {
	return value instanceof Number;
}
function IsString(value) {
	return value instanceof String;
}
function IsTypeArray(value) {
	return globalThis.ArrayBuffer.isView(value);
}
/** Returns true if the value is a RegExp */
function IsRegExp(value) {
	return value instanceof globalThis.RegExp;
}
/** Returns true if the value is a Date */
function IsDate$1(value) {
	return value instanceof globalThis.Date;
}
//#endregion
//#region ../../node_modules/typebox/build/system/memory/clone.mjs
function IsGuard$1(value) {
	return IsObject$1(value) && HasPropertyKey$1(value, "~guard");
}
function FromGuard(value) {
	return value;
}
function FromArray$2(value) {
	return value.map((value) => FromValue$2(value));
}
function FromObject$2(value) {
	let result = {}, descriptors = Object.getOwnPropertyDescriptors(value);
	for (let key of Object.keys(descriptors)) {
		let descriptor = descriptors[key];
		HasPropertyKey$1(descriptor, "value") && Object.defineProperty(result, key, {
			...descriptor,
			value: FromValue$2(descriptor.value)
		});
	}
	return result;
}
function FromRegExp$1(value) {
	return new RegExp(value.source, value.flags);
}
function FromUnknown(value) {
	return value;
}
function FromValue$2(value) {
	return value instanceof RegExp ? FromRegExp$1(value) : IsGuard$1(value) ? FromGuard(value) : IsArray$1(value) ? FromArray$2(value) : IsObject$1(value) ? FromObject$2(value) : FromUnknown(value);
}
/**
* Clones a value using the TypeBox type cloning strategy. This function preserves non-enumerable
* properties from the source value. This is to ensure cloned types retain discriminable
* hidden properties.
*/
function Clone(value) {
	return Metrics.clone += 1, FromValue$2(value);
}
//#endregion
//#region ../../node_modules/typebox/build/system/settings/settings.mjs
const settings = {
	immutableTypes: !1,
	maxErrors: 8,
	useAcceleration: !0,
	exactOptionalPropertyTypes: !1,
	enumerableKind: !1,
	correctiveParse: !1
};
/** Gets current system settings */
function Get$2() {
	return settings;
}
//#endregion
//#region ../../node_modules/typebox/build/system/memory/create.mjs
function MergeHidden(left, right) {
	for (let key of Object.keys(right)) Object.defineProperty(left, key, {
		configurable: !0,
		writable: !0,
		enumerable: !1,
		value: right[key]
	});
	return left;
}
function Merge(left, right) {
	return {
		...left,
		...right
	};
}
/**
* Creates an object with hidden, enumerable, and optional property sets. This function
* ensures types are instantiated according to configuration rules for enumerable and
* non-enumerable properties.
*/
function Create(hidden, enumerable, options = {}) {
	Metrics.create += 1;
	let settings = Get$2(), withOptions = Merge(enumerable, options), withHidden = settings.enumerableKind ? Merge(withOptions, hidden) : MergeHidden(withOptions, hidden);
	return settings.immutableTypes ? Object.freeze(withHidden) : withHidden;
}
//#endregion
//#region ../../node_modules/typebox/build/system/memory/update.mjs
/**
* Updates a value with new properties while preserving property enumerability. Use this function to modify
* existing types without altering their configuration.
*/
function Update(current, hidden, enumerable) {
	Metrics.update += 1;
	let settings = Get$2(), result = Clone(current);
	for (let key of Object.keys(hidden)) Object.defineProperty(result, key, {
		configurable: !0,
		writable: !0,
		enumerable: settings.enumerableKind,
		value: hidden[key]
	});
	for (let key of Object.keys(enumerable)) Object.defineProperty(result, key, {
		configurable: !0,
		enumerable: !0,
		writable: !0,
		value: enumerable[key]
	});
	return result;
}
//#endregion
//#region ../../node_modules/typebox/build/type/types/schema.mjs
function IsSchema$1(value) {
	return IsObject$1(value);
}
//#endregion
//#region ../../node_modules/typebox/build/system/arguments/arguments.mjs
/**
* Match arguments for overloaded functions that use the `...args: unknown[]` pattern. Arguments
* are parsed using argument length only.
*/
function Match$1(args, match) {
	return match[args.length]?.(...args) ?? (() => {
		throw Error("Invalid Arguments");
	})();
}
//#endregion
//#region ../../node_modules/typebox/build/system/environment/evaluate.mjs
let supported;
function TryEvaluate() {
	try {
		return Evaluate("null")(), !0;
	} catch {
		return !1;
	}
}
/** Returns true if the environment supports dynamic JavaScript evaluation */
function CanEvaluate() {
	return IsUndefined$1(supported) && (supported = TryEvaluate()), supported && Get$2().useAcceleration;
}
/**
* Evaluates code in the current environment. This function will throw if the
* environment Content-Security-Policy does not support `unsafe-eval`. Use the
* Environment.CanEvaluate() to determine if the environment supports Evaluate
* before calling this function.
*/
function Evaluate(...args) {
	return new globalThis.Function(...args);
}
//#endregion
//#region ../../node_modules/typebox/build/system/unreachable/unreachable.mjs
/** Used for unreachable logic */
function Unreachable() {
	throw Error("Unreachable");
}
//#endregion
//#region ../../node_modules/typebox/build/system/hashing/hash.mjs
var hash_exports = /* @__PURE__ */ __exportAll({
	Hash: () => Hash,
	HashCode: () => HashCode
});
function InstanceKeys(value) {
	let propertyKeys = /* @__PURE__ */ new Set(), current = value;
	for (; current && current !== Object.prototype;) {
		for (let key of Reflect.ownKeys(current)) key !== "constructor" && typeof key != "symbol" && propertyKeys.add(key);
		current = Object.getPrototypeOf(current);
	}
	return [...propertyKeys];
}
function IsIEEE754(value) {
	return typeof value == "number";
}
var ByteMarker;
(function(ByteMarker) {
	ByteMarker[ByteMarker.Array = 0] = "Array", ByteMarker[ByteMarker.BigInt = 1] = "BigInt", ByteMarker[ByteMarker.Boolean = 2] = "Boolean", ByteMarker[ByteMarker.Date = 3] = "Date", ByteMarker[ByteMarker.Constructor = 4] = "Constructor", ByteMarker[ByteMarker.Function = 5] = "Function", ByteMarker[ByteMarker.Null = 6] = "Null", ByteMarker[ByteMarker.Number = 7] = "Number", ByteMarker[ByteMarker.Object = 8] = "Object", ByteMarker[ByteMarker.RegExp = 9] = "RegExp", ByteMarker[ByteMarker.String = 10] = "String", ByteMarker[ByteMarker.Symbol = 11] = "Symbol", ByteMarker[ByteMarker.TypeArray = 12] = "TypeArray", ByteMarker[ByteMarker.Undefined = 13] = "Undefined";
})(ByteMarker ||= {});
let Accumulator = BigInt("14695981039346656037");
const [Prime, Size] = [BigInt("1099511628211"), BigInt("18446744073709551616")], Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i)), F64 = new Float64Array(1), F64In = new DataView(F64.buffer), F64Out = new Uint8Array(F64.buffer);
function FNV1A64_OP(byte) {
	Accumulator ^= Bytes[byte], Accumulator = Accumulator * Prime % Size;
}
function FromArray$1(value) {
	FNV1A64_OP(ByteMarker.Array);
	for (let item of value) FromValue$1(item);
}
function FromBigInt(value) {
	FNV1A64_OP(ByteMarker.BigInt), F64In.setBigInt64(0, value);
	for (let byte of F64Out) FNV1A64_OP(byte);
}
function FromBoolean(value) {
	FNV1A64_OP(ByteMarker.Boolean), FNV1A64_OP(+!!value);
}
function FromConstructor(value) {
	FNV1A64_OP(ByteMarker.Constructor), FromValue$1(value.toString());
}
function FromDate(value) {
	FNV1A64_OP(ByteMarker.Date), FromValue$1(value.getTime());
}
function FromFunction(value) {
	FNV1A64_OP(ByteMarker.Function), FromValue$1(value.toString());
}
function FromNull(_value) {
	FNV1A64_OP(ByteMarker.Null);
}
function FromNumber(value) {
	FNV1A64_OP(ByteMarker.Number), F64In.setFloat64(0, value, !0);
	for (let byte of F64Out) FNV1A64_OP(byte);
}
function FromObject$1(value) {
	FNV1A64_OP(ByteMarker.Object);
	for (let key of InstanceKeys(value).sort()) FromValue$1(key), FromValue$1(value[key]);
}
function FromRegExp(value) {
	FNV1A64_OP(ByteMarker.RegExp), FromString(value.toString());
}
const encoder = new TextEncoder();
function FromString(value) {
	FNV1A64_OP(ByteMarker.String);
	for (let byte of encoder.encode(value)) FNV1A64_OP(byte);
}
function FromSymbol(value) {
	FNV1A64_OP(ByteMarker.Symbol), FromValue$1(value.toString());
}
function FromTypeArray(value) {
	FNV1A64_OP(ByteMarker.TypeArray);
	let buffer = new Uint8Array(value.buffer);
	for (let i = 0; i < buffer.length; i++) FNV1A64_OP(buffer[i]);
}
function FromUndefined(_value) {
	return FNV1A64_OP(ByteMarker.Undefined);
}
function FromValue$1(value) {
	return IsTypeArray(value) ? FromTypeArray(value) : IsDate$1(value) ? FromDate(value) : IsRegExp(value) ? FromRegExp(value) : IsBoolean(value) ? FromBoolean(value.valueOf()) : IsString(value) ? FromString(value.valueOf()) : IsNumber(value) ? FromNumber(value.valueOf()) : IsIEEE754(value) ? FromNumber(value) : IsArray$1(value) ? FromArray$1(value) : IsBoolean$2(value) ? FromBoolean(value) : IsBigInt$1(value) ? FromBigInt(value) : IsConstructor$1(value) ? FromConstructor(value) : IsNull$1(value) ? FromNull(value) : IsObject$1(value) ? FromObject$1(value) : IsString$2(value) ? FromString(value) : IsSymbol$1(value) ? FromSymbol(value) : IsUndefined$1(value) ? FromUndefined(value) : IsFunction$1(value) ? FromFunction(value) : Unreachable();
}
/** Generates a FNV1A-64 non cryptographic hash of the given value */
function HashCode(value) {
	return Accumulator = BigInt("14695981039346656037"), FromValue$1(value), Accumulator;
}
/** Generates a FNV1A-64 non cryptographic hash of the given value */
function Hash(value) {
	return HashCode(value).toString(16).padStart(16, "0");
}
//#endregion
//#region ../../node_modules/typebox/build/type/types/_refine.mjs
/** Applies a Refine check to the given type. */
function RefineAdd(type, refinement) {
	return Update(type, { "~refine": IsRefine$1(type) ? [...type["~refine"], refinement] : [refinement] }, {});
}
/** Refines a type with an explicit check */
function Refine(...args) {
	let [type, check, error_or_message] = Match$1(args, {
		3: (type, check, error) => [
			type,
			check,
			error
		],
		2: (type, check) => [
			type,
			check,
			() => "Refine Error"
		]
	});
	return RefineAdd(type, {
		check,
		error: IsString$2(error_or_message) ? () => error_or_message : error_or_message
	});
}
/** Returns true if the given value is a TRefinement. */
function IsRefinement(value) {
	return IsObjectNotArray$1(value) && HasPropertyKey$1(value, "check") && HasPropertyKey$1(value, "error") && IsFunction$1(value.check) && IsFunction$1(value.error);
}
/** Returns true if the given value is a TRefine. */
function IsRefine$1(value) {
	return IsSchema$1(value) && HasPropertyKey$1(value, "~refine") && IsArray$1(value["~refine"]) && Every$1(value["~refine"], 0, (value) => IsRefinement(value));
}
//#endregion
//#region ../../node_modules/typebox/build/type/types/string.mjs
/** Creates a String type. */
function String$1(options) {
	return Create({ "~kind": "String" }, { type: "string" }, options);
}
//#endregion
//#region ../../node_modules/typebox/build/type/script/token/internal/char.mjs
function Range(start, end) {
	return Array.from({ length: end - start + 1 }, (_, i) => String.fromCharCode(start + i));
}
const Alpha = [...Range(97, 122), ...Range(65, 90)], Digit = ["0", ...Range(49, 57)];
[...Digit], [...Alpha, ...Digit], [...Digit];
//#endregion
//#region ../../node_modules/typebox/build/schema/types/_guard.mjs
function IsGuardInterface(value) {
	return IsObject$1(value) && HasPropertyKey$1(value, "check") && HasPropertyKey$1(value, "errors") && IsFunction$1(value.check) && IsFunction$1(value.errors);
}
function IsGuard(value) {
	return HasPropertyKey$1(value, "~guard") && IsGuardInterface(value["~guard"]);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/_refine.mjs
/**
* Returns true if the schema contains an '~refine` keyword
* @specification None
*/
function IsRefine(value) {
	return HasPropertyKey$1(value, "~refine") && IsArray$1(value["~refine"]) && Every$1(value["~refine"], 0, (value) => IsObject$1(value) && HasPropertyKey$1(value, "check") && HasPropertyKey$1(value, "error") && IsFunction$1(value.check) && IsFunction$1(value.error));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/schema.mjs
/** Returns true if this value is object like */
function IsSchemaObject(value) {
	return IsObject$1(value) && !IsArray$1(value);
}
/** Returns true if this value is a boolean */
function IsBooleanSchema(value) {
	return IsBoolean$2(value);
}
/** Returns true if this value is schema like */
function IsSchema(value) {
	return IsSchemaObject(value) || IsBooleanSchema(value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/additionalItems.mjs
/**
* Returns true if the schema contains a valid additionalItems property
* @specification Json Schema 7
*/
function IsAdditionalItems(schema) {
	return HasPropertyKey$1(schema, "additionalItems") && IsSchema(schema.additionalItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/additionalProperties.mjs
/**
* Returns true if the schema contains a valid additionalProperties property
* @specification Json Schema 7
*/
function IsAdditionalProperties(schema) {
	return HasPropertyKey$1(schema, "additionalProperties") && IsSchema(schema.additionalProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/allOf.mjs
/**
* Returns true if the schema contains a valid allOf property
* @specification Json Schema 7
*/
function IsAllOf(schema) {
	return HasPropertyKey$1(schema, "allOf") && IsArray$1(schema.allOf) && schema.allOf.every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/anchor.mjs
/**
* Returns true if the schema contains a valid $anchor property
*/
function IsAnchor(schema) {
	return HasPropertyKey$1(schema, "$anchor") && IsString$2(schema.$anchor);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/anyOf.mjs
/**
* Returns true if the schema contains a valid anyOf property
* @specification Json Schema 7
*/
function IsAnyOf(schema) {
	return HasPropertyKey$1(schema, "anyOf") && IsArray$1(schema.anyOf) && schema.anyOf.every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/const.mjs
/**
* Returns true if the schema contains a valid const property
* @specification Json Schema 7
*/
function IsConst(value) {
	return HasPropertyKey$1(value, "const");
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/contains.mjs
/**
* Returns true if the schema contains a valid contains property
* @specification Json Schema 7
*/
function IsContains(schema) {
	return HasPropertyKey$1(schema, "contains") && IsSchema(schema.contains);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/dependencies.mjs
/**
* Returns true if the schema contains a valid dependencies property
* @specification Json Schema 7
*/
function IsDependencies(schema) {
	return HasPropertyKey$1(schema, "dependencies") && IsObject$1(schema.dependencies) && Object.values(schema.dependencies).every((value) => IsSchema(value) || IsArray$1(value) && value.every((value) => IsString$2(value)));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/dependentRequired.mjs
/**
* Returns true if the schema contains a valid dependentRequired property
* @specification Json Schema 2019-09
*/
function IsDependentRequired(schema) {
	return HasPropertyKey$1(schema, "dependentRequired") && IsObject$1(schema.dependentRequired) && Object.values(schema.dependentRequired).every((value) => IsArray$1(value) && value.every((value) => IsString$2(value)));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/dependentSchemas.mjs
/**
* Returns true if the schema contains a valid dependentRequired property
* @specification Json Schema 2019-09
*/
function IsDependentSchemas(schema) {
	return HasPropertyKey$1(schema, "dependentSchemas") && IsObject$1(schema.dependentSchemas) && Object.values(schema.dependentSchemas).every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/dynamicAnchor.mjs
/**
* Returns true if the schema contains a valid $dynamicAnchor property
*/
function IsDynamicAnchor(schema) {
	return HasPropertyKey$1(schema, "$dynamicAnchor") && IsString$2(schema.$dynamicAnchor);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/dynamicRef.mjs
/**
* Returns true if the schema contains a valid $dynamicRef property
*/
function IsDynamicRef(schema) {
	return HasPropertyKey$1(schema, "$dynamicRef") && IsString$2(schema.$dynamicRef);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/else.mjs
/**
* Returns true if the schema contains a valid else property
* @specification Json Schema 7
*/
function IsElse(schema) {
	return HasPropertyKey$1(schema, "else") && IsSchema(schema.else);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/enum.mjs
/**
* Returns true if the schema contains a valid enum property
* @specification Json Schema 7
*/
function IsEnum(schema) {
	return HasPropertyKey$1(schema, "enum") && IsArray$1(schema.enum);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/exclusiveMaximum.mjs
/**
* Returns true if the schema contains a valid exclusiveMaximum property
* @specification Json Schema 7
*/
function IsExclusiveMaximum(schema) {
	return HasPropertyKey$1(schema, "exclusiveMaximum") && (IsNumber$2(schema.exclusiveMaximum) || IsBigInt$1(schema.exclusiveMaximum));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/exclusiveMinimum.mjs
/**
* Returns true if the schema contains a valid exclusiveMinimum property
* @specification Json Schema 7
*/
function IsExclusiveMinimum(schema) {
	return HasPropertyKey$1(schema, "exclusiveMinimum") && (IsNumber$2(schema.exclusiveMinimum) || IsBigInt$1(schema.exclusiveMinimum));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/format.mjs
/**
* Returns true if the schema contains a valid format property
* @specification Json Schema 7
*/
function IsFormat(schema) {
	return HasPropertyKey$1(schema, "format") && IsString$2(schema.format);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/id.mjs
/**
* Returns true if the schema contains a valid $id property
* @specification Json Schema 7
*/
function IsId(schema) {
	return HasPropertyKey$1(schema, "$id") && IsString$2(schema.$id);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/if.mjs
/**
* Returns true if the schema contains a valid $id property
* @specification Json Schema 7
*/
function IsIf(schema) {
	return HasPropertyKey$1(schema, "if") && IsSchema(schema.if);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/items.mjs
/**
* Returns true if the schema contains a valid items property
* @specification Json Schema 7
*/
function IsItems(schema) {
	return HasPropertyKey$1(schema, "items") && (IsSchema(schema.items) || IsArray$1(schema.items) && schema.items.every((value) => IsSchema(value)));
}
/** Returns true if this schema is a sized items variant */
function IsItemsSized(schema) {
	return IsItems(schema) && IsArray$1(schema.items);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/maximum.mjs
/**
* Returns true if the schema contains a valid maximum property
* @specification Json Schema 7
*/
function IsMaximum(schema) {
	return HasPropertyKey$1(schema, "maximum") && (IsNumber$2(schema.maximum) || IsBigInt$1(schema.maximum));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/maxContains.mjs
/**
* Returns true if the schema contains a valid maxContains property
* @specification Json Schema 2019-09
*/
function IsMaxContains(schema) {
	return HasPropertyKey$1(schema, "maxContains") && IsNumber$2(schema.maxContains);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/maxItems.mjs
/**
* Returns true if the schema contains a valid maxItems property
* @specification Json Schema 7
*/
function IsMaxItems(schema) {
	return HasPropertyKey$1(schema, "maxItems") && IsNumber$2(schema.maxItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/maxLength.mjs
/**
* Returns true if the schema contains a valid maxLength property
* @specification Json Schema 7
*/
function IsMaxLength(schema) {
	return HasPropertyKey$1(schema, "maxLength") && IsNumber$2(schema.maxLength);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/maxProperties.mjs
/**
* Returns true if the schema contains a valid maxProperties property
* @specification Json Schema 7
*/
function IsMaxProperties(schema) {
	return HasPropertyKey$1(schema, "maxProperties") && IsNumber$2(schema.maxProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/minimum.mjs
/**
* Returns true if the schema contains a valid minimum property
* @specification Json Schema 7
*/
function IsMinimum(schema) {
	return HasPropertyKey$1(schema, "minimum") && (IsNumber$2(schema.minimum) || IsBigInt$1(schema.minimum));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/minContains.mjs
/**
* Returns true if the schema contains a valid maxContains property
* @specification Json Schema 2019-09
*/
function IsMinContains(schema) {
	return HasPropertyKey$1(schema, "minContains") && IsNumber$2(schema.minContains);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/minItems.mjs
/**
* Returns true if the schema contains a valid minItems property
* @specification Json Schema 7
*/
function IsMinItems(schema) {
	return HasPropertyKey$1(schema, "minItems") && IsNumber$2(schema.minItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/minLength.mjs
/**
* Returns true if the schema contains a valid minLength property
* @specification Json Schema 7
*/
function IsMinLength(schema) {
	return HasPropertyKey$1(schema, "minLength") && IsNumber$2(schema.minLength);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/minProperties.mjs
/**
* Returns true if the schema contains a valid minProperties property
* @specification Json Schema 7
*/
function IsMinProperties(schema) {
	return HasPropertyKey$1(schema, "minProperties") && IsNumber$2(schema.minProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/multipleOf.mjs
/**
* Returns true if the schema contains a valid multipleOf property
* @specification Json Schema 7
*/
function IsMultipleOf(schema) {
	return HasPropertyKey$1(schema, "multipleOf") && (IsNumber$2(schema.multipleOf) || IsBigInt$1(schema.multipleOf));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/not.mjs
/**
* Returns true if the schema contains a valid not property
* @specification Json Schema 7
*/
function IsNot(schema) {
	return HasPropertyKey$1(schema, "not") && IsSchema(schema.not);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/oneOf.mjs
/**
* Returns true if the schema contains a valid oneOf property
* @specification Json Schema 7
*/
function IsOneOf(schema) {
	return HasPropertyKey$1(schema, "oneOf") && IsArray$1(schema.oneOf) && schema.oneOf.every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/pattern.mjs
/**
* Returns true if the schema contains a valid pattern property
* @specification Json Schema 7
*/
function IsPattern(schema) {
	return HasPropertyKey$1(schema, "pattern") && (IsString$2(schema.pattern) || schema.pattern instanceof RegExp);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/patternProperties.mjs
/**
* Returns true if the schema contains a valid patternProperties property
* @specification Json Schema 7
*/
function IsPatternProperties(schema) {
	return HasPropertyKey$1(schema, "patternProperties") && IsObject$1(schema.patternProperties) && Object.values(schema.patternProperties).every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/prefixItems.mjs
/**
* Returns true if the schema contains a valid prefixItems property
*/
function IsPrefixItems(schema) {
	return HasPropertyKey$1(schema, "prefixItems") && IsArray$1(schema.prefixItems) && schema.prefixItems.every((schema) => IsSchema(schema));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/properties.mjs
/**
* Returns true if the schema contains a valid properties property
* @specification Json Schema 7
*/
function IsProperties(schema) {
	return HasPropertyKey$1(schema, "properties") && IsObject$1(schema.properties) && Object.values(schema.properties).every((value) => IsSchema(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/propertyNames.mjs
/**
* Returns true if the schema contains a valid propertyNames property
* @specification Json Schema 7
*/
function IsPropertyNames(schema) {
	return HasPropertyKey$1(schema, "propertyNames") && (IsObject$1(schema.propertyNames) || IsSchema(schema.propertyNames));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/recursiveAnchor.mjs
/**
* Returns true if the schema contains a valid $recursiveAnchor property
*/
function IsRecursiveAnchor(schema) {
	return HasPropertyKey$1(schema, "$recursiveAnchor") && IsBoolean$2(schema.$recursiveAnchor);
}
/**
* Returns true if the schema contains a valid $recursiveAnchor property that is true
*/
function IsRecursiveAnchorTrue(schema) {
	return IsRecursiveAnchor(schema) && IsEqual$1(schema.$recursiveAnchor, !0);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/recursiveRef.mjs
/**
* Returns true if the schema contains a valid $recursiveRef property
*/
function IsRecursiveRef(schema) {
	return HasPropertyKey$1(schema, "$recursiveRef") && IsString$2(schema.$recursiveRef);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/ref.mjs
/**
* Returns true if the schema contains a valid $ref property
* @specification Json Schema 7
*/
function IsRef(schema) {
	return HasPropertyKey$1(schema, "$ref") && IsString$2(schema.$ref);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/required.mjs
/**
* Returns true if the schema contains a valid required property
* @specification Json Schema 7
*/
function IsRequired(schema) {
	return HasPropertyKey$1(schema, "required") && IsArray$1(schema.required) && schema.required.every((value) => IsString$2(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/then.mjs
/**
* Returns true if the schema contains a valid then property
* @specification Json Schema 7
*/
function IsThen(schema) {
	return HasPropertyKey$1(schema, "then") && IsSchema(schema.then);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/type.mjs
/**
* Returns true if the schema contains a valid type property
* @specification Json Schema 7
*/
function IsType(schema) {
	return HasPropertyKey$1(schema, "type") && (IsString$2(schema.type) || IsArray$1(schema.type) && schema.type.every((value) => IsString$2(value)));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/uniqueItems.mjs
/**
* Returns true if the schema contains a valid uniqueItems property
* @specification Json Schema 7
*/
function IsUniqueItems(schema) {
	return HasPropertyKey$1(schema, "uniqueItems") && IsBoolean$2(schema.uniqueItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/unevaluatedItems.mjs
/**
* Returns true if the schema contains a valid unevaluatedItems property
* @specification Json Schema 2019-09
*/
function IsUnevaluatedItems(schema) {
	return HasPropertyKey$1(schema, "unevaluatedItems") && IsSchema(schema.unevaluatedItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/types/unevaluatedProperties.mjs
/**
* Returns true if the schema contains a valid unevaluatedProperties property
* @specification Json Schema 2019-09
*/
function IsUnevaluatedProperties(schema) {
	return HasPropertyKey$1(schema, "unevaluatedProperties") && IsSchema(schema.unevaluatedProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_context.mjs
function HasUnevaluatedFromObject(value) {
	return IsUnevaluatedItems(value) || IsUnevaluatedProperties(value) || Keys$1(value).some((key) => HasUnevaluatedFromUnknown(value[key]));
}
function HasUnevaluatedFromArray(value) {
	return value.some((value) => HasUnevaluatedFromUnknown(value));
}
function HasUnevaluatedFromUnknown(value) {
	return IsArray$1(value) ? HasUnevaluatedFromArray(value) : IsObject$1(value) ? HasUnevaluatedFromObject(value) : !1;
}
function HasUnevaluated(context, schema) {
	return HasUnevaluatedFromUnknown(schema) || Keys$1(context).some((key) => HasUnevaluatedFromUnknown(context[key]));
}
var BuildContext = class {
	constructor(hasUnevaluated) {
		this.hasUnevaluated = hasUnevaluated;
	}
	UseUnevaluated() {
		return this.hasUnevaluated;
	}
	Push() {
		return Call(Member("context", "Push"), []);
	}
	Pop() {
		return Call(Member("context", "Pop"), []);
	}
	AddIndex(index) {
		return Call(Member("context", "AddIndex"), [index]);
	}
	AddKey(key) {
		return Call(Member("context", "AddKey"), [key]);
	}
	Merge(results) {
		return Call(Member("context", "Merge"), [results]);
	}
}, CheckContext = class {
	constructor() {
		let indices = /* @__PURE__ */ new Set(), keys = /* @__PURE__ */ new Set();
		this.stack = [{
			indices,
			keys
		}];
	}
	Push() {
		let indices = /* @__PURE__ */ new Set(), keys = /* @__PURE__ */ new Set();
		return this.stack.push({
			indices,
			keys
		}), !0;
	}
	Pop() {
		return this.stack.pop(), !0;
	}
	AddIndex(index) {
		return this.GetIndices().add(index), !0;
	}
	AddKey(key) {
		return this.GetKeys().add(key), !0;
	}
	GetIndices() {
		return this.stack[this.stack.length - 1].indices;
	}
	GetKeys() {
		return this.stack[this.stack.length - 1].keys;
	}
	Merge(results) {
		for (let context of results) context.GetIndices().forEach((value) => this.GetIndices().add(value)), context.GetKeys().forEach((value) => this.GetKeys().add(value));
		return !0;
	}
};
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_externals.mjs
const state = {
	identifier: "External",
	variables: []
};
function CreateVariable(value) {
	let call = `External[${state.variables.length}]`;
	return state.variables.push(value), call;
}
function ResetExternal() {
	state.variables = [];
}
function GetExternal() {
	return { ...state };
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_guard.mjs
function BuildGuard(_stack, _context, schema, value) {
	return Call(Member(Member(CreateVariable(schema), "~guard"), "check"), [value]);
}
function CheckGuard(_stack, _context, schema, value) {
	return schema["~guard"].check(value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_refine.mjs
function BuildRefine(_stack, _context, schema, value) {
	return Every(CreateVariable(schema["~refine"].map((refinement) => refinement)), Constant(0), ["refinement", "_"], Call(Member("refinement", "check"), [value]));
}
function CheckRefine(_stack, _context, schema, value) {
	return Every$1(schema["~refine"], 0, (refinement, _) => refinement.check(value));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_unique.mjs
let index = 0;
/** Returns a Unique Variable Name */
function Unique() {
	return `var_${index++}`;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/additionalItems.mjs
function IsValid$4(schema) {
	return IsItems(schema) && IsArray$1(schema.items);
}
function BuildAdditionalItems(stack, context, schema, value) {
	if (!IsValid$4(schema)) return Constant(!0);
	let [item, index] = [Unique(), Unique()], isSchema = BuildSchemaPushStack(stack, context, schema.additionalItems, item), isLength = IsLessThan(index, Constant(schema.items.length)), addIndex = context.AddIndex(index), guarded = context.UseUnevaluated() ? Or(isLength, And(isSchema, addIndex)) : Or(isLength, isSchema);
	return Call(Member(value, "every"), [ArrowFunction([item, index], guarded)]);
}
function CheckAdditionalItems(stack, context, schema, value) {
	return IsValid$4(schema) ? value.every((item, index) => IsLessThan$1(index, schema.items.length) || CheckSchemaPushStack(stack, context, schema.additionalItems, item) && context.AddIndex(index)) : !0;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/additionalProperties.mjs
function GetPropertyKeyAsPattern(key) {
	return `^${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`;
}
function GetPropertiesPattern(schema) {
	let patterns = [];
	return IsPatternProperties(schema) && patterns.push(...Keys$1(schema.patternProperties)), IsProperties(schema) && patterns.push(...Keys$1(schema.properties).map(GetPropertyKeyAsPattern)), IsEqual$1(patterns.length, 0) ? "(?!)" : `(${patterns.join("|")})`;
}
function CanAdditionalPropertiesFast(_context, schema, _value) {
	return IsRequired(schema) && IsProperties(schema) && !IsPatternProperties(schema) && IsEqual$1(schema.additionalProperties, !1) && IsEqual$1(Keys$1(schema.properties).length, schema.required.length);
}
function BuildAdditionalPropertiesFast(_context, schema, value) {
	return IsEqual(Member(Call(Member("Object", "getOwnPropertyNames"), [value]), "length"), Constant(schema.required.length));
}
function BuildAdditionalPropertiesStandard(stack, context, schema, value) {
	let [key, _index] = [Unique(), Unique()], regexp = CreateVariable(new RegExp(GetPropertiesPattern(schema))), isSchema = BuildSchemaPushStack(stack, context, schema.additionalProperties, `${value}[${key}]`), isKey = Call(Member(regexp, "test"), [key]), addKey = context.AddKey(key), guarded = context.UseUnevaluated() ? Or(isKey, And(isSchema, addKey)) : Or(isKey, isSchema);
	return Every(Keys(value), Constant(0), [key, _index], guarded);
}
function BuildAdditionalProperties(stack, context, schema, value) {
	return CanAdditionalPropertiesFast(context, schema, value) ? BuildAdditionalPropertiesFast(context, schema, value) : BuildAdditionalPropertiesStandard(stack, context, schema, value);
}
function CheckAdditionalProperties(stack, context, schema, value) {
	let regexp = new RegExp(GetPropertiesPattern(schema));
	return Every$1(Keys$1(value), 0, (key, _index) => regexp.test(key) || CheckSchemaPushStack(stack, context, schema.additionalProperties, value[key]) && context.AddKey(key));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_reducer.mjs
function Reducer(stack, context, schemas, value, check) {
	let results = ConstDeclaration("results", "[]"), context_n = schemas.map((_schema, index) => ConstDeclaration(`context_${index}`, New("CheckContext", []))), condition_n = schemas.map((schema, index) => ConstDeclaration(`condition_${index}`, Call(ArrowFunction(["context"], BuildSchema(stack, context, schema, value)), [`context_${index}`]))), checks = schemas.map((_schema, index) => If(`condition_${index}`, Call(Member("results", "push"), [`context_${index}`]))), returns = Return(And(check, context.Merge("results")));
	return Call(ArrowFunction([], Statements([
		results,
		...context_n,
		...condition_n,
		...checks,
		returns
	])), []);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/allOf.mjs
function BuildAllOfStandard(stack, context, schema, value) {
	return Reducer(stack, context, schema.allOf, value, IsEqual(Member("results", "length"), Constant(schema.allOf.length)));
}
function BuildAllOfFast(stack, context, schema, value) {
	return ReduceAnd(schema.allOf.map((schema) => BuildSchema(stack, context, schema, value)));
}
function BuildAllOf(stack, context, schema, value) {
	return context.UseUnevaluated() ? BuildAllOfStandard(stack, context, schema, value) : BuildAllOfFast(stack, context, schema, value);
}
function CheckAllOf(stack, context, schema, value) {
	let results = schema.allOf.reduce((result, schema) => {
		let nextContext = new CheckContext();
		return CheckSchema(stack, nextContext, schema, value) ? [...result, nextContext] : result;
	}, []);
	return IsEqual$1(results.length, schema.allOf.length) && context.Merge(results);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/anyOf.mjs
function BuildAnyOfStandard(stack, context, schema, value) {
	return Reducer(stack, context, schema.anyOf, value, IsGreaterThan(Member("results", "length"), Constant(0)));
}
function BuildAnyOfFast(stack, context, schema, value) {
	return ReduceOr(schema.anyOf.map((schema) => BuildSchema(stack, context, schema, value)));
}
function BuildAnyOf(stack, context, schema, value) {
	return context.UseUnevaluated() ? BuildAnyOfStandard(stack, context, schema, value) : BuildAnyOfFast(stack, context, schema, value);
}
function CheckAnyOf(stack, context, schema, value) {
	let results = schema.anyOf.reduce((result, schema) => {
		let nextContext = new CheckContext();
		return CheckSchema(stack, nextContext, schema, value) ? [...result, nextContext] : result;
	}, []);
	return IsGreaterThan$1(results.length, 0) && context.Merge(results);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/boolean.mjs
function BuildBooleanSchema(_stack, _context, schema, _value) {
	return Constant(!!schema);
}
function CheckBooleanSchema(_stack, _context, schema, _value) {
	return schema;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/const.mjs
function BuildConst(_stack, _context, schema, value) {
	return IsValueLike(schema.const) ? IsEqual(value, Constant(schema.const)) : IsDeepEqual(value, CreateVariable(schema.const));
}
function CheckConst(_stack, _context, schema, value) {
	return IsValueLike(schema.const) ? IsEqual$1(value, schema.const) : IsDeepEqual$1(value, schema.const);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/contains.mjs
function IsValid$3(schema) {
	return !(IsMinContains(schema) && IsEqual$1(schema.minContains, 0));
}
function BuildContains(stack, context, schema, value) {
	if (!IsValid$3(schema)) return Constant(!0);
	let item = Unique();
	return And(Not(IsEqual(Member(value, "length"), Constant(0))), Call(Member(value, "some"), [ArrowFunction([item], BuildSchema(stack, context, schema.contains, item))]));
}
function CheckContains(stack, context, schema, value) {
	return IsValid$3(schema) ? !IsEqual$1(value.length, 0) && value.some((item) => CheckSchema(stack, context, schema.contains, item)) : !0;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/dependencies.mjs
function BuildDependencies(stack, context, schema, value) {
	return Or(IsEqual(Member(Keys(value), "length"), Constant(0)), ReduceAnd(Entries$2(schema.dependencies).map(([key, schema]) => {
		let notKey = Not(HasPropertyKey(value, Constant(key))), isSchema = BuildSchema(stack, context, schema, value);
		return Or(notKey, IsArray$1(schema) ? ((schema) => ReduceAnd(schema.map((key) => HasPropertyKey(value, Constant(key)))))(schema) : isSchema);
	})));
}
function CheckDependencies(stack, context, schema, value) {
	let isLength = IsEqual$1(Keys$1(value).length, 0), isEvery = Every$1(Entries$2(schema.dependencies), 0, ([key, schema]) => !HasPropertyKey$1(value, key) || (IsArray$1(schema) ? schema.every((key) => HasPropertyKey$1(value, key)) : CheckSchema(stack, context, schema, value)));
	return isLength || isEvery;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/dependentRequired.mjs
function BuildDependentRequired(_stack, _context, schema, value) {
	return Or(IsEqual(Member(Keys(value), "length"), Constant(0)), ReduceAnd(Entries$2(schema.dependentRequired).map(([key, keys]) => Or(Not(HasPropertyKey(value, Constant(key))), ReduceAnd(keys.map((key) => HasPropertyKey(value, Constant(key))))))));
}
function CheckDependentRequired(_stack, _context, schema, value) {
	let isLength = IsEqual$1(Keys$1(value).length, 0), isEvery = Every$1(Entries$2(schema.dependentRequired), 0, ([key, keys]) => !HasPropertyKey$1(value, key) || keys.every((key) => HasPropertyKey$1(value, key)));
	return isLength || isEvery;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/dependentSchemas.mjs
function BuildDependentSchemas(stack, context, schema, value) {
	return Or(IsEqual(Member(Keys(value), "length"), Constant(0)), ReduceAnd(Entries$2(schema.dependentSchemas).map(([key, schema]) => Or(Not(HasPropertyKey(value, Constant(key))), BuildSchema(stack, context, schema, value)))));
}
function CheckDependentSchemas(stack, context, schema, value) {
	let isLength = IsEqual$1(Keys$1(value).length, 0), isEvery = Every$1(Entries$2(schema.dependentSchemas), 0, ([key, schema]) => !HasPropertyKey$1(value, key) || CheckSchema(stack, context, schema, value));
	return isLength || isEvery;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/dynamicRef.mjs
function BuildDynamicRef(stack, context, schema, value) {
	return CreateFunction(stack, context, stack.DynamicRef(schema) ?? !1, value);
}
function CheckDynamicRef(stack, context, schema, value) {
	let target = stack.DynamicRef(schema) ?? !1;
	return IsSchema(target) && CheckSchema(stack, context, target, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/enum.mjs
function BuildEnum(_stack, _context, schema, value) {
	return ReduceOr(schema.enum.map((option) => IsValueLike(option) ? IsEqual(value, Constant(option)) : IsDeepEqual(value, CreateVariable(option))));
}
function CheckEnum(_stack, _context, schema, value) {
	return schema.enum.some((option) => IsValueLike(option) ? IsEqual$1(value, option) : IsDeepEqual$1(value, option));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/exclusiveMaximum.mjs
function BuildExclusiveMaximum(_stack, _context, schema, value) {
	return IsLessThan(value, Constant(schema.exclusiveMaximum));
}
function CheckExclusiveMaximum(_stack, _context, schema, value) {
	return IsLessThan$1(value, schema.exclusiveMaximum);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/exclusiveMinimum.mjs
function BuildExclusiveMinimum(_stack, _context, schema, value) {
	return IsGreaterThan(value, Constant(schema.exclusiveMinimum));
}
function CheckExclusiveMinimum(_stack, _context, schema, value) {
	return IsGreaterThan$1(value, schema.exclusiveMinimum);
}
//#endregion
//#region ../../node_modules/typebox/build/format/date.mjs
const DAYS = [
	0,
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
function IsLeapYear(year) {
	return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}
/**
* Returns true if the value is a ISO8601 Date component string
* @source ajv-formats
* @example `2020-12-12`
*/
function IsDate(value) {
	let matches = DATE.exec(value);
	if (!matches) return !1;
	let year = +matches[1], month = +matches[2], day = +matches[3];
	return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && IsLeapYear(year) ? 29 : DAYS[month]);
}
//#endregion
//#region ../../node_modules/typebox/build/format/time.mjs
const TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(?:Z|([+-])(\d\d):(\d\d))?$/i;
/**
* Returns true if the value is a ISO time string
* @specification
*/
function IsTime(value, strictTimeZone = !0) {
	let matches = TIME.exec(value);
	if (!matches) return !1;
	let hr = +matches[1], min = +matches[2], sec = +matches[3], tzSign = matches[4] === "-" ? -1 : 1, tzH = +(matches[5] || 0), tzM = +(matches[6] || 0);
	if (tzH > 23 || tzM > 59 || strictTimeZone && !matches[4] && value.toLowerCase().indexOf("z") === -1) return !1;
	if (hr <= 23 && min <= 59 && sec < 60) return !0;
	let utcMin = min - tzM * tzSign, utcHr = hr - tzH * tzSign - +(utcMin < 0);
	return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
}
//#endregion
//#region ../../node_modules/typebox/build/format/date_time.mjs
/**
* Returns true if the value is a ISO8601 DateTime string
* @source ajv-formats
* @example `2020-12-12T20:20:40+00:00`
*/
function IsDateTime(value, strictTimeZone = !0) {
	let dateTime = value.split(/T/i);
	return dateTime.length === 2 && IsDate(dateTime[0]) && IsTime(dateTime[1], strictTimeZone);
}
//#endregion
//#region ../../node_modules/typebox/build/format/duration.mjs
const Duration = /^P((\d+Y(\d+M(\d+D)?)?|\d+M(\d+D)?|\d+D)(T(\d+H(\d+M(\d+S)?)?|\d+M(\d+S)?|\d+S))?|T(\d+H(\d+M(\d+S)?)?|\d+M(\d+S)?|\d+S)|\d+W)$/;
/**
* Returns true if the value is a valid ISO-8601 duration.
* @specification https://tools.ietf.org/html/rfc3339
*/
function IsDuration(value) {
	return Duration.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/email.mjs
const Email = /^(?!.*\.\.)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
* Returns true if the value is an Email
* @specification ajv-formats
*/
function IsEmail(value) {
	return Email.test(value);
}
function Adapt(delta, numPoints, firstTime) {
	delta = firstTime ? Math.floor(delta / 700) : delta >> 1, delta += Math.floor(delta / numPoints);
	let k = 0;
	for (; delta > 455;) delta = Math.floor(delta / 35), k += 36;
	return k + Math.floor(36 * delta / (delta + 38));
}
function Decode(value) {
	let output = [], n = 128, i = 0, bias = 72, delimIdx = value.lastIndexOf("-");
	if (delimIdx > 0) for (let j = 0; j < delimIdx; j++) {
		let cp = value.charCodeAt(j);
		if (cp >= 128) throw Error("Invalid punycode: non-basic before delimiter");
		output.push(cp);
	}
	let inIdx = delimIdx < 0 ? 0 : delimIdx + 1;
	for (; inIdx < value.length;) {
		let oldi = i, w = 1, k = 36;
		for (;;) {
			if (inIdx >= value.length) throw Error("Invalid punycode: unexpected end of input");
			let ch = value.charCodeAt(inIdx++), digit;
			if (ch >= 97 && ch <= 122) digit = ch - 97;
			else if (ch >= 48 && ch <= 57) digit = ch - 48 + 26;
			else if (ch >= 65 && ch <= 90) digit = ch - 65;
			else throw Error("Invalid punycode: bad digit character");
			i += digit * w;
			let t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
			if (digit < t) break;
			w *= 36 - t, k += 36;
		}
		let outLen = output.length + 1;
		bias = Adapt(i - oldi, outLen, oldi === 0), n += Math.floor(i / outLen), i %= outLen, output.splice(i, 0, n), i++;
	}
	return globalThis.String.fromCodePoint(...output);
}
//#endregion
//#region ../../node_modules/typebox/build/format/_idna.mjs
function IsNonspacingMark(cp) {
	return /\p{Mn}/u.test(String.fromCodePoint(cp));
}
function IsSpacingCombiningMark(cp) {
	return /\p{Mc}/u.test(String.fromCodePoint(cp));
}
function IsEnclosingMark(cp) {
	return /\p{Me}/u.test(String.fromCodePoint(cp));
}
function IsCombiningMark(cp) {
	return IsNonspacingMark(cp) || IsSpacingCombiningMark(cp) || IsEnclosingMark(cp);
}
const RFC5892_DISALLOWED = new Set([
	1600,
	2042,
	12334,
	12335,
	12337,
	12338,
	12339,
	12340,
	12341,
	12347
]), VIRAMA_CPS = new Set([
	2381,
	2509,
	2637,
	2765,
	2893,
	3021,
	3149,
	3277,
	3387,
	3388,
	3405,
	3530,
	6980,
	7082,
	7083,
	43456,
	69702,
	69759,
	69817,
	69939,
	69940,
	70080,
	70197,
	70477,
	70722,
	70850,
	71103,
	71231,
	71350,
	72767,
	73028,
	73029
]);
function IsGreek(cp) {
	return /\p{Script=Greek}/u.test(String.fromCodePoint(cp));
}
function IsHebrew(cp) {
	return /\p{Script=Hebrew}/u.test(String.fromCodePoint(cp));
}
function IsHiragana(cp) {
	return /\p{Script=Hiragana}/u.test(String.fromCodePoint(cp));
}
function IsKatakana(cp) {
	return /\p{Script=Katakana}/u.test(String.fromCodePoint(cp));
}
function IsHan(cp) {
	return /\p{Script=Han}/u.test(String.fromCodePoint(cp));
}
function IsArabicIndicDigit(cp) {
	return cp >= 1632 && cp <= 1641;
}
function IsExtendedArabicIndicDigit(cp) {
	return cp >= 1776 && cp <= 1785;
}
function IsVirama(cp) {
	return VIRAMA_CPS.has(cp);
}
function IsUnicodeLabel(value) {
	if (value.length === 0) return !1;
	let cps = [...value].map((c) => c.codePointAt(0)), len = cps.length;
	if (cps[0] === 45 || cps[len - 1] === 45 || len >= 4 && cps[2] === 45 && cps[3] === 45 || IsCombiningMark(cps[0])) return !1;
	let hasJapanese = !1, hasArabicIndic = !1, hasExtendedArabicIndic = !1;
	for (let i = 0; i < len; i++) {
		let cp = cps[i];
		if (RFC5892_DISALLOWED.has(cp)) return !1;
		(IsHiragana(cp) || IsKatakana(cp) || IsHan(cp)) && (hasJapanese = !0), IsArabicIndicDigit(cp) && (hasArabicIndic = !0), IsExtendedArabicIndicDigit(cp) && (hasExtendedArabicIndic = !0);
		let prev = cps[i - 1], next = cps[i + 1];
		switch (cp) {
			case 183:
				if (prev !== 108 || next !== 108) return !1;
				break;
			case 885:
				if (next === void 0 || !IsGreek(next)) return !1;
				break;
			case 1523:
			case 1524:
				if (prev === void 0 || !IsHebrew(prev)) return !1;
				break;
			case 8205:
				if (prev === void 0 || !IsVirama(prev)) return !1;
				break;
			case 12539: break;
		}
	}
	return !(value.includes("・") && !hasJapanese || hasArabicIndic && hasExtendedArabicIndic);
}
function IsAsciiLabel(value) {
	if (value.charCodeAt(0) === 45 || value.charCodeAt(value.length - 1) === 45 || value.length >= 4 && value.charCodeAt(2) === 45 && value.charCodeAt(3) === 45) return !1;
	for (let i = 0; i < value.length; i++) {
		let ch = value.charCodeAt(i);
		if (!(ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 45)) return !1;
	}
	return !0;
}
function IsPuny(value) {
	return value.toLowerCase().startsWith("xn--");
}
function IsPunyLabel(value) {
	try {
		return IsUnicodeLabel(Decode(value.slice(4)));
	} catch {
		return !1;
	}
}
function IsIdnLabel(value) {
	return value.length === 0 || value.length > 63 ? !1 : IsPuny(value) ? IsPunyLabel(value) : IsUnicodeLabel(value);
}
function IsLabel(value) {
	return value.length === 0 || value.length > 63 ? !1 : IsPuny(value) ? IsPunyLabel(value) : IsAsciiLabel(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/hostname.mjs
/**
* Returns true if the value is a valid hostname.
* @specification https://tools.ietf.org/html/rfc1123
* @specification https://tools.ietf.org/html/rfc5891
* @specification https://tools.ietf.org/html/rfc5892
*/
function IsHostname(value) {
	if (value.length === 0 || value.length > 253 || value.charCodeAt(value.length - 1) === 46) return !1;
	for (let label of value.split(".")) if (!IsLabel(label)) return !1;
	return !0;
}
//#endregion
//#region ../../node_modules/typebox/build/format/idn_email.mjs
const IdnEmail = /^(?!.*\.\.)[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+(?:\.[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+)*@[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?(?:\.[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?)*$/iu;
/**
* Returns true if the value is an IdnEmail
* @specification ajv-formats (unicode-extension)
*/
function IsIdnEmail(value) {
	return IdnEmail.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/idn_hostname.mjs
/**
* Returns true if the value is a valid internationalized (IDN) hostname.
* @specification https://tools.ietf.org/html/rfc3490
* @specification https://tools.ietf.org/html/rfc5891
* @specification https://tools.ietf.org/html/rfc5892
*/
function IsIdnHostname(value) {
	if (value.length === 0 || value.includes(" ")) return !1;
	let canonical = value.normalize("NFC").replace(/[\u002E\u3002\uFF0E\uFF61]/g, ".");
	if (canonical.length > 253) return !1;
	for (let label of canonical.split(".")) if (!IsIdnLabel(label)) return !1;
	return !0;
}
//#endregion
//#region ../../node_modules/typebox/build/format/ipv4.mjs
function IsIPv4Internal(value, start, end) {
	let dots = 0, num = 0, digits = 0, leading = 0;
	for (let i = start; i < end; i++) {
		let ch = value.charCodeAt(i);
		if (ch === 46) {
			if (digits === 0 || num > 255 || leading === 48 && digits > 1) return !1;
			dots++, num = 0, digits = 0, leading = 0;
		} else if (ch >= 48 && ch <= 57) digits === 0 && (leading = ch), num = num * 10 + (ch - 48), digits++;
		else return !1;
	}
	return dots === 3 && digits > 0 && num <= 255 && !(leading === 48 && digits > 1);
}
/**
* Returns true if the value is a IPV4 address
* @specification http://tools.ietf.org/html/rfc2673#section-3.2
*/
function IsIPv4(value) {
	return IsIPv4Internal(value, 0, value.length);
}
//#endregion
//#region ../../node_modules/typebox/build/format/ipv6.mjs
function InRange(ch) {
	return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
/**
* Returns true if the value is an IPv6 address
* @specification http://tools.ietf.org/html/rfc2373#section-2.2
*/
function IsIPv6(value) {
	let length = value.length;
	if (length === 0) return !1;
	let groups = 0, compressed = !1, i = 0;
	if (value.charCodeAt(0) === 58 && value.charCodeAt(1) === 58) {
		if (length === 2) return !0;
		compressed = !0, i = 2;
	}
	for (; i < length;) {
		let digits = 0, start = i;
		for (; i < length && InRange(value.charCodeAt(i));) i++, digits++;
		if (digits === 0) return !1;
		let next = value.charCodeAt(i);
		if (next === 46) {
			if (!IsIPv4Internal(value, start, length)) return !1;
			groups += 2, i = length;
			break;
		}
		if (digits > 4) return !1;
		if (groups++, i === length) break;
		if (next !== 58) return !1;
		if (i++, value.charCodeAt(i) === 58) {
			if (compressed || value.charCodeAt(i + 1) === 58) return !1;
			if (compressed = !0, i++, i === length) break;
		}
	}
	return compressed ? groups <= 7 : groups === 8;
}
//#endregion
//#region ../../node_modules/typebox/build/format/iri_reference.mjs
function TryUrl(value) {
	try {
		return new URL(value, "http://example.com"), !0;
	} catch {
		return !1;
	}
}
/**
* Returns true if the value is a Iri reference
* @specification
*/
function IsIriReference(value) {
	if (value.includes(" ") || value.includes("\\") || /[\x00-\x1F\x7F]/.test(value) || /%(?![0-9a-fA-F]{2})/.test(value)) return !1;
	if (value === "") return !0;
	let colonIndex = value.indexOf(":");
	return colonIndex > 0 && /^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(value.substring(0, colonIndex)) ? TryUrl(value) : value.match(/^([a-zA-Z][a-zA-Z0-9+\-.]*)(\/\/)/) && colonIndex === -1 ? !1 : TryUrl(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/iri.mjs
/**
* Returns true if the value is a Iri
* @specification
*/
function IsIri(value) {
	try {
		return new URL(value), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../../node_modules/typebox/build/format/json_pointer_uri_fragment.mjs
const JsonPointerUriFragment = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
/**
* Returns true if the value is a json pointer uri fragment
* @specification
* @source ajv-formats
*/
function IsJsonPointerUriFragment(value) {
	return JsonPointerUriFragment.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/json_pointer.mjs
const JsonPointer = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
/**
* Returns true if the value is a json pointer
* @specification
* @source ajv-formats
*/
function IsJsonPointer(value) {
	return JsonPointer.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/regex.mjs
/**
* Returns true if the value is a regular expression string pattern
* @specification
* @source ajv-formats
*/
function IsRegex(value) {
	if (value.length === 0) return !1;
	try {
		return new RegExp(value), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../../node_modules/typebox/build/format/relative_json_pointer.mjs
const RelativeJsonPointer = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
/**
* Returns true if the value is a relative json pointer
* @specification
* @source ajv-formats
*/
function IsRelativeJsonPointer(value) {
	return RelativeJsonPointer.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/uri_reference.mjs
const UriReference = /^(?!.*[^\x00-\x7F])(?!.*\\)(?:(?:[a-z][a-z0-9+\-.]*:)?(?:\/\/[^\s[\]{}<>^`|]*)?|[^\s[\]{}<>^`|]*)(?:\?[^\s[\]{}<>^`|]*)?(?:#[^\s[\]{}<>^`|]*)?$/i;
/**
* Returns true if the value is a valid URI Reference.
* @specification https://tools.ietf.org/html/rfc3986
*/
function IsUriReference(value) {
	return UriReference.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/uri_template.mjs
const UriTemplate = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
/**
* Returns true if the value is a uri template
* @specification
* @source ajv-formats
*/
function IsUriTemplate(value) {
	return UriTemplate.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/uri.mjs
function IsAlpha(ch) {
	return ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90;
}
function IsAlphaNumeric(ch) {
	return IsAlpha(ch) || ch >= 48 && ch <= 57;
}
function IsHex(ch) {
	return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function IsSchemeChar(ch) {
	return IsAlphaNumeric(ch) || ch === 43 || ch === 45 || ch === 46;
}
function IsUnreserved(ch) {
	return IsAlphaNumeric(ch) || ch === 45 || ch === 46 || ch === 95 || ch === 126;
}
function IsSubDelim(ch) {
	return ch === 33 || ch === 36 || ch === 38 || ch === 39 || ch === 40 || ch === 41 || ch === 42 || ch === 43 || ch === 44 || ch === 59 || ch === 61;
}
function IsPchar(ch) {
	return IsUnreserved(ch) || IsSubDelim(ch) || ch === 58 || ch === 64;
}
/**
* Returns true if the value matches RFC 3986 URI syntax.
* @specification https://tools.ietf.org/html/rfc3986
*/
function IsUri(value) {
	let length = value.length;
	if (length === 0 || !IsAlpha(value.charCodeAt(0))) return !1;
	let i = 1;
	for (; i < length;) {
		let ch = value.charCodeAt(i);
		if (ch === 58) break;
		if (!IsSchemeChar(ch)) return !1;
		i++;
	}
	if (value.charCodeAt(i) !== 58) return !1;
	if (i++, value.charCodeAt(i) === 47 && value.charCodeAt(i + 1) === 47) {
		i += 2;
		let authorityStart = i, atPos = -1;
		for (let j = i; j < length; j++) {
			let ch = value.charCodeAt(j);
			if (ch === 64) {
				atPos = j;
				break;
			}
			if (ch === 47 || ch === 63 || ch === 35) break;
		}
		if (atPos !== -1) {
			for (let j = authorityStart; j < atPos; j++) {
				let ch = value.charCodeAt(j);
				if (ch === 91 || ch === 93) return !1;
				if (ch === 37) {
					if (j + 2 >= atPos || !IsHex(value.charCodeAt(j + 1)) || !IsHex(value.charCodeAt(j + 2))) return !1;
					j += 2;
				} else if (!IsUnreserved(ch) && !IsSubDelim(ch) && ch !== 58) return !1;
			}
			i = atPos + 1;
		}
		if (value.charCodeAt(i) === 91) {
			for (i++; i < length && value.charCodeAt(i) !== 93;) i++;
			if (value.charCodeAt(i) !== 93) return !1;
			i++;
		} else for (; i < length;) {
			let ch = value.charCodeAt(i);
			if (ch === 47 || ch === 63 || ch === 35 || ch === 58) break;
			if (ch < 128 && !IsUnreserved(ch) && !IsSubDelim(ch)) return !1;
			i++;
		}
		if (value.charCodeAt(i) === 58) for (i++; i < length;) {
			let ch = value.charCodeAt(i);
			if (ch === 47 || ch === 63 || ch === 35) break;
			if (ch < 48 || ch > 57) return !1;
			i++;
		}
	}
	for (; i < length;) {
		let ch = value.charCodeAt(i);
		if (ch === 37) {
			if (i + 2 >= length || !IsHex(value.charCodeAt(i + 1)) || !IsHex(value.charCodeAt(i + 2))) return !1;
			i += 2;
		} else if (ch > 127) return !1;
		else if (!(IsPchar(ch) || ch === 47 || ch === 63 || ch === 35)) return !1;
		i++;
	}
	return !0;
}
//#endregion
//#region ../../node_modules/typebox/build/format/url.mjs
const Url = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
/**
* Returns true if the value is a Url
* @specification
* @source ajv-formats
*/
function IsUrl(value) {
	return Url.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/uuid.mjs
const Uuid = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
/**
* Returns true if the value is a uuid
* @specification
* @source ajv-formats
*/
function IsUuid(value) {
	return Uuid.test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/format/_registry.mjs
const formats = /* @__PURE__ */ new Map();
/** Clears all entries */
function Clear() {
	formats.clear();
}
/** Returns format entries in this registry */
function Entries() {
	return [...formats.entries()];
}
/** Sets a format */
function Set$1(format, check) {
	formats.set(format, check);
}
/** Returns true if the registry has this format */
function Has(format) {
	return formats.has(format);
}
/** Gets a format or undefined if not exists */
function Get$1(format) {
	return formats.get(format);
}
/** Tests a value against a format, if the format is not registered, true */
function Test(format, value) {
	return formats.get(format)?.(value) ?? !0;
}
/** Resets all formats to defaults */
function Reset() {
	Clear(), formats.set("date-time", IsDateTime), formats.set("date", IsDate), formats.set("duration", IsDuration), formats.set("email", IsEmail), formats.set("hostname", IsHostname), formats.set("idn-email", IsIdnEmail), formats.set("idn-hostname", IsIdnHostname), formats.set("ipv4", IsIPv4), formats.set("ipv6", IsIPv6), formats.set("iri-reference", IsIriReference), formats.set("iri", IsIri), formats.set("json-pointer-uri-fragment", IsJsonPointerUriFragment), formats.set("json-pointer", IsJsonPointer), formats.set("regex", IsRegex), formats.set("relative-json-pointer", IsRelativeJsonPointer), formats.set("time", IsTime), formats.set("uri-reference", IsUriReference), formats.set("uri-template", IsUriTemplate), formats.set("uri", IsUri), formats.set("url", IsUrl), formats.set("uuid", IsUuid);
}
Reset();
//#endregion
//#region ../../node_modules/typebox/build/format/format.mjs
var format_exports = /* @__PURE__ */ __exportAll({
	Clear: () => Clear,
	Entries: () => Entries,
	Get: () => Get$1,
	Has: () => Has,
	IsDate: () => IsDate,
	IsDateTime: () => IsDateTime,
	IsDuration: () => IsDuration,
	IsEmail: () => IsEmail,
	IsHostname: () => IsHostname,
	IsIPv4: () => IsIPv4,
	IsIPv6: () => IsIPv6,
	IsIdnEmail: () => IsIdnEmail,
	IsIdnHostname: () => IsIdnHostname,
	IsIri: () => IsIri,
	IsIriReference: () => IsIriReference,
	IsJsonPointer: () => IsJsonPointer,
	IsJsonPointerUriFragment: () => IsJsonPointerUriFragment,
	IsRegex: () => IsRegex,
	IsRelativeJsonPointer: () => IsRelativeJsonPointer,
	IsTime: () => IsTime,
	IsUri: () => IsUri,
	IsUriReference: () => IsUriReference,
	IsUriTemplate: () => IsUriTemplate,
	IsUrl: () => IsUrl,
	IsUuid: () => IsUuid,
	Reset: () => Reset,
	Set: () => Set$1,
	Test: () => Test
});
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/format.mjs
function BuildFormat(_stack, _context, schema, value) {
	return Call(Member("Format", "Test"), [Constant(schema.format), value]);
}
function CheckFormat(_stack, _context, schema, value) {
	return Test(schema.format, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/if.mjs
function BuildIf(stack, context, schema, value) {
	let thenSchema = IsThen(schema) ? schema.then : !0, elseSchema = IsElse(schema) ? schema.else : !0;
	return Ternary(BuildSchema(stack, context, schema.if, value), BuildSchema(stack, context, thenSchema, value), BuildSchema(stack, context, elseSchema, value));
}
function CheckIf(stack, context, schema, value) {
	let thenSchema = IsThen(schema) ? schema.then : !0, elseSchema = IsElse(schema) ? schema.else : !0;
	return CheckSchema(stack, context, schema.if, value) ? CheckSchema(stack, context, thenSchema, value) : CheckSchema(stack, context, elseSchema, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/items.mjs
function BuildItemsSized(stack, context, schema, value) {
	return ReduceAnd(schema.items.map((schema, index) => {
		let isLength = IsLessEqualThan(Member(value, "length"), Constant(index)), isSchema = BuildSchemaPushStack(stack, context, schema, `${value}[${index}]`), addIndex = context.AddIndex(Constant(index));
		return Or(isLength, context.UseUnevaluated() ? And(isSchema, addIndex) : isSchema);
	}));
}
function CheckItemsSized(stack, context, schema, value) {
	return Every$1(schema.items, 0, (schema, index) => IsLessEqualThan$1(value.length, index) || CheckSchemaPushStack(stack, context, schema, value[index]) && context.AddIndex(index));
}
function BuildItemsUnsized(stack, context, schema, value) {
	let offset = IsPrefixItems(schema) ? schema.prefixItems.length : 0, isSchema = BuildSchemaPushStack(stack, context, schema.items, "element"), addIndex = context.AddIndex("index"), guarded = context.UseUnevaluated() ? And(isSchema, addIndex) : isSchema;
	return Every(value, Constant(offset), ["element", "index"], guarded);
}
function CheckItemsUnsized(stack, context, schema, value) {
	return Every$1(value, IsPrefixItems(schema) ? schema.prefixItems.length : 0, (element, index) => CheckSchemaPushStack(stack, context, schema.items, element) && context.AddIndex(index));
}
function BuildItems(stack, context, schema, value) {
	return IsItemsSized(schema) ? BuildItemsSized(stack, context, schema, value) : BuildItemsUnsized(stack, context, schema, value);
}
function CheckItems(stack, context, schema, value) {
	return IsItemsSized(schema) ? CheckItemsSized(stack, context, schema, value) : CheckItemsUnsized(stack, context, schema, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/maxContains.mjs
function IsValid$2(schema) {
	return IsContains(schema);
}
function BuildMaxContains(stack, context, schema, value) {
	if (!IsValid$2(schema)) return Constant(!0);
	let [result, item] = [Unique(), Unique()];
	return IsLessEqualThan(Call(Member(value, "reduce"), [ArrowFunction([result, item], Ternary(BuildSchema(stack, context, schema.contains, item), PrefixIncrement(result), result)), Constant(0)]), Constant(schema.maxContains));
}
function CheckMaxContains(stack, context, schema, value) {
	return IsValid$2(schema) ? IsLessEqualThan$1(value.reduce((result, item) => CheckSchema(stack, context, schema.contains, item) ? ++result : result, 0), schema.maxContains) : !0;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/maximum.mjs
function BuildMaximum(_stack, _context, schema, value) {
	return IsLessEqualThan(value, Constant(schema.maximum));
}
function CheckMaximum(_stack, _context, schema, value) {
	return IsLessEqualThan$1(value, schema.maximum);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/maxItems.mjs
function BuildMaxItems(_stack, _context, schema, value) {
	return IsLessEqualThan(Member(value, "length"), Constant(schema.maxItems));
}
function CheckMaxItems(_stack, _context, schema, value) {
	return IsLessEqualThan$1(value.length, schema.maxItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/maxLength.mjs
function BuildMaxLength(_stack, _context, schema, value) {
	return IsMaxLength$1(value, Constant(schema.maxLength));
}
function CheckMaxLength(_stack, _context, schema, value) {
	return IsMaxLength$2(value, schema.maxLength);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/maxProperties.mjs
function BuildMaxProperties(_stack, _context, schema, value) {
	return IsLessEqualThan(Member(Keys(value), "length"), Constant(schema.maxProperties));
}
function CheckMaxProperties(_stack, _context, schema, value) {
	return IsLessEqualThan$1(Keys$1(value).length, schema.maxProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/minContains.mjs
function IsValid$1(schema) {
	return IsContains(schema);
}
function BuildMinContains(stack, context, schema, value) {
	if (!IsValid$1(schema)) return Constant(!0);
	let [result, item] = [Unique(), Unique()];
	return IsGreaterEqualThan(Call(Member(value, "reduce"), [ArrowFunction([result, item], Ternary(BuildSchema(stack, context, schema.contains, item), PrefixIncrement(result), result)), Constant(0)]), Constant(schema.minContains));
}
function CheckMinContains(stack, context, schema, value) {
	return IsValid$1(schema) ? IsGreaterEqualThan$1(value.reduce((result, item) => CheckSchema(stack, context, schema.contains, item) ? ++result : result, 0), schema.minContains) : !0;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/minimum.mjs
function BuildMinimum(_stack, _context, schema, value) {
	return IsGreaterEqualThan(value, Constant(schema.minimum));
}
function CheckMinimum(_stack, _context, schema, value) {
	return IsGreaterEqualThan$1(value, schema.minimum);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/minItems.mjs
function BuildMinItems(_stack, _context, schema, value) {
	return IsGreaterEqualThan(Member(value, "length"), Constant(schema.minItems));
}
function CheckMinItems(_stack, _context, schema, value) {
	return IsGreaterEqualThan$1(value.length, schema.minItems);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/minLength.mjs
function BuildMinLength(_stack, _context, schema, value) {
	return IsMinLength$1(value, Constant(schema.minLength));
}
function CheckMinLength(_stack, _context, schema, value) {
	return IsMinLength$2(value, schema.minLength);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/minProperties.mjs
function BuildMinProperties(_stack, _context, schema, value) {
	return IsGreaterEqualThan(Member(Keys(value), "length"), Constant(schema.minProperties));
}
function CheckMinProperties(_stack, _context, schema, value) {
	return IsGreaterEqualThan$1(Keys$1(value).length, schema.minProperties);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/multipleOf.mjs
function BuildMultipleOf(_stack, _context, schema, value) {
	return MultipleOf(value, Constant(schema.multipleOf));
}
function CheckMultipleOf(_stack, _context, schema, value) {
	return IsMultipleOf$1(value, schema.multipleOf);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/not.mjs
function BuildNotUnevaluated(stack, context, schema, value) {
	return Reducer(stack, context, [schema.not], value, Not(IsEqual(Member("results", "length"), Constant(1))));
}
function BuildNotFast(stack, context, schema, value) {
	return Not(BuildSchema(stack, context, schema.not, value));
}
function BuildNot(stack, context, schema, value) {
	return context.UseUnevaluated() ? BuildNotUnevaluated(stack, context, schema, value) : BuildNotFast(stack, context, schema, value);
}
function CheckNot(stack, context, schema, value) {
	let nextContext = new CheckContext();
	return !CheckSchema(stack, nextContext, schema.not, value) && context.Merge([nextContext]);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/oneOf.mjs
function BuildOneOfUnevaluated(stack, context, schema, value) {
	return Reducer(stack, context, schema.oneOf, value, IsEqual(Member("results", "length"), Constant(1)));
}
function BuildOneOfFast(stack, context, schema, value) {
	return IsEqual(Call(Member(ArrayLiteral(schema.oneOf.map((schema) => BuildSchema(stack, context, schema, value))), "reduce"), [ArrowFunction(["count", "result"], Ternary(IsEqual("result", Constant(!0)), PrefixIncrement("count"), "count")), Constant(0)]), Constant(1));
}
function BuildOneOf(stack, context, schema, value) {
	return context.UseUnevaluated() ? BuildOneOfUnevaluated(stack, context, schema, value) : BuildOneOfFast(stack, context, schema, value);
}
function CheckOneOf(stack, context, schema, value) {
	let passedContexts = schema.oneOf.reduce((result, schema) => {
		let nextContext = new CheckContext();
		return CheckSchema(stack, nextContext, schema, value) ? [...result, nextContext] : result;
	}, []);
	return IsEqual$1(passedContexts.length, 1) && context.Merge(passedContexts);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/pattern.mjs
function BuildPattern(_stack, _context, schema, value) {
	return Call(Member(CreateVariable(IsString$2(schema.pattern) ? new RegExp(schema.pattern, "u") : schema.pattern), "test"), [value]);
}
function CheckPattern(_stack, _context, schema, value) {
	return (IsString$2(schema.pattern) ? new RegExp(schema.pattern, "u") : schema.pattern).test(value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/patternProperties.mjs
function BuildPatternProperties(stack, context, schema, value) {
	return ReduceAnd(Entries$2(schema.patternProperties).map(([pattern, schema]) => {
		let [key, prop] = [Unique(), Unique()], notKey = Not(Call(Member(CreateVariable(new RegExp(pattern, "u")), "test"), [key])), isSchema = BuildSchemaPushStack(stack, context, schema, prop), addKey = context.AddKey(key), guarded = context.UseUnevaluated() ? Or(notKey, And(isSchema, addKey)) : Or(notKey, isSchema);
		return Every(Entries$1(value), Constant(0), [`[${key}, ${prop}]`, "_"], guarded);
	}));
}
function CheckPatternProperties(stack, context, schema, value) {
	return Every$1(Entries$2(schema.patternProperties), 0, ([pattern, schema]) => {
		let regexp = new RegExp(pattern, "u");
		return Every$1(Entries$2(value), 0, ([key, prop]) => !regexp.test(key) || CheckSchemaPushStack(stack, context, schema, prop) && context.AddKey(key));
	});
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/prefixItems.mjs
function BuildPrefixItems(stack, context, schema, value) {
	return ReduceAnd(schema.prefixItems.map((schema, index) => {
		let isLength = IsLessEqualThan(Member(value, "length"), Constant(index)), isSchema = BuildSchemaPushStack(stack, context, schema, `${value}[${index}]`), addIndex = context.AddIndex(Constant(index));
		return Or(isLength, context.UseUnevaluated() ? And(isSchema, addIndex) : isSchema);
	}));
}
function CheckPrefixItems(stack, context, schema, value) {
	return IsEqual$1(value.length, 0) || Every$1(schema.prefixItems, 0, (schema, index) => IsLessEqualThan$1(value.length, index) || CheckSchemaPushStack(stack, context, schema, value[index]) && context.AddIndex(index));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_exact_optional.mjs
function IsExactOptional(required, key) {
	return required.includes(key) || Get$2().exactOptionalPropertyTypes;
}
function InexactOptionalBuild(value, key) {
	return IsUndefined(Member(value, key));
}
function InexactOptionalCheck(value, key) {
	return IsUndefined$1(value[key]);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/properties.mjs
function BuildProperties(stack, context, schema, value) {
	let required = IsRequired(schema) ? schema.required : [];
	return ReduceAnd(Entries$2(schema.properties).map(([key, schema]) => {
		let notKey = Not(HasPropertyKey(value, Constant(key))), isSchema = BuildSchemaPushStack(stack, context, schema, Member(value, key)), addKey = context.AddKey(Constant(key)), guarded = context.UseUnevaluated() ? And(isSchema, addKey) : isSchema, isProperty = required.includes(key) ? guarded : Or(notKey, guarded);
		return IsExactOptional(required, key) ? isProperty : Or(InexactOptionalBuild(value, key), isProperty);
	}));
}
function CheckProperties(stack, context, schema, value) {
	let required = IsRequired(schema) ? schema.required : [];
	return Every$1(Entries$2(schema.properties), 0, ([key, schema]) => {
		let isProperty = !HasPropertyKey$1(value, key) || CheckSchemaPushStack(stack, context, schema, value[key]) && context.AddKey(key);
		return IsExactOptional(required, key) ? isProperty : InexactOptionalCheck(value, key) || isProperty;
	});
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/propertyNames.mjs
function BuildPropertyNames(stack, context, schema, value) {
	let [key, _index] = [Unique(), Unique()];
	return Every(Keys(value), Constant(0), [key, _index], BuildSchema(stack, context, schema.propertyNames, key));
}
function CheckPropertyNames(stack, context, schema, value) {
	return Every$1(Keys$1(value), 0, (key, _index) => CheckSchema(stack, context, schema.propertyNames, key));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/recursiveRef.mjs
function BuildRecursiveRef(stack, context, schema, value) {
	return CreateFunction(stack, context, stack.RecursiveRef(schema) ?? !1, value);
}
function CheckRecursiveRef(stack, context, schema, value) {
	let target = stack.RecursiveRef(schema) ?? !1;
	return IsSchema(target) && CheckSchema(stack, context, target, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/ref.mjs
function BuildRefStandard(stack, context, target, value) {
	let interior = ArrowFunction(["context", "value"], CreateFunction(stack, context, target, "value"));
	return Call(ArrowFunction(["context", "value"], Statements([
		ConstDeclaration("nextContext", New("CheckContext", [])),
		ConstDeclaration("result", Call(interior, ["nextContext", "value"])),
		If("result", context.Merge("[nextContext]")),
		Return("result")
	])), ["context", value]);
}
function BuildRefFast(stack, context, target, value) {
	return CreateFunction(stack, context, target, value);
}
function BuildRef(stack, context, schema, value) {
	let target = stack.Ref(schema) ?? !1;
	return context.UseUnevaluated() ? BuildRefStandard(stack, context, target, value) : BuildRefFast(stack, context, target, value);
}
function CheckRef(stack, context, schema, value) {
	let target = stack.Ref(schema) ?? !1, nextContext = new CheckContext(), result = IsSchema(target) && CheckSchema(stack, nextContext, target, value);
	return result && context.Merge([nextContext]), result;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/required.mjs
function BuildRequired(_stack, _context, schema, value) {
	return ReduceAnd(schema.required.map((key) => HasPropertyKey(value, Constant(key))));
}
function CheckRequired(_stack, _context, schema, value) {
	return Every$1(schema.required, 0, (key) => HasPropertyKey$1(value, key));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/type.mjs
function BuildTypeName(_stack, _context, type, value) {
	return IsEqual$1(type, "object") ? IsObjectNotArray(value) : IsEqual$1(type, "array") ? IsArray(value) : IsEqual$1(type, "boolean") ? IsBoolean$1(value) : IsEqual$1(type, "integer") ? IsInteger(value) : IsEqual$1(type, "number") ? IsNumber$1(value) : IsEqual$1(type, "null") ? IsNull(value) : IsEqual$1(type, "string") ? IsString$1(value) : IsEqual$1(type, "asyncIterator") ? IsAsyncIterator(value) : IsEqual$1(type, "bigint") ? IsBigInt(value) : IsEqual$1(type, "constructor") ? IsConstructor(value) : IsEqual$1(type, "function") ? IsFunction(value) : IsEqual$1(type, "iterator") ? IsIterator(value) : IsEqual$1(type, "symbol") ? IsSymbol(value) : IsEqual$1(type, "undefined") || IsEqual$1(type, "void") ? IsUndefined(value) : Constant(!0);
}
function CheckTypeName(_stack, _context, type, _schema, value) {
	return IsEqual$1(type, "object") ? IsObjectNotArray$1(value) : IsEqual$1(type, "array") ? IsArray$1(value) : IsEqual$1(type, "boolean") ? IsBoolean$2(value) : IsEqual$1(type, "integer") ? IsInteger$1(value) : IsEqual$1(type, "number") ? IsNumber$2(value) : IsEqual$1(type, "null") ? IsNull$1(value) : IsEqual$1(type, "string") ? IsString$2(value) : IsEqual$1(type, "asyncIterator") ? IsAsyncIterator$1(value) : IsEqual$1(type, "bigint") ? IsBigInt$1(value) : IsEqual$1(type, "constructor") ? IsConstructor$1(value) : IsEqual$1(type, "function") ? IsFunction$1(value) : IsEqual$1(type, "iterator") ? IsIterator$1(value) : IsEqual$1(type, "symbol") ? IsSymbol$1(value) : IsEqual$1(type, "undefined") || IsEqual$1(type, "void") ? IsUndefined$1(value) : !0;
}
function BuildTypeNames(stack, context, typenames, value) {
	return ReduceOr(typenames.map((type) => BuildTypeName(stack, context, type, value)));
}
function CheckTypeNames(stack, context, types, schema, value) {
	return types.some((type) => CheckTypeName(stack, context, type, schema, value));
}
function BuildType(stack, context, schema, value) {
	return IsArray$1(schema.type) ? BuildTypeNames(stack, context, schema.type, value) : BuildTypeName(stack, context, schema.type, value);
}
function CheckType(stack, context, schema, value) {
	return IsArray$1(schema.type) ? CheckTypeNames(stack, context, schema.type, schema, value) : CheckTypeName(stack, context, schema.type, schema, value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/unevaluatedItems.mjs
function BuildUnevaluatedItems(stack, context, schema, value) {
	let [index, item] = [Unique(), Unique()], indices = Call(Member("context", "GetIndices"), []), hasIndex = Call(Member("indices", "has"), [index]), isSchema = BuildSchema(stack, context, schema.unevaluatedItems, item), addIndex = Call(Member("context", "AddIndex"), [index]), isEvery = Every(value, Constant(0), [item, index], And(Or(hasIndex, isSchema), addIndex));
	return Call(ArrowFunction(["context"], Statements([ConstDeclaration("indices", indices), Return(isEvery)])), ["context"]);
}
function CheckUnevaluatedItems(stack, context, schema, value) {
	let indices = context.GetIndices();
	return Every$1(value, 0, (item, index) => (indices.has(index) || CheckSchema(stack, context, schema.unevaluatedItems, item)) && context.AddIndex(index));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/unevaluatedProperties.mjs
function BuildUnevaluatedProperties(stack, context, schema, value) {
	let [key, prop] = [Unique(), Unique()], keys = Call(Member("context", "GetKeys"), []), hasKey = Call(Member("keys", "has"), [key]), addKey = Call(Member("context", "AddKey"), [key]), isSchema = BuildSchema(stack, context, schema.unevaluatedProperties, prop), isEvery = Every(Entries$1(value), Constant(0), [`[${key}, ${prop}]`, "_"], Or(hasKey, And(isSchema, addKey)));
	return Call(ArrowFunction(["context"], Statements([ConstDeclaration("keys", keys), Return(isEvery)])), ["context"]);
}
function CheckUnevaluatedProperties(stack, context, schema, value) {
	let keys = context.GetKeys();
	return Every$1(Entries$2(value), 0, ([key, prop]) => keys.has(key) || CheckSchema(stack, context, schema.unevaluatedProperties, prop) && context.AddKey(key));
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/uniqueItems.mjs
function IsValid(schema) {
	return !IsEqual$1(schema.uniqueItems, !1);
}
function BuildUniqueItems(_stack, _context, schema, value) {
	return IsValid(schema) ? IsEqual(Member(New("Set", [Call(Member(value, "map"), [Member("Hashing", "Hash")])]), "size"), Member(value, "length")) : Constant(!0);
}
function CheckUniqueItems(_stack, _context, schema, value) {
	if (!IsValid(schema)) return !0;
	let set = new Set(value.map(Hash)).size, isLength = value.length;
	return IsEqual$1(set, isLength);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/schema.mjs
function HasTypeName(schema, typename) {
	return IsType(schema) && (IsArray$1(schema.type) && schema.type.includes(typename) || IsEqual$1(schema.type, typename));
}
function HasObjectType(schema) {
	return HasTypeName(schema, "object");
}
function HasObjectKeywords(schema) {
	return IsSchemaObject(schema) && (IsAdditionalProperties(schema) || IsDependencies(schema) || IsDependentRequired(schema) || IsDependentSchemas(schema) || IsProperties(schema) || IsPatternProperties(schema) || IsPropertyNames(schema) || IsMinProperties(schema) || IsMaxProperties(schema) || IsRequired(schema) || IsUnevaluatedProperties(schema));
}
function HasArrayType(schema) {
	return HasTypeName(schema, "array");
}
function HasArrayKeywords(schema) {
	return IsSchemaObject(schema) && (IsAdditionalItems(schema) || IsItems(schema) || IsContains(schema) || IsMaxContains(schema) || IsMaxItems(schema) || IsMinContains(schema) || IsMinItems(schema) || IsPrefixItems(schema) || IsUnevaluatedItems(schema) || IsUniqueItems(schema));
}
function HasStringType(schema) {
	return HasTypeName(schema, "string");
}
function HasStringKeywords(schema) {
	return IsSchemaObject(schema) && (IsMinLength(schema) || IsMaxLength(schema) || IsFormat(schema) || IsPattern(schema));
}
function HasNumberType(schema) {
	return HasTypeName(schema, "number") || HasTypeName(schema, "bigint");
}
function HasNumberKeywords(schema) {
	return IsSchemaObject(schema) && (IsMinimum(schema) || IsMaximum(schema) || IsExclusiveMaximum(schema) || IsExclusiveMinimum(schema) || IsMultipleOf(schema));
}
function BuildSchemaPushStack(stack, context, schema, value) {
	return context.UseUnevaluated() ? And(And(context.Push(), BuildSchema(stack, context, schema, value)), context.Pop()) : BuildSchema(stack, context, schema, value);
}
function BuildSchema(stack, context, schema, value) {
	stack.Push(schema);
	let conditions = [];
	if (IsBooleanSchema(schema)) return BuildBooleanSchema(stack, context, schema, value);
	if (IsType(schema) && conditions.push(BuildType(stack, context, schema, value)), HasObjectKeywords(schema)) {
		let constraints = [];
		IsRequired(schema) && constraints.push(BuildRequired(stack, context, schema, value)), IsAdditionalProperties(schema) && constraints.push(BuildAdditionalProperties(stack, context, schema, value)), IsDependencies(schema) && constraints.push(BuildDependencies(stack, context, schema, value)), IsDependentRequired(schema) && constraints.push(BuildDependentRequired(stack, context, schema, value)), IsDependentSchemas(schema) && constraints.push(BuildDependentSchemas(stack, context, schema, value)), IsPatternProperties(schema) && constraints.push(BuildPatternProperties(stack, context, schema, value)), IsProperties(schema) && constraints.push(BuildProperties(stack, context, schema, value)), IsPropertyNames(schema) && constraints.push(BuildPropertyNames(stack, context, schema, value)), IsMinProperties(schema) && constraints.push(BuildMinProperties(stack, context, schema, value)), IsMaxProperties(schema) && constraints.push(BuildMaxProperties(stack, context, schema, value));
		let reduced = ReduceAnd(constraints), guarded = Or(Not(IsObjectNotArray(value)), reduced);
		conditions.push(HasObjectType(schema) ? reduced : guarded);
	}
	if (HasArrayKeywords(schema)) {
		let constraints = [];
		IsAdditionalItems(schema) && constraints.push(BuildAdditionalItems(stack, context, schema, value)), IsContains(schema) && constraints.push(BuildContains(stack, context, schema, value)), IsItems(schema) && constraints.push(BuildItems(stack, context, schema, value)), IsMaxContains(schema) && constraints.push(BuildMaxContains(stack, context, schema, value)), IsMaxItems(schema) && constraints.push(BuildMaxItems(stack, context, schema, value)), IsMinContains(schema) && constraints.push(BuildMinContains(stack, context, schema, value)), IsMinItems(schema) && constraints.push(BuildMinItems(stack, context, schema, value)), IsPrefixItems(schema) && constraints.push(BuildPrefixItems(stack, context, schema, value)), IsUniqueItems(schema) && constraints.push(BuildUniqueItems(stack, context, schema, value));
		let reduced = ReduceAnd(constraints), guarded = Or(Not(IsArray(value)), reduced);
		conditions.push(HasArrayType(schema) ? reduced : guarded);
	}
	if (HasStringKeywords(schema)) {
		let constraints = [];
		IsMaxLength(schema) && constraints.push(BuildMaxLength(stack, context, schema, value)), IsMinLength(schema) && constraints.push(BuildMinLength(stack, context, schema, value)), IsFormat(schema) && constraints.push(BuildFormat(stack, context, schema, value)), IsPattern(schema) && constraints.push(BuildPattern(stack, context, schema, value));
		let reduced = ReduceAnd(constraints), guarded = Or(Not(IsString$1(value)), reduced);
		conditions.push(HasStringType(schema) ? reduced : guarded);
	}
	if (HasNumberKeywords(schema)) {
		let constraints = [];
		IsExclusiveMaximum(schema) && constraints.push(BuildExclusiveMaximum(stack, context, schema, value)), IsExclusiveMinimum(schema) && constraints.push(BuildExclusiveMinimum(stack, context, schema, value)), IsMaximum(schema) && constraints.push(BuildMaximum(stack, context, schema, value)), IsMinimum(schema) && constraints.push(BuildMinimum(stack, context, schema, value)), IsMultipleOf(schema) && constraints.push(BuildMultipleOf(stack, context, schema, value));
		let reduced = ReduceAnd(constraints), guarded = Or(Not(Or(IsNumber$1(value), IsBigInt(value))), reduced);
		conditions.push(HasNumberType(schema) ? reduced : guarded);
	}
	IsRef(schema) && conditions.push(BuildRef(stack, context, schema, value)), IsRecursiveRef(schema) && conditions.push(BuildRecursiveRef(stack, context, schema, value)), IsDynamicRef(schema) && conditions.push(BuildDynamicRef(stack, context, schema, value)), IsGuard(schema) && conditions.push(BuildGuard(stack, context, schema, value)), IsConst(schema) && conditions.push(BuildConst(stack, context, schema, value)), IsEnum(schema) && conditions.push(BuildEnum(stack, context, schema, value)), IsIf(schema) && conditions.push(BuildIf(stack, context, schema, value)), IsNot(schema) && conditions.push(BuildNot(stack, context, schema, value)), IsAllOf(schema) && conditions.push(BuildAllOf(stack, context, schema, value)), IsAnyOf(schema) && conditions.push(BuildAnyOf(stack, context, schema, value)), IsOneOf(schema) && conditions.push(BuildOneOf(stack, context, schema, value)), IsUnevaluatedItems(schema) && conditions.push(Or(Not(IsArray(value)), BuildUnevaluatedItems(stack, context, schema, value))), IsUnevaluatedProperties(schema) && conditions.push(Or(Not(IsObject(value)), BuildUnevaluatedProperties(stack, context, schema, value))), IsRefine(schema) && conditions.push(BuildRefine(stack, context, schema, value));
	let result = ReduceAnd(conditions);
	return stack.Pop(schema), result;
}
function CheckSchemaPushStack(stack, context, schema, value) {
	return context.Push() && CheckSchema(stack, context, schema, value) && context.Pop();
}
function CheckSchema(stack, context, schema, value) {
	stack.Push(schema);
	let result = IsBooleanSchema(schema) ? CheckBooleanSchema(stack, context, schema, value) : (!IsType(schema) || CheckType(stack, context, schema, value)) && (!(IsObject$1(value) && !IsArray$1(value)) || (!IsRequired(schema) || CheckRequired(stack, context, schema, value)) && (!IsAdditionalProperties(schema) || CheckAdditionalProperties(stack, context, schema, value)) && (!IsDependencies(schema) || CheckDependencies(stack, context, schema, value)) && (!IsDependentRequired(schema) || CheckDependentRequired(stack, context, schema, value)) && (!IsDependentSchemas(schema) || CheckDependentSchemas(stack, context, schema, value)) && (!IsPatternProperties(schema) || CheckPatternProperties(stack, context, schema, value)) && (!IsProperties(schema) || CheckProperties(stack, context, schema, value)) && (!IsPropertyNames(schema) || CheckPropertyNames(stack, context, schema, value)) && (!IsMinProperties(schema) || CheckMinProperties(stack, context, schema, value)) && (!IsMaxProperties(schema) || CheckMaxProperties(stack, context, schema, value))) && (!IsArray$1(value) || (!IsAdditionalItems(schema) || CheckAdditionalItems(stack, context, schema, value)) && (!IsContains(schema) || CheckContains(stack, context, schema, value)) && (!IsItems(schema) || CheckItems(stack, context, schema, value)) && (!IsMaxContains(schema) || CheckMaxContains(stack, context, schema, value)) && (!IsMaxItems(schema) || CheckMaxItems(stack, context, schema, value)) && (!IsMinContains(schema) || CheckMinContains(stack, context, schema, value)) && (!IsMinItems(schema) || CheckMinItems(stack, context, schema, value)) && (!IsPrefixItems(schema) || CheckPrefixItems(stack, context, schema, value)) && (!IsUniqueItems(schema) || CheckUniqueItems(stack, context, schema, value))) && (!IsString$2(value) || (!IsMaxLength(schema) || CheckMaxLength(stack, context, schema, value)) && (!IsMinLength(schema) || CheckMinLength(stack, context, schema, value)) && (!IsFormat(schema) || CheckFormat(stack, context, schema, value)) && (!IsPattern(schema) || CheckPattern(stack, context, schema, value))) && (!(IsNumber$2(value) || IsBigInt$1(value)) || (!IsExclusiveMaximum(schema) || CheckExclusiveMaximum(stack, context, schema, value)) && (!IsExclusiveMinimum(schema) || CheckExclusiveMinimum(stack, context, schema, value)) && (!IsMaximum(schema) || CheckMaximum(stack, context, schema, value)) && (!IsMinimum(schema) || CheckMinimum(stack, context, schema, value)) && (!IsMultipleOf(schema) || CheckMultipleOf(stack, context, schema, value))) && (!IsRef(schema) || CheckRef(stack, context, schema, value)) && (!IsRecursiveRef(schema) || CheckRecursiveRef(stack, context, schema, value)) && (!IsDynamicRef(schema) || CheckDynamicRef(stack, context, schema, value)) && (!IsGuard(schema) || CheckGuard(stack, context, schema, value)) && (!IsConst(schema) || CheckConst(stack, context, schema, value)) && (!IsEnum(schema) || CheckEnum(stack, context, schema, value)) && (!IsIf(schema) || CheckIf(stack, context, schema, value)) && (!IsNot(schema) || CheckNot(stack, context, schema, value)) && (!IsAllOf(schema) || CheckAllOf(stack, context, schema, value)) && (!IsAnyOf(schema) || CheckAnyOf(stack, context, schema, value)) && (!IsOneOf(schema) || CheckOneOf(stack, context, schema, value)) && (!IsUnevaluatedItems(schema) || !IsArray$1(value) || CheckUnevaluatedItems(stack, context, schema, value)) && (!IsUnevaluatedProperties(schema) || !IsObject$1(value) || CheckUnevaluatedProperties(stack, context, schema, value)) && (!IsRefine(schema) || CheckRefine(stack, context, schema, value));
	return stack.Pop(schema), result;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_functions.mjs
const functions = /* @__PURE__ */ new Map();
function CreateCallExpression(context, _schema, hash, value) {
	return context.UseUnevaluated() ? Call(`check_${hash}`, ["context", value]) : Call(`check_${hash}`, [value]);
}
function CreateFunctionExpression(stack, context, schema, hash) {
	let expression = BuildSchema(stack, context, schema, "value");
	return context.UseUnevaluated() ? ConstDeclaration(`check_${hash}`, ArrowFunction(["context", "value"], expression)) : ConstDeclaration(`check_${hash}`, ArrowFunction(["value"], expression));
}
function ResetFunctions() {
	functions.clear();
}
function GetFunctions() {
	return [...functions.values()];
}
function CreateFunction(stack, context, schema, value) {
	let hash = IsSchemaObject(schema) ? Hash({
		__baseURL: stack.BaseURL().href,
		...schema
	}) : Hash(schema), call = CreateCallExpression(context, schema, hash, value);
	return functions.has(hash) ? call : (functions.set(hash, ""), functions.set(hash, CreateFunctionExpression(stack, context, schema, hash)), call);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/pointer/pointer.mjs
function GetIndex(index, value) {
	return IsObject$1(value) && !IsUnsafePropertyKey(index) ? value[index] : void 0;
}
function GetIndices(indices, value) {
	return indices.reduce((value, index) => GetIndex(index, value), value);
}
/** Returns an array of path indices for the given pointer */
function Indices(pointer) {
	if (IsEqual$1(pointer.length, 0)) return [];
	let indices = pointer.split("/").map((index) => index.replace(/~1/g, "/").replace(/~0/g, "~"));
	return indices.length > 0 && indices[0] === "" ? indices.slice(1) : indices;
}
/** Gets a value at the pointer, or undefined if not exists */
function Get(value, pointer) {
	return GetIndices(Indices(pointer), value);
}
//#endregion
//#region ../../node_modules/typebox/build/schema/resolve/ref.mjs
function MatchId(schema, base, ref) {
	if (schema.$id === ref.hash) return schema;
	let absoluteId = new URL(schema.$id, base.href), absoluteRef = new URL(ref.href, base.href);
	if (IsEqual$1(absoluteId.pathname, absoluteRef.pathname)) return ref.hash.startsWith("#") ? MatchHash(schema, base, ref) : schema;
}
function MatchAnchor(schema, base, ref) {
	let absoluteAnchor = new URL(`#${schema.$anchor}`, base.href), absoluteRef = new URL(ref.href, base.href);
	return IsEqual$1(absoluteAnchor.href, absoluteRef.href) ? schema : void 0;
}
function MatchDynamicAnchor(schema, base, ref) {
	let absoluteAnchor = new URL(`#${schema.$dynamicAnchor}`, base.href), absoluteRef = new URL(ref.href, base.href);
	return IsEqual$1(absoluteAnchor.href, absoluteRef.href) ? schema : void 0;
}
function MatchHash(schema, _base, ref) {
	if (ref.href.endsWith("#")) return schema;
	if (!ref.hash.startsWith("#")) return;
	let fragment = decodeURIComponent(ref.hash.slice(1));
	if (fragment.startsWith("/")) return Get(schema, fragment);
}
function Match(schema, base, ref) {
	if (IsId(schema)) {
		let result = MatchId(schema, base, ref);
		if (!IsUndefined$1(result)) return result;
	}
	if (IsAnchor(schema)) {
		let result = MatchAnchor(schema, base, ref);
		if (!IsUndefined$1(result)) return result;
	}
	if (IsDynamicAnchor(schema)) {
		let result = MatchDynamicAnchor(schema, base, ref);
		if (!IsUndefined$1(result)) return result;
	}
	return MatchHash(schema, base, ref);
}
function FromArray(schema, base, ref) {
	return schema.reduce((result, item) => {
		let match = FromValue(item, base, ref);
		return IsUndefined$1(match) ? result : match;
	}, void 0);
}
function FromObject(schema, base, ref) {
	return Keys$1(schema).reduce((result, key) => {
		let match = FromValue(schema[key], base, ref);
		return IsUndefined$1(match) ? result : match;
	}, void 0);
}
function FromValue(schema, base, ref) {
	let nextBase = IsSchemaObject(schema) && IsId(schema) ? new URL(schema.$id, base.href) : base;
	if (IsSchemaObject(schema)) {
		let result = Match(schema, nextBase, ref);
		if (!IsUndefined$1(result)) return result;
	}
	if (IsArray$1(schema)) return FromArray(schema, nextBase, ref);
	if (IsObject$1(schema)) return FromObject(schema, nextBase, ref);
}
function Ref(schema, ref) {
	let defaultBase = new URL("http://unknown/"), initialBase = IsId(schema) ? new URL(schema.$id, defaultBase.href) : defaultBase;
	return FromValue(schema, initialBase, new URL(ref, initialBase.href));
}
function DynamicRef(root, base, dynamicRef, dynamicAnchors) {
	let fragmentTarget = dynamicRef.$dynamicRef.startsWith("#") ? Ref(base, dynamicRef.$dynamicRef) : Ref(root, dynamicRef.$dynamicRef);
	if (!IsUndefined$1(fragmentTarget)) return !IsSchemaObject(fragmentTarget) || !IsDynamicAnchor(fragmentTarget) || new URL(dynamicRef.$dynamicRef, "http://unknown/").hash.startsWith("#/") ? fragmentTarget : dynamicAnchors.find((anchor) => anchor.$dynamicAnchor === fragmentTarget.$dynamicAnchor) ?? fragmentTarget;
}
//#endregion
//#region ../../node_modules/typebox/build/schema/engine/_stack.mjs
var __classPrivateFieldGet = function(receiver, state, kind, f) {
	if (kind === "a" && !f) throw TypeError("Private accessor was defined without a getter");
	if (typeof state == "function" ? receiver !== state || !f : !state.has(receiver)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}, _Stack_instances, _Stack_PushResourceAnchors, _Stack_PopResourceAnchors, _Stack_FromContext, _Stack_FromRef, Stack = class {
	constructor(context, schema) {
		_Stack_instances.add(this), this.context = context, this.schema = schema, this.ids = [], this.anchors = [], this.recursiveAnchors = [], this.dynamicAnchors = [];
	}
	BaseURL() {
		return this.ids.reduce((result, schema) => new URL(schema.$id, result), new URL("http://unknown"));
	}
	Base() {
		return this.ids[this.ids.length - 1] ?? this.schema;
	}
	Push(schema) {
		IsSchemaObject(schema) && (IsId(schema) && (this.ids.push(schema), __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_PushResourceAnchors).call(this, schema)), IsAnchor(schema) && this.anchors.push(schema), IsRecursiveAnchorTrue(schema) && this.recursiveAnchors.push(schema), IsDynamicAnchor(schema) && this.dynamicAnchors.push(schema));
	}
	Pop(schema) {
		IsSchemaObject(schema) && (IsId(schema) && (this.ids.pop(), __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_PopResourceAnchors).call(this, schema)), IsAnchor(schema) && this.anchors.pop(), IsRecursiveAnchorTrue(schema) && this.recursiveAnchors.pop(), IsDynamicAnchor(schema) && this.dynamicAnchors.pop());
	}
	Ref(ref) {
		return __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_FromContext).call(this, ref) ?? __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_FromRef).call(this, ref);
	}
	RecursiveRef(recursiveRef) {
		return IsRecursiveAnchorTrue(this.Base()) ? Ref(this.recursiveAnchors[0], recursiveRef.$recursiveRef) : Ref(this.Base(), recursiveRef.$recursiveRef);
	}
	DynamicRef(dynamicRef) {
		let root = this.schema;
		return DynamicRef(root, this.Base(), dynamicRef, this.dynamicAnchors);
	}
};
_Stack_instances = /* @__PURE__ */ new WeakSet(), _Stack_PushResourceAnchors = function _Stack_PushResourceAnchors(schema, isRoot = !0) {
	if (!IsSchemaObject(schema)) return;
	let current = schema;
	if (!(!isRoot && IsId(current))) {
		!isRoot && IsDynamicAnchor(current) && this.dynamicAnchors.push(current);
		for (let key of Keys$1(current)) __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_PushResourceAnchors).call(this, current[key], !1);
	}
}, _Stack_PopResourceAnchors = function _Stack_PopResourceAnchors(schema, isRoot = !0) {
	if (!IsSchemaObject(schema)) return;
	let current = schema;
	if (!(!isRoot && IsId(current))) {
		!isRoot && IsDynamicAnchor(current) && this.dynamicAnchors.pop();
		for (let key of Keys$1(current)) __classPrivateFieldGet(this, _Stack_instances, "m", _Stack_PopResourceAnchors).call(this, current[key], !1);
	}
}, _Stack_FromContext = function(ref) {
	return HasPropertyKey$1(this.context, ref.$ref) ? this.context[ref.$ref] : void 0;
}, _Stack_FromRef = function(ref) {
	let root = this.schema;
	return ref.$ref.startsWith("#") ? Ref(this.Base(), ref.$ref) : Ref(root, ref.$ref);
};
//#endregion
//#region ../../node_modules/typebox/build/schema/build.mjs
function CreateCode(build) {
	return `${build.Functions().join(";\n")}; return (value) => { ${(build.UseUnevaluated() ? ["const context = new CheckContext({}, {})", `return ${build.Entry()}`] : [`return ${build.Entry()}`]).join("; ")} }`;
}
function CreateEvaluatedCheck(build, code) {
	return Evaluate("CheckContext", "Guard", "Format", "Hashing", build.External().identifier, code)(CheckContext, guard_exports, format_exports, hash_exports, build.External().variables);
}
function CreateDynamicCheck(build) {
	let stack = new Stack(build.Context(), build.Schema()), context = new CheckContext();
	return (value) => CheckSchema(stack, context, build.Schema(), value);
}
function CreateCheck(build, code) {
	return CanEvaluate() ? CreateEvaluatedCheck(build, code) : CreateDynamicCheck(build);
}
var EvaluateResult = class {
	constructor(isAccelerated, code, check) {
		this.isAccelerated = isAccelerated, this.code = code, this.check = check;
	}
	IsAccelerated() {
		return this.isAccelerated;
	}
	Code() {
		return this.code;
	}
	Check(value) {
		return this.check(value);
	}
}, BuildResult = class {
	constructor(context, schema, external, functions, entry, useUnevaluated) {
		this.context = context, this.schema = schema, this.external = external, this.functions = functions, this.entry = entry, this.useUnevaluated = useUnevaluated;
	}
	/** Returns the Context used for this build */
	Context() {
		return this.context;
	}
	/** Returns the Schema used for this build */
	Schema() {
		return this.schema;
	}
	/** Returns true if this build requires a Unevaluated context */
	UseUnevaluated() {
		return this.useUnevaluated;
	}
	/** Returns external variables */
	External() {
		return this.external;
	}
	/** Returns check functions */
	Functions() {
		return this.functions;
	}
	/** Return entry function call. */
	Entry() {
		return this.entry;
	}
	/** Evaluates the build into a validation function */
	Evaluate() {
		let code = CreateCode(this), check = CreateCheck(this, code);
		return new EvaluateResult(CanEvaluate(), code, check);
	}
};
/** Builds a schema into a optimized runtime validator */
function Build(...args) {
	let [context, schema] = Match$1(args, {
		2: (context, schema) => [context, schema],
		1: (schema) => [{}, schema]
	});
	ResetExternal(), ResetFunctions();
	let stack = new Stack(context, schema), build = new BuildContext(HasUnevaluated(context, schema)), call = CreateFunction(stack, build, schema, "value"), functions = GetFunctions();
	return new BuildResult(context, schema, GetExternal(), functions, call, build.UseUnevaluated());
}
//#endregion
//#region src/typebox.ts
const compile = (schema) => (ref(Build({}, schema).External().variables), evaluate(!0)), fn = compile(String$1({ pattern: /abc/ })), fn1 = compile(Refine({}, (value) => typeof value == "string"));
console.log(fn("abc")), console.log(fn1("abc"));
//#endregion
