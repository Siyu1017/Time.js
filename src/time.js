/**
 * Code by Wetrain (c) 2023
 * All rights reserved.
 * Time.js v1.0.1
 */

"use strict";

const typePattern = ["word", "datetime"]; // "long"

const valueWithWordPattern = ["now", "tomorrow", "yesterday", "next", "last"];

const valueWithWordAndAmount = ["next", "last"];

const unitPattern = {
    "second": 1000,
    "minute": 1000 * 60,
    "hour": 1000 * 60 * 60,
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "month": 1000 * 60 * 60 * 24 * 30,
    "season": 1000 * 60 * 60 * 24 * 90,
    "year": 1000 * 60 * 60 * 24 * 365,
    "century": 1000 * 60 * 60 * 24 * 365 * 100
}

const wordPattern = {
    "tomorrow": unitPattern.day,
    "yesterday": unitPattern.day * -1
}

const operationPattern = {
    "last": -1,
    "next": 1
}

const paramTypes = {
    "type": "string",
    "value": ["number", "string"],
    "amount": "number",
    "unit": "string"
}

const checkParamType = (value, type) => {
    var res = false;
    if (Array.isArray(type) == true) {
        type.forEach(t => {
            if (typeof value === t) {
                res = true;
            }
        })
        return res;
    } else {
        return typeof value === type;
    }
}

/* 
檢測順序

1. type and value 是否存在
2. type 類型是否正確
3. type 值是否合法
4. value 類型是否正確 ( 依 type 分開檢查 )
5. value 值是否合法 ( 依 type 分開檢查 )
6. amount 
*/

Date.prototype.format = function (fmt) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); } for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); } } return fmt; }

class Time {
    constructor(type, value, amount, unit) {
        if (!type || !value) return console.warn("Invalid argument.");

        // 檢查參數 type 的類型是否有效
        if (checkParamType(type, paramTypes["type"]) == false) return console.warn("Parameter type must be of type string.");

        // 檢查參數 type 的值是否合法
        if (typePattern.indexOf(type) < 0) return console.warn("Parameter type is invalid.");

        // 檢查參數 value 的類型是否有效
        if (type == "datetime") {
            // 參數 type 為 datetime 時，可為數字或字串
            if (checkParamType(value, paramTypes["value"]) == false) return console.warn("Parameter value must be of type string or number.");
            if (new Date(value).toString() == "Invalid Date") return console.warn("Invalid datetime.");

            this.time = value;
            // 檢測完畢
        } else if (type == "word") {
            // 參數 type 為 word 時，為字串

            // 檢查類型
            if (checkParamType(value, paramTypes["value"][1]) == false) return console.warn("Parameter value must be of type string.");

            // 檢查值是否合法
            if (valueWithWordPattern.indexOf(value) < 0) return console.warn("Param value (", value, ") is not a valid keyword");

            // value 為 next 或 last 時
            if (valueWithWordAndAmount.indexOf(value) > -1) {
                // 檢查 amount 類型
                if (checkParamType(amount, paramTypes["amount"]) == false) return console.warn("Parameter amount must be of type number.");

                // 大於 0
                if (!amount > 0) return console.warn("The parameter amount must be a number greater than 0.");

                // 檢查 unit 類型
                if (checkParamType(unit, paramTypes["unit"]) == false) return console.warn("Parameter unit must be of type string.");

                // 檢查值是否合法
                if (unitPattern.hasOwnProperty(unit) == false) return console.warn("Parameter unit is invalid.");
            }

            if (value == "tomorrow" || value == "yesterday") {
                this.time = this.now() + wordPattern[value];
            } else if (value == "now") {
                this.time = this.now();
            } else {
                this.time = this.now() + amount * unitPattern[unit] * operationPattern[value];
            }

            // 檢測完畢
        }

        return this;
    }
    now() {
        return Date.now();
    }
    operation(operator, unit, value, type = "date") {
        const operators = ["+", "-", "*", "/"];
        const types = ["date", "number"];
        const count = (date, value, unit, operator) => {
            if (operator == operators[0]) return date + unit * value;
            if (operator == operators[1]) return date - unit * value;
            if (operator == operators[2]) return date * unit * value;
            if (operator == operators[3]) return date / unit * value;
        }
        if (operators.indexOf(operator) < 0) return;
        if (!typeof value === "number") return;
        if (unitPattern.hasOwnProperty(unit) == false) return;
        if (types.indexOf(type) < 0) return;
        this.time = count(new Date(this.time).getTime(), value, unitPattern[unit], operator);
        return type == "date" ? new Date(this.time) : this.time;
    }
}