const login=(event)=>{
    event.preventDefault()
    const username=document.getElementById("username").value
    const password=document.getElementById("password").value

    console.log(username)
    if ((username, password)) {
        fetch("https://sdp-final-backend.onrender.com/user/login/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token && data.user_id) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user_id);
            //   window.location.href = "index.html";
            }
          }).catch(er=>console.log(er));
      }
}


const logout=(event)=>
{
    event.preventDefault()
    const token = localStorage.getItem("token");
    fetch("https://sdp-final-backend.onrender.com/user/logout/", {
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
      });
  };