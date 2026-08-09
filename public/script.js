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