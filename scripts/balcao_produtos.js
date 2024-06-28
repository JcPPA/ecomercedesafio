/*MENU HAMBURGER DO <HEADER> */
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.querySelector(".menu");

    menuIcon.addEventListener("click", function() {
        menu.classList.toggle("show");
    });
});

/*<FOOTER> LINKS E RESPONSIVIDADE */
document.addEventListener('DOMContentLoaded', () => {
    const footerColumns = document.querySelectorAll('.footer-column');

    
    footerColumns.forEach(column => {
        const h4 = column.querySelector('h4');
        const ul = column.querySelector('ul');
        const separator = column.querySelector('.separator');

        if (h4 && ul) {
            h4.addEventListener('click', () => {
                
                if (window.matchMedia('(max-width: 768px)').matches) {
                    
                    footerColumns.forEach(otherColumn => {
                        if (otherColumn !== column) {
                            const otherUl = otherColumn.querySelector('ul');
                            otherUl.style.display = 'none';
                        }
                    });

                    
                    ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
});

/*MAIN*/




