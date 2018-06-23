enum CoinType {
    Head,
    Tail
}

export class Coin {
    protected readonly type:CoinType;

    private constructor(type:CoinType) {
        this.type = type;
    }

    static Head() {
        return new Coin(CoinType.Head);
    }

    static Tail() {
        return new Coin(CoinType.Tail);
    }

    flip() {
        return new Coin(this.type === CoinType.Head ? CoinType.Tail : CoinType.Head);
    }

    is(coin:Coin):boolean {
        return coin.type === this.type;
    }

    isNot(coin:Coin):boolean {
        return coin.type !== this.type;
    }

    text():string {
        return this.type === CoinType.Head ? "H" : "T";
    }
}