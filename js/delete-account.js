(() => {
  const cfg = window.__STRANDARD_SUPABASE__;
  const msgEl = document.getElementById("dr_message");
  const emailEl = document.getElementById("dr_email");
  const reasonEl = document.getElementById("dr_reason");
  const ackEl = document.getElementById("dr_ack");

  const emailErr = document.getElementById("dr_email_err");
  const optErr = document.getElementById("dr_option_err");
  const ackErr = document.getElementById("dr_ack_err");

  function setMsg(text, kind) {
    msgEl.textContent = text || "";
    msgEl.classList.remove("ok", "err");
    if (kind) msgEl.classList.add(kind);
  }

  function clearErrors() {
    emailErr.textContent = "";
    optErr.textContent = "";
    ackErr.textContent = "";
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  const supabaseClient = window.supabase?.createClient(cfg.url, cfg.key);

  const form = document.getElementById("deleteRequestForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    setMsg("", null);

    const email = emailEl.value.trim();
    const reason = (reasonEl.value || "").trim();
    const optionEl = document.querySelector('input[name="delete_option"]:checked');
    const option = optionEl ? optionEl.value : "";
    const ack = !!ackEl.checked;

    let hasErr = false;
    if (!validEmail(email)) {
      emailErr.textContent = "Please enter a valid email address.";
      hasErr = true;
    }
    if (!option) {
      optErr.textContent = "Please select one option.";
      hasErr = true;
    }
    if (!ack) {
      ackErr.textContent = "Please confirm before submitting.";
      hasErr = true;
    }
    if (hasErr) return;

    const payload = {
      email,
      reason: reason || null,
      delete_data_only: option === "data_only",
      delete_account_keep_data: option === "account_keep_data",
      delete_both: option === "delete_both"
    };

    try {
      const { error } = await supabaseClient.from("delete_requests").insert([payload]);
      if (error) {
        console.error("Supabase insert error:", error);
        setMsg("Something went wrong. Please try again or email support@thestrandard.com.", "err");
        return;
      }
      form.reset();
      setMsg("Request received. We'll review your deletion request and follow up if needed.", "ok");
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong. Please try again or email support@thestrandard.com.", "err");
    }
  });
})();