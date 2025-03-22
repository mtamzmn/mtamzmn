document.addEventListener("DOMContentLoaded", fetchData);

const itemsPerPage = 6;
let currentPage = 1;
let allData = [];

async function fetchData() {
  toggleLoader(true);
  
  try {
    // جلب البيانات من ملف JSON محلي
    const response = await fetch('food_info.json');
    const data = await response.json();
    
    // استخراج التصنيف من معلمة URL (على سبيل المثال: ?category=land)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all'; // إذا لم يتم تحديد التصنيف، يعرض "all" كافتراضي
    
    // تصفية البيانات حسب التصنيف
    if (category === 'all') {
      allData = data; // عرض جميع البيانات إذا كانت المعلمة 'category' تساوي 'all'
    } else {
      allData = data.filter(item => item.category === category); // تصفية البيانات بناءً على التصنيف
    }

    // إذا كانت هناك بيانات
    if (allData.length > 0) {
      renderData(allData.slice(0, itemsPerPage));
      renderPagination(allData.length);

      // إزالة رسالة "لا يوجد منتجات لهذا الصنف"
      document.getElementById("que").innerHTML = '';
    } else {
      // إضافة رسالة في حال عدم العثور على منتجات لهذا التصنيف
      document.getElementById("que").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height:150px;width:100%; background-color: #f2f2f2;">
          <h5 class="text-center text-muted" style="font-size: 20px; font-weight: normal;">
            لا يوجد منتجات لهذا الصنف حاليا
          </h5>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    toggleLoader(false);
  }
}

function toggleLoader(show) {
  document.getElementById('loader').style.display = show ? 'block' : 'none';
  document.getElementById('body-h').style.overflow = show ? 'hidden' : 'auto';
}

function renderData(data) {
  const rowContainer = document.getElementById("properties-container");
  rowContainer.innerHTML = '';
  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card-item');
    card.innerHTML = `
      <img src="${item.images}" class="card-image">
      <div class="card-body">
        <h5 class="card-title">${item.food_name}</h5>
        <p style="color:#aaa;" class="card-text">
          ${item.price} <img src="img/ryal.png" style="width:25px;height:25px; vertical-align: middle; margin-left: 5px;">
        </p>
        <div class="rating">
          <i class="bi bi-star-fill" style="color:#3ec15b;"></i>
          <i class="bi bi-star-fill" style="color:#3ec15b;"></i>
          <i class="bi bi-star-fill" style="color:#3ec15b;"></i>
          <i class="bi bi-star-fill" style="color:#3ec15b;"></i>
          <i class="bi bi-star-fill" style="color:#3ec15b;"></i>
        </div>
        <a href="details.html?fId=${item.id}" class="btn btn-outline-primary">تفاصيل</a>
      </div>
    `;
    rowContainer.appendChild(card);
  });
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = '';

  const prevPage = document.createElement("li");
  prevPage.classList.add("page-item", "mx-1");
  prevPage.innerHTML = `<a class="page-link" href="#" aria-label="Previous" onclick="changePage(currentPage - 1)">&laquo; السابق</a>`;
  if (currentPage === 1) {
    prevPage.classList.add("disabled");
  }
  paginationContainer.appendChild(prevPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    if (i === currentPage) {
      pageItem.classList.add("active");
    }
    pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    paginationContainer.appendChild(pageItem);
  }

  const nextPage = document.createElement("li");
  nextPage.classList.add("page-item", "mx-1");
  nextPage.innerHTML = `<a class="page-link" href="#" aria-label="Next" onclick="changePage(currentPage + 1)">التالي &raquo;</a>`;
  if (currentPage === totalPages) {
    nextPage.classList.add("disabled");
  }
  paginationContainer.appendChild(nextPage);
}

function changePage(page) {
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  renderData(allData.slice(startIndex, endIndex));
  renderPagination(allData.length);
}

// تحديث عنوان التصنيف بناءً على معلمة 'category'
document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category'); // الحصول على قيمة معلمة 'category'

  const categoryTitle = document.getElementById('category-title');
  
  if (category === 'اصناف مميزة') {
    categoryTitle.textContent = 'اصناف مميزة';
  } else if (category === 'مطبق') {
    categoryTitle.textContent = 'مطبق';
  }else if (category === 'جديدنا') {
    categoryTitle.textContent = 'جديدنا';
  } else if (category === 'عريكة') {
    categoryTitle.textContent = 'عريكة';
  } else if (category === 'معصوب') {
    categoryTitle.textContent = 'معصوب';
  } else if (category === 'فول') {
    categoryTitle.textContent = 'فول';
  }else if (category === 'بيض') {
    categoryTitle.textContent = 'بيض';
  } else if (category === 'فاصولياء') {
    categoryTitle.textContent = 'فاصولياء';
  } else if (category === 'فطائر') {
    categoryTitle.textContent = 'فطائر';
  } else if (category === 'وجبات منوعة') {
    categoryTitle.textContent = 'وجبات منوعة';
  } else if (category === 'all') {
    categoryTitle.textContent ='كل المنتجات';
  } else {
    categoryTitle.textContent = 'المنتجات'; // افتراض إذا لم يتم تحديد قيمة
  }
});
