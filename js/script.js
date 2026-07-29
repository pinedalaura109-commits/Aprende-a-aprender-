// =========================
// VARIABLES DEL TEST
// =========================
let preguntaActual = 0;

let puntaje = {
    Visual: 0,
    Auditivo: 0,
    Kinestesico: 0,
    Lectura: 0
};

// =========================
// PREGUNTAS (12 PREGUNTAS CLAVE)
// =========================
const preguntas = [
    {
        q: "1. Cuando empiezas a aprender algo nuevo, tú:",
        a: [
            { text: "A) Lees o miras información", style: "Lectura" },
            { text: "B) Escuchas una explicación", style: "Auditivo" },
            { text: "C) Intentas hacerlo de una vez", style: "Kinestesico" }
        ]
    },
    {
        q: "2. ¿Qué te ayuda más a entender un tema?",
        a: [
            { text: "A) Imágenes, esquemas o colores", style: "Visual" },
            { text: "B) Explicaciones paso a paso", style: "Auditivo" },
            { text: "C) Practicar con ejercicios", style: "Kinestesico" }
        ]
    },
    {
        q: "3. Cuando algo no te queda claro, tú:",
        a: [
            { text: "A) Lo vuelves a leer o ver", style: "Lectura" },
            { text: "B) Buscas otra explicación", style: "Auditivo" },
            { text: "C) Lo intentas hasta entenderlo", style: "Kinestesico" }
        ]
    },
    {
        q: "4. ¿Cómo recuerdas mejor la información?",
        a: [
            { text: "A) Viéndola (colores, mapas, gráficos)", style: "Visual" },
            { text: "B) Escuchándola o explicándola", style: "Auditivo" },
            { text: "C) Haciéndola o practicándola", style: "Kinestesico" }
        ]
    },
    {
        q: "5. Después de estudiar, normalmente:",
        a: [
            { text: "A) Repaso apuntes", style: "Lectura" },
            { text: "B) Explico lo que aprendí", style: "Auditivo" },
            { text: "C) Hago ejercicios o práctica", style: "Kinestesico" }
        ]
    },
    {
        q: "6. ¿Qué tipo de contenido prefieres?",
        a: [
            { text: "A) Videos, imágenes, resúmenes visuales", style: "Visual" },
            { text: "B) Audios, clases, explicaciones", style: "Auditivo" },
            { text: "C) Talleres, ejercicios, práctica", style: "Kinestesico" }
        ]
    },
    {
        q: "7. ¿Cuánto tiempo te concentras sin distraerte?",
        a: [
            { text: "A) Menos de 20 minutos", style: "Kinestesico" },
            { text: "B) 20 a 40 minutos", style: "Visual" },
            { text: "C) Más de 40 minutos", style: "Lectura" }
        ]
    },
    {
        q: "8. ¿Qué te distrae más al estudiar?",
        a: [
            { text: "A) El celular o redes", style: "Kinestesico" },
            { text: "B) Mis pensamientos", style: "Auditivo" },
            { text: "C) Me aburro rápido", style: "Visual" }
        ]
    },
    {
        q: "9. ¿Qué te cuesta más al estudiar?",
        a: [
            { text: "A) Entender el tema", style: "Lectura" },
            { text: "B) Recordar lo aprendido", style: "Auditivo" },
            { text: "C) Mantener la concentración", style: "Kinestesico" }
        ]
    },
    {
        q: "10. ¿Cómo prefieres estudiar?",
        a: [
            { text: "A) Solo con mis apuntes", style: "Lectura" },
            { text: "B) Con alguien o escuchando", style: "Auditivo" },
            { text: "C) Haciendo ejercicios o práctica", style: "Kinestesico" }
        ]
    },
    {
        q: "11. Cuando aprendes algo bien, es porque:",
        a: [
            { text: "A) Lo viste claro (visual)", style: "Visual" },
            { text: "B) Lo entendiste al explicarlo", style: "Auditivo" },
            { text: "C) Lo practicaste varias veces", style: "Kinestesico" }
        ]
    },
    {
        q: "12. ¿Para qué quieres aprender más rápido?",
        a: [
            { text: "A) Estudio/colegio", style: "Lectura" },
            { text: "B) Trabajo", style: "Kinestesico" },
            { text: "C) Crecimiento personal", style: "Visual" }
        ]
    }
];

// =========================
// MOSTRAR PREGUNTA
// =========================
function mostrarPregunta() {
    const contenedorP = document.getElementById("pregunta");
    const contenedorO = document.getElementById("opciones");

    if (!contenedorP || !contenedorO) return;

    if (preguntaActual < preguntas.length) {
        contenedorP.innerText = preguntas[preguntaActual].q;
        contenedorO.innerHTML = "";

        // Actualizar barra de progreso visual
        const barraProgreso = document.getElementById("progreso-test");
        if (barraProgreso) {
            const porcentaje = ((preguntaActual) / preguntas.length) * 100;
            barraProgreso.style.width = porcentaje + "%";
        }

        preguntas[preguntaActual].a.forEach(opcion => {
            const btn = document.createElement("button");
            btn.innerText = opcion.text;

            btn.onclick = () => {
                puntaje[opcion.style]++;
                preguntaActual++;
                mostrarPregunta();
            };

            contenedorO.appendChild(btn);
        });

    } else {
        finalizarTest();
    }
}

// =========================
// RESULTADO (PERFIL MIXTO)
// =========================
function finalizarTest() {
    const totalPuntos = Object.values(puntaje).reduce((a, b) => a + b, 0);
    
    // Si por alguna razón el total es 0, evitamos división por cero
    const divisor = totalPuntos > 0 ? totalPuntos : 1;

    // Calcular porcentajes reales para cada estilo
    let porcentajes = {
        Visual: Math.round((puntaje.Visual / divisor) * 100),
        Auditivo: Math.round((puntaje.Auditivo / divisor) * 100),
        Kinestesico: Math.round((puntaje.Kinestesico / divisor) * 100),
        Lectura: Math.round((puntaje.Lectura / divisor) * 100)
    };

    // Guardar tanto los puntajes completos como los porcentajes calculados
    localStorage.setItem("puntajeCompleto", JSON.stringify(puntaje));
    localStorage.setItem("porcentajesPerfil", JSON.stringify(porcentajes));

    alert("¡Test completado! Generando tu perfil personalizado...");
    window.location.href = "progreso.html";
}
// =========================
// LOGIN / REGISTRO CON VALIDACIONES (PASO 2)
// =========================
async function registrarUsuario(nombre, email, password) {
    if (!nombre || !email || !password) {
        alert("Por favor, completa todos los campos del registro.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, password })
        });

        const resultado = await respuesta.json();

        if (resultado.exito) {
            alert("¡Registro exitoso! Bienvenido/a, " + nombre);
            window.location.href = "login.html";
        } else {
            alert(resultado.mensaje || "Error al registrar el usuario.");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor backend en Node.js.");
    }
}

async function loginUsuario(email, password) {
    if (!email || !password) {
        alert("Por favor, ingresa tu correo y tu contraseña.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Por favor, ingresa un formato de correo válido.");
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const resultado = await respuesta.json();

        if (resultado.exito) {
            localStorage.setItem("usuarioActivo", JSON.stringify(resultado.usuario));
            alert("¡Bienvenida de nuevo, " + resultado.usuario.nombre + "!");
            window.location.href = "cursos.html";
        } else {
            alert(resultado.mensaje || "Error en la autenticación.");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor backend en Node.js.");
    }
}

// =========================
// SESIÓN
// =========================
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}

// =========================
// INICIO AUTOMÁTICO
// =========================
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
});

function irATest() {
    window.location.href = "test.html";
}

function verProgreso() {
    window.location.href = "progreso.html";
}