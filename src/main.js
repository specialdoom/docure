import App from "./App.svelte";

import "@specialdoom/docure-button";
import "@specialdoom/docure-article-card";
import "@specialdoom/docure-loading";
import "@specialdoom/docure-result";
import "@specialdoom/docure-header";
import "@specialdoom/docure-icon";
import "@specialdoom/docure-banner";
import "@specialdoom/docure-list";
import "@specialdoom/docure-recently-viewed";
import "@specialdoom/docure-article";

const app = new App({
  target: document.body,
});

export default app;
