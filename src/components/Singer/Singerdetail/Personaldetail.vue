<template>
  <div id="personaldetail">
    <div class="wrap">
      <h3>基本信息</h3>
      <p>昵称：{{personal.name}}</p>
      <p v-show="isshow">别名:{{alias}}</p>
      <p>简介:{{personal.briefDesc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "personaldetail",
  data() {
    return {
      personal: [],
      alias: "",
      isshow: true
    };
  },
  props: ["gid"],
  methods: {
    getpsersonal(id) {
      this.axios.get("/artists?id=" + id).then(res => {
        this.personal = res.data.artist;
        this.alias = this.personal.alias[0];
        // console.log(this.personal);
        if (this.personal.alias.length == 0) {
          this.isshow = false;
        } else {
          return;
        }
      });
    }
  },
  mounted() {
    this.getpsersonal(this.gid);
  }
};
</script>
<style scoped>
.wrap {
  margin-left: 1rem;
}
p {
  font-size: 0.8rem;
  font-weight: 400;
}
</style>