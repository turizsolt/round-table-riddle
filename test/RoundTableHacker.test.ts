import {expect} from 'chai';
import {RoundTableHacker} from "../src/RoundTableHacker";
import {RoundTableImpl} from "../src/RoundTableImpl";


describe("RoundTableHacker", function() {
    this.timeout(20000);

    it("plays", () => {
        let max = 0;
        let sum = 0;
        let rounds = 1000000;
        let attemptHistory = [];
        let outOfTarget = 0;
        for(let i=0; i<rounds; i++) {
            let attempts:number = playOneGame();
            if(max < attempts) {max = attempts;}
            if(attempts > 5) {outOfTarget++;}
            sum += attempts;
            attemptHistory.push(attempts);
        }
        console.log("max: ", max);
        console.log("avg: ", sum/rounds);
        console.log("out: ", outOfTarget);
        //console.log(JSON.stringify(attemptHistory));
        console.log("#0: ", attemptHistory.filter((x) => (x == 0)).length);
        console.log("#1: ", attemptHistory.filter((x) => (x == 1)).length);
        console.log("#2: ", attemptHistory.filter((x) => (x == 2)).length);
        console.log("#3: ", attemptHistory.filter((x) => (x == 3)).length);
        console.log("#4: ", attemptHistory.filter((x) => (x == 4)).length);
        console.log("#5: ", attemptHistory.filter((x) => (x == 5)).length);

        expect(outOfTarget).equal(0);
    });

});

function playOneGame() {
    return (new RoundTableHacker(new RoundTableImpl())).play();
};
