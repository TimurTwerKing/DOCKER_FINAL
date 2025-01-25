document.addEventListener("DOMContentLoaded", async function () {
  console.log("Cargando la lista de alumnos...");

  const url = "http://172.18.0.3:8000/api/alumnos";

  const local="http://localhost:8000/api/alumnos";
  const local2="http://laravel_backend:8000/api/alumnos";

  try {
    // Realizamos la solicitud GET al backend
    const response = await fetch(local, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la solicitud. Estado: ${response.status}`);
    }

    // Parseamos los datos de la respuesta
    const data = await response.json();
    console.log("Datos recibidos:", data);

    // Actualizamos el DOM
    const alumnosTableBody = document.getElementById("alumnos");
    alumnosTableBody.innerHTML = ""; // Limpiamos cualquier lista previa

    if (data.length === 0) {
      console.log("No hay alumnos disponibles.");
    } else {
      data.forEach((alumno) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${alumno.nombre} - Edad: ${alumno.edad}`;
        alumnosTableBody.appendChild(listItem);
      });
    }
  } catch (error) {
    // Manejamos cualquier error en el flujo
    console.error("Error al cargar los datos:", error.message);
    alert(
      "Hubo un error al cargar los datos. Revisa la consola para más detalles."
    );
  }
});
