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
var TTT = artifacts.require("TTT");
var index_1 = require("./helpers/index");
var assert = require("assert");
var player1, player2, thirdWheel;
var ttt = null;
var ticketPrice = 3 * Math.pow(10, 15);
contract("TTT Payable", function (accounts) {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TTT.deployed()];
                case 1:
                    ttt = _a.sent();
                    player1 = accounts[0];
                    player2 = accounts[1];
                    thirdWheel = accounts[2];
                    return [2 /*return*/];
            }
        });
    }); });
    contract("Players joining", function () {
        it("2 Players should join ", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, ttt.JoinGame({ from: player1, value: ticketPrice })];
                    case 1:
                        _e.sent();
                        _b = (_a = assert).equal;
                        return [4 /*yield*/, ttt.Player1()];
                    case 2:
                        _b.apply(_a, [_e.sent(), player1, "Addresses should be equal"]);
                        return [4 /*yield*/, ttt.JoinGame({ from: player2, value: ticketPrice })];
                    case 3:
                        _e.sent();
                        _d = (_c = assert).equal;
                        return [4 /*yield*/, ttt.Player2()];
                    case 4:
                        _d.apply(_c, [_e.sent(), player2, "Addresses should be equal"]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("3 player should not be able to join", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, index_1.expectThrow(ttt.JoinGame({ from: thirdWheel, value: ticketPrice }))];
                    case 1:
                        _e.sent();
                        _b = (_a = assert).equal;
                        return [4 /*yield*/, ttt.Player1()];
                    case 2:
                        _b.apply(_a, [_e.sent(), player1, "Addresses should be equal"]);
                        _d = (_c = assert).equal;
                        return [4 /*yield*/, ttt.Player2()];
                    case 3:
                        _d.apply(_c, [_e.sent(), player2, "Addresses should be equal"]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    contract("Test join without paying, underpaying, overpaying", function () {
        it("Player can't join without paying", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        index_1.expectThrow(ttt.JoinGame({ from: player1 }));
                        _b = (_a = assert).equal;
                        return [4 /*yield*/, ttt.Player1()];
                    case 1:
                        _b.apply(_a, [_c.sent(), 0, "Addresses should be equal"]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Player can't join because of underpaying", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        index_1.expectThrow(ttt.JoinGame({ from: player1, value: ticketPrice - 1 }));
                        _b = (_a = assert).equal;
                        return [4 /*yield*/, ttt.Player1()];
                    case 1:
                        _b.apply(_a, [_c.sent(), 0, "Addresses should be equal"]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Player can't join because of overpaying", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        index_1.expectThrow(ttt.JoinGame({ from: player1, value: ticketPrice + 1 }));
                        _b = (_a = assert).equal;
                        return [4 /*yield*/, ttt.Player1()];
                    case 1:
                        _b.apply(_a, [_c.sent(), 0, "Addresses should be equal"]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    contract("Full Game Sequence payable", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            it("Should play full game", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, gameState, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0: return [4 /*yield*/, ttt.JoinGame({ from: player1, value: ticketPrice })];
                        case 1:
                            _j.sent();
                            return [4 /*yield*/, ttt.JoinGame({ from: player2, value: ticketPrice })];
                        case 2:
                            _j.sent();
                            _b = (_a = assert).equal;
                            return [4 /*yield*/, ttt.Player1()];
                        case 3:
                            _b.apply(_a, [_j.sent(), player1, "Addresses should be equal"]);
                            _d = (_c = assert).equal;
                            return [4 /*yield*/, ttt.Player2()];
                        case 4:
                            _d.apply(_c, [_j.sent(), player2, "Addresses should be equal"]);
                            _f = (_e = assert).equal;
                            return [4 /*yield*/, ttt.WaitingForPlayersMove()];
                        case 5:
                            _f.apply(_e, [_j.sent(), player1, "Addresses should match"]);
                            return [4 /*yield*/, ttt.GameState()];
                        case 6:
                            gameState = _j.sent();
                            assert.equal(gameState[0], "---");
                            assert.equal(gameState[1], "---");
                            assert.equal(gameState[2], "---");
                            // Make first move
                            return [4 /*yield*/, ttt.MakeMove(1, { from: player1 })];
                        case 7:
                            // Make first move
                            _j.sent();
                            return [4 /*yield*/, ttt.GameState()];
                        case 8:
                            gameState = _j.sent();
                            assert.equal(gameState[0], "X--");
                            assert.equal(gameState[1], "---");
                            assert.equal(gameState[2], "---");
                            return [4 /*yield*/, ttt.MakeMove(2, { from: player2 })];
                        case 9:
                            _j.sent();
                            return [4 /*yield*/, ttt.GameState()];
                        case 10:
                            gameState = _j.sent();
                            assert.equal(gameState[0], "XO-");
                            assert.equal(gameState[1], "---");
                            assert.equal(gameState[2], "---");
                            return [4 /*yield*/, ttt.MakeMove(4, { from: player1 })];
                        case 11:
                            _j.sent();
                            return [4 /*yield*/, ttt.MakeMove(5, { from: player2 })];
                        case 12:
                            _j.sent();
                            return [4 /*yield*/, ttt.MakeMove(7, { from: player1 })];
                        case 13:
                            _j.sent();
                            return [4 /*yield*/, ttt.GameState()];
                        case 14:
                            gameState = _j.sent();
                            assert.equal(gameState[2], "GG WP");
                            // check for winner address
                            _h = (_g = assert).equal;
                            return [4 /*yield*/, ttt.GetLastWinnerAddress()];
                        case 15:
                            // check for winner address
                            _h.apply(_g, [_j.sent(), player1]);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=testingForTTT.js.map