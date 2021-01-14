
    //숫자 롤링 효과
    
    //숫자 롤링 효과
export class numberCounter {
    count: number;
    diff: number;
    target_count: number;
    target_frame: Element;
    timer!: NodeJS.Timeout;
    addString: string;
    constructor(target_frame: string, target_number: any, addString: string) {
        this.count = 0; this.diff = 0;
        this.target_count = parseInt(target_number);
        this.target_frame = document.getElementById(target_frame)!;
        this.addString = addString;
        this.counter();
    }
    counter() {
        var self = this;
        this.diff = this.target_count - this.count;

        if (this.diff > 0) {
            self.count += Math.ceil(this.diff / 5);
        }

        this.target_frame!.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.addString;

        if (this.count < this.target_count) {
            this.timer = setTimeout(function () { self.counter(); }, 10);
        } else {
            clearTimeout(this.timer);
        }
    }
};
    
