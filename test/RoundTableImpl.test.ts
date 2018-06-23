import {expect} from 'chai';
import {RoundTableImpl} from "../src/RoundTableImpl";
import {Coin, PickType, RoundTable, RoundTableError} from "../src/RoundTable";


describe("RoundTableImpl", () => {
    it("getAttempts returns zero", () => {
        let table:RoundTable = new RoundTableImpl();
        expect(table.getAttempts()).equal(0);
    });

    it("isReady returns", () => {
        let table:RoundTable = new RoundTableImpl();
        expect(table.isReady()).not.null;
    });

    it("Cannot pick twice", () => {
        let table:RoundTable = new RoundTableImpl();
        table.pickTwo(PickType.Adjacent);
        expect(() => {table.pickTwo(PickType.Adjacent)}).throw();
    });

    it("Cannot put twice", () => {
        let table:RoundTable = new RoundTableImpl();
        table.putBack([Coin.Head, Coin.Head]);
        expect(() => {table.putBack([Coin.Head, Coin.Head])}).throw();
    });

    it("Should put back two coins, not one", () => {
        let table:RoundTable = new RoundTableImpl();
        expect(() => {table.putBack([Coin.Head])}).throw();
    });

    it("Should put back two coins, not three", () => {
        let table:RoundTable = new RoundTableImpl();
        expect(() => {table.putBack([Coin.Head, Coin.Head, Coin.Head])}).throw();
    });
});