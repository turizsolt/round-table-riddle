import {Coin} from "./Coin";

export enum PickType {
    Adjacent,
    Diagonal
};

export class RoundTableError extends Error {};

export interface RoundTable {
    isReady():boolean;
    pickTwo(type: PickType):Coin[];
    putBack(coins:Coin[]);
    getAttempts():number;
};
