const allSteps = document.querySelectorAll('.stp');
const allCircleSteps = document.querySelectorAll('.step');
const formInputs = document.querySelectorAll(".step-1 form input");
const allPlans = document.querySelectorAll(".step-card");
const switcherEle = document.querySelector('.switcher');
const allAddons = document.querySelectorAll('.box');
const totalEle = document.querySelector(".total b");
const planPrice = document.querySelector('.plan-price');
let time;
let currentStep = 1;
let currentCircle = 0;
const object = {
    plan: null,
    kind: null,
    price: null,
};


allSteps.forEach((step) => {
    const nextBtn = step.querySelector(".btn-container .next-btn");
    const prevBtn = step.querySelector(".btn-container .prev-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            document.querySelector(`.step-${currentStep}`).style.display = "none";
            currentStep--;
            document.querySelector(`.step-${currentStep}`).style.display = "flex";
            allCircleSteps[ currentCircle ]?.classList.remove("active");
            currentCircle--;
        });
    }
    nextBtn?.addEventListener("click", () => {
        document.querySelector(`.step-${currentStep}`).style.display = "none";
        if (currentStep < 5 && validateForm()) {
            currentStep++;
            currentCircle++;
            setTotal();
        }
        document.querySelector(`.step-${currentStep}`).style.display = "flex";
        allCircleSteps[ currentCircle ]?.classList.add("active");
        summary(object);
    });
});

function summary(object) {
    const planName = document.querySelector(".plan-name");
    const planPrice = document.querySelector(".plan-price");
    planPrice.innerHTML = `${object.price?.innerText}`;
    planName.innerHTML = `${object.plan?.innerText} (${object.kind ? "yearly" : "monthly"})`;
}
function validateForm() {
    let valid = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (!formInputs[ i ].value) {
            valid = false;
            formInputs[ i ].classList.add('err');
            findLabel(formInputs[ i ]).nextElementSibling.style.display = "flex";
        } else {
            valid = true;
            formInputs[ i ].classList.remove("err");
            findLabel(formInputs[ i ]).nextElementSibling.style.display = "none";
        }
    }
    return valid;
}

function findLabel(el) {
    const idVal = el.id;
    const labels = document.getElementsByTagName("label");
    for (let i = 0; i < labels.length; i++) {
        if (labels[ i ].htmlFor = idVal) return labels[ i ];

    }
}

allPlans.forEach((plan) => {
    plan.addEventListener("click", () => {
        document.querySelector(".selected").classList.remove("selected");
        plan.classList.add("selected");
        const planName = plan.querySelector("b");
        const planPrice = plan.querySelector(".plan-priced");
        object.plan = planName;
        object.price = planPrice;
    });
});


switcherEle.addEventListener("click", () => {
    const val = switcherEle.querySelector("input").checked;
    if (val) {
        document.querySelector(".monthly").classList.remove("activate");
        document.querySelector(".yearly").classList.add('activate');
    } else {
        document.querySelector(".monthly").classList.add("activate");
        document.querySelector(".yearly").classList.remove("activate");
    }
    switchPrice(val);
    object.kind = val;
});

allAddons.forEach((addon) => {
    addon.addEventListener("click", (e) => {
        const addonSelect = addon.querySelector("input");
        const ID = addon.getAttribute("data-id");
        if (addonSelect.checked) {
            addonSelect.checked = false;
            addon.classList.remove("ad-selected");
            showAddon(ID, false);
        } else {
            addonSelect.checked = true;
            addon.classList.add("ad-selected");
            showAddon(addon, true);
            e.preventDefault();
        }
    });
});

function switchPrice(checked) {
    const yearlyPrice = [ 90, 150, 894 ];
    const monthlyPrice = [ 20, 10, 36 ];
    const prices = document.querySelectorAll(".plan-priced");
    if (checked) {
        prices[ 0 ].innerHTML = `${yearlyPrice[ 0 ]}/yr`;
        prices[ 1 ].innerHTML = `${yearlyPrice[ 1 ]}/yr`;
        prices[ 2 ].innerHTML = `${yearlyPrice[ 2 ]}/yr`;
        setTime(true);
    } else {
        prices[ 0 ].innerHTML = `${monthlyPrice[ 0 ]}/mo`;
        prices[ 1 ].innerHTML = `${monthlyPrice[ 1 ]}/mo`;
        prices[ 2 ].innerHTML = `${monthlyPrice[ 2 ]}/mo`;
        setTime(false);
    }
}

function showAddon(ad, val) {
    const temp = document.getElementsByTagName("template")[ 0 ];
    const clone = temp.content.cloneNode(true);
    const serviceName = clone.querySelector(".service-name");
    const servicePrice = clone.querySelector(".service-price");
    const serviceID = clone.querySelector("selected-addon");
    if (ad && val) {
        serviceName.innerText = ad.querySelector("label").innerText;
        servicePrice.innerText = ad.querySelector(".price").innerText;
        serviceID?.setAttribute("data-id", ad.dataset.id);
        document.querySelector(".added").appendChild(clone);
    } else {
        const addonee = document.querySelectorAll("selected-addon");
        addonee.forEach((addon) => {
            const attr = addon.getAttribute("data-id");
            if (attr = ad) {
                addon.remove();
            }
        });
    }
}

function setTotal() {
    const str = planPrice.innerHTML;
    const response = str.replace(/\D/g, "");
    const addonPrices = document.querySelectorAll(".selected-addon .service-price");
    let val = 0;
    for (let i = 0; i < addonPrices.length; i++) {
        const str = addonPrices[ i ].innerHTML;
        const response = str.replace(/\D/g, "");
        val += Number(response);
    }
    totalEle.innerHTML = `${val + Number(response)}/${time ? "yr" : "mo"}`;
}

function setTime(t) {
    return time = t;
}

console.log(document.querySelector(".added"));