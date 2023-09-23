"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputRank = exports.getRanks = exports.getScores = exports.getPlayers = void 0;
var type_1 = require("./type");
var fs = require("fs");
var csvParser = require('csv-parser');
var getPlayers = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var players_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                players_1 = [];
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        fs.createReadStream(path)
                            .pipe(csvParser())
                            .on('data', function (row) {
                            var _a, _b;
                            var tempPlayerId = (_a = row.player_id) !== null && _a !== void 0 ? _a : '';
                            var tempHandleName = (_b = row.handle_name) !== null && _b !== void 0 ? _b : '';
                            if (tempPlayerId === '' || tempHandleName === '') {
                                throw new Error('invalid player file.');
                            }
                            var player = {
                                playerId: tempPlayerId,
                                handleName: tempHandleName
                            };
                            players_1.push(player);
                        })
                            .on('end', function () {
                            resolve();
                        })
                            .on('error', function (error) {
                            reject(error);
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, players_1];
            case 2:
                error_1 = _a.sent();
                throw new Error('failed to get players.');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPlayers = getPlayers;
var getScores = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var scores_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                scores_1 = [];
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        fs.createReadStream(path)
                            .pipe(csvParser())
                            .on('data', function (row) {
                            var _a, _b, _c;
                            var tempTimeStamp = (_a = row.create_timestamp) !== null && _a !== void 0 ? _a : '';
                            var tempPlayerId = (_b = row.player_id) !== null && _b !== void 0 ? _b : '';
                            var tempScore = (_c = row.score) !== null && _c !== void 0 ? _c : '';
                            if (tempTimeStamp === '' || tempPlayerId === '' || tempScore === '') {
                                throw new Error('invalid score file');
                            }
                            var score = {
                                timeStamp: new Date(tempTimeStamp),
                                playerId: tempPlayerId,
                                score: parseInt(tempScore, 10),
                            };
                            scores_1.push(score);
                        })
                            .on('end', function () {
                            resolve();
                        })
                            .on('error', function (error) {
                            reject(error);
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, scores_1];
            case 2:
                error_2 = _a.sent();
                throw new Error('failed to get scores');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getScores = getScores;
var getRanks = function (players, scores) {
    var resultRanks = [];
    try {
        var resultRanks_1 = [];
        var playerIds = [];
        var preScore = 0;
        var rankNumber = 0;
        var diff = 0;
        scores.sort(sortRank);
        for (var _i = 0, scores_2 = scores; _i < scores_2.length; _i++) {
            var score = scores_2[_i];
            var handleName = getHandleName(score.playerId, players);
            var rankItem = (0, type_1.InitRank)();
            if (handleName === '')
                continue;
            if (playerIds.length === 10)
                break;
            if (preScore !== score.score) {
                rankNumber++;
                rankNumber += diff;
                diff = 0;
            }
            else {
                diff++;
            }
            rankItem.rank = rankNumber;
            rankItem.playerId = score.playerId;
            rankItem.handleName = handleName;
            rankItem.score = score.score;
            resultRanks_1.push(rankItem);
            if (playerIds.includes(score.playerId) === false) {
                playerIds.push(score.playerId);
            }
            preScore = score.score;
        }
        return resultRanks_1;
    }
    catch (error) {
        throw new Error('failed rank list.');
    }
};
exports.getRanks = getRanks;
var sortRank = function (a, b) {
    if (a.score !== b.score) {
        return b.score - a.score;
    }
    else {
        return a.playerId.localeCompare(b.playerId);
    }
};
var getHandleName = function (playerId, players) {
    for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
        var player = players_2[_i];
        if (player.playerId === playerId) {
            return player.handleName;
        }
    }
    return '';
};
var outputRank = function (rankList) {
    console.log('rank,player_id,handle_name,score');
    for (var _i = 0, rankList_1 = rankList; _i < rankList_1.length; _i++) {
        var rank = rankList_1[_i];
        console.log("".concat(rank.rank, ",").concat(rank.playerId, ",").concat(rank.handleName, ",").concat(rank.score));
    }
};
exports.outputRank = outputRank;
