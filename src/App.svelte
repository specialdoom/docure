<script>
  import { isAuthenticated } from "./store/auth.store";
  import CenterDiv from "./components/CenteredDiv.svelte";
  import { Router, Route, Link } from "yrv";
  import Home from "./components/pages/Home.svelte";
  import Articles from "./components/pages/Articles.svelte";
  import Profile from "./components/pages/Profile.svelte";
  import NotFound from "./components/pages/NotFound.svelte";
  import Unauhtorized from "./components/pages/Unauhtorized.svelte";

  import { loading } from "./store/app.store";

  import AuthService from "./services/auth.service";
  import Article from "./components/pages/Article.svelte";
  import Register from "./components/pages/Register.svelte";

  function login() {
    AuthService.login();
  }

  function logout() {
    AuthService.logout();
  }
</script>

{#if $loading}
  <CenterDiv>
    <docure-loading text="Loading..." />
  </CenterDiv>
{:else}
  <docure-header>
    <docure-header-item>
      <Link exact href="/" class="link">Home</Link>
    </docure-header-item>
    {#if !$isAuthenticated}
      <docure-header-item isright>
        <docure-icon login on:click={login} />
      </docure-header-item>
    {:else}
      <docure-header-item>
        <Link exact href="/articles" class="link">Articles</Link>
      </docure-header-item>
      <docure-header-item isright>
        <docure-icon logout on:click={logout} />
      </docure-header-item>
      <docure-header-item isright>
        <Link exact href="/profile" class="link">
          <docure-icon user />
        </Link>
      </docure-header-item>
    {/if}
  </docure-header>
  <main>
    <Router>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/articles"
        condition={() => $isAuthenticated}
        component={Articles}
      />
      <Route
        exact
        path="/register"
        condition={$isAuthenticated}
        component={Register}
      />
      <Route exact path="/article/:id" let:router>
        <Article id={router.params.id} />
      </Route>
      <Route
        exact
        path="/profile"
        condition={() => $isAuthenticated}
        component={Profile}
      />
      <Route exact path="/unauthorized" component={Unauhtorized} />
      <Route fallback component={NotFound} />
    </Router>
  </main>
{/if}
