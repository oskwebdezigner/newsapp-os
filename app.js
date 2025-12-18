const api_key = 'pub_5febf1e171214edeb37178653b45705f';
const sliderElement = document.getElementById('slider');
const sidebarNewsElement = document.getElementById('sidebar-News');
const mainElement = document.getElementById('mainNews')


// Slider News
const slider_apiUrl = `https://newsdata.io/api/1/latest?apikey=${api_key}`
let sliderData = fetch(slider_apiUrl)
.then((data)=> data.json())
.then((response)=> {
    // console.log(response);
   response.results.map((item,index)=> {
       
           sliderElement.innerHTML += `
            <div class="single-slide">
                <div class="slide-img">
                   <img src=${item.image_url} onerror="this.onerror=null; this.src='https://placehold.co/1920x600/EEE/31343C'" alt=${item.title} />
                </div>
                <div class="slide-cont">
                    <span>${item.source_name}</span>
                    <h1>${item.title}</h1>
                    <a href=${item.link} class="btn btn-primary">Read More</a>
                </div>
            </div>
            `;
        
    });
}).catch((error) => {
    console.log(error)
})

const showNews = async () => {

    const searchInput = document.getElementById('searchInput');
    // const api_url = `https://newsapi.org/v2/everything?q=${searchInput.value}&from=2025-11-17&sortBy=publishedAt&apiKey=${api_key}`;
    const api_url = `https://newsdata.io/api/1/latest?apikey=${api_key}&q=${searchInput.value}`

    if(!searchInput.value){
        Swal.fire({
                title:'Error!',
                text: "Please fill in the Field First",
                icon: "error",
                timer:1000,
                showConfirmButton: false
            });
        return
    }

    sidebarNewsElement.innerHTML =`
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`

        mainElement.innerHTML =`
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`
    
    try{
        
    let fetchData = await fetch(api_url);
    let data = await fetchData.json();

    console.log(data)

    if(data.results.length === 0){
        sidebarNewsElement.innerHTML = '<p>Nothing Found</p>'
        mainElement.innerHTML = '<p>Nothing Found</p>'
    } else {
        sidebarNewsElement.innerHTML = ''
    mainElement.innerHTML = ''
    }

    let articles = data.results || []

    let [sidebarItem1, sidebarItem2, sidebarItem3, sidebarItem4, ...rest] = articles; 
    let sidebarNews  = [sidebarItem1, sidebarItem2, sidebarItem3, sidebarItem4].filter(Boolean);


    

    sideNews(sidebarNews)
    allNews(rest)

    } catch(error){
        console.log(error, 'erro')
    }
}

const sideNews = (sidebarNews) => {

    sidebarNews.map((item, index) => {
        sidebarNewsElement.innerHTML +=`
            <div class="single-sidenews">
                <div class="sidenews-img">
                    <img src=${item.image_url} onerror="this.onerror=null; this.src='https://placehold.co/600x400/EEE/31343C'" class="w-100" alt=${item.title} />
                </div>
                
                <div class="sidenews-cont">
                    <span>${item.pubDate.slice(0,10)}</span>
                    <h6>${item.title}</h6>
                </div>
            </div>`
    });
}

const allNews = (news) => {
    let counter = 1;
    news.map((item,index)=> {

        let animate = ''

        counter % 2 === 0 ? animate = 'fade-left' : animate = 'fade-right'
        
        mainElement.innerHTML +=`
            <div class="col-md-6" data-aos=${animate}>
                <a href=${item.link} class="single-news">
                    <div class="news-img">
                        <img src=${item.image_url} onerror="this.onerror=null; this.src='https://placehold.co/600x400/EEE/31343C'" class="w-100" alt=${item.title} />
                        <span>${item.source_name}</span>
                    </div>
                    
                    <div class="news-cont">
                        <div class="d-flex alignitems-center justify-content-between mb-3">
                            <strong>${item.creator}</strong>
                            <span>${item.pubDate.slice(0,10)}</span>
                        </div>
                        
                        <h6>${item.title}</h6>
                        <p>${item.description.slice(0,100)}</p>
                    </div>
                </a>
            </div>
        ` 
        counter++;
    })
}

// showNews()