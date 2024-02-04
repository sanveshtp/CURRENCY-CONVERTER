let fromcurr = document.getElementById("fromcurr")
let tocurr = document.getElementById("tocurr")
let k = document.querySelectorAll("select")
let fromflag = document.getElementById("fromflag")
let toflag = document.getElementById("toflag")
let rev = document.getElementById("rev");
// let main = document.getElementById("main")
// const colors = ["#1a535cff", "#4ecdc4ff", "#f7fff7ff", "#ff6b6bff", "#ffe66dff"]


// updating options
for (let i in countryList) {
    if (i == "USD") {
        fromcurr.innerHTML += `<option value=${i} selected >${i}</option>`
    } else if (i == "INR") {
        tocurr.innerHTML += `<option value=${i} selected >${i}</option>`
    } else {
        fromcurr.innerHTML += `<option value=${i}>${i}</option>`
        tocurr.innerHTML += `<option value=${i}>${i}</option>`
    }

}

rev.addEventListener("click", () => {
    let temp = fromcurr.value
    console.log(temp);
    fromcurr.value = tocurr.value
    tocurr.value = temp
    updateflag(fromflag, fromcurr.value);
    updateflag(toflag, tocurr.value);
})


// updating flags
const updateflag = (a, b) => {
    a.setAttribute("src", `https://flagsapi.com/${countryList[b]}/flat/64.png`);
}
k[0].addEventListener("change", (e) => {
    updateflag(fromflag, fromcurr.value);
})
k[1].addEventListener("change", (e) => {
    updateflag(toflag, tocurr.value);
})


// exchange button
let exchbut = document.getElementById("exchbut")
exchbut.addEventListener("click", (e) => {
    e.preventDefault()
    conve()
    // main.setAttribute("background-color", colors[Math.floor(Math.random() * 3)])
    // console.log(main.getAttribute("background-color"));

})


async function conve() {
    // fetching the api
    let resp = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${(fromcurr.value).toLowerCase()}/${(tocurr.value).toLowerCase()}.json`);
    data = await resp.json();

    // targetting the amount
    let amount = document.getElementById("convnu").value
    let resamt = Math.floor(amount * (data[(tocurr.value).toLowerCase()]))
    let resdisp = document.getElementById("res")
    resdisp.innerHTML = `${amount} ${fromcurr.value} = ${resamt} ${tocurr.value}`
}


