<template>
    <div id="about_matrix">
        <div id="title_0">
            <a title='Watch the introductory video' v-bind:href="'https://youtu.be/FAQ3yVGYSzY'" target="_blank"><img @mouseover="activatePlay(0)" @mouseleave="resetPlay(0)" class='icon' id='play' v-bind:src="play"/></a>
            <span id="Orgname_0" @mouseover="activateHelp" @mouseleave="resetOver">Mutations implicated in youth cancer&nbsp;</span>
             <!--<a title="Read Nature Medicine article" v-bind:href="'https://doi.org/10.1038/s41591-020-1072-4'" target="_blank"><img @mouseover="activatePaper(0)" @mouseleave="resetPaper(0)" class='icon' id='paper' v-bind:src="document"/></a>-->
            <img class='icon' id='help' @mouseover="activateOver" @click="showAbout" @mouseleave="resetOver" v-bind:src="info"/>
        </div>
        <div id="content">
            <div id="title">
              <a title='Watch the introductory video' v-bind:href="'https://youtu.be/FAQ3yVGYSzY'" target="_blank"><img @mouseover="activatePlay(1)" @mouseleave="resetPlay(1)" class='icon' id='play' v-bind:src="play"/></a>
              <span id="Orgname" @mouseover="activateHelp" @mouseleave="resetOver">Visualizing cancer mechanisms in XR&nbsp;</span>
              <!--  <a title="Read Nature Medicine article" v-bind:href="'https://doi.org/10.1038/s41591-020-1072-4'" target="_blank"><img @mouseover="activatePaper(1)" @mouseleave="resetPaper(1)" class='icon' id='paper' v-bind:src="document"/></a>-->
              <img class='icon' id='close' @mouseover="activateClose(1)" @mouseleave="resetClose(1)" @click="hideAbout()" v-bind:src="close"/>
            </div>
            <div>
            <p>This page shows a collection of mutations found in high-risk cancers in children and young adults (≤ 21 years).</p>
            <p>These mutations have been selected to showcase the use of mixed reality ('XR') devices in cancer research.</p>
            <p>Clicking on an image gives access an interactive 3D version that can then be explored in 'XR mode' on a range of devices, including iPhone, Android phones, HoloLens, and the Sony Playstation VR.</p>
            <p>The system has >100 million model structures, covering >500,000 proteins from many species. Each model  can coloured using user-defined features (e.g., SNPs, PTMs), then viewed in XR.</p>
            <p>
            Currently, limitations on specific XR devices mean that large molecular assemblies cannot be shown. However, most XR devices can show average size proteins (~500 amino acids).
            </p>
            <p>To learn more watch the <a href='https://youtu.be/FAQ3yVGYSzY' target='_blank'>introductory video</a> or read the <a href='https://doi.org/10.1038/s41591-020-1072-4' target='_blank'> Nature Medicine article</a> about the mutation dataset.</p>
            <p id='teams'>
              <b>The Aquaria-COVID resource </b><i>is hosted by the <a target='_blank' href="https://www.garvan.org.au/">Garvan Institute of Medical Research</a> (Sydney, Australia), and is maintained in collaboration with <a target='_blank' href="https://data61.csiro.au/">CSIRO Data61</a> (Sydney,
               Australia), the <a target='_blank' href="https://www.unsw.edu.au/"> UNSW</a> (Sydney, Australia), the <a target='_blank' href="https://www.hswt.de/en.html">
              Weihenstephan-Tr. University of Applied Sciences</a> (Freising, Germany), the <a target='_blank' href="https://www.tum.de/en/">Technical
              University of Munich</a> (Germany), the <a target='_blank' href="https://www.dundee.ac.uk/">University of Dundee</a> (UK), and the <a target='_blank' href="https://www.ucl.ac.uk/">University College London</a> (UK).
              </i>
            </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AboutMatrix',
  data () {
    return {
      synonymsString: null,
      synonymsArray: null,
      timer: null,
      play: require('../assets/img/Play.png'),
      info: require('../assets/img/Info.png'),
      close: require('../assets/img/Close.png'),
      play_hover: require('../assets/img/Play_Hover.png'),
      info_hover: require('../assets/img/Info_Hover.png'),
      close_hover: require('../assets/img/Close_Hover.png')
    }
  },

  props: ['OrganismName', 'OrgSynonyms', 'checkDevice'],
  methods: {
    activatePlay (n) {
      document.querySelector('#help').src = this.info
      document.querySelectorAll('#play')[n].src = this.play_hover
      document.querySelectorAll('#play'[n]).style.cursor = 'pointer'
    },
    resetPlay (n) {
      document.querySelectorAll('#play')[n].src = this.play
    },
    activateHelp () {
      document.querySelector('#help').src = this.info_hover
      document.querySelector('#help').style.cursor = 'pointer'
    },
    activateClose () {
      document.querySelector('#close').src = this.close_hover
      document.querySelector('#close').style.cursor = 'pointer'
    },
    resetClose () {
      document.querySelector('#close').src = this.close
      document.querySelector('#close').style.cursor = 'pointer'
    },
    resetOver () {
      // clearTimeout(this.timer)
      document.querySelector('#help').src = this.info
    },
    hideAbout: function () {
      document.querySelector('#content').style.width = document.querySelector('#title_0').offsetWidth + 25 + 'px'
      document.querySelector('#content').style.display = 'none'
      document.querySelector('#title_0').style.visibility = 'visible'
      document.querySelector('div.dimmer').remove()
      setTimeout(function () { document.querySelector('#help').style.pointerEvents = 'auto' }, 1000)
      document.querySelector('#help').style.pointerEvents = 'none'
    },
    showAbout: function () {
      window.history.replaceState({}, document.title, '#info')
      var titleWidth = document.querySelector('#Orgname_0').offsetWidth + 80 + 'px'
      document.querySelector('#content').style.width = 'calc(' + titleWidth + ' + 3vw)'
      document.querySelector('#content').style.display = 'block'
      document.querySelector('#title_0').style.visibility = 'hidden'
      if (document.getElementsByClassName('dimmer').length === 0) {
        var elemDiv = document.createElement('div')
        elemDiv.className = 'dimmer'
        document.body.append(elemDiv)
        document.querySelector('#content').style.display = 'block'
        document.querySelector('#title_0').style.visibility = 'hidden'

        document.querySelector('div.dimmer').addEventListener('click', function () {
          if (document.querySelector('#graph').style.display === 'block') {
            window.history.replaceState({}, document.title, '#Map')
          } else {
            window.history.replaceState({}, document.title, '#Matrix')
          }
          document.querySelector('#content').style.display = 'none'
          document.querySelector('#title_0').style.visibility = 'visible'
          document.querySelector('div.dimmer').remove()
        })
      } else {
        document.querySelector('div.dimmer').remove()
      }
    },
    activateOver () {
      document.querySelector('#help').src = this.info_hover
      document.querySelector('#help').style.cursor = 'pointer'
      document.querySelector('#Orgname_0').style.cursor = 'pointer'
    },
    redirect: function (OrganismID) {
      var url = 'https://www.uniprot.org/taxonomy/' + OrganismID
      return (url)
    }
  },
  updated () {
    if (window.location.hash.toLowerCase() === '#info') {
      this.showAbout()
    }
    window.addEventListener('resize', function () {
      document.querySelector('#content').style.width = document.querySelector('#title_0').offsetWidth + 25 + 'px'
    })
  }
}
</script>

<style scoped>
#help, #close, #paper{
  padding-left: 0px;
}
img.icon{
  height: calc(15px + 0.9vw);
  position: relative;
  top: calc(-1px + 0.001vh)
}
img#play{
    padding-right: 4px;
}
#about_matrix{
    margin-left: 12px;
    margin-top: calc(7px + 0.55vh);
    margin-bottom: 20px;
}

@media only screen
  and (min-width : 100px)
  and (max-width : 700px) {
    #about_matrix{
    margin-left: calc(32px + 0.8vw);
  }
}

#title, #title_0{
    display: inline-table;
    align-items: baseline;
    border-radius: 5em;
    background: #999999;
    padding: 5px calc(4px + 0.4vw)
}

#title{
  margin-top: calc(11px - 0.09vw)
}
#content {
    position: relative;
    z-index: 15;
    display: none;
    border-radius: 2em;
    background: #DEDEDE;
    bottom: 35px;
}

#content p {
    text-align: left;
    width: 93%;
    margin: 12px 15px;
    line-height: 1.5em;
    font-size: calc(8px + 0.5vw);
    padding-bottom: 0px;
}

p#teams{
  font-size: calc(5px + 0.5vw);
  padding-bottom: 20px;
}

#Orgname, #Orgname_0 {
    color: #fff;
    font-size: calc(8px + 1.2vw);
    font-weight: 500;
    vertical-align: middle;
}

#matches, #matches_0 {
    font-size: calc(10px + 0.4vw);
}

/* iPhone SE */
/* @media only screen
  and (min-width : 200px)
  and (max-height : 600px) { */
  /* #Orgname, #Orgname_0 {
    color: #fff;
    font-size: calc(6px + 0.8vw);
    font-weight: 500;
}
  #matches {
    font-size: calc(7px + 0.5vw);
  }
  #title_0 {
    padding: 5px calc(3px + 0.4vw);
  }
  #title{
    padding: 5px calc(9px + 0.4);
  } */
  /* #content{
    left: 5%;
    right: 5%;
    width: 90%;
  } */
  /* #about_matrix{
    margin-bottom: 15px;
  }
} */
@media all and (max-width: 280px) {
  #content{
    right: 12%;
    width: 122%;
  }
  #Orgname, #Orgname_0 {
    color: #fff;
    font-size: calc(8px);
    font-weight: 500;
    vertical-align: middle;
  }
}

@media all and (max-width: 535px) and (min-width: 281px) and (max-height: 639px) {
  #content {
    right: 10%;
  }
}

@media all and (min-width: 281px) and (max-width: 535px) and (min-height: 640px) {
  #content{
    right: 7%;
    font-size: calc(8px + 0.6vw);
  }
}

@media all and (min-width: 375px) and (max-width: 535px) {
  #content{
    left: -5%;
  }
}

@media all and (min-width: 425px) and (max-width: 449px) {
  #content{
    left: -4%;
  }
}
@media all and (min-width: 450px) and (max-width: 535px) {
  #content{
    left: -3%;
  }
}

@media all and (min-width: 535px) and (max-width: 550px) {
  #content{
    left: -2%;
  }
}
</style>
