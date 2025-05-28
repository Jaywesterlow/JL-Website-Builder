export function load({ url }) {

 console.log(url);
  return {
    url: url.pathname,
  }
}