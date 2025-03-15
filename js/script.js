
document.getElementById("search_input").addEventListener("keyup",(event)=>{
   const input = event.target.value
   loadVideos(input)
  //  console.log(input)
})
const showLodar=()=>{
  document.getElementById("lodar").classList.remove("hidden")
  document.getElementById("video-container").classList.add("hidden")
}
const removeLodar=()=>{
  document.getElementById("lodar").classList.add("hidden")
  document.getElementById("video-container").classList.remove("hidden")
}


const removeActiveClass =()=>{
 const removeClass= document.getElementsByClassName("active")
//  console.log(removeClass)
for(let btn of removeClass){
  btn.classList.remove("active")
}
}
// get categori
const loadCategories=async()=>{
  try{
   const cateBtn =await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
   const respon =await cateBtn.json();
   const data = respon.categories;
   displayCategories(data);
  //  console.log();
  }catch(err){
    console.log(err.message);
  }
}
// get video
const loadVideos =async(searchText="")=>{
  try{
    showLodar();
    const getVideos = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
    const response =await getVideos.json();
    displayVideos(response.videos);
    removeActiveClass();
    document.getElementById("btn-all").classList.add("active");
    // console.log(response.videos)
  }
  catch(err){
    console.log(err.message);                                           
  }
}
// get categori id to set daynamic button
const loadCategoriVideos=async(id)=>{
  try{
  //  console.log(id) 
  showLodar()
  removeActiveClass();      
  document.getElementById(`btn-${id}`).classList.add('active');
  const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  const categoriId = await fetch(url);
  const response = await categoriId.json();
  const data = response.category;
  // console.log() 
  displayVideos(data); 
  }catch(err){
    console.log(err.message);
  }
}

const loadVideoDetails=async(videosId)=>{
  try{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videosId}`
    // console.log(url)
    const getDetails = await fetch(url);
    const respon =await getDetails.json();
    displayVideoDetails(respon.video);
  }
  catch(err){
    console.log(err.message);
  }
}
const displayVideoDetails=(objVideo)=>{
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML=`
  <div class="card bg-base-100 image-full w-full shadow-sm">
  <figure>
    <img
      src="${objVideo.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="text-2xl font-bold">${objVideo.title}</h2>
    <p>Name: ${objVideo.authors[0].profile_name}</p>
    <p>${objVideo.others.views} views</p>
    <p>${objVideo.description}</p>
  </div>
</div>
  `
}
// {
//   "category_id": "1001",
//   "video_id": "aaaa",
//   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//   "title": "Shape of You",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "100K",
//       "posted_date": "16278"
//   },
//   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

//get categori to display tihs btn
const displayCategories =(categori)=>{
//  console.log(categori)
 for(let cate of categori){

  // console.log(cate)
  const categoryContainer = document.getElementById("category_container");
  const  categoryDiv = document.createElement("div");
  categoryDiv.innerHTML =`
   <button id="btn-${cate.category_id}" onclick="loadCategoriVideos(${cate.category_id})" class="btn btn-sm">${cate.category}</button>
  `
  categoryContainer.append(categoryDiv)
 }
}

// get video to display  all the videos 
const displayVideos=(videos)=>{
  const videoContainer =document.getElementById("video-container");
  videoContainer.innerHTML=``
  if(videos.length === 0){
     videoContainer.innerHTML=` <div class="flex flex-col col-span-full py-20 justify-center items-center">
      <img src="./assets/Icon.png" alt="">
      <h2 class="text-3xl font-bold text-center py-10">Oops!! Sorry, There is no <br> content here</h2>
    </div>`
    removeLodar()

    return ;
  }
  // console.log(videos);
  for(let video of videos){
    // console.log(video)
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML=`
  <div class="card bg-base-100 shadow-sm">
      <figure class="relative">
        <img class="h-50 w-full object-cover"
          src="${video.thumbnail}" />
            <p class="text-sm text-white bg-gray-500 py-0 px-2 absolute bottom-2 right-2 rounded-md font-semibold">3hrs 56 min ago</p>
      </figure>

      <div class="flex items-start justify-center py-4 gap-3">
        <div class="avatar p-0">
          <div class="w-10  h-10 rounded-full">
            <img class="" src="${video.authors[0].profile_picture}" />
          </div>
        </div>

         <div>
          <h2 class="font-bold text-xl">${video.title}</h2>

          <div class="">
          <p class="text-sm flex gap-2 font-semibold text-gray-400">
          ${video.authors[0].profile_name}
          ${video.authors[0].verified==true ? ` 
            <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=bE5mRAhk65Br&format=gif" alt="">
            `: ` `}
          </p>
          </div>

          <p class="text-sm font-semibold text-gray-400">${video.others.views}</p>
         </div>

      </div>
      <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
     </div>
    ` 
    videoContainer.append(creatDiv)
  }
  removeLodar()
}
// const displayCategoriesBtn=(categoriId)=>{
// //  console.log(categoriId)
// for(let cateId of categoriId){
//   // console.log(cateId)
// }
// }








loadCategories()

// {
//   "category_id": "1001",
//   "video_id": "aaah",
//   "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//   "title": "Colors of the Wind",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//           "profile_name": "Ethan Clark",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "233K",
//       "posted_date": "16090"
//   },
//   "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }