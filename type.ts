export interface Score {
    timeStamp: Date,
    playerId: string,
    score: number
}

export interface ScoreOrigin {
    create_timestamp?: string,
    player_id?: string,
    score?: string
}


export interface Player {
    playerId:string,
    handleName:string,
}

export interface PlayerOrigin {
    player_id?:string,
    handle_name?:string,
}


export interface Rank {
    rank:number,
    playerId:string,
    handleName:string,
    score:number,
};


export const InitScore = ():Score => {
    return {
        timeStamp: new Date,
        playerId: '',
        score: 0
    }
}

export const InitPlayer = (): Player => {
    return {
        playerId: '',
        handleName:''
    }
}

export const InitRank = (): Rank => {
    return {
        rank: 1,
        playerId:'',
        handleName:'',
        score: 0, 
    }
}