<script>
  import { navigateTo } from "yrv";

  function readArticles() {
    navigateTo("/articles");
  }

  function create() {
    navigateTo("/create");
  }

  function goToWorkflows() {
    window.location.href = "http://localhost:4200";
  }
</script>
<docure-banner
  imagesrc="https://www.proofhub.com/wp-content/uploads/2021/01/Creative-project-managers.jpg"
>
  <docure-banner-title text="Articles and workflows for you and your company" />
  <docure-banner-content>
    Are you ready to folow some workflows provided by users around the world
    related to their experience in life? Just read some of the articles on the
    website and follow the workflows, if present, and we guarantee that you are
    going to love this and definitely you're going to come back.
  </docure-banner-content>
  <docure-banner-actions>
    <docure-button primary on:click={readArticles}>Read articles</docure-button>
    <docure-button link on:click={goToWorkflows}>
      Create your own workflows
    </docure-button>
  </docure-banner-actions>
</docure-banner>

<docure-list>
  <docure-list-item
    title="Articles"
    description="Articles for you. Details, questions and answers. Workflow and steps. Almost everything."
  >
    <docure-button secondary>Read some articles</docure-button>
  </docure-list-item>
  <docure-list-item
    title="Articles & workflows"
    description="Some of the articles are written using the article workflow idea. Read the details and follow the steps are the right thing to do here."
  >
    <docure-button secondary>Read and follow</docure-button>
  </docure-list-item>
  <docure-list-item
    title="Workflows"
    description="Maybe there are no article related to a workflow, but you can definitely find some amazing steps there."
  >
    <docure-button secondary>Follow some workflows</docure-button>
  </docure-list-item>
</docure-list>
