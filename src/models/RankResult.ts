export class RankResult {
    private first: number
    private second: number
    private third: number
    private fourth: number
    private fifth: number
    private last: number

    constructor(obj?: RankResult) {
        this.first = obj?.first || 0
        this.second = obj?.second || 0
        this.third = obj?.third || 0
        this.fourth = obj?.fourth || 0
        this.fifth = obj?.fifth || 0
        this.last = obj?.last || 0
    }


    public setFirst() {
        this.first += 1
    }
    public setSecond() {
        this.second += 1
    }
    public setThird() {
        this.third += 1
    }
    public setFourth() {
        this.fourth += 1
    }
    public setFifth() {
        this.fifth += 1
    }
    public setLast() {
        this.last += 1
    }

    public get getFirst() {
        return this.first
    }
    public get getSecond() {
        return this.second
    }
    public get getThird() {
        return this.third
    }
    public get getFourth() {
        return this.fourth
    }
    public get getFifth() {
        return this.fifth
    }
    public get getLast() {
        return this.last
    }

}