// * Load Features Data----------:
const loadFeatures = (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayFeatres(data.data.tools , dataLimit))
};
// * Display Features Data--------:
const displayFeatres = (features , dataLimit) =>{
    // features.sort((a, b) => new Date(b.published_in) - new Date(a.published_in))
    const featruesContainer = document.getElementById("features-container");
    featruesContainer.innerHTML = '';
    // * To display 6 Features by Default:
    const seeMore = document.getElementById("see-more");
    if(dataLimit && features.length > 6){
        features = features.slice(0,6);
        seeMore.classList.remove('d-none');

    }
    else{
        seeMore.classList.add('d-none');
    }
    features.forEach(feature =>{
        const featureDiv =document.createElement("div");
        featureDiv.classList.add("col");
        featureDiv.innerHTML = `
        <div class="card h-100 rounded-4">
            <img class="img-fluid mx-auto p-2" src="${feature.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <ol>
                    <li>${feature.features[0]}</li>
                    <li>${feature.features[1]}</li>
                    <li>${feature.features[2] ? feature.features[2] : "No data found"}</li>
                </ol>
                <hr>
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <h4>${feature.name}</h4>
                        <p><i class="fa-regular fa-calendar-days"></i> ${feature.published_in}</p>
                    </div>
                    <div>
                        <button onclick="loadFeatureDetails('${feature.id}')" class="border-0 details-btn" data-bs-toggle="modal" data-bs-target="#featureDetailsModal">
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        featruesContainer.appendChild(featureDiv);
        // * Stop loder or spinner:
        toggleSpinner(false);
    })
}
// * add event handler on see more btn:
document.getElementById("see-more").addEventListener('click',function(){
    toggleSpinner(true);
    loadFeatures();
})

document.getElementById("sort-by-date").addEventListener("click",function(){
    // toggleSpinner(true);
    // loadFeatures();
    
});

// * Set Loder or Spinner:
const toggleSpinner = isLoding =>{
    const loderSection = document.getElementById("loder");
    if(isLoding){
        loderSection.classList.remove("d-none");
    }
    else{
        loderSection.classList.add("d-none");
    }
};
// * Load Single Features Data--------:
const loadFeatureDetails = id =>{
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(details => displayFeatreDetails(details.data))
}
// * Display Single Feature Data on Modal--------:
const displayFeatreDetails = (details) =>{
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="p-3 feature-detail rounded-4 my-4">
            <h5 class="fw-bold">${details.description}</h5>
            <div class="d-flex flex-column d-md-flex flex-md-row gap-3 text-center justify-content-center">
                <div id="cost1">
                    <p>${details.pricing ? details.pricing[0].price : "Free of cost"}</p>
                    <p>${details.pricing ? details.pricing[0].plan  : "Basic"}</p>
                </div>
                <div id="cost2">
                    <p>${details.pricing ? details.pricing[1].price : "Free of cost"}</p>
                    <p>${details.pricing ? details.pricing[1].plan  : "Pro"}</p>
                </div>
                <div id="cost3">
                    <p>${details.pricing ? details.pricing[2].price : "Free of cost"}</p>
                    <p>${details.pricing ? details.pricing[2].plan  : "Enterprices"}</p>  
                </div>
            </div>
            <div class="d-flex my-2 gap-4">
                <div>
                    <h5 class="fw-bold">Features</h5>
                    <ul>
                        <li>${details.features[1].feature_name}</li>
                        <li>${details.features[2].feature_name}</li>
                        <li>${details.features[3].feature_name}</li>
                        <li>${details.features[4] ? details.features[4].feature_name : "No data found"}</li>
                    </ul>
                </div>
                <div>
                    <h5 class="fw-bold">Integrations</h5>
                    <ul>
                        <li>${details.integrations ? details.integrations[0] : "No data found"}</li>
                        <li>${details.integrations ? details.integrations[1] : "No data found"}</li>
                        <li>${details.integrations ? details.integrations[2] : "No data found"}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="border p-3 rounded-4 text-center">
            <div>
                <p class="accuracy rounded fw-semibold">${details.accuracy.score ? details.accuracy.score * 100 + '% ' + "accuracy":""} </p>
            </div>
            <img class="img-fluid" src="${details.image_link[0]}">
            <h4 class="fw-bold my-2">${details.input_output_examples ? details.input_output_examples[0].input : "Can you give any example?"}</h4>
            <p>${details.input_output_examples ? details.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
    `;
}   

loadFeatures(6);