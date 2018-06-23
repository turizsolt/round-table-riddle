import {Coin, PickType, RoundTable} from "./RoundTable";
import {RoundTableImpl} from "./RoundTableImpl";

export class RoundTableHacker {
    private table:RoundTable;

    constructor(tableImpl:RoundTable) {
        this.table = tableImpl;
    }

    play() {
        while(!this.table.isReady()) {
            const coins: Coin[] = this.table.pickTwo(PickType.Adjacent);
            const newCoins:Coin[] = [Coin.Head, Coin.Head];
            this.table.putBack(newCoins);
            if(this.table.getAttempts() > 99) break;
        }

        return this.table.getAttempts();
    }
}