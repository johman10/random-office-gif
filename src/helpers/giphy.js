function devGif() {
  return Promise.resolve({
    width: 500,
    height: 281,
    fallback: 'https://media0.giphy.com/media/j0IvNX2iBd3q0/giphy_s.gif?cid=c3f646715d035d514b4769664d568824&rid=giphy_s.gif',
    src: 'https://media0.giphy.com/media/j0IvNX2iBd3q0/giphy.webp?cid=c3f646715d035d514b4769664d568824&rid=giphy.webp',
    alt: "You're in dev mode",
  });
}

function randomOfficeGif() {
  const url = 'https://api.giphy.com/v1/gifs/random?api_key=xzYMDDPV4B3vFAkYtMuXQDsdtmFFDhOB&tag=the%20office';
  return fetch(url)
    .then(response => response.json())
    .then(response => ({
      fallback: response.data.images.original_still.url,
      src: response.data.images.original.webp,
      alt: response.data.title
    }));
}

export default process.env.NODE_ENV === 'development' ? devGif : randomOfficeGif;
