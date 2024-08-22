import { NextResponse } from 'next/server';
import axios from 'axios';

// Route POST pour créer un article
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await axios.post('http://localhost:4000/articles', body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'article:", error.response?.data || error.message);
    return NextResponse.json({ error: error.response?.data || 'Erreur serveur' }, { status: error.response?.status || 500 });
  }
}
