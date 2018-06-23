export enum PickType {
    Adjacent,
    Diagonal
};

export enum Coin {
    Head,
    Tail
}

export class RoundTableError extends Error {};

export interface RoundTable {
    isReady():boolean;
    pickTwo(type: PickType):Coin[];
    putBack(coins:Coin[]);
    getAttempts():number;
};
