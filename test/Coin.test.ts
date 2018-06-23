import {expect} from 'chai';
import {Coin} from "../src/Coin";


describe("Coin", () => {
    it("is, isnot, flip", () => {
        const head = Coin.Head();
        const head2 = Coin.Head();
        expect(head.is(head2)).true;
        expect(head.isNot(head2)).false;
        expect(head.is(head2.flip())).false;
    });
});
