<script>
  import ArticleService from "../../services/article.service";
  import { Link } from "yrv";
  import RecentlyViewedLayout from "../RecentlyViewedLayout.svelte";

  const articleService = new ArticleService();
</script>

<RecentlyViewedLayout>
  <div class="articles-container">
    {#await articleService.getArticles()}
      <docure-loading text="Loading..." />
    {:then data}
      {#each data as article}
        <docure-article-card>
          <Link exact href={`/article/${article.id}`} slot="title">
            {article.title}
          </Link>
          <span slot="description">{article.description}</span>
        </docure-article-card>
      {/each}
    {/await}
  </div>
</RecentlyViewedLayout>

<style>
  .articles-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 64px;
    width: 60%;
  }
</style>
