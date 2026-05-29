const units = {

  "Computer Packages": [
    "CP101 - Introduction to Computers",
    "CP102 - Microsoft Word",
    "CP103 - Microsoft Excel",
    "CP104 - Microsoft PowerPoint",
    "CP105 - Internet & Email Applications",
    "CP106 - Computer Operating Systems",
    "CP107 - Data Entry & Typing Skills",
    "CP108 - Computer Maintenance Basics"
  ],

  "Agro Entrepreneurship": [
    "AE101 - Introduction to Agriculture",
    "AE102 - Agribusiness Management",
    "AE103 - Farm Record Keeping",
    "AE104 - Crop Production Techniques",
    "AE105 - Livestock Management",
    "AE106 - Agricultural Marketing",
    "AE107 - Financial Management for Farmers",
    "AE108 - Sustainable Farming Practices"
  ],

  "Smartphone Literacy": [
    "SL101 - Introduction to Smartphones",
    "SL102 - Android Phone Basics",
    "SL103 - Internet Browsing & Google Services",
    "SL104 - Social Media Applications",
    "SL105 - Mobile Money & Digital Payments",
    "SL106 - Smartphone Security & Privacy",
    "SL107 - Photography & Video Basics",
    "SL108 - Online Communication Skills"
  ],

  "ICT Short Courses": [
    "ICT101 - Introduction to ICT",
    "ICT102 - Networking Fundamentals",
    "ICT103 - Web Design Basics",
    "ICT104 - Graphic Design Essentials",
    "ICT105 - Database Management",
    "ICT106 - Cybersecurity Basics",
    "ICT107 - Programming Fundamentals",
    "ICT108 - Digital Marketing"
  ]
};


// COURSE + UNIT SELECT

const courseSelect = document.getElementById("courseSelect");
const unitSelect = document.getElementById("unitSelect");

courseSelect.addEventListener("change", function () {

  const selectedCourse = this.value;

  unitSelect.innerHTML =
    '<option value="">Choose Unit</option>';

  if (units[selectedCourse]) {

    units[selectedCourse].forEach(unit => {

      const option = document.createElement("option");

      option.value = unit;
      option.textContent = unit;

      unitSelect.appendChild(option);

    });

  }

});


// ===============================
// INTASEND PAYMENT
// ===============================

let paymentVerified = false;

const intaSend = new window.IntaSend({
  publicAPIKey: "ISPubKey_live_e09f65ef-7bde-4e1d-be50-1c2226dfa8fa",
  live: true
});

document
  .getElementById("intasendBtn")
  .addEventListener("click", function () {

    intaSend.run({
      amount: 1000,
      currency: "KES",

      email: document.getElementById("email").value,
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,

      api_ref: "WORKSHOP_" + Date.now()
    });

    // TEMPORARY SUCCESS FLAG
    paymentVerified = true;

  });


// ===============================
// FORM SUBMISSION
// ===============================

document
  .getElementById("bookingForm")
  .addEventListener("submit", function(e){

    e.preventDefault();

    let consent =
      document.getElementById("consentCheck").checked;

    if(!consent){

      alert(
        "You must accept the Privacy Policy and Terms & Conditions."
      );

      return;
    }

    if(!paymentVerified){

      alert("Please complete payment first.");

      return;
    }

    let bookingData = {

      firstName:
        document.getElementById("firstName").value,

      lastName:
        document.getElementById("lastName").value,

      email:
        document.getElementById("email").value,

      phone:
        document.getElementById("phone").value,

      course:
        document.getElementById("courseSelect").value,

      unit:
        document.getElementById("unitSelect").value,

      weekendDate:
        document.getElementById("weekendDate").value,

      seats:
        document.getElementById("seats").value
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbyRKGb5fjqh5L9Dv6LkPaqRfpWaaswhLOQrkvh_oaY2oobv0_e_58Aa7pd8_R2kh9Qv-Q/exec",
      {
        method: "POST",
        body: JSON.stringify(bookingData)
      }
    )

    .then(res => res.json())

    .then(data => {

      if(data.result === "success"){

        alert(
          "Workshop booking submitted successfully."
        );

      } else {

        alert("Error: " + data.message);

      }

    })

    .catch(err => {

      alert("Submission failed: " + err);

    });

});