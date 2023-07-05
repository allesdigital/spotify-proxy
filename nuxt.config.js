export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        clientPort: 3801,
      },
    },
  },
  css: ["@/node_modules/bulma/css/bulma.min.css"],
  modules: ["nuxt-proxy"],
  proxy: {
    options: [
      {
        target: "https://audio.podigee-cdn.net/",
        pathFilter: "/media/",
        pathRewrite: {
          "^/media": "",
        },
        changeOrigin: true,
      },
      {
        target: "https://i.scdn.co/image/",
        pathFilter: "/cover_image/",
        pathRewrite: {
          "^/cover_image": "",
        },
        changeOrigin: true,
      },
    ],
  },
});
