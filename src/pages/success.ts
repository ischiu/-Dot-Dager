import type { APIRoute } from "astro";
import { FROS_KEY } from 'astro:env/client';
import { getSecret } from 'astro:env/server';

const S_ = FROS_KEY + getSecret("MAID_KEY");
const SECRET_KEY = "" + getSecret("SECRET_KEY");

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const token = data["cf-turnstile-response"];
    const ip =request.headers.get("CF-Connecting-IP") ||request.headers.get("cf-connecting-ip") ||request.headers.get("x-forwarded-for") ||"";
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Token no proporcionado" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const verifyFormData = new FormData();
    verifyFormData.append("secret", SECRET_KEY);
    verifyFormData.append("response", token);
    verifyFormData.append("remoteip", ip);

    const verifyResult = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        body: verifyFormData,
        method: "POST",
      }
    );
    const verifyOutcome = await verifyResult.json();

    if (!verifyOutcome.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Verificación fallida: token inválido o expirado",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    await fetch(S_, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Formulario enviado con éxito" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
