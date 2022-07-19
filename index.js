// chrome://extensions/
let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
// using local storage to make sure the leads are saved when we refresh the page
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

// this is how chrome gives us the tabs
// const tabs =[ // tabs array with objects as its item
//    {url: ""} // object
// ]

if (leadsFromLocalStorage){ // if it has a value
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){// rendering/logging out ANY array
    let listItems = ""
    for(let i=0 ; i<leads.length ; i++){
        // to make the link clickable using <a> tag
        // target='_blank'  -> opens the link in a new tab
        // listItems += "<li><a target='_blank' href = '" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        // using template literals->
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems // better to manuplilate DOM 1 time => not in for loop=> we create a new variable
}

tabBtn.addEventListener("click", function(){ // save url in tabs array
    // to query(grab a hold) the tabs in chrome
    // {active:true, currentWindow: true} -> which tab -> the active one in current Window
    // function() -> will be triggered when chrome finds the tab that we've asked for
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //console.log(tabs) // we get access to the tabs
        // tabs[0].url -> a way to get a hold of the url
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
    //console.log(tabs[0].url) // to log it out in the console
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads) // to clear the DOM
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value) //taking input and pushing it into array
    inputEl.value = "" // clear out the input field after saving
    localStorage.setItem("myLeads",JSON.stringify(myLeads)) // Save the myLeads array to localStorage  (key,what we want to save)
    render(myLeads) // to display the inputs immediately
})

