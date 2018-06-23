import {expect} from 'chai';
import {RoundTableHacker} from "../src/RoundTableHacker";
import {RoundTableImpl} from "../src/RoundTableImpl";
import {AttemptHistory} from "./AttemptHistory";

describe("RoundTableHacker", function() {
    this.timeout(0);

    it("plays", () => {
        const rounds = 100000;
        const history:AttemptHistory = new AttemptHistory();

        for(let i=0; i<rounds; i++) {
            history.record(playOneGame());
        }

        history.print();

        expect(history.getOutOfTarget()).equal(0);
    });

});

function playOneGame() {
    return (new RoundTableHacker(new RoundTableImpl())).play();
};

