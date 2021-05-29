<script>
  import ArticleService from "../../services/article.service";
  import AuthService from "../../services/auth.service";
  import { Link } from "yrv";
  import { user } from "../../store/auth.store";

  const articleService = new ArticleService();
</script>

<div class="articles-page-body">
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
  {#await AuthService.getToken()}
    Getting recently viewed
  {:then token}
    <div class="articles-page-sider">
      <docure-recently-viewed userid={$user.uid} {token} />
    </div>
  {:catch err}
    Error
  {/await}
</div>

<style>
  .articles-page-body {
    display: flex;
    width: 100%;
  }
  .articles-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 64px;
    width: 60%;
  }
  .articles-page-sider {
    width: 40%;
  }
</style>
