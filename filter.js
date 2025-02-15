const priceAscending=(event)=>{
    event.preventDefault()
    fetch("https://qrent-backend.onrender.com/advertise/all/?ordering=price")
    .then(res=>res.json())
    .then(data=>
        {
        const parent = document.getElementById("all-advertise")
        parent.innerHTML=``
        console.log(data);
        data.forEach(ad => {
            const div = document.createElement("div")
            if (ad.image != null && ad.is_approved != false) {
              div.innerHTML = `
              <img src="${ad.image}">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
            else if (ad.is_approved != false) {
              div.innerHTML = `
              <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
    
            ad.review.forEach(re => {
              console.log(re.user);
              console.log(re.star);
              console.log(re.review);
              console.log(re.created_at);
            })
          })
    }
)
.catch(er=>console.log(er))
}


const priceDescending=(event)=>{
    event.preventDefault()
    fetch("https://qrent-backend.onrender.com/advertise/all/?ordering=-price")
    .then(res=>res.json())
    .then(data=>{
        const parent = document.getElementById("all-advertise")
        parent.innerHTML=``
        data.forEach(ad => {
            const div = document.createElement("div")
            if (ad.image != null && ad.is_approved != false) {
              div.innerHTML = `
              <img src="${ad.image}">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
            else if (ad.is_approved != false) {
              div.innerHTML = `
              <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
    
            ad.review.forEach(re => {
              console.log(re.user);
              console.log(re.star);
              console.log(re.review);
              console.log(re.created_at);
            })
          })
    })
}


const oldestFirst=(event)=>{
    event.preventDefault()
    fetch("https://qrent-backend.onrender.com/advertise/all/?ordering=created_at")
    .then(res=>res.json())
    .then(data=>{
        const parent = document.getElementById("all-advertise")
        parent.innerHTML=``
        data.forEach(ad => {
            const div = document.createElement("div")
            if (ad.image != null && ad.is_approved != false) {
              div.innerHTML = `
              <img src="${ad.image}">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
            else if (ad.is_approved != false) {
              div.innerHTML = `
              <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
    
            ad.review.forEach(re => {
              console.log(re.user);
              console.log(re.star);
              console.log(re.review);
              console.log(re.created_at);
            })
          })
    })
}

const newestFirst=(event)=>{
    event.preventDefault()
    fetch("https://qrent-backend.onrender.com/advertise/all/?ordering=-created_at")
    .then(res=>res.json())
    .then(data=>{
        const parent = document.getElementById("all-advertise")
        parent.innerHTML=``
        data.forEach(ad => {
            const div = document.createElement("div")
            if (ad.image != null && ad.is_approved != false) {
              div.innerHTML = `
              <img src="${ad.image}">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>
              
              `
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
            else if (ad.is_approved != false) {
              div.innerHTML = `
              <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
              div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
              parent.appendChild(div)
            }
    
            ad.review.forEach(re => {
              console.log(re.user);
              console.log(re.star);
              console.log(re.review);
              console.log(re.created_at);
            })
          })
    })
}


