// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlvvtg68E7mEh71bwqX0YqWL31LTA4Q4A",
  authDomain: "i-s-a-foro-3bf2d.firebaseapp.com",
  projectId: "i-s-a-foro-3bf2d",
  storageBucket: "i-s-a-foro-3bf2d.firebasestorage.app",
  messagingSenderId: "413622307291",
  appId: "1:413622307291:web:c6654f75ff038d0ca8bffe",
  measurementId: "G-0HZ9B1SNWD"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// Referencia a la colección de mensajes
const mensajesRef = collection(db, "mensajes");

// Captura elementos del DOM
const form = document.getElementById("formulario-mensaje");
const input = document.getElementById("mensaje");
const contenedor = document.getElementById("mensajes");

// Enviar mensaje a Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    await addDoc(mensajesRef, {
      texto: input.value,
      fecha: new Date()
    });
    input.value = "";
  }
});

// Mostrar mensajes en tiempo real
const q = query(mensajesRef, orderBy("fecha"));
onSnapshot(q, (snapshot) => {
  contenedor.innerHTML = "";
  snapshot.forEach((doc) => {
    let p = document.createElement("p");
    p.textContent = doc.data().texto;
    contenedor.appendChild(p);
  });
});

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Iniciar sesión
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario logueado:", user.displayName);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});

// Cerrar sesión
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// Detectar si hay usuario logueado
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = `Bienvenido, ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    userInfo.textContent = "No has iniciado sesión";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});


