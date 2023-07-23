<script>
  export let username;
  import usersStore  from "$stores/UsersStore";  //  all users
  $:users = $usersStore;
  function getImage(username){
    let tmp = users.filter(user=>user.username == username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }
</script>

<div class="flex flex-col items-center w-20">
  <h5>{username}</h5>
  <div class="border border-gray-300 rounded-full w-16 h-16 overflow-hidden">
    <img class="w-16 h-16 scale-75 object-contain" src='/uploads/{getImage(username)}' alt="noImage">
  </div>
</div>