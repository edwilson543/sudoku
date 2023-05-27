import data from  '../tempData.json';

export default function getOrCreateActiveGame() {
    console.log("Active game: ", data);
    return data;
}
