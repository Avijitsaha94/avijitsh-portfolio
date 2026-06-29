import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
  projectType: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [siteConfig.author.email],
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0c10;color:#eaf0f6;padding:24px;border-radius:12px;">
          <h2 style="color:#00d4a0;margin-bottom:16px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;color:#6b7280;width:120px;">Name</td><td style="padding:8px;font-weight:600;">${data.name}</td></tr>
            <tr><td style="padding:8px;color:#6b7280;">Email</td><td style="padding:8px;">${data.email}</td></tr>
            ${data.projectType ? `<tr><td style="padding:8px;color:#6b7280;">Project</td><td style="padding:8px;">${data.projectType}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:16px;background:#111318;border-radius:8px;border-left:3px solid #00d4a0;">
            <p style="color:#6b7280;margin:0 0 8px;">Message:</p>
            <p style="margin:0;white-space:pre-wrap;color:#eaf0f6;">${data.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
