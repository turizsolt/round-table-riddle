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
        this.debugText("fourUnknownButDifferent");
        const coins = this.table.pickTwo(PickType.Adjacent);

        if (coins[0].is(coins[1])) {
            this.twoSameAdjacent(coins);
        } else {
            this.twoDifferentAdjacent();
        }
    }

    private twoSameAdjacent(coins: Coin[]) {
        this.debugText("twoSameAdjacent");
        let pivot = coins[0];
        this.table.putBack(coins.map(c => c.flip()));
        if (this.table.isReady()) return;

        const coins2 = this.table.pickTwo(PickType.Diagonal);

        if (coins2[0].isNot(coins2[1])) {
            this.twoDifferentDiagonalAndTwoPivotHidden(pivot.flip());
        } else {
            this.twoSameDiagonalAndTwoDifferentHidden(coins2);
        }
    }

    private twoSameDiagonalAndTwoDifferentHidden(coins2: Coin[]) {
        this.debugText("twoSameDiagonalAndTwoDifferentHidden");
        this.table.putBack([coins2[0], coins2[1].flip()]);

        const coins3 = this.table.pickTwo(PickType.Adjacent);

        if (coins3[0].is(coins3[1])) {
            this.twoSameAdjacentAndTwoOtherHidden(coins3);
        } else {
            this.twoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(coins3);
        }
    }

    private twoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(coins3: Coin[]) {
        this.debugText("twoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent");
        this.table.putBack([coins3[1], coins3[0]]);
        const coins4 = this.table.pickTwo(PickType.Diagonal);

        this.twoSameDiagonalTwoOtherHidden(coins4);
    }

    private twoSameDiagonalTwoOtherHidden(coins4: Coin[]) {
        this.debugText("twoSameDiagonalTwoOtherHidden");
        this.table.putBack(coins4.map(c => c.flip()));
        if (!this.table.isReady()) throw new Error("Strategy 3 failed");
    }

    private twoSameAdjacentAndTwoOtherHidden(coins3: Coin[]) {
        this.debugText("twoSameAdjacentAndTwoOtherHidden");
        this.table.putBack(coins3.map(c => c.flip()));
        if (!this.table.isReady()) throw new Error("Strategy 2 failed");
    }

    private twoDifferentDiagonalAndTwoPivotHidden(pivot: Coin) {
        this.debugText("twoDifferentDiagonalAndTwoPivotHidden");
        this.table.putBack([pivot, pivot]);
        if (!this.table.isReady()) throw new Error("Strategy 1 failed");
    }

    /***************/

    private twoDifferentAdjacent() {
        this.debugText("twoDifferentAdjacent");
        this.table.putBack([Coin.Head(), Coin.Head()]);
        if(this.table.isReady()) return;

        const coins = this.table.pickTwo(PickType.Diagonal);

        if(coins[0].is(coins[1])) {
            this.twoSameDiagonalAndTwoDifferentHidden(coins);
        } else {
            this.table.putBack([Coin.Head(), Coin.Head()]);

            if(this.table.isReady()) return;

            const coins2 = this.table.pickTwo(PickType.Diagonal);

            if(coins2[0].isNot(coins2[1])) {
                this.table.putBack([Coin.Head(), Coin.Head()]);
                if (!this.table.isReady()) throw new Error("Strategy 4 failed");
            } else {
                this.twoSameDiagonalAndTwoDifferentHidden(coins2);
            }


        }
    }

    private debugText(text) {
        //console.log(text);
    }
}