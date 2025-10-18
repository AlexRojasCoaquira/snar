<template>
  <main class="grid lg:grid-cols-2 grid-cols-1 min-h-dvh">
    <section class="hidden lg:block">
      <img
        src="https://www.pichincha.com/sites/default/files/styles/post_blog/public/images/hacker_2.jpg.webp?itok=CtYOKiKy"
        alt=""
        class="h-full object-cover"
      />
    </section>
    <div class="flex justify-center items-center bg-gray-200">
      <router-view />
    </div>
  </main>
</template>
