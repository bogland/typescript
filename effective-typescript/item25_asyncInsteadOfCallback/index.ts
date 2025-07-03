// 콜백지옥을 극복하기 위해서 프로미스(Promise) 개념 도입
const page1Promise = fetch("url1");
page1Promise
  .then((response1) => {
    return fetch("url2");
  })
  .then((response2) => {
    return fetch("url3");
  })
  .then((response3) => {
    return fetch("url4");
  });

// promise 대신 async await 처리
async function fetchPages() {
  const response1 = await fetch("url1");
  const response2 = await fetch("url2");
  const response3 = await fetch("url3");
}

async function fetchPages2() {
  try {
    const response1 = await fetch("url1");
    const response2 = await fetch("url2");
    const response3 = await fetch("url3");
  } catch (e) {
    console.error(e);
  } finally {
    console.log("done");
  }
}

// 콜백 보다 프로미스가 코드 작성이 쉬움
// 콜백 보다 프로미스가 타입 추론이 쉬움
// 모든 프로미스 다 끝날때까지 대기 코드
async function fetchPages3() {
  const [response1, response2, response3] = await Promise.all([
    fetch("url1"),
    fetch("url2"),
    fetch("url3"),
  ]);
}

// 콜백은 복잡하다.

function fetchPages4() {
  let numDone = 0;
  const responses: string[] = [];
  const done = () => {
    const [response1, response2, response3] = responses;
  };

  const urls = ["url1", "url2", "url3"];
  urls.forEach((url, i) => {
    fetchURL(url, (r) => {
      responses[i] = url;
      numDone++;
      if (numDone === urls.length) done();
    });
  });
}

//
function timeout(millis: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("timeout"), millis);
  });
}

async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]);
}

//
//function getNumber(): Promise<number>;
async function getNumber2() {
  return 42;
}

const getNumber3 = async () => 42;
const getNumber4 = () => Promise.resolve(42);

//
const _cache: { [url: string]: string } = {};
function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]);
  } else {
    fetchURL(url, (text) => {
      _cache[url] = text;
      callback(text);
    });
  }
}

//
let requestStatus: "loading" | "success" | "error";
function getUser(userId: string) {
  fetchWidthCache(`/user/${userId}`, (profile) => {
    requestStatus = "success";
  });
  requestStatus = "loading";
}

//
const _cache2: { [url: string]: string } = {};
async function fetchWithCache(url: string) {
  if (url in _cache2) {
    return _cache2[url];
  }
  const response = await fetch(url);
  const text = await response.text();
  _cache2[url] = text;
  return text;
}

// function getJSON(url:string: Promise<any>
async function getJSON(url: string) {
  const response = await fetch(url);
  const jsonPromise = response.json();
  return jsonPromise;
}
