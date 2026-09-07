async function loadMessage(){
    const response = await fetch("/hello");
    const data = await response.json();
    document.getElementById("output").innerHTML = data.message;
}

async function askAI() {
    const prompt = document.getElementById("prompt").value;

    const response =
        await fetch(
            "/ask?prompt=" +
            encodeURIComponent(prompt)
        );

    const data = await response.json();

    document.getElementById("answer").innerHTML = data.message;
}

function mulai(){
    console.log("yak!")
    cuacaAPI();
    // cek_database();
}

async function cuacaAPI(){
    const response =
        await fetch(
            "/cuaca"
        );

    const data = await response.json();
    console.log(data);
    // document.getElementsByTagName("h1")[0].innerHTML += "<img width=48 src='"+data.message.image+"'> ("+data.message.datetime.slice(0,10)+")";
}

// async function cek_database(){
//     const response =
//         await fetch(
//             "/cek_db"
//         );

//     const data = await response.json();
// }