/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
(function() {


}).call(this);
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.3.1

window.Platform=window.Platform||{},window.logFlags=window.logFlags||{},function(a){var b=a.flags||{};location.search.slice(1).split("&").forEach(function(a){a=a.split("="),a[0]&&(b[a[0]]=a[1]||!0)});var c=document.currentScript||document.querySelector('script[src*="platform.js"]');if(c)for(var d,e=c.attributes,f=0;f<e.length;f++)d=e[f],"src"!==d.name&&(b[d.name]=d.value||!0);b.log&&b.log.split(",").forEach(function(a){window.logFlags[a]=!0}),b.shadow=b.shadow||b.shadowdom||b.polyfill,b.shadow="native"===b.shadow?!1:b.shadow||!HTMLElement.prototype.createShadowRoot,b.shadow&&document.querySelectorAll("script").length>1&&console.warn("platform.js is not the first script on the page. See http://www.polymer-project.org/docs/start/platform.html#setup for details."),b.register&&(window.CustomElements=window.CustomElements||{flags:{}},window.CustomElements.flags.register=b.register),b.imports&&(window.HTMLImports=window.HTMLImports||{flags:{}},window.HTMLImports.flags.imports=b.imports),a.flags=b}(Platform),"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}},window.WeakMap=c}(),function(global){"use strict";function detectObjectObserve(){function a(a){b=a}if("function"!=typeof Object.observe||"function"!=typeof Array.observe)return!1;var b=[],c={},d=[];return Object.observe(c,a),Array.observe(d,a),c.id=1,c.id=2,delete c.id,d.push(1,2),d.length=0,Object.deliverChangeRecords(a),5!==b.length?!1:"add"!=b[0].type||"update"!=b[1].type||"delete"!=b[2].type||"splice"!=b[3].type||"splice"!=b[4].type?!1:(Object.unobserve(c,a),Array.unobserve(d,a),!0)}function detectEval(){if("undefined"!=typeof chrome&&chrome.app&&chrome.app.runtime)return!1;try{var a=new Function("","return true;");return a()}catch(b){return!1}}function isIndex(a){return+a===a>>>0}function toNumber(a){return+a}function isObject(a){return a===Object(a)}function areSameValue(a,b){return a===b?0!==a||1/a===1/b:numberIsNaN(a)&&numberIsNaN(b)?!0:a!==a&&b!==b}function getPathCharType(a){if(void 0===a)return"eof";var b=a.charCodeAt(0);switch(b){case 91:case 93:case 46:case 34:case 39:case 48:return a;case 95:case 36:return"ident";case 32:case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return b>=97&&122>=b||b>=65&&90>=b?"ident":b>=49&&57>=b?"number":"else"}function noop(){}function parsePath(a){function b(){if(!(k>=a.length)){var b=a[k+1];return"inSingleQuote"==l&&"'"==b||"inDoubleQuote"==l&&'"'==b?(k++,d=b,m.append(),!0):void 0}}for(var c,d,e,f,g,h,i,j=[],k=-1,l="beforePath",m={push:function(){void 0!==e&&(j.push(e),e=void 0)},append:function(){void 0===e?e=d:e+=d}};l;)if(k++,c=a[k],"\\"!=c||!b(l)){if(f=getPathCharType(c),i=pathStateMachine[l],g=i[f]||i["else"]||"error","error"==g)return;if(l=g[0],h=m[g[1]]||noop,d=void 0===g[2]?c:g[2],h(),"afterPath"===l)return j}}function isIdent(a){return identRegExp.test(a)}function Path(a,b){if(b!==constructorIsPrivate)throw Error("Use Path.get to retrieve path objects");a.length&&Array.prototype.push.apply(this,a.slice()),hasEval&&this.length&&(this.getValueFrom=this.compiledGetValueFromFn())}function getPath(a){if(a instanceof Path)return a;if((null==a||0==a.length)&&(a=""),"string"!=typeof a){if(isIndex(a.length))return new Path(a,constructorIsPrivate);a=String(a)}var b=pathCache[a];if(b)return b;var c=parsePath(a);if(!c)return invalidPath;var b=new Path(c,constructorIsPrivate);return pathCache[a]=b,b}function formatAccessor(a){return isIndex(a)?"["+a+"]":'["'+a.replace(/"/g,'\\"')+'"]'}function dirtyCheck(a){for(var b=0;MAX_DIRTY_CHECK_CYCLES>b&&a.check_();)b++;return global.testingExposeCycleCount&&(global.dirtyCheckCycleCount=b),b>0}function objectIsEmpty(a){for(var b in a)return!1;return!0}function diffIsEmpty(a){return objectIsEmpty(a.added)&&objectIsEmpty(a.removed)&&objectIsEmpty(a.changed)}function diffObjectFromOldObject(a,b){var c={},d={},e={};for(var f in b){var g=a[f];(void 0===g||g!==b[f])&&(f in a?g!==b[f]&&(e[f]=g):d[f]=void 0)}for(var f in a)f in b||(c[f]=a[f]);return Array.isArray(a)&&a.length!==b.length&&(e.length=a.length),{added:c,removed:d,changed:e}}function runEOMTasks(){if(!eomTasks.length)return!1;for(var a=0;a<eomTasks.length;a++)eomTasks[a]();return eomTasks.length=0,!0}function newObservedObject(){function a(a){b&&b.state_===OPENED&&!d&&b.check_(a)}var b,c,d=!1,e=!0;return{open:function(c){if(b)throw Error("ObservedObject in use");e||Object.deliverChangeRecords(a),b=c,e=!1},observe:function(b,d){c=b,d?Array.observe(c,a):Object.observe(c,a)},deliver:function(b){d=b,Object.deliverChangeRecords(a),d=!1},close:function(){b=void 0,Object.unobserve(c,a),observedObjectCache.push(this)}}}function getObservedObject(a,b,c){var d=observedObjectCache.pop()||newObservedObject();return d.open(a),d.observe(b,c),d}function newObservedSet(){function a(b,f){b&&(b===d&&(e[f]=!0),h.indexOf(b)<0&&(h.push(b),Object.observe(b,c)),a(Object.getPrototypeOf(b),f))}function b(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.object!==d||e[c.name]||"setPrototype"===c.type)return!1}return!0}function c(c){if(!b(c)){for(var d,e=0;e<g.length;e++)d=g[e],d.state_==OPENED&&d.iterateObjects_(a);for(var e=0;e<g.length;e++)d=g[e],d.state_==OPENED&&d.check_()}}var d,e,f=0,g=[],h=[],i={object:void 0,objects:h,open:function(b,c){d||(d=c,e={}),g.push(b),f++,b.iterateObjects_(a)},close:function(){if(f--,!(f>0)){for(var a=0;a<h.length;a++)Object.unobserve(h[a],c),Observer.unobservedCount++;g.length=0,h.length=0,d=void 0,e=void 0,observedSetCache.push(this)}}};return i}function getObservedSet(a,b){return lastObservedSet&&lastObservedSet.object===b||(lastObservedSet=observedSetCache.pop()||newObservedSet(),lastObservedSet.object=b),lastObservedSet.open(a,b),lastObservedSet}function Observer(){this.state_=UNOPENED,this.callback_=void 0,this.target_=void 0,this.directObserver_=void 0,this.value_=void 0,this.id_=nextObserverId++}function addToAll(a){Observer._allObserversCount++,collectObservers&&allObservers.push(a)}function removeFromAll(){Observer._allObserversCount--}function ObjectObserver(a){Observer.call(this),this.value_=a,this.oldObject_=void 0}function ArrayObserver(a){if(!Array.isArray(a))throw Error("Provided object is not an Array");ObjectObserver.call(this,a)}function PathObserver(a,b){Observer.call(this),this.object_=a,this.path_=getPath(b),this.directObserver_=void 0}function CompoundObserver(a){Observer.call(this),this.reportChangesOnOpen_=a,this.value_=[],this.directObserver_=void 0,this.observed_=[]}function identFn(a){return a}function ObserverTransform(a,b,c,d){this.callback_=void 0,this.target_=void 0,this.value_=void 0,this.observable_=a,this.getValueFn_=b||identFn,this.setValueFn_=c||identFn,this.dontPassThroughSet_=d}function notify(a,b,c,d){if(!areSameValue(c,d)&&("function"==typeof a.propertyChanged_&&a.propertyChanged_(b,c,d),hasObserve)){var e=a.notifier_;e||(e=a.notifier_=Object.getNotifier(a)),updateRecord.object=a,updateRecord.name=b,updateRecord.oldValue=d,e.notify(updateRecord)}}function diffObjectFromChangeRecords(a,b,c){for(var d={},e={},f=0;f<b.length;f++){var g=b[f];expectedRecordTypes[g.type]?(g.name in c||(c[g.name]=g.oldValue),"update"!=g.type&&("add"!=g.type?g.name in d?(delete d[g.name],delete c[g.name]):e[g.name]=!0:g.name in e?delete e[g.name]:d[g.name]=!0)):(console.error("Unknown changeRecord type: "+g.type),console.error(g))}for(var h in d)d[h]=a[h];for(var h in e)e[h]=void 0;var i={};for(var h in c)if(!(h in d||h in e)){var j=a[h];c[h]!==j&&(i[h]=j)}return{added:d,removed:e,changed:i}}function newSplice(a,b,c){return{index:a,removed:b,addedCount:c}}function ArraySplice(){}function calcSplices(a,b,c,d,e,f){return arraySplice.calcSplices(a,b,c,d,e,f)}function intersect(a,b,c,d){return c>b||a>d?-1:b==c||d==a?0:c>a?d>b?b-c:d-c:b>d?d-a:b-a}function mergeSplice(a,b,c,d){for(var e=newSplice(b,c,d),f=!1,g=0,h=0;h<a.length;h++){var i=a[h];if(i.index+=g,!f){var j=intersect(e.index,e.index+e.removed.length,i.index,i.index+i.addedCount);if(j>=0){a.splice(h,1),h--,g-=i.addedCount-i.removed.length,e.addedCount+=i.addedCount-j;var k=e.removed.length+i.removed.length-j;if(e.addedCount||k){var c=i.removed;if(e.index<i.index){var l=e.removed.slice(0,i.index-e.index);Array.prototype.push.apply(l,c),c=l}if(e.index+e.removed.length>i.index+i.addedCount){var m=e.removed.slice(i.index+i.addedCount-e.index);Array.prototype.push.apply(c,m)}e.removed=c,i.index<e.index&&(e.index=i.index)}else f=!0}else if(e.index<i.index){f=!0,a.splice(h,0,e),h++;var n=e.addedCount-e.removed.length;i.index+=n,g+=n}}}f||a.push(e)}function createInitialSplices(a,b){for(var c=[],d=0;d<b.length;d++){var e=b[d];switch(e.type){case"splice":mergeSplice(c,e.index,e.removed.slice(),e.addedCount);break;case"add":case"update":case"delete":if(!isIndex(e.name))continue;var f=toNumber(e.name);if(0>f)continue;mergeSplice(c,f,[e.oldValue],1);break;default:console.error("Unexpected record type: "+JSON.stringify(e))}}return c}function projectArraySplices(a,b){var c=[];return createInitialSplices(a,b).forEach(function(b){return 1==b.addedCount&&1==b.removed.length?void(b.removed[0]!==a[b.index]&&c.push(b)):void(c=c.concat(calcSplices(a,b.index,b.index+b.addedCount,b.removed,0,b.removed.length)))}),c}var hasObserve=detectObjectObserve(),hasEval=detectEval(),numberIsNaN=global.Number.isNaN||function(a){return"number"==typeof a&&global.isNaN(a)},createObject="__proto__"in{}?function(a){return a}:function(a){var b=a.__proto__;if(!b)return a;var c=Object.create(b);return Object.getOwnPropertyNames(a).forEach(function(b){Object.defineProperty(c,b,Object.getOwnPropertyDescriptor(a,b))}),c},identStart="[$_a-zA-Z]",identPart="[$_a-zA-Z0-9]",identRegExp=new RegExp("^"+identStart+"+"+identPart+"*$"),pathStateMachine={beforePath:{ws:["beforePath"],ident:["inIdent","append"],"[":["beforeElement"],eof:["afterPath"]},inPath:{ws:["inPath"],".":["beforeIdent"],"[":["beforeElement"],eof:["afterPath"]},beforeIdent:{ws:["beforeIdent"],ident:["inIdent","append"]},inIdent:{ident:["inIdent","append"],0:["inIdent","append"],number:["inIdent","append"],ws:["inPath","push"],".":["beforeIdent","push"],"[":["beforeElement","push"],eof:["afterPath","push"]},beforeElement:{ws:["beforeElement"],0:["afterZero","append"],number:["inIndex","append"],"'":["inSingleQuote","append",""],'"':["inDoubleQuote","append",""]},afterZero:{ws:["afterElement","push"],"]":["inPath","push"]},inIndex:{0:["inIndex","append"],number:["inIndex","append"],ws:["afterElement"],"]":["inPath","push"]},inSingleQuote:{"'":["afterElement"],eof:["error"],"else":["inSingleQuote","append"]},inDoubleQuote:{'"':["afterElement"],eof:["error"],"else":["inDoubleQuote","append"]},afterElement:{ws:["afterElement"],"]":["inPath","push"]}},constructorIsPrivate={},pathCache={};Path.get=getPath,Path.prototype=createObject({__proto__:[],valid:!0,toString:function(){for(var a="",b=0;b<this.length;b++){var c=this[b];a+=isIdent(c)?b?"."+c:c:formatAccessor(c)}return a},getValueFrom:function(a){for(var b=0;b<this.length;b++){if(null==a)return;a=a[this[b]]}return a},iterateObjects:function(a,b){for(var c=0;c<this.length;c++){if(c&&(a=a[this[c-1]]),!isObject(a))return;b(a,this[0])}},compiledGetValueFromFn:function(){var a="",b="obj";a+="if (obj != null";for(var c,d=0;d<this.length-1;d++)c=this[d],b+=isIdent(c)?"."+c:formatAccessor(c),a+=" &&\n     "+b+" != null";a+=")\n";var c=this[d];return b+=isIdent(c)?"."+c:formatAccessor(c),a+="  return "+b+";\nelse\n  return undefined;",new Function("obj",a)},setValueFrom:function(a,b){if(!this.length)return!1;for(var c=0;c<this.length-1;c++){if(!isObject(a))return!1;a=a[this[c]]}return isObject(a)?(a[this[c]]=b,!0):!1}});var invalidPath=new Path("",constructorIsPrivate);invalidPath.valid=!1,invalidPath.getValueFrom=invalidPath.setValueFrom=function(){};var MAX_DIRTY_CHECK_CYCLES=1e3,eomTasks=[],runEOM=hasObserve?function(){var a={pingPong:!0},b=!1;return Object.observe(a,function(){runEOMTasks(),b=!1}),function(c){eomTasks.push(c),b||(b=!0,a.pingPong=!a.pingPong)}}():function(){return function(a){eomTasks.push(a)}}(),observedObjectCache=[],observedSetCache=[],lastObservedSet,UNOPENED=0,OPENED=1,CLOSED=2,RESETTING=3,nextObserverId=1;Observer.prototype={open:function(a,b){if(this.state_!=UNOPENED)throw Error("Observer has already been opened.");return addToAll(this),this.callback_=a,this.target_=b,this.connect_(),this.state_=OPENED,this.value_},close:function(){this.state_==OPENED&&(removeFromAll(this),this.disconnect_(),this.value_=void 0,this.callback_=void 0,this.target_=void 0,this.state_=CLOSED)},deliver:function(){this.state_==OPENED&&dirtyCheck(this)},report_:function(a){try{this.callback_.apply(this.target_,a)}catch(b){Observer._errorThrownDuringCallback=!0,console.error("Exception caught during observer callback: "+(b.stack||b))}},discardChanges:function(){return this.check_(void 0,!0),this.value_}};var collectObservers=!hasObserve,allObservers;Observer._allObserversCount=0,collectObservers&&(allObservers=[]);var runningMicrotaskCheckpoint=!1,hasDebugForceFullDelivery=hasObserve&&function(){try{return eval("%RunMicrotasks()"),!0}catch(ex){return!1}}();global.Platform=global.Platform||{},global.Platform.performMicrotaskCheckpoint=function(){if(!runningMicrotaskCheckpoint){if(hasDebugForceFullDelivery)return void eval("%RunMicrotasks()");if(collectObservers){runningMicrotaskCheckpoint=!0;var cycles=0,anyChanged,toCheck;do{cycles++,toCheck=allObservers,allObservers=[],anyChanged=!1;for(var i=0;i<toCheck.length;i++){var observer=toCheck[i];observer.state_==OPENED&&(observer.check_()&&(anyChanged=!0),allObservers.push(observer))}runEOMTasks()&&(anyChanged=!0)}while(MAX_DIRTY_CHECK_CYCLES>cycles&&anyChanged);global.testingExposeCycleCount&&(global.dirtyCheckCycleCount=cycles),runningMicrotaskCheckpoint=!1}}},collectObservers&&(global.Platform.clearObservers=function(){allObservers=[]}),ObjectObserver.prototype=createObject({__proto__:Observer.prototype,arrayObserve:!1,connect_:function(){hasObserve?this.directObserver_=getObservedObject(this,this.value_,this.arrayObserve):this.oldObject_=this.copyObject(this.value_)},copyObject:function(a){var b=Array.isArray(a)?[]:{};for(var c in a)b[c]=a[c];return Array.isArray(a)&&(b.length=a.length),b},check_:function(a){var b,c;if(hasObserve){if(!a)return!1;c={},b=diffObjectFromChangeRecords(this.value_,a,c)}else c=this.oldObject_,b=diffObjectFromOldObject(this.value_,this.oldObject_);return diffIsEmpty(b)?!1:(hasObserve||(this.oldObject_=this.copyObject(this.value_)),this.report_([b.added||{},b.removed||{},b.changed||{},function(a){return c[a]}]),!0)},disconnect_:function(){hasObserve?(this.directObserver_.close(),this.directObserver_=void 0):this.oldObject_=void 0},deliver:function(){this.state_==OPENED&&(hasObserve?this.directObserver_.deliver(!1):dirtyCheck(this))},discardChanges:function(){return this.directObserver_?this.directObserver_.deliver(!0):this.oldObject_=this.copyObject(this.value_),this.value_}}),ArrayObserver.prototype=createObject({__proto__:ObjectObserver.prototype,arrayObserve:!0,copyObject:function(a){return a.slice()},check_:function(a){var b;if(hasObserve){if(!a)return!1;b=projectArraySplices(this.value_,a)}else b=calcSplices(this.value_,0,this.value_.length,this.oldObject_,0,this.oldObject_.length);return b&&b.length?(hasObserve||(this.oldObject_=this.copyObject(this.value_)),this.report_([b]),!0):!1}}),ArrayObserver.applySplices=function(a,b,c){c.forEach(function(c){for(var d=[c.index,c.removed.length],e=c.index;e<c.index+c.addedCount;)d.push(b[e]),e++;Array.prototype.splice.apply(a,d)})},PathObserver.prototype=createObject({__proto__:Observer.prototype,get path(){return this.path_},connect_:function(){hasObserve&&(this.directObserver_=getObservedSet(this,this.object_)),this.check_(void 0,!0)},disconnect_:function(){this.value_=void 0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},iterateObjects_:function(a){this.path_.iterateObjects(this.object_,a)},check_:function(a,b){var c=this.value_;return this.value_=this.path_.getValueFrom(this.object_),b||areSameValue(this.value_,c)?!1:(this.report_([this.value_,c,this]),!0)},setValue:function(a){this.path_&&this.path_.setValueFrom(this.object_,a)}});var observerSentinel={};CompoundObserver.prototype=createObject({__proto__:Observer.prototype,connect_:function(){if(hasObserve){for(var a,b=!1,c=0;c<this.observed_.length;c+=2)if(a=this.observed_[c],a!==observerSentinel){b=!0;break}b&&(this.directObserver_=getObservedSet(this,a))}this.check_(void 0,!this.reportChangesOnOpen_)},disconnect_:function(){for(var a=0;a<this.observed_.length;a+=2)this.observed_[a]===observerSentinel&&this.observed_[a+1].close();this.observed_.length=0,this.value_.length=0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},addPath:function(a,b){if(this.state_!=UNOPENED&&this.state_!=RESETTING)throw Error("Cannot add paths once started.");var b=getPath(b);if(this.observed_.push(a,b),this.reportChangesOnOpen_){var c=this.observed_.length/2-1;this.value_[c]=b.getValueFrom(a)}},addObserver:function(a){if(this.state_!=UNOPENED&&this.state_!=RESETTING)throw Error("Cannot add observers once started.");if(this.observed_.push(observerSentinel,a),this.reportChangesOnOpen_){var b=this.observed_.length/2-1;this.value_[b]=a.open(this.deliver,this)}},startReset:function(){if(this.state_!=OPENED)throw Error("Can only reset while open");this.state_=RESETTING,this.disconnect_()},finishReset:function(){if(this.state_!=RESETTING)throw Error("Can only finishReset after startReset");return this.state_=OPENED,this.connect_(),this.value_},iterateObjects_:function(a){for(var b,c=0;c<this.observed_.length;c+=2)b=this.observed_[c],b!==observerSentinel&&this.observed_[c+1].iterateObjects(b,a)},check_:function(a,b){for(var c,d=0;d<this.observed_.length;d+=2){var e,f=this.observed_[d],g=this.observed_[d+1];if(f===observerSentinel){var h=g;e=this.state_===UNOPENED?h.open(this.deliver,this):h.discardChanges()}else e=g.getValueFrom(f);b?this.value_[d/2]=e:areSameValue(e,this.value_[d/2])||(c=c||[],c[d/2]=this.value_[d/2],this.value_[d/2]=e)}return c?(this.report_([this.value_,c,this.observed_]),!0):!1}}),ObserverTransform.prototype={open:function(a,b){return this.callback_=a,this.target_=b,this.value_=this.getValueFn_(this.observable_.open(this.observedCallback_,this)),this.value_},observedCallback_:function(a){if(a=this.getValueFn_(a),!areSameValue(a,this.value_)){var b=this.value_;this.value_=a,this.callback_.call(this.target_,this.value_,b)}},discardChanges:function(){return this.value_=this.getValueFn_(this.observable_.discardChanges()),this.value_},deliver:function(){return this.observable_.deliver()},setValue:function(a){return a=this.setValueFn_(a),!this.dontPassThroughSet_&&this.observable_.setValue?this.observable_.setValue(a):void 0},close:function(){this.observable_&&this.observable_.close(),this.callback_=void 0,this.target_=void 0,this.observable_=void 0,this.value_=void 0,this.getValueFn_=void 0,this.setValueFn_=void 0}};var expectedRecordTypes={add:!0,update:!0,"delete":!0},updateRecord={object:void 0,type:"update",name:void 0,oldValue:void 0};Observer.createBindablePrototypeAccessor=function(a,b){var c=b+"_",d=b+"Observable_";a[c]=a[b],Object.defineProperty(a,b,{get:function(){var a=this[d];return a&&a.deliver(),this[c]},set:function(a){var e=this[d];if(e)return void e.setValue(a);var f=this[c];return this[c]=a,notify(this,b,a,f),a},configurable:!0})},Observer.bindToInstance=function(a,b,c,d){var e=b+"_",f=b+"Observable_";a[f]=c;var g=a[e],h=c.open(function(c,d){a[e]=c,notify(a,b,c,d)});if(d&&!areSameValue(g,h)){var i=d(g,h);areSameValue(h,i)||(h=i,c.setValue&&c.setValue(h))}return a[e]=h,notify(a,b,h,g),{close:function(){c.close(),a[f]=void 0}}};var EDIT_LEAVE=0,EDIT_UPDATE=1,EDIT_ADD=2,EDIT_DELETE=3;ArraySplice.prototype={calcEditDistances:function(a,b,c,d,e,f){for(var g=f-e+1,h=c-b+1,i=new Array(g),j=0;g>j;j++)i[j]=new Array(h),i[j][0]=j;for(var k=0;h>k;k++)i[0][k]=k;for(var j=1;g>j;j++)for(var k=1;h>k;k++)if(this.equals(a[b+k-1],d[e+j-1]))i[j][k]=i[j-1][k-1];else{var l=i[j-1][k]+1,m=i[j][k-1]+1;i[j][k]=m>l?l:m}return i},spliceOperationsFromEditDistances:function(a){for(var b=a.length-1,c=a[0].length-1,d=a[b][c],e=[];b>0||c>0;)if(0!=b)if(0!=c){var f,g=a[b-1][c-1],h=a[b-1][c],i=a[b][c-1];f=i>h?g>h?h:g:g>i?i:g,f==g?(g==d?e.push(EDIT_LEAVE):(e.push(EDIT_UPDATE),d=g),b--,c--):f==h?(e.push(EDIT_DELETE),b--,d=h):(e.push(EDIT_ADD),c--,d=i)}else e.push(EDIT_DELETE),b--;else e.push(EDIT_ADD),c--;return e.reverse(),e},calcSplices:function(a,b,c,d,e,f){var g=0,h=0,i=Math.min(c-b,f-e);if(0==b&&0==e&&(g=this.sharedPrefix(a,d,i)),c==a.length&&f==d.length&&(h=this.sharedSuffix(a,d,i-g)),b+=g,e+=g,c-=h,f-=h,c-b==0&&f-e==0)return[];if(b==c){for(var j=newSplice(b,[],0);f>e;)j.removed.push(d[e++]);return[j]}if(e==f)return[newSplice(b,[],c-b)];for(var k=this.spliceOperationsFromEditDistances(this.calcEditDistances(a,b,c,d,e,f)),j=void 0,l=[],m=b,n=e,o=0;o<k.length;o++)switch(k[o]){case EDIT_LEAVE:j&&(l.push(j),j=void 0),m++,n++;break;case EDIT_UPDATE:j||(j=newSplice(m,[],0)),j.addedCount++,m++,j.removed.push(d[n]),n++;break;case EDIT_ADD:j||(j=newSplice(m,[],0)),j.addedCount++,m++;break;case EDIT_DELETE:j||(j=newSplice(m,[],0)),j.removed.push(d[n]),n++}return j&&l.push(j),l},sharedPrefix:function(a,b,c){for(var d=0;c>d;d++)if(!this.equals(a[d],b[d]))return d;return c},sharedSuffix:function(a,b,c){for(var d=a.length,e=b.length,f=0;c>f&&this.equals(a[--d],b[--e]);)f++;return f},calculateSplices:function(a,b){return this.calcSplices(a,0,a.length,b,0,b.length)},equals:function(a,b){return a===b}};var arraySplice=new ArraySplice;global.Observer=Observer,global.Observer.runEOM_=runEOM,global.Observer.observerSentinel_=observerSentinel,global.Observer.hasObjectObserve=hasObserve,global.ArrayObserver=ArrayObserver,global.ArrayObserver.calculateSplices=function(a,b){return arraySplice.calculateSplices(a,b)},global.ArraySplice=ArraySplice,global.ObjectObserver=ObjectObserver,global.PathObserver=PathObserver,global.CompoundObserver=CompoundObserver,global.Path=Path,global.ObserverTransform=ObserverTransform}("undefined"!=typeof global&&global&&"undefined"!=typeof module&&module?global:this||window),Platform.flags.shadow?(window.ShadowDOMPolyfill={},function(a){"use strict";function b(){if("undefined"!=typeof chrome&&chrome.app&&chrome.app.runtime)return!1;try{var a=new Function("return true;");return a()}catch(b){return!1}}function c(a){if(!a)throw new Error("Assertion failed")}function d(a,b){for(var c=L(b),d=0;d<c.length;d++){var e=c[d];K(a,e,M(b,e))}return a}function e(a,b){for(var c=L(b),d=0;d<c.length;d++){var e=c[d];switch(e){case"arguments":case"caller":case"length":case"name":case"prototype":case"toString":continue}K(a,e,M(b,e))}return a}function f(a,b){for(var c=0;c<b.length;c++)if(b[c]in a)return b[c]}function g(a,b,c){N.value=c,K(a,b,N)}function h(a){var b=a.__proto__||Object.getPrototypeOf(a),c=G.get(b);if(c)return c;var d=h(b),e=v(d);return s(b,e,a),e}function i(a,b){q(a,b,!0)}function j(a,b){q(b,a,!1)}function k(a){return/^on[a-z]+$/.test(a)}function l(a){return/^\w[a-zA-Z_0-9]*$/.test(a)}function m(a){return J&&l(a)?new Function("return this.impl."+a):function(){return this.impl[a]}}function n(a){return J&&l(a)?new Function("v","this.impl."+a+" = v"):function(b){this.impl[a]=b}}function o(a){return J&&l(a)?new Function("return this.impl."+a+".apply(this.impl, arguments)"):function(){return this.impl[a].apply(this.impl,arguments)}}function p(a,b){try{return Object.getOwnPropertyDescriptor(a,b)}catch(c){return P}}function q(b,c,d){for(var e=L(b),f=0;f<e.length;f++){var g=e[f];if("polymerBlackList_"!==g&&!(g in c||b.polymerBlackList_&&b.polymerBlackList_[g])){O&&b.__lookupGetter__(g);var h,i,j=p(b,g);if(d&&"function"==typeof j.value)c[g]=o(g);else{var l=k(g);h=l?a.getEventHandlerGetter(g):m(g),(j.writable||j.set)&&(i=l?a.getEventHandlerSetter(g):n(g)),K(c,g,{get:h,set:i,configurable:j.configurable,enumerable:j.enumerable})}}}}function r(a,b,c){var d=a.prototype;s(d,b,c),e(b,a)}function s(a,b,d){var e=b.prototype;c(void 0===G.get(a)),G.set(a,b),H.set(e,a),i(a,e),d&&j(e,d),g(e,"constructor",b),b.prototype=e}function t(a,b){return G.get(b.prototype)===a}function u(a){var b=Object.getPrototypeOf(a),c=h(b),d=v(c);return s(b,d,a),d}function v(a){function b(b){a.call(this,b)}var c=Object.create(a.prototype);return c.constructor=b,b.prototype=c,b}function w(a){return a instanceof I.EventTarget||a instanceof I.Event||a instanceof I.Range||a instanceof I.DOMImplementation||a instanceof I.CanvasRenderingContext2D||I.WebGLRenderingContext&&a instanceof I.WebGLRenderingContext}function x(a){return R&&a instanceof R||a instanceof T||a instanceof S||a instanceof U||a instanceof V||a instanceof Q||a instanceof W||X&&a instanceof X||Y&&a instanceof Y}function y(a){return null===a?null:(c(x(a)),a.polymerWrapper_||(a.polymerWrapper_=new(h(a))(a)))}function z(a){return null===a?null:(c(w(a)),a.impl)}function A(a){return a&&w(a)?z(a):a}function B(a){return a&&!w(a)?y(a):a}function C(a,b){null!==b&&(c(x(a)),c(void 0===b||w(b)),a.polymerWrapper_=b)}function D(a,b,c){Z.get=c,K(a.prototype,b,Z)}function E(a,b){D(a,b,function(){return y(this.impl[b])})}function F(a,b){a.forEach(function(a){b.forEach(function(b){a.prototype[b]=function(){var a=B(this);return a[b].apply(a,arguments)}})})}var G=new WeakMap,H=new WeakMap,I=Object.create(null),J=b(),K=Object.defineProperty,L=Object.getOwnPropertyNames,M=Object.getOwnPropertyDescriptor,N={value:void 0,configurable:!0,enumerable:!1,writable:!0};L(window);var O=/Firefox/.test(navigator.userAgent),P={get:function(){},set:function(){},configurable:!0,enumerable:!0},Q=window.DOMImplementation,R=window.EventTarget,S=window.Event,T=window.Node,U=window.Window,V=window.Range,W=window.CanvasRenderingContext2D,X=window.WebGLRenderingContext,Y=window.SVGElementInstance,Z={get:void 0,configurable:!0,enumerable:!0};a.assert=c,a.constructorTable=G,a.defineGetter=D,a.defineWrapGetter=E,a.forwardMethodsToWrapper=F,a.isWrapper=w,a.isWrapperFor=t,a.mixin=d,a.nativePrototypeTable=H,a.oneOf=f,a.registerObject=u,a.registerWrapper=r,a.rewrap=C,a.unwrap=z,a.unwrapIfNeeded=A,a.wrap=y,a.wrapIfNeeded=B,a.wrappers=I}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){g=!1;var a=f.slice(0);f=[];for(var b=0;b<a.length;b++)a[b]()}function c(a){f.push(a),g||(g=!0,d(b,0))}var d,e=window.MutationObserver,f=[],g=!1;if(e){var h=1,i=new e(b),j=document.createTextNode(h);i.observe(j,{characterData:!0}),d=function(){h=(h+1)%2,j.data=h}}else d=window.setImmediate||window.setTimeout;a.setEndOfMicrotask=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){p||(k(c),p=!0)}function c(){p=!1;do for(var a=o.slice(),b=!1,c=0;c<a.length;c++){var d=a[c],e=d.takeRecords();f(d),e.length&&(d.callback_(e,d),b=!0)}while(b)}function d(a,b){this.type=a,this.target=b,this.addedNodes=new m.NodeList,this.removedNodes=new m.NodeList,this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function e(a,b){for(;a;a=a.parentNode){var c=n.get(a);if(c)for(var d=0;d<c.length;d++){var e=c[d];e.options.subtree&&e.addTransientObserver(b)}}}function f(a){for(var b=0;b<a.nodes_.length;b++){var c=a.nodes_[b],d=n.get(c);if(!d)return;for(var e=0;e<d.length;e++){var f=d[e];f.observer===a&&f.removeTransientObservers()}}}function g(a,c,e){for(var f=Object.create(null),g=Object.create(null),h=a;h;h=h.parentNode){var i=n.get(h);if(i)for(var j=0;j<i.length;j++){var k=i[j],l=k.options;if((h===a||l.subtree)&&!("attributes"===c&&!l.attributes||"attributes"===c&&l.attributeFilter&&(null!==e.namespace||-1===l.attributeFilter.indexOf(e.name))||"characterData"===c&&!l.characterData||"childList"===c&&!l.childList)){var m=k.observer;f[m.uid_]=m,("attributes"===c&&l.attributeOldValue||"characterData"===c&&l.characterDataOldValue)&&(g[m.uid_]=e.oldValue)}}}var o=!1;for(var p in f){var m=f[p],q=new d(c,a);"name"in e&&"namespace"in e&&(q.attributeName=e.name,q.attributeNamespace=e.namespace),e.addedNodes&&(q.addedNodes=e.addedNodes),e.removedNodes&&(q.removedNodes=e.removedNodes),e.previousSibling&&(q.previousSibling=e.previousSibling),e.nextSibling&&(q.nextSibling=e.nextSibling),void 0!==g[p]&&(q.oldValue=g[p]),m.records_.push(q),o=!0}o&&b()}function h(a){if(this.childList=!!a.childList,this.subtree=!!a.subtree,this.attributes="attributes"in a||!("attributeOldValue"in a||"attributeFilter"in a)?!!a.attributes:!0,this.characterData="characterDataOldValue"in a&&!("characterData"in a)?!0:!!a.characterData,!this.attributes&&(a.attributeOldValue||"attributeFilter"in a)||!this.characterData&&a.characterDataOldValue)throw new TypeError;if(this.characterData=!!a.characterData,this.attributeOldValue=!!a.attributeOldValue,this.characterDataOldValue=!!a.characterDataOldValue,"attributeFilter"in a){if(null==a.attributeFilter||"object"!=typeof a.attributeFilter)throw new TypeError;this.attributeFilter=q.call(a.attributeFilter)}else this.attributeFilter=null}function i(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++r,o.push(this)}function j(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var k=a.setEndOfMicrotask,l=a.wrapIfNeeded,m=a.wrappers,n=new WeakMap,o=[],p=!1,q=Array.prototype.slice,r=0;i.prototype={observe:function(a,b){a=l(a);var c,d=new h(b),e=n.get(a);e||n.set(a,e=[]);for(var f=0;f<e.length;f++)e[f].observer===this&&(c=e[f],c.removeTransientObservers(),c.options=d);c||(c=new j(this,a,d),e.push(c),this.nodes_.push(a))},disconnect:function(){this.nodes_.forEach(function(a){for(var b=n.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}},j.prototype={addTransientObserver:function(a){if(a!==this.target){this.transientObservedNodes.push(a);var b=n.get(a);b||n.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[];for(var b=0;b<a.length;b++)for(var c=a[b],d=n.get(c),e=0;e<d.length;e++)if(d[e]===this){d.splice(e,1);break}}},a.enqueueMutation=g,a.registerTransientObservers=e,a.wrappers.MutationObserver=i,a.wrappers.MutationRecord=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){this.root=a,this.parent=b}function c(a,b){if(a.treeScope_!==b){a.treeScope_=b;for(var d=a.shadowRoot;d;d=d.olderShadowRoot)d.treeScope_.parent=b;for(var e=a.firstChild;e;e=e.nextSibling)c(e,b)}}function d(c){if(c instanceof a.wrappers.Window,c.treeScope_)return c.treeScope_;var e,f=c.parentNode;return e=f?d(f):new b(c,null),c.treeScope_=e}b.prototype={get renderer(){return this.root instanceof a.wrappers.ShadowRoot?a.getRendererForHost(this.root.host):null},contains:function(a){for(;a;a=a.parent)if(a===this)return!0;return!1}},a.TreeScope=b,a.getTreeScope=d,a.setTreeScope=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a instanceof Q.ShadowRoot}function c(a){return L(a).root}function d(a,d){var h=[],i=a;for(h.push(i);i;){var j=g(i);if(j&&j.length>0){for(var k=0;k<j.length;k++){var m=j[k];if(f(m)){var n=c(m),o=n.olderShadowRoot;o&&h.push(o)}h.push(m)}i=j[j.length-1]}else if(b(i)){if(l(a,i)&&e(d))break;i=i.host,h.push(i)}else i=i.parentNode,i&&h.push(i)}return h}function e(a){if(!a)return!1;switch(a.type){case"abort":case"error":case"select":case"change":case"load":case"reset":case"resize":case"scroll":case"selectstart":return!0}return!1}function f(a){return a instanceof HTMLShadowElement}function g(b){return a.getDestinationInsertionPoints(b)}function h(a,b){if(0===a.length)return b;b instanceof Q.Window&&(b=b.document);for(var c=L(b),d=a[0],e=L(d),f=j(c,e),g=0;g<a.length;g++){var h=a[g];
if(L(h)===f)return h}return a[a.length-1]}function i(a){for(var b=[];a;a=a.parent)b.push(a);return b}function j(a,b){for(var c=i(a),d=i(b),e=null;c.length>0&&d.length>0;){var f=c.pop(),g=d.pop();if(f!==g)break;e=f}return e}function k(a,b,c){b instanceof Q.Window&&(b=b.document);var e,f=L(b),g=L(c),h=d(c,a),e=j(f,g);e||(e=g.root);for(var i=e;i;i=i.parent)for(var k=0;k<h.length;k++){var l=h[k];if(L(l)===i)return l}return null}function l(a,b){return L(a)===L(b)}function m(a){if(!S.get(a)&&(S.set(a,!0),n(P(a),P(a.target)),J)){var b=J;throw J=null,b}}function n(b,c){if(T.get(b))throw new Error("InvalidStateError");T.set(b,!0),a.renderAllPending();var e,f,g,h=b.type;if("load"===h&&!b.bubbles){var i=c;i instanceof Q.Document&&(g=i.defaultView)&&(f=i,e=[])}if(!e)if(c instanceof Q.Window)g=c,e=[];else if(e=d(c,b),"load"!==b.type){var i=e[e.length-1];i instanceof Q.Document&&(g=i.defaultView)}return _.set(b,e),o(b,e,g,f)&&p(b,e,g,f)&&q(b,e,g,f),X.set(b,ab),V.delete(b,null),T.delete(b),b.defaultPrevented}function o(a,b,c,d){var e=bb;if(c&&!r(c,a,e,b,d))return!1;for(var f=b.length-1;f>0;f--)if(!r(b[f],a,e,b,d))return!1;return!0}function p(a,b,c,d){var e=cb,f=b[0]||c;return r(f,a,e,b,d)}function q(a,b,c,d){for(var e=db,f=1;f<b.length;f++)if(!r(b[f],a,e,b,d))return;c&&b.length>0&&r(c,a,e,b,d)}function r(a,b,c,d,e){var f=R.get(a);if(!f)return!0;var g=e||h(d,a);if(g===a){if(c===bb)return!0;c===db&&(c=cb)}else if(c===db&&!b.bubbles)return!0;if("relatedTarget"in b){var i=O(b),j=i.relatedTarget;if(j){if(j instanceof Object&&j.addEventListener){var l=P(j),m=k(b,a,l);if(m===g)return!0}else m=null;W.set(b,m)}}X.set(b,c);var n=b.type,o=!1;U.set(b,g),V.set(b,a);for(var p=0,q=f.length;q>p;p++){var r=f[p];if(r.removed)o=!0;else if(!(r.type!==n||!r.capture&&c===bb||r.capture&&c===db))try{if("function"==typeof r.handler?r.handler.call(a,b):r.handler.handleEvent(b),Z.get(b))return!1}catch(s){J||(J=s)}}if(o){var t=f.slice();f.length=0;for(var p=0;p<t.length;p++)t[p].removed||f.push(t[p])}return!Y.get(b)}function s(a,b,c){this.type=a,this.handler=b,this.capture=Boolean(c)}function t(a,b){if(!(a instanceof eb))return P(x(eb,"Event",a,b));var c=a;return pb||"beforeunload"!==c.type?void(this.impl=c):new y(c)}function u(a){return a&&a.relatedTarget?Object.create(a,{relatedTarget:{value:O(a.relatedTarget)}}):a}function v(a,b,c){var d=window[a],e=function(b,c){return b instanceof d?void(this.impl=b):P(x(d,a,b,c))};if(e.prototype=Object.create(b.prototype),c&&M(e.prototype,c),d)try{N(d,e,new d("temp"))}catch(f){N(d,e,document.createEvent(a))}return e}function w(a,b){return function(){arguments[b]=O(arguments[b]);var c=O(this);c[a].apply(c,arguments)}}function x(a,b,c,d){if(nb)return new a(c,u(d));var e=O(document.createEvent(b)),f=mb[b],g=[c];return Object.keys(f).forEach(function(a){var b=null!=d&&a in d?d[a]:f[a];"relatedTarget"===a&&(b=O(b)),g.push(b)}),e["init"+b].apply(e,g),e}function y(a){t.call(this,a)}function z(a){return"function"==typeof a?!0:a&&a.handleEvent}function A(a){switch(a){case"DOMAttrModified":case"DOMAttributeNameChanged":case"DOMCharacterDataModified":case"DOMElementNameChanged":case"DOMNodeInserted":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemoved":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":return!0}return!1}function B(a){this.impl=a}function C(a){return a instanceof Q.ShadowRoot&&(a=a.host),O(a)}function D(a,b){var c=R.get(a);if(c)for(var d=0;d<c.length;d++)if(!c[d].removed&&c[d].type===b)return!0;return!1}function E(a,b){for(var c=O(a);c;c=c.parentNode)if(D(P(c),b))return!0;return!1}function F(a){K(a,rb)}function G(b,c,e,f){a.renderAllPending();var g=P(sb.call(c.impl,e,f));if(!g)return null;var i=d(g,null);return h(i,b)}function H(a){return function(){var b=$.get(this);return b&&b[a]&&b[a].value||null}}function I(a){var b=a.slice(2);return function(c){var d=$.get(this);d||(d=Object.create(null),$.set(this,d));var e=d[a];if(e&&this.removeEventListener(b,e.wrapped,!1),"function"==typeof c){var f=function(b){var d=c.call(this,b);d===!1?b.preventDefault():"onbeforeunload"===a&&"string"==typeof d&&(b.returnValue=d)};this.addEventListener(b,f,!1),d[a]={value:c,wrapped:f}}}}var J,K=a.forwardMethodsToWrapper,L=a.getTreeScope,M=a.mixin,N=a.registerWrapper,O=a.unwrap,P=a.wrap,Q=a.wrappers,R=(new WeakMap,new WeakMap),S=new WeakMap,T=new WeakMap,U=new WeakMap,V=new WeakMap,W=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,$=new WeakMap,_=new WeakMap,ab=0,bb=1,cb=2,db=3;s.prototype={equals:function(a){return this.handler===a.handler&&this.type===a.type&&this.capture===a.capture},get removed(){return null===this.handler},remove:function(){this.handler=null}};var eb=window.Event;eb.prototype.polymerBlackList_={returnValue:!0,keyLocation:!0},t.prototype={get target(){return U.get(this)},get currentTarget(){return V.get(this)},get eventPhase(){return X.get(this)},get path(){var a=_.get(this);return a?a.slice():[]},stopPropagation:function(){Y.set(this,!0)},stopImmediatePropagation:function(){Y.set(this,!0),Z.set(this,!0)}},N(eb,t,document.createEvent("Event"));var fb=v("UIEvent",t),gb=v("CustomEvent",t),hb={get relatedTarget(){var a=W.get(this);return void 0!==a?a:P(O(this).relatedTarget)}},ib=M({initMouseEvent:w("initMouseEvent",14)},hb),jb=M({initFocusEvent:w("initFocusEvent",5)},hb),kb=v("MouseEvent",fb,ib),lb=v("FocusEvent",fb,jb),mb=Object.create(null),nb=function(){try{new window.FocusEvent("focus")}catch(a){return!1}return!0}();if(!nb){var ob=function(a,b,c){if(c){var d=mb[c];b=M(M({},d),b)}mb[a]=b};ob("Event",{bubbles:!1,cancelable:!1}),ob("CustomEvent",{detail:null},"Event"),ob("UIEvent",{view:null,detail:0},"Event"),ob("MouseEvent",{screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null},"UIEvent"),ob("FocusEvent",{relatedTarget:null},"UIEvent")}var pb=window.BeforeUnloadEvent;y.prototype=Object.create(t.prototype),M(y.prototype,{get returnValue(){return this.impl.returnValue},set returnValue(a){this.impl.returnValue=a}}),pb&&N(pb,y);var qb=window.EventTarget,rb=["addEventListener","removeEventListener","dispatchEvent"];[Node,Window].forEach(function(a){var b=a.prototype;rb.forEach(function(a){Object.defineProperty(b,a+"_",{value:b[a]})})}),B.prototype={addEventListener:function(a,b,c){if(z(b)&&!A(a)){var d=new s(a,b,c),e=R.get(this);if(e){for(var f=0;f<e.length;f++)if(d.equals(e[f]))return}else e=[],R.set(this,e);e.push(d);var g=C(this);g.addEventListener_(a,m,!0)}},removeEventListener:function(a,b,c){c=Boolean(c);var d=R.get(this);if(d){for(var e=0,f=!1,g=0;g<d.length;g++)d[g].type===a&&d[g].capture===c&&(e++,d[g].handler===b&&(f=!0,d[g].remove()));if(f&&1===e){var h=C(this);h.removeEventListener_(a,m,!0)}}},dispatchEvent:function(b){var c=O(b),d=c.type;S.set(c,!1),a.renderAllPending();var e;E(this,d)||(e=function(){},this.addEventListener(d,e,!0));try{return O(this).dispatchEvent_(c)}finally{e&&this.removeEventListener(d,e,!0)}}},qb&&N(qb,B);var sb=document.elementFromPoint;a.elementFromPoint=G,a.getEventHandlerGetter=H,a.getEventHandlerSetter=I,a.wrapEventTargetMethods=F,a.wrappers.BeforeUnloadEvent=y,a.wrappers.CustomEvent=gb,a.wrappers.Event=t,a.wrappers.EventTarget=B,a.wrappers.FocusEvent=lb,a.wrappers.MouseEvent=kb,a.wrappers.UIEvent=fb}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){Object.defineProperty(a,b,o)}function c(a){this.impl=a}function d(){this.length=0,b(this,"length")}function e(a){for(var b=new d,e=0;e<a.length;e++)b[e]=new c(a[e]);return b.length=e,b}function f(a){g.call(this,a)}var g=a.wrappers.UIEvent,h=a.mixin,i=a.registerWrapper,j=a.unwrap,k=a.wrap,l=window.TouchEvent;if(l){var m;try{m=document.createEvent("TouchEvent")}catch(n){return}var o={enumerable:!1};c.prototype={get target(){return k(this.impl.target)}};var p={configurable:!0,enumerable:!0,get:null};["clientX","clientY","screenX","screenY","pageX","pageY","identifier","webkitRadiusX","webkitRadiusY","webkitRotationAngle","webkitForce"].forEach(function(a){p.get=function(){return this.impl[a]},Object.defineProperty(c.prototype,a,p)}),d.prototype={item:function(a){return this[a]}},f.prototype=Object.create(g.prototype),h(f.prototype,{get touches(){return e(j(this).touches)},get targetTouches(){return e(j(this).targetTouches)},get changedTouches(){return e(j(this).changedTouches)},initTouchEvent:function(){throw new Error("Not implemented")}}),i(l,f,m),a.wrappers.Touch=c,a.wrappers.TouchEvent=f,a.wrappers.TouchList=d}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){Object.defineProperty(a,b,g)}function c(){this.length=0,b(this,"length")}function d(a){if(null==a)return a;for(var b=new c,d=0,e=a.length;e>d;d++)b[d]=f(a[d]);return b.length=e,b}function e(a,b){a.prototype[b]=function(){return d(this.impl[b].apply(this.impl,arguments))}}var f=a.wrap,g={enumerable:!1};c.prototype={item:function(a){return this[a]}},b(c.prototype,"item"),a.wrappers.NodeList=c,a.addWrapNodeListMethod=e,a.wrapNodeList=d}(window.ShadowDOMPolyfill),function(a){"use strict";a.wrapHTMLCollection=a.wrapNodeList,a.wrappers.HTMLCollection=a.wrappers.NodeList}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){A(a instanceof w)}function c(a){var b=new y;return b[0]=a,b.length=1,b}function d(a,b,c){C(b,"childList",{removedNodes:c,previousSibling:a.previousSibling,nextSibling:a.nextSibling})}function e(a,b){C(a,"childList",{removedNodes:b})}function f(a,b,d,e){if(a instanceof DocumentFragment){var f=h(a);O=!0;for(var g=f.length-1;g>=0;g--)a.removeChild(f[g]),f[g].parentNode_=b;O=!1;for(var g=0;g<f.length;g++)f[g].previousSibling_=f[g-1]||d,f[g].nextSibling_=f[g+1]||e;return d&&(d.nextSibling_=f[0]),e&&(e.previousSibling_=f[f.length-1]),f}var f=c(a),i=a.parentNode;return i&&i.removeChild(a),a.parentNode_=b,a.previousSibling_=d,a.nextSibling_=e,d&&(d.nextSibling_=a),e&&(e.previousSibling_=a),f}function g(a){if(a instanceof DocumentFragment)return h(a);var b=c(a),e=a.parentNode;return e&&d(a,e,b),b}function h(a){for(var b=new y,c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b.length=c,e(a,b),b}function i(a){return a}function j(a,b){I(a,b),a.nodeIsInserted_()}function k(a,b){for(var c=D(b),d=0;d<a.length;d++)j(a[d],c)}function l(a){I(a,new z(a,null))}function m(a){for(var b=0;b<a.length;b++)l(a[b])}function n(a,b){var c=a.nodeType===w.DOCUMENT_NODE?a:a.ownerDocument;c!==b.ownerDocument&&c.adoptNode(b)}function o(b,c){if(c.length){var d=b.ownerDocument;if(d!==c[0].ownerDocument)for(var e=0;e<c.length;e++)a.adoptNodeNoRemove(c[e],d)}}function p(a,b){o(a,b);var c=b.length;if(1===c)return J(b[0]);for(var d=J(a.ownerDocument.createDocumentFragment()),e=0;c>e;e++)d.appendChild(J(b[e]));return d}function q(a){if(void 0!==a.firstChild_)for(var b=a.firstChild_;b;){var c=b;b=b.nextSibling_,c.parentNode_=c.previousSibling_=c.nextSibling_=void 0}a.firstChild_=a.lastChild_=void 0}function r(a){if(a.invalidateShadowRenderer()){for(var b=a.firstChild;b;){A(b.parentNode===a);var c=b.nextSibling,d=J(b),e=d.parentNode;e&&V.call(e,d),b.previousSibling_=b.nextSibling_=b.parentNode_=null,b=c}a.firstChild_=a.lastChild_=null}else for(var c,f=J(a),g=f.firstChild;g;)c=g.nextSibling,V.call(f,g),g=c}function s(a){var b=a.parentNode;return b&&b.invalidateShadowRenderer()}function t(a){for(var b,c=0;c<a.length;c++)b=a[c],b.parentNode.removeChild(b)}function u(a,b,c){var d;if(d=L(c?P.call(c,a.impl,!1):Q.call(a.impl,!1)),b){for(var e=a.firstChild;e;e=e.nextSibling)d.appendChild(u(e,!0,c));if(a instanceof N.HTMLTemplateElement)for(var f=d.content,e=a.content.firstChild;e;e=e.nextSibling)f.appendChild(u(e,!0,c))}return d}function v(a,b){if(!b||D(a)!==D(b))return!1;for(var c=b;c;c=c.parentNode)if(c===a)return!0;return!1}function w(a){A(a instanceof R),x.call(this,a),this.parentNode_=void 0,this.firstChild_=void 0,this.lastChild_=void 0,this.nextSibling_=void 0,this.previousSibling_=void 0,this.treeScope_=void 0}var x=a.wrappers.EventTarget,y=a.wrappers.NodeList,z=a.TreeScope,A=a.assert,B=a.defineWrapGetter,C=a.enqueueMutation,D=a.getTreeScope,E=a.isWrapper,F=a.mixin,G=a.registerTransientObservers,H=a.registerWrapper,I=a.setTreeScope,J=a.unwrap,K=a.unwrapIfNeeded,L=a.wrap,M=a.wrapIfNeeded,N=a.wrappers,O=!1,P=document.importNode,Q=window.Node.prototype.cloneNode,R=window.Node,S=window.DocumentFragment,T=(R.prototype.appendChild,R.prototype.compareDocumentPosition),U=R.prototype.insertBefore,V=R.prototype.removeChild,W=R.prototype.replaceChild,X=/Trident/.test(navigator.userAgent),Y=X?function(a,b){try{V.call(a,b)}catch(c){if(!(a instanceof S))throw c}}:function(a,b){V.call(a,b)};w.prototype=Object.create(x.prototype),F(w.prototype,{appendChild:function(a){return this.insertBefore(a,null)},insertBefore:function(a,c){b(a);var d;c?E(c)?d=J(c):(d=c,c=L(d)):(c=null,d=null),c&&A(c.parentNode===this);var e,h=c?c.previousSibling:this.lastChild,i=!this.invalidateShadowRenderer()&&!s(a);if(e=i?g(a):f(a,this,h,c),i)n(this,a),q(this),U.call(this.impl,J(a),d);else{h||(this.firstChild_=e[0]),c||(this.lastChild_=e[e.length-1],void 0===this.firstChild_&&(this.firstChild_=this.firstChild));var j=d?d.parentNode:this.impl;j?U.call(j,p(this,e),d):o(this,e)}return C(this,"childList",{addedNodes:e,nextSibling:c,previousSibling:h}),k(e,this),a},removeChild:function(a){if(b(a),a.parentNode!==this){for(var d=!1,e=(this.childNodes,this.firstChild);e;e=e.nextSibling)if(e===a){d=!0;break}if(!d)throw new Error("NotFoundError")}var f=J(a),g=a.nextSibling,h=a.previousSibling;if(this.invalidateShadowRenderer()){var i=this.firstChild,j=this.lastChild,k=f.parentNode;k&&Y(k,f),i===a&&(this.firstChild_=g),j===a&&(this.lastChild_=h),h&&(h.nextSibling_=g),g&&(g.previousSibling_=h),a.previousSibling_=a.nextSibling_=a.parentNode_=void 0}else q(this),Y(this.impl,f);return O||C(this,"childList",{removedNodes:c(a),nextSibling:g,previousSibling:h}),G(this,a),a},replaceChild:function(a,d){b(a);var e;if(E(d)?e=J(d):(e=d,d=L(e)),d.parentNode!==this)throw new Error("NotFoundError");var h,i=d.nextSibling,j=d.previousSibling,m=!this.invalidateShadowRenderer()&&!s(a);return m?h=g(a):(i===a&&(i=a.nextSibling),h=f(a,this,j,i)),m?(n(this,a),q(this),W.call(this.impl,J(a),e)):(this.firstChild===d&&(this.firstChild_=h[0]),this.lastChild===d&&(this.lastChild_=h[h.length-1]),d.previousSibling_=d.nextSibling_=d.parentNode_=void 0,e.parentNode&&W.call(e.parentNode,p(this,h),e)),C(this,"childList",{addedNodes:h,removedNodes:c(d),nextSibling:i,previousSibling:j}),l(d),k(h,this),d},nodeIsInserted_:function(){for(var a=this.firstChild;a;a=a.nextSibling)a.nodeIsInserted_()},hasChildNodes:function(){return null!==this.firstChild},get parentNode(){return void 0!==this.parentNode_?this.parentNode_:L(this.impl.parentNode)},get firstChild(){return void 0!==this.firstChild_?this.firstChild_:L(this.impl.firstChild)},get lastChild(){return void 0!==this.lastChild_?this.lastChild_:L(this.impl.lastChild)},get nextSibling(){return void 0!==this.nextSibling_?this.nextSibling_:L(this.impl.nextSibling)},get previousSibling(){return void 0!==this.previousSibling_?this.previousSibling_:L(this.impl.previousSibling)},get parentElement(){for(var a=this.parentNode;a&&a.nodeType!==w.ELEMENT_NODE;)a=a.parentNode;return a},get textContent(){for(var a="",b=this.firstChild;b;b=b.nextSibling)b.nodeType!=w.COMMENT_NODE&&(a+=b.textContent);return a},set textContent(a){var b=i(this.childNodes);if(this.invalidateShadowRenderer()){if(r(this),""!==a){var c=this.impl.ownerDocument.createTextNode(a);this.appendChild(c)}}else q(this),this.impl.textContent=a;var d=i(this.childNodes);C(this,"childList",{addedNodes:d,removedNodes:b}),m(b),k(d,this)},get childNodes(){for(var a=new y,b=0,c=this.firstChild;c;c=c.nextSibling)a[b++]=c;return a.length=b,a},cloneNode:function(a){return u(this,a)},contains:function(a){return v(this,M(a))},compareDocumentPosition:function(a){return T.call(this.impl,K(a))},normalize:function(){for(var a,b,c=i(this.childNodes),d=[],e="",f=0;f<c.length;f++)b=c[f],b.nodeType===w.TEXT_NODE?a||b.data.length?a?(e+=b.data,d.push(b)):a=b:this.removeNode(b):(a&&d.length&&(a.data+=e,t(d)),d=[],e="",a=null,b.childNodes.length&&b.normalize());a&&d.length&&(a.data+=e,t(d))}}),B(w,"ownerDocument"),H(R,w,document.createDocumentFragment()),delete w.prototype.querySelector,delete w.prototype.querySelectorAll,w.prototype=F(Object.create(x.prototype),w.prototype),a.cloneNode=u,a.nodeWasAdded=j,a.nodeWasRemoved=l,a.nodesWereAdded=k,a.nodesWereRemoved=m,a.snapshotNodeList=i,a.wrappers.Node=w}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,c){for(var d,e=a.firstElementChild;e;){if(e.matches(c))return e;if(d=b(e,c))return d;e=e.nextElementSibling}return null}function c(a,b){return a.matches(b)}function d(a,b,c){var d=a.localName;return d===b||d===c&&a.namespaceURI===l}function e(){return!0}function f(a,b){return a.localName===b}function g(a,b){return a.namespaceURI===b}function h(a,b,c){return a.namespaceURI===b&&a.localName===c}function i(a,b,c,d,e){for(var f=a.firstElementChild;f;)c(f,d,e)&&(b[b.length++]=f),i(f,b,c,d,e),f=f.nextElementSibling;return b}var j=a.wrappers.HTMLCollection,k=a.wrappers.NodeList,l="http://www.w3.org/1999/xhtml",m={querySelector:function(a){return b(this,a)},querySelectorAll:function(a){return i(this,new k,c,a)}},n={getElementsByTagName:function(a){var b=new j;return"*"===a?i(this,b,e):i(this,b,d,a,a.toLowerCase())},getElementsByClassName:function(a){return this.querySelectorAll("."+a)},getElementsByTagNameNS:function(a,b){var c=new j;if(""===a)a=null;else if("*"===a)return"*"===b?i(this,c,e):i(this,c,f,b);return"*"===b?i(this,c,g,a):i(this,c,h,a,b)}};a.GetElementsByInterface=n,a.SelectorsInterface=m}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}function c(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}var d=a.wrappers.NodeList,e={get firstElementChild(){return b(this.firstChild)},get lastElementChild(){return c(this.lastChild)},get childElementCount(){for(var a=0,b=this.firstElementChild;b;b=b.nextElementSibling)a++;return a},get children(){for(var a=new d,b=0,c=this.firstElementChild;c;c=c.nextElementSibling)a[b++]=c;return a.length=b,a},remove:function(){var a=this.parentNode;a&&a.removeChild(this)}},f={get nextElementSibling(){return b(this.nextSibling)},get previousElementSibling(){return c(this.previousSibling)}};a.ChildNodeInterface=f,a.ParentNodeInterface=e}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}var c=a.ChildNodeInterface,d=a.wrappers.Node,e=a.enqueueMutation,f=a.mixin,g=a.registerWrapper,h=window.CharacterData;b.prototype=Object.create(d.prototype),f(b.prototype,{get textContent(){return this.data},set textContent(a){this.data=a},get data(){return this.impl.data},set data(a){var b=this.impl.data;e(this,"characterData",{oldValue:b}),this.impl.data=a}}),f(b.prototype,c),g(h,b,document.createTextNode("")),a.wrappers.CharacterData=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a>>>0}function c(a){d.call(this,a)}var d=a.wrappers.CharacterData,e=(a.enqueueMutation,a.mixin),f=a.registerWrapper,g=window.Text;c.prototype=Object.create(d.prototype),e(c.prototype,{splitText:function(a){a=b(a);var c=this.data;if(a>c.length)throw new Error("IndexSizeError");var d=c.slice(0,a),e=c.slice(a);this.data=d;var f=this.ownerDocument.createTextNode(e);return this.parentNode&&this.parentNode.insertBefore(f,this.nextSibling),f}}),f(g,c,document.createTextNode("")),a.wrappers.Text=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b){a.invalidateRendererBasedOnAttribute(b,"class")}function c(a,b){this.impl=a,this.ownerElement_=b}c.prototype={get length(){return this.impl.length},item:function(a){return this.impl.item(a)},contains:function(a){return this.impl.contains(a)},add:function(){this.impl.add.apply(this.impl,arguments),b(this.ownerElement_)},remove:function(){this.impl.remove.apply(this.impl,arguments),b(this.ownerElement_)},toggle:function(){var a=this.impl.toggle.apply(this.impl,arguments);return b(this.ownerElement_),a},toString:function(){return this.impl.toString()}},a.wrappers.DOMTokenList=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b,c){var d=b.parentNode;if(d&&d.shadowRoot){var e=a.getRendererForHost(d);e.dependsOnAttribute(c)&&e.invalidate()}}function c(a,b,c){k(a,"attributes",{name:b,namespace:null,oldValue:c})}function d(a){g.call(this,a)}var e=a.ChildNodeInterface,f=a.GetElementsByInterface,g=a.wrappers.Node,h=a.wrappers.DOMTokenList,i=a.ParentNodeInterface,j=a.SelectorsInterface,k=(a.addWrapNodeListMethod,a.enqueueMutation),l=a.mixin,m=(a.oneOf,a.registerWrapper),n=a.unwrap,o=a.wrappers,p=window.Element,q=["matches","mozMatchesSelector","msMatchesSelector","webkitMatchesSelector"].filter(function(a){return p.prototype[a]}),r=q[0],s=p.prototype[r],t=new WeakMap;d.prototype=Object.create(g.prototype),l(d.prototype,{createShadowRoot:function(){var b=new o.ShadowRoot(this);this.impl.polymerShadowRoot_=b;var c=a.getRendererForHost(this);return c.invalidate(),b},get shadowRoot(){return this.impl.polymerShadowRoot_||null},setAttribute:function(a,d){var e=this.impl.getAttribute(a);this.impl.setAttribute(a,d),c(this,a,e),b(this,a)},removeAttribute:function(a){var d=this.impl.getAttribute(a);this.impl.removeAttribute(a),c(this,a,d),b(this,a)},matches:function(a){return s.call(this.impl,a)},get classList(){var a=t.get(this);return a||t.set(this,a=new h(n(this).classList,this)),a},get className(){return n(this).className},set className(a){this.setAttribute("class",a)},get id(){return n(this).id},set id(a){this.setAttribute("id",a)}}),q.forEach(function(a){"matches"!==a&&(d.prototype[a]=function(a){return this.matches(a)})}),p.prototype.webkitCreateShadowRoot&&(d.prototype.webkitCreateShadowRoot=d.prototype.createShadowRoot),l(d.prototype,e),l(d.prototype,f),l(d.prototype,i),l(d.prototype,j),m(p,d,document.createElementNS(null,"x")),a.invalidateRendererBasedOnAttribute=b,a.matchesNames=q,a.wrappers.Element=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"\xa0":return"&nbsp;"}}function c(a){return a.replace(z,b)}function d(a){return a.replace(A,b)}function e(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function f(a,b){switch(a.nodeType){case Node.ELEMENT_NODE:for(var e,f=a.tagName.toLowerCase(),h="<"+f,i=a.attributes,j=0;e=i[j];j++)h+=" "+e.name+'="'+c(e.value)+'"';return h+=">",B[f]?h:h+g(a)+"</"+f+">";case Node.TEXT_NODE:var k=a.data;return b&&C[b.localName]?k:d(k);case Node.COMMENT_NODE:return"<!--"+a.data+"-->";default:throw console.error(a),new Error("not implemented")}}function g(a){a instanceof y.HTMLTemplateElement&&(a=a.content);for(var b="",c=a.firstChild;c;c=c.nextSibling)b+=f(c,a);return b}function h(a,b,c){var d=c||"div";a.textContent="";var e=w(a.ownerDocument.createElement(d));e.innerHTML=b;for(var f;f=e.firstChild;)a.appendChild(x(f))}function i(a){o.call(this,a)}function j(a,b){var c=w(a.cloneNode(!1));c.innerHTML=b;for(var d,e=w(document.createDocumentFragment());d=c.firstChild;)e.appendChild(d);return x(e)}function k(b){return function(){return a.renderAllPending(),this.impl[b]}}function l(a){p(i,a,k(a))}function m(b){Object.defineProperty(i.prototype,b,{get:k(b),set:function(c){a.renderAllPending(),this.impl[b]=c},configurable:!0,enumerable:!0})}function n(b){Object.defineProperty(i.prototype,b,{value:function(){return a.renderAllPending(),this.impl[b].apply(this.impl,arguments)},configurable:!0,enumerable:!0})}var o=a.wrappers.Element,p=a.defineGetter,q=a.enqueueMutation,r=a.mixin,s=a.nodesWereAdded,t=a.nodesWereRemoved,u=a.registerWrapper,v=a.snapshotNodeList,w=a.unwrap,x=a.wrap,y=a.wrappers,z=/[&\u00A0"]/g,A=/[&\u00A0<>]/g,B=e(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]),C=e(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"]),D=/MSIE/.test(navigator.userAgent),E=window.HTMLElement,F=window.HTMLTemplateElement;i.prototype=Object.create(o.prototype),r(i.prototype,{get innerHTML(){return g(this)},set innerHTML(a){if(D&&C[this.localName])return void(this.textContent=a);var b=v(this.childNodes);this.invalidateShadowRenderer()?this instanceof y.HTMLTemplateElement?h(this.content,a):h(this,a,this.tagName):!F&&this instanceof y.HTMLTemplateElement?h(this.content,a):this.impl.innerHTML=a;var c=v(this.childNodes);q(this,"childList",{addedNodes:c,removedNodes:b}),t(b),s(c,this)},get outerHTML(){return f(this,this.parentNode)},set outerHTML(a){var b=this.parentNode;if(b){b.invalidateShadowRenderer();var c=j(b,a);b.replaceChild(c,this)}},insertAdjacentHTML:function(a,b){var c,d;switch(String(a).toLowerCase()){case"beforebegin":c=this.parentNode,d=this;break;case"afterend":c=this.parentNode,d=this.nextSibling;break;case"afterbegin":c=this,d=this.firstChild;break;case"beforeend":c=this,d=null;break;default:return}var e=j(c,b);c.insertBefore(e,d)}}),["clientHeight","clientLeft","clientTop","clientWidth","offsetHeight","offsetLeft","offsetTop","offsetWidth","scrollHeight","scrollWidth"].forEach(l),["scrollLeft","scrollTop"].forEach(m),["getBoundingClientRect","getClientRects","scrollIntoView"].forEach(n),u(E,i,document.createElement("b")),a.wrappers.HTMLElement=i,a.getInnerHTML=g,a.setInnerHTML=h}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrap,g=window.HTMLCanvasElement;b.prototype=Object.create(c.prototype),d(b.prototype,{getContext:function(){var a=this.impl.getContext.apply(this.impl,arguments);return a&&f(a)}}),e(g,b,document.createElement("canvas")),a.wrappers.HTMLCanvasElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=window.HTMLContentElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get select(){return this.getAttribute("select")},set select(a){this.setAttribute("select",a)},setAttribute:function(a,b){c.prototype.setAttribute.call(this,a,b),"select"===String(a).toLowerCase()&&this.invalidateShadowRenderer(!0)}}),f&&e(f,b),a.wrappers.HTMLContentElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a,b){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var e=f(document.createElement("img"));d.call(this,e),g(e,this),void 0!==a&&(e.width=a),void 0!==b&&(e.height=b)}var d=a.wrappers.HTMLElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLImageElement;b.prototype=Object.create(d.prototype),e(h,b,document.createElement("img")),c.prototype=b.prototype,a.wrappers.HTMLImageElement=b,a.wrappers.Image=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=(a.mixin,a.wrappers.NodeList,a.registerWrapper),e=window.HTMLShadowElement;b.prototype=Object.create(c.prototype),e&&d(e,b),a.wrappers.HTMLShadowElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){if(!a.defaultView)return a;var b=k.get(a);if(!b){for(b=a.implementation.createHTMLDocument("");b.lastChild;)b.removeChild(b.lastChild);k.set(a,b)}return b}function c(a){for(var c,d=b(a.ownerDocument),e=h(d.createDocumentFragment());c=a.firstChild;)e.appendChild(c);return e}function d(a){if(e.call(this,a),!l){var b=c(a);j.set(this,i(b))}}var e=a.wrappers.HTMLElement,f=a.mixin,g=a.registerWrapper,h=a.unwrap,i=a.wrap,j=new WeakMap,k=new WeakMap,l=window.HTMLTemplateElement;d.prototype=Object.create(e.prototype),f(d.prototype,{get content(){return l?i(this.impl.content):j.get(this)}}),l&&g(l,d),a.wrappers.HTMLTemplateElement=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.registerWrapper,e=window.HTMLMediaElement;b.prototype=Object.create(c.prototype),d(e,b,document.createElement("audio")),a.wrappers.HTMLMediaElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var b=f(document.createElement("audio"));d.call(this,b),g(b,this),b.setAttribute("preload","auto"),void 0!==a&&b.setAttribute("src",a)}var d=a.wrappers.HTMLMediaElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLAudioElement;b.prototype=Object.create(d.prototype),e(h,b,document.createElement("audio")),c.prototype=b.prototype,a.wrappers.HTMLAudioElement=b,a.wrappers.Audio=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a.replace(/\s+/g," ").trim()}function c(a){e.call(this,a)}function d(a,b,c,f){if(!(this instanceof d))throw new TypeError("DOM object constructor cannot be called as a function.");var g=i(document.createElement("option"));e.call(this,g),h(g,this),void 0!==a&&(g.text=a),void 0!==b&&g.setAttribute("value",b),c===!0&&g.setAttribute("selected",""),g.selected=f===!0}var e=a.wrappers.HTMLElement,f=a.mixin,g=a.registerWrapper,h=a.rewrap,i=a.unwrap,j=a.wrap,k=window.HTMLOptionElement;c.prototype=Object.create(e.prototype),f(c.prototype,{get text(){return b(this.textContent)},set text(a){this.textContent=b(String(a))},get form(){return j(i(this).form)}}),g(k,c,document.createElement("option")),d.prototype=c.prototype,a.wrappers.HTMLOptionElement=c,a.wrappers.Option=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.unwrap,g=a.wrap,h=window.HTMLSelectElement;b.prototype=Object.create(c.prototype),d(b.prototype,{add:function(a,b){"object"==typeof b&&(b=f(b)),f(this).add(f(a),b)},remove:function(a){return void 0===a?void c.prototype.remove.call(this):("object"==typeof a&&(a=f(a)),void f(this).remove(a))},get form(){return g(f(this).form)}}),e(h,b,document.createElement("select")),a.wrappers.HTMLSelectElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.unwrap,g=a.wrap,h=a.wrapHTMLCollection,i=window.HTMLTableElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get caption(){return g(f(this).caption)},createCaption:function(){return g(f(this).createCaption())},get tHead(){return g(f(this).tHead)},createTHead:function(){return g(f(this).createTHead())},createTFoot:function(){return g(f(this).createTFoot())},get tFoot(){return g(f(this).tFoot)},get tBodies(){return h(f(this).tBodies)},createTBody:function(){return g(f(this).createTBody())},get rows(){return h(f(this).rows)},insertRow:function(a){return g(f(this).insertRow(a))}}),e(i,b,document.createElement("table")),a.wrappers.HTMLTableElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrapHTMLCollection,g=a.unwrap,h=a.wrap,i=window.HTMLTableSectionElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get rows(){return f(g(this).rows)},insertRow:function(a){return h(g(this).insertRow(a))}}),e(i,b,document.createElement("thead")),a.wrappers.HTMLTableSectionElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrapHTMLCollection,g=a.unwrap,h=a.wrap,i=window.HTMLTableRowElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get cells(){return f(g(this).cells)},insertCell:function(a){return h(g(this).insertCell(a))}}),e(i,b,document.createElement("tr")),a.wrappers.HTMLTableRowElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a.localName){case"content":return new c(a);case"shadow":return new e(a);case"template":return new f(a)}d.call(this,a)}var c=a.wrappers.HTMLContentElement,d=a.wrappers.HTMLElement,e=a.wrappers.HTMLShadowElement,f=a.wrappers.HTMLTemplateElement,g=(a.mixin,a.registerWrapper),h=window.HTMLUnknownElement;
b.prototype=Object.create(d.prototype),g(h,b),a.wrappers.HTMLUnknownElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.registerObject,c="http://www.w3.org/2000/svg",d=document.createElementNS(c,"title"),e=b(d),f=Object.getPrototypeOf(e.prototype).constructor;a.wrappers.SVGElement=f}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){m.call(this,a)}var c=a.mixin,d=a.registerWrapper,e=a.unwrap,f=a.wrap,g=window.SVGUseElement,h="http://www.w3.org/2000/svg",i=f(document.createElementNS(h,"g")),j=document.createElementNS(h,"use"),k=i.constructor,l=Object.getPrototypeOf(k.prototype),m=l.constructor;b.prototype=Object.create(l),"instanceRoot"in j&&c(b.prototype,{get instanceRoot(){return f(e(this).instanceRoot)},get animatedInstanceRoot(){return f(e(this).animatedInstanceRoot)}}),d(g,b,j),a.wrappers.SVGUseElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.mixin,e=a.registerWrapper,f=a.wrap,g=window.SVGElementInstance;g&&(b.prototype=Object.create(c.prototype),d(b.prototype,{get correspondingElement(){return f(this.impl.correspondingElement)},get correspondingUseElement(){return f(this.impl.correspondingUseElement)},get parentNode(){return f(this.impl.parentNode)},get childNodes(){throw new Error("Not implemented")},get firstChild(){return f(this.impl.firstChild)},get lastChild(){return f(this.impl.lastChild)},get previousSibling(){return f(this.impl.previousSibling)},get nextSibling(){return f(this.impl.nextSibling)}}),e(g,b),a.wrappers.SVGElementInstance=b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.mixin,d=a.registerWrapper,e=a.unwrap,f=a.unwrapIfNeeded,g=a.wrap,h=window.CanvasRenderingContext2D;c(b.prototype,{get canvas(){return g(this.impl.canvas)},drawImage:function(){arguments[0]=f(arguments[0]),this.impl.drawImage.apply(this.impl,arguments)},createPattern:function(){return arguments[0]=e(arguments[0]),this.impl.createPattern.apply(this.impl,arguments)}}),d(h,b,document.createElement("canvas").getContext("2d")),a.wrappers.CanvasRenderingContext2D=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.mixin,d=a.registerWrapper,e=a.unwrapIfNeeded,f=a.wrap,g=window.WebGLRenderingContext;if(g){c(b.prototype,{get canvas(){return f(this.impl.canvas)},texImage2D:function(){arguments[5]=e(arguments[5]),this.impl.texImage2D.apply(this.impl,arguments)},texSubImage2D:function(){arguments[6]=e(arguments[6]),this.impl.texSubImage2D.apply(this.impl,arguments)}});var h=/WebKit/.test(navigator.userAgent)?{drawingBufferHeight:null,drawingBufferWidth:null}:{};d(g,b,h),a.wrappers.WebGLRenderingContext=b}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.registerWrapper,d=a.unwrap,e=a.unwrapIfNeeded,f=a.wrap,g=window.Range;b.prototype={get startContainer(){return f(this.impl.startContainer)},get endContainer(){return f(this.impl.endContainer)},get commonAncestorContainer(){return f(this.impl.commonAncestorContainer)},setStart:function(a,b){this.impl.setStart(e(a),b)},setEnd:function(a,b){this.impl.setEnd(e(a),b)},setStartBefore:function(a){this.impl.setStartBefore(e(a))},setStartAfter:function(a){this.impl.setStartAfter(e(a))},setEndBefore:function(a){this.impl.setEndBefore(e(a))},setEndAfter:function(a){this.impl.setEndAfter(e(a))},selectNode:function(a){this.impl.selectNode(e(a))},selectNodeContents:function(a){this.impl.selectNodeContents(e(a))},compareBoundaryPoints:function(a,b){return this.impl.compareBoundaryPoints(a,d(b))},extractContents:function(){return f(this.impl.extractContents())},cloneContents:function(){return f(this.impl.cloneContents())},insertNode:function(a){this.impl.insertNode(e(a))},surroundContents:function(a){this.impl.surroundContents(e(a))},cloneRange:function(){return f(this.impl.cloneRange())},isPointInRange:function(a,b){return this.impl.isPointInRange(e(a),b)},comparePoint:function(a,b){return this.impl.comparePoint(e(a),b)},intersectsNode:function(a){return this.impl.intersectsNode(e(a))},toString:function(){return this.impl.toString()}},g.prototype.createContextualFragment&&(b.prototype.createContextualFragment=function(a){return f(this.impl.createContextualFragment(a))}),c(window.Range,b,document.createRange()),a.wrappers.Range=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.GetElementsByInterface,c=a.ParentNodeInterface,d=a.SelectorsInterface,e=a.mixin,f=a.registerObject,g=f(document.createDocumentFragment());e(g.prototype,c),e(g.prototype,d),e(g.prototype,b);var h=f(document.createComment(""));a.wrappers.Comment=h,a.wrappers.DocumentFragment=g}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=k(a.impl.ownerDocument.createDocumentFragment());c.call(this,b),i(b,this);var e=a.shadowRoot;m.set(this,e),this.treeScope_=new d(this,g(e||a)),l.set(this,a)}var c=a.wrappers.DocumentFragment,d=a.TreeScope,e=a.elementFromPoint,f=a.getInnerHTML,g=a.getTreeScope,h=a.mixin,i=a.rewrap,j=a.setInnerHTML,k=a.unwrap,l=new WeakMap,m=new WeakMap,n=/[ \t\n\r\f]/;b.prototype=Object.create(c.prototype),h(b.prototype,{get innerHTML(){return f(this)},set innerHTML(a){j(this,a),this.invalidateShadowRenderer()},get olderShadowRoot(){return m.get(this)||null},get host(){return l.get(this)||null},invalidateShadowRenderer:function(){return l.get(this).invalidateShadowRenderer()},elementFromPoint:function(a,b){return e(this,this.ownerDocument,a,b)},getElementById:function(a){return n.test(a)?null:this.querySelector('[id="'+a+'"]')}}),a.wrappers.ShadowRoot=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){a.previousSibling_=a.previousSibling,a.nextSibling_=a.nextSibling,a.parentNode_=a.parentNode}function c(a,c,e){var f=G(a),g=G(c),h=e?G(e):null;if(d(c),b(c),e)a.firstChild===e&&(a.firstChild_=e),e.previousSibling_=e.previousSibling;else{a.lastChild_=a.lastChild,a.lastChild===a.firstChild&&(a.firstChild_=a.firstChild);var i=H(f.lastChild);i&&(i.nextSibling_=i.nextSibling)}f.insertBefore(g,h)}function d(a){var c=G(a),d=c.parentNode;if(d){var e=H(d);b(a),a.previousSibling&&(a.previousSibling.nextSibling_=a),a.nextSibling&&(a.nextSibling.previousSibling_=a),e.lastChild===a&&(e.lastChild_=a),e.firstChild===a&&(e.firstChild_=a),d.removeChild(c)}}function e(a){I.set(a,[])}function f(a){var b=I.get(a);return b||I.set(a,b=[]),b}function g(a){for(var b=[],c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b}function h(){for(var a=0;a<M.length;a++){var b=M[a],c=b.parentRenderer;c&&c.dirty||b.render()}M=[]}function i(){y=null,h()}function j(a){var b=K.get(a);return b||(b=new n(a),K.set(a,b)),b}function k(a){var b=E(a).root;return b instanceof D?b:null}function l(a){return j(a.host)}function m(a){this.skip=!1,this.node=a,this.childNodes=[]}function n(a){this.host=a,this.dirty=!1,this.invalidateAttributes(),this.associateNode(a)}function o(a){for(var b=[],c=a.firstChild;c;c=c.nextSibling)v(c)?b.push.apply(b,f(c)):b.push(c);return b}function p(a){if(a instanceof B)return a;if(a instanceof A)return null;for(var b=a.firstChild;b;b=b.nextSibling){var c=p(b);if(c)return c}return null}function q(a,b){f(b).push(a);var c=J.get(a);c?c.push(b):J.set(a,[b])}function r(a){return J.get(a)}function s(a){J.set(a,void 0)}function t(a,b){var c=b.getAttribute("select");if(!c)return!0;if(c=c.trim(),!c)return!0;if(!(a instanceof z))return!1;if(!O.test(c))return!1;try{return a.matches(c)}catch(d){return!1}}function u(a,b){var c=r(b);return c&&c[c.length-1]===a}function v(a){return a instanceof A||a instanceof B}function w(a){return a.shadowRoot}function x(a){for(var b=[],c=a.shadowRoot;c;c=c.olderShadowRoot)b.push(c);return b}var y,z=a.wrappers.Element,A=a.wrappers.HTMLContentElement,B=a.wrappers.HTMLShadowElement,C=a.wrappers.Node,D=a.wrappers.ShadowRoot,E=(a.assert,a.getTreeScope),F=(a.mixin,a.oneOf),G=a.unwrap,H=a.wrap,I=new WeakMap,J=new WeakMap,K=new WeakMap,L=F(window,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame","setTimeout"]),M=[],N=new ArraySplice;N.equals=function(a,b){return G(a.node)===b},m.prototype={append:function(a){var b=new m(a);return this.childNodes.push(b),b},sync:function(a){if(!this.skip){for(var b=this.node,e=this.childNodes,f=g(G(b)),h=a||new WeakMap,i=N.calculateSplices(e,f),j=0,k=0,l=0,m=0;m<i.length;m++){for(var n=i[m];l<n.index;l++)k++,e[j++].sync(h);for(var o=n.removed.length,p=0;o>p;p++){var q=H(f[k++]);h.get(q)||d(q)}for(var r=n.addedCount,s=f[k]&&H(f[k]),p=0;r>p;p++){var t=e[j++],u=t.node;c(b,u,s),h.set(u,!0),t.sync(h)}l+=r}for(var m=l;m<e.length;m++)e[m].sync(h)}}},n.prototype={render:function(a){if(this.dirty){this.invalidateAttributes();var b=this.host;this.distribution(b);var c=a||new m(b);this.buildRenderTree(c,b);var d=!a;d&&c.sync(),this.dirty=!1}},get parentRenderer(){return E(this.host).renderer},invalidate:function(){if(!this.dirty){if(this.dirty=!0,M.push(this),y)return;y=window[L](i,0)}},distribution:function(a){this.resetAll(a),this.distributionResolution(a)},resetAll:function(a){v(a)?e(a):s(a);for(var b=a.firstChild;b;b=b.nextSibling)this.resetAll(b);a.shadowRoot&&this.resetAll(a.shadowRoot),a.olderShadowRoot&&this.resetAll(a.olderShadowRoot)},distributionResolution:function(a){if(w(a)){for(var b=a,c=o(b),d=x(b),e=0;e<d.length;e++)this.poolDistribution(d[e],c);for(var e=d.length-1;e>=0;e--){var f=d[e],g=p(f);if(g){var h=f.olderShadowRoot;h&&(c=o(h));for(var i=0;i<c.length;i++)q(c[i],g)}this.distributionResolution(f)}}for(var j=a.firstChild;j;j=j.nextSibling)this.distributionResolution(j)},poolDistribution:function(a,b){if(!(a instanceof B))if(a instanceof A){var c=a;this.updateDependentAttributes(c.getAttribute("select"));for(var d=!1,e=0;e<b.length;e++){var a=b[e];a&&t(a,c)&&(q(a,c),b[e]=void 0,d=!0)}if(!d)for(var f=c.firstChild;f;f=f.nextSibling)q(f,c)}else for(var f=a.firstChild;f;f=f.nextSibling)this.poolDistribution(f,b)},buildRenderTree:function(a,b){for(var c=this.compose(b),d=0;d<c.length;d++){var e=c[d],f=a.append(e);this.buildRenderTree(f,e)}if(w(b)){var g=j(b);g.dirty=!1}},compose:function(a){for(var b=[],c=a.shadowRoot||a,d=c.firstChild;d;d=d.nextSibling)if(v(d)){this.associateNode(c);for(var e=f(d),g=0;g<e.length;g++){var h=e[g];u(d,h)&&b.push(h)}}else b.push(d);return b},invalidateAttributes:function(){this.attributes=Object.create(null)},updateDependentAttributes:function(a){if(a){var b=this.attributes;/\.\w+/.test(a)&&(b["class"]=!0),/#\w+/.test(a)&&(b.id=!0),a.replace(/\[\s*([^\s=\|~\]]+)/g,function(a,c){b[c]=!0})}},dependsOnAttribute:function(a){return this.attributes[a]},associateNode:function(a){a.impl.polymerShadowRenderer_=this}};var O=/^[*.#[a-zA-Z_|]/;C.prototype.invalidateShadowRenderer=function(){var a=this.impl.polymerShadowRenderer_;return a?(a.invalidate(),!0):!1},A.prototype.getDistributedNodes=B.prototype.getDistributedNodes=function(){return h(),f(this)},z.prototype.getDestinationInsertionPoints=function(){return h(),r(this)||[]},A.prototype.nodeIsInserted_=B.prototype.nodeIsInserted_=function(){this.invalidateShadowRenderer();var a,b=k(this);b&&(a=l(b)),this.impl.polymerShadowRenderer_=a,a&&a.invalidate()},a.getRendererForHost=j,a.getShadowTrees=x,a.renderAllPending=h,a.getDestinationInsertionPoints=r,a.visual={insertBefore:c,remove:d}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b){if(window[b]){d(!a.wrappers[b]);var i=function(a){c.call(this,a)};i.prototype=Object.create(c.prototype),e(i.prototype,{get form(){return h(g(this).form)}}),f(window[b],i,document.createElement(b.slice(4,-7))),a.wrappers[b]=i}}var c=a.wrappers.HTMLElement,d=a.assert,e=a.mixin,f=a.registerWrapper,g=a.unwrap,h=a.wrap,i=["HTMLButtonElement","HTMLFieldSetElement","HTMLInputElement","HTMLKeygenElement","HTMLLabelElement","HTMLLegendElement","HTMLObjectElement","HTMLOutputElement","HTMLTextAreaElement"];i.forEach(b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}{var c=a.registerWrapper,d=a.unwrap,e=a.unwrapIfNeeded,f=a.wrap;window.Selection}b.prototype={get anchorNode(){return f(this.impl.anchorNode)},get focusNode(){return f(this.impl.focusNode)},addRange:function(a){this.impl.addRange(d(a))},collapse:function(a,b){this.impl.collapse(e(a),b)},containsNode:function(a,b){return this.impl.containsNode(e(a),b)},extend:function(a,b){this.impl.extend(e(a),b)},getRangeAt:function(a){return f(this.impl.getRangeAt(a))},removeRange:function(a){this.impl.removeRange(d(a))},selectAllChildren:function(a){this.impl.selectAllChildren(e(a))},toString:function(){return this.impl.toString()}},c(window.Selection,b,window.getSelection()),a.wrappers.Selection=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){k.call(this,a),this.treeScope_=new p(this,null)}function c(a){var c=document[a];b.prototype[a]=function(){return A(c.apply(this.impl,arguments))}}function d(a,b){D.call(b.impl,z(a)),e(a,b)}function e(a,b){a.shadowRoot&&b.adoptNode(a.shadowRoot),a instanceof o&&f(a,b);for(var c=a.firstChild;c;c=c.nextSibling)e(c,b)}function f(a,b){var c=a.olderShadowRoot;c&&b.adoptNode(c)}function g(a){this.impl=a}function h(a,b){var c=document.implementation[b];a.prototype[b]=function(){return A(c.apply(this.impl,arguments))}}function i(a,b){var c=document.implementation[b];a.prototype[b]=function(){return c.apply(this.impl,arguments)}}var j=a.GetElementsByInterface,k=a.wrappers.Node,l=a.ParentNodeInterface,m=a.wrappers.Selection,n=a.SelectorsInterface,o=a.wrappers.ShadowRoot,p=a.TreeScope,q=a.cloneNode,r=a.defineWrapGetter,s=a.elementFromPoint,t=a.forwardMethodsToWrapper,u=a.matchesNames,v=a.mixin,w=a.registerWrapper,x=a.renderAllPending,y=a.rewrap,z=a.unwrap,A=a.wrap,B=a.wrapEventTargetMethods,C=(a.wrapNodeList,new WeakMap);b.prototype=Object.create(k.prototype),r(b,"documentElement"),r(b,"body"),r(b,"head"),["createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","getElementById"].forEach(c);var D=document.adoptNode,E=document.getSelection;if(v(b.prototype,{adoptNode:function(a){return a.parentNode&&a.parentNode.removeChild(a),d(a,this),a},elementFromPoint:function(a,b){return s(this,this,a,b)},importNode:function(a,b){return q(a,b,this.impl)},getSelection:function(){return x(),new m(E.call(z(this)))}}),document.registerElement){var F=document.registerElement;b.prototype.registerElement=function(b,c){function d(a){return a?void(this.impl=a):f?document.createElement(f,b):document.createElement(b)}var e,f;if(void 0!==c&&(e=c.prototype,f=c.extends),e||(e=Object.create(HTMLElement.prototype)),a.nativePrototypeTable.get(e))throw new Error("NotSupportedError");for(var g,h=Object.getPrototypeOf(e),i=[];h&&!(g=a.nativePrototypeTable.get(h));)i.push(h),h=Object.getPrototypeOf(h);if(!g)throw new Error("NotSupportedError");for(var j=Object.create(g),k=i.length-1;k>=0;k--)j=Object.create(j);["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].forEach(function(a){var b=e[a];b&&(j[a]=function(){A(this)instanceof d||y(this),b.apply(A(this),arguments)})});var l={prototype:j};f&&(l.extends=f),d.prototype=e,d.prototype.constructor=d,a.constructorTable.set(j,d),a.nativePrototypeTable.set(e,j);F.call(z(this),b,l);return d},t([window.HTMLDocument||window.Document],["registerElement"])}t([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement,window.HTMLHtmlElement],["appendChild","compareDocumentPosition","contains","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","insertBefore","querySelector","querySelectorAll","removeChild","replaceChild"].concat(u)),t([window.HTMLDocument||window.Document],["adoptNode","importNode","contains","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","elementFromPoint","getElementById","getSelection"]),v(b.prototype,j),v(b.prototype,l),v(b.prototype,n),v(b.prototype,{get implementation(){var a=C.get(this);return a?a:(a=new g(z(this).implementation),C.set(this,a),a)},get defaultView(){return A(z(this).defaultView)}}),w(window.Document,b,document.implementation.createHTMLDocument("")),window.HTMLDocument&&w(window.HTMLDocument,b),B([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement]),h(g,"createDocumentType"),h(g,"createDocument"),h(g,"createHTMLDocument"),i(g,"hasFeature"),w(window.DOMImplementation,g),t([window.DOMImplementation],["createDocumentType","createDocument","createHTMLDocument","hasFeature"]),a.adoptNodeNoRemove=d,a.wrappers.DOMImplementation=g,a.wrappers.Document=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.wrappers.Selection,e=a.mixin,f=a.registerWrapper,g=a.renderAllPending,h=a.unwrap,i=a.unwrapIfNeeded,j=a.wrap,k=window.Window,l=window.getComputedStyle,m=window.getSelection;b.prototype=Object.create(c.prototype),k.prototype.getComputedStyle=function(a,b){return j(this||window).getComputedStyle(i(a),b)},k.prototype.getSelection=function(){return j(this||window).getSelection()},delete window.getComputedStyle,delete window.getSelection,["addEventListener","removeEventListener","dispatchEvent"].forEach(function(a){k.prototype[a]=function(){var b=j(this||window);return b[a].apply(b,arguments)},delete window[a]}),e(b.prototype,{getComputedStyle:function(a,b){return g(),l.call(h(this),i(a),b)},getSelection:function(){return g(),new d(m.call(h(this)))},get document(){return j(h(this).document)}}),f(k,b,window),a.wrappers.Window=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.unwrap,c=window.DataTransfer||window.Clipboard,d=c.prototype.setDragImage;c.prototype.setDragImage=function(a,c,e){d.call(this,b(a),c,e)}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=c[a],d=window[b];if(d){var e=document.createElement(a),f=e.constructor;window[b]=f}}var c=(a.isWrapperFor,{a:"HTMLAnchorElement",area:"HTMLAreaElement",audio:"HTMLAudioElement",base:"HTMLBaseElement",body:"HTMLBodyElement",br:"HTMLBRElement",button:"HTMLButtonElement",canvas:"HTMLCanvasElement",caption:"HTMLTableCaptionElement",col:"HTMLTableColElement",content:"HTMLContentElement",data:"HTMLDataElement",datalist:"HTMLDataListElement",del:"HTMLModElement",dir:"HTMLDirectoryElement",div:"HTMLDivElement",dl:"HTMLDListElement",embed:"HTMLEmbedElement",fieldset:"HTMLFieldSetElement",font:"HTMLFontElement",form:"HTMLFormElement",frame:"HTMLFrameElement",frameset:"HTMLFrameSetElement",h1:"HTMLHeadingElement",head:"HTMLHeadElement",hr:"HTMLHRElement",html:"HTMLHtmlElement",iframe:"HTMLIFrameElement",img:"HTMLImageElement",input:"HTMLInputElement",keygen:"HTMLKeygenElement",label:"HTMLLabelElement",legend:"HTMLLegendElement",li:"HTMLLIElement",link:"HTMLLinkElement",map:"HTMLMapElement",marquee:"HTMLMarqueeElement",menu:"HTMLMenuElement",menuitem:"HTMLMenuItemElement",meta:"HTMLMetaElement",meter:"HTMLMeterElement",object:"HTMLObjectElement",ol:"HTMLOListElement",optgroup:"HTMLOptGroupElement",option:"HTMLOptionElement",output:"HTMLOutputElement",p:"HTMLParagraphElement",param:"HTMLParamElement",pre:"HTMLPreElement",progress:"HTMLProgressElement",q:"HTMLQuoteElement",script:"HTMLScriptElement",select:"HTMLSelectElement",shadow:"HTMLShadowElement",source:"HTMLSourceElement",span:"HTMLSpanElement",style:"HTMLStyleElement",table:"HTMLTableElement",tbody:"HTMLTableSectionElement",template:"HTMLTemplateElement",textarea:"HTMLTextAreaElement",thead:"HTMLTableSectionElement",time:"HTMLTimeElement",title:"HTMLTitleElement",tr:"HTMLTableRowElement",track:"HTMLTrackElement",ul:"HTMLUListElement",video:"HTMLVideoElement"});Object.keys(c).forEach(b),Object.getOwnPropertyNames(a.wrappers).forEach(function(b){window[b]=a.wrappers[b]})}(window.ShadowDOMPolyfill),function(){window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded,Object.defineProperty(Element.prototype,"webkitShadowRoot",Object.getOwnPropertyDescriptor(Element.prototype,"shadowRoot"));var a=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var b=a.call(this);return CustomElements.watchShadow(this),b},Element.prototype.webkitCreateShadowRoot=Element.prototype.createShadowRoot}(),function(a){function b(a,b){var c="";return Array.prototype.forEach.call(a,function(a){c+=a.textContent+"\n\n"}),b||(c=c.replace(l,"")),c}function c(a){var b=document.createElement("style");return b.textContent=a,b}function d(a){var b=c(a);document.head.appendChild(b);var d=[];if(b.sheet)try{d=b.sheet.cssRules}catch(e){}else console.warn("sheet not found",b);return b.parentNode.removeChild(b),d}function e(){v.initialized=!0,document.body.appendChild(v);var a=v.contentDocument,b=a.createElement("base");b.href=document.baseURI,a.head.appendChild(b)}function f(a){v.initialized||e(),document.body.appendChild(v),a(v.contentDocument),document.body.removeChild(v)}function g(a,b){if(b){var e;if(a.match("@import")&&x){var g=c(a);f(function(a){a.head.appendChild(g.impl),e=g.sheet.cssRules,b(e)})}else e=d(a),b(e)}}function h(a){a&&j().appendChild(document.createTextNode(a))}function i(a,b){var d=c(a);d.setAttribute(b,""),d.setAttribute(z,""),document.head.appendChild(d)}function j(){return w||(w=document.createElement("style"),w.setAttribute(z,""),w[z]=!0),w}var k={strictStyling:!1,registry:{},shimStyling:function(a,c,d){var e=this.prepareRoot(a,c,d),f=this.isTypeExtension(d),g=this.makeScopeSelector(c,f),h=b(e,!0);h=this.scopeCssText(h,g),a&&(a.shimmedStyle=h),this.addCssToDocument(h,c)},shimStyle:function(a,b){return this.shimCssText(a.textContent,b)},shimCssText:function(a,b){return a=this.insertDirectives(a),this.scopeCssText(a,b)},makeScopeSelector:function(a,b){return a?b?"[is="+a+"]":a:""},isTypeExtension:function(a){return a&&a.indexOf("-")<0},prepareRoot:function(a,b,c){var d=this.registerRoot(a,b,c);return this.replaceTextInStyles(d.rootStyles,this.insertDirectives),this.removeStyles(a,d.rootStyles),this.strictStyling&&this.applyScopeToContent(a,b),d.scopeStyles},removeStyles:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)c.parentNode.removeChild(c)},registerRoot:function(a,b,c){var d=this.registry[b]={root:a,name:b,extendsName:c},e=this.findStyles(a);d.rootStyles=e,d.scopeStyles=d.rootStyles;var f=this.registry[d.extendsName];return f&&(d.scopeStyles=f.scopeStyles.concat(d.scopeStyles)),d},findStyles:function(a){if(!a)return[];var b=a.querySelectorAll("style");return Array.prototype.filter.call(b,function(a){return!a.hasAttribute(A)})},applyScopeToContent:function(a,b){a&&(Array.prototype.forEach.call(a.querySelectorAll("*"),function(a){a.setAttribute(b,"")}),Array.prototype.forEach.call(a.querySelectorAll("template"),function(a){this.applyScopeToContent(a.content,b)},this))},insertDirectives:function(a){return a=this.insertPolyfillDirectivesInCssText(a),this.insertPolyfillRulesInCssText(a)},insertPolyfillDirectivesInCssText:function(a){return a=a.replace(m,function(a,b){return b.slice(0,-2)+"{"}),a.replace(n,function(a,b){return b+" {"})},insertPolyfillRulesInCssText:function(a){return a=a.replace(o,function(a,b){return b.slice(0,-1)}),a.replace(p,function(a,b,c,d){var e=a.replace(b,"").replace(c,"");return d+e})},scopeCssText:function(a,b){var c=this.extractUnscopedRulesFromCssText(a);if(a=this.insertPolyfillHostInCssText(a),a=this.convertColonHost(a),a=this.convertColonHostContext(a),a=this.convertCombinators(a),b){var a,d=this;g(a,function(c){a=d.scopeRules(c,b)})}return a=a+"\n"+c,a.trim()},extractUnscopedRulesFromCssText:function(a){for(var b,c="";b=q.exec(a);)c+=b[1].slice(0,-1)+"\n\n";for(;b=r.exec(a);)c+=b[0].replace(b[2],"").replace(b[1],b[3])+"\n\n";return c},convertColonHost:function(a){return this.convertColonRule(a,cssColonHostRe,this.colonHostPartReplacer)},convertColonHostContext:function(a){return this.convertColonRule(a,cssColonHostContextRe,this.colonHostContextPartReplacer)},convertColonRule:function(a,b,c){return a.replace(b,function(a,b,d,e){if(b=polyfillHostNoCombinator,d){for(var f,g=d.split(","),h=[],i=0,j=g.length;j>i&&(f=g[i]);i++)f=f.trim(),h.push(c(b,f,e));return h.join(",")}return b+e})},colonHostContextPartReplacer:function(a,b,c){return b.match(s)?this.colonHostPartReplacer(a,b,c):a+b+c+", "+b+" "+a+c},colonHostPartReplacer:function(a,b,c){return a+b.replace(s,"")+c},convertCombinators:function(a){for(var b=0;b<combinatorsRe.length;b++)a=a.replace(combinatorsRe[b]," ");return a},scopeRules:function(a,b){var c="";return a&&Array.prototype.forEach.call(a,function(a){a.selectorText&&a.style&&a.style.cssText?(c+=this.scopeSelector(a.selectorText,b,this.strictStyling)+" {\n	",c+=this.propertiesFromRule(a)+"\n}\n\n"):a.type===CSSRule.MEDIA_RULE?(c+="@media "+a.media.mediaText+" {\n",c+=this.scopeRules(a.cssRules,b),c+="\n}\n\n"):a.cssText&&(c+=a.cssText+"\n\n")},this),c},scopeSelector:function(a,b,c){var d=[],e=a.split(",");return e.forEach(function(a){a=a.trim(),this.selectorNeedsScoping(a,b)&&(a=c&&!a.match(polyfillHostNoCombinator)?this.applyStrictSelectorScope(a,b):this.applySelectorScope(a,b)),d.push(a)},this),d.join(", ")},selectorNeedsScoping:function(a,b){if(Array.isArray(b))return!0;var c=this.makeScopeMatcher(b);return!a.match(c)},makeScopeMatcher:function(a){return a=a.replace(/\[/g,"\\[").replace(/\[/g,"\\]"),new RegExp("^("+a+")"+selectorReSuffix,"m")},applySelectorScope:function(a,b){return Array.isArray(b)?this.applySelectorScopeList(a,b):this.applySimpleSelectorScope(a,b)},applySelectorScopeList:function(a,b){for(var c,d=[],e=0;c=b[e];e++)d.push(this.applySimpleSelectorScope(a,c));return d.join(", ")},applySimpleSelectorScope:function(a,b){return a.match(polyfillHostRe)?(a=a.replace(polyfillHostNoCombinator,b),a.replace(polyfillHostRe,b+" ")):b+" "+a},applyStrictSelectorScope:function(a,b){b=b.replace(/\[is=([^\]]*)\]/g,"$1");var c=[" ",">","+","~"],d=a,e="["+b+"]";return c.forEach(function(a){var b=d.split(a);d=b.map(function(a){var b=a.trim().replace(polyfillHostRe,"");return b&&c.indexOf(b)<0&&b.indexOf(e)<0&&(a=b.replace(/([^:]*)(:*)(.*)/,"$1"+e+"$2$3")),a}).join(a)}),d},insertPolyfillHostInCssText:function(a){return a.replace(colonHostContextRe,t).replace(colonHostRe,s)},propertiesFromRule:function(a){var b=a.style.cssText;a.style.content&&!a.style.content.match(/['"]+|attr/)&&(b=b.replace(/content:[^;]*;/g,"content: '"+a.style.content+"';"));var c=a.style;for(var d in c)"initial"===c[d]&&(b+=d+": initial; ");return b},replaceTextInStyles:function(a,b){a&&b&&(a instanceof Array||(a=[a]),Array.prototype.forEach.call(a,function(a){a.textContent=b.call(this,a.textContent)},this))},addCssToDocument:function(a,b){a.match("@import")?i(a,b):h(a)}},l=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,m=/\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,n=/polyfill-next-selector[^}]*content\:[\s]*'([^']*)'[^}]*}([^{]*?){/gim,o=/\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,p=/(polyfill-rule)[^}]*(content\:[\s]*'([^']*)'[^;]*;)[^}]*}/gim,q=/\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,r=/(polyfill-unscoped-rule)[^}]*(content\:[\s]*'([^']*)'[^;]*;)[^}]*}/gim,s="-shadowcsshost",t="-shadowcsscontext",u=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";cssColonHostRe=new RegExp("("+s+u,"gim"),cssColonHostContextRe=new RegExp("("+t+u,"gim"),selectorReSuffix="([>\\s~+[.,{:][\\s\\S]*)?$",colonHostRe=/\:host/gim,colonHostContextRe=/\:host-context/gim,polyfillHostNoCombinator=s+"-no-combinator",polyfillHostRe=new RegExp(s,"gim"),polyfillHostContextRe=new RegExp(t,"gim"),combinatorsRe=[/\^\^/g,/\^/g,/\/shadow\//g,/\/shadow-deep\//g,/::shadow/g,/\/deep\//g];var v=document.createElement("iframe");v.style.display="none";var w,x=navigator.userAgent.match("Chrome"),y="shim-shadowdom",z="shim-shadowdom-css",A="no-shim";if(window.ShadowDOMPolyfill){h("style { display: none !important; }\n");var B=wrap(document),C=B.querySelector("head");C.insertBefore(j(),C.childNodes[0]),document.addEventListener("DOMContentLoaded",function(){var b=a.urlResolver;if(window.HTMLImports&&!HTMLImports.useNative){var c="link[rel=stylesheet]["+y+"]",d="style["+y+"]";HTMLImports.importer.documentPreloadSelectors+=","+c,HTMLImports.importer.importsPreloadSelectors+=","+c,HTMLImports.parser.documentSelectors=[HTMLImports.parser.documentSelectors,c,d].join(",");var e=HTMLImports.parser.parseGeneric;HTMLImports.parser.parseGeneric=function(a){if(!a[z]){var c=a.__importElement||a;if(!c.hasAttribute(y))return void e.call(this,a);a.__resource?(c=a.ownerDocument.createElement("style"),c.textContent=b.resolveCssText(a.__resource,a.href)):b.resolveStyle(c),c.textContent=k.shimStyle(c),c.removeAttribute(y,""),c.setAttribute(z,""),c[z]=!0,c.parentNode!==C&&(a.parentNode===C?C.replaceChild(c,a):C.appendChild(c)),c.__importParsed=!0,this.markParsingComplete(a),this.parseNext()}};var f=HTMLImports.parser.hasResource;HTMLImports.parser.hasResource=function(a){return"link"===a.localName&&"stylesheet"===a.rel&&a.hasAttribute(y)?a.__resource:f.call(this,a)}}})}a.ShadowCSS=k}(window.Platform)):!function(){window.wrap=window.unwrap=function(a){return a},addEventListener("DOMContentLoaded",function(){if(CustomElements.useNative===!1){var a=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var b=a.call(this);return CustomElements.watchShadow(this),b}}}),Platform.templateContent=function(a){if(window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(a),!a.content&&!a._content){for(var b=document.createDocumentFragment();a.firstChild;)b.appendChild(a.firstChild);a._content=b}return a.content||a._content}}(window.Platform),function(a){"use strict";function b(a){return void 0!==m[a]}function c(){h.call(this),this._isInvalid=!0}function d(a){return""==a&&c.call(this),a.toLowerCase()}function e(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,63,96].indexOf(b)?a:encodeURIComponent(a)}function f(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function g(a,g,h){function i(a){t.push(a)}var j=g||"scheme start",k=0,l="",r=!1,s=!1,t=[];a:for(;(a[k-1]!=o||0==k)&&!this._isInvalid;){var u=a[k];switch(j){case"scheme start":if(!u||!p.test(u)){if(g){i("Invalid scheme.");break a}l="",j="no scheme";continue}l+=u.toLowerCase(),j="scheme";break;case"scheme":if(u&&q.test(u))l+=u.toLowerCase();else{if(":"!=u){if(g){if(o==u)break a;i("Code point not allowed in scheme: "+u);break a}l="",k=0,j="no scheme";continue}if(this._scheme=l,l="",g)break a;b(this._scheme)&&(this._isRelative=!0),j="file"==this._scheme?"relative":this._isRelative&&h&&h._scheme==this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"==u?(query="?",j="query"):"#"==u?(this._fragment="#",j="fragment"):o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._schemeData+=e(u));break;case"no scheme":if(h&&b(h._scheme)){j="relative";continue}i("Missing scheme."),c.call(this);break;case"relative or authority":if("/"!=u||"/"!=a[k+1]){i("Expected /, got: "+u),j="relative";continue}j="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!=this._scheme&&(this._scheme=h._scheme),o==u){this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query;break a}if("/"==u||"\\"==u)"\\"==u&&i("\\ is an invalid code point."),j="relative slash";else if("?"==u)this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query="?",j="query";else{if("#"!=u){var v=a[k+1],w=a[k+2];("file"!=this._scheme||!p.test(u)||":"!=v&&"|"!=v||o!=w&&"/"!=w&&"\\"!=w&&"?"!=w&&"#"!=w)&&(this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._path.pop()),j="relative path";continue}this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._fragment="#",j="fragment"}break;case"relative slash":if("/"!=u&&"\\"!=u){"file"!=this._scheme&&(this._host=h._host,this._port=h._port),j="relative path";continue}"\\"==u&&i("\\ is an invalid code point."),j="file"==this._scheme?"file host":"authority ignore slashes";
break;case"authority first slash":if("/"!=u){i("Expected '/', got: "+u),j="authority ignore slashes";continue}j="authority second slash";break;case"authority second slash":if(j="authority ignore slashes","/"!=u){i("Expected '/', got: "+u);continue}break;case"authority ignore slashes":if("/"!=u&&"\\"!=u){j="authority";continue}i("Expected authority, got: "+u);break;case"authority":if("@"==u){r&&(i("@ already seen."),l+="%40"),r=!0;for(var x=0;x<l.length;x++){var y=l[x];if("	"!=y&&"\n"!=y&&"\r"!=y)if(":"!=y||null!==this._password){var z=e(y);null!==this._password?this._password+=z:this._username+=z}else this._password="";else i("Invalid whitespace in authority.")}l=""}else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){k-=l.length,l="",j="host";continue}l+=u}break;case"file host":if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){2!=l.length||!p.test(l[0])||":"!=l[1]&&"|"!=l[1]?0==l.length?j="relative path start":(this._host=d.call(this,l),l="",j="relative path start"):j="relative path";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid whitespace in file host."):l+=u;break;case"host":case"hostname":if(":"!=u||s){if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){if(this._host=d.call(this,l),l="",j="relative path start",g)break a;continue}"	"!=u&&"\n"!=u&&"\r"!=u?("["==u?s=!0:"]"==u&&(s=!1),l+=u):i("Invalid code point in host/hostname: "+u)}else if(this._host=d.call(this,l),l="",j="port","hostname"==g)break a;break;case"port":if(/[0-9]/.test(u))l+=u;else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u||g){if(""!=l){var A=parseInt(l,10);A!=m[this._scheme]&&(this._port=A+""),l=""}if(g)break a;j="relative path start";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid code point in port: "+u):c.call(this)}break;case"relative path start":if("\\"==u&&i("'\\' not allowed in path."),j="relative path","/"!=u&&"\\"!=u)continue;break;case"relative path":if(o!=u&&"/"!=u&&"\\"!=u&&(g||"?"!=u&&"#"!=u))"	"!=u&&"\n"!=u&&"\r"!=u&&(l+=e(u));else{"\\"==u&&i("\\ not allowed in relative path.");var B;(B=n[l.toLowerCase()])&&(l=B),".."==l?(this._path.pop(),"/"!=u&&"\\"!=u&&this._path.push("")):"."==l&&"/"!=u&&"\\"!=u?this._path.push(""):"."!=l&&("file"==this._scheme&&0==this._path.length&&2==l.length&&p.test(l[0])&&"|"==l[1]&&(l=l[0]+":"),this._path.push(l)),l="","?"==u?(this._query="?",j="query"):"#"==u&&(this._fragment="#",j="fragment")}break;case"query":g||"#"!=u?o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._query+=f(u)):(this._fragment="#",j="fragment");break;case"fragment":o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._fragment+=u)}k++}}function h(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function i(a,b){void 0===b||b instanceof i||(b=new i(String(b))),this._url=a,h.call(this);var c=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");g.call(this,c,null,b)}var j=!1;if(!a.forceJURL)try{var k=new URL("b","http://a");j="http://a/b"===k.href}catch(l){}if(!j){var m=Object.create(null);m.ftp=21,m.file=0,m.gopher=70,m.http=80,m.https=443,m.ws=80,m.wss=443;var n=Object.create(null);n["%2e"]=".",n[".%2e"]="..",n["%2e."]="..",n["%2e%2e"]="..";var o=void 0,p=/[a-zA-Z]/,q=/[a-zA-Z0-9\+\-\.]/;i.prototype={get href(){if(this._isInvalid)return this._url;var a="";return(""!=this._username||null!=this._password)&&(a=this._username+(null!=this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+a+this.host:"")+this.pathname+this._query+this._fragment},set href(a){h.call(this),g.call(this,a)},get protocol(){return this._scheme+":"},set protocol(a){this._isInvalid||g.call(this,a+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"host")},get hostname(){return this._host},set hostname(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"hostname")},get port(){return this._port},set port(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(a){!this._isInvalid&&this._isRelative&&(this._path=[],g.call(this,a,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(a){!this._isInvalid&&this._isRelative&&(this._query="?","?"==a[0]&&(a=a.slice(1)),g.call(this,a,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(a){this._isInvalid||(this._fragment="#","#"==a[0]&&(a=a.slice(1)),g.call(this,a,"fragment"))}},a.URL=i}}(window),function(a){function b(a){for(var b=a||{},d=1;d<arguments.length;d++){var e=arguments[d];try{for(var f in e)c(f,e,b)}catch(g){}}return b}function c(a,b,c){var e=d(b,a);Object.defineProperty(c,a,e)}function d(a,b){if(a){var c=Object.getOwnPropertyDescriptor(a,b);return c||d(Object.getPrototypeOf(a),b)}}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),b.apply(a,d)}}),a.mixin=b}(window.Platform),function(a){"use strict";function b(a,b,c){var d="string"==typeof a?document.createElement(a):a.cloneNode(!0);if(d.innerHTML=b,c)for(var e in c)d.setAttribute(e,c[e]);return d}var c=DOMTokenList.prototype.add,d=DOMTokenList.prototype.remove;DOMTokenList.prototype.add=function(){for(var a=0;a<arguments.length;a++)c.call(this,arguments[a])},DOMTokenList.prototype.remove=function(){for(var a=0;a<arguments.length;a++)d.call(this,arguments[a])},DOMTokenList.prototype.toggle=function(a,b){1==arguments.length&&(b=!this.contains(a)),b?this.add(a):this.remove(a)},DOMTokenList.prototype.switch=function(a,b){a&&this.remove(a),b&&this.add(b)};var e=function(){return Array.prototype.slice.call(this)},f=window.NamedNodeMap||window.MozNamedAttrMap||{};if(NodeList.prototype.array=e,f.prototype.array=e,HTMLCollection.prototype.array=e,!window.performance){var g=Date.now();window.performance={now:function(){return Date.now()-g}}}window.requestAnimationFrame||(window.requestAnimationFrame=function(){var a=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return a?function(b){return a(function(){b(performance.now())})}:function(a){return window.setTimeout(a,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(a){clearTimeout(a)}}());var h=[],i=function(){h.push(arguments)};window.Polymer=i,a.deliverDeclarations=function(){return a.deliverDeclarations=function(){throw"Possible attempt to load Polymer twice"},h},window.addEventListener("DOMContentLoaded",function(){window.Polymer===i&&(window.Polymer=function(){console.error('You tried to use polymer without loading it first. To load polymer, <link rel="import" href="components/polymer/polymer.html">')})}),a.createDOM=b}(window.Platform),function(a){a.templateContent=a.templateContent||function(a){return a.content}}(window.Platform),function(a){a=a||(window.Inspector={});var b;window.sinspect=function(a,d){b||(b=window.open("","ShadowDOM Inspector",null,!0),b.document.write(c),b.api={shadowize:shadowize}),f(a||wrap(document.body),d)};var c=["<!DOCTYPE html>","<html>","  <head>","    <title>ShadowDOM Inspector</title>","    <style>","      body {","      }","      pre {",'        font: 9pt "Courier New", monospace;',"        line-height: 1.5em;","      }","      tag {","        color: purple;","      }","      ul {","         margin: 0;","         padding: 0;","         list-style: none;","      }","      li {","         display: inline-block;","         background-color: #f1f1f1;","         padding: 4px 6px;","         border-radius: 4px;","         margin-right: 4px;","      }","    </style>","  </head>","  <body>",'    <ul id="crumbs">',"    </ul>",'    <div id="tree"></div>',"  </body>","</html>"].join("\n"),d=[],e=function(){var a=b.document,c=a.querySelector("#crumbs");c.textContent="";for(var e,g=0;e=d[g];g++){var h=a.createElement("a");h.href="#",h.textContent=e.localName,h.idx=g,h.onclick=function(a){for(var b;d.length>this.idx;)b=d.pop();f(b.shadow||b,b),a.preventDefault()},c.appendChild(a.createElement("li")).appendChild(h)}},f=function(a,c){var f=b.document;k=[];var g=c||a;d.push(g),e(),f.body.querySelector("#tree").innerHTML="<pre>"+j(a,a.childNodes)+"</pre>"},g=Array.prototype.forEach.call.bind(Array.prototype.forEach),h={STYLE:1,SCRIPT:1,"#comment":1,TEMPLATE:1},i=function(a){return h[a.nodeName]},j=function(a,b,c){if(i(a))return"";var d=c||"";if(a.localName||11==a.nodeType){var e=a.localName||"shadow-root",f=d+l(a);"content"==e&&(b=a.getDistributedNodes()),f+="<br/>";var h=d+"&nbsp;&nbsp;";g(b,function(a){f+=j(a,a.childNodes,h)}),f+=d,{br:1}[e]||(f+="<tag>&lt;/"+e+"&gt;</tag>",f+="<br/>")}else{var k=a.textContent.trim();f=k?d+'"'+k+'"<br/>':""}return f},k=[],l=function(a){var b="<tag>&lt;",c=a.localName||"shadow-root";return a.webkitShadowRoot||a.shadowRoot?(b+=' <button idx="'+k.length+'" onclick="api.shadowize.call(this)">'+c+"</button>",k.push(a)):b+=c||"shadow-root",a.attributes&&g(a.attributes,function(a){b+=" "+a.name+(a.value?'="'+a.value+'"':"")}),b+="&gt;</tag>"};shadowize=function(){var a=Number(this.attributes.idx.value),b=k[a];b?f(b.webkitShadowRoot||b.shadowRoot,b):(console.log("bad shadowize node"),console.dir(this))},a.output=j}(window.Inspector),function(){var a=document.createElement("style");a.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; } \n";var b=document.querySelector("head");b.insertBefore(a,b.firstChild)}(Platform),function(a){function b(a,b){return b=b||[],b.map||(b=[b]),a.apply(this,b.map(d))}function c(a,c,d){var e;switch(arguments.length){case 0:return;case 1:e=null;break;case 2:e=c.apply(this);break;default:e=b(d,c)}f[a]=e}function d(a){return f[a]}function e(a,c){HTMLImports.whenImportsReady(function(){b(c,a)})}var f={};a.marshal=d,a.module=c,a.using=e}(window),function(a){function b(a){f.textContent=d++,e.push(a)}function c(){for(;e.length;)e.shift()()}var d=0,e=[],f=document.createTextNode("");new(window.MutationObserver||JsMutationObserver)(c).observe(f,{characterData:!0}),a.endOfMicrotask=b}(Platform),function(a){function b(a,b,d,e){return a.replace(e,function(a,e,f,g){var h=f.replace(/["']/g,"");return h=c(b,h,d),e+"'"+h+"'"+g})}function c(a,b,c){if(b&&"/"===b[0])return b;var e=new URL(b,a);return c?e.href:d(e.href)}function d(a){var b=new URL(document.baseURI),c=new URL(a,b);return c.host===b.host&&c.port===b.port&&c.protocol===b.protocol?e(b,c):a}function e(a,b){for(var c=a.pathname,d=b.pathname,e=c.split("/"),f=d.split("/");e.length&&e[0]===f[0];)e.shift(),f.shift();for(var g=0,h=e.length-1;h>g;g++)f.unshift("..");return f.join("/")+b.search+b.hash}var f={resolveDom:function(a,b){b=b||a.ownerDocument.baseURI,this.resolveAttributes(a,b),this.resolveStyles(a,b);var c=a.querySelectorAll("template");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)d.content&&this.resolveDom(d.content,b)},resolveTemplate:function(a){this.resolveDom(a.content,a.ownerDocument.baseURI)},resolveStyles:function(a,b){var c=a.querySelectorAll("style");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)this.resolveStyle(d,b)},resolveStyle:function(a,b){b=b||a.ownerDocument.baseURI,a.textContent=this.resolveCssText(a.textContent,b)},resolveCssText:function(a,c,d){return a=b(a,c,d,g),b(a,c,d,h)},resolveAttributes:function(a,b){a.hasAttributes&&a.hasAttributes()&&this.resolveElementAttributes(a,b);var c=a&&a.querySelectorAll(j);if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)this.resolveElementAttributes(d,b)},resolveElementAttributes:function(a,d){d=d||a.ownerDocument.baseURI,i.forEach(function(e){var f,h=a.attributes[e],i=h&&h.value;i&&i.search(k)<0&&(f="style"===e?b(i,d,g):c(d,i),h.value=f)})}},g=/(url\()([^)]*)(\))/g,h=/(@import[\s]+(?!url\())([^;]*)(;)/g,i=["href","src","action","style"],j="["+i.join("],[")+"]",k="{{.*}}";a.urlResolver=f}(Platform),function(a){function b(a){u.push(a),t||(t=!0,q(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=p.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=p.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p=new WeakMap,q=window.msSetImmediate;if(!q){var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),q=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=p.get(a);d||p.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=p.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return void(c[d-1]=f)}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=p.get(a);b||p.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=p.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,d=a.relatedNode,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",d);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(d,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g,a.MutationObserver||(a.MutationObserver=g)}(this),window.HTMLImports=window.HTMLImports||{flags:{}},function(a){var b=(a.path,a.xhr),c=a.flags,d=function(a,b){this.cache={},this.onload=a,this.oncomplete=b,this.inflight=0,this.pending={}};d.prototype={addNodes:function(a){this.inflight+=a.length;for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)this.require(b);this.checkDone()},addNode:function(a){this.inflight++,this.require(a),this.checkDone()},require:function(a){var b=a.src||a.href;a.__nodeUrl=b,this.dedupe(b,a)||this.fetch(b,a)},dedupe:function(a,b){if(this.pending[a])return this.pending[a].push(b),!0;return this.cache[a]?(this.onload(a,b,this.cache[a]),this.tail(),!0):(this.pending[a]=[b],!1)},fetch:function(a,d){if(c.load&&console.log("fetch",a,d),a.match(/^data:/)){var e=a.split(","),f=e[0],g=e[1];g=f.indexOf(";base64")>-1?atob(g):decodeURIComponent(g),setTimeout(function(){this.receive(a,d,null,g)}.bind(this),0)}else{var h=function(b,c,e){this.receive(a,d,b,c,e)}.bind(this);b.load(a,h)}},receive:function(a,b,c,d,e){this.cache[a]=d;var f=this.pending[a];e&&e!==a&&(this.cache[e]=d,f=f.concat(this.pending[e]));for(var g,h=0,i=f.length;i>h&&(g=f[h]);h++)this.onload(e||a,g,d),this.tail();this.pending[a]=null,e&&e!==a&&(this.pending[e]=null)},tail:function(){--this.inflight,this.checkDone()},checkDone:function(){this.inflight||this.oncomplete()}},b=b||{async:!0,ok:function(a){return a.status>=200&&a.status<300||304===a.status||0===a.status},load:function(c,d,e){var f=new XMLHttpRequest;return(a.flags.debug||a.flags.bust)&&(c+="?"+Math.random()),f.open("GET",c,b.async),f.addEventListener("readystatechange",function(){if(4===f.readyState){var a=f.getResponseHeader("Location"),c=null;if(a)var c="/"===a.substr(0,1)?location.origin+a:c;d.call(e,!b.ok(f)&&f,f.response||f.responseText,c)}}),f.send(),f},loadDocument:function(a,b,c){this.load(a,b,c).responseType="document"}},a.xhr=b,a.Loader=d}(window.HTMLImports),function(a){function b(a){return"link"===a.localName&&a.rel===g}function c(a){var b,c=d(a);try{b=btoa(c)}catch(e){b=btoa(unescape(encodeURIComponent(c))),console.warn("Script contained non-latin characters that were forced to latin. Some characters may be wrong.",a)}return"data:text/javascript;base64,"+b}function d(a){return a.textContent+e(a)}function e(a){var b=a.__nodeUrl;if(!b){b=a.ownerDocument.baseURI;var c="["+Math.floor(1e3*(Math.random()+1))+"]",d=a.textContent.match(/Polymer\(['"]([^'"]*)/);c=d&&d[1]||c,b+="/"+c+".js"}return"\n//# sourceURL="+b+"\n"}function f(a){var b=a.ownerDocument.createElement("style");return b.textContent=a.textContent,n.resolveUrlsInStyle(b),b}var g="import",h=a.flags,i=/Trident/.test(navigator.userAgent),j=window.ShadowDOMPolyfill?window.ShadowDOMPolyfill.wrapIfNeeded(document):document,k={documentSelectors:"link[rel="+g+"]",importsSelectors:["link[rel="+g+"]","link[rel=stylesheet]","style","script:not([type])",'script[type="text/javascript"]'].join(","),map:{link:"parseLink",script:"parseScript",style:"parseStyle"},parseNext:function(){var a=this.nextToParse();a&&this.parse(a)},parse:function(a){if(this.isParsed(a))return void(h.parse&&console.log("[%s] is already parsed",a.localName));var b=this[this.map[a.localName]];b&&(this.markParsing(a),b.call(this,a))},markParsing:function(a){h.parse&&console.log("parsing",a),this.parsingElement=a},markParsingComplete:function(a){a.__importParsed=!0,a.__importElement&&(a.__importElement.__importParsed=!0),this.parsingElement=null,h.parse&&console.log("completed",a)},parseImport:function(a){if(HTMLImports.__importsParsingHook&&HTMLImports.__importsParsingHook(a),a.import.__importParsed=!0,this.markParsingComplete(a),a.dispatchEvent(a.__resource?new CustomEvent("load",{bubbles:!1}):new CustomEvent("error",{bubbles:!1})),a.__pending)for(var b;a.__pending.length;)b=a.__pending.shift(),b&&b({target:a});this.parseNext()},parseLink:function(a){b(a)?this.parseImport(a):(a.href=a.href,this.parseGeneric(a))},parseStyle:function(a){var b=a;a=f(a),a.__importElement=b,this.parseGeneric(a)},parseGeneric:function(a){this.trackElement(a),document.head.appendChild(a)},trackElement:function(a,b){var c=this,d=function(d){b&&b(d),c.markParsingComplete(a),c.parseNext()};if(a.addEventListener("load",d),a.addEventListener("error",d),i&&"style"===a.localName){var e=!1;if(-1==a.textContent.indexOf("@import"))e=!0;else if(a.sheet){e=!0;for(var f,g=a.sheet.cssRules,h=g?g.length:0,j=0;h>j&&(f=g[j]);j++)f.type===CSSRule.IMPORT_RULE&&(e=e&&Boolean(f.styleSheet))}e&&a.dispatchEvent(new CustomEvent("load",{bubbles:!1}))}},parseScript:function(b){var d=document.createElement("script");d.__importElement=b,d.src=b.src?b.src:c(b),a.currentScript=b,this.trackElement(d,function(){d.parentNode.removeChild(d),a.currentScript=null}),document.head.appendChild(d)},nextToParse:function(){return!this.parsingElement&&this.nextToParseInDoc(j)},nextToParseInDoc:function(a,c){for(var d,e=a.querySelectorAll(this.parseSelectorsForNode(a)),f=0,g=e.length;g>f&&(d=e[f]);f++)if(!this.isParsed(d))return this.hasResource(d)?b(d)?this.nextToParseInDoc(d.import,d):d:void 0;return c},parseSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===j?this.documentSelectors:this.importsSelectors},isParsed:function(a){return a.__importParsed},hasResource:function(a){return b(a)&&!a.import?!1:!0}},l=/(url\()([^)]*)(\))/g,m=/(@import[\s]+(?!url\())([^;]*)(;)/g,n={resolveUrlsInStyle:function(a){var b=a.ownerDocument,c=b.createElement("a");return a.textContent=this.resolveUrlsInCssText(a.textContent,c),a},resolveUrlsInCssText:function(a,b){var c=this.replaceUrls(a,b,l);return c=this.replaceUrls(c,b,m)},replaceUrls:function(a,b,c){return a.replace(c,function(a,c,d,e){var f=d.replace(/["']/g,"");return b.href=f,f=b.href,c+"'"+f+"'"+e})}};a.parser=k,a.path=n,a.isIE=i}(HTMLImports),function(a){function b(a){return c(a,q)}function c(a,b){return"link"===a.localName&&a.getAttribute("rel")===b}function d(a,b){var c=a;c instanceof Document||(c=document.implementation.createHTMLDocument(q)),c._URL=b;var d=c.createElement("base");d.setAttribute("href",b),c.baseURI||(c.baseURI=b);var e=c.createElement("meta");return e.setAttribute("charset","utf-8"),c.head.appendChild(e),c.head.appendChild(d),a instanceof Document||(c.body.innerHTML=a),window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(c),c}function e(a,b){b=b||r,g(function(){h(a,b)},b)}function f(a){return"complete"===a.readyState||a.readyState===y}function g(a,b){if(f(b))a&&a();else{var c=function(){("complete"===b.readyState||b.readyState===y)&&(b.removeEventListener(z,c),g(a,b))};b.addEventListener(z,c)}}function h(a,b){function c(){f==g&&a&&a()}function d(){f++,c()}var e=b.querySelectorAll("link[rel=import]"),f=0,g=e.length;if(g)for(var h,j=0;g>j&&(h=e[j]);j++)i(h)?d.call(h):(h.addEventListener("load",d),h.addEventListener("error",d));else c()}function i(a){return o?a.import&&"loading"!==a.import.readyState||a.__loaded:a.__importParsed}function j(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)k(b)&&l(b)}function k(a){return"link"===a.localName&&"import"===a.rel}function l(a){var b=a.import;b?m({target:a}):(a.addEventListener("load",m),a.addEventListener("error",m))}function m(a){a.target.__loaded=!0}var n="import"in document.createElement("link"),o=n,p=a.flags,q="import",r=window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrapIfNeeded(document):document;if(o)var s={};else var t=(a.xhr,a.Loader),u=a.parser,s={documents:{},documentPreloadSelectors:"link[rel="+q+"]",importsPreloadSelectors:["link[rel="+q+"]"].join(","),loadNode:function(a){v.addNode(a)},loadSubtree:function(a){var b=this.marshalNodes(a);v.addNodes(b)},marshalNodes:function(a){return a.querySelectorAll(this.loadSelectorsForNode(a))},loadSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===r?this.documentPreloadSelectors:this.importsPreloadSelectors},loaded:function(a,c,e){if(p.load&&console.log("loaded",a,c),c.__resource=e,b(c)){var f=this.documents[a];f||(f=d(e,a),f.__importLink=c,this.bootDocument(f),this.documents[a]=f),c.import=f}u.parseNext()},bootDocument:function(a){this.loadSubtree(a),this.observe(a),u.parseNext()},loadedAll:function(){u.parseNext()}},v=new t(s.loaded.bind(s),s.loadedAll.bind(s));var w={get:function(){return HTMLImports.currentScript||document.currentScript},configurable:!0};if(Object.defineProperty(document,"_currentScript",w),Object.defineProperty(r,"_currentScript",w),!document.baseURI){var x={get:function(){return window.location.href},configurable:!0};Object.defineProperty(document,"baseURI",x),Object.defineProperty(r,"baseURI",x)}var y=HTMLImports.isIE?"complete":"interactive",z="readystatechange";o&&new MutationObserver(function(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)b.addedNodes&&j(b.addedNodes)}).observe(document.head,{childList:!0}),a.hasNative=n,a.useNative=o,a.importer=s,a.whenImportsReady=e,a.IMPORT_LINK_TYPE=q,a.isImportLoaded=i,a.importLoader=v}(window.HTMLImports),function(a){function b(a){for(var b,d=0,e=a.length;e>d&&(b=a[d]);d++)"childList"===b.type&&b.addedNodes.length&&c(b.addedNodes)}function c(a){for(var b,e=0,g=a.length;g>e&&(b=a[e]);e++)d(b)&&f.loadNode(b),b.children&&b.children.length&&c(b.children)}function d(a){return 1===a.nodeType&&g.call(a,f.loadSelectorsForNode(a))}function e(a){h.observe(a,{childList:!0,subtree:!0})}var f=(a.IMPORT_LINK_TYPE,a.importer),g=HTMLElement.prototype.matches||HTMLElement.prototype.matchesSelector||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector,h=new MutationObserver(b);a.observe=e,f.observe=e}(HTMLImports),function(){function a(){HTMLImports.importer.bootDocument(b)}"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){var c=document.createEvent("HTMLEvents");return c.initEvent(a,b.bubbles===!1?!1:!0,b.cancelable===!1?!1:!0,b.detail),c});var b=window.ShadowDOMPolyfill?window.ShadowDOMPolyfill.wrapIfNeeded(document):document;HTMLImports.whenImportsReady(function(){HTMLImports.ready=!0,HTMLImports.readyTime=(new Date).getTime(),b.dispatchEvent(new CustomEvent("HTMLImportsLoaded",{bubbles:!0}))}),HTMLImports.useNative||("complete"===document.readyState||"interactive"===document.readyState&&!window.attachEvent?a():document.addEventListener("DOMContentLoaded",a))}(),window.CustomElements=window.CustomElements||{flags:{}},function(a){function b(a,c,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)c(e,d)!==!0&&b(e,c,d),e=e.nextElementSibling;return null}function c(a,b){for(var c=a.shadowRoot;c;)d(c,b),c=c.olderShadowRoot}function d(a,d){b(a,function(a){return d(a)?!0:void c(a,d)}),c(a,d)}function e(a){return h(a)?(i(a),!0):void l(a)}function f(a){d(a,function(a){return e(a)?!0:void 0})}function g(a){return e(a)||f(a)}function h(b){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var c=b.getAttribute("is")||b.localName,d=a.registry[c];if(d)return A.dom&&console.group("upgrade:",b.localName),a.upgrade(b),A.dom&&console.groupEnd(),!0}}function i(a){l(a),r(a)&&d(a,function(a){l(a)})}function j(a){if(E.push(a),!D){D=!0;var b=window.Platform&&window.Platform.endOfMicrotask||setTimeout;b(k)}}function k(){D=!1;for(var a,b=E,c=0,d=b.length;d>c&&(a=b[c]);c++)a();E=[]}function l(a){C?j(function(){m(a)}):m(a)}function m(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("inserted:",a.localName),r(a)&&(a.__inserted=(a.__inserted||0)+1,a.__inserted<1&&(a.__inserted=1),a.__inserted>1?A.dom&&console.warn("inserted:",a.localName,"insert/remove count:",a.__inserted):a.attachedCallback&&(A.dom&&console.log("inserted:",a.localName),a.attachedCallback())),A.dom&&console.groupEnd())}function n(a){o(a),d(a,function(a){o(a)})}function o(a){C?j(function(){p(a)}):p(a)}function p(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("removed:",a.localName),r(a)||(a.__inserted=(a.__inserted||0)-1,a.__inserted>0&&(a.__inserted=0),a.__inserted<0?A.dom&&console.warn("removed:",a.localName,"insert/remove count:",a.__inserted):a.detachedCallback&&a.detachedCallback()),A.dom&&console.groupEnd())}function q(a){return window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrapIfNeeded(a):a}function r(a){for(var b=a,c=q(document);b;){if(b==c)return!0;b=b.parentNode||b.host}}function s(a){if(a.shadowRoot&&!a.shadowRoot.__watched){A.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)t(b),b=b.olderShadowRoot}}function t(a){a.__watched||(w(a),a.__watched=!0)}function u(a){if(A.dom){var b=a[0];if(b&&"childList"===b.type&&b.addedNodes&&b.addedNodes){for(var c=b.addedNodes[0];c&&c!==document&&!c.host;)c=c.parentNode;var d=c&&(c.URL||c._URL||c.host&&c.host.localName)||"";d=d.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",a.length,d||"")}a.forEach(function(a){"childList"===a.type&&(G(a.addedNodes,function(a){a.localName&&g(a)}),G(a.removedNodes,function(a){a.localName&&n(a)}))}),A.dom&&console.groupEnd()}function v(){u(F.takeRecords()),k()}function w(a){F.observe(a,{childList:!0,subtree:!0})}function x(a){w(a)}function y(a){A.dom&&console.group("upgradeDocument: ",a.baseURI.split("/").pop()),g(a),A.dom&&console.groupEnd()}function z(a){a=q(a);for(var b,c=a.querySelectorAll("link[rel="+B+"]"),d=0,e=c.length;e>d&&(b=c[d]);d++)b.import&&b.import.__parsed&&z(b.import);y(a)}var A=window.logFlags||{},B=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none",C=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=C;var D=!1,E=[],F=new MutationObserver(u),G=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.IMPORT_LINK_TYPE=B,a.watchShadow=s,a.upgradeDocumentTree=z,a.upgradeAll=g,a.upgradeSubtree=f,a.insertedNode=i,a.observeDocument=x,a.upgradeDocument=y,a.takeRecords=v}(window.CustomElements),function(a){function b(b,g){var h=g||{};if(!b)throw new Error("document.registerElement: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(c(b))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(b)+"'. The type name is invalid.");if(n(b))throw new Error("DuplicateDefinitionError: a type with name '"+String(b)+"' is already registered");if(!h.prototype)throw new Error("Options missing required prototype property");return h.__name=b.toLowerCase(),h.lifecycle=h.lifecycle||{},h.ancestry=d(h.extends),e(h),f(h),l(h.prototype),o(h.__name,h),h.ctor=p(h),h.ctor.prototype=h.prototype,h.prototype.constructor=h.ctor,a.ready&&a.upgradeDocumentTree(document),h.ctor}function c(a){for(var b=0;b<y.length;b++)if(a===y[b])return!0}function d(a){var b=n(a);return b?d(b.extends).concat([b]):[]}function e(a){for(var b,c=a.extends,d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.__name,c&&(a.is=a.__name)}function f(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag),d=Object.getPrototypeOf(c);d===a.prototype&&(b=d)}for(var e,f=a.prototype;f&&f!==b;)e=Object.getPrototypeOf(f),f.__proto__=e,f=e;
a.native=b}}function g(a){return h(B(a.tag),a)}function h(b,c){return c.is&&b.setAttribute("is",c.is),b.removeAttribute("unresolved"),i(b,c),b.__upgraded__=!0,k(b),a.insertedNode(b),a.upgradeSubtree(b),b}function i(a,b){Object.__proto__?a.__proto__=b.prototype:(j(a,b.prototype,b.native),a.__proto__=b.prototype)}function j(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function k(a){a.createdCallback&&a.createdCallback()}function l(a){if(!a.setAttribute._polyfilled){var b=a.setAttribute;a.setAttribute=function(a,c){m.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a){m.call(this,a,null,c)},a.setAttribute._polyfilled=!0}}function m(a,b,c){a=a.toLowerCase();var d=this.getAttribute(a);c.apply(this,arguments);var e=this.getAttribute(a);this.attributeChangedCallback&&e!==d&&this.attributeChangedCallback(a,d,e)}function n(a){return a?z[a.toLowerCase()]:void 0}function o(a,b){z[a]=b}function p(a){return function(){return g(a)}}function q(a,b,c){return a===A?r(b,c):C(a,b)}function r(a,b){var c=n(b||a);if(c){if(a==c.tag&&b==c.is)return new c.ctor;if(!b&&!c.is)return new c.ctor}if(b){var d=r(a);return d.setAttribute("is",b),d}var d=B(a);return a.indexOf("-")>=0&&i(d,HTMLElement),d}function s(a){if(!a.__upgraded__&&a.nodeType===Node.ELEMENT_NODE){var b=a.getAttribute("is"),c=n(b||a.localName);if(c){if(b&&c.tag==a.localName)return h(a,c);if(!b&&!c.extends)return h(a,c)}}}function t(b){var c=D.call(this,b);return a.upgradeAll(c),c}a||(a=window.CustomElements={flags:{}});var u=a.flags,v=Boolean(document.registerElement),w=!u.register&&v&&!window.ShadowDOMPolyfill;if(w){var x=function(){};a.registry={},a.upgradeElement=x,a.watchShadow=x,a.upgrade=x,a.upgradeAll=x,a.upgradeSubtree=x,a.observeDocument=x,a.upgradeDocument=x,a.upgradeDocumentTree=x,a.takeRecords=x,a.reservedTagList=[]}else{var y=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],z={},A="http://www.w3.org/1999/xhtml",B=document.createElement.bind(document),C=document.createElementNS.bind(document),D=Node.prototype.cloneNode;document.registerElement=b,document.createElement=r,document.createElementNS=q,Node.prototype.cloneNode=t,a.registry=z,a.upgrade=s}var E;E=Object.__proto__||w?function(a,b){return a instanceof b}:function(a,b){for(var c=a;c;){if(c===b.prototype)return!0;c=c.__proto__}return!1},a.instanceof=E,a.reservedTagList=y,document.register=document.registerElement,a.hasNative=v,a.useNative=w}(window.CustomElements),function(a){function b(a){return"link"===a.localName&&a.getAttribute("rel")===c}var c=a.IMPORT_LINK_TYPE,d={selectors:["link[rel="+c+"]"],map:{link:"parseLink"},parse:function(a){if(!a.__parsed){a.__parsed=!0;var b=a.querySelectorAll(d.selectors);e(b,function(a){d[d.map[a.localName]](a)}),CustomElements.upgradeDocument(a),CustomElements.observeDocument(a)}},parseLink:function(a){b(a)&&this.parseImport(a)},parseImport:function(a){a.import&&d.parse(a.import)}},e=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.parser=d,a.IMPORT_LINK_TYPE=c}(window.CustomElements),function(a){function b(){CustomElements.parser.parse(document),CustomElements.upgradeDocument(document);var a=window.Platform&&Platform.endOfMicrotask?Platform.endOfMicrotask:setTimeout;a(function(){CustomElements.ready=!0,CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0})),window.HTMLImports&&(HTMLImports.__importsParsingHook=function(a){CustomElements.parser.parse(a.import)})})}if("function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a){var b=document.createEvent("HTMLEvents");return b.initEvent(a,!0,!0),b}),"complete"===document.readyState||a.flags.eager)b();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var c=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(c,b)}else b()}(window.CustomElements),function(){if(window.ShadowDOMPolyfill){var a=["upgradeAll","upgradeSubtree","observeDocument","upgradeDocument"],b={};a.forEach(function(a){b[a]=CustomElements[a]}),a.forEach(function(a){CustomElements[a]=function(c){return b[a](wrap(c))}})}}(),function(a){function b(a){this.cache=Object.create(null),this.map=Object.create(null),this.requests=0,this.regex=a}var c=a.endOfMicrotask;b.prototype={extractUrls:function(a,b){for(var c,d,e=[];c=this.regex.exec(a);)d=new URL(c[1],b),e.push({matched:c[0],url:d.href});return e},process:function(a,b,c){var d=this.extractUrls(a,b),e=c.bind(null,this.map);this.fetch(d,e)},fetch:function(a,b){var c=a.length;if(!c)return b();for(var d,e,f,g=function(){0===--c&&b()},h=0;c>h;h++)d=a[h],f=d.url,e=this.cache[f],e||(e=this.xhr(f),e.match=d,this.cache[f]=e),e.wait(g)},handleXhr:function(a){var b=a.match,c=b.url,d=a.response||a.responseText||"";this.map[c]=d,this.fetch(this.extractUrls(d,c),a.resolve)},xhr:function(a){this.requests++;var b=new XMLHttpRequest;return b.open("GET",a,!0),b.send(),b.onerror=b.onload=this.handleXhr.bind(this,b),b.pending=[],b.resolve=function(){for(var a=b.pending,c=0;c<a.length;c++)a[c]();b.pending=null},b.wait=function(a){b.pending?b.pending.push(a):c(a)},b}},a.Loader=b}(window.Platform),function(a){function b(){this.loader=new d(this.regex)}var c=a.urlResolver,d=a.Loader;b.prototype={regex:/@import\s+(?:url)?["'\(]*([^'"\)]*)['"\)]*;/g,resolve:function(a,b,c){var d=function(d){c(this.flatten(a,b,d))}.bind(this);this.loader.process(a,b,d)},resolveNode:function(a,b,c){var d=a.textContent,e=function(b){a.textContent=b,c(a)};this.resolve(d,b,e)},flatten:function(a,b,d){for(var e,f,g,h=this.loader.extractUrls(a,b),i=0;i<h.length;i++)e=h[i],f=e.url,g=c.resolveCssText(d[f],f,!0),g=this.flatten(g,b,d),a=a.replace(e.matched,g);return a},loadStyles:function(a,b,c){function d(){f++,f===g&&c&&c()}for(var e,f=0,g=a.length,h=0;g>h&&(e=a[h]);h++)this.resolveNode(e,b,d)}};var e=new b;a.styleResolver=e}(window.Platform),function(){"use strict";function a(a){for(;a.parentNode;)a=a.parentNode;return"function"==typeof a.getElementById?a:null}function b(a,b,c){var d=a.bindings_;return d||(d=a.bindings_={}),d[b]&&c[b].close(),d[b]=c}function c(a,b,c){return c}function d(a){return null==a?"":a}function e(a,b){a.data=d(b)}function f(a){return function(b){return e(a,b)}}function g(a,b,c,e){return c?void(e?a.setAttribute(b,""):a.removeAttribute(b)):void a.setAttribute(b,d(e))}function h(a,b,c){return function(d){g(a,b,c,d)}}function i(a){switch(a.type){case"checkbox":return u;case"radio":case"select-multiple":case"select-one":return"change";case"range":if(/Trident|MSIE/.test(navigator.userAgent))return"change";default:return"input"}}function j(a,b,c,e){a[b]=(e||d)(c)}function k(a,b,c){return function(d){return j(a,b,d,c)}}function l(){}function m(a,b,c,d){function e(){c.setValue(a[b]),c.discardChanges(),(d||l)(a),Platform.performMicrotaskCheckpoint()}var f=i(a);return a.addEventListener(f,e),{close:function(){a.removeEventListener(f,e),c.close()},observable_:c}}function n(a){return Boolean(a)}function o(b){if(b.form)return s(b.form.elements,function(a){return a!=b&&"INPUT"==a.tagName&&"radio"==a.type&&a.name==b.name});var c=a(b);if(!c)return[];var d=c.querySelectorAll('input[type="radio"][name="'+b.name+'"]');return s(d,function(a){return a!=b&&!a.form})}function p(a){"INPUT"===a.tagName&&"radio"===a.type&&o(a).forEach(function(a){var b=a.bindings_.checked;b&&b.observable_.setValue(!1)})}function q(a,b){var c,e,f,g=a.parentNode;g instanceof HTMLSelectElement&&g.bindings_&&g.bindings_.value&&(c=g,e=c.bindings_.value,f=c.value),a.value=d(b),c&&c.value!=f&&(e.observable_.setValue(c.value),e.observable_.discardChanges(),Platform.performMicrotaskCheckpoint())}function r(a){return function(b){q(a,b)}}var s=Array.prototype.filter.call.bind(Array.prototype.filter);Node.prototype.bind=function(a,b){console.error("Unhandled binding to Node: ",this,a,b)},Node.prototype.bindFinished=function(){};var t=c;Object.defineProperty(Platform,"enableBindingsReflection",{get:function(){return t===b},set:function(a){return t=a?b:c,a},configurable:!0}),Text.prototype.bind=function(a,b,c){if("textContent"!==a)return Node.prototype.bind.call(this,a,b,c);if(c)return e(this,b);var d=b;return e(this,d.open(f(this))),t(this,a,d)},Element.prototype.bind=function(a,b,c){var d="?"==a[a.length-1];if(d&&(this.removeAttribute(a),a=a.slice(0,-1)),c)return g(this,a,d,b);var e=b;return g(this,a,d,e.open(h(this,a,d))),t(this,a,e)};var u;!function(){var a=document.createElement("div"),b=a.appendChild(document.createElement("input"));b.setAttribute("type","checkbox");var c,d=0;b.addEventListener("click",function(){d++,c=c||"click"}),b.addEventListener("change",function(){d++,c=c||"change"});var e=document.createEvent("MouseEvent");e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),b.dispatchEvent(e),u=1==d?"change":c}(),HTMLInputElement.prototype.bind=function(a,c,e){if("value"!==a&&"checked"!==a)return HTMLElement.prototype.bind.call(this,a,c,e);this.removeAttribute(a);var f="checked"==a?n:d,g="checked"==a?p:l;if(e)return j(this,a,c,f);var h=c,i=m(this,a,h,g);return j(this,a,h.open(k(this,a,f)),f),b(this,a,i)},HTMLTextAreaElement.prototype.bind=function(a,b,c){if("value"!==a)return HTMLElement.prototype.bind.call(this,a,b,c);if(this.removeAttribute("value"),c)return j(this,"value",b);var e=b,f=m(this,"value",e);return j(this,"value",e.open(k(this,"value",d))),t(this,a,f)},HTMLOptionElement.prototype.bind=function(a,b,c){if("value"!==a)return HTMLElement.prototype.bind.call(this,a,b,c);if(this.removeAttribute("value"),c)return q(this,b);var d=b,e=m(this,"value",d);return q(this,d.open(r(this))),t(this,a,e)},HTMLSelectElement.prototype.bind=function(a,c,d){if("selectedindex"===a&&(a="selectedIndex"),"selectedIndex"!==a&&"value"!==a)return HTMLElement.prototype.bind.call(this,a,c,d);if(this.removeAttribute(a),d)return j(this,a,c);var e=c,f=m(this,a,e);return j(this,a,e.open(k(this,a))),b(this,a,f)}}(this),function(a){"use strict";function b(a){if(!a)throw new Error("Assertion failed")}function c(a){for(var b;b=a.parentNode;)a=b;return a}function d(a,b){if(b){for(var d,e="#"+b;!d&&(a=c(a),a.protoContent_?d=a.protoContent_.querySelector(e):a.getElementById&&(d=a.getElementById(b)),!d&&a.templateCreator_);)a=a.templateCreator_;return d}}function e(a){return"template"==a.tagName&&"http://www.w3.org/2000/svg"==a.namespaceURI}function f(a){return"TEMPLATE"==a.tagName&&"http://www.w3.org/1999/xhtml"==a.namespaceURI}function g(a){return Boolean(L[a.tagName]&&a.hasAttribute("template"))}function h(a){return void 0===a.isTemplate_&&(a.isTemplate_="TEMPLATE"==a.tagName||g(a)),a.isTemplate_}function i(a,b){var c=a.querySelectorAll(N);h(a)&&b(a),G(c,b)}function j(a){function b(a){HTMLTemplateElement.decorate(a)||j(a.content)}i(a,b)}function k(a,b){Object.getOwnPropertyNames(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))})}function l(a){var b=a.ownerDocument;if(!b.defaultView)return b;var c=b.templateContentsOwner_;if(!c){for(c=b.implementation.createHTMLDocument("");c.lastChild;)c.removeChild(c.lastChild);b.templateContentsOwner_=c}return c}function m(a){if(!a.stagingDocument_){var b=a.ownerDocument;if(!b.stagingDocument_){b.stagingDocument_=b.implementation.createHTMLDocument(""),b.stagingDocument_.isStagingDocument=!0;var c=b.stagingDocument_.createElement("base");c.href=document.baseURI,b.stagingDocument_.head.appendChild(c),b.stagingDocument_.stagingDocument_=b.stagingDocument_}a.stagingDocument_=b.stagingDocument_}return a.stagingDocument_}function n(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];K[e.name]&&("template"!==e.name&&b.setAttribute(e.name,e.value),a.removeAttribute(e.name))}return b}function o(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];b.setAttribute(e.name,e.value),a.removeAttribute(e.name)}return a.parentNode.removeChild(a),b}function p(a,b,c){var d=a.content;if(c)return void d.appendChild(b);for(var e;e=b.firstChild;)d.appendChild(e)}function q(a){P?a.__proto__=HTMLTemplateElement.prototype:k(a,HTMLTemplateElement.prototype)}function r(a){a.setModelFn_||(a.setModelFn_=function(){a.setModelFnScheduled_=!1;var b=z(a,a.delegate_&&a.delegate_.prepareBinding);w(a,b,a.model_)}),a.setModelFnScheduled_||(a.setModelFnScheduled_=!0,Observer.runEOM_(a.setModelFn_))}function s(a,b,c,d){if(a&&a.length){for(var e,f=a.length,g=0,h=0,i=0,j=!0;f>h;){var g=a.indexOf("{{",h),k=a.indexOf("[[",h),l=!1,m="}}";if(k>=0&&(0>g||g>k)&&(g=k,l=!0,m="]]"),i=0>g?-1:a.indexOf(m,g+2),0>i){if(!e)return;e.push(a.slice(h));break}e=e||[],e.push(a.slice(h,g));var n=a.slice(g+2,i).trim();e.push(l),j=j&&l;var o=d&&d(n,b,c);e.push(null==o?Path.get(n):null),e.push(o),h=i+2}return h===f&&e.push(""),e.hasOnePath=5===e.length,e.isSimplePath=e.hasOnePath&&""==e[0]&&""==e[4],e.onlyOneTime=j,e.combinator=function(a){for(var b=e[0],c=1;c<e.length;c+=4){var d=e.hasOnePath?a:a[(c-1)/4];void 0!==d&&(b+=d),b+=e[c+3]}return b},e}}function t(a,b,c,d){if(b.hasOnePath){var e=b[3],f=e?e(d,c,!0):b[2].getValueFrom(d);return b.isSimplePath?f:b.combinator(f)}for(var g=[],h=1;h<b.length;h+=4){var e=b[h+2];g[(h-1)/4]=e?e(d,c):b[h+1].getValueFrom(d)}return b.combinator(g)}function u(a,b,c,d){var e=b[3],f=e?e(d,c,!1):new PathObserver(d,b[2]);return b.isSimplePath?f:new ObserverTransform(f,b.combinator)}function v(a,b,c,d){if(b.onlyOneTime)return t(a,b,c,d);if(b.hasOnePath)return u(a,b,c,d);for(var e=new CompoundObserver,f=1;f<b.length;f+=4){var g=b[f],h=b[f+2];if(h){var i=h(d,c,g);g?e.addPath(i):e.addObserver(i)}else{var j=b[f+1];g?e.addPath(j.getValueFrom(d)):e.addPath(d,j)}}return new ObserverTransform(e,b.combinator)}function w(a,b,c,d){for(var e=0;e<b.length;e+=2){var f=b[e],g=b[e+1],h=v(f,g,a,c),i=a.bind(f,h,g.onlyOneTime);i&&d&&d.push(i)}if(a.bindFinished(),b.isTemplate){a.model_=c;var j=a.processBindingDirectives_(b);d&&j&&d.push(j)}}function x(a,b,c){var d=a.getAttribute(b);return s(""==d?"{{}}":d,b,a,c)}function y(a,c){b(a);for(var d=[],e=0;e<a.attributes.length;e++){for(var f=a.attributes[e],g=f.name,i=f.value;"_"===g[0];)g=g.substring(1);if(!h(a)||g!==J&&g!==H&&g!==I){var j=s(i,g,a,c);j&&d.push(g,j)}}return h(a)&&(d.isTemplate=!0,d.if=x(a,J,c),d.bind=x(a,H,c),d.repeat=x(a,I,c),!d.if||d.bind||d.repeat||(d.bind=s("{{}}",H,a,c))),d}function z(a,b){if(a.nodeType===Node.ELEMENT_NODE)return y(a,b);if(a.nodeType===Node.TEXT_NODE){var c=s(a.data,"textContent",a,b);if(c)return["textContent",c]}return[]}function A(a,b,c,d,e,f,g){for(var h=b.appendChild(c.importNode(a,!1)),i=0,j=a.firstChild;j;j=j.nextSibling)A(j,h,c,d.children[i++],e,f,g);return d.isTemplate&&(HTMLTemplateElement.decorate(h,a),f&&h.setDelegate_(f)),w(h,d,e,g),h}function B(a,b){var c=z(a,b);c.children={};for(var d=0,e=a.firstChild;e;e=e.nextSibling)c.children[d++]=B(e,b);return c}function C(a){var b=a.id_;return b||(b=a.id_=S++),b}function D(a,b){var c=C(a);if(b){var d=b.bindingMaps[c];return d||(d=b.bindingMaps[c]=B(a,b.prepareBinding)||[]),d}var d=a.bindingMap_;return d||(d=a.bindingMap_=B(a,void 0)||[]),d}function E(a){this.closed=!1,this.templateElement_=a,this.instances=[],this.deps=void 0,this.iteratedValue=[],this.presentValue=void 0,this.arrayObserver=void 0}var F,G=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.Map&&"function"==typeof a.Map.prototype.forEach?F=a.Map:(F=function(){this.keys=[],this.values=[]},F.prototype={set:function(a,b){var c=this.keys.indexOf(a);0>c?(this.keys.push(a),this.values.push(b)):this.values[c]=b},get:function(a){var b=this.keys.indexOf(a);if(!(0>b))return this.values[b]},"delete":function(a){var b=this.keys.indexOf(a);return 0>b?!1:(this.keys.splice(b,1),this.values.splice(b,1),!0)},forEach:function(a,b){for(var c=0;c<this.keys.length;c++)a.call(b||this,this.values[c],this.keys[c],this)}});"function"!=typeof document.contains&&(Document.prototype.contains=function(a){return a===this||a.parentNode===this?!0:this.documentElement.contains(a)});var H="bind",I="repeat",J="if",K={template:!0,repeat:!0,bind:!0,ref:!0},L={THEAD:!0,TBODY:!0,TFOOT:!0,TH:!0,TR:!0,TD:!0,COLGROUP:!0,COL:!0,CAPTION:!0,OPTION:!0,OPTGROUP:!0},M="undefined"!=typeof HTMLTemplateElement;M&&!function(){var a=document.createElement("template"),b=a.content.ownerDocument,c=b.appendChild(b.createElement("html")),d=c.appendChild(b.createElement("head")),e=b.createElement("base");e.href=document.baseURI,d.appendChild(e)}();var N="template, "+Object.keys(L).map(function(a){return a.toLowerCase()+"[template]"}).join(", ");document.addEventListener("DOMContentLoaded",function(){j(document),Platform.performMicrotaskCheckpoint()},!1),M||(a.HTMLTemplateElement=function(){throw TypeError("Illegal constructor")});var O,P="__proto__"in{};"function"==typeof MutationObserver&&(O=new MutationObserver(function(a){for(var b=0;b<a.length;b++)a[b].target.refChanged_()})),HTMLTemplateElement.decorate=function(a,c){if(a.templateIsDecorated_)return!1;var d=a;d.templateIsDecorated_=!0;var h=f(d)&&M,i=h,k=!h,m=!1;if(h||(g(d)?(b(!c),d=n(a),d.templateIsDecorated_=!0,h=M,m=!0):e(d)&&(d=o(a),d.templateIsDecorated_=!0,h=M)),!h){q(d);var r=l(d);d.content_=r.createDocumentFragment()}return c?d.instanceRef_=c:k?p(d,a,m):i&&j(d.content),!0},HTMLTemplateElement.bootstrap=j;var Q=a.HTMLUnknownElement||HTMLElement,R={get:function(){return this.content_},enumerable:!0,configurable:!0};M||(HTMLTemplateElement.prototype=Object.create(Q.prototype),Object.defineProperty(HTMLTemplateElement.prototype,"content",R)),k(HTMLTemplateElement.prototype,{bind:function(a,b,c){if("ref"!=a)return Element.prototype.bind.call(this,a,b,c);var d=this,e=c?b:b.open(function(a){d.setAttribute("ref",a),d.refChanged_()});return this.setAttribute("ref",e),this.refChanged_(),c?void 0:(this.bindings_?this.bindings_.ref=b:this.bindings_={ref:b},b)},processBindingDirectives_:function(a){return this.iterator_&&this.iterator_.closeDeps(),a.if||a.bind||a.repeat?(this.iterator_||(this.iterator_=new E(this)),this.iterator_.updateDependencies(a,this.model_),O&&O.observe(this,{attributes:!0,attributeFilter:["ref"]}),this.iterator_):void(this.iterator_&&(this.iterator_.close(),this.iterator_=void 0))},createInstance:function(a,b,c){b?c=this.newDelegate_(b):c||(c=this.delegate_),this.refContent_||(this.refContent_=this.ref_.content);var d=this.refContent_;if(null===d.firstChild)return T;var e=D(d,c),f=m(this),g=f.createDocumentFragment();g.templateCreator_=this,g.protoContent_=d,g.bindings_=[],g.terminator_=null;for(var h=g.templateInstance_={firstNode:null,lastNode:null,model:a},i=0,j=!1,k=d.firstChild;k;k=k.nextSibling){null===k.nextSibling&&(j=!0);var l=A(k,g,f,e.children[i++],a,c,g.bindings_);l.templateInstance_=h,j&&(g.terminator_=l)}return h.firstNode=g.firstChild,h.lastNode=g.lastChild,g.templateCreator_=void 0,g.protoContent_=void 0,g},get model(){return this.model_},set model(a){this.model_=a,r(this)},get bindingDelegate(){return this.delegate_&&this.delegate_.raw},refChanged_:function(){this.iterator_&&this.refContent_!==this.ref_.content&&(this.refContent_=void 0,this.iterator_.valueChanged(),this.iterator_.updateIteratedValue())},clear:function(){this.model_=void 0,this.delegate_=void 0,this.bindings_&&this.bindings_.ref&&this.bindings_.ref.close(),this.refContent_=void 0,this.iterator_&&(this.iterator_.valueChanged(),this.iterator_.close(),this.iterator_=void 0)},setDelegate_:function(a){this.delegate_=a,this.bindingMap_=void 0,this.iterator_&&(this.iterator_.instancePositionChangedFn_=void 0,this.iterator_.instanceModelFn_=void 0)},newDelegate_:function(a){function b(b){var c=a&&a[b];if("function"==typeof c)return function(){return c.apply(a,arguments)}}if(a)return{bindingMaps:{},raw:a,prepareBinding:b("prepareBinding"),prepareInstanceModel:b("prepareInstanceModel"),prepareInstancePositionChanged:b("prepareInstancePositionChanged")}},set bindingDelegate(a){if(this.delegate_)throw Error("Template must be cleared before a new bindingDelegate can be assigned");this.setDelegate_(this.newDelegate_(a))},get ref_(){var a=d(this,this.getAttribute("ref"));if(a||(a=this.instanceRef_),!a)return this;var b=a.ref_;return b?b:a}});var S=1;Object.defineProperty(Node.prototype,"templateInstance",{get:function(){var a=this.templateInstance_;return a?a:this.parentNode?this.parentNode.templateInstance:void 0}});var T=document.createDocumentFragment();T.bindings_=[],T.terminator_=null,E.prototype={closeDeps:function(){var a=this.deps;a&&(a.ifOneTime===!1&&a.ifValue.close(),a.oneTime===!1&&a.value.close())},updateDependencies:function(a,b){this.closeDeps();var c=this.deps={},d=this.templateElement_;if(a.if){if(c.hasIf=!0,c.ifOneTime=a.if.onlyOneTime,c.ifValue=v(J,a.if,d,b),c.ifOneTime&&!c.ifValue)return void this.updateIteratedValue();c.ifOneTime||c.ifValue.open(this.updateIteratedValue,this)}a.repeat?(c.repeat=!0,c.oneTime=a.repeat.onlyOneTime,c.value=v(I,a.repeat,d,b)):(c.repeat=!1,c.oneTime=a.bind.onlyOneTime,c.value=v(H,a.bind,d,b)),c.oneTime||c.value.open(this.updateIteratedValue,this),this.updateIteratedValue()},updateIteratedValue:function(){if(this.deps.hasIf){var a=this.deps.ifValue;if(this.deps.ifOneTime||(a=a.discardChanges()),!a)return void this.valueChanged()}var b=this.deps.value;this.deps.oneTime||(b=b.discardChanges()),this.deps.repeat||(b=[b]);var c=this.deps.repeat&&!this.deps.oneTime&&Array.isArray(b);this.valueChanged(b,c)},valueChanged:function(a,b){Array.isArray(a)||(a=[]),a!==this.iteratedValue&&(this.unobserve(),this.presentValue=a,b&&(this.arrayObserver=new ArrayObserver(this.presentValue),this.arrayObserver.open(this.handleSplices,this)),this.handleSplices(ArrayObserver.calculateSplices(this.presentValue,this.iteratedValue)))},getLastInstanceNode:function(a){if(-1==a)return this.templateElement_;var b=this.instances[a],c=b.terminator_;if(!c)return this.getLastInstanceNode(a-1);if(c.nodeType!==Node.ELEMENT_NODE||this.templateElement_===c)return c;var d=c.iterator_;return d?d.getLastTemplateNode():c},getLastTemplateNode:function(){return this.getLastInstanceNode(this.instances.length-1)},insertInstanceAt:function(a,b){var c=this.getLastInstanceNode(a-1),d=this.templateElement_.parentNode;this.instances.splice(a,0,b),d.insertBefore(b,c.nextSibling)},extractInstanceAt:function(a){for(var b=this.getLastInstanceNode(a-1),c=this.getLastInstanceNode(a),d=this.templateElement_.parentNode,e=this.instances.splice(a,1)[0];c!==b;){var f=b.nextSibling;f==c&&(c=b),e.appendChild(d.removeChild(f))}return e},getDelegateFn:function(a){return a=a&&a(this.templateElement_),"function"==typeof a?a:null},handleSplices:function(a){if(!this.closed&&a.length){var b=this.templateElement_;if(!b.parentNode)return void this.close();ArrayObserver.applySplices(this.iteratedValue,this.presentValue,a);var c=b.delegate_;void 0===this.instanceModelFn_&&(this.instanceModelFn_=this.getDelegateFn(c&&c.prepareInstanceModel)),void 0===this.instancePositionChangedFn_&&(this.instancePositionChangedFn_=this.getDelegateFn(c&&c.prepareInstancePositionChanged));for(var d=new F,e=0,f=0;f<a.length;f++){for(var g=a[f],h=g.removed,i=0;i<h.length;i++){var j=h[i],k=this.extractInstanceAt(g.index+e);k!==T&&d.set(j,k)}e-=g.addedCount}for(var f=0;f<a.length;f++)for(var g=a[f],l=g.index;l<g.index+g.addedCount;l++){var j=this.iteratedValue[l],k=d.get(j);k?d.delete(j):(this.instanceModelFn_&&(j=this.instanceModelFn_(j)),k=void 0===j?T:b.createInstance(j,void 0,c)),this.insertInstanceAt(l,k)}d.forEach(function(a){this.closeInstanceBindings(a)},this),this.instancePositionChangedFn_&&this.reportInstancesMoved(a)}},reportInstanceMoved:function(a){var b=this.instances[a];b!==T&&this.instancePositionChangedFn_(b.templateInstance_,a)},reportInstancesMoved:function(a){for(var b=0,c=0,d=0;d<a.length;d++){var e=a[d];if(0!=c)for(;b<e.index;)this.reportInstanceMoved(b),b++;else b=e.index;for(;b<e.index+e.addedCount;)this.reportInstanceMoved(b),b++;c+=e.addedCount-e.removed.length}if(0!=c)for(var f=this.instances.length;f>b;)this.reportInstanceMoved(b),b++},closeInstanceBindings:function(a){for(var b=a.bindings_,c=0;c<b.length;c++)b[c].close()},unobserve:function(){this.arrayObserver&&(this.arrayObserver.close(),this.arrayObserver=void 0)},close:function(){if(!this.closed){this.unobserve();for(var a=0;a<this.instances.length;a++)this.closeInstanceBindings(this.instances[a]);this.instances.length=0,this.closeDeps(),this.templateElement_.iterator_=void 0,this.closed=!0}}},HTMLTemplateElement.forAllTemplatesFrom_=i}(this),function(a){function b(){e||(e=!0,a.endOfMicrotask(function(){e=!1,logFlags.data&&console.group("Platform.flush()"),a.performMicrotaskCheckpoint(),logFlags.data&&console.groupEnd()}))}var c=document.createElement("style");c.textContent="template {display: none !important;} /* injected by platform.js */";var d=document.querySelector("head");d.insertBefore(c,d.firstChild);var e;if(Observer.hasObjectObserve)b=function(){};else{var f=125;window.addEventListener("WebComponentsReady",function(){b(),a.flushPoll=setInterval(b,f)})}if(window.CustomElements&&!CustomElements.useNative){var g=Document.prototype.importNode;Document.prototype.importNode=function(a,b){var c=g.call(this,a,b);return CustomElements.upgradeAll(c),c}}a.flush=b}(window.Platform);
//# sourceMappingURL=platform.js.map
;
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.3.1
window.PolymerGestures={},function(a){var b={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;){if(d=e.elementFromPoint(b,c)){var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}e=this.olderShadow(e)}return f}},owner:function(a){if(!a)return document;for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!=Node.DOCUMENT_NODE&&b.nodeType!=Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)},LCA:function(a,b){if(a===b)return a;if(a&&!b)return a;if(b&&!a)return b;if(!b&&!a)return document;if(a.contains&&a.contains(b))return a;if(b.contains&&b.contains(a))return b;var c=this.depth(a),d=this.depth(b),e=c-d;for(e>0?a=this.walk(a,e):b=this.walk(b,-e);a&&b&&a!==b;)a=this.walk(a,1),b=this.walk(b,1);return a},walk:function(a,b){for(var c=0;a&&b>c;c++)a=a.parentNode||a.host;return a},depth:function(a){for(var b=0;a;)b++,a=a.parentNode||a.host;return b},deepContains:function(a,b){var c=this.LCA(a,b);return c===a},insideNode:function(a,b,c){var d=a.getBoundingClientRect();return d.left<=b&&b<=d.right&&d.top<=c&&c<=d.bottom}};a.targetFinding=b,a.findTarget=b.findTarget.bind(b),a.deepContains=b.deepContains.bind(b),a.insideNode=b.insideNode}(window.PolymerGestures),function(){function a(a){return"body /deep/ "+b(a)}function b(a){return'[touch-action="'+a+'"]'}function c(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+";}"}var d=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],e="",f=(document.head,"string"==typeof document.head.style.touchAction),g=!window.ShadowDOMPolyfill&&document.head.createShadowRoot;if(f){d.forEach(function(d){String(d)===d?(e+=b(d)+c(d)+"\n",g&&(e+=a(d)+c(d)+"\n")):(e+=d.selectors.map(b)+c(d.rule)+"\n",g&&(e+=d.selectors.map(a)+c(d.rule)+"\n"))});var h=document.createElement("style");h.textContent=e,document.head.appendChild(h)}}(),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],d=function(){return function(){}},e={preventTap:d,makeBaseEvent:function(a,b){var c=document.createEvent("Event");return c.initEvent(a,b.bubbles||!1,b.cancelable||!1),c.preventTap=e.preventTap(c),c},makeGestureEvent:function(a,b){b=b||Object.create(null);for(var c,d=this.makeBaseEvent(a,b),e=0,f=Object.keys(b);e<f.length;e++)c=f[e],d[c]=b[c];return d},makePointerEvent:function(a,d){d=d||Object.create(null);for(var e,f=this.makeBaseEvent(a,d),g=0;g<b.length;g++)e=b[g],f[e]=d[e]||c[g];f.buttons=d.buttons||0;var h=0;return h=d.pressure?d.pressure:f.buttons?.5:0,f.x=f.clientX,f.y=f.clientY,f.pointerId=d.pointerId||0,f.width=d.width||0,f.height=d.height||0,f.pressure=h,f.tiltX=d.tiltX||0,f.tiltY=d.tiltY||0,f.pointerType=d.pointerType||"",f.hwTimestamp=d.hwTimestamp||0,f.isPrimary=d.isPrimary||!1,f}};a.eventFactory=e}(window.PolymerGestures),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PolymerGestures),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp","preventTap","tapPrevented"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0,function(){},!1],d="undefined"!=typeof SVGElementInstance,e=window.ShadowDOMPolyfill&&ShadowDOMPolyfill.wrapIfNeeded||function(a){return a},f=a.eventFactory,g={pointermap:new a.PointerMap,eventMap:Object.create(null),eventSources:Object.create(null),eventSourceList:[],gestures:[],gestureQueue:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},registerGesture:function(a,b){this.gestures.push(b)},register:function(a){if(!window.ShadowDOMPolyfill||a===document)for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},down:function(a){this.fireEvent("down",a)},move:function(a){a.type="move",this.fillGestureQueue(a)},up:function(a){this.fireEvent("up",a)},cancel:function(a){a.tapPrevented=!0,this.fireEvent("up",a)},eventHandler:function(a){if(!a._handledByPG){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPG=!0}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:function(a,b){window.ShadowDOMPolyfill?a.addEventListener_(b,this.boundHandler):a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){window.ShadowDOMPolyfill?a.removeEventListener_(b,this.boundHandler):a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){var c=f.makePointerEvent(a,b);return c.preventDefault=b.preventDefault,c.tapPrevented=b.tapPrevented,c._target=c._target||b.target,c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var f,g=Object.create(null),h=0;h<b.length;h++)f=b[h],g[f]=a[f]||c[h],("target"===f||"relatedTarget"===f)&&(d&&g[f]instanceof SVGElementInstance&&(g[f]=g[f].correspondingUseElement),g[f]=e(g[f]));return g.preventDefault=a.preventDefault,g},dispatchEvent:function(a){var b=a._target;if(b){b.dispatchEvent(a);var c=this.cloneEvent(a);c.target=b,this.fillGestureQueue(c)}},gestureTrigger:function(){for(var a,b=0;b<this.gestureQueue.length;b++){a=this.gestureQueue[b];for(var c,d=0;d<this.gestures.length;d++)c=this.gestures[d],c.events.indexOf(a.type)>=0&&c[a.type].call(c,a)}this.gestureQueue.length=0},fillGestureQueue:function(a){this.gestureQueue.length||requestAnimationFrame(this.boundGestureTrigger),this.gestureQueue.push(a)}};g.boundHandler=g.eventHandler.bind(g),g.boundGestureTrigger=g.gestureTrigger.bind(g),a.dispatcher=g,a.register=g.register.bind(g),a.unregister=g.unregister.bind(g)}(window.PolymerGestures),function(a){function b(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),g&&(this.observer=new g(this.mutationWatcher.bind(this)))}var c=Array.prototype.forEach.call.bind(Array.prototype.forEach),d=Array.prototype.map.call.bind(Array.prototype.map),e=Array.prototype.slice.call.bind(Array.prototype.slice),f=Array.prototype.filter.call.bind(Array.prototype.filter),g=window.MutationObserver||window.WebKitMutationObserver,h="[touch-action]",i={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};b.prototype={watchSubtree:function(b){a.targetFinding.canTarget(b)&&this.observer.observe(b,i)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){c(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(h):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(e(b))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){var b=d(a,this.findElements,this);return b.push(f(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}},g||(b.prototype.watchSubtree=function(){console.warn("PolymerGestures: MutationObservers not found, touch-action will not be dynamically detected")}),a.Installer=b}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=25,e=[0,1,4,2],f=!1;try{f=1===new MouseEvent("test",{buttons:1}).buttons}catch(g){}var h={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,e=a.clientX,f=a.clientY,g=0,h=c.length;h>g&&(b=c[g]);g++){var i=Math.abs(e-b.x),j=Math.abs(f-b.y);if(d>=i&&d>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a);return c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,f||(c.buttons=e[c.which]||0),c},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.has(this.POINTER_ID);d&&this.mouseup(a);var e=this.prepareEvent(a);c.set(this.POINTER_ID,e.target),b.down(e)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=this.prepareEvent(a);d.target=c.get(this.POINTER_ID),b.move(d)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=this.prepareEvent(a);d.relatedTarget=d.target,d.target=c.get(this.POINTER_ID),b.up(d),this.cleanupMouse()}},cleanupMouse:function(){c["delete"](this.POINTER_ID)}};a.mouseEvents=h}(window.PolymerGestures),function(a){var b,c=a.dispatcher,d=a.targetFinding.allShadows.bind(a.targetFinding),e=c.pointermap,f=(Array.prototype.map.call.bind(Array.prototype.map),2500),g=200,h="touch-action",i="string"==typeof document.head.style.touchAction,j={events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){i?c.listen(a,this.events):b.enableOnSubtree(a)},unregister:function(a){i&&c.unlisten(a,this.events)},elementAdded:function(a){var b=a.getAttribute(h),e=this.touchActionToScrollType(b);e&&(a._scrollType=e,c.listen(a,this.events),d(a).forEach(function(a){a._scrollType=e,c.listen(a,this.events)},this))},elementRemoved:function(a){a._scrollType=void 0,c.unlisten(a,this.events),d(a).forEach(function(a){a._scrollType=void 0,c.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(h),e=this.touchActionToScrollType(c),f=this.touchActionToScrollType(b);e&&f?(a._scrollType=e,d(a).forEach(function(a){a._scrollType=e},this)):f?this.elementRemoved(a):e&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===e.pointers()||1===e.pointers()&&e.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,g)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return("touchstart"===a||"touchmove"===a)&&(b=1),b},findTarget:function(b,c){return"touchstart"===this.currentTouchEvent.type?a.findTarget(b):e.get(c)},touchToPointer:function(a){var b=this.currentTouchEvent,d=c.cloneEvent(a),e=d.pointerId=a.identifier+2;d.target=this.findTarget(a,e),d.bubbles=!0,d.cancelable=!0,d.detail=this.clickCount,d.buttons=this.typeToButtons(b.type),d.width=a.webkitRadiusX||a.radiusX||0,d.height=a.webkitRadiusY||a.radiusY||0,d.pressure=a.webkitForce||a.force||.5,d.isPrimary=this.isPrimaryTouch(a),d.pointerType=this.POINTER_TYPE;var f=this;return d.preventDefault=function(){f.scrolling=!1,f.firstXY=null,b.preventDefault()},d},processTouches:function(a,b){var c=a.changedTouches;this.currentTouchEvent=a;for(var d,e=0;e<c.length;e++)d=c[e],b.call(this,this.touchToPointer(d))},shouldScroll:function(a){if(this.firstXY){var b,c=a.currentTarget._scrollType;if("none"===c)b=!1;else if("XY"===c)b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(e.pointers()>=b.length){var c=[];e.forEach(function(a,d){if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(e)}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.down))},down:function(a){e.set(a.pointerId,a.target);c.down(a)},touchmove:function(a){i?this.processTouches(a,this.move):this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.move)))},move:function(a){var b=e.get(a.pointerId);b&&c.move(a)},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.up)},up:function(b){this.scrolling||(b.relatedTarget=a.findTarget(b),c.up(b)),this.cleanUpPointer(b)},cancel:function(b){b.relatedTarget=a.findTarget(b),c.cancel(b),this.cleanUpPointer(b)},touchcancel:function(a){this.processTouches(a,this.cancel)},cleanUpPointer:function(a){e["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(b){var c=a.mouseEvents.lastTouches,d=b.changedTouches[0];if(this.isPrimaryTouch(d)){var e={x:d.clientX,y:d.clientY};c.push(e);var g=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,c,e);setTimeout(g,f)}}};i||(b=new a.Installer(j.elementAdded,j.elementRemoved,j.elementChanged,j)),a.touchEvents=j}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,e={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=a;return d&&(c=b.cloneEvent(a),c.pointerType=this.POINTER_TYPES[a.pointerType]),c},cleanup:function(a){c["delete"](a)},MSPointerDown:function(a){var d=this.prepareEvent(a);c.set(a.pointerId,d.target),b.down(d)},MSPointerMove:function(a){var d=this.prepareEvent(a);d.target=c.get(d.pointerId),b.move(d)},MSPointerUp:function(a){var d=this.prepareEvent(a);d.relatedTarget=d.target,d.target=c.get(d.pointerId),b.up(d),this.cleanup(a.pointerId)},MSPointerCancel:function(a){var d=this.prepareEvent(a);d.relatedTarget=d.target,d.target=c.get(d.pointerId),b.cancel(d),this.cleanup(a.pointerId)}};a.msEvents=e}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d={events:["pointerdown","pointermove","pointerup","pointercancel"],prepareEvent:function(a){return b.cloneEvent(a)},register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},cleanup:function(a){c["delete"](a)},pointerdown:function(a){var d=this.prepareEvent(a);c.set(d.pointerId,d.target),b.down(d)},pointermove:function(a){var d=this.prepareEvent(a);d.target=c.get(d.pointerId),b.move(d)},pointerup:function(a){var d=this.prepareEvent(a);d.relatedTarget=d.target,d.target=c.get(d.pointerId),b.up(d),this.cleanup(a.pointerId)},pointercancel:function(a){var d=this.prepareEvent(a);d.relatedTarget=d.target,d.target=c.get(d.pointerId),b.cancel(d),this.cleanup(a.pointerId)}};a.pointerEvents=d}(window.PolymerGestures),function(a){var b=a.dispatcher;window.PointerEvent?b.registerSource("pointer",a.pointerEvents):window.navigator.msPointerEnabled?b.registerSource("ms",a.msEvents):(b.registerSource("mouse",a.mouseEvents),void 0!==window.ontouchstart&&b.registerSource("touch",a.touchEvents)),b.register(document)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","move","up"],WIGGLE_THRESHOLD:4,clampDir:function(a){return a>0?1:-1},calcPositionDelta:function(a,b){var c=0,d=0;return a&&b&&(c=b.pageX-a.pageX,d=b.pageY-a.pageY),{x:c,y:d}},fireTrack:function(a,b,d){var e=d,f=this.calcPositionDelta(e.downEvent,b),g=this.calcPositionDelta(e.lastMoveEvent,b);g.x&&(e.xDirection=this.clampDir(g.x)),g.y&&(e.yDirection=this.clampDir(g.y));var h=c.makeGestureEvent(a,{bubbles:!0,cancelable:!0,dx:f.x,dy:f.y,ddx:g.x,ddy:g.y,x:b.x,y:b.y,clientX:b.clientX,clientY:b.clientY,pageX:b.pageX,pageY:b.pageY,screenX:b.screenX,screenY:b.screenY,xDirection:e.xDirection,yDirection:e.yDirection,trackInfo:e.trackInfo,relatedTarget:b.relatedTarget,pointerType:b.pointerType,pointerId:b.pointerId});e.downTarget.dispatchEvent(h)},down:function(a){if(a.isPrimary&&("mouse"===a.pointerType?1===a.buttons:!0)){var b={downEvent:a,downTarget:a.target,trackInfo:{},lastMoveEvent:null,xDirection:0,yDirection:0,tracking:!1};d.set(a.pointerId,b)}},move:function(a){var b=d.get(a.pointerId);if(b){if(b.tracking)this.fireTrack("track",a,b);else{var c=this.calcPositionDelta(b.downEvent,a),e=c.x*c.x+c.y*c.y;e>this.WIGGLE_THRESHOLD&&(b.tracking=!0,this.fireTrack("trackstart",b.downEvent,b),this.fireTrack("track",a,b))}b.lastMoveEvent=a}},up:function(a){var b=d.get(a.pointerId);b&&(b.tracking&&this.fireTrack("trackend",a,b),d.delete(a.pointerId))}};b.registerGesture("track",e)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d={HOLD_DELAY:200,WIGGLE_THRESHOLD:16,events:["down","move","up"],heldPointer:null,holdJob:null,pulse:function(){var a=Date.now()-this.heldPointer.timeStamp,b=this.held?"holdpulse":"hold";this.fireHold(b,a),this.held=!0},cancel:function(){clearInterval(this.holdJob),this.held&&this.fireHold("release"),this.held=!1,this.heldPointer=null,this.target=null,this.holdJob=null},down:function(a){a.isPrimary&&!this.heldPointer&&(this.heldPointer=a,this.target=a.target,this.holdJob=setInterval(this.pulse.bind(this),this.HOLD_DELAY))},up:function(a){this.heldPointer&&this.heldPointer.pointerId===a.pointerId&&this.cancel()},move:function(a){if(this.heldPointer&&this.heldPointer.pointerId===a.pointerId){var b=a.clientX-this.heldPointer.clientX,c=a.clientY-this.heldPointer.clientY;b*b+c*c>this.WIGGLE_THRESHOLD&&this.cancel()}},fireHold:function(a,b){var d={bubbles:!0,cancelable:!0,pointerType:this.heldPointer.pointerType,pointerId:this.heldPointer.pointerId,x:this.heldPointer.clientX,y:this.heldPointer.clientY};b&&(d.holdTime=b);var e=c.makeGestureEvent(a,d);this.target.dispatchEvent(e)}};b.registerGesture("hold",d)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","up"],down:function(a){a.isPrimary&&!a.tapPrevented&&d.set(a.pointerId,{target:a.target,buttons:a.buttons,x:a.clientX,y:a.clientY})},shouldTap:function(a,b){return"mouse"===a.pointerType?1===b.buttons:!a.tapPrevented},up:function(b){var e=d.get(b.pointerId);if(e&&this.shouldTap(b,e)){var f=a.targetFinding.LCA(e.target,b.relatedTarget);if(f){var g=c.makeGestureEvent("tap",{bubbles:!0,cancelable:!0,x:b.clientX,y:b.clientY,detail:b.detail,pointerType:b.pointerType,pointerId:b.pointerId,altKey:b.altKey,ctrlKey:b.ctrlKey,metaKey:b.metaKey,shiftKey:b.shiftKey});f.dispatchEvent(g)}}d.delete(b.pointerId)}};c.preventTap=function(a){return function(){a.tapPrevented=!0,d.delete(a.pointerId)}},b.registerGesture("tap",e)}(window.PolymerGestures),function(a){"use strict";function b(a,b){if(!a)throw new Error("ASSERT: "+b)}function c(a){return a>=48&&57>=a}function d(a){return 32===a||9===a||11===a||12===a||160===a||a>=5760&&"\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(String.fromCharCode(a))>0}function e(a){return 10===a||13===a||8232===a||8233===a}function f(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a}function g(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a||a>=48&&57>=a}function h(a){return"this"===a}function i(){for(;Y>X&&d(W.charCodeAt(X));)++X}function j(){var a,b;for(a=X++;Y>X&&(b=W.charCodeAt(X),g(b));)++X;return W.slice(a,X)}function k(){var a,b,c;return a=X,b=j(),c=1===b.length?S.Identifier:h(b)?S.Keyword:"null"===b?S.NullLiteral:"true"===b||"false"===b?S.BooleanLiteral:S.Identifier,{type:c,value:b,range:[a,X]}}function l(){var a,b,c=X,d=W.charCodeAt(X),e=W[X];switch(d){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:return++X,{type:S.Punctuator,value:String.fromCharCode(d),range:[c,X]};default:if(a=W.charCodeAt(X+1),61===a)switch(d){case 37:case 38:case 42:case 43:case 45:case 47:case 60:case 62:case 124:return X+=2,{type:S.Punctuator,value:String.fromCharCode(d)+String.fromCharCode(a),range:[c,X]};case 33:case 61:return X+=2,61===W.charCodeAt(X)&&++X,{type:S.Punctuator,value:W.slice(c,X),range:[c,X]}}}return b=W[X+1],e===b&&"&|".indexOf(e)>=0?(X+=2,{type:S.Punctuator,value:e+b,range:[c,X]}):"<>=!+-*%&|^/".indexOf(e)>=0?(++X,{type:S.Punctuator,value:e,range:[c,X]}):void s({},V.UnexpectedToken,"ILLEGAL")}function m(){var a,d,e;if(e=W[X],b(c(e.charCodeAt(0))||"."===e,"Numeric literal must start with a decimal digit or a decimal point"),d=X,a="","."!==e){for(a=W[X++],e=W[X],"0"===a&&e&&c(e.charCodeAt(0))&&s({},V.UnexpectedToken,"ILLEGAL");c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("."===e){for(a+=W[X++];c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("e"===e||"E"===e)if(a+=W[X++],e=W[X],("+"===e||"-"===e)&&(a+=W[X++]),c(W.charCodeAt(X)))for(;c(W.charCodeAt(X));)a+=W[X++];else s({},V.UnexpectedToken,"ILLEGAL");return f(W.charCodeAt(X))&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.NumericLiteral,value:parseFloat(a),range:[d,X]}}function n(){var a,c,d,f="",g=!1;for(a=W[X],b("'"===a||'"'===a,"String literal must starts with a quote"),c=X,++X;Y>X;){if(d=W[X++],d===a){a="";break}if("\\"===d)if(d=W[X++],d&&e(d.charCodeAt(0)))"\r"===d&&"\n"===W[X]&&++X;else switch(d){case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="	";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="";break;default:f+=d}else{if(e(d.charCodeAt(0)))break;f+=d}}return""!==a&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.StringLiteral,value:f,octal:g,range:[c,X]}}function o(a){return a.type===S.Identifier||a.type===S.Keyword||a.type===S.BooleanLiteral||a.type===S.NullLiteral}function p(){var a;return i(),X>=Y?{type:S.EOF,range:[X,X]}:(a=W.charCodeAt(X),40===a||41===a||58===a?l():39===a||34===a?n():f(a)?k():46===a?c(W.charCodeAt(X+1))?m():l():c(a)?m():l())}function q(){var a;return a=$,X=a.range[1],$=p(),X=a.range[1],a}function r(){var a;a=X,$=p(),X=a}function s(a,c){var d,e=Array.prototype.slice.call(arguments,2),f=c.replace(/%(\d)/g,function(a,c){return b(c<e.length,"Message reference must be in range"),e[c]});throw d=new Error(f),d.index=X,d.description=f,d}function t(a){s(a,V.UnexpectedToken,a.value)}function u(a){var b=q();(b.type!==S.Punctuator||b.value!==a)&&t(b)}function v(a){return $.type===S.Punctuator&&$.value===a}function w(a){return $.type===S.Keyword&&$.value===a}function x(){var a=[];for(u("[");!v("]");)v(",")?(q(),a.push(null)):(a.push(bb()),v("]")||u(","));return u("]"),Z.createArrayExpression(a)}function y(){var a;return i(),a=q(),a.type===S.StringLiteral||a.type===S.NumericLiteral?Z.createLiteral(a):Z.createIdentifier(a.value)}function z(){var a,b;return a=$,i(),(a.type===S.EOF||a.type===S.Punctuator)&&t(a),b=y(),u(":"),Z.createProperty("init",b,bb())}function A(){var a=[];for(u("{");!v("}");)a.push(z()),v("}")||u(",");return u("}"),Z.createObjectExpression(a)}function B(){var a;return u("("),a=bb(),u(")"),a}function C(){var a,b,c;return v("(")?B():(a=$.type,a===S.Identifier?c=Z.createIdentifier(q().value):a===S.StringLiteral||a===S.NumericLiteral?c=Z.createLiteral(q()):a===S.Keyword?w("this")&&(q(),c=Z.createThisExpression()):a===S.BooleanLiteral?(b=q(),b.value="true"===b.value,c=Z.createLiteral(b)):a===S.NullLiteral?(b=q(),b.value=null,c=Z.createLiteral(b)):v("[")?c=x():v("{")&&(c=A()),c?c:void t(q()))}function D(){var a=[];if(u("("),!v(")"))for(;Y>X&&(a.push(bb()),!v(")"));)u(",");return u(")"),a}function E(){var a;return a=q(),o(a)||t(a),Z.createIdentifier(a.value)}function F(){return u("."),E()}function G(){var a;return u("["),a=bb(),u("]"),a}function H(){var a,b;for(a=C();v(".")||v("[");)v("[")?(b=G(),a=Z.createMemberExpression("[",a,b)):(b=F(),a=Z.createMemberExpression(".",a,b));return a}function I(){var a,b;return $.type!==S.Punctuator&&$.type!==S.Keyword?b=ab():v("+")||v("-")||v("!")?(a=q(),b=I(),b=Z.createUnaryExpression(a.value,b)):w("delete")||w("void")||w("typeof")?s({},V.UnexpectedToken):b=ab(),b}function J(a){var b=0;if(a.type!==S.Punctuator&&a.type!==S.Keyword)return 0;switch(a.value){case"||":b=1;break;case"&&":b=2;break;case"==":case"!=":case"===":case"!==":b=6;break;case"<":case">":case"<=":case">=":case"instanceof":b=7;break;case"in":b=7;break;case"+":case"-":b=9;break;case"*":case"/":case"%":b=11}return b}function K(){var a,b,c,d,e,f,g,h;if(g=I(),b=$,c=J(b),0===c)return g;for(b.prec=c,q(),e=I(),d=[g,b,e];(c=J($))>0;){for(;d.length>2&&c<=d[d.length-2].prec;)e=d.pop(),f=d.pop().value,g=d.pop(),a=Z.createBinaryExpression(f,g,e),d.push(a);b=q(),b.prec=c,d.push(b),a=I(),d.push(a)}for(h=d.length-1,a=d[h];h>1;)a=Z.createBinaryExpression(d[h-1].value,d[h-2],a),h-=2;return a}function L(){var a,b,c;return a=K(),v("?")&&(q(),b=L(),u(":"),c=L(),a=Z.createConditionalExpression(a,b,c)),a}function M(){var a,b;return a=q(),a.type!==S.Identifier&&t(a),b=v("(")?D():[],Z.createFilter(a.value,b)}function N(){for(;v("|");)q(),M()}function O(){i(),r();var a=bb();a&&(","===$.value||"in"==$.value&&a.type===U.Identifier?Q(a):(N(),"as"===$.value?P(a):Z.createTopLevel(a))),$.type!==S.EOF&&t($)}function P(a){q();var b=q().value;Z.createAsExpression(a,b)}function Q(a){var b;","===$.value&&(q(),$.type!==S.Identifier&&t($),b=q().value),q();var c=bb();N(),Z.createInExpression(a.name,b,c)}function R(a,b){return Z=b,W=a,X=0,Y=W.length,$=null,_={labelSet:{}},O()}var S,T,U,V,W,X,Y,Z,$,_;S={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8},T={},T[S.BooleanLiteral]="Boolean",T[S.EOF]="<end>",T[S.Identifier]="Identifier",T[S.Keyword]="Keyword",T[S.NullLiteral]="Null",T[S.NumericLiteral]="Numeric",T[S.Punctuator]="Punctuator",T[S.StringLiteral]="String",U={ArrayExpression:"ArrayExpression",BinaryExpression:"BinaryExpression",CallExpression:"CallExpression",ConditionalExpression:"ConditionalExpression",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",Identifier:"Identifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ThisExpression:"ThisExpression",UnaryExpression:"UnaryExpression"},V={UnexpectedToken:"Unexpected token %0",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared"};var ab=H,bb=L;a.esprima={parse:R}}(this),function(a){"use strict";function b(a,b,d,e){var f;try{if(f=c(a),f.scopeIdent&&(d.nodeType!==Node.ELEMENT_NODE||"TEMPLATE"!==d.tagName||"bind"!==b&&"repeat"!==b))throw Error("as and in can only be used within <template bind/repeat>")}catch(g){return void console.error("Invalid expression syntax: "+a,g)}return function(a,b,c){var d=f.getBinding(a,e,c);return f.scopeIdent&&d&&(b.polymerExpressionScopeIdent_=f.scopeIdent,f.indexIdent&&(b.polymerExpressionIndexIdent_=f.indexIdent)),d}}function c(a){var b=q[a];if(!b){var c=new j;esprima.parse(a,c),b=new l(c),q[a]=b}return b}function d(a){this.value=a,this.valueFn_=void 0}function e(a){this.name=a,this.path=Path.get(a)}function f(a,b,c){this.computed="["==c,this.dynamicDeps="function"==typeof a||a.dynamicDeps||this.computed&&!(b instanceof d),this.simplePath=!this.dynamicDeps&&(b instanceof e||b instanceof d)&&(a instanceof f||a instanceof e),this.object=this.simplePath?a:i(a),this.property=this.computed?i(b):b}function g(a,b){this.name=a,this.args=[];for(var c=0;c<b.length;c++)this.args[c]=i(b[c])}function h(){throw Error("Not Implemented")}function i(a){return"function"==typeof a?a:a.valueFn()}function j(){this.expression=null,this.filters=[],this.deps={},this.currentPath=void 0,this.scopeIdent=void 0,this.indexIdent=void 0,this.dynamicDeps=!1}function k(a){this.value_=a}function l(a){if(this.scopeIdent=a.scopeIdent,this.indexIdent=a.indexIdent,!a.expression)throw Error("No expression found.");this.expression=a.expression,i(this.expression),this.filters=a.filters,this.dynamicDeps=a.dynamicDeps}function m(a){return String(a).replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function n(a,b){for(;a[t]&&!Object.prototype.hasOwnProperty.call(a,b);)a=a[t];return a}function o(a){switch(a){case"":return!1;case"false":case"null":case"true":return!0}return isNaN(Number(a))?!1:!0}function p(){}var q=Object.create(null);d.prototype={valueFn:function(){if(!this.valueFn_){var a=this.value;this.valueFn_=function(){return a}}return this.valueFn_}},e.prototype={valueFn:function(){if(!this.valueFn_){var a=(this.name,this.path);this.valueFn_=function(b,c){return c&&c.addPath(b,a),a.getValueFrom(b)}}return this.valueFn_},setValue:function(a,b){return 1==this.path.length,a=n(a,this.path[0]),this.path.setValueFrom(a,b)}},f.prototype={get fullPath(){if(!this.fullPath_){var a=this.object instanceof f?this.object.fullPath.slice():[this.object.name];a.push(this.property instanceof e?this.property.name:this.property.value),this.fullPath_=Path.get(a)}return this.fullPath_},valueFn:function(){if(!this.valueFn_){var a=this.object;if(this.simplePath){var b=this.fullPath;this.valueFn_=function(a,c){return c&&c.addPath(a,b),b.getValueFrom(a)}}else if(this.computed){var c=this.property;this.valueFn_=function(b,d){var e=a(b,d),f=c(b,d);return d&&d.addPath(e,[f]),e?e[f]:void 0}}else{var b=Path.get(this.property.name);this.valueFn_=function(c,d){var e=a(c,d);return d&&d.addPath(e,b),b.getValueFrom(e)}}}return this.valueFn_},setValue:function(a,b){if(this.simplePath)return this.fullPath.setValueFrom(a,b),b;var c=this.object(a),d=this.property instanceof e?this.property.name:this.property(a);return c[d]=b}},g.prototype={transform:function(a,b,c,d,e){var f=c[this.name],g=d;if(f)g=void 0;else if(f=g[this.name],!f)return void console.error("Cannot find filter: "+this.name);if(b?f=f.toModel:"function"==typeof f.toDOM&&(f=f.toDOM),"function"!=typeof f)return void console.error("No "+(b?"toModel":"toDOM")+" found on"+this.name);
for(var h=[a],j=0;j<this.args.length;j++)h[j+1]=i(this.args[j])(d,e);return f.apply(g,h)}};var r={"+":function(a){return+a},"-":function(a){return-a},"!":function(a){return!a}},s={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"<":function(a,b){return b>a},">":function(a,b){return a>b},"<=":function(a,b){return b>=a},">=":function(a,b){return a>=b},"==":function(a,b){return a==b},"!=":function(a,b){return a!=b},"===":function(a,b){return a===b},"!==":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b}};j.prototype={createUnaryExpression:function(a,b){if(!r[a])throw Error("Disallowed operator: "+a);return b=i(b),function(c,d){return r[a](b(c,d))}},createBinaryExpression:function(a,b,c){if(!s[a])throw Error("Disallowed operator: "+a);return b=i(b),c=i(c),function(d,e){return s[a](b(d,e),c(d,e))}},createConditionalExpression:function(a,b,c){return a=i(a),b=i(b),c=i(c),function(d,e){return a(d,e)?b(d,e):c(d,e)}},createIdentifier:function(a){var b=new e(a);return b.type="Identifier",b},createMemberExpression:function(a,b,c){var d=new f(b,c,a);return d.dynamicDeps&&(this.dynamicDeps=!0),d},createLiteral:function(a){return new d(a.value)},createArrayExpression:function(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return function(b,c){for(var d=[],e=0;e<a.length;e++)d.push(a[e](b,c));return d}},createProperty:function(a,b,c){return{key:b instanceof e?b.name:b.value,value:c}},createObjectExpression:function(a){for(var b=0;b<a.length;b++)a[b].value=i(a[b].value);return function(b,c){for(var d={},e=0;e<a.length;e++)d[a[e].key]=a[e].value(b,c);return d}},createFilter:function(a,b){this.filters.push(new g(a,b))},createAsExpression:function(a,b){this.expression=a,this.scopeIdent=b},createInExpression:function(a,b,c){this.expression=c,this.scopeIdent=a,this.indexIdent=b},createTopLevel:function(a){this.expression=a},createThisExpression:h},k.prototype={open:function(){return this.value_},discardChanges:function(){return this.value_},deliver:function(){},close:function(){}},l.prototype={getBinding:function(a,b,c){function d(){if(h)return h=!1,g;i.dynamicDeps&&f.startReset();var c=i.getValue(a,i.dynamicDeps?f:void 0,b);return i.dynamicDeps&&f.finishReset(),c}function e(c){return i.setValue(a,c,b),c}if(c)return this.getValue(a,void 0,b);var f=new CompoundObserver,g=this.getValue(a,f,b),h=!0,i=this;return new ObserverTransform(f,d,e,!0)},getValue:function(a,b,c){for(var d=i(this.expression)(a,b),e=0;e<this.filters.length;e++)d=this.filters[e].transform(d,!1,c,a,b);return d},setValue:function(a,b,c){for(var d=this.filters?this.filters.length:0;d-->0;)b=this.filters[d].transform(b,!0,c,a);return this.expression.setValue?this.expression.setValue(a,b):void 0}};var t="@"+Math.random().toString(36).slice(2);p.prototype={styleObject:function(a){var b=[];for(var c in a)b.push(m(c)+": "+a[c]);return b.join("; ")},tokenList:function(a){var b=[];for(var c in a)a[c]&&b.push(c);return b.join(" ")},prepareInstancePositionChanged:function(a){var b=a.polymerExpressionIndexIdent_;if(b)return function(a,c){a.model[b]=c}},prepareBinding:function(a,c,d){var e=Path.get(a);{if(o(a)||!e.valid)return b(a,c,d,this);if(1==e.length)return function(a,b,c){if(c)return e.getValueFrom(a);var d=n(a,e[0]);return new PathObserver(d,e)}}},prepareInstanceModel:function(a){var b=a.polymerExpressionScopeIdent_;if(b){var c=a.templateInstance?a.templateInstance.model:a.model,d=a.polymerExpressionIndexIdent_;return function(a){return u(c,a,b,d)}}}};var u="__proto__"in{}?function(a,b,c,d){var e={};return e[c]=b,e[d]=void 0,e[t]=a,e.__proto__=a,e}:function(a,b,c,d){var e=Object.create(a);return Object.defineProperty(e,c,{value:b,configurable:!0,writable:!0}),Object.defineProperty(e,d,{value:void 0,configurable:!0,writable:!0}),Object.defineProperty(e,t,{value:a,configurable:!0,writable:!0}),e};a.PolymerExpressions=p,a.exposeGetExpression&&(a.getExpression_=c)}(this),Polymer={version:"0.3.1"},"function"==typeof window.Polymer&&(Polymer={}),function(a){function b(a,b){return a&&b&&Object.getOwnPropertyNames(b).forEach(function(c){var d=Object.getOwnPropertyDescriptor(b,c);d&&(Object.defineProperty(a,c,d),"function"==typeof d.value&&(d.value.nom=c))}),a}a.extend=b}(Polymer),function(a){function b(a,b,d){return a?a.stop():a=new c(this),a.go(b,d),a}var c=function(a){this.context=a,this.boundComplete=this.complete.bind(this)};c.prototype={go:function(a,b){this.callback=a;var c;b?(c=setTimeout(this.boundComplete,b),this.handle=function(){clearTimeout(c)}):(c=requestAnimationFrame(this.boundComplete),this.handle=function(){cancelAnimationFrame(c)})},stop:function(){this.handle&&(this.handle(),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},a.job=b}(Polymer),function(){var a={};HTMLElement.register=function(b,c){a[b]=c},HTMLElement.getPrototypeForTag=function(b){var c=b?a[b]:HTMLElement.prototype;return c||Object.getPrototypeOf(document.createElement(b))};var b=Event.prototype.stopPropagation;Event.prototype.stopPropagation=function(){this.cancelBubble=!0,b.apply(this,arguments)}}(Polymer),function(a){function b(a){var e=b.caller,g=e.nom,h=e._super;h||(g||(g=e.nom=c.call(this,e)),g||console.warn("called super() on a method not installed declaratively (has no .nom property)"),h=d(e,g,f(this)));var i=h[g];return i?(i._super||d(i,g,h),i.apply(this,a||[])):void 0}function c(a){for(var b=this.__proto__;b&&b!==HTMLElement.prototype;){for(var c,d=Object.getOwnPropertyNames(b),e=0,f=d.length;f>e&&(c=d[e]);e++){var g=Object.getOwnPropertyDescriptor(b,c);if("function"==typeof g.value&&g.value===a)return c}b=b.__proto__}}function d(a,b,c){var d=e(c,b,a);return d[b]&&(d[b].nom=b),a._super=d}function e(a,b,c){for(;a;){if(a[b]!==c&&a[b])return a;a=f(a)}return Object}function f(a){return a.__proto__}a.super=b}(Polymer),function(a){function b(a,b){var d=typeof b;return b instanceof Date&&(d="date"),c[d](a,b)}var c={string:function(a){return a},date:function(a){return new Date(Date.parse(a)||Date.now())},"boolean":function(a){return""===a?!0:"false"===a?!1:!!a},number:function(a){var b=parseFloat(a);return 0===b&&(b=parseInt(a)),isNaN(b)?a:b},object:function(a,b){if(null===b)return a;try{return JSON.parse(a.replace(/'/g,'"'))}catch(c){return a}},"function":function(a,b){return b}};a.deserializeValue=b}(Polymer),function(a){var b=a.extend,c={};c.declaration={},c.instance={},c.publish=function(a,c){for(var d in a)b(c,a[d])},a.api=c}(Polymer),function(a){var b={async:function(a,b,c){Platform.flush(),b=b&&b.length?b:[b];var d=function(){(this[a]||a).apply(this,b)}.bind(this),e=c?setTimeout(d,c):requestAnimationFrame(d);return c?e:~e},cancelAsync:function(a){0>a?cancelAnimationFrame(~a):clearTimeout(a)},fire:function(a,b,c,d,e){var f=c||this,b=b||{},g=new CustomEvent(a,{bubbles:void 0!==d?d:!0,cancelable:void 0!==e?e:!0,detail:b});return f.dispatchEvent(g),g},asyncFire:function(){this.async("fire",arguments)},classFollows:function(a,b,c){b&&b.classList.remove(c),a&&a.classList.add(c)}},c=function(){},d={};b.asyncMethod=b.async,a.api.instance.utils=b,a.nop=c,a.nob=d}(Polymer),function(a){var b=window.logFlags||{},c="on-",d={EVENT_PREFIX:c,addHostListeners:function(){var a=this.eventDelegates;b.events&&Object.keys(a).length>0&&console.log("[%s] addHostListeners:",this.localName,a);for(var c in a){var d=a[c];this.addEventListener(c,this.element.getEventHandler(this,this,d))}},dispatchMethod:function(a,c,d){if(a){b.events&&console.group("[%s] dispatch [%s]",a.localName,c);var e="function"==typeof c?c:a[c];e&&e[d?"apply":"call"](a,d),b.events&&console.groupEnd(),Platform.flush()}}};a.api.instance.events=d}(Polymer),function(a){var b={copyInstanceAttributes:function(){var a=this._instanceAttributes;for(var b in a)this.hasAttribute(b)||this.setAttribute(b,a[b])},takeAttributes:function(){if(this._publishLC)for(var a,b=0,c=this.attributes,d=c.length;(a=c[b])&&d>b;b++)this.attributeToProperty(a.name,a.value)},attributeToProperty:function(b,c){var b=this.propertyForAttribute(b);if(b){if(c&&c.search(a.bindPattern)>=0)return;var d=this[b],c=this.deserializeValue(c,d);c!==d&&(this[b]=c)}},propertyForAttribute:function(a){var b=this._publishLC&&this._publishLC[a];return b},deserializeValue:function(b,c){return a.deserializeValue(b,c)},serializeValue:function(a,b){return"boolean"===b?a?"":void 0:"object"!==b&&"function"!==b&&void 0!==a?a:void 0},reflectPropertyToAttribute:function(a){var b=typeof this[a],c=this.serializeValue(this[a],b);void 0!==c?this.setAttribute(a,c):"boolean"===b&&this.removeAttribute(a)}};a.api.instance.attributes=b}(Polymer),function(a){function b(a,b,d){return Observer.bindToInstance(a,b,d,c)}function c(a,b){return void 0===b&&null===a?b:null===b||void 0===b?a:b}var d=window.logFlags||{},e={createPropertyObserver:function(){var a=this._observeNames;if(a&&a.length){var b=this._propertyObserver=new CompoundObserver(!0);this.registerObservers([b]);for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)b.addPath(this,c),this.observeArrayValue(c,this[c],null)}},openPropertyObserver:function(){this._propertyObserver&&this._propertyObserver.open(this.notifyPropertyChanges,this)},notifyPropertyChanges:function(a,b,c){var d,e,f={};for(var g in b)if(d=c[2*g+1],e=this.observe[d]){var h=b[g],i=a[g];this.observeArrayValue(d,i,h),f[e]||(void 0!==h&&null!==h||void 0!==i&&null!==i)&&(f[e]=!0,this.invokeMethod(e,[h,i,arguments]))}},deliverChanges:function(){this._propertyObserver&&this._propertyObserver.deliver()},propertyChanged_:function(a){this.reflect[a]&&this.reflectPropertyToAttribute(a)},observeArrayValue:function(a,b,c){var e=this.observe[a];if(e&&(Array.isArray(c)&&(d.observe&&console.log("[%s] observeArrayValue: unregister observer [%s]",this.localName,a),this.closeNamedObserver(a+"__array")),Array.isArray(b))){d.observe&&console.log("[%s] observeArrayValue: register observer [%s]",this.localName,a,b);var f=new ArrayObserver(b);f.open(function(a,b){this.invokeMethod(e,[b])},this),this.registerNamedObserver(a+"__array",f)}},bindProperty:function(a,c,d){return d?void(this[a]=c):b(this,a,c)},invokeMethod:function(a,b){var c=this[a]||a;"function"==typeof c&&c.apply(this,b)},registerObservers:function(a){this._observers=this._observers||[],this._observers.push(a)},closeObservers:function(){if(this._observers){for(var a=0,b=this._observers.length;b>a;a++)this.closeObserverArray(this._observers[a]);this._observers=[]}},closeObserverArray:function(a){for(var b,c=0,d=a.length;d>c;c++)b=a[c],b&&b.close&&b.close()},registerNamedObserver:function(a,b){var c=this._namedObservers||(this._namedObservers={});c[a]=b},closeNamedObserver:function(a){var b=this._namedObservers;return b&&b[a]?(b[a].close(),b[a]=null,!0):void 0},closeNamedObservers:function(){if(this._namedObservers){for(var a in this._namedObservers)this.closeNamedObserver(a);this._namedObservers={}}}};a.api.instance.properties=e}(Polymer),function(a){var b=window.logFlags||0,c={instanceTemplate:function(a){var b=this.syntax||!a.bindingDelegate&&this.element.syntax,c=a.createInstance(this,b);return this.registerObservers(c.bindings_),c},bind:function(a,b,c){var d=this.propertyForAttribute(a);if(d){var e=this.bindProperty(d,b,c);return Platform.enableBindingsReflection&&e&&(e.path=b.path_,this._recordBinding(d,e)),this.reflect[d]&&this.reflectPropertyToAttribute(d),e}return this.mixinSuper(arguments)},bindFinished:function(){this.makeElementReady()},_recordBinding:function(a,b){this.bindings_=this.bindings_||{},this.bindings_[a]=b},asyncUnbindAll:function(){this._unbound||(b.unbind&&console.log("[%s] asyncUnbindAll",this.localName),this._unbindAllJob=this.job(this._unbindAllJob,this.unbindAll,0))},unbindAll:function(){this._unbound||(this.closeObservers(),this.closeNamedObservers(),this._unbound=!0)},cancelUnbindAll:function(){return this._unbound?void(b.unbind&&console.warn("[%s] already unbound, cannot cancel unbindAll",this.localName)):(b.unbind&&console.log("[%s] cancelUnbindAll",this.localName),void(this._unbindAllJob&&(this._unbindAllJob=this._unbindAllJob.stop())))}},d=/\{\{([^{}]*)}}/;a.bindPattern=d,a.api.instance.mdv=c}(Polymer),function(a){function b(a){return a.hasOwnProperty("PolymerBase")}function c(){}var d={PolymerBase:!0,job:function(a,b,c){if("string"!=typeof a)return Polymer.job.call(this,a,b,c);var d="___"+a;this[d]=Polymer.job.call(this,this[d],b,c)},"super":Polymer.super,created:function(){},ready:function(){},createdCallback:function(){this.templateInstance&&this.templateInstance.model&&console.warn("Attributes on "+this.localName+" were data bound prior to Polymer upgrading the element. This may result in incorrect binding types."),this.created(),this.prepareElement(),(!this.ownerDocument.isStagingDocument||window.ShadowDOMPolyfill)&&this.makeElementReady()},prepareElement:function(){return this._elementPrepared?void console.warn("Element already prepared",this.localName):(this._elementPrepared=!0,this.shadowRoots={},this.createPropertyObserver(),this.openPropertyObserver(),this.copyInstanceAttributes(),this.takeAttributes(),void this.addHostListeners())},makeElementReady:function(){this._readied||(this._readied=!0,this.parseDeclarations(this.__proto__),this.removeAttribute("unresolved"),this.ready())},attachedCallback:function(){this.cancelUnbindAll(),this.attached&&this.attached(),this.enteredView&&this.enteredView(),this.hasBeenAttached||(this.hasBeenAttached=!0,this.domReady&&this.async("domReady"))},detachedCallback:function(){this.preventDispose||this.asyncUnbindAll(),this.detached&&this.detached(),this.leftView&&this.leftView()},enteredViewCallback:function(){this.attachedCallback()},leftViewCallback:function(){this.detachedCallback()},enteredDocumentCallback:function(){this.attachedCallback()},leftDocumentCallback:function(){this.detachedCallback()},parseDeclarations:function(a){a&&a.element&&(this.parseDeclarations(a.__proto__),a.parseDeclaration.call(this,a.element))},parseDeclaration:function(a){var b=this.fetchTemplate(a);if(b){var c=this.shadowFromTemplate(b);this.shadowRoots[a.name]=c}},fetchTemplate:function(a){return a.querySelector("template")},shadowFromTemplate:function(a){if(a){var b=this.createShadowRoot(),c=this.instanceTemplate(a);return b.appendChild(c),this.shadowRootReady(b,a),b}},lightFromTemplate:function(a,b){if(a){this.eventController=this;var c=this.instanceTemplate(a);return b?this.insertBefore(c,b):this.appendChild(c),this.shadowRootReady(this),c}},shadowRootReady:function(a){this.marshalNodeReferences(a),PolymerGestures.register(a)},marshalNodeReferences:function(a){var b=this.$=this.$||{};if(a)for(var c,d=a.querySelectorAll("[id]"),e=0,f=d.length;f>e&&(c=d[e]);e++)b[c.id]=c},attributeChangedCallback:function(a){"class"!==a&&"style"!==a&&this.attributeToProperty(a,this.getAttribute(a)),this.attributeChanged&&this.attributeChanged.apply(this,arguments)},onMutation:function(a,b){var c=new MutationObserver(function(a){b.call(this,c,a),c.disconnect()}.bind(this));c.observe(a,{childList:!0,subtree:!0})}};c.prototype=d,d.constructor=c,a.Base=c,a.isBase=b,a.api.instance.base=d}(Polymer),function(a){function b(a){return a.__proto__}function c(a,b){var c="",d=!1;b&&(c=b.localName,d=b.hasAttribute("is"));var e=Platform.ShadowCSS.makeScopeSelector(c,d);return Platform.ShadowCSS.shimCssText(a,e)}var d=(window.logFlags||{},"element"),e="controller",f={STYLE_SCOPE_ATTRIBUTE:d,installControllerStyles:function(){var a=this.findStyleScope();if(a&&!this.scopeHasNamedStyle(a,this.localName)){for(var c=b(this),d="";c&&c.element;)d+=c.element.cssTextForScope(e),c=b(c);d&&this.installScopeCssText(d,a)}},installScopeStyle:function(a,b,c){var c=c||this.findStyleScope(),b=b||"";if(c&&!this.scopeHasNamedStyle(c,this.localName+b)){var d="";if(a instanceof Array)for(var e,f=0,g=a.length;g>f&&(e=a[f]);f++)d+=e.textContent+"\n\n";else d=a.textContent;this.installScopeCssText(d,c,b)}},installScopeCssText:function(a,b,d){if(b=b||this.findStyleScope(),d=d||"",b){window.ShadowDOMPolyfill&&(a=c(a,b.host));var f=this.element.cssTextToScopeStyle(a,e);Polymer.applyStyleToScope(f,b),b._scopeStyles[this.localName+d]=!0}},findStyleScope:function(a){for(var b=a||this;b.parentNode;)b=b.parentNode;return b},scopeHasNamedStyle:function(a,b){return a._scopeStyles=a._scopeStyles||{},a._scopeStyles[b]}};a.api.instance.styles=f}(Polymer),function(a){function b(a,b){if(1===arguments.length&&"string"!=typeof arguments[0]){b=a;var c=document._currentScript;if(a=c&&c.parentNode&&c.parentNode.getAttribute?c.parentNode.getAttribute("name"):"",!a)throw"Element name could not be inferred."}if(f[a])throw"Already registered (Polymer) prototype for element "+a;e(a,b),d(a)}function c(a,b){h[a]=b}function d(a){h[a]&&(h[a].registerWhenReady(),delete h[a])}function e(a,b){return i[a]=b||{}}function f(a){return i[a]}var g=a.extend,h=(a.api,{}),i={};a.getRegisteredPrototype=f,a.waitingForPrototype=c,window.Polymer=b,g(Polymer,a);var j=Platform.deliverDeclarations();if(j)for(var k,l=0,m=j.length;m>l&&(k=j[l]);l++)b.apply(null,k)}(Polymer),function(a){var b={resolveElementPaths:function(a){Platform.urlResolver.resolveDom(a)},addResolvePathApi:function(){var a=this.getAttribute("assetpath")||"",b=new URL(a,this.ownerDocument.baseURI);this.prototype.resolvePath=function(a,c){var d=new URL(a,c||b);return d.href}}};a.api.declaration.path=b}(Polymer),function(a){function b(a,b){var c=new URL(a.getAttribute("href"),b).href;return"@import '"+c+"';"}function c(a,b){if(a){b===document&&(b=document.head),window.ShadowDOMPolyfill&&(b=document.head);var c=d(a.textContent),e=a.getAttribute(h);e&&c.setAttribute(h,e);var f=b.firstElementChild;if(b===document.head){var g="style["+h+"]",i=document.head.querySelectorAll(g);i.length&&(f=i[i.length-1].nextElementSibling)}b.insertBefore(c,f)}}function d(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function e(a){return a&&a.__resource||""}function f(a,b){return p?p.call(a,b):void 0}var g=(window.logFlags||{},a.api.instance.styles),h=g.STYLE_SCOPE_ATTRIBUTE,i="style",j="@import",k="link[rel=stylesheet]",l="global",m="polymer-scope",n={loadStyles:function(a){var b=this.fetchTemplate(),c=b&&this.templateContent();if(c){this.convertSheetsToStyles(c);var d=this.findLoadableStyles(c);if(d.length){var e=b.ownerDocument.baseURI;return Platform.styleResolver.loadStyles(d,e,a)}}a&&a()},convertSheetsToStyles:function(a){for(var c,e,f=a.querySelectorAll(k),g=0,h=f.length;h>g&&(c=f[g]);g++)e=d(b(c,this.ownerDocument.baseURI),this.ownerDocument),this.copySheetAttributes(e,c),c.parentNode.replaceChild(e,c)},copySheetAttributes:function(a,b){for(var c,d=0,e=b.attributes,f=e.length;(c=e[d])&&f>d;d++)"rel"!==c.name&&"href"!==c.name&&a.setAttribute(c.name,c.value)},findLoadableStyles:function(a){var b=[];if(a)for(var c,d=a.querySelectorAll(i),e=0,f=d.length;f>e&&(c=d[e]);e++)c.textContent.match(j)&&b.push(c);return b},installSheets:function(){this.cacheSheets(),this.cacheStyles(),this.installLocalSheets(),this.installGlobalStyles()},cacheSheets:function(){this.sheets=this.findNodes(k),this.sheets.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},cacheStyles:function(){this.styles=this.findNodes(i+"["+m+"]"),this.styles.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},installLocalSheets:function(){var a=this.sheets.filter(function(a){return!a.hasAttribute(m)}),b=this.templateContent();if(b){var c="";if(a.forEach(function(a){c+=e(a)+"\n"}),c){var f=d(c,this.ownerDocument);b.insertBefore(f,b.firstChild)}}},findNodes:function(a,b){var c=this.querySelectorAll(a).array(),d=this.templateContent();if(d){var e=d.querySelectorAll(a).array();c=c.concat(e)}return b?c.filter(b):c},installGlobalStyles:function(){var a=this.styleForScope(l);c(a,document.head)},cssTextForScope:function(a){var b="",c="["+m+"="+a+"]",d=function(a){return f(a,c)},g=this.sheets.filter(d);g.forEach(function(a){b+=e(a)+"\n\n"});var h=this.styles.filter(d);return h.forEach(function(a){b+=a.textContent+"\n\n"}),b},styleForScope:function(a){var b=this.cssTextForScope(a);return this.cssTextToScopeStyle(b,a)},cssTextToScopeStyle:function(a,b){if(a){var c=d(a);return c.setAttribute(h,this.getAttribute("name")+"-"+b),c}}},o=HTMLElement.prototype,p=o.matches||o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector;a.api.declaration.styles=n,a.applyStyleToScope=c}(Polymer),function(a){var b=(window.logFlags||{},a.api.instance.events),c=b.EVENT_PREFIX,d={};["webkitAnimationStart","webkitAnimationEnd","webkitTransitionEnd","DOMFocusOut","DOMFocusIn","DOMMouseScroll"].forEach(function(a){d[a.toLowerCase()]=a});var e={parseHostEvents:function(){var a=this.prototype.eventDelegates;this.addAttributeDelegates(a)},addAttributeDelegates:function(a){for(var b,c=0;b=this.attributes[c];c++)this.hasEventPrefix(b.name)&&(a[this.removeEventPrefix(b.name)]=b.value.replace("{{","").replace("}}","").trim())},hasEventPrefix:function(a){return a&&"o"===a[0]&&"n"===a[1]&&"-"===a[2]},removeEventPrefix:function(a){return a.slice(f)},findController:function(a){for(;a.parentNode;){if(a.eventController)return a.eventController;a=a.parentNode}return a.host},getEventHandler:function(a,b,c){var d=this;return function(e){a&&a.PolymerBase||(a=d.findController(b));var f=[e,e.detail,e.currentTarget];a.dispatchMethod(a,c,f)}},prepareEventBinding:function(a,b){if(this.hasEventPrefix(b)){var c=this.removeEventPrefix(b);c=d[c]||c;var e=this;return function(b,d,f){function g(){return"{{ "+a+" }}"}var h=e.getEventHandler(void 0,d,a);return d.addEventListener(c,h),f?void 0:{open:g,discardChanges:g,close:function(){d.removeEventListener(c,h)}}}}}},f=c.length;a.api.declaration.events=e}(Polymer),function(a){var b={inferObservers:function(a){var b,c=a.observe;for(var d in a)"Changed"===d.slice(-7)&&(c||(c=a.observe={}),b=d.slice(0,-7),c[b]=c[b]||d)},explodeObservers:function(a){var b=a.observe;if(b){var c={};for(var d in b)for(var e,f=d.split(" "),g=0;e=f[g];g++)c[e]=b[d];a.observe=c}},optimizePropertyMaps:function(a){if(a.observe){var b=a._observeNames=[];for(var c in a.observe)for(var d,e=c.split(" "),f=0;d=e[f];f++)b.push(d)}if(a.publish){var b=a._publishNames=[];for(var c in a.publish)b.push(c)}},publishProperties:function(a,b){var c=a.publish;c&&(this.requireProperties(c,a,b),a._publishLC=this.lowerCaseMap(c))},requireProperties:function(a,b){b.reflect=b.reflect||{};for(var c in a){var d=a[c],e=this.reflectHintForDescriptor(d);void 0===b.reflect[c]&&void 0!==e&&(b.reflect[c]=e),void 0===b[c]&&(b[c]=this.valueForDescriptor(d))}},valueForDescriptor:function(a){var b="object"==typeof a&&a?a.value:a;return void 0!==b?b:null},reflectHintForDescriptor:function(a){return"object"==typeof a&&a&&void 0!==a.reflect?a.reflect:void 0},lowerCaseMap:function(a){var b={};for(var c in a)b[c.toLowerCase()]=c;return b},createPropertyAccessors:function(a){var b=a._publishNames;if(b&&b.length)for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)Observer.createBindablePrototypeAccessor(a,c)}};a.api.declaration.properties=b}(Polymer),function(a){var b="attributes",c=/\s|,/,d={inheritAttributesObjects:function(a){this.inheritObject(a,"publishLC"),this.inheritObject(a,"_instanceAttributes")},publishAttributes:function(a,d){var e=this.getAttribute(b);if(e)for(var f,g=a.publish||(a.publish={}),h=e.split(c),i=0,j=h.length;j>i;i++)f=h[i].trim(),f&&void 0===g[f]&&void 0===d[f]&&(g[f]=Polymer.nob)},accumulateInstanceAttributes:function(){for(var a,b=this.prototype._instanceAttributes,c=this.attributes,d=0,e=c.length;e>d&&(a=c[d]);d++)this.isInstanceAttribute(a.name)&&(b[a.name]=a.value)},isInstanceAttribute:function(a){return!this.blackList[a]&&"on-"!==a.slice(0,3)},blackList:{name:1,"extends":1,constructor:1,noscript:1,assetpath:1,"cache-csstext":1}};d.blackList[b]=1,a.api.declaration.attributes=d}(Polymer),function(a){var b=a.api.declaration.events,c=new PolymerExpressions,d=c.prepareBinding;c.prepareBinding=function(a,e,f){return b.prepareEventBinding(a,e,f)||d.call(c,a,e,f)};var e={syntax:c,fetchTemplate:function(){return this.querySelector("template")},templateContent:function(){var a=this.fetchTemplate();return a&&Platform.templateContent(a)},installBindingDelegate:function(a){a&&(a.bindingDelegate=this.syntax)}};a.api.declaration.mdv=e}(Polymer),function(a){function b(a){if(!Object.__proto__){var b=Object.getPrototypeOf(a);a.__proto__=b,d(b)&&(b.__proto__=Object.getPrototypeOf(b))}}var c=a.api,d=a.isBase,e=a.extend,f={register:function(a,b){this.buildPrototype(a,b),this.registerPrototype(a,b),this.publishConstructor()},buildPrototype:function(b,c){var d=a.getRegisteredPrototype(b),e=this.generateBasePrototype(c);this.desugarBeforeChaining(d,e),this.prototype=this.chainPrototypes(d,e),this.desugarAfterChaining(b,c)},desugarBeforeChaining:function(a,b){a.element=this,this.publishAttributes(a,b),this.publishProperties(a,b),this.inferObservers(a),this.explodeObservers(a)},chainPrototypes:function(a,c){this.inheritMetaData(a,c);var d=this.chainObject(a,c);return b(d),d},inheritMetaData:function(a,b){this.inheritObject("observe",a,b),this.inheritObject("publish",a,b),this.inheritObject("reflect",a,b),this.inheritObject("_publishLC",a,b),this.inheritObject("_instanceAttributes",a,b),this.inheritObject("eventDelegates",a,b)},desugarAfterChaining:function(a,b){this.optimizePropertyMaps(this.prototype),this.createPropertyAccessors(this.prototype),this.installBindingDelegate(this.fetchTemplate()),this.installSheets(),this.resolveElementPaths(this),this.accumulateInstanceAttributes(),this.parseHostEvents(),this.addResolvePathApi(),window.ShadowDOMPolyfill&&Platform.ShadowCSS.shimStyling(this.templateContent(),a,b),this.prototype.registerCallback&&this.prototype.registerCallback(this)},publishConstructor:function(){var a=this.getAttribute("constructor");a&&(window[a]=this.ctor)},generateBasePrototype:function(a){var b=this.findBasePrototype(a);if(!b){var b=HTMLElement.getPrototypeForTag(a);b=this.ensureBaseApi(b),g[a]=b}return b},findBasePrototype:function(a){return g[a]},ensureBaseApi:function(a){if(a.PolymerBase)return a;var b=Object.create(a);return c.publish(c.instance,b),this.mixinMethod(b,a,c.instance.mdv,"bind"),b},mixinMethod:function(a,b,c,d){var e=function(a){return b[d].apply(this,a)};a[d]=function(){return this.mixinSuper=e,c[d].apply(this,arguments)}},inheritObject:function(a,b,c){var d=b[a]||{};b[a]=this.chainObject(d,c[a])},registerPrototype:function(a,b){var c={prototype:this.prototype},d=this.findTypeExtension(b);d&&(c.extends=d),HTMLElement.register(a,this.prototype),this.ctor=document.registerElement(a,c)},findTypeExtension:function(a){if(a&&a.indexOf("-")<0)return a;var b=this.findBasePrototype(a);return b.element?this.findTypeExtension(b.element.extends):void 0}},g={};f.chainObject=Object.__proto__?function(a,b){return a&&b&&a!==b&&(a.__proto__=b),a}:function(a,b){if(a&&b&&a!==b){var c=Object.create(b);a=e(c,a)}return a},c.declaration.prototype=f}(Polymer),function(a){function b(a){return document.contains(a)?h:g}function c(){return g.length?g[0]:h[0]}function d(a){e.waitToReady=!0,CustomElements.ready=!1,HTMLImports.whenImportsReady(function(){e.addReadyCallback(a),e.waitToReady=!1,e.check()})}var e={wait:function(a,b,c){var d=-1===this.indexOf(a)&&-1===f.indexOf(a);return d&&(this.add(a),a.__check=b,a.__go=c),0!==this.indexOf(a)},add:function(a){b(a).push(a)},indexOf:function(a){var c=b(a).indexOf(a);return c>=0&&document.contains(a)&&(c+=HTMLImports.useNative||HTMLImports.ready?g.length:1e9),c},go:function(a){var b=this.remove(a);b&&(this.addToFlushQueue(b),this.check())},remove:function(a){var c=this.indexOf(a);if(0===c)return b(a).shift()},check:function(){var a=this.nextElement();return a&&a.__check.call(a),this.canReady()?(this.ready(),!0):void 0},nextElement:function(){return c()},canReady:function(){return!this.waitToReady&&this.isEmpty()},isEmpty:function(){return!g.length&&!h.length},addToFlushQueue:function(a){f.push(a)},flush:function(){for(var a;f.length;)a=f.shift(),a.__go.call(a),a.__check=a.__go=null},ready:function(){this.flush(),CustomElements.ready===!1&&(CustomElements.upgradeDocumentTree(document),CustomElements.ready=!0),Platform.flush(),requestAnimationFrame(this.flushReadyCallbacks)},addReadyCallback:function(a){a&&i.push(a)},flushReadyCallbacks:function(){if(i)for(var a;i.length;)(a=i.shift())()},waitToReady:!0},f=[],g=[],h=[],i=[];document.addEventListener("WebComponentsReady",function(){CustomElements.ready=!1}),a.queue=e,a.whenPolymerReady=d}(Polymer),function(a){function b(a,b){a?(document.head.appendChild(a),d(b)):b&&b()}function c(a,c){if(a&&a.length){for(var d,e,f=document.createDocumentFragment(),g=0,h=a.length;h>g&&(d=a[g]);g++)e=document.createElement("link"),e.rel="import",e.href=d,f.appendChild(e);b(f,c)}else c&&c()}var d=a.whenPolymerReady;a.import=c,a.importElements=b}(Polymer),function(a){function b(a){return Boolean(HTMLElement.getPrototypeForTag(a))}function c(a){return a&&a.indexOf("-")>=0}var d=a.extend,e=a.api,f=a.queue,g=a.whenPolymerReady,h=a.getRegisteredPrototype,i=a.waitingForPrototype,j=d(Object.create(HTMLElement.prototype),{createdCallback:function(){this.getAttribute("name")&&this.init()},init:function(){this.name=this.getAttribute("name"),this.extends=this.getAttribute("extends"),this.loadResources(),this.registerWhenReady()},registerWhenReady:function(){this.registered||this.waitingForPrototype(this.name)||this.waitingForQueue()||this.waitingForResources()||f.go(this)},_register:function(){c(this.extends)&&!b(this.extends)&&console.warn("%s is attempting to extend %s, an unregistered element or one that was not registered with Polymer.",this.name,this.extends),this.register(this.name,this.extends),this.registered=!0},waitingForPrototype:function(a){return h(a)?void 0:(i(a,this),this.handleNoScript(a),!0)},handleNoScript:function(a){if(this.hasAttribute("noscript")&&!this.noscript)if(this.noscript=!0,window.CustomElements&&!CustomElements.useNative)Polymer(a);else{var b=document.createElement("script");b.textContent="Polymer('"+a+"');",this.appendChild(b)}},waitingForResources:function(){return this._needsResources},waitingForQueue:function(){return f.wait(this,this.registerWhenReady,this._register)},loadResources:function(){this._needsResources=!0,this.loadStyles(function(){this._needsResources=!1,this.registerWhenReady()}.bind(this))}});e.publish(e.declaration,j),g(function(){document.body.removeAttribute("unresolved"),document.dispatchEvent(new CustomEvent("polymer-ready",{bubbles:!0}))}),document.registerElement("polymer-element",{prototype:j})}(Polymer),function(){var a=document.createElement("polymer-element");a.setAttribute("name","auto-binding"),a.setAttribute("extends","template"),a.init(),Polymer("auto-binding",{createdCallback:function(){this.syntax=this.bindingDelegate=this.makeSyntax(),Polymer.whenPolymerReady(function(){this.model=this,this.setAttribute("bind",""),this.async(function(){this.marshalNodeReferences(this.parentNode),this.fire("template-bound")})}.bind(this))},makeSyntax:function(){var a=Object.create(Polymer.api.declaration.events),b=this;a.findController=function(){return b.model};var c=new PolymerExpressions,d=c.prepareBinding;return c.prepareBinding=function(b,e,f){return a.prepareEventBinding(b,e,f)||d.call(c,b,e,f)},c}})}();
//# sourceMappingURL=polymer.js.map
;
{"version":3,"file":"polymer.js","sources":["../../polymer-gestures/src/scope.js","../../polymer-gestures/src/targetfind.js","../../polymer-gestures/src/touch-action.js","../../polymer-gestures/src/eventFactory.js","../../polymer-gestures/src/pointermap.js","../../polymer-gestures/src/dispatcher.js","../../polymer-gestures/src/installer.js","../../polymer-gestures/src/mouse.js","../../polymer-gestures/src/touch.js","../../polymer-gestures/src/ms.js","../../polymer-gestures/src/pointer.js","../../polymer-gestures/src/platform-events.js","../../polymer-gestures/src/track.js","../../polymer-gestures/src/hold.js","../../polymer-gestures/src/tap.js","../../polymer-expressions/third_party/esprima/esprima.js","../../polymer-expressions/src/polymer-expressions.js","polymer-versioned.js","../src/boot.js","../src/lib/lang.js","../src/lib/job.js","../src/lib/dom.js","../src/lib/super.js","../src/lib/deserialize.js","../src/api.js","../src/instance/utils.js","../src/instance/events.js","../src/instance/attributes.js","../src/instance/properties.js","../src/instance/mdv.js","../src/instance/base.js","../src/instance/styles.js","../src/declaration/polymer.js","../src/declaration/path.js","../src/declaration/styles.js","../src/declaration/events.js","../src/declaration/properties.js","../src/declaration/attributes.js","../src/declaration/mdv.js","../src/declaration/prototype.js","../src/declaration/queue.js","../src/declaration/import.js","../src/declaration/polymer-element.js","../src/lib/auto-binding.js"],"names":["window","PolymerGestures","scope","target","shadow","inEl","shadowRoot","webkitShadowRoot","canTarget","Boolean","elementFromPoint","targetingShadow","s","this","olderShadow","os","olderShadowRoot","se","querySelector","allShadows","element","shadows","push","searchRoot","inRoot","x","y","st","sr","t","ssr","owner","document","parentNode","nodeType","Node","DOCUMENT_NODE","DOCUMENT_FRAGMENT_NODE","findTarget","inEvent","clientX","clientY","LCA","a","b","contains","adepth","depth","bdepth","d","walk","n","u","i","host","deepContains","common","insideNode","node","rect","getBoundingClientRect","left","right","top","bottom","targetFinding","bind","shadowSelector","v","selector","rule","attrib2css","selectors","styles","hasTouchAction","head","style","touchAction","hasShadowRoot","ShadowDOMPolyfill","createShadowRoot","forEach","r","String","map","el","createElement","textContent","appendChild","MOUSE_PROPS","MOUSE_DEFAULTS","NOP_FACTORY","eventFactory","preventTap","makeBaseEvent","inType","inDict","e","createEvent","initEvent","bubbles","cancelable","makeGestureEvent","Object","create","k","keys","length","makePointerEvent","p","buttons","pressure","pointerId","width","height","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","PointerMap","USE_MAP","m","Map","pointers","POINTERS_FN","values","prototype","size","set","inId","indexOf","has","delete","splice","get","clear","callback","thisArg","call","CLONE_PROPS","CLONE_DEFAULTS","HAS_SVG_INSTANCE","SVGElementInstance","wrap","wrapIfNeeded","dispatcher","pointermap","eventMap","eventSources","eventSourceList","gestures","gestureQueue","registerSource","name","source","newEvents","events","registerGesture","register","es","l","unregister","down","fireEvent","move","type","fillGestureQueue","up","cancel","tapPrevented","eventHandler","_handledByPG","fn","listen","addEvent","unlisten","removeEvent","eventName","addEventListener_","boundHandler","addEventListener","removeEventListener_","removeEventListener","makeEvent","preventDefault","_target","dispatchEvent","cloneEvent","eventCopy","correspondingUseElement","clone","gestureTrigger","g","j","ev","requestAnimationFrame","boundGestureTrigger","Installer","add","remove","changed","binder","addCallback","removeCallback","changedCallback","MO","observer","mutationWatcher","Array","toArray","slice","filter","MutationObserver","WebKitMutationObserver","SELECTOR","OBSERVER_INIT","subtree","childList","attributes","attributeOldValue","attributeFilter","watchSubtree","observe","enableOnSubtree","readyState","installOnLoad","installNewSubtree","findElements","addElement","querySelectorAll","removeElement","elementChanged","oldValue","concatLists","accum","list","concat","isElement","ELEMENT_NODE","flattenMutationTree","inNodes","tree","reduce","mutations","mutationHandler","added","addedNodes","removed","removedNodes","console","warn","DEDUP_DIST","WHICH_TO_BUTTONS","HAS_BUTTONS","MouseEvent","mouseEvents","POINTER_ID","POINTER_TYPE","lastTouches","isEventSimulatedFromTouch","lts","dx","Math","abs","dy","prepareEvent","which","mousedown","mouseup","mousemove","relatedTarget","cleanupMouse","INSTALLER","DEDUP_TIMEOUT","CLICK_COUNT_TIMEOUT","ATTRIB","HAS_TOUCH_ACTION","touchEvents","elementAdded","getAttribute","touchActionToScrollType","_scrollType","elementRemoved","undefined","oldSt","scrollTypes","EMITTER","XSCROLLER","YSCROLLER","SCROLLER","exec","firstTouch","isPrimaryTouch","inTouch","identifier","setPrimaryTouch","firstXY","X","Y","scrolling","cancelResetClickCount","removePrimaryPointer","inPointer","resetClickCount","clickCount","resetId","setTimeout","clearTimeout","typeToButtons","ret","touch","id","currentTouchEvent","touchToPointer","cte","detail","webkitRadiusX","radiusX","webkitRadiusY","radiusY","webkitForce","force","self","processTouches","inFunction","tl","changedTouches","shouldScroll","scrollAxis","currentTarget","oa","da","doa","findTouch","inTL","vacuumTouches","touches","value","key","out","cancelOut","touchstart","dedupSynthMouse","touchmove","touchcancel","pointer","touchend","cleanUpPointer","lt","HAS_BITMAP_TYPE","MSPointerEvent","MSPOINTER_TYPE_MOUSE","msEvents","POINTER_TYPES","cleanup","MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel","pointerEvents","pointerdown","pointermove","pointerup","pointercancel","PointerEvent","navigator","msPointerEnabled","ontouchstart","track","WIGGLE_THRESHOLD","clampDir","inDelta","calcPositionDelta","inA","inB","pageX","pageY","fireTrack","inTrackingData","downEvent","dd","lastMoveEvent","xDirection","yDirection","ddx","ddy","screenX","screenY","trackInfo","downTarget","tracking","hold","HOLD_DELAY","heldPointer","holdJob","pulse","Date","now","timeStamp","held","fireHold","clearInterval","setInterval","inHoldTime","holdTime","tap","shouldTap","downState","start","altKey","ctrlKey","metaKey","shiftKey","global","assert","condition","message","Error","isDecimalDigit","ch","isWhiteSpace","fromCharCode","isLineTerminator","isIdentifierStart","isIdentifierPart","isKeyword","skipWhitespace","index","charCodeAt","getIdentifier","scanIdentifier","Token","Identifier","Keyword","NullLiteral","BooleanLiteral","range","scanPunctuator","code2","ch2","code","ch1","Punctuator","throwError","Messages","UnexpectedToken","scanNumericLiteral","number","NumericLiteral","parseFloat","scanStringLiteral","quote","str","octal","StringLiteral","isIdentifierName","token","advance","EOF","lex","lookahead","peek","pos","messageFormat","error","args","arguments","msg","replace","whole","description","throwUnexpected","expect","match","matchKeyword","keyword","parseArrayInitialiser","elements","parseExpression","delegate","createArrayExpression","parseObjectPropertyKey","createLiteral","createIdentifier","parseObjectProperty","createProperty","parseObjectInitialiser","properties","createObjectExpression","parseGroupExpression","expr","parsePrimaryExpression","createThisExpression","parseArguments","parseNonComputedProperty","parseNonComputedMember","parseComputedMember","parseLeftHandSideExpression","property","createMemberExpression","parseUnaryExpression","parsePostfixExpression","createUnaryExpression","binaryPrecedence","prec","parseBinaryExpression","stack","operator","pop","createBinaryExpression","parseConditionalExpression","consequent","alternate","createConditionalExpression","parseFilter","createFilter","parseFilters","parseTopLevel","Syntax","parseInExpression","parseAsExpression","createTopLevel","createAsExpression","indexName","createInExpression","parse","inDelegate","state","labelSet","TokenName","ArrayExpression","BinaryExpression","CallExpression","ConditionalExpression","EmptyStatement","ExpressionStatement","Literal","LabeledStatement","LogicalExpression","MemberExpression","ObjectExpression","Program","Property","ThisExpression","UnaryExpression","UnknownLabel","Redeclaration","esprima","prepareBinding","expressionText","filterRegistry","expression","getExpression","scopeIdent","tagName","ex","model","oneTime","binding","getBinding","polymerExpressionScopeIdent_","indexIdent","polymerExpressionIndexIdent_","expressionParseCache","ASTDelegate","Expression","valueFn_","IdentPath","path","Path","object","accessor","computed","dynamicDeps","simplePath","getFn","Filter","notImplemented","arg","valueFn","filters","deps","currentPath","ConstantObservable","value_","convertStylePropertyName","c","toLowerCase","findScope","prop","parentScopeName","hasOwnProperty","isLiteralExpression","pathString","isNaN","Number","PolymerExpressions","addPath","getValueFrom","setValue","newValue","setValueFrom",{"end":{"file":"../../polymer-expressions/src/polymer-expressions.js","comments_before":[],"nlb":false,"endpos":3512,"pos":3504,"col":8,"line":116,"value":"fullPath","type":"name"},"start":{"file":"../../polymer-expressions/src/polymer-expressions.js","comments_before":[],"nlb":false,"endpos":3512,"pos":3504,"col":8,"line":116,"value":"fullPath","type":"name"},"name":"fullPath"},"fullPath","fullPath_","parts","context","propName","transform","toModelDirection","toModel","toDOM","apply","unaryOperators","+","-","!","binaryOperators","*","/","%","<",">","<=",">=","==","!=","===","!==","&&","||","op","argument","test","ident","arr","kind","obj","open","discardChanges","deliver","close","firstTime","firstValue","startReset","getValue","finishReset","setValueFn","CompoundObserver","ObserverTransform","count","random","toString","styleObject","join","tokenList","tokens","prepareInstancePositionChanged","template","templateInstance","valid","PathObserver","prepareInstanceModel","scopeName","parentScope","createScopeObject","__proto__","defineProperty","configurable","writable","exposeGetExpression","getExpression_","Polymer","version","extend","api","getOwnPropertyNames","pd","getOwnPropertyDescriptor","nom","job","wait","stop","Job","go","inContext","boundComplete","complete","h","handle","cancelAnimationFrame","registry","HTMLElement","tag","getPrototypeForTag","getPrototypeOf","originalStopPropagation","Event","stopPropagation","cancelBubble","$super","arrayOfArgs","caller","_super","nameInThis","memoizeSuper","n$","method","proto","nextSuper","super","deserializeValue","currentValue","inferredType","typeHandlers","string","date","boolean","parseInt","JSON","function","declaration","instance","publish","apis","utils","async","timeout","Platform","flush","cancelAsync","fire","onNode","event","CustomEvent","asyncFire","classFollows","anew","old","className","classList","nop","nob","asyncMethod","log","logFlags","EVENT_PREFIX","addHostListeners","eventDelegates","localName","methodName","getEventHandler","dispatchMethod","group","groupEnd","copyInstanceAttributes","a$","_instanceAttributes","hasAttribute","setAttribute","takeAttributes","_publishLC","attributeToProperty","propertyForAttribute","search","bindPattern","stringValue","serializeValue","reflectPropertyToAttribute","serializedValue","removeAttribute","bindProperties","observable","Observer","bindToInstance","resolveBindingValue","createPropertyObserver","_observeNames","o","_propertyObserver","registerObservers","observeArrayValue","openPropertyObserver","notifyPropertyChanges","newValues","oldValues","paths","called","ov","nv","invokeMethod","deliverChanges","propertyChanged_","reflect","callbackName","isArray","closeNamedObserver","ArrayObserver","registerNamedObserver","bindProperty","observers","_observers","closeObservers","closeObserverArray","observerArray","o$","_namedObservers","closeNamedObservers","mdv","instanceTemplate","syntax","bindingDelegate","dom","createInstance","bindings_","enableBindingsReflection","path_","_recordBinding","mixinSuper","bindFinished","makeElementReady","asyncUnbindAll","_unbound","unbind","_unbindAllJob","unbindAll","cancelUnbindAll","mustachePattern","isBase","PolymerBase","base","created","ready","createdCallback","prepareElement","ownerDocument","isStagingDocument","_elementPrepared","shadowRoots","_readied","parseDeclarations","attachedCallback","attached","enteredView","hasBeenAttached","domReady","detachedCallback","preventDispose","detached","leftView","enteredViewCallback","leftViewCallback","enteredDocumentCallback","leftDocumentCallback","parseDeclaration","elementElement","fetchTemplate","root","shadowFromTemplate","shadowRootReady","lightFromTemplate","refNode","eventController","insertBefore","marshalNodeReferences","$","attributeChangedCallback","attributeChanged","onMutation","listener","disconnect","constructor","Base","shimCssText","cssText","is","ShadowCSS","makeScopeSelector","STYLE_SCOPE_ATTRIBUTE","STYLE_CONTROLLER_SCOPE","installControllerStyles","findStyleScope","scopeHasNamedStyle","cssTextForScope","installScopeCssText","installScopeStyle","cssTextToScopeStyle","applyStyleToScope","_scopeStyles","script","_currentScript","getRegisteredPrototype","registerPrototype","notifyPrototype","waitingForPrototype","client","waitPrototype","registerWhenReady","prototypesByName","declarations","deliverDeclarations","resolveElementPaths","urlResolver","resolveDom","addResolvePathApi","assetPath","URL","baseURI","resolvePath","urlPath","href","importRuleForSheet","sheet","baseUrl","createStyleElement","attr","firstElementChild","s$","nextElementSibling","cssTextFromSheet","__resource","matchesSelector","inSelector","matches","STYLE_SELECTOR","STYLE_LOADABLE_MATCH","SHEET_SELECTOR","STYLE_GLOBAL_SCOPE","SCOPE_ATTR","loadStyles","content","templateContent","convertSheetsToStyles","findLoadableStyles","templateUrl","styleResolver","copySheetAttributes","replaceChild","link","loadables","installSheets","cacheSheets","cacheStyles","installLocalSheets","installGlobalStyles","sheets","findNodes","removeChild","firstChild","matcher","nodes","array","templateNodes","styleForScope","scopeDescriptor","webkitMatchesSelector","mozMatchesSelector","mixedCaseEventTypes","parseHostEvents","delegates","addAttributeDelegates","hasEventPrefix","removeEventPrefix","trim","prefixLength","findController","controller","prepareEventBinding","eventType","bindingValue","handler","inferObservers","explodeObservers","exploded","ni","names","split","optimizePropertyMaps","_publishNames","publishProperties","requireProperties","lowerCaseMap","propertyDescriptors","propertyDescriptor","reflects","reflectHintForDescriptor","valueForDescriptor","createPropertyAccessors","createBindablePrototypeAccessor","ATTRIBUTES_ATTRIBUTE","ATTRIBUTES_REGEX","inheritAttributesObjects","inheritObject","publishAttributes","accumulateInstanceAttributes","clonable","isInstanceAttribute","blackList","extends","noscript","assetpath","cache-csstext","installBindingDelegate","ensurePrototypeTraversal","ancestor","extendeeName","buildPrototype","publishConstructor","extension","generateBasePrototype","desugarBeforeChaining","chainPrototypes","desugarAfterChaining","inheritMetaData","chained","chainObject","extendee","shimStyling","registerCallback","symbol","ctor","extnds","findBasePrototype","ensureBaseApi","memoizedBases","extended","mixinMethod","info","typeExtension","findTypeExtension","registerElement","inherited","queueForElement","mainQueue","importQueue","nextQueued","whenPolymerReady","queue","waitToReady","CustomElements","HTMLImports","whenImportsReady","addReadyCallback","check","shouldAdd","flushQueue","__check","__go","useNative","readied","addToFlushQueue","shift","nextElement","canReady","isEmpty","upgradeDocumentTree","flushReadyCallbacks","readyCallbacks","importElements","elementOrFragment","importUrls","urls","url","frag","createDocumentFragment","rel","import","isRegistered","isCustomTag","init","loadResources","registered","waitingForQueue","waitingForResources","_register","handleNoScript","_needsResources","body","makeSyntax"],"mappings":"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","sourcesContent":["/**\n * @license\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\nwindow.PolymerGestures = {};\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  var target = {\n    shadow: function(inEl) {\n      if (inEl) {\n        return inEl.shadowRoot || inEl.webkitShadowRoot;\n      }\n    },\n    canTarget: function(shadow) {\n      return shadow && Boolean(shadow.elementFromPoint);\n    },\n    targetingShadow: function(inEl) {\n      var s = this.shadow(inEl);\n      if (this.canTarget(s)) {\n        return s;\n      }\n    },\n    olderShadow: function(shadow) {\n      var os = shadow.olderShadowRoot;\n      if (!os) {\n        var se = shadow.querySelector('shadow');\n        if (se) {\n          os = se.olderShadowRoot;\n        }\n      }\n      return os;\n    },\n    allShadows: function(element) {\n      var shadows = [], s = this.shadow(element);\n      while(s) {\n        shadows.push(s);\n        s = this.olderShadow(s);\n      }\n      return shadows;\n    },\n    searchRoot: function(inRoot, x, y) {\n      if (inRoot) {\n        var t = inRoot.elementFromPoint(x, y);\n        var st, sr, os;\n        // is element a shadow host?\n        sr = this.targetingShadow(t);\n        while (sr) {\n          // find the the element inside the shadow root\n          st = sr.elementFromPoint(x, y);\n          if (!st) {\n            // check for older shadows\n            sr = this.olderShadow(sr);\n          } else {\n            // shadowed element may contain a shadow root\n            var ssr = this.targetingShadow(st);\n            return this.searchRoot(ssr, x, y) || st;\n          }\n        }\n        // light dom element is the target\n        return t;\n      }\n    },\n    owner: function(element) {\n      if (!element) {\n        return document;\n      }\n      var s = element;\n      // walk up until you hit the shadow root or document\n      while (s.parentNode) {\n        s = s.parentNode;\n      }\n      // the owner element is expected to be a Document or ShadowRoot\n      if (s.nodeType != Node.DOCUMENT_NODE && s.nodeType != Node.DOCUMENT_FRAGMENT_NODE) {\n        s = document;\n      }\n      return s;\n    },\n    findTarget: function(inEvent) {\n      var x = inEvent.clientX, y = inEvent.clientY;\n      // if the listener is in the shadow root, it is much faster to start there\n      var s = this.owner(inEvent.target);\n      // if x, y is not in this root, fall back to document search\n      if (!s.elementFromPoint(x, y)) {\n        s = document;\n      }\n      return this.searchRoot(s, x, y);\n    },\n    LCA: function(a, b) {\n      if (a === b) {\n        return a;\n      }\n      if (a && !b) {\n        return a;\n      }\n      if (b && !a) {\n        return b;\n      }\n      if (!b && !a) {\n        return document;\n      }\n      // fast case, a is a direct descendant of b or vice versa\n      if (a.contains && a.contains(b)) {\n        return a;\n      }\n      if (b.contains && b.contains(a)) {\n        return b;\n      }\n      var adepth = this.depth(a);\n      var bdepth = this.depth(b);\n      var d = adepth - bdepth;\n      if (d > 0) {\n        a = this.walk(a, d);\n      } else {\n        b = this.walk(b, -d);\n      }\n      while(a && b && a !== b) {\n        a = this.walk(a, 1);\n        b = this.walk(b, 1);\n      }\n      return a;\n    },\n    walk: function(n, u) {\n      for (var i = 0; n && (i < u); i++) {\n        n = n.parentNode || n.host;\n      }\n      return n;\n    },\n    depth: function(n) {\n      var d = 0;\n      while(n) {\n        d++;\n        n = n.parentNode || n.host;\n      }\n      return d;\n    },\n    deepContains: function(a, b) {\n      var common = this.LCA(a, b);\n      // if a is the common ancestor, it must \"deeply\" contain b\n      return common === a;\n    },\n    insideNode: function(node, x, y) {\n      var rect = node.getBoundingClientRect();\n      return (rect.left <= x) && (x <= rect.right) && (rect.top <= y) && (y <= rect.bottom);\n    }\n  };\n  scope.targetFinding = target;\n  /**\n   * Given an event, finds the \"deepest\" node that could have been the original target before ShadowDOM retargetting\n   *\n   * @param {Event} Event An event object with clientX and clientY properties\n   * @return {Element} The probable event origninator\n   */\n  scope.findTarget = target.findTarget.bind(target);\n  /**\n   * Determines if the \"container\" node deeply contains the \"containee\" node, including situations where the \"containee\" is contained by one or more ShadowDOM\n   * roots.\n   *\n   * @param {Node} container\n   * @param {Node} containee\n   * @return {Boolean}\n   */\n  scope.deepContains = target.deepContains.bind(target);\n\n  /**\n   * Determines if the x/y position is inside the given node.\n   *\n   * Example:\n   *\n   *     function upHandler(event) {\n   *       var innode = PolymerGestures.insideNode(event.target, event.clientX, event.clientY);\n   *       if (innode) {\n   *         // wait for tap?\n   *       } else {\n   *         // tap will never happen\n   *       }\n   *     }\n   *\n   * @param {Node} node\n   * @param {Number} x Screen X position\n   * @param {Number} y screen Y position\n   * @return {Boolean}\n   */\n  scope.insideNode = target.insideNode;\n\n})(window.PolymerGestures);\n","/*\n *\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function() {\n  function shadowSelector(v) {\n    return 'body /deep/ ' + selector(v);\n  }\n  function selector(v) {\n    return '[touch-action=\"' + v + '\"]';\n  }\n  function rule(v) {\n    return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + ';}';\n  }\n  var attrib2css = [\n    'none',\n    'auto',\n    'pan-x',\n    'pan-y',\n    {\n      rule: 'pan-x pan-y',\n      selectors: [\n        'pan-x pan-y',\n        'pan-y pan-x'\n      ]\n    }\n  ];\n  var styles = '';\n  // only install stylesheet if the browser has touch action support\n  var head = document.head;\n  var hasTouchAction = typeof document.head.style.touchAction === 'string';\n  // only add shadow selectors if shadowdom is supported\n  var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;\n\n  if (hasTouchAction) {\n    attrib2css.forEach(function(r) {\n      if (String(r) === r) {\n        styles += selector(r) + rule(r) + '\\n';\n        if (hasShadowRoot) {\n          styles += shadowSelector(r) + rule(r) + '\\n';\n        }\n      } else {\n        styles += r.selectors.map(selector) + rule(r.rule) + '\\n';\n        if (hasShadowRoot) {\n          styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\\n';\n        }\n      }\n    });\n\n    var el = document.createElement('style');\n    el.textContent = styles;\n    document.head.appendChild(el);\n  }\n})();\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This is the constructor for new PointerEvents.\n *\n * New Pointer Events must be given a type, and an optional dictionary of\n * initialization properties.\n *\n * Due to certain platform requirements, events returned from the constructor\n * identify as MouseEvents.\n *\n * @constructor\n * @param {String} inType The type of the event to create.\n * @param {Object} [inDict] An optional dictionary of initial event properties.\n * @return {Event} A new PointerEvent of type `inType` and initialized with properties from `inDict`.\n */\n(function(scope) {\n\n  var MOUSE_PROPS = [\n    'bubbles',\n    'cancelable',\n    'view',\n    'detail',\n    'screenX',\n    'screenY',\n    'clientX',\n    'clientY',\n    'ctrlKey',\n    'altKey',\n    'shiftKey',\n    'metaKey',\n    'button',\n    'relatedTarget',\n    'pageX',\n    'pageY'\n  ];\n\n  var MOUSE_DEFAULTS = [\n    false,\n    false,\n    null,\n    null,\n    0,\n    0,\n    0,\n    0,\n    false,\n    false,\n    false,\n    false,\n    0,\n    null,\n    0,\n    0\n  ];\n\n  var NOP_FACTORY = function(){ return function(){}; };\n\n  var eventFactory = {\n    // TODO(dfreedm): this is overridden by tap recognizer, needs review\n    preventTap: NOP_FACTORY,\n    makeBaseEvent: function(inType, inDict) {\n      var e = document.createEvent('Event');\n      e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);\n      e.preventTap = eventFactory.preventTap(e);\n      return e;\n    },\n    makeGestureEvent: function(inType, inDict) {\n      inDict = inDict || Object.create(null);\n\n      var e = this.makeBaseEvent(inType, inDict);\n      for (var i = 0, keys = Object.keys(inDict), k; i < keys.length; i++) {\n        k = keys[i];\n        e[k] = inDict[k];\n      }\n      return e;\n    },\n    makePointerEvent: function(inType, inDict) {\n      inDict = inDict || Object.create(null);\n\n      var e = this.makeBaseEvent(inType, inDict);\n      // define inherited MouseEvent properties\n      for(var i = 0, p; i < MOUSE_PROPS.length; i++) {\n        p = MOUSE_PROPS[i];\n        e[p] = inDict[p] || MOUSE_DEFAULTS[i];\n      }\n      e.buttons = inDict.buttons || 0;\n\n      // Spec requires that pointers without pressure specified use 0.5 for down\n      // state and 0 for up state.\n      var pressure = 0;\n      if (inDict.pressure) {\n        pressure = inDict.pressure;\n      } else {\n        pressure = e.buttons ? 0.5 : 0;\n      }\n\n      // add x/y properties aliased to clientX/Y\n      e.x = e.clientX;\n      e.y = e.clientY;\n\n      // define the properties of the PointerEvent interface\n      e.pointerId = inDict.pointerId || 0;\n      e.width = inDict.width || 0;\n      e.height = inDict.height || 0;\n      e.pressure = pressure;\n      e.tiltX = inDict.tiltX || 0;\n      e.tiltY = inDict.tiltY || 0;\n      e.pointerType = inDict.pointerType || '';\n      e.hwTimestamp = inDict.hwTimestamp || 0;\n      e.isPrimary = inDict.isPrimary || false;\n      return e;\n    }\n  };\n\n  scope.eventFactory = eventFactory;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This module implements an map of pointer states\n */\n(function(scope) {\n  var USE_MAP = window.Map && window.Map.prototype.forEach;\n  var POINTERS_FN = function(){ return this.size; };\n  function PointerMap() {\n    if (USE_MAP) {\n      var m = new Map();\n      m.pointers = POINTERS_FN;\n      return m;\n    } else {\n      this.keys = [];\n      this.values = [];\n    }\n  }\n\n  PointerMap.prototype = {\n    set: function(inId, inEvent) {\n      var i = this.keys.indexOf(inId);\n      if (i > -1) {\n        this.values[i] = inEvent;\n      } else {\n        this.keys.push(inId);\n        this.values.push(inEvent);\n      }\n    },\n    has: function(inId) {\n      return this.keys.indexOf(inId) > -1;\n    },\n    'delete': function(inId) {\n      var i = this.keys.indexOf(inId);\n      if (i > -1) {\n        this.keys.splice(i, 1);\n        this.values.splice(i, 1);\n      }\n    },\n    get: function(inId) {\n      var i = this.keys.indexOf(inId);\n      return this.values[i];\n    },\n    clear: function() {\n      this.keys.length = 0;\n      this.values.length = 0;\n    },\n    // return value, key, map\n    forEach: function(callback, thisArg) {\n      this.values.forEach(function(v, i) {\n        callback.call(thisArg, v, this.keys[i], this);\n      }, this);\n    },\n    pointers: function() {\n      return this.keys.length;\n    }\n  };\n\n  scope.PointerMap = PointerMap;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  var CLONE_PROPS = [\n    // MouseEvent\n    'bubbles',\n    'cancelable',\n    'view',\n    'detail',\n    'screenX',\n    'screenY',\n    'clientX',\n    'clientY',\n    'ctrlKey',\n    'altKey',\n    'shiftKey',\n    'metaKey',\n    'button',\n    'relatedTarget',\n    // DOM Level 3\n    'buttons',\n    // PointerEvent\n    'pointerId',\n    'width',\n    'height',\n    'pressure',\n    'tiltX',\n    'tiltY',\n    'pointerType',\n    'hwTimestamp',\n    'isPrimary',\n    // event instance\n    'type',\n    'target',\n    'currentTarget',\n    'which',\n    'pageX',\n    'pageY',\n    'timeStamp',\n    // gesture addons\n    'preventTap',\n    'tapPrevented'\n  ];\n\n  var CLONE_DEFAULTS = [\n    // MouseEvent\n    false,\n    false,\n    null,\n    null,\n    0,\n    0,\n    0,\n    0,\n    false,\n    false,\n    false,\n    false,\n    0,\n    null,\n    // DOM Level 3\n    0,\n    // PointerEvent\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    '',\n    0,\n    false,\n    // event instance\n    '',\n    null,\n    null,\n    0,\n    0,\n    0,\n    0,\n    function(){},\n    false\n  ];\n\n  var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');\n\n  var wrap = window.ShadowDOMPolyfill && ShadowDOMPolyfill.wrapIfNeeded || function(e){ return e; };\n\n  var eventFactory = scope.eventFactory;\n  /**\n   * This module is for normalizing events. Mouse and Touch events will be\n   * collected here, and fire PointerEvents that have the same semantics, no\n   * matter the source.\n   * Events fired:\n   *   - pointerdown: a pointing is added\n   *   - pointerup: a pointer is removed\n   *   - pointermove: a pointer is moved\n   *   - pointerover: a pointer crosses into an element\n   *   - pointerout: a pointer leaves an element\n   *   - pointercancel: a pointer will no longer generate events\n   */\n  var dispatcher = {\n    pointermap: new scope.PointerMap(),\n    eventMap: Object.create(null),\n    // Scope objects for native events.\n    // This exists for ease of testing.\n    eventSources: Object.create(null),\n    eventSourceList: [],\n    gestures: [],\n    gestureQueue: [],\n    /**\n     * Add a new event source that will generate pointer events.\n     *\n     * `inSource` must contain an array of event names named `events`, and\n     * functions with the names specified in the `events` array.\n     * @param {string} name A name for the event source\n     * @param {Object} source A new source of platform events.\n     */\n    registerSource: function(name, source) {\n      var s = source;\n      var newEvents = s.events;\n      if (newEvents) {\n        newEvents.forEach(function(e) {\n          if (s[e]) {\n            this.eventMap[e] = s[e].bind(s);\n          }\n        }, this);\n        this.eventSources[name] = s;\n        this.eventSourceList.push(s);\n      }\n    },\n    registerGesture: function(name, source) {\n      this.gestures.push(source);\n    },\n    register: function(element) {\n      // NOTE: Work around for #4, don't add listeners to individual Polymer elmenets in SD Polyfill\n      if (window.ShadowDOMPolyfill && element !== document) {\n        return;\n      }\n      var l = this.eventSourceList.length;\n      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {\n        // call eventsource register\n        es.register.call(es, element);\n      }\n    },\n    unregister: function(element) {\n      var l = this.eventSourceList.length;\n      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {\n        // call eventsource register\n        es.unregister.call(es, element);\n      }\n    },\n    // EVENTS\n    down: function(inEvent) {\n      this.fireEvent('down', inEvent);\n    },\n    move: function(inEvent) {\n      // pipe move events into gesture queue directly\n      inEvent.type = 'move';\n      this.fillGestureQueue(inEvent);\n    },\n    up: function(inEvent) {\n      this.fireEvent('up', inEvent);\n    },\n    cancel: function(inEvent) {\n      inEvent.tapPrevented = true;\n      this.fireEvent('up', inEvent);\n    },\n    // LISTENER LOGIC\n    eventHandler: function(inEvent) {\n      // This is used to prevent multiple dispatch of events from\n      // platform events. This can happen when two elements in different scopes\n      // are set up to create pointer events, which is relevant to Shadow DOM.\n      if (inEvent._handledByPG) {\n        return;\n      }\n      var type = inEvent.type;\n      var fn = this.eventMap && this.eventMap[type];\n      if (fn) {\n        fn(inEvent);\n      }\n      inEvent._handledByPG = true;\n    },\n    // set up event listeners\n    listen: function(target, events) {\n      events.forEach(function(e) {\n        this.addEvent(target, e);\n      }, this);\n    },\n    // remove event listeners\n    unlisten: function(target, events) {\n      events.forEach(function(e) {\n        this.removeEvent(target, e);\n      }, this);\n    },\n    addEvent: function(target, eventName) {\n      // NOTE: Work around for #4, use native event listener in SD Polyfill\n      if (window.ShadowDOMPolyfill) {\n        target.addEventListener_(eventName, this.boundHandler);\n      } else {\n        target.addEventListener(eventName, this.boundHandler);\n      }\n    },\n    removeEvent: function(target, eventName) {\n      // NOTE: Work around for #4, use native event listener in SD Polyfill\n      if (window.ShadowDOMPolyfill) {\n        target.removeEventListener_(eventName, this.boundHandler);\n      } else {\n        target.removeEventListener(eventName, this.boundHandler);\n      }\n    },\n    // EVENT CREATION AND TRACKING\n    /**\n     * Creates a new Event of type `inType`, based on the information in\n     * `inEvent`.\n     *\n     * @param {string} inType A string representing the type of event to create\n     * @param {Event} inEvent A platform event with a target\n     * @return {Event} A PointerEvent of type `inType`\n     */\n    makeEvent: function(inType, inEvent) {\n      var e = eventFactory.makePointerEvent(inType, inEvent);\n      e.preventDefault = inEvent.preventDefault;\n      e.tapPrevented = inEvent.tapPrevented;\n      e._target = e._target || inEvent.target;\n      return e;\n    },\n    // make and dispatch an event in one call\n    fireEvent: function(inType, inEvent) {\n      var e = this.makeEvent(inType, inEvent);\n      return this.dispatchEvent(e);\n    },\n    /**\n     * Returns a snapshot of inEvent, with writable properties.\n     *\n     * @param {Event} inEvent An event that contains properties to copy.\n     * @return {Object} An object containing shallow copies of `inEvent`'s\n     *    properties.\n     */\n    cloneEvent: function(inEvent) {\n      var eventCopy = Object.create(null), p;\n      for (var i = 0; i < CLONE_PROPS.length; i++) {\n        p = CLONE_PROPS[i];\n        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];\n        // Work around SVGInstanceElement shadow tree\n        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.\n        // This is the behavior implemented by Firefox.\n        if (p === 'target' || p === 'relatedTarget') {\n          if (HAS_SVG_INSTANCE && eventCopy[p] instanceof SVGElementInstance) {\n            eventCopy[p] = eventCopy[p].correspondingUseElement;\n          }\n          eventCopy[p] = wrap(eventCopy[p]);\n        }\n      }\n      // keep the semantics of preventDefault\n      eventCopy.preventDefault = inEvent.preventDefault;\n      return eventCopy;\n    },\n    /**\n     * Dispatches the event to its target.\n     *\n     * @param {Event} inEvent The event to be dispatched.\n     * @return {Boolean} True if an event handler returns true, false otherwise.\n     */\n    dispatchEvent: function(inEvent) {\n      var t = inEvent._target;\n      if (t) {\n        t.dispatchEvent(inEvent);\n        // clone the event for the gesture system to process\n        // clone after dispatch to pick up gesture prevention code\n        var clone = this.cloneEvent(inEvent);\n        clone.target = t;\n        this.fillGestureQueue(clone);\n      }\n    },\n    gestureTrigger: function() {\n      // process the gesture queue\n      for (var i = 0, e; i < this.gestureQueue.length; i++) {\n        e = this.gestureQueue[i];\n        for (var j = 0, g; j < this.gestures.length; j++) {\n          g = this.gestures[j];\n          if (g.events.indexOf(e.type) >= 0) {\n            g[e.type].call(g, e);\n          }\n        }\n      }\n      this.gestureQueue.length = 0;\n    },\n    fillGestureQueue: function(ev) {\n      // only trigger the gesture queue once\n      if (!this.gestureQueue.length) {\n        requestAnimationFrame(this.boundGestureTrigger);\n      }\n      this.gestureQueue.push(ev);\n    }\n  };\n  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);\n  dispatcher.boundGestureTrigger = dispatcher.gestureTrigger.bind(dispatcher);\n  scope.dispatcher = dispatcher;\n  scope.register = dispatcher.register.bind(dispatcher);\n  scope.unregister = dispatcher.unregister.bind(dispatcher);\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This module uses Mutation Observers to dynamically adjust which nodes will\n * generate Pointer Events.\n *\n * All nodes that wish to generate Pointer Events must have the attribute\n * `touch-action` set to `none`.\n */\n(function(scope) {\n  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);\n  var map = Array.prototype.map.call.bind(Array.prototype.map);\n  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);\n  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);\n  var MO = window.MutationObserver || window.WebKitMutationObserver;\n  var SELECTOR = '[touch-action]';\n  var OBSERVER_INIT = {\n    subtree: true,\n    childList: true,\n    attributes: true,\n    attributeOldValue: true,\n    attributeFilter: ['touch-action']\n  };\n\n  function Installer(add, remove, changed, binder) {\n    this.addCallback = add.bind(binder);\n    this.removeCallback = remove.bind(binder);\n    this.changedCallback = changed.bind(binder);\n    if (MO) {\n      this.observer = new MO(this.mutationWatcher.bind(this));\n    }\n  }\n\n  Installer.prototype = {\n    watchSubtree: function(target) {\n      // Only watch scopes that can target find, as these are top-level.\n      // Otherwise we can see duplicate additions and removals that add noise.\n      //\n      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see\n      // a removal without an insertion when a node is redistributed among\n      // shadows. Since it all ends up correct in the document, watching only\n      // the document will yield the correct mutations to watch.\n      if (scope.targetFinding.canTarget(target)) {\n        this.observer.observe(target, OBSERVER_INIT);\n      }\n    },\n    enableOnSubtree: function(target) {\n      this.watchSubtree(target);\n      if (target === document && document.readyState !== 'complete') {\n        this.installOnLoad();\n      } else {\n        this.installNewSubtree(target);\n      }\n    },\n    installNewSubtree: function(target) {\n      forEach(this.findElements(target), this.addElement, this);\n    },\n    findElements: function(target) {\n      if (target.querySelectorAll) {\n        return target.querySelectorAll(SELECTOR);\n      }\n      return [];\n    },\n    removeElement: function(el) {\n      this.removeCallback(el);\n    },\n    addElement: function(el) {\n      this.addCallback(el);\n    },\n    elementChanged: function(el, oldValue) {\n      this.changedCallback(el, oldValue);\n    },\n    concatLists: function(accum, list) {\n      return accum.concat(toArray(list));\n    },\n    // register all touch-action = none nodes on document load\n    installOnLoad: function() {\n      document.addEventListener('readystatechange', function() {\n        if (document.readyState === 'complete') {\n          this.installNewSubtree(document);\n        }\n      }.bind(this));\n    },\n    isElement: function(n) {\n      return n.nodeType === Node.ELEMENT_NODE;\n    },\n    flattenMutationTree: function(inNodes) {\n      // find children with touch-action\n      var tree = map(inNodes, this.findElements, this);\n      // make sure the added nodes are accounted for\n      tree.push(filter(inNodes, this.isElement));\n      // flatten the list\n      return tree.reduce(this.concatLists, []);\n    },\n    mutationWatcher: function(mutations) {\n      mutations.forEach(this.mutationHandler, this);\n    },\n    mutationHandler: function(m) {\n      if (m.type === 'childList') {\n        var added = this.flattenMutationTree(m.addedNodes);\n        added.forEach(this.addElement, this);\n        var removed = this.flattenMutationTree(m.removedNodes);\n        removed.forEach(this.removeElement, this);\n      } else if (m.type === 'attributes') {\n        this.elementChanged(m.target, m.oldValue);\n      }\n    }\n  };\n\n  if (!MO) {\n    Installer.prototype.watchSubtree = function(){\n      console.warn('PolymerGestures: MutationObservers not found, touch-action will not be dynamically detected');\n    };\n  }\n\n  scope.Installer = Installer;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function (scope) {\n  var dispatcher = scope.dispatcher;\n  var pointermap = dispatcher.pointermap;\n  // radius around touchend that swallows mouse events\n  var DEDUP_DIST = 25;\n\n  var WHICH_TO_BUTTONS = [0, 1, 4, 2];\n\n  var HAS_BUTTONS = false;\n  try {\n    HAS_BUTTONS = new MouseEvent('test', {buttons: 1}).buttons === 1;\n  } catch (e) {}\n\n  // handler block for native mouse events\n  var mouseEvents = {\n    POINTER_ID: 1,\n    POINTER_TYPE: 'mouse',\n    events: [\n      'mousedown',\n      'mousemove',\n      'mouseup',\n    ],\n    register: function(target) {\n      dispatcher.listen(target, this.events);\n    },\n    unregister: function(target) {\n      dispatcher.unlisten(target, this.events);\n    },\n    lastTouches: [],\n    // collide with the global mouse listener\n    isEventSimulatedFromTouch: function(inEvent) {\n      var lts = this.lastTouches;\n      var x = inEvent.clientX, y = inEvent.clientY;\n      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {\n        // simulated mouse events will be swallowed near a primary touchend\n        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);\n        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {\n          return true;\n        }\n      }\n    },\n    prepareEvent: function(inEvent) {\n      var e = dispatcher.cloneEvent(inEvent);\n      e.pointerId = this.POINTER_ID;\n      e.isPrimary = true;\n      e.pointerType = this.POINTER_TYPE;\n      if (!HAS_BUTTONS) {\n        e.buttons = WHICH_TO_BUTTONS[e.which] || 0;\n      }\n      return e;\n    },\n    mousedown: function(inEvent) {\n      if (!this.isEventSimulatedFromTouch(inEvent)) {\n        var p = pointermap.has(this.POINTER_ID);\n        // TODO(dfreedman) workaround for some elements not sending mouseup\n        // http://crbug/149091\n        if (p) {\n          this.mouseup(inEvent);\n        }\n        var e = this.prepareEvent(inEvent);\n        pointermap.set(this.POINTER_ID, e.target);\n        dispatcher.down(e);\n      }\n    },\n    mousemove: function(inEvent) {\n      if (!this.isEventSimulatedFromTouch(inEvent)) {\n        var e = this.prepareEvent(inEvent);\n        e.target = pointermap.get(this.POINTER_ID);\n        dispatcher.move(e);\n      }\n    },\n    mouseup: function(inEvent) {\n      if (!this.isEventSimulatedFromTouch(inEvent)) {\n        var e = this.prepareEvent(inEvent);\n        e.relatedTarget = e.target;\n        e.target = pointermap.get(this.POINTER_ID);\n        dispatcher.up(e);\n        this.cleanupMouse();\n      }\n    },\n    cleanupMouse: function() {\n      pointermap['delete'](this.POINTER_ID);\n    }\n  };\n\n  scope.mouseEvents = mouseEvents;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n  var allShadows = scope.targetFinding.allShadows.bind(scope.targetFinding);\n  var pointermap = dispatcher.pointermap;\n  var touchMap = Array.prototype.map.call.bind(Array.prototype.map);\n  // This should be long enough to ignore compat mouse events made by touch\n  var DEDUP_TIMEOUT = 2500;\n  var CLICK_COUNT_TIMEOUT = 200;\n  var ATTRIB = 'touch-action';\n  var INSTALLER;\n  var HAS_TOUCH_ACTION = typeof document.head.style.touchAction === 'string';\n\n  // handler block for native touch events\n  var touchEvents = {\n    events: [\n      'touchstart',\n      'touchmove',\n      'touchend',\n      'touchcancel'\n    ],\n    register: function(target) {\n      if (HAS_TOUCH_ACTION) {\n        dispatcher.listen(target, this.events);\n      } else {\n        INSTALLER.enableOnSubtree(target);\n      }\n    },\n    unregister: function(target) {\n      if (HAS_TOUCH_ACTION) {\n        dispatcher.unlisten(target, this.events);\n      } else {\n        // TODO(dfreedman): is it worth it to disconnect the MO?\n      }\n    },\n    elementAdded: function(el) {\n      var a = el.getAttribute(ATTRIB);\n      var st = this.touchActionToScrollType(a);\n      if (st) {\n        el._scrollType = st;\n        dispatcher.listen(el, this.events);\n        // set touch-action on shadows as well\n        allShadows(el).forEach(function(s) {\n          s._scrollType = st;\n          dispatcher.listen(s, this.events);\n        }, this);\n      }\n    },\n    elementRemoved: function(el) {\n      el._scrollType = undefined;\n      dispatcher.unlisten(el, this.events);\n      // remove touch-action from shadow\n      allShadows(el).forEach(function(s) {\n        s._scrollType = undefined;\n        dispatcher.unlisten(s, this.events);\n      }, this);\n    },\n    elementChanged: function(el, oldValue) {\n      var a = el.getAttribute(ATTRIB);\n      var st = this.touchActionToScrollType(a);\n      var oldSt = this.touchActionToScrollType(oldValue);\n      // simply update scrollType if listeners are already established\n      if (st && oldSt) {\n        el._scrollType = st;\n        allShadows(el).forEach(function(s) {\n          s._scrollType = st;\n        }, this);\n      } else if (oldSt) {\n        this.elementRemoved(el);\n      } else if (st) {\n        this.elementAdded(el);\n      }\n    },\n    scrollTypes: {\n      EMITTER: 'none',\n      XSCROLLER: 'pan-x',\n      YSCROLLER: 'pan-y',\n      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/\n    },\n    touchActionToScrollType: function(touchAction) {\n      var t = touchAction;\n      var st = this.scrollTypes;\n      if (t === 'none') {\n        return 'none';\n      } else if (t === st.XSCROLLER) {\n        return 'X';\n      } else if (t === st.YSCROLLER) {\n        return 'Y';\n      } else if (st.SCROLLER.exec(t)) {\n        return 'XY';\n      }\n    },\n    POINTER_TYPE: 'touch',\n    firstTouch: null,\n    isPrimaryTouch: function(inTouch) {\n      return this.firstTouch === inTouch.identifier;\n    },\n    setPrimaryTouch: function(inTouch) {\n      // set primary touch if there no pointers, or the only pointer is the mouse\n      if (pointermap.pointers() === 0 || (pointermap.pointers() === 1 && pointermap.has(1))) {\n        this.firstTouch = inTouch.identifier;\n        this.firstXY = {X: inTouch.clientX, Y: inTouch.clientY};\n        this.scrolling = false;\n        this.cancelResetClickCount();\n      }\n    },\n    removePrimaryPointer: function(inPointer) {\n      if (inPointer.isPrimary) {\n        this.firstTouch = null;\n        this.firstXY = null;\n        this.resetClickCount();\n      }\n    },\n    clickCount: 0,\n    resetId: null,\n    resetClickCount: function() {\n      var fn = function() {\n        this.clickCount = 0;\n        this.resetId = null;\n      }.bind(this);\n      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);\n    },\n    cancelResetClickCount: function() {\n      if (this.resetId) {\n        clearTimeout(this.resetId);\n      }\n    },\n    typeToButtons: function(type) {\n      var ret = 0;\n      if (type === 'touchstart' || type === 'touchmove') {\n        ret = 1;\n      }\n      return ret;\n    },\n    findTarget: function(touch, id) {\n      if (this.currentTouchEvent.type === 'touchstart') {\n        return scope.findTarget(touch);\n      }\n      // reuse target we found in touchstart\n      return pointermap.get(id);\n    },\n    touchToPointer: function(inTouch) {\n      var cte = this.currentTouchEvent;\n      var e = dispatcher.cloneEvent(inTouch);\n      // Spec specifies that pointerId 1 is reserved for Mouse.\n      // Touch identifiers can start at 0.\n      // Add 2 to the touch identifier for compatibility.\n      var id = e.pointerId = inTouch.identifier + 2;\n      e.target = this.findTarget(inTouch, id);\n      e.bubbles = true;\n      e.cancelable = true;\n      e.detail = this.clickCount;\n      e.buttons = this.typeToButtons(cte.type);\n      e.width = inTouch.webkitRadiusX || inTouch.radiusX || 0;\n      e.height = inTouch.webkitRadiusY || inTouch.radiusY || 0;\n      e.pressure = inTouch.webkitForce || inTouch.force || 0.5;\n      e.isPrimary = this.isPrimaryTouch(inTouch);\n      e.pointerType = this.POINTER_TYPE;\n      // forward touch preventDefaults\n      var self = this;\n      e.preventDefault = function() {\n        self.scrolling = false;\n        self.firstXY = null;\n        cte.preventDefault();\n      };\n      return e;\n    },\n    processTouches: function(inEvent, inFunction) {\n      var tl = inEvent.changedTouches;\n      this.currentTouchEvent = inEvent;\n      for (var i = 0, t; i < tl.length; i++) {\n        t = tl[i];\n        inFunction.call(this, this.touchToPointer(t));\n      }\n    },\n    // For single axis scrollers, determines whether the element should emit\n    // pointer events or behave as a scroller\n    shouldScroll: function(inEvent) {\n      if (this.firstXY) {\n        var ret;\n        var scrollAxis = inEvent.currentTarget._scrollType;\n        if (scrollAxis === 'none') {\n          // this element is a touch-action: none, should never scroll\n          ret = false;\n        } else if (scrollAxis === 'XY') {\n          // this element should always scroll\n          ret = true;\n        } else {\n          var t = inEvent.changedTouches[0];\n          // check the intended scroll axis, and other axis\n          var a = scrollAxis;\n          var oa = scrollAxis === 'Y' ? 'X' : 'Y';\n          var da = Math.abs(t['client' + a] - this.firstXY[a]);\n          var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);\n          // if delta in the scroll axis > delta other axis, scroll instead of\n          // making events\n          ret = da >= doa;\n        }\n        this.firstXY = null;\n        return ret;\n      }\n    },\n    findTouch: function(inTL, inId) {\n      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {\n        if (t.identifier === inId) {\n          return true;\n        }\n      }\n    },\n    // In some instances, a touchstart can happen without a touchend. This\n    // leaves the pointermap in a broken state.\n    // Therefore, on every touchstart, we remove the touches that did not fire a\n    // touchend event.\n    // To keep state globally consistent, we fire a\n    // pointercancel for this \"abandoned\" touch\n    vacuumTouches: function(inEvent) {\n      var tl = inEvent.touches;\n      // pointermap.pointers() should be < tl.length here, as the touchstart has not\n      // been processed yet.\n      if (pointermap.pointers() >= tl.length) {\n        var d = [];\n        pointermap.forEach(function(value, key) {\n          // Never remove pointerId == 1, which is mouse.\n          // Touch identifiers are 2 smaller than their pointerId, which is the\n          // index in pointermap.\n          if (key !== 1 && !this.findTouch(tl, key - 2)) {\n            var p = value.out;\n            d.push(p);\n          }\n        }, this);\n        d.forEach(this.cancelOut, this);\n      }\n    },\n    touchstart: function(inEvent) {\n      this.vacuumTouches(inEvent);\n      this.setPrimaryTouch(inEvent.changedTouches[0]);\n      this.dedupSynthMouse(inEvent);\n      if (!this.scrolling) {\n        this.clickCount++;\n        this.processTouches(inEvent, this.down);\n      }\n    },\n    down: function(inPointer) {\n      var p = pointermap.set(inPointer.pointerId, inPointer.target);\n      dispatcher.down(inPointer);\n    },\n    touchmove: function(inEvent) {\n      if (HAS_TOUCH_ACTION) {\n        this.processTouches(inEvent, this.move);\n      } else {\n        if (!this.scrolling) {\n          if (this.shouldScroll(inEvent)) {\n            this.scrolling = true;\n            this.touchcancel(inEvent);\n          } else {\n            inEvent.preventDefault();\n            this.processTouches(inEvent, this.move);\n          }\n        }\n      }\n    },\n    move: function(inPointer) {\n      var pointer = pointermap.get(inPointer.pointerId);\n      // a finger drifted off the screen, ignore it\n      if (!pointer) {\n        return;\n      }\n      dispatcher.move(inPointer);\n    },\n    touchend: function(inEvent) {\n      this.dedupSynthMouse(inEvent);\n      this.processTouches(inEvent, this.up);\n    },\n    up: function(inPointer) {\n      if (!this.scrolling) {\n        inPointer.relatedTarget = scope.findTarget(inPointer);\n        dispatcher.up(inPointer);\n      }\n      this.cleanUpPointer(inPointer);\n    },\n    cancel: function(inPointer) {\n      inPointer.relatedTarget = scope.findTarget(inPointer);\n      dispatcher.cancel(inPointer);\n      this.cleanUpPointer(inPointer);\n    },\n    touchcancel: function(inEvent) {\n      this.processTouches(inEvent, this.cancel);\n    },\n    cleanUpPointer: function(inPointer) {\n      pointermap['delete'](inPointer.pointerId);\n      this.removePrimaryPointer(inPointer);\n    },\n    // prevent synth mouse events from creating pointer events\n    dedupSynthMouse: function(inEvent) {\n      var lts = scope.mouseEvents.lastTouches;\n      var t = inEvent.changedTouches[0];\n      // only the primary finger will synth mouse events\n      if (this.isPrimaryTouch(t)) {\n        // remember x/y of last touch\n        var lt = {x: t.clientX, y: t.clientY};\n        lts.push(lt);\n        var fn = (function(lts, lt){\n          var i = lts.indexOf(lt);\n          if (i > -1) {\n            lts.splice(i, 1);\n          }\n        }).bind(null, lts, lt);\n        setTimeout(fn, DEDUP_TIMEOUT);\n      }\n    }\n  };\n\n  if (!HAS_TOUCH_ACTION) {\n    INSTALLER = new scope.Installer(touchEvents.elementAdded, touchEvents.elementRemoved, touchEvents.elementChanged, touchEvents);\n  }\n\n  scope.touchEvents = touchEvents;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n  var pointermap = dispatcher.pointermap;\n  var HAS_BITMAP_TYPE = window.MSPointerEvent && typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';\n  var msEvents = {\n    events: [\n      'MSPointerDown',\n      'MSPointerMove',\n      'MSPointerUp',\n      'MSPointerCancel',\n    ],\n    register: function(target) {\n      dispatcher.listen(target, this.events);\n    },\n    unregister: function(target) {\n      dispatcher.unlisten(target, this.events);\n    },\n    POINTER_TYPES: [\n      '',\n      'unavailable',\n      'touch',\n      'pen',\n      'mouse'\n    ],\n    prepareEvent: function(inEvent) {\n      var e = inEvent;\n      if (HAS_BITMAP_TYPE) {\n        e = dispatcher.cloneEvent(inEvent);\n        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];\n      }\n      return e;\n    },\n    cleanup: function(id) {\n      pointermap['delete'](id);\n    },\n    MSPointerDown: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      pointermap.set(inEvent.pointerId, e.target);\n      dispatcher.down(e);\n    },\n    MSPointerMove: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.move(e);\n    },\n    MSPointerUp: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.relatedTarget = e.target;\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.up(e);\n      this.cleanup(inEvent.pointerId);\n    },\n    MSPointerCancel: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.relatedTarget = e.target;\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.cancel(e);\n      this.cleanup(inEvent.pointerId);\n    }\n  };\n\n  scope.msEvents = msEvents;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n  var pointermap = dispatcher.pointermap;\n  var pointerEvents = {\n    events: [\n      'pointerdown',\n      'pointermove',\n      'pointerup',\n      'pointercancel'\n    ],\n    prepareEvent: function(inEvent) {\n      return dispatcher.cloneEvent(inEvent);\n    },\n    register: function(target) {\n      dispatcher.listen(target, this.events);\n    },\n    unregister: function(target) {\n      dispatcher.unlisten(target, this.events);\n    },\n    cleanup: function(id) {\n      pointermap['delete'](id);\n    },\n    pointerdown: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      pointermap.set(e.pointerId, e.target);\n      dispatcher.down(e);\n    },\n    pointermove: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.move(e);\n    },\n    pointerup: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.relatedTarget = e.target;\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.up(e);\n      this.cleanup(inEvent.pointerId);\n    },\n    pointercancel: function(inEvent) {\n      var e = this.prepareEvent(inEvent);\n      e.relatedTarget = e.target;\n      e.target = pointermap.get(e.pointerId);\n      dispatcher.cancel(e);\n      this.cleanup(inEvent.pointerId);\n    }\n  };\n\n  scope.pointerEvents = pointerEvents;\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This module contains the handlers for native platform events.\n * From here, the dispatcher is called to create unified pointer events.\n * Included are touch events (v1), mouse events, and MSPointerEvents.\n */\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n\n  if (window.PointerEvent) {\n    dispatcher.registerSource('pointer', scope.pointerEvents);\n  } else if (window.navigator.msPointerEnabled) {\n    dispatcher.registerSource('ms', scope.msEvents);\n  } else {\n    dispatcher.registerSource('mouse', scope.mouseEvents);\n    if (window.ontouchstart !== undefined) {\n      dispatcher.registerSource('touch', scope.touchEvents);\n    }\n  }\n\n  dispatcher.register(document);\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This event denotes the beginning of a series of tracking events.\n *\n * @module PointerGestures\n * @submodule Events\n * @class trackstart\n */\n/**\n * Pixels moved in the x direction since trackstart.\n * @type Number\n * @property dx\n */\n/**\n * Pixes moved in the y direction since trackstart.\n * @type Number\n * @property dy\n */\n/**\n * Pixels moved in the x direction since the last track.\n * @type Number\n * @property ddx\n */\n/**\n * Pixles moved in the y direction since the last track.\n * @type Number\n * @property ddy\n */\n/**\n * The clientX position of the track gesture.\n * @type Number\n * @property clientX\n */\n/**\n * The clientY position of the track gesture.\n * @type Number\n * @property clientY\n */\n/**\n * The pageX position of the track gesture.\n * @type Number\n * @property pageX\n */\n/**\n * The pageY position of the track gesture.\n * @type Number\n * @property pageY\n */\n/**\n * The screenX position of the track gesture.\n * @type Number\n * @property screenX\n */\n/**\n * The screenY position of the track gesture.\n * @type Number\n * @property screenY\n */\n/**\n * The last x axis direction of the pointer.\n * @type Number\n * @property xDirection\n */\n/**\n * The last y axis direction of the pointer.\n * @type Number\n * @property yDirection\n */\n/**\n * A shared object between all tracking events.\n * @type Object\n * @property trackInfo\n */\n/**\n * The element currently under the pointer.\n * @type Element\n * @property relatedTarget\n */\n/**\n * The type of pointer that make the track gesture.\n * @type String\n * @property pointerType\n */\n/**\n *\n * This event fires for all pointer movement being tracked.\n *\n * @class track\n * @extends trackstart\n */\n/**\n * This event fires when the pointer is no longer being tracked.\n *\n * @class trackend\n * @extends trackstart\n */\n\n (function(scope) {\n   var dispatcher = scope.dispatcher;\n   var eventFactory = scope.eventFactory;\n   var pointermap = new scope.PointerMap();\n   var track = {\n     events: [\n       'down',\n       'move',\n       'up',\n     ],\n     WIGGLE_THRESHOLD: 4,\n     clampDir: function(inDelta) {\n       return inDelta > 0 ? 1 : -1;\n     },\n     calcPositionDelta: function(inA, inB) {\n       var x = 0, y = 0;\n       if (inA && inB) {\n         x = inB.pageX - inA.pageX;\n         y = inB.pageY - inA.pageY;\n       }\n       return {x: x, y: y};\n     },\n     fireTrack: function(inType, inEvent, inTrackingData) {\n       var t = inTrackingData;\n       var d = this.calcPositionDelta(t.downEvent, inEvent);\n       var dd = this.calcPositionDelta(t.lastMoveEvent, inEvent);\n       if (dd.x) {\n         t.xDirection = this.clampDir(dd.x);\n       }\n       if (dd.y) {\n         t.yDirection = this.clampDir(dd.y);\n       }\n       var e = eventFactory.makeGestureEvent(inType, {\n         bubbles: true,\n         cancelable: true,\n         dx: d.x,\n         dy: d.y,\n         ddx: dd.x,\n         ddy: dd.y,\n         x: inEvent.x,\n         y: inEvent.y,\n         clientX: inEvent.clientX,\n         clientY: inEvent.clientY,\n         pageX: inEvent.pageX,\n         pageY: inEvent.pageY,\n         screenX: inEvent.screenX,\n         screenY: inEvent.screenY,\n         xDirection: t.xDirection,\n         yDirection: t.yDirection,\n         trackInfo: t.trackInfo,\n         relatedTarget: inEvent.relatedTarget,\n         pointerType: inEvent.pointerType,\n         pointerId: inEvent.pointerId\n       });\n       t.downTarget.dispatchEvent(e);\n     },\n     down: function(inEvent) {\n       if (inEvent.isPrimary && (inEvent.pointerType === 'mouse' ? inEvent.buttons === 1 : true)) {\n         var p = {\n           downEvent: inEvent,\n           downTarget: inEvent.target,\n           trackInfo: {},\n           lastMoveEvent: null,\n           xDirection: 0,\n           yDirection: 0,\n           tracking: false\n         };\n         pointermap.set(inEvent.pointerId, p);\n       }\n     },\n     move: function(inEvent) {\n       var p = pointermap.get(inEvent.pointerId);\n       if (p) {\n         if (!p.tracking) {\n           var d = this.calcPositionDelta(p.downEvent, inEvent);\n           var move = d.x * d.x + d.y * d.y;\n           // start tracking only if finger moves more than WIGGLE_THRESHOLD\n           if (move > this.WIGGLE_THRESHOLD) {\n             p.tracking = true;\n             this.fireTrack('trackstart', p.downEvent, p);\n             this.fireTrack('track', inEvent, p);\n           }\n         } else {\n           this.fireTrack('track', inEvent, p);\n         }\n         p.lastMoveEvent = inEvent;\n       }\n     },\n     up: function(inEvent) {\n       var p = pointermap.get(inEvent.pointerId);\n       if (p) {\n         if (p.tracking) {\n           this.fireTrack('trackend', inEvent, p);\n         }\n         pointermap.delete(inEvent.pointerId);\n       }\n     }\n   };\n   dispatcher.registerGesture('track', track);\n })(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This event is fired when a pointer is held down for 200ms.\n *\n * @module PointerGestures\n * @submodule Events\n * @class hold\n */\n/**\n * Type of pointer that made the holding event.\n * @type String\n * @property pointerType\n */\n/**\n * Screen X axis position of the held pointer\n * @type Number\n * @property clientX\n */\n/**\n * Screen Y axis position of the held pointer\n * @type Number\n * @property clientY\n */\n/**\n * Type of pointer that made the holding event.\n * @type String\n * @property pointerType\n */\n/**\n * This event is fired every 200ms while a pointer is held down.\n *\n * @class holdpulse\n * @extends hold\n */\n/**\n * Milliseconds pointer has been held down.\n * @type Number\n * @property holdTime\n */\n/**\n * This event is fired when a held pointer is released or moved.\n *\n * @class released\n */\n\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n  var eventFactory = scope.eventFactory;\n  var hold = {\n    // wait at least HOLD_DELAY ms between hold and pulse events\n    HOLD_DELAY: 200,\n    // pointer can move WIGGLE_THRESHOLD pixels before not counting as a hold\n    WIGGLE_THRESHOLD: 16,\n    events: [\n      'down',\n      'move',\n      'up',\n    ],\n    heldPointer: null,\n    holdJob: null,\n    pulse: function() {\n      var hold = Date.now() - this.heldPointer.timeStamp;\n      var type = this.held ? 'holdpulse' : 'hold';\n      this.fireHold(type, hold);\n      this.held = true;\n    },\n    cancel: function() {\n      clearInterval(this.holdJob);\n      if (this.held) {\n        this.fireHold('release');\n      }\n      this.held = false;\n      this.heldPointer = null;\n      this.target = null;\n      this.holdJob = null;\n    },\n    down: function(inEvent) {\n      if (inEvent.isPrimary && !this.heldPointer) {\n        this.heldPointer = inEvent;\n        this.target = inEvent.target;\n        this.holdJob = setInterval(this.pulse.bind(this), this.HOLD_DELAY);\n      }\n    },\n    up: function(inEvent) {\n      if (this.heldPointer && this.heldPointer.pointerId === inEvent.pointerId) {\n        this.cancel();\n      }\n    },\n    move: function(inEvent) {\n      if (this.heldPointer && this.heldPointer.pointerId === inEvent.pointerId) {\n        var x = inEvent.clientX - this.heldPointer.clientX;\n        var y = inEvent.clientY - this.heldPointer.clientY;\n        if ((x * x + y * y) > this.WIGGLE_THRESHOLD) {\n          this.cancel();\n        }\n      }\n    },\n    fireHold: function(inType, inHoldTime) {\n      var p = {\n        bubbles: true,\n        cancelable: true,\n        pointerType: this.heldPointer.pointerType,\n        pointerId: this.heldPointer.pointerId,\n        x: this.heldPointer.clientX,\n        y: this.heldPointer.clientY\n      };\n      if (inHoldTime) {\n        p.holdTime = inHoldTime;\n      }\n      var e = eventFactory.makeGestureEvent(inType, p);\n      this.target.dispatchEvent(e);\n    }\n  };\n  dispatcher.registerGesture('hold', hold);\n})(window.PolymerGestures);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * This event is fired when a pointer quickly goes down and up, and is used to\n * denote activation.\n *\n * Any gesture event can prevent the tap event from being created by calling\n * `event.preventTap`.\n *\n * Any pointer event can prevent the tap by setting the `tapPrevented` property\n * on itself.\n *\n * @module PointerGestures\n * @submodule Events\n * @class tap\n */\n/**\n * X axis position of the tap.\n * @property x\n * @type Number\n */\n/**\n * Y axis position of the tap.\n * @property y\n * @type Number\n */\n/**\n * Type of the pointer that made the tap.\n * @property pointerType\n * @type String\n */\n(function(scope) {\n  var dispatcher = scope.dispatcher;\n  var eventFactory = scope.eventFactory;\n  var pointermap = new scope.PointerMap();\n  var tap = {\n    events: [\n      'down',\n      'up'\n    ],\n    down: function(inEvent) {\n      if (inEvent.isPrimary && !inEvent.tapPrevented) {\n        pointermap.set(inEvent.pointerId, {\n          target: inEvent.target,\n          buttons: inEvent.buttons,\n          x: inEvent.clientX,\n          y: inEvent.clientY\n        });\n      }\n    },\n    shouldTap: function(e, downState) {\n      if (e.pointerType === 'mouse') {\n        // only allow left click to tap for mouse\n        return downState.buttons === 1;\n      }\n      return !e.tapPrevented;\n    },\n    up: function(inEvent) {\n      var start = pointermap.get(inEvent.pointerId);\n      if (start && this.shouldTap(inEvent, start)) {\n        // up.relatedTarget is target currently under finger\n        var t = scope.targetFinding.LCA(start.target, inEvent.relatedTarget);\n        if (t) {\n          var e = eventFactory.makeGestureEvent('tap', {\n            bubbles: true,\n            cancelable: true,\n            x: inEvent.clientX,\n            y: inEvent.clientY,\n            detail: inEvent.detail,\n            pointerType: inEvent.pointerType,\n            pointerId: inEvent.pointerId,\n            altKey: inEvent.altKey,\n            ctrlKey: inEvent.ctrlKey,\n            metaKey: inEvent.metaKey,\n            shiftKey: inEvent.shiftKey\n          });\n          t.dispatchEvent(e);\n        }\n      }\n      pointermap.delete(inEvent.pointerId);\n    }\n  };\n  // patch eventFactory to remove id from tap's pointermap for preventTap calls\n  eventFactory.preventTap = function(e) {\n    return function() {\n      e.tapPrevented = true;\n      pointermap.delete(e.pointerId);\n    };\n  };\n  dispatcher.registerGesture('tap', tap);\n})(window.PolymerGestures);\n","/*\n  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>\n  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>\n  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>\n  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>\n  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>\n  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>\n  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>\n  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>\n  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>\n\n  Redistribution and use in source and binary forms, with or without\n  modification, are permitted provided that the following conditions are met:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n    * Redistributions in binary form must reproduce the above copyright\n      notice, this list of conditions and the following disclaimer in the\n      documentation and/or other materials provided with the distribution.\n\n  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY\n  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES\n  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;\n  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND\n  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF\n  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n(function (global) {\n    'use strict';\n\n    var Token,\n        TokenName,\n        Syntax,\n        Messages,\n        source,\n        index,\n        length,\n        delegate,\n        lookahead,\n        state;\n\n    Token = {\n        BooleanLiteral: 1,\n        EOF: 2,\n        Identifier: 3,\n        Keyword: 4,\n        NullLiteral: 5,\n        NumericLiteral: 6,\n        Punctuator: 7,\n        StringLiteral: 8\n    };\n\n    TokenName = {};\n    TokenName[Token.BooleanLiteral] = 'Boolean';\n    TokenName[Token.EOF] = '<end>';\n    TokenName[Token.Identifier] = 'Identifier';\n    TokenName[Token.Keyword] = 'Keyword';\n    TokenName[Token.NullLiteral] = 'Null';\n    TokenName[Token.NumericLiteral] = 'Numeric';\n    TokenName[Token.Punctuator] = 'Punctuator';\n    TokenName[Token.StringLiteral] = 'String';\n\n    Syntax = {\n        ArrayExpression: 'ArrayExpression',\n        BinaryExpression: 'BinaryExpression',\n        CallExpression: 'CallExpression',\n        ConditionalExpression: 'ConditionalExpression',\n        EmptyStatement: 'EmptyStatement',\n        ExpressionStatement: 'ExpressionStatement',\n        Identifier: 'Identifier',\n        Literal: 'Literal',\n        LabeledStatement: 'LabeledStatement',\n        LogicalExpression: 'LogicalExpression',\n        MemberExpression: 'MemberExpression',\n        ObjectExpression: 'ObjectExpression',\n        Program: 'Program',\n        Property: 'Property',\n        ThisExpression: 'ThisExpression',\n        UnaryExpression: 'UnaryExpression'\n    };\n\n    // Error messages should be identical to V8.\n    Messages = {\n        UnexpectedToken:  'Unexpected token %0',\n        UnknownLabel: 'Undefined label \\'%0\\'',\n        Redeclaration: '%0 \\'%1\\' has already been declared'\n    };\n\n    // Ensure the condition is true, otherwise throw an error.\n    // This is only to have a better contract semantic, i.e. another safety net\n    // to catch a logic error. The condition shall be fulfilled in normal case.\n    // Do NOT use this to enforce a certain condition on any user input.\n\n    function assert(condition, message) {\n        if (!condition) {\n            throw new Error('ASSERT: ' + message);\n        }\n    }\n\n    function isDecimalDigit(ch) {\n        return (ch >= 48 && ch <= 57);   // 0..9\n    }\n\n\n    // 7.2 White Space\n\n    function isWhiteSpace(ch) {\n        return (ch === 32) ||  // space\n            (ch === 9) ||      // tab\n            (ch === 0xB) ||\n            (ch === 0xC) ||\n            (ch === 0xA0) ||\n            (ch >= 0x1680 && '\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\uFEFF'.indexOf(String.fromCharCode(ch)) > 0);\n    }\n\n    // 7.3 Line Terminators\n\n    function isLineTerminator(ch) {\n        return (ch === 10) || (ch === 13) || (ch === 0x2028) || (ch === 0x2029);\n    }\n\n    // 7.6 Identifier Names and Identifiers\n\n    function isIdentifierStart(ch) {\n        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)\n            (ch >= 65 && ch <= 90) ||         // A..Z\n            (ch >= 97 && ch <= 122);          // a..z\n    }\n\n    function isIdentifierPart(ch) {\n        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)\n            (ch >= 65 && ch <= 90) ||         // A..Z\n            (ch >= 97 && ch <= 122) ||        // a..z\n            (ch >= 48 && ch <= 57);           // 0..9\n    }\n\n    // 7.6.1.1 Keywords\n\n    function isKeyword(id) {\n        return (id === 'this')\n    }\n\n    // 7.4 Comments\n\n    function skipWhitespace() {\n        while (index < length && isWhiteSpace(source.charCodeAt(index))) {\n           ++index;\n        }\n    }\n\n    function getIdentifier() {\n        var start, ch;\n\n        start = index++;\n        while (index < length) {\n            ch = source.charCodeAt(index);\n            if (isIdentifierPart(ch)) {\n                ++index;\n            } else {\n                break;\n            }\n        }\n\n        return source.slice(start, index);\n    }\n\n    function scanIdentifier() {\n        var start, id, type;\n\n        start = index;\n\n        id = getIdentifier();\n\n        // There is no keyword or literal with only one character.\n        // Thus, it must be an identifier.\n        if (id.length === 1) {\n            type = Token.Identifier;\n        } else if (isKeyword(id)) {\n            type = Token.Keyword;\n        } else if (id === 'null') {\n            type = Token.NullLiteral;\n        } else if (id === 'true' || id === 'false') {\n            type = Token.BooleanLiteral;\n        } else {\n            type = Token.Identifier;\n        }\n\n        return {\n            type: type,\n            value: id,\n            range: [start, index]\n        };\n    }\n\n\n    // 7.7 Punctuators\n\n    function scanPunctuator() {\n        var start = index,\n            code = source.charCodeAt(index),\n            code2,\n            ch1 = source[index],\n            ch2;\n\n        switch (code) {\n\n        // Check for most common single-character punctuators.\n        case 46:   // . dot\n        case 40:   // ( open bracket\n        case 41:   // ) close bracket\n        case 59:   // ; semicolon\n        case 44:   // , comma\n        case 123:  // { open curly brace\n        case 125:  // } close curly brace\n        case 91:   // [\n        case 93:   // ]\n        case 58:   // :\n        case 63:   // ?\n            ++index;\n            return {\n                type: Token.Punctuator,\n                value: String.fromCharCode(code),\n                range: [start, index]\n            };\n\n        default:\n            code2 = source.charCodeAt(index + 1);\n\n            // '=' (char #61) marks an assignment or comparison operator.\n            if (code2 === 61) {\n                switch (code) {\n                case 37:  // %\n                case 38:  // &\n                case 42:  // *:\n                case 43:  // +\n                case 45:  // -\n                case 47:  // /\n                case 60:  // <\n                case 62:  // >\n                case 124: // |\n                    index += 2;\n                    return {\n                        type: Token.Punctuator,\n                        value: String.fromCharCode(code) + String.fromCharCode(code2),\n                        range: [start, index]\n                    };\n\n                case 33: // !\n                case 61: // =\n                    index += 2;\n\n                    // !== and ===\n                    if (source.charCodeAt(index) === 61) {\n                        ++index;\n                    }\n                    return {\n                        type: Token.Punctuator,\n                        value: source.slice(start, index),\n                        range: [start, index]\n                    };\n                default:\n                    break;\n                }\n            }\n            break;\n        }\n\n        // Peek more characters.\n\n        ch2 = source[index + 1];\n\n        // Other 2-character punctuators: && ||\n\n        if (ch1 === ch2 && ('&|'.indexOf(ch1) >= 0)) {\n            index += 2;\n            return {\n                type: Token.Punctuator,\n                value: ch1 + ch2,\n                range: [start, index]\n            };\n        }\n\n        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {\n            ++index;\n            return {\n                type: Token.Punctuator,\n                value: ch1,\n                range: [start, index]\n            };\n        }\n\n        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');\n    }\n\n    // 7.8.3 Numeric Literals\n    function scanNumericLiteral() {\n        var number, start, ch;\n\n        ch = source[index];\n        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),\n            'Numeric literal must start with a decimal digit or a decimal point');\n\n        start = index;\n        number = '';\n        if (ch !== '.') {\n            number = source[index++];\n            ch = source[index];\n\n            // Hex number starts with '0x'.\n            // Octal number starts with '0'.\n            if (number === '0') {\n                // decimal number starts with '0' such as '09' is illegal.\n                if (ch && isDecimalDigit(ch.charCodeAt(0))) {\n                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');\n                }\n            }\n\n            while (isDecimalDigit(source.charCodeAt(index))) {\n                number += source[index++];\n            }\n            ch = source[index];\n        }\n\n        if (ch === '.') {\n            number += source[index++];\n            while (isDecimalDigit(source.charCodeAt(index))) {\n                number += source[index++];\n            }\n            ch = source[index];\n        }\n\n        if (ch === 'e' || ch === 'E') {\n            number += source[index++];\n\n            ch = source[index];\n            if (ch === '+' || ch === '-') {\n                number += source[index++];\n            }\n            if (isDecimalDigit(source.charCodeAt(index))) {\n                while (isDecimalDigit(source.charCodeAt(index))) {\n                    number += source[index++];\n                }\n            } else {\n                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');\n            }\n        }\n\n        if (isIdentifierStart(source.charCodeAt(index))) {\n            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');\n        }\n\n        return {\n            type: Token.NumericLiteral,\n            value: parseFloat(number),\n            range: [start, index]\n        };\n    }\n\n    // 7.8.4 String Literals\n\n    function scanStringLiteral() {\n        var str = '', quote, start, ch, octal = false;\n\n        quote = source[index];\n        assert((quote === '\\'' || quote === '\"'),\n            'String literal must starts with a quote');\n\n        start = index;\n        ++index;\n\n        while (index < length) {\n            ch = source[index++];\n\n            if (ch === quote) {\n                quote = '';\n                break;\n            } else if (ch === '\\\\') {\n                ch = source[index++];\n                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {\n                    switch (ch) {\n                    case 'n':\n                        str += '\\n';\n                        break;\n                    case 'r':\n                        str += '\\r';\n                        break;\n                    case 't':\n                        str += '\\t';\n                        break;\n                    case 'b':\n                        str += '\\b';\n                        break;\n                    case 'f':\n                        str += '\\f';\n                        break;\n                    case 'v':\n                        str += '\\x0B';\n                        break;\n\n                    default:\n                        str += ch;\n                        break;\n                    }\n                } else {\n                    if (ch ===  '\\r' && source[index] === '\\n') {\n                        ++index;\n                    }\n                }\n            } else if (isLineTerminator(ch.charCodeAt(0))) {\n                break;\n            } else {\n                str += ch;\n            }\n        }\n\n        if (quote !== '') {\n            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');\n        }\n\n        return {\n            type: Token.StringLiteral,\n            value: str,\n            octal: octal,\n            range: [start, index]\n        };\n    }\n\n    function isIdentifierName(token) {\n        return token.type === Token.Identifier ||\n            token.type === Token.Keyword ||\n            token.type === Token.BooleanLiteral ||\n            token.type === Token.NullLiteral;\n    }\n\n    function advance() {\n        var ch;\n\n        skipWhitespace();\n\n        if (index >= length) {\n            return {\n                type: Token.EOF,\n                range: [index, index]\n            };\n        }\n\n        ch = source.charCodeAt(index);\n\n        // Very common: ( and ) and ;\n        if (ch === 40 || ch === 41 || ch === 58) {\n            return scanPunctuator();\n        }\n\n        // String literal starts with single quote (#39) or double quote (#34).\n        if (ch === 39 || ch === 34) {\n            return scanStringLiteral();\n        }\n\n        if (isIdentifierStart(ch)) {\n            return scanIdentifier();\n        }\n\n        // Dot (.) char #46 can also start a floating-point number, hence the need\n        // to check the next character.\n        if (ch === 46) {\n            if (isDecimalDigit(source.charCodeAt(index + 1))) {\n                return scanNumericLiteral();\n            }\n            return scanPunctuator();\n        }\n\n        if (isDecimalDigit(ch)) {\n            return scanNumericLiteral();\n        }\n\n        return scanPunctuator();\n    }\n\n    function lex() {\n        var token;\n\n        token = lookahead;\n        index = token.range[1];\n\n        lookahead = advance();\n\n        index = token.range[1];\n\n        return token;\n    }\n\n    function peek() {\n        var pos;\n\n        pos = index;\n        lookahead = advance();\n        index = pos;\n    }\n\n    // Throw an exception\n\n    function throwError(token, messageFormat) {\n        var error,\n            args = Array.prototype.slice.call(arguments, 2),\n            msg = messageFormat.replace(\n                /%(\\d)/g,\n                function (whole, index) {\n                    assert(index < args.length, 'Message reference must be in range');\n                    return args[index];\n                }\n            );\n\n        error = new Error(msg);\n        error.index = index;\n        error.description = msg;\n        throw error;\n    }\n\n    // Throw an exception because of the token.\n\n    function throwUnexpected(token) {\n        throwError(token, Messages.UnexpectedToken, token.value);\n    }\n\n    // Expect the next token to match the specified punctuator.\n    // If not, an exception will be thrown.\n\n    function expect(value) {\n        var token = lex();\n        if (token.type !== Token.Punctuator || token.value !== value) {\n            throwUnexpected(token);\n        }\n    }\n\n    // Return true if the next token matches the specified punctuator.\n\n    function match(value) {\n        return lookahead.type === Token.Punctuator && lookahead.value === value;\n    }\n\n    // Return true if the next token matches the specified keyword\n\n    function matchKeyword(keyword) {\n        return lookahead.type === Token.Keyword && lookahead.value === keyword;\n    }\n\n    function consumeSemicolon() {\n        // Catch the very common case first: immediately a semicolon (char #59).\n        if (source.charCodeAt(index) === 59) {\n            lex();\n            return;\n        }\n\n        skipWhitespace();\n\n        if (match(';')) {\n            lex();\n            return;\n        }\n\n        if (lookahead.type !== Token.EOF && !match('}')) {\n            throwUnexpected(lookahead);\n        }\n    }\n\n    // 11.1.4 Array Initialiser\n\n    function parseArrayInitialiser() {\n        var elements = [];\n\n        expect('[');\n\n        while (!match(']')) {\n            if (match(',')) {\n                lex();\n                elements.push(null);\n            } else {\n                elements.push(parseExpression());\n\n                if (!match(']')) {\n                    expect(',');\n                }\n            }\n        }\n\n        expect(']');\n\n        return delegate.createArrayExpression(elements);\n    }\n\n    // 11.1.5 Object Initialiser\n\n    function parseObjectPropertyKey() {\n        var token;\n\n        skipWhitespace();\n        token = lex();\n\n        // Note: This function is called only from parseObjectProperty(), where\n        // EOF and Punctuator tokens are already filtered out.\n        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {\n            return delegate.createLiteral(token);\n        }\n\n        return delegate.createIdentifier(token.value);\n    }\n\n    function parseObjectProperty() {\n        var token, key;\n\n        token = lookahead;\n        skipWhitespace();\n\n        if (token.type === Token.EOF || token.type === Token.Punctuator) {\n            throwUnexpected(token);\n        }\n\n        key = parseObjectPropertyKey();\n        expect(':');\n        return delegate.createProperty('init', key, parseExpression());\n    }\n\n    function parseObjectInitialiser() {\n        var properties = [];\n\n        expect('{');\n\n        while (!match('}')) {\n            properties.push(parseObjectProperty());\n\n            if (!match('}')) {\n                expect(',');\n            }\n        }\n\n        expect('}');\n\n        return delegate.createObjectExpression(properties);\n    }\n\n    // 11.1.6 The Grouping Operator\n\n    function parseGroupExpression() {\n        var expr;\n\n        expect('(');\n\n        expr = parseExpression();\n\n        expect(')');\n\n        return expr;\n    }\n\n\n    // 11.1 Primary Expressions\n\n    function parsePrimaryExpression() {\n        var type, token, expr;\n\n        if (match('(')) {\n            return parseGroupExpression();\n        }\n\n        type = lookahead.type;\n\n        if (type === Token.Identifier) {\n            expr = delegate.createIdentifier(lex().value);\n        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {\n            expr = delegate.createLiteral(lex());\n        } else if (type === Token.Keyword) {\n            if (matchKeyword('this')) {\n                lex();\n                expr = delegate.createThisExpression();\n            }\n        } else if (type === Token.BooleanLiteral) {\n            token = lex();\n            token.value = (token.value === 'true');\n            expr = delegate.createLiteral(token);\n        } else if (type === Token.NullLiteral) {\n            token = lex();\n            token.value = null;\n            expr = delegate.createLiteral(token);\n        } else if (match('[')) {\n            expr = parseArrayInitialiser();\n        } else if (match('{')) {\n            expr = parseObjectInitialiser();\n        }\n\n        if (expr) {\n            return expr;\n        }\n\n        throwUnexpected(lex());\n    }\n\n    // 11.2 Left-Hand-Side Expressions\n\n    function parseArguments() {\n        var args = [];\n\n        expect('(');\n\n        if (!match(')')) {\n            while (index < length) {\n                args.push(parseExpression());\n                if (match(')')) {\n                    break;\n                }\n                expect(',');\n            }\n        }\n\n        expect(')');\n\n        return args;\n    }\n\n    function parseNonComputedProperty() {\n        var token;\n\n        token = lex();\n\n        if (!isIdentifierName(token)) {\n            throwUnexpected(token);\n        }\n\n        return delegate.createIdentifier(token.value);\n    }\n\n    function parseNonComputedMember() {\n        expect('.');\n\n        return parseNonComputedProperty();\n    }\n\n    function parseComputedMember() {\n        var expr;\n\n        expect('[');\n\n        expr = parseExpression();\n\n        expect(']');\n\n        return expr;\n    }\n\n    function parseLeftHandSideExpression() {\n        var expr, property;\n\n        expr = parsePrimaryExpression();\n\n        while (match('.') || match('[')) {\n            if (match('[')) {\n                property = parseComputedMember();\n                expr = delegate.createMemberExpression('[', expr, property);\n            } else {\n                property = parseNonComputedMember();\n                expr = delegate.createMemberExpression('.', expr, property);\n            }\n        }\n\n        return expr;\n    }\n\n    // 11.3 Postfix Expressions\n\n    var parsePostfixExpression = parseLeftHandSideExpression;\n\n    // 11.4 Unary Operators\n\n    function parseUnaryExpression() {\n        var token, expr;\n\n        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {\n            expr = parsePostfixExpression();\n        } else if (match('+') || match('-') || match('!')) {\n            token = lex();\n            expr = parseUnaryExpression();\n            expr = delegate.createUnaryExpression(token.value, expr);\n        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {\n            throwError({}, Messages.UnexpectedToken);\n        } else {\n            expr = parsePostfixExpression();\n        }\n\n        return expr;\n    }\n\n    function binaryPrecedence(token) {\n        var prec = 0;\n\n        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {\n            return 0;\n        }\n\n        switch (token.value) {\n        case '||':\n            prec = 1;\n            break;\n\n        case '&&':\n            prec = 2;\n            break;\n\n        case '==':\n        case '!=':\n        case '===':\n        case '!==':\n            prec = 6;\n            break;\n\n        case '<':\n        case '>':\n        case '<=':\n        case '>=':\n        case 'instanceof':\n            prec = 7;\n            break;\n\n        case 'in':\n            prec = 7;\n            break;\n\n        case '+':\n        case '-':\n            prec = 9;\n            break;\n\n        case '*':\n        case '/':\n        case '%':\n            prec = 11;\n            break;\n\n        default:\n            break;\n        }\n\n        return prec;\n    }\n\n    // 11.5 Multiplicative Operators\n    // 11.6 Additive Operators\n    // 11.7 Bitwise Shift Operators\n    // 11.8 Relational Operators\n    // 11.9 Equality Operators\n    // 11.10 Binary Bitwise Operators\n    // 11.11 Binary Logical Operators\n\n    function parseBinaryExpression() {\n        var expr, token, prec, stack, right, operator, left, i;\n\n        left = parseUnaryExpression();\n\n        token = lookahead;\n        prec = binaryPrecedence(token);\n        if (prec === 0) {\n            return left;\n        }\n        token.prec = prec;\n        lex();\n\n        right = parseUnaryExpression();\n\n        stack = [left, token, right];\n\n        while ((prec = binaryPrecedence(lookahead)) > 0) {\n\n            // Reduce: make a binary expression from the three topmost entries.\n            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {\n                right = stack.pop();\n                operator = stack.pop().value;\n                left = stack.pop();\n                expr = delegate.createBinaryExpression(operator, left, right);\n                stack.push(expr);\n            }\n\n            // Shift.\n            token = lex();\n            token.prec = prec;\n            stack.push(token);\n            expr = parseUnaryExpression();\n            stack.push(expr);\n        }\n\n        // Final reduce to clean-up the stack.\n        i = stack.length - 1;\n        expr = stack[i];\n        while (i > 1) {\n            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);\n            i -= 2;\n        }\n\n        return expr;\n    }\n\n\n    // 11.12 Conditional Operator\n\n    function parseConditionalExpression() {\n        var expr, consequent, alternate;\n\n        expr = parseBinaryExpression();\n\n        if (match('?')) {\n            lex();\n            consequent = parseConditionalExpression();\n            expect(':');\n            alternate = parseConditionalExpression();\n\n            expr = delegate.createConditionalExpression(expr, consequent, alternate);\n        }\n\n        return expr;\n    }\n\n    // Simplification since we do not support AssignmentExpression.\n    var parseExpression = parseConditionalExpression;\n\n    // Polymer Syntax extensions\n\n    // Filter ::\n    //   Identifier\n    //   Identifier \"(\" \")\"\n    //   Identifier \"(\" FilterArguments \")\"\n\n    function parseFilter() {\n        var identifier, args;\n\n        identifier = lex();\n\n        if (identifier.type !== Token.Identifier) {\n            throwUnexpected(identifier);\n        }\n\n        args = match('(') ? parseArguments() : [];\n\n        return delegate.createFilter(identifier.value, args);\n    }\n\n    // Filters ::\n    //   \"|\" Filter\n    //   Filters \"|\" Filter\n\n    function parseFilters() {\n        while (match('|')) {\n            lex();\n            parseFilter();\n        }\n    }\n\n    // TopLevel ::\n    //   LabelledExpressions\n    //   AsExpression\n    //   InExpression\n    //   FilterExpression\n\n    // AsExpression ::\n    //   FilterExpression as Identifier\n\n    // InExpression ::\n    //   Identifier, Identifier in FilterExpression\n    //   Identifier in FilterExpression\n\n    // FilterExpression ::\n    //   Expression\n    //   Expression Filters\n\n    function parseTopLevel() {\n        skipWhitespace();\n        peek();\n\n        var expr = parseExpression();\n        if (expr) {\n            if (lookahead.value === ',' || lookahead.value == 'in' &&\n                       expr.type === Syntax.Identifier) {\n                parseInExpression(expr);\n            } else {\n                parseFilters();\n                if (lookahead.value === 'as') {\n                    parseAsExpression(expr);\n                } else {\n                    delegate.createTopLevel(expr);\n                }\n            }\n        }\n\n        if (lookahead.type !== Token.EOF) {\n            throwUnexpected(lookahead);\n        }\n    }\n\n    function parseAsExpression(expr) {\n        lex();  // as\n        var identifier = lex().value;\n        delegate.createAsExpression(expr, identifier);\n    }\n\n    function parseInExpression(identifier) {\n        var indexName;\n        if (lookahead.value === ',') {\n            lex();\n            if (lookahead.type !== Token.Identifier)\n                throwUnexpected(lookahead);\n            indexName = lex().value;\n        }\n\n        lex();  // in\n        var expr = parseExpression();\n        parseFilters();\n        delegate.createInExpression(identifier.name, indexName, expr);\n    }\n\n    function parse(code, inDelegate) {\n        delegate = inDelegate;\n        source = code;\n        index = 0;\n        length = source.length;\n        lookahead = null;\n        state = {\n            labelSet: {}\n        };\n\n        return parseTopLevel();\n    }\n\n    global.esprima = {\n        parse: parse\n    };\n})(this);\n","// Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n// This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n// The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n// The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n// Code distributed by Google as part of the polymer project is also\n// subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\n(function (global) {\n  'use strict';\n\n  function prepareBinding(expressionText, name, node, filterRegistry) {\n    var expression;\n    try {\n      expression = getExpression(expressionText);\n      if (expression.scopeIdent &&\n          (node.nodeType !== Node.ELEMENT_NODE ||\n           node.tagName !== 'TEMPLATE' ||\n           (name !== 'bind' && name !== 'repeat'))) {\n        throw Error('as and in can only be used within <template bind/repeat>');\n      }\n    } catch (ex) {\n      console.error('Invalid expression syntax: ' + expressionText, ex);\n      return;\n    }\n\n    return function(model, node, oneTime) {\n      var binding = expression.getBinding(model, filterRegistry, oneTime);\n      if (expression.scopeIdent && binding) {\n        node.polymerExpressionScopeIdent_ = expression.scopeIdent;\n        if (expression.indexIdent)\n          node.polymerExpressionIndexIdent_ = expression.indexIdent;\n      }\n\n      return binding;\n    }\n  }\n\n  // TODO(rafaelw): Implement simple LRU.\n  var expressionParseCache = Object.create(null);\n\n  function getExpression(expressionText) {\n    var expression = expressionParseCache[expressionText];\n    if (!expression) {\n      var delegate = new ASTDelegate();\n      esprima.parse(expressionText, delegate);\n      expression = new Expression(delegate);\n      expressionParseCache[expressionText] = expression;\n    }\n    return expression;\n  }\n\n  function Literal(value) {\n    this.value = value;\n    this.valueFn_ = undefined;\n  }\n\n  Literal.prototype = {\n    valueFn: function() {\n      if (!this.valueFn_) {\n        var value = this.value;\n        this.valueFn_ = function() {\n          return value;\n        }\n      }\n\n      return this.valueFn_;\n    }\n  }\n\n  function IdentPath(name) {\n    this.name = name;\n    this.path = Path.get(name);\n  }\n\n  IdentPath.prototype = {\n    valueFn: function() {\n      if (!this.valueFn_) {\n        var name = this.name;\n        var path = this.path;\n        this.valueFn_ = function(model, observer) {\n          if (observer)\n            observer.addPath(model, path);\n\n          return path.getValueFrom(model);\n        }\n      }\n\n      return this.valueFn_;\n    },\n\n    setValue: function(model, newValue) {\n      if (this.path.length == 1);\n        model = findScope(model, this.path[0]);\n\n      return this.path.setValueFrom(model, newValue);\n    }\n  };\n\n  function MemberExpression(object, property, accessor) {\n    this.computed = accessor == '[';\n\n    this.dynamicDeps = typeof object == 'function' ||\n                       object.dynamicDeps ||\n                       (this.computed && !(property instanceof Literal));\n\n    this.simplePath =\n        !this.dynamicDeps &&\n        (property instanceof IdentPath || property instanceof Literal) &&\n        (object instanceof MemberExpression || object instanceof IdentPath);\n\n    this.object = this.simplePath ? object : getFn(object);\n    this.property = !this.computed ? property : getFn(property);\n  }\n\n  MemberExpression.prototype = {\n    get fullPath() {\n      if (!this.fullPath_) {\n\n        var parts = this.object instanceof MemberExpression ?\n            this.object.fullPath.slice() : [this.object.name];\n        parts.push(this.property instanceof IdentPath ?\n            this.property.name : this.property.value);\n        this.fullPath_ = Path.get(parts);\n      }\n\n      return this.fullPath_;\n    },\n\n    valueFn: function() {\n      if (!this.valueFn_) {\n        var object = this.object;\n\n        if (this.simplePath) {\n          var path = this.fullPath;\n\n          this.valueFn_ = function(model, observer) {\n            if (observer)\n              observer.addPath(model, path);\n\n            return path.getValueFrom(model);\n          };\n        } else if (!this.computed) {\n          var path = Path.get(this.property.name);\n\n          this.valueFn_ = function(model, observer) {\n            var context = object(model, observer);\n\n            if (observer)\n              observer.addPath(context, path);\n\n            return path.getValueFrom(context);\n          }\n        } else {\n          // Computed property.\n          var property = this.property;\n\n          this.valueFn_ = function(model, observer) {\n            var context = object(model, observer);\n            var propName = property(model, observer);\n            if (observer)\n              observer.addPath(context, [propName]);\n\n            return context ? context[propName] : undefined;\n          };\n        }\n      }\n      return this.valueFn_;\n    },\n\n    setValue: function(model, newValue) {\n      if (this.simplePath) {\n        this.fullPath.setValueFrom(model, newValue);\n        return newValue;\n      }\n\n      var object = this.object(model);\n      var propName = this.property instanceof IdentPath ? this.property.name :\n          this.property(model);\n      return object[propName] = newValue;\n    }\n  };\n\n  function Filter(name, args) {\n    this.name = name;\n    this.args = [];\n    for (var i = 0; i < args.length; i++) {\n      this.args[i] = getFn(args[i]);\n    }\n  }\n\n  Filter.prototype = {\n    transform: function(value, toModelDirection, filterRegistry, model,\n                        observer) {\n      var fn = filterRegistry[this.name];\n      var context = model;\n      if (fn) {\n        context = undefined;\n      } else {\n        fn = context[this.name];\n        if (!fn) {\n          console.error('Cannot find filter: ' + this.name);\n          return;\n        }\n      }\n\n      // If toModelDirection is falsey, then the \"normal\" (dom-bound) direction\n      // is used. Otherwise, it looks for a 'toModel' property function on the\n      // object.\n      if (toModelDirection) {\n        fn = fn.toModel;\n      } else if (typeof fn.toDOM == 'function') {\n        fn = fn.toDOM;\n      }\n\n      if (typeof fn != 'function') {\n        console.error('No ' + (toModelDirection ? 'toModel' : 'toDOM') +\n                      ' found on' + this.name);\n        return;\n      }\n\n      var args = [value];\n      for (var i = 0; i < this.args.length; i++) {\n        args[i + 1] = getFn(this.args[i])(model, observer);\n      }\n\n      return fn.apply(context, args);\n    }\n  };\n\n  function notImplemented() { throw Error('Not Implemented'); }\n\n  var unaryOperators = {\n    '+': function(v) { return +v; },\n    '-': function(v) { return -v; },\n    '!': function(v) { return !v; }\n  };\n\n  var binaryOperators = {\n    '+': function(l, r) { return l+r; },\n    '-': function(l, r) { return l-r; },\n    '*': function(l, r) { return l*r; },\n    '/': function(l, r) { return l/r; },\n    '%': function(l, r) { return l%r; },\n    '<': function(l, r) { return l<r; },\n    '>': function(l, r) { return l>r; },\n    '<=': function(l, r) { return l<=r; },\n    '>=': function(l, r) { return l>=r; },\n    '==': function(l, r) { return l==r; },\n    '!=': function(l, r) { return l!=r; },\n    '===': function(l, r) { return l===r; },\n    '!==': function(l, r) { return l!==r; },\n    '&&': function(l, r) { return l&&r; },\n    '||': function(l, r) { return l||r; },\n  };\n\n  function getFn(arg) {\n    return typeof arg == 'function' ? arg : arg.valueFn();\n  }\n\n  function ASTDelegate() {\n    this.expression = null;\n    this.filters = [];\n    this.deps = {};\n    this.currentPath = undefined;\n    this.scopeIdent = undefined;\n    this.indexIdent = undefined;\n    this.dynamicDeps = false;\n  }\n\n  ASTDelegate.prototype = {\n    createUnaryExpression: function(op, argument) {\n      if (!unaryOperators[op])\n        throw Error('Disallowed operator: ' + op);\n\n      argument = getFn(argument);\n\n      return function(model, observer) {\n        return unaryOperators[op](argument(model, observer));\n      };\n    },\n\n    createBinaryExpression: function(op, left, right) {\n      if (!binaryOperators[op])\n        throw Error('Disallowed operator: ' + op);\n\n      left = getFn(left);\n      right = getFn(right);\n\n      return function(model, observer) {\n        return binaryOperators[op](left(model, observer),\n                                   right(model, observer));\n      };\n    },\n\n    createConditionalExpression: function(test, consequent, alternate) {\n      test = getFn(test);\n      consequent = getFn(consequent);\n      alternate = getFn(alternate);\n\n      return function(model, observer) {\n        return test(model, observer) ?\n            consequent(model, observer) : alternate(model, observer);\n      }\n    },\n\n    createIdentifier: function(name) {\n      var ident = new IdentPath(name);\n      ident.type = 'Identifier';\n      return ident;\n    },\n\n    createMemberExpression: function(accessor, object, property) {\n      var ex = new MemberExpression(object, property, accessor);\n      if (ex.dynamicDeps)\n        this.dynamicDeps = true;\n      return ex;\n    },\n\n    createLiteral: function(token) {\n      return new Literal(token.value);\n    },\n\n    createArrayExpression: function(elements) {\n      for (var i = 0; i < elements.length; i++)\n        elements[i] = getFn(elements[i]);\n\n      return function(model, observer) {\n        var arr = []\n        for (var i = 0; i < elements.length; i++)\n          arr.push(elements[i](model, observer));\n        return arr;\n      }\n    },\n\n    createProperty: function(kind, key, value) {\n      return {\n        key: key instanceof IdentPath ? key.name : key.value,\n        value: value\n      };\n    },\n\n    createObjectExpression: function(properties) {\n      for (var i = 0; i < properties.length; i++)\n        properties[i].value = getFn(properties[i].value);\n\n      return function(model, observer) {\n        var obj = {};\n        for (var i = 0; i < properties.length; i++)\n          obj[properties[i].key] = properties[i].value(model, observer);\n        return obj;\n      }\n    },\n\n    createFilter: function(name, args) {\n      this.filters.push(new Filter(name, args));\n    },\n\n    createAsExpression: function(expression, scopeIdent) {\n      this.expression = expression;\n      this.scopeIdent = scopeIdent;\n    },\n\n    createInExpression: function(scopeIdent, indexIdent, expression) {\n      this.expression = expression;\n      this.scopeIdent = scopeIdent;\n      this.indexIdent = indexIdent;\n    },\n\n    createTopLevel: function(expression) {\n      this.expression = expression;\n    },\n\n    createThisExpression: notImplemented\n  }\n\n  function ConstantObservable(value) {\n    this.value_ = value;\n  }\n\n  ConstantObservable.prototype = {\n    open: function() { return this.value_; },\n    discardChanges: function() { return this.value_; },\n    deliver: function() {},\n    close: function() {},\n  }\n\n  function Expression(delegate) {\n    this.scopeIdent = delegate.scopeIdent;\n    this.indexIdent = delegate.indexIdent;\n\n    if (!delegate.expression)\n      throw Error('No expression found.');\n\n    this.expression = delegate.expression;\n    getFn(this.expression); // forces enumeration of path dependencies\n\n    this.filters = delegate.filters;\n    this.dynamicDeps = delegate.dynamicDeps;\n  }\n\n  Expression.prototype = {\n    getBinding: function(model, filterRegistry, oneTime) {\n      if (oneTime)\n        return this.getValue(model, undefined, filterRegistry);\n\n      var observer = new CompoundObserver();\n      // captures deps.\n      var firstValue = this.getValue(model, observer, filterRegistry);\n      var firstTime = true;\n      var self = this;\n\n      function valueFn() {\n        // deps cannot have changed on first value retrieval.\n        if (firstTime) {\n          firstTime = false;\n          return firstValue;\n        }\n\n        if (self.dynamicDeps)\n          observer.startReset();\n\n        var value = self.getValue(model,\n                                  self.dynamicDeps ? observer : undefined,\n                                  filterRegistry);\n        if (self.dynamicDeps)\n          observer.finishReset();\n\n        return value;\n      }\n\n      function setValueFn(newValue) {\n        self.setValue(model, newValue, filterRegistry);\n        return newValue;\n      }\n\n      return new ObserverTransform(observer, valueFn, setValueFn, true);\n    },\n\n    getValue: function(model, observer, filterRegistry) {\n      var value = getFn(this.expression)(model, observer);\n      for (var i = 0; i < this.filters.length; i++) {\n        value = this.filters[i].transform(value, false, filterRegistry, model,\n                                          observer);\n      }\n\n      return value;\n    },\n\n    setValue: function(model, newValue, filterRegistry) {\n      var count = this.filters ? this.filters.length : 0;\n      while (count-- > 0) {\n        newValue = this.filters[count].transform(newValue, true, filterRegistry,\n                                                 model);\n      }\n\n      if (this.expression.setValue)\n        return this.expression.setValue(model, newValue);\n    }\n  }\n\n  /**\n   * Converts a style property name to a css property name. For example:\n   * \"WebkitUserSelect\" to \"-webkit-user-select\"\n   */\n  function convertStylePropertyName(name) {\n    return String(name).replace(/[A-Z]/g, function(c) {\n      return '-' + c.toLowerCase();\n    });\n  }\n\n  var parentScopeName = '@' + Math.random().toString(36).slice(2);\n\n  // Single ident paths must bind directly to the appropriate scope object.\n  // I.e. Pushed values in two-bindings need to be assigned to the actual model\n  // object.\n  function findScope(model, prop) {\n    while (model[parentScopeName] &&\n           !Object.prototype.hasOwnProperty.call(model, prop)) {\n      model = model[parentScopeName];\n    }\n\n    return model;\n  }\n\n  function isLiteralExpression(pathString) {\n    switch (pathString) {\n      case '':\n        return false;\n\n      case 'false':\n      case 'null':\n      case 'true':\n        return true;\n    }\n\n    if (!isNaN(Number(pathString)))\n      return true;\n\n    return false;\n  };\n\n  function PolymerExpressions() {}\n\n  PolymerExpressions.prototype = {\n    // \"built-in\" filters\n    styleObject: function(value) {\n      var parts = [];\n      for (var key in value) {\n        parts.push(convertStylePropertyName(key) + ': ' + value[key]);\n      }\n      return parts.join('; ');\n    },\n\n    tokenList: function(value) {\n      var tokens = [];\n      for (var key in value) {\n        if (value[key])\n          tokens.push(key);\n      }\n      return tokens.join(' ');\n    },\n\n    // binding delegate API\n    prepareInstancePositionChanged: function(template) {\n      var indexIdent = template.polymerExpressionIndexIdent_;\n      if (!indexIdent)\n        return;\n\n      return function(templateInstance, index) {\n        templateInstance.model[indexIdent] = index;\n      };\n    },\n\n    prepareBinding: function(pathString, name, node) {\n      var path = Path.get(pathString);\n\n      if (!isLiteralExpression(pathString) && path.valid) {\n        if (path.length == 1) {\n          return function(model, node, oneTime) {\n            if (oneTime)\n              return path.getValueFrom(model);\n\n            var scope = findScope(model, path[0]);\n            return new PathObserver(scope, path);\n          };\n        }\n        return; // bail out early if pathString is simple path.\n      }\n\n      return prepareBinding(pathString, name, node, this);\n    },\n\n    prepareInstanceModel: function(template) {\n      var scopeName = template.polymerExpressionScopeIdent_;\n      if (!scopeName)\n        return;\n\n      var parentScope = template.templateInstance ?\n          template.templateInstance.model :\n          template.model;\n\n      var indexName = template.polymerExpressionIndexIdent_;\n\n      return function(model) {\n        return createScopeObject(parentScope, model, scopeName, indexName);\n      };\n    }\n  };\n\n  var createScopeObject = ('__proto__' in {}) ?\n    function(parentScope, model, scopeName, indexName) {\n      var scope = {};\n      scope[scopeName] = model;\n      scope[indexName] = undefined;\n      scope[parentScopeName] = parentScope;\n      scope.__proto__ = parentScope;\n      return scope;\n    } :\n    function(parentScope, model, scopeName, indexName) {\n      var scope = Object.create(parentScope);\n      Object.defineProperty(scope, scopeName,\n          { value: model, configurable: true, writable: true });\n      Object.defineProperty(scope, indexName,\n          { value: undefined, configurable: true, writable: true });\n      Object.defineProperty(scope, parentScopeName,\n          { value: parentScope, configurable: true, writable: true });\n      return scope;\n    };\n\n  global.PolymerExpressions = PolymerExpressions;\n  if (global.exposeGetExpression)\n    global.getExpression_ = getExpression;\n\n})(this);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\nPolymer = {\n  version: '0.3.1'\n};\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n// TODO(sorvell): this ensures Polymer is an object and not a function\n// Platform is currently defining it as a function to allow for async loading\n// of polymer; once we refine the loading process this likely goes away.\nif (typeof window.Polymer === 'function') {\n  Polymer = {};\n}\n\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // copy own properties from 'api' to 'prototype, with name hinting for 'super'\n  function extend(prototype, api) {\n    if (prototype && api) {\n      // use only own properties of 'api'\n      Object.getOwnPropertyNames(api).forEach(function(n) {\n        // acquire property descriptor\n        var pd = Object.getOwnPropertyDescriptor(api, n);\n        if (pd) {\n          // clone property via descriptor\n          Object.defineProperty(prototype, n, pd);\n          // cache name-of-method for 'super' engine\n          if (typeof pd.value == 'function') {\n            // hint the 'super' engine\n            pd.value.nom = n;\n          }\n        }\n      });\n    }\n    return prototype;\n  }\n  \n  // exports\n\n  scope.extend = extend;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n  \n  // usage\n  \n  // invoke cb.call(this) in 100ms, unless the job is re-registered,\n  // which resets the timer\n  // \n  // this.myJob = this.job(this.myJob, cb, 100)\n  //\n  // returns a job handle which can be used to re-register a job\n\n  var Job = function(inContext) {\n    this.context = inContext;\n    this.boundComplete = this.complete.bind(this)\n  };\n  Job.prototype = {\n    go: function(callback, wait) {\n      this.callback = callback;\n      var h;\n      if (!wait) {\n        h = requestAnimationFrame(this.boundComplete);\n        this.handle = function() {\n          cancelAnimationFrame(h);\n        }\n      } else {\n        h = setTimeout(this.boundComplete, wait);\n        this.handle = function() {\n          clearTimeout(h);\n        }\n      }\n    },\n    stop: function() {\n      if (this.handle) {\n        this.handle();\n        this.handle = null;\n      }\n    },\n    complete: function() {\n      if (this.handle) {\n        this.stop();\n        this.callback.call(this.context);\n      }\n    }\n  };\n  \n  function job(job, callback, wait) {\n    if (job) {\n      job.stop();\n    } else {\n      job = new Job(this);\n    }\n    job.go(callback, wait);\n    return job;\n  }\n  \n  // exports \n\n  scope.job = job;\n  \n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  var registry = {};\n\n  HTMLElement.register = function(tag, prototype) {\n    registry[tag] = prototype;\n  }\n\n  // get prototype mapped to node <tag>\n  HTMLElement.getPrototypeForTag = function(tag) {\n    var prototype = !tag ? HTMLElement.prototype : registry[tag];\n    // TODO(sjmiles): creating <tag> is likely to have wasteful side-effects\n    return prototype || Object.getPrototypeOf(document.createElement(tag));\n  };\n\n  // we have to flag propagation stoppage for the event dispatcher\n  var originalStopPropagation = Event.prototype.stopPropagation;\n  Event.prototype.stopPropagation = function() {\n    this.cancelBubble = true;\n    originalStopPropagation.apply(this, arguments);\n  };\n  \n  // TODO(sorvell): remove when we're sure imports does not need\n  // to load stylesheets\n  /*\n  HTMLImports.importer.preloadSelectors += \n      ', polymer-element link[rel=stylesheet]';\n  */\n})(Polymer);\n","/*\r\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\r\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\r\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\r\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\r\n * Code distributed by Google as part of the polymer project is also\r\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\r\n */\r\n\r\n (function(scope) {\r\n    // super\r\n\r\n    // `arrayOfArgs` is an optional array of args like one might pass\r\n    // to `Function.apply`\r\n\r\n    // TODO(sjmiles):\r\n    //    $super must be installed on an instance or prototype chain\r\n    //    as `super`, and invoked via `this`, e.g.\r\n    //      `this.super();`\r\n\r\n    //    will not work if function objects are not unique, for example,\r\n    //    when using mixins.\r\n    //    The memoization strategy assumes each function exists on only one \r\n    //    prototype chain i.e. we use the function object for memoizing)\r\n    //    perhaps we can bookkeep on the prototype itself instead\r\n    function $super(arrayOfArgs) {\r\n      // since we are thunking a method call, performance is important here: \r\n      // memoize all lookups, once memoized the fast path calls no other \r\n      // functions\r\n      //\r\n      // find the caller (cannot be `strict` because of 'caller')\r\n      var caller = $super.caller;\r\n      // memoized 'name of method' \r\n      var nom = caller.nom;\r\n      // memoized next implementation prototype\r\n      var _super = caller._super;\r\n      if (!_super) {\r\n        if (!nom) {\r\n          nom = caller.nom = nameInThis.call(this, caller);\r\n        }\r\n        if (!nom) {\r\n          console.warn('called super() on a method not installed declaratively (has no .nom property)');\r\n        }\r\n        // super prototype is either cached or we have to find it\r\n        // by searching __proto__ (at the 'top')\r\n        // invariant: because we cache _super on fn below, we never reach \r\n        // here from inside a series of calls to super(), so it's ok to \r\n        // start searching from the prototype of 'this' (at the 'top')\r\n        // we must never memoize a null super for this reason\r\n        _super = memoizeSuper(caller, nom, getPrototypeOf(this));\r\n      }\r\n      // our super function\r\n      var fn = _super[nom];\r\n      if (fn) {\r\n        // memoize information so 'fn' can call 'super'\r\n        if (!fn._super) {\r\n          // must not memoize null, or we lose our invariant above\r\n          memoizeSuper(fn, nom, _super);\r\n        }\r\n        // invoke the inherited method\r\n        // if 'fn' is not function valued, this will throw\r\n        return fn.apply(this, arrayOfArgs || []);\r\n      }\r\n    }\r\n\r\n    function nameInThis(value) {\r\n      var p = this.__proto__;\r\n      while (p && p !== HTMLElement.prototype) {\r\n        // TODO(sjmiles): getOwnPropertyNames is absurdly expensive\r\n        var n$ = Object.getOwnPropertyNames(p);\r\n        for (var i=0, l=n$.length, n; i<l && (n=n$[i]); i++) {\r\n          var d = Object.getOwnPropertyDescriptor(p, n);\r\n          if (typeof d.value === 'function' && d.value === value) {\r\n            return n;\r\n          }\r\n        }\r\n        p = p.__proto__;\r\n      }\r\n    }\r\n\r\n    function memoizeSuper(method, name, proto) {\r\n      // find and cache next prototype containing `name`\r\n      // we need the prototype so we can do another lookup\r\n      // from here\r\n      var s = nextSuper(proto, name, method);\r\n      if (s[name]) {\r\n        // `s` is a prototype, the actual method is `s[name]`\r\n        // tag super method with it's name for quicker lookups\r\n        s[name].nom = name;\r\n      }\r\n      return method._super = s;\r\n    }\r\n\r\n    function nextSuper(proto, name, caller) {\r\n      // look for an inherited prototype that implements name\r\n      while (proto) {\r\n        if ((proto[name] !== caller) && proto[name]) {\r\n          return proto;\r\n        }\r\n        proto = getPrototypeOf(proto);\r\n      }\r\n      // must not return null, or we lose our invariant above\r\n      // in this case, a super() call was invoked where no superclass\r\n      // method exists\r\n      // TODO(sjmiles): thow an exception?\r\n      return Object;\r\n    }\r\n\r\n    // NOTE: In some platforms (IE10) the prototype chain is faked via \r\n    // __proto__. Therefore, always get prototype via __proto__ instead of\r\n    // the more standard Object.getPrototypeOf.\r\n    function getPrototypeOf(prototype) {\r\n      return prototype.__proto__;\r\n    }\r\n\r\n    // utility function to precompute name tags for functions\r\n    // in a (unchained) prototype\r\n    function hintSuper(prototype) {\r\n      // tag functions with their prototype name to optimize\r\n      // super call invocations\r\n      for (var n in prototype) {\r\n        var pd = Object.getOwnPropertyDescriptor(prototype, n);\r\n        if (pd && typeof pd.value === 'function') {\r\n          pd.value.nom = n;\r\n        }\r\n      }\r\n    }\r\n\r\n    // exports\r\n\r\n    scope.super = $super;\r\n\r\n})(Polymer);\r\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  var typeHandlers = {\n    string: function(value) {\n      return value;\n    },\n    date: function(value) {\n      return new Date(Date.parse(value) || Date.now());\n    },\n    boolean: function(value) {\n      if (value === '') {\n        return true;\n      }\n      return value === 'false' ? false : !!value;\n    },\n    number: function(value) {\n      var n = parseFloat(value);\n      // hex values like \"0xFFFF\" parseFloat as 0\n      if (n === 0) {\n        n = parseInt(value);\n      }\n      return isNaN(n) ? value : n;\n      // this code disabled because encoded values (like \"0xFFFF\")\n      // do not round trip to their original format\n      //return (String(floatVal) === value) ? floatVal : value;\n    },\n    object: function(value, currentValue) {\n      if (currentValue === null) {\n        return value;\n      }\n      try {\n        // If the string is an object, we can parse is with the JSON library.\n        // include convenience replace for single-quotes. If the author omits\n        // quotes altogether, parse will fail.\n        return JSON.parse(value.replace(/'/g, '\"'));\n      } catch(e) {\n        // The object isn't valid JSON, return the raw value\n        return value;\n      }\n    },\n    // avoid deserialization of functions\n    'function': function(value, currentValue) {\n      return currentValue;\n    }\n  };\n\n  function deserializeValue(value, currentValue) {\n    // attempt to infer type from default value\n    var inferredType = typeof currentValue;\n    // invent 'date' type value for Date\n    if (currentValue instanceof Date) {\n      inferredType = 'date';\n    }\n    // delegate deserialization via type string\n    return typeHandlers[inferredType](value, currentValue);\n  }\n\n  // exports\n\n  scope.deserializeValue = deserializeValue;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n(function(scope) {\n\n  // imports\n\n  var extend = scope.extend;\n\n  // module\n\n  var api = {};\n\n  api.declaration = {};\n  api.instance = {};\n\n  api.publish = function(apis, prototype) {\n    for (var n in apis) {\n      extend(prototype, apis[n]);\n    }\n  };\n\n  // exports\n\n  scope.api = api;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  var utils = {\n    /**\n      * Invokes a function asynchronously. The context of the callback\n      * function is bound to 'this' automatically.\n      * @method async\n      * @param {Function|String} method\n      * @param {any|Array} args\n      * @param {number} timeout\n      */\n    async: function(method, args, timeout) {\n      // when polyfilling Object.observe, ensure changes \n      // propagate before executing the async method\n      Platform.flush();\n      // second argument to `apply` must be an array\n      args = (args && args.length) ? args : [args];\n      // function to invoke\n      var fn = function() {\n        (this[method] || method).apply(this, args);\n      }.bind(this);\n      // execute `fn` sooner or later\n      var handle = timeout ? setTimeout(fn, timeout) :\n          requestAnimationFrame(fn);\n      // NOTE: switch on inverting handle to determine which time is used.\n      return timeout ? handle : ~handle;\n    },\n    cancelAsync: function(handle) {\n      if (handle < 0) {\n        cancelAnimationFrame(~handle);\n      } else {\n        clearTimeout(handle);\n      }\n    },\n    /**\n      * Fire an event.\n      * @method fire\n      * @returns {Object} event\n      * @param {string} type An event name.\n      * @param {any} detail\n      * @param {Node} onNode Target node.\n      */\n    fire: function(type, detail, onNode, bubbles, cancelable) {\n      var node = onNode || this;\n      var detail = detail || {};\n      var event = new CustomEvent(type, {\n        bubbles: (bubbles !== undefined ? bubbles : true), \n        cancelable: (cancelable !== undefined ? cancelable : true), \n        detail: detail\n      });\n      node.dispatchEvent(event);\n      return event;\n    },\n    /**\n      * Fire an event asynchronously.\n      * @method asyncFire\n      * @param {string} type An event name.\n      * @param detail\n      * @param {Node} toNode Target node.\n      */\n    asyncFire: function(/*inType, inDetail*/) {\n      this.async(\"fire\", arguments);\n    },\n    /**\n      * Remove class from old, add class to anew, if they exist\n      * @param classFollows\n      * @param anew A node.\n      * @param old A node\n      * @param className\n      */\n    classFollows: function(anew, old, className) {\n      if (old) {\n        old.classList.remove(className);\n      }\n      if (anew) {\n        anew.classList.add(className);\n      }\n    }\n  };\n\n  // no-operation function for handy stubs\n  var nop = function() {};\n\n  // null-object for handy stubs\n  var nob = {};\n\n  // deprecated\n\n  utils.asyncMethod = utils.async;\n\n  // exports\n\n  scope.api.instance.utils = utils;\n  scope.nop = nop;\n  scope.nob = nob;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || {};\n  var EVENT_PREFIX = 'on-';\n\n  // instance events api\n  var events = {\n    // read-only\n    EVENT_PREFIX: EVENT_PREFIX,\n    // event listeners on host\n    addHostListeners: function() {\n      var events = this.eventDelegates;\n      log.events && (Object.keys(events).length > 0) && console.log('[%s] addHostListeners:', this.localName, events);\n      // NOTE: host events look like bindings but really are not;\n      // (1) we don't want the attribute to be set and (2) we want to support\n      // multiple event listeners ('host' and 'instance') and Node.bind\n      // by default supports 1 thing being bound.\n      for (var type in events) {\n        var methodName = events[type];\n        this.addEventListener(type, this.element.getEventHandler(this, this,\n                                                                 methodName));\n      }\n    },\n    // call 'method' or function method on 'obj' with 'args', if the method exists\n    dispatchMethod: function(obj, method, args) {\n      if (obj) {\n        log.events && console.group('[%s] dispatch [%s]', obj.localName, method);\n        var fn = typeof method === 'function' ? method : obj[method];\n        if (fn) {\n          fn[args ? 'apply' : 'call'](obj, args);\n        }\n        log.events && console.groupEnd();\n        Platform.flush();\n      }\n    }\n  };\n\n  // exports\n\n  scope.api.instance.events = events;\n\n})(Polymer);\n","/*\r\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\r\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\r\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\r\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\r\n * Code distributed by Google as part of the polymer project is also\r\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\r\n */\r\n\r\n(function(scope) {\r\n\r\n  // instance api for attributes\r\n\r\n  var attributes = {\r\n    copyInstanceAttributes: function () {\r\n      var a$ = this._instanceAttributes;\r\n      for (var k in a$) {\r\n        if (!this.hasAttribute(k)) {\r\n          this.setAttribute(k, a$[k]);\r\n        }\r\n      }\r\n    },\r\n    // for each attribute on this, deserialize value to property as needed\r\n    takeAttributes: function() {\r\n      // if we have no publish lookup table, we have no attributes to take\r\n      // TODO(sjmiles): ad hoc\r\n      if (this._publishLC) {\r\n        for (var i=0, a$=this.attributes, l=a$.length, a; (a=a$[i]) && i<l; i++) {\r\n          this.attributeToProperty(a.name, a.value);\r\n        }\r\n      }\r\n    },\r\n    // if attribute 'name' is mapped to a property, deserialize\r\n    // 'value' into that property\r\n    attributeToProperty: function(name, value) {\r\n      // try to match this attribute to a property (attributes are\r\n      // all lower-case, so this is case-insensitive search)\r\n      var name = this.propertyForAttribute(name);\r\n      if (name) {\r\n        // filter out 'mustached' values, these are to be\r\n        // replaced with bound-data and are not yet values\r\n        // themselves\r\n        if (value && value.search(scope.bindPattern) >= 0) {\r\n          return;\r\n        }\r\n        // get original value\r\n        var currentValue = this[name];\r\n        // deserialize Boolean or Number values from attribute\r\n        var value = this.deserializeValue(value, currentValue);\r\n        // only act if the value has changed\r\n        if (value !== currentValue) {\r\n          // install new value (has side-effects)\r\n          this[name] = value;\r\n        }\r\n      }\r\n    },\r\n    // return the published property matching name, or undefined\r\n    propertyForAttribute: function(name) {\r\n      var match = this._publishLC && this._publishLC[name];\r\n      //console.log('propertyForAttribute:', name, 'matches', match);\r\n      return match;\r\n    },\r\n    // convert representation of 'stringValue' based on type of 'currentValue'\r\n    deserializeValue: function(stringValue, currentValue) {\r\n      return scope.deserializeValue(stringValue, currentValue);\r\n    },\r\n    serializeValue: function(value, inferredType) {\r\n      if (inferredType === 'boolean') {\r\n        return value ? '' : undefined;\r\n      } else if (inferredType !== 'object' && inferredType !== 'function'\r\n          && value !== undefined) {\r\n        return value;\r\n      }\r\n    },\r\n    reflectPropertyToAttribute: function(name) {\r\n      var inferredType = typeof this[name];\r\n      // try to intelligently serialize property value\r\n      var serializedValue = this.serializeValue(this[name], inferredType);\r\n      // boolean properties must reflect as boolean attributes\r\n      if (serializedValue !== undefined) {\r\n        this.setAttribute(name, serializedValue);\r\n        // TODO(sorvell): we should remove attr for all properties\r\n        // that have undefined serialization; however, we will need to\r\n        // refine the attr reflection system to achieve this; pica, for example,\r\n        // relies on having inferredType object properties not removed as\r\n        // attrs.\r\n      } else if (inferredType === 'boolean') {\r\n        this.removeAttribute(name);\r\n      }\r\n    }\r\n  };\r\n\r\n  // exports\r\n\r\n  scope.api.instance.attributes = attributes;\r\n\r\n})(Polymer);\r\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || {};\n\n  // magic words\n\n  var OBSERVE_SUFFIX = 'Changed';\n\n  // element api\n\n  var empty = [];\n\n  var properties = {\n    createPropertyObserver: function() {\n      var n$ = this._observeNames;\n      if (n$ && n$.length) {\n        var o = this._propertyObserver = new CompoundObserver(true);\n        this.registerObservers([o]);\n        // TODO(sorvell): may not be kosher to access the value here (this[n]);\n        // previously we looked at the descriptor on the prototype\n        // this doesn't work for inheritance and not for accessors without \n        // a value property\n        for (var i=0, l=n$.length, n; (i<l) && (n=n$[i]); i++) {\n          o.addPath(this, n);\n          this.observeArrayValue(n, this[n], null);\n        }\n      }\n    },\n    openPropertyObserver: function() {\n      if (this._propertyObserver) {\n        this._propertyObserver.open(this.notifyPropertyChanges, this);\n      }\n    },\n    notifyPropertyChanges: function(newValues, oldValues, paths) {\n      var name, method, called = {};\n      for (var i in oldValues) {\n        // note: paths is of form [object, path, object, path]\n        name = paths[2 * i + 1];\n        method = this.observe[name];\n        if (method) {\n          var ov = oldValues[i], nv = newValues[i];\n          // observes the value if it is an array\n          this.observeArrayValue(name, nv, ov);\n          if (!called[method]) {\n            // only invoke change method if one of ov or nv is not (undefined | null)\n            if ((ov !== undefined && ov !== null) || (nv !== undefined && nv !== null)) {\n              called[method] = true;\n              // TODO(sorvell): call method with the set of values it's expecting;\n              // e.g. 'foo bar': 'invalidate' expects the new and old values for\n              // foo and bar. Currently we give only one of these and then\n              // deliver all the arguments.\n              this.invokeMethod(method, [ov, nv, arguments]);\n            }\n          }\n        }\n      }\n    },\n    deliverChanges: function() {\n      if (this._propertyObserver) {\n        this._propertyObserver.deliver();\n      }\n    },\n    propertyChanged_: function(name, value, oldValue) {\n      if (this.reflect[name]) {\n        this.reflectPropertyToAttribute(name);\n      }\n    },\n    observeArrayValue: function(name, value, old) {\n      // we only care if there are registered side-effects\n      var callbackName = this.observe[name];\n      if (callbackName) {\n        // if we are observing the previous value, stop\n        if (Array.isArray(old)) {\n          log.observe && console.log('[%s] observeArrayValue: unregister observer [%s]', this.localName, name);\n          this.closeNamedObserver(name + '__array');\n        }\n        // if the new value is an array, being observing it\n        if (Array.isArray(value)) {\n          log.observe && console.log('[%s] observeArrayValue: register observer [%s]', this.localName, name, value);\n          var observer = new ArrayObserver(value);\n          observer.open(function(value, old) {\n            this.invokeMethod(callbackName, [old]);\n          }, this);\n          this.registerNamedObserver(name + '__array', observer);\n        }\n      }\n    },\n    bindProperty: function(property, observable, oneTime) {\n      if (oneTime) {\n        this[property] = observable;\n        return;\n      }\n      return bindProperties(this, property, observable);\n    },\n    invokeMethod: function(method, args) {\n      var fn = this[method] || method;\n      if (typeof fn === 'function') {\n        fn.apply(this, args);\n      }\n    },\n    registerObservers: function(observers) {\n      this._observers = this._observers || [];\n      this._observers.push(observers);\n    },\n    // observer array items are arrays of observers.\n    closeObservers: function() {\n      if (!this._observers) {\n        return;\n      }\n      for (var i=0, l=this._observers.length; i<l; i++) {\n        this.closeObserverArray(this._observers[i]);\n      }\n      this._observers = [];\n    },\n    closeObserverArray: function(observerArray) {\n      for (var i=0, l=observerArray.length, o; i<l; i++) {\n        o = observerArray[i];\n        if (o && o.close) {\n          o.close();\n        }\n      }\n    },\n    // bookkeeping observers for memory management\n    registerNamedObserver: function(name, observer) {\n      var o$ = this._namedObservers || (this._namedObservers = {});\n      o$[name] = observer;\n    },\n    closeNamedObserver: function(name) {\n      var o$ = this._namedObservers;\n      if (o$ && o$[name]) {\n        o$[name].close();\n        o$[name] = null;\n        return true;\n      }\n    },\n    closeNamedObservers: function() {\n      if (this._namedObservers) {\n        for (var i in this._namedObservers) {\n          this.closeNamedObserver(i);\n        }\n        this._namedObservers = {};\n      }\n    }\n  };\n\n  // property binding\n  // bind a property in A to a path in B by converting A[property] to a\n  // getter/setter pair that accesses B[...path...]\n  function bindProperties(a, property, observable) {\n    // apply Polymer two-way reference binding\n    return Observer.bindToInstance(a, property, observable, resolveBindingValue);\n  }\n\n  // capture A's value if B's value is null or undefined,\n  // otherwise use B's value\n  function resolveBindingValue(oldValue, value) {\n    if (value === undefined && oldValue === null) {\n      return value;\n    }\n    return (value === null || value === undefined) ? oldValue : value;\n  }\n\n  // logging\n  var LOG_OBSERVE = '[%s] watching [%s]';\n  var LOG_OBSERVED = '[%s#%s] watch: [%s] now [%s] was [%s]';\n  var LOG_CHANGED = '[%s#%s] propertyChanged: [%s] now [%s] was [%s]';\n\n  // exports\n\n  scope.api.instance.properties = properties;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || 0;\n\n  // element api supporting mdv\n  var mdv = {\n    instanceTemplate: function(template) {\n      // ensure a default bindingDelegate\n      var syntax = this.syntax || (!template.bindingDelegate &&\n          this.element.syntax);\n      var dom = template.createInstance(this, syntax);\n      this.registerObservers(dom.bindings_);\n      return dom;\n    },\n    bind: function(name, observable, oneTime) {\n      var property = this.propertyForAttribute(name);\n      if (!property) {\n        // TODO(sjmiles): this mixin method must use the special form\n        // of `super` installed by `mixinMethod` in declaration/prototype.js\n        return this.mixinSuper(arguments);\n      } else {\n        // use n-way Polymer binding\n        var observer = this.bindProperty(property, observable, oneTime);\n        // NOTE: reflecting binding information is typically required only for\n        // tooling. It has a performance cost so it's opt-in in Node.bind.\n        if (Platform.enableBindingsReflection && observer) {\n          observer.path = observable.path_;\n          this._recordBinding(property, observer);\n        }\n        if (this.reflect[property]) {\n          this.reflectPropertyToAttribute(property);\n        }\n        return observer;\n      }\n    },\n    bindFinished: function() {\n      this.makeElementReady();\n    },\n    _recordBinding: function(name, observer) {\n      this.bindings_ = this.bindings_ || {};\n      this.bindings_[name] = observer;\n    },\n    // TODO(sorvell): unbind/unbindAll has been removed, as public api, from\n    // TemplateBinding. We still need to close/dispose of observers but perhaps\n    // we should choose a more explicit name.\n    asyncUnbindAll: function() {\n      if (!this._unbound) {\n        log.unbind && console.log('[%s] asyncUnbindAll', this.localName);\n        this._unbindAllJob = this.job(this._unbindAllJob, this.unbindAll, 0);\n      }\n    },\n    unbindAll: function() {\n      if (!this._unbound) {\n        this.closeObservers();\n        this.closeNamedObservers();\n        this._unbound = true;\n      }\n    },\n    cancelUnbindAll: function() {\n      if (this._unbound) {\n        log.unbind && console.warn('[%s] already unbound, cannot cancel unbindAll', this.localName);\n        return;\n      }\n      log.unbind && console.log('[%s] cancelUnbindAll', this.localName);\n      if (this._unbindAllJob) {\n        this._unbindAllJob = this._unbindAllJob.stop();\n      }\n    }\n  };\n\n  function unbindNodeTree(node) {\n    forNodeTree(node, _nodeUnbindAll);\n  }\n\n  function _nodeUnbindAll(node) {\n    node.unbindAll();\n  }\n\n  function forNodeTree(node, callback) {\n    if (node) {\n      callback(node);\n      for (var child = node.firstChild; child; child = child.nextSibling) {\n        forNodeTree(child, callback);\n      }\n    }\n  }\n\n  var mustachePattern = /\\{\\{([^{}]*)}}/;\n\n  // exports\n\n  scope.bindPattern = mustachePattern;\n  scope.api.instance.mdv = mdv;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  var base = {\n    PolymerBase: true,\n    job: function(job, callback, wait) {\n      if (typeof job === 'string') {\n        var n = '___' + job;\n        this[n] = Polymer.job.call(this, this[n], callback, wait);\n      } else {\n        return Polymer.job.call(this, job, callback, wait);\n      }\n    },\n    super: Polymer.super,\n    // user entry point for element has had its createdCallback called\n    created: function() {\n    },\n    // user entry point for element has shadowRoot and is ready for\n    // api interaction\n    ready: function() {\n    },\n    createdCallback: function() {\n      if (this.templateInstance && this.templateInstance.model) {\n        console.warn('Attributes on ' + this.localName + ' were data bound ' +\n            'prior to Polymer upgrading the element. This may result in ' +\n            'incorrect binding types.');\n      }\n      this.created();\n      this.prepareElement();\n      // TODO(sorvell): replace when ShadowDOMPolyfill issue is corrected\n      // https://github.com/Polymer/ShadowDOM/issues/420\n      if (!this.ownerDocument.isStagingDocument || window.ShadowDOMPolyfill) {\n        this.makeElementReady();\n      }\n    },\n    // system entry point, do not override\n    prepareElement: function() {\n      if (this._elementPrepared) {\n        console.warn('Element already prepared', this.localName);\n        return;\n      }\n      this._elementPrepared = true;\n      // storage for shadowRoots info\n      this.shadowRoots = {};\n      // install property observers\n      this.createPropertyObserver();\n      // TODO (sorvell): temporarily open observer when created\n      this.openPropertyObserver();\n      // install boilerplate attributes\n      this.copyInstanceAttributes();\n      // process input attributes\n      this.takeAttributes();\n      // add event listeners\n      this.addHostListeners();\n    },\n    makeElementReady: function() {\n      if (this._readied) {\n        return;\n      }\n      this._readied = true;\n      // TODO(sorvell): We could create an entry point here\n      // for the user to compute property values.\n      // process declarative resources\n      this.parseDeclarations(this.__proto__);\n      // TODO(sorvell): CE polyfill uses unresolved attribute to simulate\n      // :unresolved; remove this attribute to be compatible with native\n      // CE.\n      this.removeAttribute('unresolved');\n      // user entry point\n      this.ready();\n      // TODO (sorvell): temporarily open observer when created\n      // turn on property observation and take any initial changes\n      //this.openPropertyObserver();\n    },\n    attachedCallback: function() {\n      this.cancelUnbindAll();\n      // invoke user action\n      if (this.attached) {\n        this.attached();\n      }\n      // TODO(sorvell): bc\n      if (this.enteredView) {\n        this.enteredView();\n      }\n      // NOTE: domReady can be used to access elements in dom (descendants, \n      // ancestors, siblings) such that the developer is enured to upgrade\n      // ordering. If the element definitions have loaded, domReady\n      // can be used to access upgraded elements.\n      if (!this.hasBeenAttached) {\n        this.hasBeenAttached = true;\n        if (this.domReady) {\n          this.async('domReady');\n        }\n      }\n    },\n    detachedCallback: function() {\n      if (!this.preventDispose) {\n        this.asyncUnbindAll();\n      }\n      // invoke user action\n      if (this.detached) {\n        this.detached();\n      }\n      // TODO(sorvell): bc\n      if (this.leftView) {\n        this.leftView();\n      }\n    },\n    // TODO(sorvell): bc\n    enteredViewCallback: function() {\n      this.attachedCallback();\n    },\n    // TODO(sorvell): bc\n    leftViewCallback: function() {\n      this.detachedCallback();\n    },\n    // TODO(sorvell): bc\n    enteredDocumentCallback: function() {\n      this.attachedCallback();\n    },\n    // TODO(sorvell): bc\n    leftDocumentCallback: function() {\n      this.detachedCallback();\n    },\n    // recursive ancestral <element> initialization, oldest first\n    parseDeclarations: function(p) {\n      if (p && p.element) {\n        this.parseDeclarations(p.__proto__);\n        p.parseDeclaration.call(this, p.element);\n      }\n    },\n    // parse input <element> as needed, override for custom behavior\n    parseDeclaration: function(elementElement) {\n      var template = this.fetchTemplate(elementElement);\n      if (template) {\n        var root = this.shadowFromTemplate(template);\n        this.shadowRoots[elementElement.name] = root;\n      }\n    },\n    // return a shadow-root template (if desired), override for custom behavior\n    fetchTemplate: function(elementElement) {\n      return elementElement.querySelector('template');\n    },\n    // utility function that creates a shadow root from a <template>\n    shadowFromTemplate: function(template) {\n      if (template) {\n        // make a shadow root\n        var root = this.createShadowRoot();\n        // stamp template\n        // which includes parsing and applying MDV bindings before being \n        // inserted (to avoid {{}} in attribute values)\n        // e.g. to prevent <img src=\"images/{{icon}}\"> from generating a 404.\n        var dom = this.instanceTemplate(template);\n        // append to shadow dom\n        root.appendChild(dom);\n        // perform post-construction initialization tasks on shadow root\n        this.shadowRootReady(root, template);\n        // return the created shadow root\n        return root;\n      }\n    },\n    // utility function that stamps a <template> into light-dom\n    lightFromTemplate: function(template, refNode) {\n      if (template) {\n        // TODO(sorvell): mark this element as an eventController so that\n        // event listeners on bound nodes inside it will be called on it.\n        // Note, the expectation here is that events on all descendants \n        // should be handled by this element.\n        this.eventController = this;\n        // stamp template\n        // which includes parsing and applying MDV bindings before being \n        // inserted (to avoid {{}} in attribute values)\n        // e.g. to prevent <img src=\"images/{{icon}}\"> from generating a 404.\n        var dom = this.instanceTemplate(template);\n        // append to shadow dom\n        if (refNode) {\n          this.insertBefore(dom, refNode);          \n        } else {\n          this.appendChild(dom);\n        }\n        // perform post-construction initialization tasks on ahem, light root\n        this.shadowRootReady(this);\n        // return the created shadow root\n        return dom;\n      }\n    },\n    shadowRootReady: function(root) {\n      // locate nodes with id and store references to them in this.$ hash\n      this.marshalNodeReferences(root);\n      // set up polymer gestures\n      PolymerGestures.register(root);\n    },\n    // locate nodes with id and store references to them in this.$ hash\n    marshalNodeReferences: function(root) {\n      // establish $ instance variable\n      var $ = this.$ = this.$ || {};\n      // populate $ from nodes with ID from the LOCAL tree\n      if (root) {\n        var n$ = root.querySelectorAll(\"[id]\");\n        for (var i=0, l=n$.length, n; (i<l) && (n=n$[i]); i++) {\n          $[n.id] = n;\n        };\n      }\n    },\n    attributeChangedCallback: function(name, oldValue) {\n      // TODO(sjmiles): adhoc filter\n      if (name !== 'class' && name !== 'style') {\n        this.attributeToProperty(name, this.getAttribute(name));\n      }\n      if (this.attributeChanged) {\n        this.attributeChanged.apply(this, arguments);\n      }\n    },\n    onMutation: function(node, listener) {\n      var observer = new MutationObserver(function(mutations) {\n        listener.call(this, observer, mutations);\n        observer.disconnect();\n      }.bind(this));\n      observer.observe(node, {childList: true, subtree: true});\n    }\n  };\n\n  // true if object has own PolymerBase api\n  function isBase(object) {\n    return object.hasOwnProperty('PolymerBase') \n  }\n\n  // name a base constructor for dev tools\n\n  function PolymerBase() {};\n  PolymerBase.prototype = base;\n  base.constructor = PolymerBase;\n  \n  // exports\n\n  scope.Base = PolymerBase;\n  scope.isBase = isBase;\n  scope.api.instance.base = base;\n  \n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || {};\n  \n  // magic words\n  \n  var STYLE_SCOPE_ATTRIBUTE = 'element';\n  var STYLE_CONTROLLER_SCOPE = 'controller';\n  \n  var styles = {\n    STYLE_SCOPE_ATTRIBUTE: STYLE_SCOPE_ATTRIBUTE,\n    /**\n     * Installs external stylesheets and <style> elements with the attribute \n     * polymer-scope='controller' into the scope of element. This is intended\n     * to be a called during custom element construction.\n    */\n    installControllerStyles: function() {\n      // apply controller styles, but only if they are not yet applied\n      var scope = this.findStyleScope();\n      if (scope && !this.scopeHasNamedStyle(scope, this.localName)) {\n        // allow inherited controller styles\n        var proto = getPrototypeOf(this), cssText = '';\n        while (proto && proto.element) {\n          cssText += proto.element.cssTextForScope(STYLE_CONTROLLER_SCOPE);\n          proto = getPrototypeOf(proto);\n        }\n        if (cssText) {\n          this.installScopeCssText(cssText, scope);\n        }\n      }\n    },\n    installScopeStyle: function(style, name, scope) {\n      var scope = scope || this.findStyleScope(), name = name || '';\n      if (scope && !this.scopeHasNamedStyle(scope, this.localName + name)) {\n        var cssText = '';\n        if (style instanceof Array) {\n          for (var i=0, l=style.length, s; (i<l) && (s=style[i]); i++) {\n            cssText += s.textContent + '\\n\\n';\n          }\n        } else {\n          cssText = style.textContent;\n        }\n        this.installScopeCssText(cssText, scope, name);\n      }\n    },\n    installScopeCssText: function(cssText, scope, name) {\n      scope = scope || this.findStyleScope();\n      name = name || '';\n      if (!scope) {\n        return;\n      }\n      if (window.ShadowDOMPolyfill) {\n        cssText = shimCssText(cssText, scope.host);\n      }\n      var style = this.element.cssTextToScopeStyle(cssText,\n          STYLE_CONTROLLER_SCOPE);\n      Polymer.applyStyleToScope(style, scope);\n      // cache that this style has been applied\n      scope._scopeStyles[this.localName + name] = true;\n    },\n    findStyleScope: function(node) {\n      // find the shadow root that contains this element\n      var n = node || this;\n      while (n.parentNode) {\n        n = n.parentNode;\n      }\n      return n;\n    },\n    scopeHasNamedStyle: function(scope, name) {\n      scope._scopeStyles = scope._scopeStyles || {};\n      return scope._scopeStyles[name];\n    }\n  };\n  \n  // NOTE: use raw prototype traversal so that we ensure correct traversal\n  // on platforms where the protoype chain is simulated via __proto__ (IE10)\n  function getPrototypeOf(prototype) {\n    return prototype.__proto__;\n  }\n\n  function shimCssText(cssText, host) {\n    var name = '', is = false;\n    if (host) {\n      name = host.localName;\n      is = host.hasAttribute('is');\n    }\n    var selector = Platform.ShadowCSS.makeScopeSelector(name, is);\n    return Platform.ShadowCSS.shimCssText(cssText, selector);\n  }\n\n  // exports\n\n  scope.api.instance.styles = styles;\n  \n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var extend = scope.extend;\n  var api = scope.api;\n\n  // imperative implementation: Polymer()\n\n  // specify an 'own' prototype for tag `name`\n  function element(name, prototype) {\n    if (arguments.length === 1 && typeof arguments[0] !== 'string') {\n      prototype = name;\n      var script = document._currentScript;\n      name = script && script.parentNode && script.parentNode.getAttribute ?\n          script.parentNode.getAttribute('name') : '';\n      if (!name) {\n        throw 'Element name could not be inferred.';\n      }\n    }\n    if (getRegisteredPrototype[name]) {\n      throw 'Already registered (Polymer) prototype for element ' + name;\n    }\n    // cache the prototype\n    registerPrototype(name, prototype);\n    // notify the registrar waiting for 'name', if any\n    notifyPrototype(name);\n  }\n\n  // async prototype source\n\n  function waitingForPrototype(name, client) {\n    waitPrototype[name] = client;\n  }\n\n  var waitPrototype = {};\n\n  function notifyPrototype(name) {\n    if (waitPrototype[name]) {\n      waitPrototype[name].registerWhenReady();\n      delete waitPrototype[name];\n    }\n  }\n\n  // utility and bookkeeping\n\n  // maps tag names to prototypes, as registered with\n  // Polymer. Prototypes associated with a tag name\n  // using document.registerElement are available from\n  // HTMLElement.getPrototypeForTag().\n  // If an element was fully registered by Polymer, then\n  // Polymer.getRegisteredPrototype(name) === \n  //   HTMLElement.getPrototypeForTag(name)\n\n  var prototypesByName = {};\n\n  function registerPrototype(name, prototype) {\n    return prototypesByName[name] = prototype || {};\n  }\n\n  function getRegisteredPrototype(name) {\n    return prototypesByName[name];\n  }\n\n  // exports\n\n  scope.getRegisteredPrototype = getRegisteredPrototype;\n  scope.waitingForPrototype = waitingForPrototype;\n\n  // namespace shenanigans so we can expose our scope on the registration \n  // function\n\n  // make window.Polymer reference `element()`\n\n  window.Polymer = element;\n\n  // TODO(sjmiles): find a way to do this that is less terrible\n  // copy window.Polymer properties onto `element()`\n\n  extend(Polymer, scope);\n\n  // Under the HTMLImports polyfill, scripts in the main document\n  // do not block on imports; we want to allow calls to Polymer in the main\n  // document. Platform collects those calls until we can process them, which\n  // we do here.\n\n  var declarations = Platform.deliverDeclarations();\n  if (declarations) {\n    for (var i=0, l=declarations.length, d; (i<l) && (d=declarations[i]); i++) {\n      element.apply(null, d);\n    }\n  }\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\nvar path = {\n  resolveElementPaths: function(node) {\n    Platform.urlResolver.resolveDom(node);\n  },\n  addResolvePathApi: function() {\n    // let assetpath attribute modify the resolve path\n    var assetPath = this.getAttribute('assetpath') || '';\n    var root = new URL(assetPath, this.ownerDocument.baseURI);\n    this.prototype.resolvePath = function(urlPath, base) {\n      var u = new URL(urlPath, base || root);\n      return u.href;\n    };\n  }\n};\n\n// exports\nscope.api.declaration.path = path;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || {};\n  var api = scope.api.instance.styles;\n  var STYLE_SCOPE_ATTRIBUTE = api.STYLE_SCOPE_ATTRIBUTE;\n\n  // magic words\n\n  var STYLE_SELECTOR = 'style';\n  var STYLE_LOADABLE_MATCH = '@import';\n  var SHEET_SELECTOR = 'link[rel=stylesheet]';\n  var STYLE_GLOBAL_SCOPE = 'global';\n  var SCOPE_ATTR = 'polymer-scope';\n\n  var styles = {\n    // returns true if resources are loading\n    loadStyles: function(callback) {\n      var template = this.fetchTemplate();\n      var content = template && this.templateContent();\n      if (content) {\n        this.convertSheetsToStyles(content);\n        var styles = this.findLoadableStyles(content);\n        if (styles.length) {\n          var templateUrl = template.ownerDocument.baseURI;\n          return Platform.styleResolver.loadStyles(styles, templateUrl, callback);\n        }\n      }\n      if (callback) {\n        callback();\n      }\n    },\n    convertSheetsToStyles: function(root) {\n      var s$ = root.querySelectorAll(SHEET_SELECTOR);\n      for (var i=0, l=s$.length, s, c; (i<l) && (s=s$[i]); i++) {\n        c = createStyleElement(importRuleForSheet(s, this.ownerDocument.baseURI),\n            this.ownerDocument);\n        this.copySheetAttributes(c, s);\n        s.parentNode.replaceChild(c, s);\n      }\n    },\n    copySheetAttributes: function(style, link) {\n      for (var i=0, a$=link.attributes, l=a$.length, a; (a=a$[i]) && i<l; i++) {\n        if (a.name !== 'rel' && a.name !== 'href') {\n          style.setAttribute(a.name, a.value);\n        }\n      }\n    },\n    findLoadableStyles: function(root) {\n      var loadables = [];\n      if (root) {\n        var s$ = root.querySelectorAll(STYLE_SELECTOR);\n        for (var i=0, l=s$.length, s; (i<l) && (s=s$[i]); i++) {\n          if (s.textContent.match(STYLE_LOADABLE_MATCH)) {\n            loadables.push(s);\n          }\n        }\n      }\n      return loadables;\n    },\n    /**\n     * Install external stylesheets loaded in <polymer-element> elements into the \n     * element's template.\n     * @param elementElement The <element> element to style.\n     */\n    installSheets: function() {\n      this.cacheSheets();\n      this.cacheStyles();\n      this.installLocalSheets();\n      this.installGlobalStyles();\n    },\n    /**\n     * Remove all sheets from element and store for later use.\n     */\n    cacheSheets: function() {\n      this.sheets = this.findNodes(SHEET_SELECTOR);\n      this.sheets.forEach(function(s) {\n        if (s.parentNode) {\n          s.parentNode.removeChild(s);\n        }\n      });\n    },\n    cacheStyles: function() {\n      this.styles = this.findNodes(STYLE_SELECTOR + '[' + SCOPE_ATTR + ']');\n      this.styles.forEach(function(s) {\n        if (s.parentNode) {\n          s.parentNode.removeChild(s);\n        }\n      });\n    },\n    /**\n     * Takes external stylesheets loaded in an <element> element and moves\n     * their content into a <style> element inside the <element>'s template.\n     * The sheet is then removed from the <element>. This is done only so \n     * that if the element is loaded in the main document, the sheet does\n     * not become active.\n     * Note, ignores sheets with the attribute 'polymer-scope'.\n     * @param elementElement The <element> element to style.\n     */\n    installLocalSheets: function () {\n      var sheets = this.sheets.filter(function(s) {\n        return !s.hasAttribute(SCOPE_ATTR);\n      });\n      var content = this.templateContent();\n      if (content) {\n        var cssText = '';\n        sheets.forEach(function(sheet) {\n          cssText += cssTextFromSheet(sheet) + '\\n';\n        });\n        if (cssText) {\n          var style = createStyleElement(cssText, this.ownerDocument);\n          content.insertBefore(style, content.firstChild);\n        }\n      }\n    },\n    findNodes: function(selector, matcher) {\n      var nodes = this.querySelectorAll(selector).array();\n      var content = this.templateContent();\n      if (content) {\n        var templateNodes = content.querySelectorAll(selector).array();\n        nodes = nodes.concat(templateNodes);\n      }\n      return matcher ? nodes.filter(matcher) : nodes;\n    },\n    /**\n     * Promotes external stylesheets and <style> elements with the attribute \n     * polymer-scope='global' into global scope.\n     * This is particularly useful for defining @keyframe rules which \n     * currently do not function in scoped or shadow style elements.\n     * (See wkb.ug/72462)\n     * @param elementElement The <element> element to style.\n    */\n    // TODO(sorvell): remove when wkb.ug/72462 is addressed.\n    installGlobalStyles: function() {\n      var style = this.styleForScope(STYLE_GLOBAL_SCOPE);\n      applyStyleToScope(style, document.head);\n    },\n    cssTextForScope: function(scopeDescriptor) {\n      var cssText = '';\n      // handle stylesheets\n      var selector = '[' + SCOPE_ATTR + '=' + scopeDescriptor + ']';\n      var matcher = function(s) {\n        return matchesSelector(s, selector);\n      };\n      var sheets = this.sheets.filter(matcher);\n      sheets.forEach(function(sheet) {\n        cssText += cssTextFromSheet(sheet) + '\\n\\n';\n      });\n      // handle cached style elements\n      var styles = this.styles.filter(matcher);\n      styles.forEach(function(style) {\n        cssText += style.textContent + '\\n\\n';\n      });\n      return cssText;\n    },\n    styleForScope: function(scopeDescriptor) {\n      var cssText = this.cssTextForScope(scopeDescriptor);\n      return this.cssTextToScopeStyle(cssText, scopeDescriptor);\n    },\n    cssTextToScopeStyle: function(cssText, scopeDescriptor) {\n      if (cssText) {\n        var style = createStyleElement(cssText);\n        style.setAttribute(STYLE_SCOPE_ATTRIBUTE, this.getAttribute('name') +\n            '-' + scopeDescriptor);\n        return style;\n      }\n    }\n  };\n\n  function importRuleForSheet(sheet, baseUrl) {\n    var href = new URL(sheet.getAttribute('href'), baseUrl).href;\n    return '@import \\'' + href + '\\';';\n  }\n\n  function applyStyleToScope(style, scope) {\n    if (style) {\n      if (scope === document) {\n        scope = document.head;\n      }\n      if (window.ShadowDOMPolyfill) {\n        scope = document.head;\n      }\n      // TODO(sorvell): necessary for IE\n      // see https://connect.microsoft.com/IE/feedback/details/790212/\n      // cloning-a-style-element-and-adding-to-document-produces\n      // -unexpected-result#details\n      // var clone = style.cloneNode(true);\n      var clone = createStyleElement(style.textContent);\n      var attr = style.getAttribute(STYLE_SCOPE_ATTRIBUTE);\n      if (attr) {\n        clone.setAttribute(STYLE_SCOPE_ATTRIBUTE, attr);\n      }\n      // TODO(sorvell): probably too brittle; try to figure out \n      // where to put the element.\n      var refNode = scope.firstElementChild;\n      if (scope === document.head) {\n        var selector = 'style[' + STYLE_SCOPE_ATTRIBUTE + ']';\n        var s$ = document.head.querySelectorAll(selector);\n        if (s$.length) {\n          refNode = s$[s$.length-1].nextElementSibling;\n        }\n      }\n      scope.insertBefore(clone, refNode);\n    }\n  }\n\n  function createStyleElement(cssText, scope) {\n    scope = scope || document;\n    scope = scope.createElement ? scope : scope.ownerDocument;\n    var style = scope.createElement('style');\n    style.textContent = cssText;\n    return style;\n  }\n\n  function cssTextFromSheet(sheet) {\n    return (sheet && sheet.__resource) || '';\n  }\n\n  function matchesSelector(node, inSelector) {\n    if (matches) {\n      return matches.call(node, inSelector);\n    }\n  }\n  var p = HTMLElement.prototype;\n  var matches = p.matches || p.matchesSelector || p.webkitMatchesSelector \n      || p.mozMatchesSelector;\n  \n  // exports\n\n  scope.api.declaration.styles = styles;\n  scope.applyStyleToScope = applyStyleToScope;\n  \n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var log = window.logFlags || {};\n  var api = scope.api.instance.events;\n  var EVENT_PREFIX = api.EVENT_PREFIX;\n  // polymer-element declarative api: events feature\n\n  var mixedCaseEventTypes = {};\n  [\n    'webkitAnimationStart',\n    'webkitAnimationEnd',\n    'webkitTransitionEnd',\n    'DOMFocusOut',\n    'DOMFocusIn',\n    'DOMMouseScroll'\n  ].forEach(function(e) {\n    mixedCaseEventTypes[e.toLowerCase()] = e;\n  });\n\n  var events = {\n    parseHostEvents: function() {\n      // our delegates map\n      var delegates = this.prototype.eventDelegates;\n      // extract data from attributes into delegates\n      this.addAttributeDelegates(delegates);\n    },\n    addAttributeDelegates: function(delegates) {\n      // for each attribute\n      for (var i=0, a; a=this.attributes[i]; i++) {\n        // does it have magic marker identifying it as an event delegate?\n        if (this.hasEventPrefix(a.name)) {\n          // if so, add the info to delegates\n          delegates[this.removeEventPrefix(a.name)] = a.value.replace('{{', '')\n              .replace('}}', '').trim();\n        }\n      }\n    },\n    // starts with 'on-'\n    hasEventPrefix: function (n) {\n      return n && (n[0] === 'o') && (n[1] === 'n') && (n[2] === '-');\n    },\n    removeEventPrefix: function(n) {\n      return n.slice(prefixLength);\n    },\n    findController: function(node) {\n      while (node.parentNode) {\n        if (node.eventController) {\n          return node.eventController;\n        }\n        node = node.parentNode;\n      }\n      return node.host;\n    },\n    getEventHandler: function(controller, target, method) {\n      var events = this;\n      return function(e) {\n        if (!controller || !controller.PolymerBase) {\n          controller = events.findController(target);\n        }\n\n        var args = [e, e.detail, e.currentTarget];\n        controller.dispatchMethod(controller, method, args);\n      };\n    },\n    prepareEventBinding: function(pathString, name, node) {\n      if (!this.hasEventPrefix(name))\n        return;\n\n      var eventType = this.removeEventPrefix(name);\n      eventType = mixedCaseEventTypes[eventType] || eventType;\n\n      var events = this;\n\n      return function(model, node, oneTime) {\n        var handler = events.getEventHandler(undefined, node, pathString);\n        node.addEventListener(eventType, handler);\n\n        if (oneTime)\n          return;\n\n        // TODO(rafaelw): This is really pointless work. Aside from the cost\n        // of these allocations, NodeBind is going to setAttribute back to its\n        // current value. Fixing this would mean changing the TemplateBinding\n        // binding delegate API.\n        function bindingValue() {\n          return '{{ ' + pathString + ' }}';\n        }\n\n        return {\n          open: bindingValue,\n          discardChanges: bindingValue,\n          close: function() {\n            node.removeEventListener(eventType, handler);\n          }\n        };\n      };\n    }\n  };\n\n  var prefixLength = EVENT_PREFIX.length;\n\n  // exports\n  scope.api.declaration.events = events;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // element api\n\n  var properties = {\n    inferObservers: function(prototype) {\n      // called before prototype.observe is chained to inherited object\n      var observe = prototype.observe, property;\n      for (var n in prototype) {\n        if (n.slice(-7) === 'Changed') {\n          if (!observe) {\n            observe  = (prototype.observe = {});\n          }\n          property = n.slice(0, -7)\n          observe[property] = observe[property] || n;\n        }\n      }\n    },\n    explodeObservers: function(prototype) {\n      // called before prototype.observe is chained to inherited object\n      var o = prototype.observe;\n      if (o) {\n        var exploded = {};\n        for (var n in o) {\n          var names = n.split(' ');\n          for (var i=0, ni; ni=names[i]; i++) {\n            exploded[ni] = o[n];\n          }\n        }\n        prototype.observe = exploded;\n      }\n    },\n    optimizePropertyMaps: function(prototype) {\n      if (prototype.observe) {\n        // construct name list\n        var a = prototype._observeNames = [];\n        for (var n in prototype.observe) {\n          var names = n.split(' ');\n          for (var i=0, ni; ni=names[i]; i++) {\n            a.push(ni);\n          }\n        }\n      }\n      if (prototype.publish) {\n        // construct name list\n        var a = prototype._publishNames = [];\n        for (var n in prototype.publish) {\n          a.push(n);\n        }\n      }\n    },\n    publishProperties: function(prototype, base) {\n      // if we have any properties to publish\n      var publish = prototype.publish;\n      if (publish) {\n        // transcribe `publish` entries onto own prototype\n        this.requireProperties(publish, prototype, base);\n        // construct map of lower-cased property names\n        prototype._publishLC = this.lowerCaseMap(publish);\n      }\n    },\n    // sync prototype to property descriptors; \n    // desriptor format contains default value and optionally a \n    // hint for reflecting the property to an attribute.\n    // e.g. {foo: 5, bar: {value: true, reflect: true}}\n    // reflect: {foo: true} is also supported\n    // \n    requireProperties: function(propertyDescriptors, prototype, base) {\n      // reflected properties\n      prototype.reflect = prototype.reflect || {};\n      // ensure a prototype value for each property\n      // and update the property's reflect to attribute status \n      for (var n in propertyDescriptors) {\n        var propertyDescriptor = propertyDescriptors[n];\n        var reflects = this.reflectHintForDescriptor(propertyDescriptor);\n        if (prototype.reflect[n] === undefined && reflects !== undefined) {\n          prototype.reflect[n] = reflects;\n        }\n        if (prototype[n] === undefined) {\n          prototype[n] = this.valueForDescriptor(propertyDescriptor); \n        }\n      }\n    },\n    valueForDescriptor: function(propertyDescriptor) {\n      var value = typeof propertyDescriptor === 'object' && \n          propertyDescriptor ? propertyDescriptor.value : propertyDescriptor;\n      return value !== undefined ? value : null;\n    },\n    // returns the value of the descriptor's 'reflect' property or undefined\n    reflectHintForDescriptor: function(propertyDescriptor) {\n      if (typeof propertyDescriptor === 'object' &&\n          propertyDescriptor && propertyDescriptor.reflect !== undefined) {\n        return propertyDescriptor.reflect;\n      }\n    },\n    lowerCaseMap: function(properties) {\n      var map = {};\n      for (var n in properties) {\n        map[n.toLowerCase()] = n;\n      }\n      return map;\n    },\n    createPropertyAccessors: function(prototype) {\n      var n$ = prototype._publishNames;\n      if (n$ && n$.length) {\n        for (var i=0, l=n$.length, n, fn; (i<l) && (n=n$[i]); i++) {\n          Observer.createBindablePrototypeAccessor(prototype, n);\n        }\n      }\n    }\n  };\n\n  // exports\n\n  scope.api.declaration.properties = properties;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n(function(scope) {\n\n  // magic words\n\n  var ATTRIBUTES_ATTRIBUTE = 'attributes';\n  var ATTRIBUTES_REGEX = /\\s|,/;\n\n  // attributes api\n\n  var attributes = {\n    \n    inheritAttributesObjects: function(prototype) {\n      // chain our lower-cased publish map to the inherited version\n      this.inheritObject(prototype, 'publishLC');\n      // chain our instance attributes map to the inherited version\n      this.inheritObject(prototype, '_instanceAttributes');\n    },\n\n    publishAttributes: function(prototype, base) {\n      // merge names from 'attributes' attribute\n      var attributes = this.getAttribute(ATTRIBUTES_ATTRIBUTE);\n      if (attributes) {\n        // get properties to publish\n        var publish = prototype.publish || (prototype.publish = {});\n        // names='a b c' or names='a,b,c'\n        var names = attributes.split(ATTRIBUTES_REGEX);\n        // record each name for publishing\n        for (var i=0, l=names.length, n; i<l; i++) {\n          // remove excess ws\n          n = names[i].trim();\n          // do not override explicit entries\n          if (n && publish[n] === undefined && base[n] === undefined) {\n            // supply an empty 'descriptor' object and let the publishProperties\n            // code determine a default\n            publish[n] = Polymer.nob;\n          }\n        }\n      }\n    },\n\n    // record clonable attributes from <element>\n    accumulateInstanceAttributes: function() {\n      // inherit instance attributes\n      var clonable = this.prototype._instanceAttributes;\n      // merge attributes from element\n      var a$ = this.attributes;\n      for (var i=0, l=a$.length, a; (i<l) && (a=a$[i]); i++) {  \n        if (this.isInstanceAttribute(a.name)) {\n          clonable[a.name] = a.value;\n        }\n      }\n    },\n\n    isInstanceAttribute: function(name) {\n      return !this.blackList[name] && name.slice(0,3) !== 'on-';\n    },\n\n    // do not clone these attributes onto instances\n    blackList: {\n      name: 1,\n      'extends': 1,\n      constructor: 1,\n      noscript: 1,\n      assetpath: 1,\n      'cache-csstext': 1\n    }\n    \n  };\n\n  // add ATTRIBUTES_ATTRIBUTE to the blacklist\n  attributes.blackList[ATTRIBUTES_ATTRIBUTE] = 1;\n\n  // exports\n\n  scope.api.declaration.attributes = attributes;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n  var events = scope.api.declaration.events;\n\n  var syntax = new PolymerExpressions();\n  var prepareBinding = syntax.prepareBinding;\n\n  // Polymer takes a first crack at the binding to see if it's a declarative\n  // event handler.\n  syntax.prepareBinding = function(pathString, name, node) {\n    return events.prepareEventBinding(pathString, name, node) ||\n           prepareBinding.call(syntax, pathString, name, node);\n  };\n\n  // declaration api supporting mdv\n  var mdv = {\n    syntax: syntax,\n    fetchTemplate: function() {\n      return this.querySelector('template');\n    },\n    templateContent: function() {\n      var template = this.fetchTemplate();\n      return template && Platform.templateContent(template);\n    },\n    installBindingDelegate: function(template) {\n      if (template) {\n        template.bindingDelegate = this.syntax;\n      }\n    }\n  };\n\n  // exports\n  scope.api.declaration.mdv = mdv;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n  \n  var api = scope.api;\n  var isBase = scope.isBase;\n  var extend = scope.extend;\n\n  // prototype api\n\n  var prototype = {\n\n    register: function(name, extendeeName) {\n      // build prototype combining extendee, Polymer base, and named api\n      this.buildPrototype(name, extendeeName);\n      // register our custom element with the platform\n      this.registerPrototype(name, extendeeName);\n      // reference constructor in a global named by 'constructor' attribute\n      this.publishConstructor();\n    },\n\n    buildPrototype: function(name, extendeeName) {\n      // get our custom prototype (before chaining)\n      var extension = scope.getRegisteredPrototype(name);\n      // get basal prototype\n      var base = this.generateBasePrototype(extendeeName);\n      // implement declarative features\n      this.desugarBeforeChaining(extension, base);\n      // join prototypes\n      this.prototype = this.chainPrototypes(extension, base);\n      // more declarative features\n      this.desugarAfterChaining(name, extendeeName);\n    },\n\n    desugarBeforeChaining: function(prototype, base) {\n      // back reference declaration element\n      // TODO(sjmiles): replace `element` with `elementElement` or `declaration`\n      prototype.element = this;\n      // transcribe `attributes` declarations onto own prototype's `publish`\n      this.publishAttributes(prototype, base);\n      // `publish` properties to the prototype and to attribute watch\n      this.publishProperties(prototype, base);\n      // infer observers for `observe` list based on method names\n      this.inferObservers(prototype);\n      // desugar compound observer syntax, e.g. 'a b c' \n      this.explodeObservers(prototype);\n    },\n\n    chainPrototypes: function(prototype, base) {\n      // chain various meta-data objects to inherited versions\n      this.inheritMetaData(prototype, base);\n      // chain custom api to inherited\n      var chained = this.chainObject(prototype, base);\n      // x-platform fixup\n      ensurePrototypeTraversal(chained);\n      return chained;\n    },\n\n    inheritMetaData: function(prototype, base) {\n      // chain observe object to inherited\n      this.inheritObject('observe', prototype, base);\n      // chain publish object to inherited\n      this.inheritObject('publish', prototype, base);\n      // chain reflect object to inherited\n      this.inheritObject('reflect', prototype, base);\n      // chain our lower-cased publish map to the inherited version\n      this.inheritObject('_publishLC', prototype, base);\n      // chain our instance attributes map to the inherited version\n      this.inheritObject('_instanceAttributes', prototype, base);\n      // chain our event delegates map to the inherited version\n      this.inheritObject('eventDelegates', prototype, base);\n    },\n\n    // implement various declarative features\n    desugarAfterChaining: function(name, extendee) {\n      // build side-chained lists to optimize iterations\n      this.optimizePropertyMaps(this.prototype);\n      this.createPropertyAccessors(this.prototype);\n      // install mdv delegate on template\n      this.installBindingDelegate(this.fetchTemplate());\n      // install external stylesheets as if they are inline\n      this.installSheets();\n      // adjust any paths in dom from imports\n      this.resolveElementPaths(this);\n      // compile list of attributes to copy to instances\n      this.accumulateInstanceAttributes();\n      // parse on-* delegates declared on `this` element\n      this.parseHostEvents();\n      //\n      // install a helper method this.resolvePath to aid in \n      // setting resource urls. e.g.\n      // this.$.image.src = this.resolvePath('images/foo.png')\n      this.addResolvePathApi();\n      // under ShadowDOMPolyfill, transforms to approximate missing CSS features\n      if (window.ShadowDOMPolyfill) {\n        Platform.ShadowCSS.shimStyling(this.templateContent(), name, extendee);\n      }\n      // allow custom element access to the declarative context\n      if (this.prototype.registerCallback) {\n        this.prototype.registerCallback(this);\n      }\n    },\n\n    // if a named constructor is requested in element, map a reference\n    // to the constructor to the given symbol\n    publishConstructor: function() {\n      var symbol = this.getAttribute('constructor');\n      if (symbol) {\n        window[symbol] = this.ctor;\n      }\n    },\n\n    // build prototype combining extendee, Polymer base, and named api\n    generateBasePrototype: function(extnds) {\n      var prototype = this.findBasePrototype(extnds);\n      if (!prototype) {\n        // create a prototype based on tag-name extension\n        var prototype = HTMLElement.getPrototypeForTag(extnds);\n        // insert base api in inheritance chain (if needed)\n        prototype = this.ensureBaseApi(prototype);\n        // memoize this base\n        memoizedBases[extnds] = prototype;\n      }\n      return prototype;\n    },\n\n    findBasePrototype: function(name) {\n      return memoizedBases[name];\n    },\n\n    // install Polymer instance api into prototype chain, as needed \n    ensureBaseApi: function(prototype) {\n      if (prototype.PolymerBase) {\n        return prototype;\n      }\n      var extended = Object.create(prototype);\n      // we need a unique copy of base api for each base prototype\n      // therefore we 'extend' here instead of simply chaining\n      api.publish(api.instance, extended);\n      // TODO(sjmiles): sharing methods across prototype chains is\n      // not supported by 'super' implementation which optimizes\n      // by memoizing prototype relationships.\n      // Probably we should have a version of 'extend' that is \n      // share-aware: it could study the text of each function,\n      // look for usage of 'super', and wrap those functions in\n      // closures.\n      // As of now, there is only one problematic method, so \n      // we just patch it manually.\n      // To avoid re-entrancy problems, the special super method\n      // installed is called `mixinSuper` and the mixin method\n      // must use this method instead of the default `super`.\n      this.mixinMethod(extended, prototype, api.instance.mdv, 'bind');\n      // return buffed-up prototype\n      return extended;\n    },\n\n    mixinMethod: function(extended, prototype, api, name) {\n      var $super = function(args) {\n        return prototype[name].apply(this, args);\n      };\n      extended[name] = function() {\n        this.mixinSuper = $super;\n        return api[name].apply(this, arguments);\n      }\n    },\n\n    // ensure prototype[name] inherits from a prototype.prototype[name]\n    inheritObject: function(name, prototype, base) {\n      // require an object\n      var source = prototype[name] || {};\n      // chain inherited properties onto a new object\n      prototype[name] = this.chainObject(source, base[name]);\n    },\n\n    // register 'prototype' to custom element 'name', store constructor \n    registerPrototype: function(name, extendee) { \n      var info = {\n        prototype: this.prototype\n      }\n      // native element must be specified in extends\n      var typeExtension = this.findTypeExtension(extendee);\n      if (typeExtension) {\n        info.extends = typeExtension;\n      }\n      // register the prototype with HTMLElement for name lookup\n      HTMLElement.register(name, this.prototype);\n      // register the custom type\n      this.ctor = document.registerElement(name, info);\n    },\n\n    findTypeExtension: function(name) {\n      if (name && name.indexOf('-') < 0) {\n        return name;\n      } else {\n        var p = this.findBasePrototype(name);\n        if (p.element) {\n          return this.findTypeExtension(p.element.extends);\n        }\n      }\n    }\n\n  };\n\n  // memoize base prototypes\n  var memoizedBases = {};\n\n  // implementation of 'chainObject' depends on support for __proto__\n  if (Object.__proto__) {\n    prototype.chainObject = function(object, inherited) {\n      if (object && inherited && object !== inherited) {\n        object.__proto__ = inherited;\n      }\n      return object;\n    }\n  } else {\n    prototype.chainObject = function(object, inherited) {\n      if (object && inherited && object !== inherited) {\n        var chained = Object.create(inherited);\n        object = extend(chained, object);\n      }\n      return object;\n    }\n  }\n\n  // On platforms that do not support __proto__ (versions of IE), the prototype\n  // chain of a custom element is simulated via installation of __proto__.\n  // Although custom elements manages this, we install it here so it's\n  // available during desugaring.\n  function ensurePrototypeTraversal(prototype) {\n    if (!Object.__proto__) {\n      var ancestor = Object.getPrototypeOf(prototype);\n      prototype.__proto__ = ancestor;\n      if (isBase(ancestor)) {\n        ancestor.__proto__ = Object.getPrototypeOf(ancestor);\n      }\n    }\n  }\n\n  // exports\n\n  api.declaration.prototype = prototype;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  /*\n\n    Elements are added to a registration queue so that they register in \n    the proper order at the appropriate time. We do this for a few reasons:\n\n    * to enable elements to load resources (like stylesheets) \n    asynchronously. We need to do this until the platform provides an efficient\n    alternative. One issue is that remote @import stylesheets are \n    re-fetched whenever stamped into a shadowRoot.\n\n    * to ensure elements loaded 'at the same time' (e.g. via some set of\n    imports) are registered as a batch. This allows elements to be enured from\n    upgrade ordering as long as they query the dom tree 1 task after\n    upgrade (aka domReady). This is a performance tradeoff. On the one hand,\n    elements that could register while imports are loading are prevented from \n    doing so. On the other, grouping upgrades into a single task means less\n    incremental work (for example style recalcs),  Also, we can ensure the \n    document is in a known state at the single quantum of time when \n    elements upgrade.\n\n  */\n  var queue = {\n    // tell the queue to wait for an element to be ready\n    wait: function(element, check, go) {\n      var shouldAdd = (this.indexOf(element) === -1 && \n          flushQueue.indexOf(element) === -1);\n      if (shouldAdd) {\n        this.add(element);\n        element.__check = check;\n        element.__go = go;\n      }\n      return (this.indexOf(element) !== 0);\n    },\n    add: function(element) {\n      //console.log('queueing', element.name);\n      queueForElement(element).push(element);\n    },\n    indexOf: function(element) {\n      var i = queueForElement(element).indexOf(element);\n      if (i >= 0 && document.contains(element)) {\n        i += (HTMLImports.useNative || HTMLImports.ready) ? \n          importQueue.length : 1e9;\n      }\n      return i;  \n    },\n    // tell the queue an element is ready to be registered\n    go: function(element) {\n      var readied = this.remove(element);\n      if (readied) {\n        this.addToFlushQueue(readied);\n        this.check();\n      }\n    },\n    remove: function(element) {\n      var i = this.indexOf(element);\n      if (i !== 0) {\n        //console.warn('queue order wrong', i);\n        return;\n      }\n      return queueForElement(element).shift();\n    },\n    check: function() {\n      // next\n      var element = this.nextElement();\n      if (element) {\n        element.__check.call(element);\n      }\n      if (this.canReady()) {\n        this.ready();\n        return true;\n      }\n    },\n    nextElement: function() {\n      return nextQueued();\n    },\n    canReady: function() {\n      return !this.waitToReady && this.isEmpty();\n    },\n    isEmpty: function() {\n      return !importQueue.length && !mainQueue.length;\n    },\n    addToFlushQueue: function(element) {\n      flushQueue.push(element);  \n    },\n    flush: function() {\n      var element;\n      while (flushQueue.length) {\n        element = flushQueue.shift();\n        element.__go.call(element);\n        element.__check = element.__go = null;\n      }\n    },\n    ready: function() {\n      this.flush();\n      // TODO(sorvell): As an optimization, turn off CE polyfill upgrading\n      // while registering. This way we avoid having to upgrade each document\n      // piecemeal per registration and can instead register all elements\n      // and upgrade once in a batch. Without this optimization, upgrade time\n      // degrades significantly when SD polyfill is used. This is mainly because\n      // querying the document tree for elements is slow under the SD polyfill.\n      if (CustomElements.ready === false) {\n        CustomElements.upgradeDocumentTree(document);\n        CustomElements.ready = true;\n      }\n      Platform.flush();\n      requestAnimationFrame(this.flushReadyCallbacks);\n    },\n    addReadyCallback: function(callback) {\n      if (callback) {\n        readyCallbacks.push(callback);\n      }\n    },\n    flushReadyCallbacks: function() {\n      if (readyCallbacks) {\n        var fn;\n        while (readyCallbacks.length) {\n          fn = readyCallbacks.shift();\n          fn();\n        }\n      }\n    },\n    waitToReady: true\n  };\n\n  var flushQueue = [];\n\n  var importQueue = [];\n  var mainQueue = [];\n  var readyCallbacks = [];\n\n  function queueForElement(element) {\n    return document.contains(element) ? mainQueue : importQueue;\n  }\n\n  function nextQueued() {\n    return importQueue.length ? importQueue[0] : mainQueue[0];\n  }\n\n  var polymerReadied = false; \n\n  document.addEventListener('WebComponentsReady', function() {\n    CustomElements.ready = false;\n  });\n  \n  function whenPolymerReady(callback) {\n    queue.waitToReady = true;\n    CustomElements.ready = false;\n    HTMLImports.whenImportsReady(function() {\n      queue.addReadyCallback(callback);\n      queue.waitToReady = false;\n      queue.check();\n    });\n  }\n\n  // exports\n  scope.queue = queue;\n  scope.whenPolymerReady = whenPolymerReady;\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  var whenPolymerReady = scope.whenPolymerReady;\n\n  function importElements(elementOrFragment, callback) {\n    if (elementOrFragment) {\n      document.head.appendChild(elementOrFragment);\n      whenPolymerReady(callback);\n    } else if (callback) {\n      callback();\n    }\n  }\n\n  function importUrls(urls, callback) {\n    if (urls && urls.length) {\n        var frag = document.createDocumentFragment();\n        for (var i=0, l=urls.length, url, link; (i<l) && (url=urls[i]); i++) {\n          link = document.createElement('link');\n          link.rel = 'import';\n          link.href = url;\n          frag.appendChild(link);\n        }\n        importElements(frag, callback);\n    } else if (callback) {\n      callback();\n    }\n  }\n\n  // exports\n  scope.import = importUrls;\n  scope.importElements = importElements;\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function(scope) {\n\n  // imports\n\n  var extend = scope.extend;\n  var api = scope.api;\n  var queue = scope.queue;\n  var whenPolymerReady = scope.whenPolymerReady;\n  var getRegisteredPrototype = scope.getRegisteredPrototype;\n  var waitingForPrototype = scope.waitingForPrototype;\n\n  // declarative implementation: <polymer-element>\n\n  var prototype = extend(Object.create(HTMLElement.prototype), {\n\n    createdCallback: function() {\n      if (this.getAttribute('name')) {\n        this.init();\n      }\n    },\n\n    init: function() {\n      // fetch declared values\n      this.name = this.getAttribute('name');\n      this.extends = this.getAttribute('extends');\n      // initiate any async resource fetches\n      this.loadResources();\n      // register when all constraints are met\n      this.registerWhenReady();\n    },\n\n    registerWhenReady: function() {\n     if (this.registered\n       || this.waitingForPrototype(this.name)\n       || this.waitingForQueue()\n       || this.waitingForResources()) {\n          return;\n      }\n      // TODO(sorvell): ends up calling '_register' by virtue\n      // of `waitingForQueue` (see below)\n      queue.go(this);\n    },\n\n    // TODO(sorvell): refactor, this method is private-ish, but it's being\n    // called by the queue object.\n    _register: function() {\n      //console.log('registering', this.name);\n      //console.group('registering', this.name);\n      // warn if extending from a custom element not registered via Polymer\n      if (isCustomTag(this.extends) && !isRegistered(this.extends)) {\n        console.warn('%s is attempting to extend %s, an unregistered element ' +\n            'or one that was not registered with Polymer.', this.name,\n            this.extends);\n      }\n      this.register(this.name, this.extends);\n      this.registered = true;\n      //console.groupEnd();\n    },\n\n    waitingForPrototype: function(name) {\n      if (!getRegisteredPrototype(name)) {\n        // then wait for a prototype\n        waitingForPrototype(name, this);\n        // emulate script if user is not supplying one\n        this.handleNoScript(name);\n        // prototype not ready yet\n        return true;\n      }\n    },\n\n    handleNoScript: function(name) {\n      // if explicitly marked as 'noscript'\n      if (this.hasAttribute('noscript') && !this.noscript) {\n        this.noscript = true;\n        // TODO(sorvell): CustomElements polyfill awareness:\n        // noscript elements should upgrade in logical order\n        // script injection ensures this under native custom elements;\n        // under imports + ce polyfills, scripts run before upgrades.\n        // dependencies should be ready at upgrade time so register\n        // prototype at this time.\n        if (window.CustomElements && !CustomElements.useNative) {\n          Polymer(name);\n        } else {\n          var script = document.createElement('script');\n          script.textContent = 'Polymer(\\'' + name + '\\');';\n          this.appendChild(script);\n        }\n      }\n    },\n\n    waitingForResources: function() {\n      return this._needsResources;\n    },\n\n    // NOTE: Elements must be queued in proper order for inheritance/composition\n    // dependency resolution. Previously this was enforced for inheritance,\n    // and by rule for composition. It's now entirely by rule.\n    waitingForQueue: function() {\n      return queue.wait(this, this.registerWhenReady, this._register);\n    },\n\n    loadResources: function() {\n      this._needsResources = true;\n      this.loadStyles(function() {\n        this._needsResources = false;\n        this.registerWhenReady();\n      }.bind(this));\n    }\n\n  });\n\n  // semi-pluggable APIs \n\n  // TODO(sjmiles): should be fully pluggable (aka decoupled, currently\n  // the various plugins are allowed to depend on each other directly)\n  api.publish(api.declaration, prototype);\n\n  // utility and bookkeeping\n\n  function isRegistered(name) {\n    return Boolean(HTMLElement.getPrototypeForTag(name));\n  }\n\n  function isCustomTag(name) {\n    return (name && name.indexOf('-') >= 0);\n  }\n\n  // boot tasks\n\n  whenPolymerReady(function() {\n    document.body.removeAttribute('unresolved');\n    document.dispatchEvent(\n      new CustomEvent('polymer-ready', {bubbles: true})\n    );\n  });\n\n  // register polymer-element with document\n\n  document.registerElement('polymer-element', {prototype: prototype});\n\n})(Polymer);\n","/*\n * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * The `auto-binding` element extends the template element. It provides a quick \n * and easy way to do data binding without the need to setup a model. \n * The `auto-binding` element itself serves as the model and controller for the \n * elements it contains. Both data and event handlers can be bound. \n *\n * The `auto-binding` element acts just like a template that is bound to \n * a model. It stamps its content in the dom adjacent to itself. When the \n * content is stamped, the `template-bound` event is fired.\n *\n * Example:\n *\n *     <template is=\"auto-binding\">\n *       <div>Say something: <input value=\"{{value}}\"></div>\n *       <div>You said: {{value}}</div>\n *       <button on-tap=\"{{buttonTap}}\">Tap me!</button>\n *     </template>\n *     <script>\n *       var template = document.querySelector('template');\n *       template.value = 'something';\n *       template.buttonTap = function() {\n *         console.log('tap!');\n *       };\n *     </script>\n *\n * @module Polymer\n * @status stable\n*/\n\n(function() {\n\n  var element = document.createElement('polymer-element');\n  element.setAttribute('name', 'auto-binding');\n  element.setAttribute('extends', 'template');\n  element.init();\n\n  Polymer('auto-binding', {\n\n    createdCallback: function() {\n      this.syntax = this.bindingDelegate = this.makeSyntax();\n      // delay stamping until polymer-ready so that auto-binding is not\n      // required to load last.\n      Polymer.whenPolymerReady(function() {\n        this.model = this;\n        this.setAttribute('bind', '');\n        // we don't bother with an explicit signal here, we could ust a MO\n        // if necessary\n        this.async(function() {\n          // note: this will marshall *all* the elements in the parentNode\n          // rather than just stamped ones. We'd need to use createInstance\n          // to fix this or something else fancier.\n          this.marshalNodeReferences(this.parentNode);\n          // template stamping is asynchronous so stamping isn't complete\n          // by polymer-ready; fire an event so users can use stamped elements\n          this.fire('template-bound');\n        });\n      }.bind(this));\n    },\n\n    makeSyntax: function() {\n      var events = Object.create(Polymer.api.declaration.events);\n      var self = this;\n      events.findController = function() { return self.model; };\n\n      var syntax = new PolymerExpressions();\n      var prepareBinding = syntax.prepareBinding;  \n      syntax.prepareBinding = function(pathString, name, node) {\n        return events.prepareEventBinding(pathString, name, node) ||\n               prepareBinding.call(syntax, pathString, name, node);\n      };\n      return syntax;\n    }\n\n  });\n\n})();\n"]}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
