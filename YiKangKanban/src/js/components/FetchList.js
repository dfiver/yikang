export default class FetchList {
  fetchList(url, callback) {
    if (url) {
      fetch(url)
        .catch(error => console.log("fetch list error", error))
        .then(res => res.json())
        .then(data => {
          console.log("fetch result", data);
          if (data.success) {
            callback(data.obj);
          }
        });
    }
  };
}