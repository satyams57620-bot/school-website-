// MENU TOGGLE
function toggleMenu(){
    document.getElementById("navMenu").classList.toggle("show");
}

// LOADER
window.onload = function(){

    setTimeout(()=>{
        document.getElementById("loader").classList.add("hide");
    },1500);

    revealSections();
};

// SCROLL ANIMATION
function revealSections(){
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    },{threshold:0.1});

    sections.forEach(sec=>{
        observer.observe(sec);
    });
}

// TYPING EFFECT (HOME TITLE)
document.addEventListener("DOMContentLoaded",function(){

    const text = "WELCOME TO GOPAL VIDYALAYA INTER COLLEGE";
    let i = 0;

    const target = document.querySelector(".hero h2");
    if(!target) return;

    target.innerHTML = "";

    function type(){
        if(i < text.length){
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type,50);
        }
    }

    type();
});
async function loadSocialLinks(){

const { data } = await supabaseClient
.from("social_links")
.select("*")
.limit(1)
.single();

if(!data) return;

document.getElementById("instagramLink").href = data.instagram || "#";
document.getElementById("facebookLink").href = data.facebook || "#";
document.getElementById("twitterLink").href = data.twitter || "#";
document.getElementById("telegramLink").href = data.telegram || "#";
document.getElementById("whatsappLink").href = data.whatsapp || "#";

}

loadSocialLinks();
