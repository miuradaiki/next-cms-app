import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { requireAuth } from "@/lib/auth";

// アップロード用のAPIエンドポイント
export async function POST(req: Request) {
  try {
    // 認証チェック
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "ファイルが必要です" }, { status: 400 });
    }

    // ファイル名の生成（タイムスタンプを使用）
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(process.cwd(), "public", "uploads", filename);

    // ファイルの保存
    const buffer = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));

    // データベースに登録
    const document = await prisma.document.create({
      data: {
        title,
        description,
        filename: file.name,
        filepath: `/uploads/${filename}`,
        filesize: buffer.byteLength,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "ファイルのアップロード中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// 資料一覧取得用のAPIエンドポイント
export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("[GET_DOCUMENTS_ERROR]", error);
    return NextResponse.json(
      { error: "資料の取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}