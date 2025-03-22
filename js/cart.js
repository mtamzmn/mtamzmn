// دالة لعرض محتويات السلة
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartContainer = document.getElementById('empty-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const totalPriceContainer = document.getElementById('total-price');
    
    cartItemsContainer.innerHTML = ''; // مسح السلة القديمة
    let totalPrice = 0;

    if (cart.length === 0) {
      emptyCartContainer.style.display = 'block';
      checkoutBtn.style.display = 'none';
      clearCartBtn.style.display = 'none';
      totalPriceContainer.innerText = "الإجمالي: 0 ريال";
    } else {
      emptyCartContainer.style.display = 'none';
      checkoutBtn.style.display = 'block';
      clearCartBtn.style.display = 'block';

      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
          <div class="d-flex">
            <img src="${item.productImage}" alt="${item.productTitle}">
            <div class="ms-3">
              <div class="cart-item-title">${item.productTitle}</div>
              <div class="cart-item-details">الكمية: ${item.quantity} × ${item.price} ريال</div>
              <div class="cart-item-details">الإجمالي: ${item.totalPrice} ريال</div>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        totalPrice += item.totalPrice;
      });

      totalPriceContainer.innerText = `الإجمالي: ${totalPrice.toFixed(2)} ريال`;
    }
  }

  // دالة للانتقال إلى محادثة WhatsApp مع تفاصيل الطلب
  function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderDetails = 'طلباتي:\n';

    cart.forEach(item => {
      orderDetails += `المنتج: ${item.productTitle}\nالكمية: ${item.quantity}\nالإجمالي: ${item.totalPrice} ريال\n\n`;
    });

    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    orderDetails += `الإجمالي الكلي: ${totalPrice.toFixed(2)} ريال\n`;

    const whatsappUrl = `https://wa.me/+966507079844?text=${encodeURIComponent(orderDetails)}`; // قم بتعديل الرقم إلى رقم واتسابك
    window.open(whatsappUrl, '_blank');
  }

  // دالة لتفريغ السلة (حذف كل المنتجات)
  function clearCart() {
    localStorage.removeItem('cart');
    displayCart(); // إعادة عرض السلة بعد التفريغ
  }

  // استدعاء الدالة لعرض السلة عند تحميل الصفحة
  window.onload = displayCart;