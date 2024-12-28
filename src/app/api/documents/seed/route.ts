import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stat } from "fs/promises";
import { join } from "path";

export async function POST() {
  try {
    // uploadsフォルダ内のPDFファイルの情報を取得
    const pdfPath = join(process.cwd(), "public", "uploads", "test.pdf"); // あなたのPDFファイル名に変更してください
    const fileStats = await stat(pdfPath);

    // データベースにドキュメント情報を登録
    const document = await prisma.document.create({
      data: {
        title: "テスト資料", // 適切なタイトルに変更してください
        description: "テスト用のPDF資料です",
        filename: "test.pdf", // あなたのPDFファイル名に変更してください
        filepath: "/uploads/test.pdf", // あなたのPDFファイル名に変更してください
        filesize: fileStats.size,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("[SEED_ERROR]", error);
    return NextResponse.json(
      { error: "シードデータの作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}