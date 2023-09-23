import { Player, Rank, Score } from './type';
import { getPlayers, getRanks, getScores, outputRank } from './util';
import * as fs from 'fs';


const main = async (argv: string[]) => {
    try{
        let players: Array<Player> = [];
        let scores: Array<Score> = [];
        let ranks: Array<Rank> = [];
        if (argv.length != 2){
            console.log('入力引数の数が不正です。');
            process.exit(1);
        }
        if (fs.existsSync(argv[0]) === false)
            process.exit(1);
        if (fs.existsSync(argv[1]) === false)
            process.exit(1);
        players = await getPlayers(argv[0]);
        scores = await getScores(argv[1]);
        ranks = getRanks(players, scores);
        outputRank(ranks);
    }
    catch(error){
        process.exit(1);
    }
}

main(process.argv.slice(2))