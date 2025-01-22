const signup = (event) => {
  event.preventDefault()
  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  if (password === confirm_password) {
    console.log("Ok")
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
      .then(res => res.json())
      .then(data => {
        document.getElementById("messageBox").innerText = "Check your mail inbox or spam."
      }
      )
      .catch(er => console.log(er))
  }
}

const login = (event) => {
  event.preventDefault()
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  if ((username, password)) {
    fetch("https://qrent-backend.onrender.com/user/login/"
      ,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "home.html";
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
  fetch("https://qrent-backend.onrender.com/advertise/all/")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(ad => {
        const parent = document.getElementById("all-advertise")
        const div = document.createElement("div")
        if (ad.image != null && ad.is_approved!=false) {
          div.innerHTML = `
          <img src="${ad.image}">
          <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
          <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
          <button onclick="showAdDetails(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
          div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
          parent.appendChild(div)

        }
        else if(ad.is_approved!=false) {
          div.innerHTML = `
          <img src="pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg">
          <h2 class="text-center font-bold text-[1.25rem]">${ad.title}</h2>
          <p class="text-center font-bold text-[1.25rem]">${ad.description}</p>
          <p class="text-center font-bold text-[1.25rem]">Price: ${ad.price}</p>
          <button onclick="showAdDetails(${ad.id})" class="btn btn-primary w-[50%] mx-auto my-[25px]">Show Details</button>`
          div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
          parent.appendChild(div)

        }
        console.log(ad.title);
        console.log(ad.description);
        console.log(ad.price);
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