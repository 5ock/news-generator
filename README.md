# 最新消息編輯器
<a href='https://5ock.github.io/news-generator/' target='_blank'>News Generator</a>

## 資料格式
```
[
    {
        "uuid": 1, // 新增先後順序，2 3 4 ...
        "date": "20210601", // 文章發文日期
        "en": { // 英文內容
            "title": "test", // 文章標題
            "content": {
                {
                    "number": 1,
                    "type": "img", // type: img圖片, text文字
                    "path": "", // 檔名
                    "alt": "", // 滑鼠移動過去顯示的文字
                    "width": "", // 圖片寬度(單位px)
                    "height": "" // 圖片高度(單位px)
                },
                {
                    "number": 2,
                    "type": "text",
                    "text": "this is a apple." // 內文
                },
                ...
            }
        },
        "zh": { //中文內容同上格式
            ...
        }
        "isNew": true // 用來顯示要不要顯示最新, default value is true
    }
]
```