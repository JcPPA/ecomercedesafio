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

//Movimento Carrossel <ARTICLE>
function direcao(e) {
    var direcao = document.getElementById("product-container");
    if(e == 1){
        // movimento à esquerda
        direcao.scrollLeft -= 200;
    } else if(e == 2){
        // movimento à direita
        direcao.scrollLeft += 200;
    }
}

/*ESTRUTURA FUNCIONAL DE LOGIN NO <MAIN> */
/*Funcionalidade do Login e do Cadastramento de Usuário*/
var formSignin = document.querySelector('#signin')
var formSignup = document.querySelector('#signup')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px"
    formSignup.style.left = "450px"
    btnColor.style.left = "0px"
})

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px"
    formSignup.style.left = "25px"
    btnColor.style.left = "100px"
})


/*Funcionalidade do Formulário de cadastro do cliente */
document.getElementById('btn-continue').addEventListener('click', function (event) {
    event.preventDefault(); // Previne o envio do formulário principal
    document.getElementById('formulário-de-cadastro-do-cliente').style.display = 'block';
});



let currentForm = 0;
        const forms = document.getElementsByClassName('form-container');

        function nextForm() {
            if (currentForm < forms.length - 1) {
                forms[currentForm].classList.remove('active');
                currentForm++;
                forms[currentForm].classList.add('active');
            }
        }

        function previousForm() {
            if (currentForm > 0) {
                forms[currentForm].classList.remove('active');
                currentForm--;
                forms[currentForm].classList.add('active');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            forms[0].classList.add('active');
        });

        function toggleDocumentFields() {
            const documentType = document.getElementById('documentType').value;
            const cpfSection = document.getElementById('cpf_section');
            const cnpjSection = document.getElementById('cnpj_section');
            if (documentType === 'cpf') {
                cpfSection.style.display = 'block';
                cnpjSection.style.display = 'none';
            } else {
                cpfSection.style.display = 'none';
                cnpjSection.style.display = 'block';
            }
        }

        document.getElementById('upload_image').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    document.getElementById('img_circle').innerHTML = '';
                    document.getElementById('img_circle').appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        function savePhoto() {
            alert('Foto salva com sucesso!');
        }

        function pesquisacep(cep) {
            // Lógica para buscar informações do endereço pelo CEP
        }