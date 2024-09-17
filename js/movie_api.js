const api_key = "9de88f9d660e93d78864eba260a38172";
const access_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGU4OGY5ZDY2MGU5M2Q3ODg2NGViYTI2MGEzODE3MiIsIm5iZiI6MTcyNjMxMDQ1My4yMzQ1NjIsInN1YiI6IjY2ZTU1NzcxNmEyYmRkNDAwNGZkNWI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T6dkMohb9L9QcL_nnKpRQw1PTkrDHW7yi_6LM-58qWQ";

const base_url = "https://api.themoviedb.org/3";
const base_img = "https://image.tmdb.org/t/p/w500";
const get_movies = "discover/movie";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:`Bearer ${access_token}`
    }}
    let movies_urls=[]
    

const search_form=document.getElementById("search-form")
const search_results_section=document.querySelector(".search-results-section ")
    search_results_section.style.display='none'
search_form.addEventListener('submit',function(e){
    e.preventDefault()
    console.log(this.search.value)
    const url = `${base_url}/search/movie?query=${this.search.value}&language=en-US&page=1`;
    const search_results=document.querySelector(".search_results")
    fetch(url,options)
    .then(res => res.json())
    .then(data => {
         search_results_section.style.display='block'
        const four= data.results.slice(0,4)
        search_results.innerHTML= ' '
        four.map(resulte => {
        search_results.innerHTML +=
        `
         <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="${base_img}/${resulte.poster_path}" class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                           ${resulte.original_title}
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">${resulte.release_date}</p>
                                </div>
                            </div>
                        </div>
        
        `
    })
    })
})



async function fetchMovies(api) {
  const response = await fetch(api);
  const data = await response.json();
  setCarousel(data.results);
  movieDetiles(data.results);
  movieTopics(data.results);
  trendingMovies(data.results);
}

const api_url = `${base_url}/${get_movies}?api_key=${api_key}`;

fetchMovies(api_url);

async function setCarousel(movies) {
    console.log(movies)
  const carousel = document.querySelector(".owl-carousel");
  await movies.map((movie) => {
    const movie_title= (movie.original_title).split(' ').slice(0,4).join(' ')
    carousel.innerHTML += 
    `
        <div class="owl-carousel-info-wrap item">
            <img src="images/${movie.adult === false ?'verified.png' : '+18-icon.jpg'}" class="owl-carousel-verified-image img-fluid" alt="">
            <img src=${base_img}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">

            <div class="owl-carousel-info">
                <h6 class="mb-2">
                    ${movie_title}
                    
                </h6>

                <span class="badge">${movie.original_language}</span>

                <span class="badge">${movie.release_date}</span>
            </div>

           
        </div>
    `
        });

  $(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      767: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
}
function movieDetiles(movies){
  const latest_episodes=document.querySelector(".latest-episodes")
  
  
  
  movies.map(movie => {
    const url=`${base_url}/movie/${movie.id}`
    movies_urls.push(url)
 } )

    const movies_urls_to_fetch=movies_urls.slice(8,12)
    
    movies_urls_to_fetch.map((url)=>{
        fetch(url,options)
.then(res => res.json())
.then(json => { console.log(json)
        latest_episodes.innerHTML += 
        `
        <div class="col-lg-6 col-12 mb-4 mb-lg-2">
                                <div class="custom-block d-flex">
                                    <div class="">
                                        <div class="custom-block-icon-wrap">
                                            <div class="section-overlay"></div>
                                            <a href="detail-page.html" class="custom-block-image-wrap">
                                                <img src="${base_img}${json.poster_path}" class="custom-block-image img-fluid" alt="">

                                                <a href="#" class="custom-block-icon">
                                                    <i class="bi-play-fill"></i>
                                                </a>
                                            </a>
                                        </div>

                                        <div class="mt-2">
                                            <a href="#" class="btn custom-btn">
                                                Subscribe
                                            </a>
                                        </div>
                                    </div>

                                    <div class="custom-block-info">
                                        <div class="custom-block-top d-flex mb-1">
                                            <small class="me-4">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                50 Minutes
                                            </small>

                                            <small>Episode <span class="badge">15</span></small>
                                        </div>

                                        <h5 class="mb-2">
                                            <a href="detail-page.html">
                                            ${json.original_title}
                                            </a>
                                        </h5>

                                        <div class="profile-block d-flex">
                                            <img src="${base_img}${json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                                            <p>${json.production_companies[0].name}
                                           
                                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                                <strong> ${json.production_companies[0].origin_country}</strong></p>
                                        </div>

                                        <p class="mb-0">${json.tagline}</p>

                                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                            <a href="#" class="bi-headphones me-1">
                                                <span>120k</span>
                                            </a>

                                            <a href="#" class="bi-heart me-1">
                                                <span>42.5k</span>
                                            </a>

                                            <a href="#" class="bi-chat me-1">
                                                <span>11k</span>
                                            </a>

                                            <a href="#" class="bi-download">
                                                <span>50k</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column ms-auto">
                                        <a href="#" class="badge ms-auto">
                                            <i class="bi-heart"></i>
                                        </a>

                                        <a href="#" class="badge ms-auto">
                                            <i class="bi-bookmark"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
        
        `
})
    } )
   


}

function movieTopics(movies){
    const topics=document.querySelector(".topico")
  
    movies.map(movie =>{
       const url=`${base_url}/movie/${movie.id}`
        movies_urls.push(url)
 } )
 const movies_topic_url=movies_urls.slice(16,20)
 console.log(movies_topic_url)
 movies_topic_url.map(url => {
    fetch(url,options)
    .then(res => res.json())
    .then(data => {console.log(data)
        topics.innerHTML +=
        `
         <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="${base_img}/${data.poster_path}" class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                           ${data.original_title}
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">${data.release_date}</p>
                                </div>
                            </div>
                        </div>
        
        `
    })
 } )
}

function trendingMovies(movies){
    const trend=document.querySelector(".trend")
    movies.map(movie =>{
        const url=`${base_url}/movie/${movie.id}`
        movies_urls.push(url)
    })
    const trending_urls=movies_urls.slice(1,4)
    trending_urls.map(url => {
        fetch(url,options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            trend.innerHTML +=
            `
            <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="${base_img}/${data.poster_path}" class="custom-block-image img-fluid" alt="">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a href="detail-page.html">
                                            ${data.original_title}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${base_img}/${data.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                                        <p>
                                        ${data.production_companies[0].name}
                                            <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                            <strong>${data.production_companies[0].origin_country}</strong></p>
                                    </div>

                                    <p class="mb-0">${data.tagline}</p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-headphones me-1">
                                            <span>100k</span>
                                        </a>

                                        <a href="#" class="bi-heart me-1">
                                            <span>2.5k</span>
                                        </a>

                                        <a href="#" class="bi-chat me-1">
                                            <span>924k</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="social-share d-flex flex-column ms-auto">
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
            `
        })
    })
}


