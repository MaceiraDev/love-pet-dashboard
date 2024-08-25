<template>
   <div class="flex flex-col">
     <img src="./../assets/imagens/dog_ia.jpg" class="w-full h-auto" />
     <aside class="w-64 bg-gray-800 text-white flex-shrink-0 p-4">
       <ul class="mt-4">
         <li><router-link to="/home" class="block py-2 px-4 hover:bg-gray-700 rounded">Home</router-link></li>
         <li><router-link to="/about" class="block py-2 px-4 hover:bg-gray-700 rounded">About</router-link></li>
         <li><router-link to="/contact" class="block py-2 px-4 hover:bg-gray-700 rounded">Contact</router-link></li>
       </ul>
     </aside>
   </div>
 </template>
 