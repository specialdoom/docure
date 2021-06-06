<script>
  import { onMount } from "svelte";

  import ArticleService from "../../services/article.service";
  import { user } from "../../store/auth.store";
  import RecentlyViewedLayout from "../RecentlyViewedLayout.svelte";

  const articleService = new ArticleService();

  export let id;

  onMount(() => {
    articleService
      .addToRecentlyViewed(id, $user.uid)
      .then(() => {
        console.log("added to recently viewed");
      })
      .catch(() => console.error("failed"));
  });
</script>

<RecentlyViewedLayout>
  {#await articleService.getArticle(id)}
    <docure-loading text="Getting article..." />
  {:then data}
    <docure-article title={data.title} workflow={data.workflowId}>
      {@html data.content}
    </docure-article>
  {/await}
</RecentlyViewedLayout>
