import { NextResponse } from "next/server";
import { Resend } from "resend";

const destination = "admin@kinemor.com";
const from = process.env.RESEND_FROM_EMAIL || "Kinemor <hello@send.kinemor.com>";
let resendClient: Resend | undefined;

function getResend() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

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
      { error: "Contact delivery is being configured. Please email admin@kinemor.com directly." },
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
  const inquiryType = asText(payload.inquiryType, 80);
  const message = asText(payload.message, 4_000);
  const website = asText(payload.website, 200);

  if (website) {
    return NextResponse.json({ message: "Thanks. Your message is on its way." });
  }

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please add your name, a valid email, and a message." }, { status: 400 });
  }

  const resend = getResend();
  const escapedName = escapeHtml(name);
  const normalizedInquiryType = inquiryType || "General inquiry";
  const escapedInquiryType = escapeHtml(normalizedInquiryType);
  const escapedOrganization = escapeHtml(organization || "Not provided");
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const [leadResult, acknowledgementResult] = await Promise.all([
    resend.emails.send({
      from,
      to: destination,
      replyTo: email,
      subject: `[Kinemor] ${name}${organization ? ` - ${organization}` : ""}`,
      text: `Inquiry type: ${normalizedInquiryType}\nName: ${name}\nEmail: ${email}\nOrganization: ${organization || "Not provided"}\n\n${message}`,
      html: `<p><strong>Inquiry type:</strong> ${escapedInquiryType}</p><p><strong>Name:</strong> ${escapedName}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Organization:</strong> ${escapedOrganization}</p><hr><p>${escapedMessage}</p>`,
    }),
    resend.emails.send({
      from,
      to: email,
      replyTo: destination,
      subject: "We received your Kinemor inquiry",
      text: `Hi ${name},\n\nThanks for getting in touch with Kinemor. We received your ${normalizedInquiryType.toLowerCase()} and will review it shortly.\n\nIf you need to add context, reply directly to this email.\n\nKinemor\nInfrastructure for physical AI`,
      html: `<div style="margin:0;background:#eeeee8;padding:32px 16px;color:#101413;font-family:Arial,sans-serif"><div style="max-width:560px;margin:0 auto;border:1px solid #aab3ac;background:#f8f8f3"><div style="padding:18px 24px;border-bottom:1px solid #cbd1ca;font-size:12px;font-weight:700;letter-spacing:1.4px">KINEMOR / INQUIRY RECEIVED</div><div style="padding:38px 24px"><h1 style="margin:0 0 18px;font-size:28px;line-height:1.1;font-weight:600">Thanks, ${escapedName}.</h1><p style="margin:0 0 16px;font-size:16px;line-height:1.6">We received your ${escapedInquiryType.toLowerCase()} and will review it shortly.</p><p style="margin:0;font-size:16px;line-height:1.6">If you need to add context, reply directly to this email.</p></div><div style="padding:18px 24px;border-top:1px solid #cbd1ca;color:#4b5750;font-size:13px;line-height:1.5">Kinemor<br>Infrastructure for physical AI</div></div></div>`,
    }),
  ]);

  if (leadResult.error || acknowledgementResult.error) {
    console.error("Kinemor contact email delivery failed", {
      acknowledgement: acknowledgementResult.error,
      lead: leadResult.error,
    });
    return NextResponse.json({ error: "We could not send your note. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ message: "Inquiry received. A confirmation is on its way to your inbox." });
}
