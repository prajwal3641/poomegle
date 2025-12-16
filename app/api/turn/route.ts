import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ttl = 3600; // 1 hour validity
    const turnKeyId = process.env.CF_TURN_KEY_ID;
    const apiToken = process.env.CF_TURN_API_TOKEN;

    if (!turnKeyId || !apiToken) {
      console.error("Missing Cloudflare TURN credentials in environment variables");
      return NextResponse.json(
        { error: "TURN configuration missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${turnKeyId}/credentials/generate-ice-servers`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ttl }),
      }
    );

    if (!response.ok) {
      console.error("Cloudflare TURN API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch TURN credentials" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("TURN fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

