import data from "../tempData.json";

export default function restAPI() {
  return {
    getOrCreateActiveGame(): Game {
      return data;
    },
  };
}
