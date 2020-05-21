<template>
  <div>
    <div class="thumb-slide" :id="eid">
      <div class="inner-viewbox">
        <ul class="images">
        <li v-for="item in c_items" :key="item.id">
          <img :src="item.msrc" :o-src="item.src" :alt="item.alt" >
          <i class="iconfont icon-delete-" @click="deleteItem(item.id)" />
          <i class="iconfont icon-upload" @click="changeItem(item.id)"></i>
          </li>
         </ul>
      </div>

<!-- 分页 -->
      <b-pagination v-show="c_total > 0"
        v-model="currentPage"
        pills size="sm"
        :total-rows="c_total"
        :per-page="c_perPage"
        :aria-controls="eid"
        @change="pageChanged"
      ></b-pagination>

    </div>
  </div>
</template>

<style>
@import "~viewerjs/dist/viewer.min.css";
@import url(//at.alicdn.com/t/font_1763872_9d828bsv4kb.css);
</style>

<script>
let _ = require('lodash')

export default {
  data() {
    return {
      currentPage : 1,
      v_perPage: 5,
      pages: []
    };
  },

  computed: {
    c_perPage () {
      return this.perPage || this.v_perPage
    },

    c_total () {
      return this.items.length
    },

    c_items () {
      return this.pages[this.currentPage - 1]
    }
  },

  methods: {
    pageChanged (page){
      this.currentPage = page
    },

    reCalcPages () {
      this.pages = _.chunk(this.items, this.c_perPage)
    },

    deleteItem(it) {
      this.$emit('deleteItem', it)
    },

    changeItem(it) {
      this.$emit('changeItem', it)
    },
  },

  mounted() {
    this.reCalcPages()
  }


};
</script>


<style lang="scss" scoped>
.thumb-slide {
  overflow: hidden;

  .inner-viewbox {
    margin-bottom: 30px;
   
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;

      li {
        width: 100px;
        height: 100px;
        margin: 5px;
        list-style-type: none;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0;
        }

        i.iconfont {
          font-size: 10px;
          margin:5px 2px;
          color:#ccc;
        }

        &:hover {
          cursor: pointer;
          i.iconfont {
            color : blue;
          }
          }
      }
    }

    .pagination{
      margin-top: 10px;
    }
  }
}
</style>