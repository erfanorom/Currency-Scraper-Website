window.addEventListener('DOMContentLoaded', event => {
    function fetchData() {
        const tbody = document.getElementById('currency-body');
        const updateTime = document.getElementById('update-time');
        const errorDiv = document.getElementById('js-error');

        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-warning">در حال بارگذاری اطلاعات...</td>
            </tr>
        `;

        fetch('/api/data')
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                let rows = '';
                for (let i = 0; i < data.name.length; i++) {
                    rows += `
                        <tr>
                            <td>${i + 1}</td>
                            <td><i class="fi fi${data.mini_flag[i]}"></i> ${data.name[i]}</td>
                            <td>${data.price[i]} ریال</td>
                        </tr>
                    `;
                }

                tbody.innerHTML = rows;
                updateTime.textContent = `آخرین بروزرسانی: ${data.date}`;
                errorDiv.classList.add('d-none');
            })
            .catch(() => {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center text-danger">خطا در دریافت اطلاعات</td>
                    </tr>
                `;
                updateTime.textContent = '--:--:--';
                errorDiv.classList.remove('d-none');
            });
    }

    fetchData(); 
    setInterval(fetchData, 60000); 

     var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink', 'rounded')
        } else {
            navbarCollapsible.classList.add('navbar-shrink', 'rounded')
        }

    };
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    }
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.getElementById('text').classList.add('animate__animated', 'animate__pulse');
      document.getElementById('text3').classList.add('animate__animated', 'animate__pulse');
      document.getElementById('text1').classList.add('animate__animated', 'animate__pulse');
      document.getElementById('text2').classList.add('animate__animated', 'animate__pulse');
      document.getElementById('text3').classList.add('animate__animated', 'animate__pulse');
      document.getElementById('tools').classList.add('animate__animated', 'animate__zoomIn');
      document.getElementById('contact').classList.add('animate__animated', 'animate__zoomIn');
      document.getElementById('icons').classList.add('animate__animated', 'animate__zoomIn');
      document.getElementById('aboutUs').classList.add('animate__fadeIn', 'animate__fast');
      document.getElementById('CPS').classList.add('animate__fadeIn', 'animate__fast');
    } else {
     document.getElementById('text').classList.remove('animate__animated', 'animate__pulse');
      document.getElementById('text1').classList.remove('animate__animated', 'animate__pulse');
      document.getElementById('text2').classList.remove('animate__animated', 'animate__pulse');
      document.getElementById('text3').classList.remove('animate__animated', 'animate__pulse');
      document.getElementById('tools').classList.remove('animate__animated', 'animate__zoomIn');
      document.getElementById('contact').classList.remove('animate__animated', 'animate__zoomIn');
      document.getElementById('icons').classList.remove('animate__animated', 'animate__zoomIn');
      document.getElementById('aboutUs').classList.remove('animate__fadeIn', 'animate__faster');
      document.getElementById('CPS').classList.remove('animate__fadeIn', 'animate__faster');
    }
  });
});

observer.observe(document.getElementById('aboutUs'));

const target = document.getElementById('theTable');
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      target.classList.add('animate__fadeIn', 'animate__fast');

    }
    else{
        target.classList.remove('animate__fadeIn', 'animate__fast');
    }
  });
});

observer2.observe(document.getElementById('theTable'));



});
