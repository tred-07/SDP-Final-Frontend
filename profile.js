const fetchProfile=()=>{
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "login.html";
    }
    fetch("https://qrent-backend.onrender.com/user/my/",
        {
            method: "GET", 
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            },
        },
    ).
    then(response => response.json())
   .then(data => {
        data.forEach(element => {
            const parent=document.getElementById("profile-part")
            const div=document.createElement("div")
            div.innerHTML=`
            <h2 class="text-center font-bold text-[2rem]">Username: ${element.username}</h2>
            <p class="text-center font-bold text-[2rem]">Name: ${element.first_name} ${element.last_name}</p>
            <p class="text-center font-bold text-[2rem]">Email: ${element.email}</p>
            <h2 class="text-center font-bold text-[2rem]">Total Advertisement:${element.advertise.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Favourite:${element.favourite.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Request:${element.request.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Review:${element.feedback.length}</h2>
            `
            div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[100px]', 'border-[5px]', 'w-[100%]')
            parent.appendChild(div)
            console.log(element);
            element.advertise.forEach(el=>{
                console.log("Ad: ",el);
                const myAdvertiseM=document.getElementById("myAdvertiseM")
                const div=document.createElement("div")
                if(el.is_accepted && el.is_approved){
                    div.innerHTML=`
                <p style="text-align:center;" class="text-[1.5rem] font-bold">${el.id}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">${el.title}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">${el.description}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">Location: ${el.location}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">Price: ${el.price} BDT</p>
                <div class="d-flex justify-center gap-[15px]"><button><span class="btn btn-success">Approved</span></button>
                <button><span class="btn btn-success">Accepted</span></button></div>
                `
                }
                else if(!el.is_accepted && el.is_approved){
                    div.innerHTML=`
                <p style="text-align:center;" class="text-[1.5rem] font-bold">${el.id}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">${el.title}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">${el.description}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">Location: ${el.location}</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">Price: ${el.price} BDT</p>
                <p style="text-align:center" class="text-[1.5rem] font-bold">Total Request: ${el.request.length}</p>
                <div class="d-flex justify-center gap-[15px]">
                <button><span class="btn btn-success">Approved</span></button>
                <button><span class="btn btn-danger">Not Accepted</span></button>
                <a href="details3.html" class="btn btn-warning" onclick="adDetailsThree(${el.id})">Accept Request</a>
                <a href="details.html" target="_blank" class="btn btn-primary" onclick="adDetails(${el.id})">Edit</a></div>
                
                `
                console.log(el.id);
                
                }
                else{
                    div.innerHTML=`
                <p style="text-align:center;" class="text-[1.5rem] font-bold">${el.id}</p>
                <p style="text-align:center;" class="text-[1.5rem] font-bold">${el.title}</p>
                <p style="text-align:center;" class="text-[1.5rem] font-bold">${el.description}</p>
                <p style="text-align:center;" class="text-[1.5rem] font-bold">Location: ${el.location}</p>
                <p style="text-align:center;" class="text-[1.5rem] font-bold">Price: ${el.price} BDT</p>
                <div class="d-flex justify-center gap-[15px]">
                <button><span class="btn btn-danger">Not Approved</span></button>
                <button><span class="btn btn-danger">Not Accepted</span></button>
                <a href="details.html" target="_blank" class="btn btn-primary" onclick="adDetails(${el.id})">Edit</a></div>
                `
                console.log(el.id);
                }
                myAdvertiseM.appendChild(div)
                
                
            })

            element.favourite.forEach(el=>{
                const favouriteM=document.getElementById("myFavouriteM")
                const div=document.createElement("div")
                const adTitle=" "
                fetch(`https://qrent-backend.onrender.com/advertise/all/${el.advertise}/`)
                .then(res=>res.json()).then(data=>{
                    div.innerHTML=`
                <p style="text-align:center">${data.title}</h3>
                <p style="text-align:center">${data.description}</p>
                <p style="text-align:center">${data.location}</p>
                <p style="text-align:center">${data.price} BDT</p>
                <p style="text-align:center">Posted By ${data.name.toString().replaceAll(",","")}</p>
                <div class="d-flex justify-center w-[100%]"><button class="btn btn-primary" onclick="adDetailsTwo(${el.advertise})">Details</button></div>
                `
                })
                favouriteM.appendChild(div)
                console.log("Fav: ",adTitle);
            })
            
            element.request.forEach(el=>{
                console.log("Request: ",el.id,el.advertise,el.created_at);
                const myRequst=document.getElementById("myRequestM")
                const div=document.createElement("div")
            if(el.is_accepted){
                div.innerHTML=`
              <p>Advertise title: ${el.advertise}</p>
              <p>Requested time: ${el.created_at}</p>
              <p><span class="btn btn-primary">Is accepted by owner: </span> <span class="btn btn-success">Yes</span></p>
              <div>
              <p>Rating:</p>
              <select id="rating" name="Rating" style="border:1ps solid black;width:100%;">
                <option value="⭐">⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
              </select>
              <div class="d-flex justify-center py-[5px] w-[100%]"><input type="text" name="" id="comment" value="" placeholder="Comment" style="border:1px solid black;width:100%"></div>
              </div>
              <p class="btn btn-success my-[10px]" onclick="giveReview(${el.advertise})">Give Review</p>  
            `
            }
            else{
                div.innerHTML=`
              <p>Advertise title: ${el.advertise}</p>
              <p>Requested time: ${el.created_at}</p>
              <p><span class="btn btn-primary">Is accepted by owner: </span> <span class="btn btn-danger">No</span></p>
            `
            }
            div.style.border="5px solid black"
            div.style.padding="10px"
            div.style.marginBottom="5px"
            myRequst.appendChild(div)
            })

            element.feedback.forEach(el=>{
                const parent=document.getElementById("myReviewM")
                const div=document.createElement("div")
                const rating=""
                fetch(`https://qrent-backend.onrender.com/feedback/${el.id}/`)
                .then(res=>res.json())
                .then(review_data=>{
                    console.log("My Review:",review_data);
                    div.innerHTML=`
                <p>${review_data.advertise}</p>
                <p>Comment: ${review_data.review}</p>
                <p>Rating: ${review_data.star}</p>
                `
                })
                parent.appendChild(div)
            })

        });
        
    })
    .catch(error => console.error("Error:", error));
    
  }
  fetchProfile();


 