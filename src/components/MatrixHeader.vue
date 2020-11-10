<template>
     <div id='header'>
          <div id="logo"></div>
          <AboutMatrix id="about_matrix" v-bind:OrganismName="'COVID-19'" />
          <!-- <img id="menu" v-bind:src="menu" v-if="$mq === 'mobile' || $mq === 'tablet'" v-on:click="showSwitch()"/> -->
    </div>
</template>

<script>
import AboutMatrix from './AboutMatrix'

export default {
  name: 'MatrixHeader',
  components: {
    AboutMatrix
  },
  data () {
    return {
      menu: require('../assets/img/menu.png')
    }
  },
  mounted () {
    let hash = ''
    if (window.location.hash) {
      hash = window.location.hash
    } else if (localStorage.getItem('visited')) {
      hash = ''
    } else {
      hash = '#info'
    }
    window.history.replaceState({}, document.title, hash)
    localStorage.setItem('visited', true)
  },
  updated () {
    const that = this
    if (window.location.hash.toLowerCase() === '#about') {
      that.AboutAquaria()
    }
    document.querySelector('div#logo').addEventListener('click', function () {
      that.AboutAquaria()
    })
    window.addEventListener('resize', function () {
      document.querySelector('#content').style.width = document.querySelector('#title_0').offsetWidth + 25 + 'px'
    })
  },
  methods: {
    highlight: function () {
      document.querySelector('#idle').style.color = 'orange'
    },
    removeHighlight: function () {
      document.querySelector('#idle').style.color = '#999999'
    },
    AboutAquaria: function () {
      window.history.replaceState({}, document.title, '#About')
      // dim background
      document.querySelector('#about_overlay').style.display = 'block'
      var Position = window.innerWidth / 2 - document.querySelector('#about_overlay').offsetWidth / 2
      Position = Position + 'px'
      document.querySelector('#about_overlay').style.left = Position
      if (document.getElementsByClassName('dimmer').length === 0) {
        var elemDiv = document.createElement('div')
        elemDiv.className = 'dimmer'
        document.body.append(elemDiv)
        document.querySelector('#about_overlay').style.display = 'block'
        document.querySelector('div.dimmer').addEventListener('click', function () {
          if (document.querySelector('#graph').style.display === 'block') {
            window.history.replaceState({}, document.title, '#Map')
          } else {
            window.history.replaceState({}, document.title, '#Matrix')
          }
          document.querySelector('#about_overlay').style.display = 'none'
          document.querySelector('div.dimmer').remove()
        })
        } else {
        document.querySelector('div.dimmer').remove()
      }
    }
  }
}
</script>

<style>
#header {
    display: inline-flex;
    padding: 2px 22px;
    height: 4em;
    min-height: calc(48px + 1.5vw);
 }
#idle{
    color: #818181;
    font-weight: 100;
    cursor: pointer;
}
span#toggle-switch{
  color: white;
  position: absolute;
  right: -10px;
  top: calc(8px + 1vw);
  font-size: calc(10px + 0.6vw);
  font-weight: 700;
  margin-right: calc(3px + 0.4vw);
  /* cursor: pointer; */
  /* background: grey; */
  padding: 2px 10px;
  border-radius: 14px;
}
span#pageName{
  color: #747373;
  position: absolute;
  left: 3px;
  top: calc(10px + 1vw);
  font-size: calc(8px + 0.6vw);
  font-weight: 600;
  margin-left: calc(6px + 0.4vw + 26px + 1.5vw);
  cursor: pointer;
}
#video{
  top: 15px;
  margin-right: 36px;
}
#menu{
    height: 35px;
    position: absolute;
    right: -0.8vw;
    margin-top: 13px;
}
.link{
  color: #2c3e50;
  font-weight:400;
}
#logo{
    width: 84px;
    height: 86px;
    position: absolute;
    left: 0px;
}
#logo:hover{
  cursor: pointer;
}

#about_source{
  top: 59px;
}
</style>
