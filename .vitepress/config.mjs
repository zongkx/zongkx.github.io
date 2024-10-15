import {defineConfig} from 'vitepress'
import {generateSidebar} from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "zongkx",
    description: "zongkx",
    ignoreDeadLinks: true,
    themeConfig: {// https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'blog', link: '/doc/blog/'},
            {text: 'java', link: '/doc/java/'},
            {text: 'db', link: '/doc/db/'},
            {text: 'ops', link: '/doc/ops/'},
            {text: 'js', link: '/doc/js/'}
        ],
        search: {
            provider: 'local'
        },
        // https://vitepress-sidebar.cdget.com/zhHans/guide/api#sortfolderto
        sidebar: generateSidebar([{
            sortMenusByName: true,
            sortMenusOrderByDescending: true,
            documentRootPath: '/doc/blog/',
            hyphenToSpace: true,
            resolvePath: '/doc/blog/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/java/',
            collapseDepth: 4,
            hyphenToSpace: true,
            resolvePath: '/doc/java/',
        }, {
            documentRootPath: '/doc/db/',
            hyphenToSpace: true,
            resolvePath: '/doc/db/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/ops/',
            hyphenToSpace: true,
            resolvePath: '/doc/ops/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/js/',
            hyphenToSpace: true,
            resolvePath: '/doc/js/',
            collapseDepth: 4,
        }]),

        socialLinks: [
            {icon: 'github', link: 'https://github.com/zongkx'}
        ]
    }
})
