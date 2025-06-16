// background.js — hanya bertugas menerapkan set cookie yang dipilih
async function applyCookieSet(setNumber) {
    // Ambil berkas JSON cookie (tersimpan di folder /cookies)
    const url = chrome.runtime.getURL(`cookies/perplexity${setNumber}.json`);
    const cookieArray = await (await fetch(url)).json();
  
    // Hapus dulu semua cookie aktif Perplexity supaya tidak tercampur
    const existing = await chrome.cookies.getAll({ domain: ".perplexity.ai" });
    for (const c of existing) {
      await chrome.cookies.remove({ url: "https://www.perplexity.ai" + c.path, name: c.name });
    }
  
    // Set ulang cookie sesuai berkas
    for (const c of cookieArray) {
      await chrome.cookies.set({
        url: "https://www.perplexity.ai" + (c.path || "/"),
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path || "/",
        secure: c.secure,
        httpOnly: c.httpOnly,
        sameSite: c.sameSite,
        expirationDate: c.expirationDate
      });
    }
  }
  
  // Dengar permintaan dari popup
  chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.cmd === "useSet" && [1, 2, 3, 4, 5].includes(msg.set)) {
      applyCookieSet(msg.set).then(() => {
        chrome.tabs.create({ url: "https://www.perplexity.ai/" });
      });
    }
    sendResponse(); // agar tanpa error
    return true;    // keep channel alive
  });
  