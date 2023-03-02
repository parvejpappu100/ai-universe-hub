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
                        <button class="border-0 details-btn"><i class="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        featruesContainer.appendChild(featureDiv);
        console.log(feature)
    })
}

loadFeatures();