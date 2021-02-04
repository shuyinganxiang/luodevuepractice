<template>
  <div class="layout-index">
    this is Layout page
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {}
  }
}
</script>
