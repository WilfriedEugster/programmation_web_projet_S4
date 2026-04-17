const SHAKESPEARE_POEMS_URL = "https://poetrydb.org/author/William%20Shakespeare";

let poemsPromise;

export const fetchShakespearePoems = async () => {
  if (!poemsPromise) {
    poemsPromise = fetch(SHAKESPEARE_POEMS_URL).then(async (response) => {
      if (!response.ok) {
        throw new Error("Unable to load poems from PoetryDB.");
      }

      return response.json();
    });
  }

  return poemsPromise;
};