const phone = '15691055826';
const wxpusherAppToken = 'AT_ecHYmt35O90WGtA6KyfrG2RJ8MaMdl5d';
const wxpusherUIDs = ['UID_b0HSsPHcP7rVmLt3tm6ZCtodpebA'];

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function setMessage(message) {
  document.getElementById('message').value = message;
}

function notifyOwner() {
  const button = document.querySelector('.notify-btn');
  button.classList.add('loading');
  button.disabled = true;
  const message = document.getElementById('message').value;

  fetch("https://wxpusher.zjiecode.com/api/send/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appToken: wxpusherAppToken,
      content: message,
      contentType: 1,
      uids: wxpusherUIDs
    })
  })
  .then(response => response.json())
  .then(data => {
    button.classList.remove('loading');
    button.disabled = false;
    if (data.code === 1000) {
      showToast("通知已发送，车主很快就来！");
    } else {
      showToast("发送失败，请尝试电话联系");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    button.classList.remove('loading');
    button.disabled = false;
    showToast("网络错误，请尝试电话联系");
  });
}

function callOwner() {
  window.location.href = `tel:${phone}`;
}
