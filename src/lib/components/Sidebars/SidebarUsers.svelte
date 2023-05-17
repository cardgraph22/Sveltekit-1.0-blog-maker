<script>
  import usersStore  from "$stores/UsersStore";  //  all users
</script>

<h3>Users</h3>
{#each $usersStore as user}
  {user.username}&nbsp;
{/each}