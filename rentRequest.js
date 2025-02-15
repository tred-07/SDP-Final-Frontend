const rentForRequest=(id)=>{
    const user_id=localStorage.getItem("user_id")
    const token=localStorage.getItem("token")
    const message="I want to rent this."
    if(!token){
      window.location.href = "login.html";
  }
    fetch(`https://qrent-backend.onrender.com/request/create/${id}/`,
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ message })
      }
    )
    .then(res=>res.json)
    .then(data=>{
      alert("You request successfully submitted. Refresh and Check on My Request option.")
      console.log("You request successfully submitted");
      location.reload()
    })
    .catch(er=>console.log(er))
  }