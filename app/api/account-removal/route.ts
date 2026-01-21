// app/api/account-removal/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, reason } = body;

    // 1. Basic Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // 2. Prepare Telegram Message
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const message = `
🚨 <b>Account Removal Request</b>

<b>Email:</b> ${email}
<b>Reason:</b> ${reason || "No reason provided"}
<b>Date:</b> ${new Date().toISOString()}
    `;

    // 3. Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML", // Allows bolding
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram Error:", errorData);
      return NextResponse.json(
        { error: "Failed to send request to Telegram" },
        { status: 502 }
      );
    }

    // 4. Success Response
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}