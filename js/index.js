const loadFeatures = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayFeatres(data.data.tools))
};

const displayFeatres = (features) =>{
    const featruesContainer = document.getElementById("features-container");
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
                    <li>${feature.features[2]}</li>
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
        console.log()
    })
}

const loadFeatureDetails = id =>{
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(details => displayFeatreDetails(details.data))
}
const displayFeatreDetails = (details) =>{
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="p-3 feature-detail rounded-4 my-4">
            <h5 class="fw-bold">${details.description}</h5>
            <div class="d-flex flex-column d-md-flex flex-md-row gap-3 text-center justify-content-center">
                <div id="cost1">
                    <p>${details.pricing[0].price}</p>
                    <p>${details.pricing[0].plan}</p>
                </div>
                <div id="cost2">
                    <p>${details.pricing[1].price}</p>
                    <p>${details.pricing[1].plan}</p>
                </div>
                <div id="cost3">
                    <p>${details.pricing[2].price}</p>
                    <p>${details.pricing[2].plan}</p>  
                </div>
            </div>
            <div class="d-flex my-2 gap-4">
                <div>
                    <h5 class="fw-bold">Features</h5>
                    <ul>
                        <li>${details.features[1].feature_name}</li>
                        <li>${details.features[2].feature_name}</li>
                        <li>${details.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h5 class="fw-bold">Integrations</h5>
                    <ul>
                        <li>${details.integrations[0]}</li>
                        <li>${details.integrations[1]}</li>
                        <li>${details.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="border p-3 rounded-4 text-center">
            <img class="img-fluid" src="${details.image_link[0]}">
            <h4 class="fw-bold my-3">${details.input_output_examples[0].input}</h4>
            <p>${details.input_output_examples[0].output}</p>
        </div>
    `;
    console.log(details.input_output_examples)
}   

loadFeatures();