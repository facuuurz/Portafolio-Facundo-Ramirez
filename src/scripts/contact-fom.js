// src/scripts/contact-form.js
(function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit");

    // Utiliza el action del formulario (tu endpoint Formspree real)
    const ENDPOINT = form.action;

    // Validación simple de email
        const isValidEmail = (email) => {
    // Regex simple y suficiente para validación básica
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

  // Helpers de UI
    const setStatus = (msg, type = "neutral") => {
    // type: 'ok' | 'error' | 'neutral'
    const base = "mt-2";
    const styles = {
        ok: "text-green-400",
        error: "text-red-400",
        neutral: "text-gray-300",
    };
        statusEl.className = `${base} ${styles[type]}`;
        statusEl.textContent = msg || "";
    };

    const setLoading = (loading) => {
        if (!submitBtn) return;
        submitBtn.disabled = loading;
        submitBtn.style.opacity = loading ? "0.7" : "1";
        submitBtn.style.cursor = loading ? "not-allowed" : "pointer";
        submitBtn.textContent = loading ? "Enviando..." : "Enviar";
    };

  // Agrega metadatos útiles al envío
    const appendMeta = (fd) => {
        fd.append("_format", "json"); // Para forzar JSON en Formspree
        fd.append("page_url", window.location.href);
        fd.append("sent_at", new Date().toISOString());
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        setStatus("");
        setLoading(true);

    try {
      // Anti-spam (honeypot): si el campo 'company' viene con algo, no enviamos
    const hp = form.querySelector('input[name="company"]');
    if (hp && hp.value.trim() !== "") {
        setStatus("Ups, algo salió mal. Por favor, reintentá.", "error");
        setLoading(false);
        return;
    }

      // Validaciones básicas
    const name = form.querySelector("#name")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#message")?.value.trim();

    if (!name || !email || !message) {
        setStatus("Completá todos los campos obligatorios.", "error");
        setLoading(false);
        return;
    }

    if (!isValidEmail(email)) {
        setStatus("Ingresá un correo electrónico válido.", "error");
        setLoading(false);
        return;
    }

      // Armar payload
    const formData = new FormData(form);
    appendMeta(formData);

      // Enviar a Formspree
    const res = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
        Accept: "application/json",
        },
    });

        if (res.ok) {
            setStatus("¡Gracias! Tu mensaje fue enviado correctamente. Te responderé a la brevedad.", "ok");
            form.reset();
        } else {
        // Intentar leer errores de Formspree
            let msg = "No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.";
            try {
                const data = await res.json();
                if (data && data.errors && data.errors.length) {
                msg = data.errors.map((e) => e.message).join(" ");
            }
        } catch (_) {}
            setStatus(msg, "error");
    }
    } catch (err) {
        setStatus("Error de red. Verificá tu conexión e intentá de nuevo.", "error");
    } finally {
        setLoading(false);
    }
    });
})();
