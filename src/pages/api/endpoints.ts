import { Category } from "@/redux/state";
import axios from "axios";

async function getIGDBToken() {
  await axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_ID}&client_secret=${process.env.SECRET}&grant_type=client_credentials`
    )
    .then((resp) => {
      console.log("Access token: " + resp.data.access_token);
      return true;
    })
    .catch((error) => {
      return error;
    });
}

export default async function handler(
  req: { query: { category: string; name: string } },
  res: any
) {
  // await getIGDBToken();
  switch (req.query.category) {
    case Category.games:
      await gamesRequest(req.query.name, res);
      break;
    case Category.music:
      await musicRequest(req.query.name, res);
      break;
    case Category.lastfm:
      await lastfmRequest(req.query.name, res);
      break;
    case Category.movies:
      await moviesRequest(req.query.name, res);
      break;
    case Category.tvshows:
      await showsRequest(req.query.name, res);
      break;
    case Category.books:
      await booksRequest(req.query.name, res);
      break;
    default:
      res.status(500).json("Error");
      break;
  }
}

async function gamesRequest(name: string, res: any) {
  const query = "fields name,cover.url;" + 'search "' + name + '"; limit 50;';
  await axios({
    url: "https://api.igdb.com/v4/games/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.IGDB_ID,
      Authorization: "Bearer " + process.env.IGDB_TOKEN,
    },
    data: query,
  })
    .then(async (resp) => {
      const ret = resp.data.map(
        (game: { cover: { url: string }; name: string }) => {
          const cover = game.cover?.url.replace("t_thumb", "t_cover_big");
          return {
            title: game.name,
            cover,
          };
        }
      );
      res.status(200).json(ret);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

async function musicRequest(name: string, res: any) {
  await axios({
    method: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&api_key=${process.env.LASTFM_KEY}&format=json`,
  })
    .then(async (resp) => {
      const ret = resp.data.results.albummatches.album.map(
        (album: { artist: string; name: string; image: any }) => {
          const cover = album.image
            .find((image: { size: string }) => image.size === "large")
            ["#text"].replace("https://", "");
          return {
            title: `${album.artist} - ${album.name}`,
            cover,
          };
        }
      );
      res.status(200).json(ret);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

async function lastfmRequest(name: string, res: any) {
  await axios({
    method: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&api_key=${process.env.LASTFM_KEY}&format=json`,
  })
    .then(async (resp) => {
      const ret = resp.data.results.albummatches.album.map(
        (album: { artist: string; name: string; image: any }) => {
          const cover = album.image
            .find((image: { size: string }) => image.size === "large")
            ["#text"].replace("https://", "");
          return {
            title: `${album.artist} - ${album.name}`,
            cover,
          };
        }
      );
      res.status(200).json(ret);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

async function moviesRequest(name: string, res: any) {
  await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${name}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  })
    .then(async (resp) => {
      const ret = resp.data.results
        .filter(
          (movie: { poster_path: string; title: string }) =>
            !!movie.poster_path && !!movie.title
        )
        .map((movie: { poster_path: string; title: string }) => {
          const cover = "image.tmdb.org/t/p/w185" + movie.poster_path;
          return {
            title: movie.title,
            cover,
          };
        });
      res.status(200).json(ret);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

async function showsRequest(name: string, res: any) {
  await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/search/tv?query=${name}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  })
    .then(async (resp) => {
      const ret = resp.data.results
        .filter(
          (show: { poster_path: string; name: string }) =>
            !!show.poster_path && !!show.name
        )
        .map((show: { poster_path: string; name: string }) => {
          const cover = "image.tmdb.org/t/p/w185" + show.poster_path;
          return {
            title: show.name,
            cover,
          };
        });
      res.status(200).json(ret);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

async function booksRequest(name: string, res: any) {
  await axios({
    method: "GET",
    url: `https://openlibrary.org/search.json?q=${name}&limit=20`,
  })
    .then(async (resp) => {
      const ret = resp.data.docs
        .filter(
          (book: { cover_edition_key: string; title: string }) =>
            !!book.cover_edition_key && !!book.title
        )
        .map((book: { cover_edition_key: string; title: string }) => {
          const cover = `covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
          return {
            title: book.title,
            cover,
          };
        });
      res.status(200).json(ret);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
