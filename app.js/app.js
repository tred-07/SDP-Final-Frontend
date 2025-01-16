const signup=(event)=>{
  event.preventDefault()
  const username=document.getElementById("username").value;
  const first_name=document.getElementById("first_name").value;
  const last_name=document.getElementById("last_name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const confirm_password=document.getElementById("confirm_password").value;
  if(password===confirm_password){
    console.log("Ok")
    const info={
      "username":username,
      "first_name":first_name,
      "last_name":last_name,
      "email":email,
      "password":password,
      "confirm_password":confirm_password
    }
    fetch("https://q-rent-backend.vercel.app/user/register/"
    // fetch("http://127.0.0.1:8000/user/register/"  
    ,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(info)
    })
    .then(res=>res.json())
    .then(data=>
    {
      document.getElementById("messageBox").innerText="Check your mail inbox or spam."
    }
    )
    .catch(er=>console.log(er))
  }
}

const login=(event)=>{
    event.preventDefault()
    const username=document.getElementById("username").value
    const password=document.getElementById("password").value
    console.log(username)
    console.log(username)
    if ((username, password)) {
        fetch("https://q-rent-backend.vercel.app/user/login/",
        // fetch("http://127.0.0.1:8000/user/login/",
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
          }).catch(er=>console.log(er));
      }
}


const logout=(event)=>
{
    event.preventDefault()
    const token = localStorage.getItem("token");
    fetch("https://q-rent-backend.vercel.app/user/logout/", {
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
        window.location.href="index.html"
      });
  };