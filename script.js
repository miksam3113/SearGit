const API_URL = "https://api.github.com/users/";

const MONTH = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const body = document.getElementById("all_card");

async function getGit(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      let json = await response.json();
      loadcard(json);
    } else {
      loadfalse();
    }
  });
}

function loadfalse() {
  body.innerHTML = `
  <div class="card">
    <p class="not_found">Not Found</p>
  </div>`;
}

function verinfo(objv) {
  if (objv == null || objv == "" || objv == undefined) {
    return "Not Available";
  } else {
    return objv;
  }
}

function joined(j) {
  if (j[5] == "0") {
    return (
      j[8] + j[9] + " " + MONTH[Number(j[6])] + " " + j[0] + j[1] + j[2] + j[3]
    );
  }
  if (j[5] == "1") {
    return (
      j[8] + j[9] + " " + MONTH[j[5] + j[6]] + " " + j[0] + j[1] + j[2] + j[3]
    );
  }
}

function loadcard(obj) {
  body.innerHTML = `
<div class="card">
  <img class="avatar" src="${verinfo(obj.avatar_url)}">
  <div class="info_card">
      <div class="title_info">
          <p class="title_name">${verinfo(obj.login)}</p>
          <p class="title_join">Joined ${joined(verinfo(obj.created_at))}</p>
      </div>
      <p class="description_info">${verinfo(obj.bio)}</p>
      <div class="user_info">
          <div class="div_user">
              <p class="title_div">Repositories</p>
              <p class="count_div">${verinfo(obj.public_repos)}</p>
          </div>
          <div class="div_user">
              <p class="title_div">Followers</p>
              <p class="count_div">${verinfo(obj.followers)}</p>
          </div>
          <div class="div_user">
              <p class="title_div">Following</p>
              <p class="count_div">${verinfo(obj.following)}</p>
          </div>
      </div>
      <div class="marke_info">
          <div class="div_marke">
              <img class="img_div_marke" src="images/location-icon.jpg">
              <p class="txt_div_marke">${verinfo(obj.location)}</p>
          </div>
          <div class="div_marke">
              <img class="img_div_marke" src="images/twitter-icon.png">
              <p class="txt_div_marke">${verinfo(obj.twitter_username)}</p>
          </div>
          <div class="div_marke">
              <img class="img_div_marke" src="images/link-icon.png">
              <p class="txt_div_marke">${verinfo(obj.blog)}</p>
          </div>
          <div class="div_marke">
              <img class="img_div_marke" src="images/organisation-icon.png">
              <p class="txt_div_marke">${verinfo(obj.company)}</p>
          </div>
      </div>
  </div>
</div>`;
  sub();
}

const form = document.querySelector("form");
const inp_search = document.getElementById("input");
const btn = document.getElementById("btn");

function sub() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchurl = API_URL + inp_search.value;
    if (inp_search.value) {
      getGit(searchurl);
      setTimeout(() => {
        inp_search.value = "";
      }, 1000);
    }
  });

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const searchurl = API_URL + inp_search.value;
    if (inp_search.value) {
      getGit(searchurl);
      setTimeout(() => {
        inp_search.value = "";
      }, 1000);
    }
  });
}

sub();
