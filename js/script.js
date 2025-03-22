import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getDatabase,ref,child,get,set,update,remove,query,orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"; 
const firebaseConfig = {
apiKey: "AIzaSyBDYQTOFSv638XJnOqvFuwJGPnQZ3Dy-v8",
authDomain: "fir-new-46591.firebaseapp.com",
databaseURL: "https://fir-new-46591-default-rtdb.firebaseio.com",
projectId: "fir-new-46591",
storageBucket: "fir-new-46591.appspot.com",
messagingSenderId: "334561214917",
appId: "1:334561214917:web:fd48aa3ad5cb34ef740bac"
};
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
document.addEventListener("DOMContentLoaded", function() {
document.getElementById('body-h').style.overflow='hidden';
document.getElementById('loader').style.display = 'block';
Promise.all([fetchData(), fetchData2(), fetchnews()])
.then(() => {
document.getElementById('loader').style.display = 'none'; 
document.getElementById('body-h').style.overflow='auto';
})
.catch(error => {
console.error("Error fetching data: ", error);
});
});
function fetchData() {
var x='ارض';
return new Promise((resolve, reject) => {
const dbRef=ref(db,'agarinfo');
const queryRef=query(dbRef ,orderByChild('build_type'),equalTo(x));
get(queryRef).then((snapshot) => {
if (snapshot.exists()) {
const data = snapshot.val();
const cardContainer = document.getElementById("card-container");
cardContainer.innerHTML = ''; // مسح أي بيانات موجودة
for (const userKey in data) {
const user = data[userKey];
const card = document.createElement("div");
card.className = "card-item swiper-slide"; 
card.style.background = '#fff';
card.innerHTML = `
<img src="${user.image}" style="height:170px;">
<div class="card-body">
<h5 class="card-title">${user.build_type} ${user.opration_type}</h5>
<p style="color:#aaa;" class="card-text">السعر /${user.price}</p>
<p style="color:#aaa;" class="fw-lighter"><i class="bi bi-geo-alt"></i>${user.prov}/${user.area}/${user.vill}</p>
<a href="table.html?userId=${user.id}" class="btn btn-outline-info">معرفة المزيد</a>
</div>
<div class="content-info">
<div class="social" id="social">
<a href="tel:779289621"><i class="bi bi-telephone"></i></a>
<a href="https://api.whatsapp.com/send?phone=711578940&text=مرحبا ، هل يمكنني الاستفسار؟" ><i class="bi bi-whatsapp"></i></a>
<a href="sms:779289621"><i class="bi bi-chat"></i></a>
</div>
</div>`;
cardContainer.appendChild(card);
}
initializeSwiper();
resolve();
} else {
reject(new Error("No data available"));
}
}).catch(error => reject(error));
});
}






function fetchData2() {
var x='منزل';
const dbRef=ref(db,'agarinfo');
const queryRef=query(dbRef ,orderByChild('build_type'),equalTo(x));
get(queryRef).then((snapshot) => {
if (snapshot.exists()) {
const data = snapshot.val();
const cardContainer = document.getElementById("card-container2");
cardContainer.innerHTML = ''; // مسح أي بيانات موجودة
for (const userKey in data) {
const user = data[userKey];
// إنشاء عنصر البطاقة
const card = document.createElement("div");
 card.className = "card-item swiper-slide"; // تأكد من أن البطاقة في شريحة
card.style.background = '#fff';
card.innerHTML = `
<img src="${user.image}" style="height:170px;">
<div class="card-body">
<h5 class="card-title">${user.build_type} ${user.opration_type}</h5>
<p style="color:#aaa;" class="card-text">السعر /${user.price}</p>
<p style="color:#aaa;" class="fw-lighter"><i class="bi bi-geo-alt"></i>${user.prov}/${user.area}/${user.vill}</p>
<a href="table.html?userId=${user.id}" class="btn btn-outline-info">معرفة المزيد</a>
</div>
<div class="content-info">
<div class="social" id="social">
<a href="tel:779289621"><i class="bi bi-telephone"></i></a>
<a href="https://api.whatsapp.com/send?phone=711578940&text=مرحبا ، هل يمكنني الاستفسار؟" ><i class="bi bi-whatsapp"></i></a>
<a href="sms:779289621"><i class="bi bi-chat"></i></a>
</div>
</div>
`;
cardContainer.appendChild(card);
}
initializeSwiper();
} else {
console.log("No data available");
}
}).catch((error) => {
console.error("Error fetching data: ", error);
});
}


function fetchnews() {
const dbRef = ref(db, 'news'); // تأكد أن 'agarinfo' هو المسار الصحيح في قاعدة البيانات
get(dbRef).then((snapshot) => {
if (snapshot.exists()) {
const data = snapshot.val();
const cardContainer = document.getElementById("card-container3");
cardContainer.innerHTML = ''; // مسح أي بيانات موجودة
for (const userKey in data) {
const news = data[userKey];
// إنشاء عنصر البطاقة
const card = document.createElement("div");
 card.className = "card-item swiper-slide"; // تأكد من أن البطاقة في شريحة
card.style.background = '#fff';
card.innerHTML = `
<img src="${news.image}" style="height:170px;">
<div class="card-body">
<h5 class="card-title">${news.title}</h5>
<p style="display: -webkit-box;
-webkit-line-clamp:3;
-webkit-box-orient: vertical;
overflow: hidden;" class="fw-lighter"></i>${news.body_ds}</p>
<a href="view_news.html?newsId=${news.id}" class="btn btn-outline-info">معرفة المزيد</a>
</div>
`;
cardContainer.appendChild(card);
}
initializeSwiper();
} else {
console.log("No data available");
}
}).catch((error) => {
console.error("Error fetching data: ", error);
});
}