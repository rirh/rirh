export default [
  {
    text: '卷集',
    activeMatch: `^/(guide|style-guide|cookbook|examples|cryptocurrency)/`,
    items: [
      { text: '💰  加密货币', link: '/cryptocurrency/money' },
      { text: '🚚  工具使用', link: '/tools/ChatGP指令' },
      { text: '💡  开发日志 ', link: '/log/Gettr' },
      { text: '❓  常见问题 ', link: '/Q&A/小白入职常见问题' }
    ]
  },
  {
    text: '笔记',
    activeMatch: `^/note/`,
    link: '/note/工程化入门指南'
  },
  {
    text: '作品集',
    activeMatch: `^/products/`,
    items: [
      {
        text: '代表作',
        items: [
          { text: '币傲交易所', link: '/products/btcalory' },
          { text: 'Gettr', link: '/products/gettr' },
          { text: '叮铃医生', link: '/products/doctor' }
        ]
      },
      {
        text: '商业作品',
        items: [
          { text: '笨嘴神器', link: '/products/bigv' },
          {
            text: 'For Pro',
            link: '/products/fof-pro'
          },
          { text: '净值预估', link: '/products/valuation' },
          {
            text: 'Open Alpha',
            link: '/products/openalpha'
          }
        ]
      },
      {
        text: '个人作品',
        items: [
          {
            text: 'Wall Paper',
            link: '/products/wallpaper'
          },
          { text: 'Note Music', link: '/products/notemusic' },
          { text: '优惠券小程序', link: '/products/coupon' }
        ]
      }
    ]
  },
  {
    text: '灵感',
    activeMatch: `^/idea/`,
    link: '/idea/totp'
  },
]
