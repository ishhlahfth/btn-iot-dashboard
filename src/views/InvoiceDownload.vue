<template>
  <div></div>
</template>

<script>
export default {
  name: 'InvoiceDownload',
  mounted() {
    const element = document.getElementById('exportButton');
    console.log(element);
    setTimeout(() => {
      element.click();
    }, 1000);
  },
};
</script>

<style></style>
