// تحديث السعر بناءً على الكمية المختارة
function updatePrice() {
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('product-price').getAttribute('data-price'));
  const totalPrice = price * quantity;

  document.getElementById('product-price').innerHTML = `${totalPrice.toFixed(2)} <img src="img/ryal.png" style="width: 20px; height: 20px; vertical-align: middle;">`;
}

// إضافة المنتج إلى السلة
function addToCart() {
  const productId = document.getElementById('product-id').value;
  const productTitle = document.getElementById('product-title').innerText;
  const price = parseFloat(document.getElementById('product-price').getAttribute('data-price'));
  const quantity = parseInt(document.getElementById('quantity').value);
  const totalPrice = price * quantity;
  
  const productImage = document.getElementById('product-image').src;
  
  const cartItem = {
      productId,
      productTitle,
      price,
      quantity,
      totalPrice,
      productImage
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  showToast();
}

// عرض الإشعار بعد إضافة المنتج إلى السلة
function showToast() {
  const toastElement = document.getElementById('toast');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// جلب بيانات المنتج بناءً على الفيد من الرابط
function fetchData() {
  const url = new URL(window.location.href);
  const productId = new URLSearchParams(url.search).get('fId');
  
  fetch('food_info.json')
    .then(response => response.json())
    .then(data => {
      const product = data.find(item => item.id === productId);
      
      if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-title').innerText = product.food_name;
        document.getElementById('product-price').innerText = `${product.price} ريال`;
        document.getElementById('product-price').setAttribute('data-price', product.price);
        document.getElementById('product-description').innerText = product.description || 'لا يوجد وصف لهذا المنتج.';
        document.getElementById('product-image').src = product.images;
        updatePrice();
      } else {
        alert('لم يتم العثور على المنتج.');
      }
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
}

// تحميل التعليقات من ملف JSON
function loadComments() {
  const url = new URL(window.location.href);
  const productId = new URLSearchParams(url.search).get('fId');
  
  fetch('comments.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('فشل في تحميل الملف');
      }
      return response.json();
    })
    .then(comments => {
      const commentsContainer = document.getElementById('comments-container');
      commentsContainer.innerHTML = '';  

      if (comments[productId]) {
        comments[productId].forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.innerHTML = `
            <div class="comment-text">${comment.text}</div>
          `;
          

          commentsContainer.appendChild(commentElement);
        });
      }
    })
    .catch(error => {
      console.error('Error loading comments:', error);
    });
}
// إرسال تعليق جديد أو رد على تعليق
function sendComment(productId, commentText) {
  const formData = new FormData();
  formData.append('productId', productId);
  formData.append('commentText', commentText);

  // سجل البيانات التي يتم إرسالها
  console.log("Sending comment:", {
    productId: productId,
    commentText: commentText
  });

  fetch('https://mtamzman.infy.uk/handleCommentReply.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server Response:', data);  // سجل الاستجابة من السيرفر
    if (data.status === 'success') {
      showToast('تم إرسال التعليق بنجاح', 'success');
      loadComments();  // إعادة تحميل التعليقات بعد إضافة تعليق جديد
    } else {
      showToast(`فشل في إرسال التعليق: ${data.message || 'لم يتم تقديم السبب'}`, 'error');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showToast('حدث خطأ يرجى المحاولة مرة أخرى', 'error');
  });
}

// دالة لعرض إشعار الـ Toast
function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // إظهار الإشعار
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // إزالة الإشعار بعد فترة
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
}


// إرسال تعليق جديد من النموذج
function addNewComment() {
  const productId = document.getElementById('product-id').value;
  const commentText = document.getElementById('comment-text').value;
  
  if (commentText.trim() === '') {
    alert('الرجاء كتابة تعليق.');
    return;
  }

  sendComment(productId, commentText);
  document.getElementById('comment-text').value = '';  // مسح النص بعد إرسال التعليق
}

window.onload = function() {
  fetchData(); 
  loadComments();
};
