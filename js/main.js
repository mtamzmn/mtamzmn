async function fetchProperties(buildType, containerId) {
  try {
    const response = await fetch('food_info.json');
    const data = await response.json();

    if (Array.isArray(data)) {
      const cardContainer = document.getElementById(containerId);
      cardContainer.innerHTML = ''; // مسح أي بيانات موجودة
      
      // تصفية البيانات بناءً على نوع الصنف (category)
      const filteredData = data.filter(item => !buildType || item.category === buildType);

      if (filteredData.length === 0) {
        // إذا كانت القائمة فارغة بعد الفلترة، عرض رسالة لا يوجد منتجات لهذا الصنف
        cardContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height:150px;width:100%;margin-top:100px; background-color:#f2f2f2;">
        <h5 class="text-center text-muted" style="font-size: 20px; font-weight: normal;">
          لا يوجد منتجات لهذا الصنف حاليا
        </h5>
      </div>
        `;
      } else {
        // إذا تم العثور على منتجات، عرضها
        filteredData.forEach((item, index) => {
          const card = document.createElement("div");
          card.className = "card-item swiper-slide";
          card.style.background = '#fff';
          
          // التقييم الافتراضي (يمكن أن يكون عدد النجوم مثلاً من 0 إلى 5)
          const rating = item.rating || 0; // التقييم الافتراضي 0
          const stars = generateStars(rating); // إنشاء النجوم بناءً على التقييم

          card.innerHTML = `
            <img src="${item.images}" class="card-image">
            <div class="card-body">
              <h5 class="card-title">${item.food_name}</h5>
              <p style="color:#aaa;" class="card-text">
                ${item.price} <img src="img/ryal.png" style="width:25px;height:25px; vertical-align: middle; margin-left: 5px;">
              </p>
              <div class="rating">
                ${stars} <!-- عرض النجوم هنا -->
              </div>
              <a href="details.html?fId=${item.id}" class="btn btn-outline-primary">تفاصيل</a>
            </div>
          `;
          cardContainer.appendChild(card);
        });
        initializeSwiper();
      }
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// دالة لإنشاء النجوم بناءً على التقييم
function generateStars(rating) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    starsHtml += '<i class="bi bi-star-fill" style="color:#3ec15b;"></i>'; // نجمة ممتلئة
  }
  return starsHtml;
}

async function loadCarouselImages() {
  try {
    const response = await fetch('carousel_img.json');
    const data = await response.json(); // البيانات التي تم جلبها من الـ JSON
    const carouselInner = document.getElementById('carousel-inner');
    
    // تحميل الصور فقط في الكاروسيل
    data.forEach((item, index) => {  // استخدام 'data' بدلاً من 'images'
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }

      const imgElement = document.createElement('img');
      imgElement.src = item.image; // تأكد من أن العنصر 'image' في JSON صحيح
      imgElement.classList.add('d-block', 'w-100', 'hero-carousel-img');
      imgElement.alt = 'مطعم الزمن القديم للمأكولات الشعبية';

      carouselItem.appendChild(imgElement);
      carouselInner.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("خطأ في تحميل الصور:", error);
  }
}

async function fetchcat10() {
  fetchProperties('جديدنا',"mynews"); 
}

async function fetchAllcat() {
  fetchProperties(null, "card-all"); 
}

async function fetchcat1() {
  fetchProperties('اصناف مميزة',"card-container"); // عرض الأصناف المميزة فقط
}

async function fetchcat2() {
  fetchProperties('مطبق', "card-container2"); // عرض المطبق فقط
}

async function fetchcat3() {
  fetchProperties('عريكة', "card-container3"); // عرض العريكة فقط
}

async function fetchcat4() {
  fetchProperties('معصوب', "card-container4"); // عرض المعصوب فقط
}

async function fetchcat5() {
  fetchProperties('فول', "card-container5"); // عرض الفول فقط
}

async function fetchcat6() {
  fetchProperties('فاصولياء', "card-container6"); // عرض الفاصولياء فقط
}

async function fetchcat9() {
  fetchProperties('بيض', "eggs"); // عرض الفطائر فقط
}

async function fetchcat7() {
  fetchProperties('فطائر', "card-container7"); // عرض الفطائر فقط
}

async function fetchcat8() {
  fetchProperties('وجبات منوعة', "card-container8"); // عرض الوجبات المنوعة فقط
}

// Initializing Swiper
function initializeSwiper() {
  const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
}

window.onload = function() {
  loadCarouselImages();
  fetchAllcat(); // عرض جميع الأصناف
  fetchcat10();
  fetchcat1(); 
  fetchcat2();
  fetchcat3();
  fetchcat4();
  fetchcat5();
  fetchcat6();
  fetchcat9();
  fetchcat7();
  fetchcat8();
};
