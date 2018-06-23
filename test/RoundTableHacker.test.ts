import {expect} from 'chai';
import {RoundTableHacker} from "../src/RoundTableHacker";
import {RoundTableImpl} from "../src/RoundTableImpl";


describe("RoundTableHacker", () => {
    it("plays", () => {
        let max = 0;
        let sum = 0;
        let rounds = 100;
        let attemptHistory = [];
        let outOfTarget = 0;
        for(let i=0; i<rounds; i++) {
            let attempts:number = playOneGame();
            if(max < attempts) {max = attempts;}
            if(attempts > 5) {outOfTarget++;}
            sum += attempts;
            attemptHistory.push(attempts);
        }
        console.log(max, sum/rounds, outOfTarget);
        console.log(attemptHistory);
    });

});

function playOneGame() {
    return (new RoundTableHacker(new RoundTableImpl())).play();
};
