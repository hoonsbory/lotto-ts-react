// export function Debounce<Params extends any[]>(callback: (...args: Params) => any, milliseconds: number) {
//     let debounceChek: NodeJS.Timeout
//     return function (...args: Params) {
//         // clearTimeout을 settimeout전에 걸어줘서 아무리 많이 버튼을 눌러도 
//         //그 전 setTimeout들은 전부 삭제되고 마지막 setTimeout만 실행된다.
//         clearTimeout(debounceChek);
//         debounceChek = setTimeout(() => {
//         console.log(debounceChek)
//             callback(...args);
//         }, milliseconds);
//     }
// }
import { useCallback } from 'react'
export function Debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    }
  }