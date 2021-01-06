export class RankResultNum {
    //맞은 숫자는 1, 맞은 보너스 숫자는 2로 표현
    private firstNums! : number[][]
    private secondNums! : number[][]
    private thirdNums! : number[][]
    private winnerName! : string
    
    constructor() {
        this.firstNums = []
        this.secondNums = []
        this.thirdNums = []
        this.winnerName = ''
    }
    
    public  setFirstNums(value:number[]) {
        this.firstNums.push(value)
    } 
    public  setSecondNums(value:number[]) {
        this.secondNums.push(value)
    }
    public  setThirdNums(value:number[]) {
        this.thirdNums.push(value)
    }
    public  setWinnerName(value:string) {
        this.winnerName = value
    }

    public get getFirstNums() {
        return this.firstNums 
    }
    public get getSecondNums() {
        return this.secondNums 
    }
    public get getThirdNums() {
        return this.thirdNums 
    }
    public get getWinnerName() {
        return this.winnerName 
    }
    
}