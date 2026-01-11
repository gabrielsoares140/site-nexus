const talents = [
    {
        name: "Hayatto",
        img: "img/hayatto.jpg",
        desc: "VTuber focado em gameplay competitivo e interação intensa com o chat.",
        socials: {
            twitter: "#",
            twitch: "#",
            youtube: "#"
        }
    },
    {
        name: "Dante",
        img: "img/dante.jpg",
        desc: "Streamer de terror, lore profunda e atmosfera sombria.",
        socials: {
            twitter: "#",
            twitch: "#"
        }
    },
    {
        name: "Magin",
        img: "img/magin.jpg",
        desc: "Conteúdo casual, conversas e criatividade absurda.",
        socials: {
            twitter: "https://x.com/magin_don"
        }
    },
    {
        name: "Dam",
        img: "img/dam.jpg",
        desc: "Humor ácido, caos controlado e lives imprevisíveis.",
        socials: {
            twitch: "#"
        }
    },
    {
        name: "Rafinha",
        img: "img/rafinha.jpg",
        desc: "Energia alta, games variados e muita zoeira.",
        socials: {
            instagram: ""
        }
    },
    {
        name: "Marymoon",
        img: "img/marymoon.jpg",
        desc: "Conteúdo aconchegante, músicas e conversas noturnas.",
        socials: {
            twitter: "#",
            twitch: "#",
            youtube: "#"
        }
    }
];

function openTalent(index) {
    const modal = document.getElementById("talentModal");
    if (!modal) return; 

    const talent = talents[index];

    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalDesc = document.getElementById("modalDesc");
    const socialsDiv = document.getElementById("modalSocials");

    if (!modalImg || !modalName || !modalDesc || !socialsDiv) return;

    modalImg.src = talent.img;
    modalName.innerText = talent.name;
    modalDesc.innerText = talent.desc;

    socialsDiv.innerHTML = "";

    for (let key in talent.socials) {
        const a = document.createElement("a");
        a.href = talent.socials[key];
        a.target = "_blank";

        const img = document.createElement("img");
        img.src = `img/${key}.png`;
        img.alt = key;

        a.appendChild(img);
        socialsDiv.appendChild(a);
    }

    modal.style.display = "flex";
}

function closeTalent() {
    const modal = document.getElementById("talentModal");
    if (modal) modal.style.display = "none";
}


let carrinho = [];
let total = 0;

function addCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("total");

    if (!lista || !totalEl) return;

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerItem(${index})">❌</button>
        `;
        lista.appendChild(li);
    });

    totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

async function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/pagar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ itens: carrinho })
        });

        const dados = await resposta.json();

        const pixArea = document.getElementById("pixArea");
        if (!pixArea) return;

        pixArea.innerHTML = `
            <h3>Pague com Pix</h3>
            <img src="data:image/png;base64,${dados.qr_code_base64}" width="200">
            <p>Ou copie o código:</p>
            <textarea readonly>${dados.qr_code}</textarea>
        `;
    } catch (erro) {
        alert("Erro ao gerar pagamento Pix.");
        console.error(erro);
    }
}
