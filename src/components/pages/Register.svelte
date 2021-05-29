<script>
  import AuthService from "../../services/auth.service";
  const user = {
    email: "",
    password: "",
  };
  const handleSubmit = () => {
    AuthService.register(user.email, user.password);
  };
</script>

<input type="text" name="email" bind:value={user.email} />
<input type="password" name="password" bind:value={user.password} />
<button on:click={handleSubmit}>Submit</button>
