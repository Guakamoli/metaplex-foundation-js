'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var BN = require('bn.js');
var assert = require('../utils/assert.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BN__default = /*#__PURE__*/_interopDefaultLegacy(BN);

const toBigNumber = (value, endian) => {
  return new BN__default["default"](value, endian);
};
const toOptionBigNumber = value => {
  return value === null ? null : toBigNumber(value);
};
const isBigNumber = value => {
  return (value === null || value === void 0 ? void 0 : value.__opaque__) === 'BigNumber';
};
function assertBigNumber(value) {
  assert["default"](isBigNumber(value), 'Expected BigNumber type');
}

exports.assertBigNumber = assertBigNumber;
exports.isBigNumber = isBigNumber;
exports.toBigNumber = toBigNumber;
exports.toOptionBigNumber = toOptionBigNumber;
//# sourceMappingURL=BigNumber.cjs.map
