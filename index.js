'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tv = require('tv4');

var _tv2 = _interopRequireDefault(_tv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createMiddleWare(schema, valid) {
	return function (_ref) {
		var dispatch = _ref.dispatch,
		    getState = _ref.getState;
		return function (next) {
			return function (action) {
				next(action);
				var result = _tv2.default.validateResult(getState(), schema);
				if (!result.valid) {
					console.log('%cState Validation Failed:', 'background: #e74c3c; color: white', _defineProperty({}, result.error.dataPath, {
						message: result.error.message,
						validation: result.error.params
					}));
				} else {
					if (valid) {
						return console.info('%cState Validation Passing', 'background: #27ae60; color: white');
					}
				}
			};
		};
	};
}

var ReduxJsonSchema = createMiddleWare();
ReduxJsonSchema.Schema = createMiddleWare;

exports.default = ReduxJsonSchema;
