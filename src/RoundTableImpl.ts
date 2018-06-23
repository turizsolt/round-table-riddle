import {Coin, PickType, RoundTable, RoundTableError} from "./RoundTable";

enum State {
    Stable,
    Manipulating
}

export class RoundTableImpl implements RoundTable {
    private attempts:number;
    private slots:Coin[];
    private manipulatedSlots:number[];
    private state:State;

    constructor() {
        this.slots = [];
        this.attempts = 0;
        for (let i=0; i<4 ; i++) {
            this.slots[i] = Math.random()< .5 ? Coin.Head : Coin.Tail;
        }
        this.manipulatedSlots = [];
        this.state = State.Stable;
    }

    isReady(): boolean {
        let pivotFace = this.slots[0];
        for (let i=1; i<4 ; i++) {
            if(this.slots[i] !== pivotFace) return false;
        }
        return true;
    }

    pickTwo(type: PickType): Coin[] {
        if(this.state !== State.Stable) throw new RoundTableError("Should put back the coins first.");

        this.state = State.Manipulating;

        let randomValue = Math.random()*4|0;
        let next = type === PickType.Adjacent ? 1 : 2;
        this.manipulatedSlots[0] = randomValue;
        this.manipulatedSlots[1] = (randomValue+next)%4;

        return this.manipulatedSlots.map(x => this.slots[x]);
    }

    putBack(coins: Coin[]) {
        if(this.state !== State.Stable) throw new RoundTableError("Should pick the coins first.");
        if(coins.length !== 2) throw new RoundTableError("Should put back exactly two coins.");

        coins.map((val, ind) => {
            this.slots[this.manipulatedSlots[ind]] = val;
        });

        this.manipulatedSlots = [];

        this.state = State.Manipulating;
        this.attempts++;

    }

    getAttempts(): number {
        return this.attempts;
    }
}
