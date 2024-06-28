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

//Função de Avaliação do produto pelo cliente - stars do produto
var stars = document.querySelectorAll('.star-icon');

stars.forEach(function(star) {
    star.addEventListener('click', function() {
        stars.forEach(function(s) {
            s.classList.remove('ativo');
        });
        this.classList.add('ativo');
    });
});


//FUNÇÃO DE CARREGAMENTO DO BD A CLASS .PRODUTOS E ENVIO AO CARRINHO DE COMPRAS DOS ITENS
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../ecomercedesafio/server/db-pr.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const produtos = await response.json();
        const container = document.querySelector('#product-container');

        if (!container) {
            throw new Error('Container de produtos não encontrado.');
        }

        produtos.forEach(produto => {
            // Adiciona a condição para filtrar produtos
            if (parseFloat(produto.star_value) >= 4.0  ) {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.id = produto.id;
                produtoDiv.dataset.produto = '';

                produtoDiv.innerHTML = `
                    <a>
                        <img class="produto__img" src="${produto.produto__img}" alt="Foto do Produto" data-produto__img>
                        <h3 class="produto__name" data-produto__name>${produto.produto__name}</h3>
                    </a>
                    <ul class="avaliacao" data-produto__avaliacao_user>
                        <li class="star-icon ativo" data-avaliacao="1"></li>
                        <li class="star-icon" data-avaliacao="2"></li>
                        <li class="star-icon" data-avaliacao="3"></li>
                        <li class="star-icon" data-avaliacao="4"></li>
                        <li class="star-icon" data-avaliacao="5"></li>
                        <span class="star-value" data-star-value>${produto.star_value}</span>
                    </ul>
                    <p class="produto__value" data-produto__valor>R$ <span class="valor">${produto.valor}</span></p>
                    <p class="produto__cdp" data-produto__preferencia_user>Preferência: <span class="preferencia">${produto.preferencia}</span></p>
                    <p class="produto__stts" data-produto__status>Status: <span class="data-produto__status__indispo-dispo">${produto.data_produto__status__indispo_dispo}</span></p>
                    <p class="produto__desc" data-produto__desc>Descrição: <span class="descricao_text">${produto.descricao_text}</span></p>
                    <button onclick="addToCart('${produto.id}', '${produto.produto__name}')" class="produto__btn" data-produto__comprar>Add ao Carrinho</button>
                `;

                container.appendChild(produtoDiv);
                const separator = document.createElement('div');
                separator.classList.add('separator');
                container.appendChild(separator);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
});

//Terminar função do carrinho e corrigir erros
function addToCart(id, name) {
    console.log(`Produto adicionado ao carrinho: ${name} (ID: ${id})`);
};



//CORREÇÃO NO class="produto" para excluir os card que não tiverem preenchimento automático, atribuindo um ID excludente
const elementoRemover = document.getElementById('001EXEMPLO');
if (elementoRemover) {
  elementoRemover.remove();
}

//FUNÇÃO DA CESTA DE COMPRAS
async function fetchProductData(productId) {
    try {
        const response = await fetch('../ecomercedesafio/server/db-pr.json');
        const products = await response.json();
        return products.find(product => product.id === productId);
    } catch (error) {
        console.error('Erro ao buscar dados do produto:', error);
    }
}

// Função para adicionar o produto ao carrinho
async function addToCart(productId) {
    try {
        const product = await fetchProductData(productId);
        if (!product) {
            console.error('Produto não encontrado!');
            return;
        }

        const cartItem = {
            id: product.id,
            produto__img: product.produto__img,
            produto__name: product.produto__name,
            valor: product.valor
        };

        // Fetch para obter o estado atual do carrinho
        const cartResponse = await fetch('../server/db-cesta_compras.json');
        let cart = await cartResponse.json();
        cart.push(cartItem);

        // Enviar os dados atualizados para o arquivo JSON do carrinho de compras
        const updateResponse = await fetch('../server/db-cesta_compras.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });

        if (updateResponse.ok) {
            console.log('Produto adicionado ao carrinho com sucesso!');
        } else {
            console.error('Erro ao adicionar produto ao carrinho:', updateResponse.statusText);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    }
}



async function addToCart(productId) {
    try {
        const product = await fetchProductData(productId);
        if (!product) {
            console.error('Produto não encontrado!');
            return;
        }

        const cartItem = {
            id: product.id,
            produto__img: product.produto__img,
            produto__name: product.produto__name,
            valor: product.valor
        };

        const response = await fetch('http://localhost:5500/cesta_compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });

        if (response.ok) {
            console.log('Produto adicionado ao carrinho com sucesso!');
        } else {
            console.error('Erro ao adicionar produto ao carrinho:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    }
}