async function loadMessage(){
    const response = await fetch("/hello");
    const data = await response.json();
    document.getElementById("output").innerHTML = data.message;
}

async function cekHasil(r){
    if (confirm("Mengabsen "+r+"?")){
        const response = await fetch(
            "/hasil?qr=" + r
        );
        const data = await response.json();
        if (data.length==1){
            document.getElementById("answer").innerHTML = "Berhasil mengabsen "+(data.nama_lengkap);
        } else {
            document.getElementById("answer").innerHTML = "<font color='red'>Gagal mengabsen.</font>";
            alert("Gagal Mengabsen");
            location.reload();
        }
    } else {
        location.reload()
    }
}

function mulai(){
    cuacaAPI();
}

async function cuacaAPI(){
    const response =
        await fetch(
            "/cuaca"
        );

    const data = await response.json();
    console.log(data);
    document.getElementsByTagName("h1")[0].innerHTML += "<img width=48 src='"+data.message.image+"'> ("+data.message.datetime.slice(0,10)+")";
}