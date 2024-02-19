import {defineConfig} from 'vitepress'
import {generateSidebar} from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "zongkx",
    description: "zongkx",
    ignoreDeadLinks: true,
    themeConfig: {// https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'java', link: '/doc/java/'},
            {text: 'middleware', link: '/doc/middleware/'},
            {text: 'js', link: '/doc/js/'},
            {text: 'ops', link: '/doc/ops/'},
            {text: 'practice', link: '/doc/practice/'},
            {text: 'db', link: '/doc/db/'}
        ],
        search: {
            provider: 'local'
        },
        sidebar: generateSidebar([{
            documentRootPath: '/doc/java/',
            collapseDepth: 4,
            resolvePath: '/doc/java/',
        }, {
            documentRootPath: '/doc/middleware/',
            resolvePath: '/doc/middleware/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/js/',
            resolvePath: '/doc/js/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/ops/',
            resolvePath: '/doc/ops/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/practice/',
            resolvePath: '/doc/practice/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/db/',
            resolvePath: '/doc/db/',
            collapseDepth: 4,
        }]),

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
