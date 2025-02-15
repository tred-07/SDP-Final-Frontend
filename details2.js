const adDetailsTwo=(id)=>{
    const token=localStorage.getItem("token")

    if(!token){
        window.location.href="login.html"
    }
    else
    {
        console.log("check details2");
        
        window.location.href="details2.html"
        localStorage.setItem("ad_id",id)
    }
  }


  const showDetails=()=>{
    const id=localStorage.getItem("ad_id")
    localStorage.removeItem("ad_id")
    fetch(`https://qrent-backend.onrender.com/advertise/all/${id}/`)
    .then(res=>{
        if(res.ok){
            return res.json()
        }
        else{
            // alert("Something Went Wrong.")
            // window.location.href="index.html"
        }
    })
    .then(ad=>{
        console.log(typeof(ad));
        const parent=document.getElementById("showDetails")
        const div=document.createElement("div")
        console.log(ad.title);
        div.innerHTML = 
        `   <div class="w-[100%] d-flex justify-center">  ${ad.image?`<img src="${ad.image}">`:`<img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">`}
            </div>  <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold text-[1.25rem]">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <div class="w-[100%] d-flex justify-center">
              ${ad.is_accepted?`<button class="btn btn-warning">Already rented</button>`:`<button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>`}
              </div>
              `
        parent.appendChild(div);
    }
    ).catch(er=>console.log(er))
  }



  showDetails()