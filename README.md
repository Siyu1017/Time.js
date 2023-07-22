# Time.js

一個輕量且簡單的 JavaScript 庫

## 使用方式

### 建立

```js
new Time("datetime", "1970/01/01 00:00:00");
// 返回時間對象
new Time("datetime", "1970-01-01 00:00:00");
// 返回時間對象
new Time("word", "now");
// 返回現在時間
new Time("word", "tomorrow");
// 返回明天的這個時間點
new Time("word", "yesterday");
// 返回昨天的這個時間點
new Time("word", "next", 1, "year");
// 返回明天的這個時間點
new Time("word", "last", 1, "year");
// 返回去年的這個時間點
```

### 參數

```js
new Time(type, value, amount, unit);
```

| 參數名稱 | 必須 |          類型        |                                     屬性值                                        |
|:-------:|:----:|:--------------------:|:--------------------------------------------------------------------------------:|
| `type`  |  是  |       `String`       |                               `datetime` 或 `word`                               |
| `value` |  是  | `Number` 或 `String` |       表示時間日期的字串 、`now`、`tomorrow`、`yesterday`、`next` 以及 `last`       |
| `amount`|  否  |       `Number`       |                                      數字                                         |
| `unit`  |  否  |       `String`       | `second`、`minute`、`hour`、`day`、`week`、`month`、`season`、`year` 以及 `century`|

參數 type 必填，須為字串 ( `String` )，屬性值：`datetime` 或 `word`

參數 value 必填
- `type` 為 `datetime`
  - 可為數字 ( `Number` ) 或字串 ( `String` )
- `type` 為 `word`
  - 須為字串 ( `String` )，屬性值：`now`、`tomorrow`、`yesterday`、`next` 以及 `last`

參數 amount 選填，當參數 `value` 為 `next` 或 `last` 時才需填寫此屬性，須為數字 ( `Number` )

參數 unit 選填，當參數 `value` 為 `next` 或 `last` 時才需填寫此屬性，須為字串 ( `String` )，屬性值：`second`、`minute`、`hour`、`day`、`week`、`month`、`season`、`year` 以及 `century`
