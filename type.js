"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitRank = exports.InitPlayer = exports.InitScore = void 0;
;
var InitScore = function () {
    return {
        timeStamp: new Date,
        playerId: '',
        score: 0
    };
};
exports.InitScore = InitScore;
var InitPlayer = function () {
    return {
        playerId: '',
        handleName: ''
    };
};
exports.InitPlayer = InitPlayer;
var InitRank = function () {
    return {
        rank: 1,
        playerId: '',
        handleName: '',
        score: 0,
    };
};
exports.InitRank = InitRank;
