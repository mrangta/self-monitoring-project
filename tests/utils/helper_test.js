import { getMonthFormat, getWeekFormat, getCurrentDate, getYesterdayDate, getWeekStartDate, getOneWeekAgoDate, getWeekNumber} from '../../utils/helper.js';
import { assertEquals } from '../../deps.js';


Deno.test("Function getCurrentDate returns today date as YYYY-MM-DD format when no date is given to function", () => {
    const date = new Date();
    const result = date.toISOString().substring(0, 10);
    assertEquals(getCurrentDate(), result);
});

Deno.test("Function getCurrentDate(date) returns the given date as YYYY-MM-DD", () => {
    const date = new Date('2020-05-30');
    assertEquals(getCurrentDate(date), date.toISOString().substring(0, 10));
});

Deno.test("Function getYesterdayDate returns yesterday date as YYYY-MM-DD when no date is given to function", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1)
    assertEquals(getYesterdayDate(), date.toISOString().substring(0, 10));
});

Deno.test("Function getYesterdayDate(date) returns previous day date as YYYY-MM-DD", () => {
    const date = new Date('2020-12-01');
    const yesterday = new Date('2020-11-30')
    assertEquals(getYesterdayDate(date), yesterday.toISOString().substring(0, 10));
});

Deno.test("Function getOneWeekAgoDate returns a week ago date from current date as YYYY-MM-DD when no date is given to function", () => {
    const date = new Date();
    date.setDate(date.getDate() - 7)
    assertEquals(getOneWeekAgoDate(), date.toISOString().substring(0, 10));
});

Deno.test("Function getOneWeekAgoDate(date) returns a week ago date from given date as YYYY-MM-DD ", () => {
    const date = new Date('2020-12-01');
    const weekAgo = new Date('2020-11-24')
    assertEquals(getOneWeekAgoDate(date), weekAgo.toISOString().substring(0, 10));
});

Deno.test("Function getWeekFormat(w) returns w if w > 9", () => {
    const w = 10;
    assertEquals(getWeekFormat(w), w);
})
Deno.test("Function getWeekFormat(w) returns '0w' if w <= 9", () => {
    const w = 2;
    const result = "02";
    assertEquals(getWeekFormat(w), result);
})

Deno.test("Function getMonthFormat(m) returns m if m > 9", () => {
    const m = 10;
    assertEquals(getMonthFormat(m), m);
})
Deno.test("Function getMonthFormat(m) returns '0m' if m <= 9", () => {
    const m = 2;
    const result = "02";
    assertEquals(getMonthFormat(m), result);
})
