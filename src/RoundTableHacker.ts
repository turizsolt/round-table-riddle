import {PickType, RoundTable} from "./RoundTable";
import {Coin} from "./Coin";

export class RoundTableHacker {
    private table:RoundTable;

    constructor(tableImpl:RoundTable) {
        this.table = tableImpl;
    }

    play() {
        if(!this.table.isReady()){
            this.fourUnknownButDifferent();
        }

        if (!this.table.isReady()) throw new Error("Unknown Strategy failed");
        return this.table.getAttempts();
    }

    private fourUnknownButDifferent() {
        const coins = this.table.pickTwo(PickType.Adjacent);

        if (coins[0].is(coins[1])) {
            this.twoSameAdjacent(coins);
        } else {
            this.twoDifferentAdjacent();
        }
    }

    private twoDifferentAdjacent() {
        // TODO
        const newCoins: Coin[] = [Coin.Head(), Coin.Head()];
        this.table.putBack(newCoins);

        while (!this.table.isReady()) {
            const coins: Coin[] = this.table.pickTwo(PickType.Adjacent);
            const newCoins: Coin[] = [Coin.Head(), Coin.Head()];
            this.table.putBack(newCoins);
            if (this.table.getAttempts() > 99) break;
        }
    }

    private twoSameAdjacent(coins: Coin[]) {
        let pivot = coins[0];
        this.table.putBack(coins.map(c => c.flip()));
        if (this.table.isReady()) return;

        const coins2 = this.table.pickTwo(PickType.Diagonal);

        if (coins2[0].isNot(coins2[1])) {
            this.TwoDifferentDiagonalAndTwoPivotHidden(pivot.flip());
        } else {
            this.TwoSameDiagonalAndTwoDifferentHidden(coins2);
        }
    }

    private TwoSameDiagonalAndTwoDifferentHidden(coins2: Coin[]) {
        this.table.putBack([coins2[0], coins2[1].flip()]);

        const coins3 = this.table.pickTwo(PickType.Adjacent);

        if (coins3[0].is(coins3[1])) {
            this.TwoSameAdjacentAndTwoOtherHidden(coins3);
        } else {
            this.TwoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(coins3);
        }
    }

    private TwoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(coins3: Coin[]) {
        this.table.putBack([coins3[1], coins3[0]]);
        const coins4 = this.table.pickTwo(PickType.Diagonal);

        this.TwoSameDiagonalTwoOtherHidden(coins4);
    }

    private TwoSameDiagonalTwoOtherHidden(coins4: Coin[]) {
        this.table.putBack(coins4.map(c => c.flip()));
        if (!this.table.isReady()) throw new Error("Strategy 3 failed");
    }

    private TwoSameAdjacentAndTwoOtherHidden(coins3: Coin[]) {
        this.table.putBack(coins3.map(c => c.flip()));
        if (!this.table.isReady()) throw new Error("Strategy 2 failed");
    }

    private TwoDifferentDiagonalAndTwoPivotHidden(pivot: Coin) {
        this.table.putBack([pivot, pivot]);
        if (!this.table.isReady()) throw new Error("Strategy 1 failed");
    }
}