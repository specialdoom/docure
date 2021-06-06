<script>
  import AuthService from "../services/auth.service";
  import { user } from "../store/auth.store";
</script>

<div class="container">
  <div class="main">
    <slot />
  </div>
  <div class="sider">
    {#await AuthService.getToken()}
      Getting recently viewed
    {:then token}
      <docure-recently-viewed userid={$user.uid} {token} />
    {:catch err}
      Something went wrong
    {/await}
  </div>
</div>

<style>
  .container {
    display: flex;
    width: 100%;
  }
  .main {
    width: 60%;
    display: flex;
    justify-content: center;
  }
  .sider {
    display: flex;
    justify-content: center;
    width: 40%;
  }
</style>
