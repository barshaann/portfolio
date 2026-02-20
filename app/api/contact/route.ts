import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"] as const;

let cachedTransporter: nodemailer.Transporter | null = null;

function hasMissingEnv() {
  return requiredEnv.some((key) => !process.env[key]);
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  // Reuse pooled SMTP connection across requests to reduce send latency.
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
  });

  return cachedTransporter;
}

export async function POST(request: Request) {
  try {
    if (hasMissingEnv()) {
      return NextResponse.json(
        { message: "Email service is not configured yet. Please set SMTP environment variables." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }

    const transporter = getTransporter();

    const to = process.env.CONTACT_TO_EMAIL as string;
    const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `Portfolio Contact <${from}>`,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 8px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json({ message: "Failed to send message. Please try again." }, { status: 500 });
  }
}
