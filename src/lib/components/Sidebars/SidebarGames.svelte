<script>
  let products = [
    {
      name: 'Monopoly',
      cost: '$5.15',
      inventory: 20
    },
    {
      name: 'Risk',
      cost: '$2.25',
      inventory: 5
    },
    {
      name: 'Twister',
      cost: '$3.00',
      inventory: 10
    },
    {
      name: 'Mouse Trap',
      cost: '$6.20',
      inventory: 15
    }
  ]
</script>

<h3>Games</h3>

  {#each products as product}
  <div class="product">
    <ul>
      <li>{product.name}</li>
      <li>{product.cost}</li>
      <li>{product.inventory}</li>
    </ul>
  </div>
  {/each}

  <style>
    .product {
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 5px;
    }
    li {
      list-style-type: circle;
    }
  </style>