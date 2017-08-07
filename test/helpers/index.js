"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
exports.expectThrow = function (promise) { return __awaiter(_this, void 0, void 0, function () {
    var error_1, invalidJump, invalidOpcode, outOfGas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, promise];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                invalidJump = error_1.message.search('invalid JUMP') >= 0;
                invalidOpcode = error_1.message.search('invalid opcode') >= 0;
                outOfGas = error_1.message.search('out of gas') >= 0;
                assert(invalidJump || invalidOpcode || outOfGas, "Expected throw, got '" + error_1 + "' instead");
                return [2 /*return*/];
            case 3:
                assert.fail('Expected throw not received');
                return [2 /*return*/];
        }
    });
}); };
exports.mineBlocks = function (num) {
    if (num === void 0) { num = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_mine", id: i }, function (err, result) { resolve(); }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < num)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.blockNumber = function () {
    return new Promise(function (resolve, reject) {
        window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "eth_blockNumber", id: 0x05 }, function (err, result) { resolve(parseInt(result.result)); });
    });
};
exports.snapshot = function () {
    return new Promise(function (resolve, reject) {
        window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_snapshot", id: 0xabcd }, function (err, result) { resolve(); });
    });
};
exports.revert = function () {
    return new Promise(function (resolve, reject) {
        window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_revert", id: 0xabcd }, function (err, result) { resolve(); });
    });
};
exports.reset = function () {
    return new Promise(function (resolve, reject) {
        window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_reset", id: 0xabce }, function (err, result) { resolve(); });
    });
};
//# sourceMappingURL=index.js.map