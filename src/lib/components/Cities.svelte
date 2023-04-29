<script>
  import { onMount } from 'svelte';
  import { getCityData } from '$api/getCityData';
    let city1 = 'Seattle';
    let city2 = 'Singapore';
    let city3 = 'New York';
    let temp1 = 'Loading...';
    let temp2 = 'Loading...';
    let temp3 = 'Loading...';
    onMount(()=>{
      getCityData(city1)
        .then(data => { temp1 = data; })
        .catch(err => console.log('rejected', err.message));
      getCityData(city2)
        .then(data => { temp2 = data; })
        .catch(err => console.log('rejected', err.message));
      getCityData(city3)
        .then(data => { temp3 = data; })
        .catch(err => console.log('rejected', err.message));      
    });

</script>
<div class="cards">
  <div class="card">
    <div>{city1}</div>
    <div>{temp1}</div>
  </div>
  <div class="card">
    <div>{city2}</div>
    <div>{temp2}</div>
  </div>
  <div class="card">
    <div>{city3}</div>
    <div>{temp3}</div>
  </div>
</div>

<style>
  .cards {
    display: flex;
  }
  .card {
    width: 100px;
    height: 100px;
    padding: 10px;
    margin: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
