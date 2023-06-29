<script>
  export let username;
  import usersStore  from "$stores/UsersStore";  //  all users
  $:users = $usersStore;
  function getImage(username){
    let tmp = users.filter(user=>user.username == username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }
</script>

<h5>{username}</h5>
<img class="object-cover h-16 w-16" src='/uploads/{getImage(username)}' alt="noImage">