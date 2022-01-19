import { fromEvent, merge } from "rxjs";
import { map, filter, startWith, withLatestFrom } from "rxjs/operators";

const sendBtnEl = document.querySelector(".send");
const inputEl = document.querySelector(".input");
const usersSelectEl = document.querySelector(".users");

const sendBtnClick$ = fromEvent(sendBtnEl, "click");

const enterKeyPress$ = fromEvent(inputEl, "keypress").pipe(
  filter((e) => e.keyCode == 13)
);

const userSelectChange$ = fromEvent(usersSelectEl, "change").pipe(
  map((e) => e.target.value),
  startWith("everyone")
);

const sendMessage$ = merge(sendBtnClick$, enterKeyPress$).pipe(
  map(() => inputEl.value),
  filter((message) => message),
  withLatestFrom(userSelectChange$)
);

export default sendMessage$;
