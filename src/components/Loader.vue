<template>
   <div v-if="loading" class="loader-overlay">
      <div class="loading">
        <svg width="64px" height="48px">
          <polyline
            style="stroke: #066699; fill: none;"
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="back"
          ></polyline>
          <polyline
            style="stroke: #aedd2b; fill: none;"
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front"
          ></polyline>
          <polyline
            style="stroke: #02416d; fill: none;"
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front2"
          ></polyline>
        </svg>
      </div>      
   </div>
 </template>
 
 <script setup>
 const props = defineProps({
   loading: {
     type: Boolean,
     required: true
   }
 });
 </script>

<style scoped>
/* Container to center the loader */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Dark transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* To make sure it stays on top */
}
/* From Uiverse.io by 0senno */ 
.loading svg polyline {
   fill: none;
   stroke-width: 3;
   stroke-linecap: round;
   stroke-linejoin: round;
 }
 
 .loading svg polyline#back {
   fill: none;
 }
 
 .loading svg polyline#front {
   fill: none;
   stroke-dasharray: 48, 144;
   stroke-dashoffset: 192;
   animation: dash_682 2s linear infinite;
   animation-delay: 0s;
 }
 
 .loading svg polyline#front2 {
   fill: none;
   stroke-dasharray: 48, 144;
   stroke-dashoffset: 192;
   animation: dash_682 2s linear infinite;
   animation-delay: 1s;
 }
 
 @keyframes dash_682 {
   72.5% {
     opacity: 0;
   }
 
   to {
     stroke-dashoffset: 0;
   }
 }
 
</style>
