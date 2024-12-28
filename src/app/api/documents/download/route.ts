import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 認証チェック
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { documentId } = await req.json();

    // ダウンロードログを記録
    const download = await prisma.download.create({
      data: {
        userId: user.id,
        documentId,
      },
    });

    return NextResponse.json(download);
  } catch (error) {
    console.error("[DOWNLOAD_LOG_ERROR]", error);
    return NextResponse.json(
      { error: "ダウンロードログの記録中にエラーが発生しました" },
      { status: 500 }
    );
  }
}