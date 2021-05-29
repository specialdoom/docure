<script>
  import { onMount } from "svelte";

  import ArticleService from "../../services/article.service";
  import { user } from "../../store/auth.store";

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

{#await articleService.getArticle(id)}
  Getting article
{:then data}
  {data.title}
  {@html data.content}
{/await}
