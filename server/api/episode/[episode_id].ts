export default defineEventHandler(async (event) => {
  const episode_id = event.context.params.episode_id;
  const episode_content = await $fetch(
    "https://open.spotify.com/embed/episode/" + episode_id
  );
  const [_, initial_state] = episode_content.match(/initial-state.+?>(.+?)</);
  const episode = JSON.parse(Buffer.from(initial_state, "base64").toString());

  const media = await $fetch(
    "https://spclient.wg.spotify.com/soundfinder/v1/unauth/episode/" +
      episode_id +
      "/com.widevine.alpha",
    {
      headers: {
        authorization: "Bearer " + episode.settings.session.accessToken,
      },
    }
  );
  episode.data.entity.media = media;

  return episode.data.entity;
});
