export class AttemptHistory {
    private max:number = 0;
    private sum:number = 0;
    private rounds:number = 0;
    private history:number[] = [];
    private outOfTarget:number = 0;

    constructor() {}

    record(attempts:number) {
        if(this.max < attempts) {this.max = attempts;}
        if(attempts > 5) {this.outOfTarget++;}
        this.sum += attempts;
        this.history.push(attempts);
        this.rounds++;
    }

    print() {
        console.log("max: ", this.max);
        console.log("avg: ", this.sum/this.rounds);
        console.log("out: ", this.outOfTarget);
        for(let i:number=0; i<6; i++) {
            console.log("#"+i+": ", this.history.filter((x) => (x == i)).length);
        }
    }

    getOutOfTarget() {
        return this.outOfTarget;
    }
}
