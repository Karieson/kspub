const API = "https://captchabackend.onrender.com";

let captchaId = "";
let captchaVerified = false;

// =========================
// OPEN CAPTCHA
// =========================
async function openCaptcha() {

    document.getElementById("captchaBox").style.display = "block";

    try {

        const res = await fetch(`${API}/captcha`);
        const data = await res.json();

        // backend should return:
        // {
        //   id: "...",
        //   image: "data:image/png;base64,..."
        // }

        captchaId = data.id;

        document.getElementById("captchaImage").src = data.image;

    } catch (err) {

        console.error(err);
        alert("Failed to load CAPTCHA");

    }
}

// =========================
// VERIFY CAPTCHA
// =========================
async function verifyCaptcha() {

    const input = document.getElementById("captchaInput").value;

    if (!input) {
        alert("Enter CAPTCHA");
        return;
    }

    try {

        const res = await fetch(`${API}/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: captchaId,
                code: input
            })
        });

        const data = await res.json();

        if (data.success) {

            captchaVerified = true;

            alert("CAPTCHA verified!");

            document.getElementById("admissionForm").submit();

        } else {

            alert("Wrong CAPTCHA");

            document.getElementById("captchaInput").value = "";

            openCaptcha();
        }

    } catch (err) {

        console.error(err);
        alert("Verification failed");

    }
}

// =========================
// BLOCK FORM UNTIL CAPTCHA
// =========================
document
.getElementById("admissionForm")
.addEventListener("submit", function(e) {

    if (!captchaVerified) {

        e.preventDefault();

        openCaptcha();

    }

});