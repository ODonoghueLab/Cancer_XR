<template>
  <div id="matrix">
    <MatrixHeader/>
    <!-- <LoadingPage/> -->
    <div id="container">
        <div v-for="structure in structures" :key="structure.Primary_Accession" class="cell"  v-on="structure.Primary_Accession > 0 ? { click: () => redirect(structure) } : {}">
          <a v-bind:href="[redirect(structure)]" :style="[{'cursor': 'pointer'}]" class='link' target="_blank">
          <h3>{{structure.Name}}</h3>
          <picture>
            <!-- <source v-bind:srcset="['./screenshots/WEBP/' + structure.Primary_Accession + '.webp 2000w, ./screenshots/WEBP/' + structure.Primary_Accession + '_w1000.webp 1000w, ./screenshots/WEBP/' + structure.Primary_Accession + '_w500.webp 500w']" type="image/webp" sizes="33vw">
             <source v-bind:srcset="['./screenshots/JPEG/' + structure.Primary_Accession + '.jpg 2000w, ./screenshots/JPEG/' + structure.Primary_Accession + '_w1000.jpg 1000w, ./screenshots/JPEG/' + structure.Primary_Accession + '_w500.jpg 500w']"  type="image/jpeg" sizes="33vw">
             <img v-bind:src="['/screenshots/JPEG/3200/' + structure.Primary_Accession + '.jpg']"/> -->
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
// import axios from 'axios'
// import LoadingPage from '../components/LoadingPage'
import csvFile from "../assets/matrix.csv"

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
      // json: require('../assets/json/protein_list.json'),
      structures: [],
      csv: csvFile
    }
  },
  beforeMount () {
    var proteinSynonyms = {}
    for(var a = 0; a < this.csv.length; a ++){
      let gene = this.csv[a]["Gene name"]
      let feature = this.csv[a]["Feature Name"]
      if(gene in proteinSynonyms){
        proteinSynonyms[gene].Features.push(feature)
        proteinSynonyms[gene].Description.push(this.csv[a]["Feature Description"])
      }
      else{
        proteinSynonyms[gene] = {}
        proteinSynonyms[gene].Features = []
        proteinSynonyms[gene].Description = []
        proteinSynonyms[gene].Features.push(feature)
        proteinSynonyms[gene].Description.push(this.csv[a]["Feature Description"])
      }
      proteinSynonyms[gene].Name = gene
      proteinSynonyms[gene].Primary_Accession = this.csv[a].Accession
      if(!proteinSynonyms[gene].PDB){
        proteinSynonyms[gene].PDB = this.csv[a]["PDB"]
      }
      if(!proteinSynonyms[gene].Chain){
        proteinSynonyms[gene].Organism = this.csv[a]["Organism"]
      }
      if(!proteinSynonyms[gene].Chain){
        proteinSynonyms[gene].Chain = this.csv[a]["Chain"]
      }
      if(!proteinSynonyms[gene].Orientation){
        proteinSynonyms[gene].Orientation = this.csv[a]["Orientation"]
      }
    }
    proteinSynonyms = this.sortObject(proteinSynonyms)
    for(var protein in proteinSynonyms){
      this.structures.push(proteinSynonyms[protein])
    }
  },
  methods : {
    sortObject: function(o) {
      var sorted = {},
      key, a = [];

      for (key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key)){
              a.push(key);
          }
      }

      a.sort();

      for (key = 0; key < a.length; key++) {
          sorted[a[key]] = o[a[key]];
      }
      return sorted;
    },
    getImgUrl: function(pet) {
      var images = require.context('../assets/img/screenshots/JPEG/1000', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    },
    redirect: function (redirectLink) {
      let Features = redirectLink.Features
      let query = ''
      for(var f = 0; f < Features.length; f++){
        query = query + '&' + Features[f] + ((redirectLink.Description[f] == null) ? '' : '=' + redirectLink.Description[f])
      }
      query = query.replace(/^&/, "?");
      return 'http://localhost:8081/' + redirectLink.Organism + '/' + redirectLink.Name + ((redirectLink.PDB == null) ? '' : '/' + redirectLink.PDB) + ((redirectLink.Chain == null) ? '' : '/' + redirectLink.Chain) + query + ((redirectLink.Orientation == null) ? '' : '#?' + redirectLink.Orientation)
      //return 'http://localhost:8081/' + redirectLink.Primary_Accession + ((redirectLink.PDB == null) ? '' : '/' + redirectLink.PDB) + ((redirectLink.Chain == null) ? '' : '/' + redirectLink.Chain) + query + ((redirectLink.Orientation == null) ? '' : '#?' + redirectLink.Orientation)
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
    background: #b8b8b8 url(../assets/img/icon-large.png) no-repeat calc(6px + 0.4vw) calc(8px + 0.1vh);
    background-size: auto;
    background-size: calc(30px + 2vw) calc(30px + 2vw);
    text-align: center;
}
#matrix .cell {
    font-size: 10px;
}
.cell {
    background-color: #c0c0c0;
    position: relative;
    overflow: hidden;
    /* 'relative' as reference point for absolute positioned elements inside */
}
/* * * * * CSS grid * * * * */
#container {
    display: grid;
    grid-gap: 6px;
    background: #b8b8b8;
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



v-lazy-image{
  width: 100vw;
}

.infoLink{
    position: absolute;
    top: 10px;
    height: 42px;
    right: 125px;
}

/* Christian's work */
 @media screen and (max-width: 549px){
   #matrix{
  height: 99vh;
  background: #b8b8b8 url(../assets/img/AquariaLogo.svg) no-repeat calc(6px + 0.4vw) calc(8px + 0.1vh);
  background-size: calc(130px + 1.5vw) calc(35px + 1.5vw);
  text-align: center;
  }
}
/* general layout and colors */
    body {
        margin: 0;
        padding: 0;
        background: #b8b8b8;
    }
    div.no_match h3 {
        font-weight:400;
    }
    .cell {
        background-color: #c0c0c0;
        position: relative;
        overflow: hidden;
        /* 'relative' as reference point for absolute positioned elements inside */
    }
    /* * * * * CSS grid * * * * */
    #container {
        /* display: grid; */
        grid-gap: 6px;
        background: #b8b8b8;
        padding: 6px;
        height: 90%;
        margin: 0 auto;
    }
    /* Wide aspect ratio */
    @media screen and (max-aspect-ratio: 15/4) and (min-aspect-ratio: 8/5) {
        #container {
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(3, 1fr);
            height: 90%;
        }
    }
    @media screen and (max-height: 420px) and (max-aspect-ratio: 15/4) and (min-aspect-ratio: 8/5) {
      #matrix {
        height: 88vh;
      }
    }
    @media screen and (orientation:landscape) and (max-width : 1024px){
        #container {
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(3, 1fr);
            height: 89%;
        }
        #about_matrix{
          margin-bottom: 11px;
        }
    }

    /* Tall aspect ratio */
    @media screen and (max-aspect-ratio: 3/4) {
        #container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(5, 1fr);
            height: 88%;
        }
    }
    @media screen and (max-aspect-ratio: 3/4) and (min-height: 1000px) {
        #container {
            height: 92%;
        }
    }
/* In-between aspect ratio, put it at the bottom to avoid override*/
    @media screen and (max-aspect-ratio: 8/5) and (min-aspect-ratio: 3/4) {
        #container  {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
            height: 92%;
        }
    }
        @media screen and (max-aspect-ratio: 8/5) and
              (min-aspect-ratio: 3/4) and
              (min-height: 1000px) {
        #container  {
            height: 93%;
        }
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
    /* TYPOGRAPHY */
    /* responsive sizes */
    #matrix .cell {
        /* font-family: 'Source Sans Pro', sans-serif; */
        font-size: 10px;
    }
    @media screen and (min-width: 320px) {
        #matrix .cell {
            font-size: calc(8px + 6 * ((100vw - 320px) / 680));
        }
    }
    /* Alignment */
    body {
        text-align: center;
    }
    h1, h3, p {
        margin: 0;
    }
    span#count {
        color:#383838;
        font-weight: 300;
        font-size: 60%;
        margin-left: 20px;
    }
    a span#help {
        display:inline-block;
        color:#ffffff;
        background:#0876d6;
        font-weight: 700;
        font-size: 80%;
        border-radius: 50%;
        margin-left: 20px;
        width: 1.2em;
        line-height: 1.2em;
    }
    .cell p {
        position: absolute;
        width: 100%; /* this, together with 'text-align:center' from body, keeps text centered */
        bottom: 5%;
        z-index:1;
    }
    .cell h3 {
        position: absolute;
        width: 100%;
        top: 5%;
        z-index:1;
        font-size: inherit;
    }

    /* iframe#slide{
      height:91.7vh;
      width: 100%;
      border: none;
    } */

    #graph{
      width: 100vw;
      position: absolute;
    }

  .v-lazy-image {
  filter: blur(10px);
  transition: filter 1.5s;
  }

  .v-lazy-image-loaded {
    filter: blur(0);
  }
</style>
