<template>
  <div>
    <article
      class="media has-text-grey-light columns is-flex is-vcentered"
      :style="{
        backgroundColor: episode.coverArt.extractedColors.colorDark.hex,
        minHeight: '100vh',
        padding: '30px',
      }"
    >
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="cover_image(episode)" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong
              ><a
                :href="
                  'https://open.spotify.com/episode/' +
                  episode.uri.split(':')[2]
                "
                target="_blank"
                class="has-text-light"
                >{{ episode.title }}</a
              ></strong
            >
          </p>
          <p>
            {{ episode.releaseDate.isoString }} ·
            <a
              :href="
                'https://open.spotify.com/show/' +
                episode.relatedEntityUri.split(':')[2]
              "
              target="_blank"
              class="has-text-grey-light"
              >{{ episode.subtitle }}</a
            >
          </p>
          <audio
            v-if="episode.media.passthroughUrl"
            controls
            :src="media_url(episode)"
          ></audio>
          <p v-else class="has-text-warning">
            [!] No media file available to play
          </p>
        </div>
      </div>
    </article>
    <pre v-if="debug">episode: {{ episode }}</pre>
  </div>
</template>

<script setup>
const route = useRoute();
const debug = route.query.debug;

const { data: episode } = await useFetch(
  "/api/episode/" + route.params.episode_id
);

const cover_image = ({
  coverArt: {
    sources: [{ url }],
  },
}) => "/cover_image/" + url.split("/").slice(-1);

const media_url = ({ media: { passthroughUrl } }) => {
  const url = new URL(passthroughUrl);
  return "/media" + url.pathname + url.search;
};
</script>
