export interface IContent {
    number: number;
    type: 'img' | 'text';
    path?: string;
    alt?: string;
    width?: number;
    height?: number;
    text?: string;
}

export const initialContent:IContent = {
    number: -1,
    type: 'text'
}

export interface IArticle {
    title: string;
    content: string | IContent[];
}

export interface INewsItem {
    uuid: number;
    date: string;
    en: IArticle | null;
    zh: IArticle | null;
    isNew: boolean;
}

export const initialNews:INewsItem = {
    uuid: -1,
    date: '',
    en: null,
    zh: null,
    isNew: true
}

/** example
[
    {
        "uuid":1, // 新增先後順序，2 3 4 ...
        "date": "20210601", // 你想設定文章發文日期
        "en": { // 英文內容
            "title": "test", // 文章標題
            "content": {
                {
                    "number": 1,
                    "type": "img", // type: img圖片, text文字
                    "path": "", // 檔名
                    "alt": "", // 滑鼠移動過去顯示的文字，可有可無
                    "width": "", // 寬度
                    "height": "" // 高度
                },
                {
                    "number": 2,
                    "type": "text",
                    "text": "this is a apple." // 內文
                },
                ...
            }
        },
        "zh": { //中文內容
            "title": "測試", //文章標題
            "content": "改改改改..." //文章內文
        }
        "isNew": true // 用來顯示要不要顯示最新 基本true就好,我在程式中會在做一次判斷
    }
]
 */