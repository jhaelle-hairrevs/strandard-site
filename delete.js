const SUPABASE_URL = "https://qhqcbufoyulzwkeoisxd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFocWNidWZveXVsendrZW9pc3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3OTQxNTIsImV4cCI6MjA4MjM3MDE1Mn0.qFFBkjyeIqOCtgWocveegQWTa1V3CrH_vmnrpcYeGRw";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById("deleteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailValue = document.getElementById("email").value;
  const reasonValue = document.getElementById("reason").value;
  const selection = document.querySelector('input[name="delete_option"]:checked').value;

  let payload = {
    email: emailValue,
    reason: reasonValue,
    delete_data_only: selection === "data_only",
    delete_account_keep_data: selection === "account_keep_data",
    delete_both: selection === "delete_both"
  };

  const { error } = await supabaseClient.from("delete_requests").insert([payload]);

  const message = document.getElementById("message");
  if (error) {
    message.innerText = "Submission failed.";
  } else {
    message.innerText = "Request submitted successfully.";
  }
});
