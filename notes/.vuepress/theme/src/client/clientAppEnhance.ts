import { defineClientAppEnhance } from "@vuepress/client";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
  FaPencilAlt,
  RiGithubLine,
  RiMoonLine,
  RiShareLine,
  RiSunLine,
  SiBitbucket,
  SiGitee,
  SiGitlab
} from "oh-vue-icons/icons";
import { h } from "vue";
import Badge from "./components/global/Badge.vue";
import CodeGroup from "./components/global/CodeGroup";
import CodeGroupItem from "./components/global/CodeGroupItem.vue";
import { useScrollPromise } from "./composables";

import "./styles/index.scss";

addIcons(
  FaPencilAlt,
  RiSunLine,
  RiMoonLine,
  RiShareLine,
  RiGithubLine,
  SiGitee,
  SiGitlab,
  SiBitbucket
);

export default defineClientAppEnhance(({ app, router }) => {
  app.component("Badge", Badge);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);

  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component("NavbarSearch", () => {
    const SearchComponent =
      app.component("Docsearch") || app.component("SearchBox");
    if (SearchComponent) {
      return h(SearchComponent);
    }
    return null;
  });

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior!;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };

  // icons
  app.component("VIcon", OhVueIcon);
});
