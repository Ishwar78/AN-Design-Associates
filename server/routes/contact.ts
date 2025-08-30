import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { ContactRequest, ContactResponse } from "@shared/api";

export const handleContact: RequestHandler = async (req, res) => {
  const payload = (req.body || {}) as ContactRequest;
  try {
    const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = String(process.env.SMTP_SECURE || (port === 465 ? "true" : "false")) === "true";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      pool: true,
      maxConnections: 5,
      auth: {
        user: process.env.SMTP_USER,
        pass,
      },
    });

    const to = process.env.SMTP_TO || process.env.SMTP_USER || "";
    const info = await transporter.sendMail({
      from: `AN Design Associates <${process.env.SMTP_USER}>`,
      to,
      subject: `New enquiry from ${payload.name || "Website"}`,
      text: `Name: ${payload.name || ""}\nEmail: ${payload.email || ""}\nPhone: ${payload.phone || ""}\n\nMessage:\n${payload.message || ""}`,
    });

    if (!info.messageId) throw new Error("Email not sent");

    const response: ContactResponse = { ok: true };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ ok: false, error: "Failed to send" } as any);
  }
};
