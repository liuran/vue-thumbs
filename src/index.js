import ThumbsComponent from './thumbs.vue'
import Viewer from 'viewerjs/dist/viewer'

const VueThumbs = {
  install(Vue, options) {
    Vue.component('VueThumbs', {
      mixins: [ThumbsComponent],
      
      /**
       * items [ {
       * size: sm
       *  }]
       */
      props: {
        items: Array,
        eid: String,
        perPage: Number,
      },

      methods: {

        initViewers(gallerySelector) {
          const galleryElements = document.querySelectorAll(gallerySelector)
          this.gallery = []

          // for (let i = 0, l = galleryElements.length; i < l; i++) {
          //   let imgs =  galleryElements[i].getElementsByClassName('images')[0]
          //   gallery.push(new Viewer(imgs))
          // }

          this.gallery.push(new Viewer(galleryElements[0], {
            hidden: function() {
              console.log('hidden called')
            },

            view: function(event){
              console.log('view called ', event.detail)
            }
          }))
        },
      },

      mounted() {
        this.initViewers('.inner-viewbox')
      },

      updated() {
        if (this.gallery.length > 0){
          this.gallery.forEach(el => {
            console.log(' updated called ')
            el.update()
          });
        }
      }
    })
  }
}

export default VueThumbs