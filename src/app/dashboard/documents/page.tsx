'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  description: string | null;
  filename: string;
  filepath: string;
  filesize: number;
  createdAt: string;
}

export default function DocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        if (!response.ok) {
          throw new Error('資料の取得に失敗しました');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : '資料の取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (documentId: string, filepath: string) => {
    try {
      // ダウンロードログを記録
      await fetch('/api/documents/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId }),
      });

      // ファイルをダウンロード
      window.open(filepath, '_blank');
    } catch (error) {
      console.error('ダウンロード中にエラーが発生しました:', error);
    }
  };

  if (!session) {
    return (
      <div className="p-8 text-center">
        <p>この機能を使用するにはログインが必要です。</p>
        <Link href="/login" className="text-blue-600 hover:underline">
          ログインする
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">資料一覧</h1>

      <div className="grid gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
            {doc.description && (
              <p className="text-gray-600 mb-4">{doc.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                サイズ: {(doc.filesize / 1024 / 1024).toFixed(2)} MB
              </div>
              <button
                onClick={() => handleDownload(doc.id, doc.filepath)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                ダウンロード
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}