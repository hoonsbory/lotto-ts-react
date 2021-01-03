import React from 'react'

    export function numberCounter(target_frame, target_number, addString) {
        this.count = 0; this.diff = 0;
        this.target_count = parseInt(target_number);
        this.target_frame = document.getElementById(target_frame);
        this.timer = null;
        this.addString = addString
        this.counter();
    };
    numberCounter.prototype.counter = function() {
        var self = this;
        this.diff = this.target_count - this.count;
         
        if(this.diff > 0) {
            self.count += Math.ceil(this.diff / 5);
        }
         
        this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.addString;
         
        if(this.count < this.target_count) {
            this.timer = setTimeout(function() { self.counter(); }, 20);
        } else {
            clearTimeout(this.timer);
        }
    };
    
