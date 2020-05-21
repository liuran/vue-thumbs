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
          const self = this
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
            view: function(eventi){
              console.log(event)
            }
          }))
        },
      },

      mounted() {
        // this.initPhotoSwipeFromDOM('.inner-box')
        this.initViewers('.inner-viewbox')
      },

      updated() {
        if (this.gallery.length > 0){
          this.gallery.forEach(el => {
            el.update()
          });
        }
      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueThumbs)
}

export default VueThumbs