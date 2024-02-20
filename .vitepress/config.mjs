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
            collapseDepth: 4, hyphenToSpace: true,
            resolvePath: '/doc/java/',
        }, {
            documentRootPath: '/doc/middleware/', hyphenToSpace: true,
            resolvePath: '/doc/middleware/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/js/', hyphenToSpace: true,
            resolvePath: '/doc/js/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/ops/', hyphenToSpace: true,
            resolvePath: '/doc/ops/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/practice/', hyphenToSpace: true,
            resolvePath: '/doc/practice/',
            collapseDepth: 4,
        }, {
            documentRootPath: '/doc/db/', hyphenToSpace: true,
            resolvePath: '/doc/db/',
            collapseDepth: 4,
        }]),

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
