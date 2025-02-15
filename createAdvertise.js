const createAdvertise=(event)=>{
    event.preventDefault();
    const token=localStorage.getItem("token")
    if(!token){
        window.location.href="login.html"
    }
    else{
        const advertiseTitle=document.getElementById("advertiseTitle").value
        const advertiseDes=document.getElementById("advertiseDes").value
        const advertisePrice=document.getElementById("advertisePrice").value
        const location=document.getElementById("location").value
        if(!advertiseTitle)document.getElementById("advertiseTitleH").innerHTML=`<h5 style="color:red">Advertise Title (Required): </h5>`
        if(!advertiseDes)document.getElementById("advertiseDesH").innerHTML=`<h5 style="color:red">Advertise Description (Required): </h5>`
        if(!advertisePrice)document.getElementById("advertisePriceH").innerHTML=`<h5 style="color:red">Advertise Price (Required): </h5>`
        if(!location)document.getElementById("locationH").innerHTML=`<h5 style="color:red">Location (Required): </h5>`
        console.log(advertiseTitle,advertiseDes,advertisePrice);
        const title=advertiseTitle
        const description=advertiseDes
        const price=advertisePrice
        fetch("https://qrent-backend.onrender.com/advertise/create/",{
            method:"POST",
            headers:{
                Authorization:`Token ${token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title,description,price,location})
        })
        .then(res=>{
            if(res.ok){
                alert("Successful")
                window.location.href="profile.html"
                location.reload()
                return  res.json();
                
            }
            else{
                alert("Something went wrong.")
                location.reload()
            }
        })
        .catch(er=>console.log(er));
    }
}