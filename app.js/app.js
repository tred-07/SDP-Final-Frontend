const signup = (event) => {
  event.preventDefault()
  const token = localStorage.getItem("token");
  if (token) {
    alert("Already sign up and you are logged in.")
    document.getElementById("messageBoxSignUp").innerHTML =`
    <h2 class="text-center font-bold text-[1.25rem] text-[blue]">Already sign up and you are logged in.</h2>
    <a href="profile.html" class="text-center font-bold text-[1.25rem] btn btn-success w-[25%] mx-auto my-[10px]">Click here for redirect in your profile.</a>
    `
    return;
  }
  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  if (password === confirm_password) {
    console.log("pass match")
    const info = {
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "password": password,
      "confirm_password": confirm_password
    }
    fetch("https://qrent-backend.onrender.com/user/register/"
      // fetch("http://127.0.0.1:8000/user/register/"  
      , {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info)
      })
      .then(res =>{
        if(res.ok){
          res.json()
          document.getElementById("messageBox").innerText = "Check your mail inbox or spam."
          console.log(res);
        }
        else {
          alert("Email Or Username may be exist.")
          document.getElementById("messageBox").innerText = "Email Or Username may be exist."
        }
      })
      .catch(er => console.log(er))
  }
}

const login = (event) => {
  event.preventDefault()
  const token = localStorage.getItem("token");
  if (token) {
    alert("Already sign up and you are logged in.")
    document.getElementById("messageBoxLogIn").innerHTML =`
    <h2 class="text-center font-bold text-[1.25rem] text-[blue]">Already sign up and you are logged in.</h2>
    <a href="profile.html" class="text-center font-bold text-[1.25rem] btn btn-success w-[25%] mx-auto my-[10px]">Click here for redirect in your profile.</a>
    `
    return;
  }
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  if(username==="admin" && password==="admin"){
     alert("Please contact with administrator and visit admin site.")
  }
  else if ((username, password)) {
    fetch("https://qrent-backend.onrender.com/user/login/"
      ,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        else {
          alert("Wrong Credential")
        }
      })
      .then((data) => {
        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "profile.html";
        }
      }).catch(er => console.log(er));
  }
}


const logout = (event) => {
  event.preventDefault()
  const token = localStorage.getItem("token");
  fetch("https://qrent-backend.onrender.com/user/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "index.html"
    });
};




const showAllAdvertiseButNoAction = () => {
  const token=localStorage.getItem("token")
  const user_id=localStorage.getItem("user_id")
  fetch("https://qrent-backend.onrender.com/advertise/all/")
    .then(res => res.json())
    .then(data => {
      data.forEach(ad => {
        const parent = document.getElementById("all-advertise")
        const div = document.createElement("div")
        if (ad.image != null && ad.is_approved != false) {
          if(ad.is_accepted)
            {
              div.innerHTML = `
              <img src="${ad.image}">
              <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
              <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.location}</p>
              <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
              <p class="text-center font-bold">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
              <p class="text-center font-bold">Created at: ${ad.created_at.slice(0,10)}</p>
              ${(token&&user_id)?`<button onclick="addToFavourite(${ad.id})" class="btn btn-info w-[80%] mx-auto my-[5px] text-[15px]">Add To Favourite</button>`:``}
              <button class="btn btn-warning w-[80%] mx-auto my-[15px] text-[15px]">Not Available</button>
              <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto mb-[15px]">Show Details</button>
              `
            }
          else{
          div.innerHTML = `
          <img src="${ad.image}">
          <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
          <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.location}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
          <p class="text-center font-bold">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
          <p class="text-center font-bold">Created at: ${ad.created_at.slice(0,10)}</p>
          ${(token&&user_id)?`<button onclick="addToFavourite(${ad.id})" class="btn btn-info w-[80%] mx-auto my-[5px] text-[15px]">Add To Favourite</button>`:``}
          <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
          <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto mb-[15px]">Show Details</button>`
        }
          div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
          parent.appendChild(div)
        }
        else if (ad.is_approved != false) {
          if(ad.is_accepted){
            div.innerHTML = `
          <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
          <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
          <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.location}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
          <p class="text-center font-bold">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
          <p class="text-center font-bold">Created at: ${ad.created_at.slice(0,10)}</p>
          ${(token&&user_id)?`<button onclick="addToFavourite(${ad.id})" class="btn btn-info w-[80%] mx-auto my-[5px] text-[15px]">Add To Favourite</button>`:``}
          <button class="btn btn-warning w-[80%] mx-auto my-[15px] text-[15px]">Already Rented</button>
          <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto mb-[15px]">Show Details</button>`
          }
          else{
            div.innerHTML = `
          <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
          <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
          <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.location}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
          <p class="text-center font-bold">Posted by: ${ad.name.toString().replaceAll(",","")}</p>
          <p class="text-center font-bold">Created at: ${ad.created_at.slice(0,10)}</p>
          ${(token&&user_id)?`<button onclick="addToFavourite(${ad.id})" class="btn btn-info w-[80%] mx-auto my-[5px] text-[15px]">Add To Favourite</button>`:``}
          <button onclick="rentForRequest(${ad.id})" class="btn btn-primary w-[80%] mx-auto my-[15px] text-[15px]">Rent For Request</button>
          <button onclick="adDetailsTwo(${ad.id})" class="btn btn-primary w-[50%] mx-auto mb-[15px]">Show Details</button>`
          }
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

showAllAdvertiseButNoAction()




const loadReview=()=>{
  fetch("https://qrent-backend.onrender.com/feedback/list")
  .then(res=>res.json())
  .then(data=>{
    data.forEach(el=>{
      console.log("Review: ",el.advertise);
      const parent=document.getElementById("all-review")
      const li=document.createElement("li")
      li.innerHTML=
      `
      <li class="slide-visible">
                    <div class="card shadow h-100">
                        <div class="card-body p-3 p-xl-5">
                            <h3 class="card-title h5">${el.advertise}</h3>
                            <h3 class="card-title h5">Rating: ${el.star}</h3>
                            <h3 class="card-title h5">Comment:${el.review}</h3>
                            <p class="card-title">Review by: ${el.name}</p>
                            <p class="card-title">Created at: ${el.created_at.slice(0,10)}</p>
                            </div>
                        </div>
                    </div>
                </li>
      `
      li.classList.add("slide-visible")
      parent.appendChild(li)
    })
  })
}


loadReview()

