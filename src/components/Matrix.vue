<template>
  <div id="matrix">
    <MatrixHeader/>
    <!-- <LoadingPage/> -->
    <div id="container">
        <div v-for="structure in structures" :key="structure.Primary_Accession" class="cell"  v-on="structure.Primary_Accession > 0 ? { click: () => redirect(structure.Primary_Accession) } : {}">
          <a v-bind:href="[redirect(structure.Primary_Accession)]" :style="[{'cursor': 'pointer'}]" target="_blank" class='link'>
          <h3>{{structure.Synonym}}</h3>
          <picture>
             <!-- <source v-bind:srcset="['../images/covid19/WEBP/' + structure + '.webp 2000w, ../images/covid19/WEBP/' + structure + '_w1000.webp 1000w, ../images/covid19/WEBP/' + structure + '_w500.webp 500w']" type="image/webp" sizes="33vw">
             <source v-bind:srcset="['../images/covid19/JPEG/' + structure + '.jpg 2000w, ../images/covid19/JPEG/' + structure + '_w1000.jpg 1000w, ../images/covid19/JPEG/' + structure + '_w500.jpg 500w']"  type="image/jpeg" sizes="33vw"> -->
             <img :src="getImgUrl(structure.Primary_Accession)" v-bind:alt="structure.Primary_Accession"/>
           </picture>
          <!-- <p :style="[structure.primary_accession == 0 ? {'color': 'grey'} : {'color': '#3a3a3a'}]">{{structure.primary_accession}} matching structures</p> -->
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import MatrixHeader from '../components/MatrixHeader'
import axios from 'axios'
// import LoadingPage from '../components/LoadingPage'
export default {
  name: 'Matrix',
  components: {
    MatrixHeader
    // LoadingPage
  },
  props: {
    msg: String
  },
  data () {
    return{
      json: require('../assets/json/protein_list.json'),
      structures: []
    }
  },
  mounted () {
    let proteinSynonyms = []
    let primary_accessions = this.json.primary_accessions
    for(var a = 0; a < primary_accessions.length; a ++){
      let url = 'https://odonoghuelab.org:8011/getProteinSynonyms/' + primary_accessions[a]
      axios({
        method: 'get',
        url: url
      }).then(response => {
        let data = response.data
        proteinSynonyms.push(data)
      })
    }
    this.structures = proteinSynonyms
  },
  methods : {
    getImgUrl: function(pet) {
      var images = require.context('../assets/img/screenshots', false, /\.png$/)
      return images('./' + pet + ".png")
    },
    redirect: function (redirectLink) {
      return 'https://test.aquaria.app/' + redirectLink + '?Features=https://cancer.aquaria.app/json/' + redirectLink + '.json'
    },
    dynamicSort: function(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#matrix{
    height: 99vh;
    background: #c0c0c0 url(../assets/img/icon-large.png) no-repeat calc(6px + 0.4vw) calc(8px + 0.1vh);
    background-size: auto;
    background-size: calc(30px + 2vw) calc(30px + 2vw);
    text-align: center;
}
#matrix .cell {
    font-size: 10px;
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

@media screen and (min-width: 320px) {
    #matrix .cell {
        font-size: calc(8px + 6 * ((100vw - 320px) / 680));
    }
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
