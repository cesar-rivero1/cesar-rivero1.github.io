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
