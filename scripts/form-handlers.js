import { API_URL } from "../constants.js";

const subscribeForm = document.getElementById("subscribe-form");
const contactForm = document.getElementById("contact-form");

subscribeForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = this.email.value;

  try {
    const response = await axios.post(`${API_URL}/email-subscribe`, {
      email,
    });

    if (response.status === 200) {
      alert(
        `Thank you for subscribing! A welcome email has been sent to ${email}.`
      );
    }
  } catch (err) {
    alert(err.message);
  }

  this.reset();
});

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  try {
    const response = await axios.post(`${API_URL}/contact`, {
      name,
      email,
      message,
    });

    if (response.status === 200) {
      alert(
        `Thank you for contacting me, ${name}! I will reply to ${email} as soon as I can.`
      );
    }
  } catch (err) {
    alert(err.message);
  }

  this.reset();
});
