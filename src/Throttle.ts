export function throttling<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ) {
    let timer: any;
    return (...args: Params) => {
        if(!timer)
      timer = setTimeout(() => {
        func(...args);
        timer = false
      }, timeout);
    }
  }