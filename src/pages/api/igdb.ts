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
  req: { query: { name: string } },
  res: any
) {
  // await getIGDBToken();
  await request(req.query.name, res);
}

async function request(name: string, res: any) {
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
      res.status(200).json({ data: resp.data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
