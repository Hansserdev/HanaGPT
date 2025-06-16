const KEY = "fakhriberbagi";

const pwd   = document.getElementById("pwd");
const unlock= document.getElementById("unlock");
const error = document.getElementById("error");
const icons = document.getElementById("icons");
const lock  = document.getElementById("lock");

// fungsi tampil UI utama
function showIcons(){
  lock.style.display="none";
  icons.style.display="flex";
}

// verifikasi kunci
unlock.addEventListener("click", ()=>{
  if(pwd.value.trim()===KEY){
    showIcons();
  }else{
    error.style.display="block";
    pwd.value="";
    pwd.focus();
  }
});

// tekan Enter juga validasi
pwd.addEventListener("keydown",e=>{
  if(e.key==="Enter") unlock.click();
});

// klik salah satu ikon -> minta background menerapkan cookie set terkait
icons.addEventListener("click",(e)=>{
  const btn=e.target.closest(".icon-btn");
  if(!btn) return;
  const set = parseInt(btn.dataset.set,10);
  chrome.runtime.sendMessage({cmd:"useSet", set});
});
