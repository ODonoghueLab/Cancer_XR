<template>
  <div id="matrix">
    <h1>{{ msg }}</h1>
    <div id="container">
        <div v-for="structure in structures" :key="structure.primary_accession" class="cell"  v-on="structure.primary_accession > 0 ? { click: () => redirect(structure.primary_accession) } : {}">
          <a v-bind:href="[redirect(structure.link)]" :style="[{'cursor': 'pointer'}]" target="_blank" class='link'>
          <h3>{{structure.primary_accession}}</h3>
          <picture>
             <source v-bind:srcset="['../images/covid19/WEBP/' + structure.primary_accession + '.webp 2000w, ../images/covid19/WEBP/' + structure.primary_accession + '_w1000.webp 1000w, ../images/covid19/WEBP/' + structure.primary_accession + '_w500.webp 500w']" type="image/webp" sizes="33vw">
             <source v-bind:srcset="['../images/covid19/JPEG/' + structure.primary_accession + '.jpg 2000w, ../images/covid19/JPEG/' + structure.primary_accession + '_w1000.jpg 1000w, ../images/covid19/JPEG/' + structure.primary_accession + '_w500.jpg 500w']"  type="image/jpeg" sizes="33vw">
             <img v-bind:src="['../images/covid19/JPEG/' + structure.primary_accession + '_w1000.jpg']"/>
           </picture>
          <!-- <p :style="[structure.primary_accession == 0 ? {'color': 'grey'} : {'color': '#3a3a3a'}]">{{structure.primary_accession}} matching structures</p> -->
          </a>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Matrix',
  props: {
    msg: String
  },
  data () {
    return{
      structures: require('../assets/json/example.json')
    }
  },
  mounted () {
    console.log(this.json)
  },
  methods : {
    redirect: function (redirectLink) {
      return redirectLink
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#matrix{
    height: 99vh;
    background: #c0c0c0 url(/img/Resource-banner.27384505.svg) no-repeat calc(6px + 0.4vw) calc(8px + 0.1vh);
    background-size: auto;
    background-size: calc(115px + 5vw) calc(26px + 2vw);
    text-align: center;
}
#matrix .cell {
    font-size: calc(8px + 6 * ((100vw - 320px) / 680));
}
.cell {
    background-color: #cccccc;
    position: relative;
    overflow: hidden;
    /* 'relative' as reference point for absolute positioned elements inside */
}
/* * * * * CSS grid * * * * */
#container {
    display: grid;
    grid-gap: 6px;
    background: #c0c0c0;
    padding: 6px;
    height: 90%;
    margin: 0 auto;
}
#container{
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 90%;
}
.cell {
    grid-column: span 1;
    grid-row: span 1;
}
.cell img {
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.cell h3 {
  position: absolute;
  width: 100%;
  top: 5%;
  z-index: 1;
  font-size: inherit;
}
h3 {
  margin: 0px;
}
.link {
    color: #2c3e50;
    font-weight: 400;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
