export default async function getPlayerIpAddress(): Promise<string> {
  /** Get the loopback IP for local dev and testing. */
  return new Promise((resolve, reject) => {
    resolve("127.0.0.1");
    reject();
  });
}
