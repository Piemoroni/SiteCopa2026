import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdFjdWLstb_82Wg4tgGR5vca47IO9e9as",
    authDomain: "copapietra.firebaseapp.com",
    projectId: "copapietra",
    storageBucket: "copapietra.firebasestorage.app",
    messagingSenderId: "690379073233",
    appId: "1:690379073233:web:b0b4b7df97fde5f1a747f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const figurinhaGrid = document.getElementById("figurinha-grid");

const inputEmail = document.getElementById("auth-email");
const inputSenha = document.getElementById("auth-senha");


const inputNome = document.getElementById("figurinha-nome");
const inputPais = document.getElementById("figurinha-pais");
const inputPosicao = document.getElementById("figurinha-posicao");
const inputCamisa = document.getElementById("figurinha-camisa");
const inputNumero = document.getElementById("figurinha-numero");
const inputImagem = document.getElementById("figurinha-imagem");


onAuthStateChanged(auth, (user) => {
    if (user) {
        authScreen.classList.add("hidden");
        dashboardScreen.classList.remove("hidden");
        document.getElementById("user-display-name").textContent = user.displayName || user.email;
        carregarFigurinhas();
    } else {
        authScreen.classList.remove("hidden");
        dashboardScreen.classList.add("hidden");
        figurinhaGrid.innerHTML = "";
    }
});

document.getElementById("btn-cadastro").addEventListener("click", async () => {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if (!email || !senha) {
        alert("Preencha e-mail e senha.");
        return;
    }
    try {
        await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );
        alert("Conta criada com sucesso!");
    }
    catch (e) { alert(e.message); }
});

document.getElementById("btn-login").addEventListener("click", async () => {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if (!email || !senha) {
        alert("Preencha e-mail e senha.");
        return;
    }
    try {
        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );
    }
    catch (e) { alert(e.message); }
});

document.getElementById("btn-google").addEventListener("click", async () => {
    try {
        await signInWithPopup(
            auth,
            googleProvider
        );
    }
    catch (e) {
        alert("Erro ao entrar com Google:\n" + e.message);
    }
});

document.getElementById("btn-logout").addEventListener("click", () => signOut(auth));

document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const nomeJogador = inputNome.value.trim();
    const pais = inputPais.value;
    const posicao = inputPosicao.value.trim();
    const camisa = inputCamisa.value.trim();
    const numeroFigurinha = inputNumero.value.trim();
    const imagem = inputImagem.value.trim();
    if (
        !nomeJogador ||
        !posicao ||
        !camisa ||
        !numeroFigurinha
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }
    try {
        await addDoc(collection(db, "figurinhas"),
            {
                nomeJogador,
                pais,
                posicao,
                camisa: Number(camisa),
                numeroFigurinha,
                imagem
            }
        );

        inputNome.value = "";
        inputPosicao.value = "";
        inputCamisa.value = "";
        inputNumero.value = "";
        inputImagem.value = "";

        alert("Figurinha cadastrada com sucesso!");
    }
    catch (e) {
        console.error(e);
        alert("Erro ao cadastrar figurinha.");
    }
});

function carregarFigurinhas() {
    const q = query(collection(db, "figurinhas"), orderBy("nomeJogador", "asc"));

    onSnapshot(q, (snapshot) => {
        figurinhaGrid.innerHTML = "";
        if (snapshot.empty) {
            figurinhaGrid.innerHTML =
                `
                <p class="loading-text">
                    Nenhuma figurinha cadastrada.
                </p>
                `;
            return;
        }
        snapshot.forEach((doc) => {
            const figurinha = doc.data();
            const imgUrl = figurinha.imagem || "https://static.vecteezy.com/ti/vetor-gratis/p1/17173007-nao-pode-carregar-ilustracao-de-conceito-de-imagem-corrompida-de-design-plano-eps10-elemento-grafico-moderno-para-pagina-inicial-interface-do-usuario-de-estado-vazio-infografico-icone-vetor.jpg";
            const card = document.createElement("div");
            card.classList.add("figurinha-card");
            card.innerHTML = `
                <img src="${imgUrl}" class="figurinha-img" alt="${figurinha.nomeJogador}">
                <div class="figurinha-info">
                    <h4>${figurinha.nomeJogador}</h4>
                    <p class="figurinha-posicao"> ${figurinha.posicao}</p>
                    <div class="figurinha-meta">
                        <span class="camisa">Nº ${figurinha.camisa}</span>
                        <span class="badge">${figurinha.numeroFigurinha}</span>
                    </div>
                    <p class="pais"> ${figurinha.pais}</p>
                </div>
            `;
            figurinhaGrid.appendChild(card);
        });
    });
}