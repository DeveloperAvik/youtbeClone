const vidContainer = document.querySelector(".vidContainer");
const form = document.querySelector("form");
const input = document.querySelector("input");
const loading = document.querySelector(".loading");
const searchIcon = document.querySelector(".searchIcon");
const err = document.querySelector(".err");
//hide the error, search icon, loading
loading.style.display = "none";
err.style.display = "none";
//search videos
const searchYoutubeVid = async (searchTerm) => {
  try {
    //show loading
    loading.style.display = "block";
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyCCnORRgpscAY1DeUleCeWwc91y-LEwR0U`
    );

    const data = await res.json();

    //check for err
    if (data.error) {
      err.style.display = "block";
      loading.style.display = "none";
    }
    // display the video
    data.items.forEach((vid) => {
      displayVids(vid);
    });
    //hide loading
    loading.style.display = "none";
    //hide the search icon
    searchIcon.style.display = "none";
  } catch (error) {
    err.style.display = "block";
    loading.style.display = "none";
  }
};

//search vid

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //get value from input
  const val = input.value;
  searchYoutubeVid(val);
});

//searchYoutubeVid("MERN");

//display youtube videos
const displayVids = (video) => {
  console.log(video);
  //create div with class vidItem
  const vidItem = document.createElement("div");
  vidItem.classList.add("vidItem");
  console.log(vidContainer);
  //append the videitem to the vidContainer
  vidContainer.appendChild(vidItem);

  //create iframe with all the attributes
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    `https://www.youtube.com/embed/${video.id.videoId}`
  );
  iframe.setAttribute("height", "315");
  iframe.setAttribute("width", "560");
  iframe.setAttribute("frameborder", "0");
  //append the iframe to vidItem
  vidItem.appendChild(iframe);

  //create 4 p tags with class
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = video.snippet.title;
  // desc
  const desc = document.createElement("p");
  desc.classList.add("desc");
  desc.innerHTML = video.snippet.description;

  // desc
  const channel = document.createElement("p");
  channel.classList.add("channel");
  channel.innerHTML = video.snippet.channelTitle;

  // date
  const date = document.createElement("p");
  date.classList.add("date");
  date.innerHTML = video.snippet.publishedAt;

  //append all the p tags to the vidItem
  vidItem.appendChild(title);
  vidItem.appendChild(channel);
  vidItem.appendChild(date);
  vidItem.appendChild(desc);
};

displayVids();
