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

    private twoSameAdjacent(coins: Coin[]) {
        let pivot = coins[0];
        this.table.putBack(coins.map(c => c.flip()));
        if (this.table.isReady()) return;

        const nextCoins = this.table.pickTwo(PickType.Diagonal);

        if (nextCoins[0].isNot(nextCoins[1])) {
            this.twoDifferentDiagonalAndTwoPivotHidden(pivot.flip());
        } else {
            this.twoSameDiagonalAndTwoDifferentHidden(nextCoins);
        }
    }

    private twoSameDiagonalAndTwoDifferentHidden(coins: Coin[]) {
        this.table.putBack([coins[0], coins[1].flip()]);
        const nextCoins = this.table.pickTwo(PickType.Adjacent);

        if (nextCoins[0].is(nextCoins[1])) {
            this.twoSameAdjacentAndTwoOtherHidden(nextCoins);
        } else {
            this.twoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(nextCoins);
        }
    }

    private twoDifferentAdjacentAndTwoDifferentHiddenSamesAreAdjacent(coins: Coin[]) {
        this.table.putBack([coins[1], coins[0]]);
        const nextCoins = this.table.pickTwo(PickType.Diagonal);
        this.twoSameDiagonalTwoOtherHidden(nextCoins);
    }

    private twoSameDiagonalTwoOtherHidden(coins: Coin[]) {
        this.table.putBack(coins.map(c => c.flip()));
    }

    private twoSameAdjacentAndTwoOtherHidden(coins: Coin[]) {
        this.table.putBack(coins.map(c => c.flip()));
    }

    private twoDifferentDiagonalAndTwoPivotHidden(pivot: Coin) {
        this.table.putBack([pivot, pivot]);
    }

    private twoDifferentAdjacent() {
        this.table.putBack([Coin.Head(), Coin.Head()]);
        if(this.table.isReady()) return;

        const coins = this.table.pickTwo(PickType.Diagonal);

        if(coins[0].is(coins[1])) {
            this.twoSameDiagonalAndTwoDifferentHidden(coins);
        } else {
            this.twoDiagonalDifferentAndHeadAndUnknownHidden();
        }
    }

    private twoDiagonalDifferentAndHeadAndUnknownHidden() {
        this.table.putBack([Coin.Head(), Coin.Head()]);
        if(this.table.isReady()) return;

        const coins = this.table.pickTwo(PickType.Diagonal);

        if (coins[0].isNot(coins[1])) {
            this.twoDifferentDiagonalAndTwoHeadHidden();
        } else {
            this.twoSameDiagonalAndTwoDifferentHidden(coins);
        }
    }

    private twoDifferentDiagonalAndTwoHeadHidden() {
        this.table.putBack([Coin.Head(), Coin.Head()]);
    }
}