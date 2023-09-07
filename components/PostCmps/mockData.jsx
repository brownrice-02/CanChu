export const mockData = [
  {
    id: "1",
    user_id: 1,
    context:
      "欸，你們好\n我一個人住，我的房子還滿大的，歡迎你們來我家玩\n玩累了就直接睡覺，沒問題的。",
    created_at: "2023-07-02 23:59:00",
    name: "傑哥",
    picture: "https://i.imgur.com/5NAGJfl.png",
    is_liked: false,
    like_count: 0,
    comments: [
      {
        id: 1,
        content: "但是我拒絕。",
        created_at: "2023-07-03 18:00:00",
        user: {
          id: 2,
          name: "岸邊露伴",
          picture: "https://i.imgur.com/Tma98BO.jpg",
        },
      },
      {
        id: 2,
        content: "要去是可以去，不要叫我坐下就是了。",
        created_at: "2023-07-03 18:00:01",
        user: {
          id: 3,
          name: "萊納",
          picture: "https://i.imgur.com/DKLeJZN.jpg",
        },
      },
    ],
    comment_count: 2,
  },
  // 之後放其他 Post
];

export const mockData2 = [
  {
    user_id: 1,
    name: "大原所長",
    picture: "https://i.imgur.com/rVRCiZC.png",
    id: 55,
    context: "兩津！你這個大笨蛋！！！",
    created_at: "2023-06-17 12:44:21",
    like_count: 0,
    comment_count: 0,
    is_like: 0,
  },
  {
    user_id: 14,
    name: "Joseph Joestar",
    picture: "https://i.imgur.com/JSZhpVj.jpg",
    id: 66,
    context: "Oh my god!",
    created_at: "2023-06-13 16:32:40",
    like_count: 1,
    comment_count: 1,
    is_like: 1,
  },
  {
    user_id: 14,
    name: "Makima",
    picture: "https://i.imgur.com/mnlDuoX.png",
    id: 64,
    context: "你現在是我的寵物\n你只能說「是」或是「汪」",
    created_at: "2023-05-24 17:30:25",
    like_count: 0,
    comment_count: 1,
    is_like: 0,
  },
];

export const mockData3 = [
  {
    id: 10,
    name: "PJ",
    picture: "https://i.imgur.com/LpWvQDp.png",
    friend_count: 1,
    introduction: "客戶要的不是你為他做一個網站，而是要你幫他解決問題",
    tags: "chatGPT,系統思考,設計思考",
    friendship: {
      id: 1,
      status: "requested",
    },
  },
];
