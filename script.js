// ====================================
// MELOSAVE V2 - PART 1
// ====================================

// ---------- Notification ----------

function showNotification(message, color = "#6C3EF4") {

    let notification = document.getElementById("notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.background = color;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}


// ---------- Theme ----------

const themeBtn = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

themeBtn?.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        showNotification("🌙 Dark Mode Enabled");

    }else{

        localStorage.setItem("theme","light");

        showNotification("☀️ Light Mode Enabled");

    }

});


// ---------- Register ----------

const signupForm = document.getElementById("signupForm");

signupForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input");

    const name = inputs[0].value.trim();

    const email = inputs[1].value.trim().toLowerCase();

    const password = inputs[2].value;

    const confirm = inputs[3].value;

    if(password !== confirm){

        showNotification("❌ Passwords do not match","#ff3b30");

        return;

    }

    const user = {

        name:name,

        email:email,

        password:password,

        income:0,

        expenses:0,

        savings:0,

        balance:0,

        transactions:[]

    };

    localStorage.setItem("melosaveUser",JSON.stringify(user));

    showNotification("🎉 Welcome to MeloSave, " + name + "!");

    setTimeout(()=>{

        location.href="login.html";

    },1800);

});


// ---------- Login ----------

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const email = loginForm.querySelectorAll("input")[0].value.trim().toLowerCase();

    const password = loginForm.querySelectorAll("input")[1].value;

    const user = JSON.parse(localStorage.getItem("melosaveUser"));

    if(!user){

        showNotification("❌ No account found","#ff3b30");

        return;

    }

    if(email===user.email && password===user.password){

        localStorage.setItem("loggedIn","true");

        showNotification("👋 Welcome back, " + user.name);

        setTimeout(()=>{

            location.href="dashboard.html";

        },1800);

    }else{

        showNotification("❌ Incorrect email or password","#ff3b30");

    }

});


// ---------- Dashboard ----------

const greeting = document.getElementById("greeting");

const user = JSON.parse(localStorage.getItem("melosaveUser"));

if(greeting && user){

    const hour = new Date().getHours();

    let message="";

    if(hour<12){

        message="Good Morning";

    }else if(hour<17){

        message="Good Afternoon";

    }else{

        message="Good Evening";

    }

    greeting.innerHTML=`${message}, ${user.name} 👋`;

}


// ---------- Dashboard Numbers ----------

const balance=document.getElementById("balance");

const income=document.getElementById("income");

const expenses=document.getElementById("expenses");

const savings=document.getElementById("savings");

if(user){

    if(balance){

        balance.textContent="₦"+user.balance.toLocaleString();

        income.textContent="₦"+user.income.toLocaleString();

        expenses.textContent="₦"+user.expenses.toLocaleString();

        savings.textContent="₦"+user.savings.toLocaleString();

    }

}
