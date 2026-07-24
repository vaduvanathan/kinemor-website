import { NextResponse } from "next/server";
import { Resend } from "resend";

const destination = "praveenvaduvanathan@gmail.com";
const from = process.env.RESEND_FROM_EMAIL || "Kinemor <hello@kinemor.com>";

function asText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
  })[character] || character);
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Contact delivery is being configured. Please email praveenvaduvanathan@gmail.com directly." },
      { status: 503 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please complete the form and try again." }, { status: 400 });
  }

  const name = asText(payload.name, 120);
  const email = asText(payload.email, 254);
  const organization = asText(payload.organization, 160);
  const message = asText(payload.message, 4_000);
  const website = asText(payload.website, 200);

  if (website) {
    return NextResponse.json({ message: "Thanks. Your message is on its way." });
  }

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please add your name, a valid email, and a message." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: destination,
    replyTo: email,
    subject: `[Kinemor] ${name}${organization ? ` - ${organization}` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "Not provided"}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Organization:</strong> ${escapeHtml(organization || "Not provided")}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    return NextResponse.json({ error: "We could not send your note. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ message: "Thanks. Your message is on its way." });
}
