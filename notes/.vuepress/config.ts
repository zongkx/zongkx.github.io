import { path } from "@vuepress/utils";
const { getChildren } = require("vuepress-sidebar-atuo")

module.exports = {
  title: "raynor",
  description: "raynor's messy notebook.",

  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],

  theme: path.resolve(__dirname, "./theme"),

  bundler: "@vuepress/vite",

  themeConfig: {
    logo: "/favicon.svg",

    repo: "zongkx/zongkx.github.io",
    docsDir: "notes",
    docsBranch: "main",

    author: "zongkx",
    authorLink: "https://zongkx.icu",
    displayAllHeaders: false,
    navbar: [
      {
        text: "Java",
        link: "/java/"
      },
      {
        text: "DB",
        link: "/database/"
      },
      {
        text: "JS",
        link: "/js/"
      },
      {
        text: "OPS",
        link: "/ops/"
      },
      {
        text: "Practice",
        link: "/practice/"
      },
      {
        text: "Snippets",
        link: "/snippets/"
      }
    ],
    sidebar:{
      '/java/':[
        {
          collapsable: false,
          sidebarDepth: 1,
          children: getChildren('./notes/java/')
        }
      ],
      '/ops/':[
        {
          collapsable: false,
          sidebarDepth: 1,
          children: getChildren('./notes/ops/')
        }
      ],'/database/':[
        {
          collapsable: false,
          sidebarDepth: 1,
          children: getChildren('./notes/database/')
        }
      ],
      '/js/':[
        {
          collapsable: false,
          sidebarDepth: 1,
          children: getChildren('./notes/js/')
        }
      ],'/practice/':[
        {
          collapsable: false,
          sidebarDepth: 1,
          children: getChildren('./notes/practice/')
        }
      ]

    }
  },
  plugins: [["@vuepress/plugin-search"]],

  markdown: {
    extractHeaders: {
      level: [2, 3, 4, 5]
    },
    code: {
      lineNumbers: true
    }
  }
};
