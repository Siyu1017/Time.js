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