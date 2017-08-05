<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <!-- <router-view></router-view> -->

      <div class="wrap container-fluid">

        <h4>&lt;air-button /&gt;</h4>
        <div class="row wrap between-xs">
          <air-button>regular</air-button>
          <air-button class="button-danger">button-danger</air-button>
          <air-button class="button-primary">button-primary</air-button>
          <air-button class="button-default button-outline">button-default button-outline</air-button>
          <air-button class="button-danger button-outline">button-danger button-outline</air-button>
          <air-button class="button-primary button-outline">button-primary button-outline</air-button>
        </div>

        <h4>&lt;air-hr /&gt;</h4>
        <air-hr text="olar" />

        <h4>&lt;air-input /&gt;</h4>
        <air-input v-model="val" label="surprise!" />

        <h4>&lt;air-showcase /&gt;</h4>
        <div class="row wrap around-xs">
          <air-showcase v-for="n in 3" :key="n">
            <air-preview slot="preview" :preview="['http://lorempixel.com/700/400/city/1', 'http://lorempixel.com/700/400/city/2', 'http://lorempixel.com/700/400/city/3']"/>
          </air-showcase>
        </div>

        <h4>&lt;air-pop /&gt;</h4>
        <div class="row center-xs">
          <air-button @click="$refs.pop.open()">(psiu... click here)</air-button>
        </div>
        <air-pop ref="pop">
          olar
        </air-pop>
      </div>

      <br>
      <br>
      <br>
      <br>
      <br>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        val: 's',
      };
    },
  };
</script>

<style>
  @import '../node_modules/flexboxgrid/dist/flexboxgrid.css';

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
</style>
