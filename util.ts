import { InitPlayer, InitRank, InitScore, Player, PlayerOrigin, Rank, Score, ScoreOrigin } from "./type";
import * as fs from 'fs';
const csvParser = require('csv-parser');

export const getPlayers =  async (path:string ): Promise<Array<Player>> => {
    try{
        const players:Array<Player> = [];

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csvParser())
                .on('data', (row: PlayerOrigin) => {
                    let tempPlayerId = row.player_id ?? '';
                    let tempHandleName = row.handle_name ?? '';

                    if (tempPlayerId === '' || tempHandleName === ''){
                        throw new Error('invalid player file.');
                    }

                    const player: Player = {
                        playerId: tempPlayerId,
                        handleName: tempHandleName
                    };
                    players.push(player);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error: Error) => {
                    reject(error);
                });
            });

        return players;
    }
    catch(error){
        throw new Error('failed to get players.')
    }
} 

export const getScores = async ( path: string ): Promise<Array<Score>> => {
    try{
        const scores: Array<Score> = [];
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csvParser())
                .on('data', (row: ScoreOrigin) => {
                    let tempTimeStamp: string = row.create_timestamp ?? '';
                    let tempPlayerId: string = row.player_id ?? '';
                    let tempScore: string = row.score ?? '';
                    if (tempTimeStamp === '' || tempPlayerId === '' || tempScore === ''){
                        throw new Error('invalid score file')
                    }
                    const score: Score = {
                        timeStamp: new Date(tempTimeStamp),
                        playerId: tempPlayerId,
                        score: parseInt(tempScore, 10),
                    };
                    scores.push(score);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error: Error) => {
                    reject(error);
                });
            });

        return scores;
    }
    catch(error){
        throw new Error('failed to get scores');
    }
}

export const getRanks = (players: Array<Player>, scores: Array<Score>): Array<Rank> => {
    let resultRanks: Array<Rank> = [];
    try{
        let resultRanks: Array<Rank> = [];
        let playerIds: Array<string> = [];
        let preScore: number = 0;
        let rankNumber: number = 0;
        let diff: number = 0;
        scores.sort(sortRank);

        for(const score of scores){ 
            let handleName: string = getHandleName(score.playerId, players);
            const rankItem: Rank = InitRank();

            if (handleName === '')
                continue;

            if(playerIds.length === 10)
                break;

            if (preScore !== score.score){
                rankNumber++;
                rankNumber += diff;
                diff = 0;
            }
            else{
                diff++;
            }

            rankItem.rank = rankNumber;
            rankItem.playerId = score.playerId;
            rankItem.handleName = handleName;
            rankItem.score = score.score;
            resultRanks.push(rankItem);

            if (playerIds.includes(score.playerId) === false){
                playerIds.push(score.playerId);
            }
            preScore = score.score;
        }
        return resultRanks;
    }
    catch(error){
        throw new Error('failed rank list.');
    }
}

const sortRank = (a: Score, b: Score): number => {
    if (a.score !== b.score){
        return b.score - a.score;
    } 
    else {
        return a.playerId.localeCompare(b.playerId);
    }
}

const getHandleName = (playerId: string, players: Array<Player>): string => {
    for (const player of players){
        if (player.playerId === playerId){
            return player.handleName;
        }
    }
    return '';
}

export const outputRank = (rankList:Array<Rank>) => {
    console.log('rank,player_id,handle_name,score');
    for (const rank of rankList){
        console.log(`${rank.rank},${rank.playerId},${rank.handleName},${rank.score}`);
    }
}