document.addEventListener('DOMContentLoaded', () => {
    // Carregar os produtos do LocalStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartContainer = document.getElementById('cart-container');

    cartData.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.className = 'produto';

        produtoElement.innerHTML = `
            <img src="${produto.src}" alt="Foto do Produto">
            <div>
                <h3>${produto.nome}</h3>
                <p>R$ <span class="valor">${produto.valor.toFixed(2)}</span></p>
                <p>Qnt. selecionada: <span class="qt_selecionada">${produto.quantidadeSelecionada}</span></p>
                <p>Total: R$ <span class="valor_total">${(produto.valor * produto.quantidadeSelecionada).toFixed(2)}</span></p>
            </div>
        `;

        cartContainer.appendChild(produtoElement);
    });
});

// Função para adicionar ao carrinho e salvar no LocalStorage
function addToCart(nome, valor) {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    const produtoExistente = cartData.find(prod => prod.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidadeSelecionada += 1;
    } else {
        const novoProduto = {
            nome: nome,
            valor: valor,
            quantidadeSelecionada: 1,
            src: document.querySelector(`button[onclick="addToCart('${nome}', ${valor})"]`).closest('.produto').querySelector('img').src
        };
        cartData.push(novoProduto);
    }

    localStorage.setItem('cart', JSON.stringify(cartData));

    console.log(`Adicionado ao carrinho: ${nome} - R$ ${valor.toFixed(2)}`);
}


/*FUNCIONALIDADE DA CESTA DE COMPRAS */
const cart = [];
    const cartContainer = document.getElementById('carrinho');
    const totalContainer = document.getElementById('total span');

    document.querySelectorAll('.produto__btn').forEach(button => {
      button.addEventListener('click', async function() {
        const productId = this.getAttribute('data-produto__comprar');
        const product = await getProductDetails(productId);
        
        cart.push(product);
        updateCartDisplay();
      });
    });

    async function getProductDetails(productId) {
      const response = await fetch('../ecomercedesafio/server/db-pr.json');
      const products = await response.json();
      return products.find(p => p.id === productId);
    }

    function updateCartDisplay() {
      cartContainer.innerHTML = '';
      let total = 0;

      cart.forEach(product => {
        const item = document.createElement('li');
        item.innerHTML = `
          <img src="${product.produto__img}" alt="Foto do Produto">
          <span class="nome-produto">${product.produto__name}</span>
          <span class="valor-produto">R$ ${product.valor}</span>
          <span class="quantidade-produto">1</span>
          <button class="btn-diminuir">-</button>
          <button class="btn-aumentar">+</button>
          <button class="btn-remover">Remover</button>
        `;
        cartContainer.appendChild(item);
        total += parseFloat(product.valor);
      });

      totalContainer.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    document.getElementById('finalizar_compra').addEventListener('click', async () => {
      await fetch('../ecomercedesafio/server/db-cesta_compras.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
      });
      // Limpar o carrinho após finalizar a compra
      cart.length = 0;
      updateCartDisplay();
    });
    
  // Botões de aumentar e diminuir
const botoesAumentar = document.querySelectorAll(".btn-aumentar");
const botoesDiminuir = document.querySelectorAll(".btn-diminuir");
botoesAumentar.forEach(botao => {
  botao.addEventListener("click", () => {
    const itemCarrinho = botao.parentElement;
    const quantidadeProduto = parseInt(itemCarrinho.querySelector(".quantidade-produto").textContent);
    itemCarrinho.querySelector(".quantidade-produto").textContent = quantidadeProduto + 1;
    atualizarTotal();
  });
});
botoesDiminuir.forEach(botao => {
  botao.addEventListener("click", () => {
    const itemCarrinho = botao.parentElement;
    const quantidadeProduto = parseInt(itemCarrinho.querySelector(".quantidade-produto").textContent);
    if (quantidadeProduto > 1) {
      itemCarrinho.querySelector(".quantidade-produto").textContent = quantidadeProduto - 1;
      atualizarTotal();
    }
  });
});

// Botão de remover
const botoesRemover = document.querySelectorAll(".btn-remover");
botoesRemover.forEach(botao => {
  botao.addEventListener("click", () => {
    const itemCarrinho = botao.parentElement;
    itemCarrinho.remove();
    atualizarTotal();
  });
});