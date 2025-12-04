import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const healthData: any = await request.json();
  
    // 1. Cek API Key
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API Key Google Gemini belum dipasang di .env" },
        { status: 500 }
      );
    }

    // 2. Nyalakan Mesin (DENGAN JSON MODE)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    // 3. Siapkan Prompt (Sama seperti kodemu)
    const analysisPrompt = `
      Kamu adalah dokter spesialis. Analisis data kesehatan ini.
      DATA PASIEN:
      Nama: ${healthData.personalInfo?.name || 'Anonim'}
      Usia: ${healthData.personalInfo?.age || '-'} tahun
      Tinggi/Berat: ${healthData.personalInfo?.height || '-'}cm / ${healthData.personalInfo?.weight || '-'}kg
      Gaya Hidup: ${healthData.lifestyle?.activityLevel || '-'}, Tidur ${healthData.lifestyle?.sleepHours?.[0] || '-'} jam
      Medis: Tensi ${healthData.medicalHistory?.bloodPressure || '-'}, Gula ${healthData.medicalHistory?.diabetes || '-'}

      Hasilkan output JSON sesuai skema ini:
      {
        "overallScore": 85,
        "riskLevel": "low|medium|high",
        "categories": {
           "cardiovascular": {"score": 0, "status": "-", "findings": ["-"], "recommendations": ["-"]},
           "metabolic": {"score": 0, "status": "-", "findings": ["-"], "recommendations": ["-"]},
           "lifestyle": {"score": 0, "status": "-", "findings": ["-"], "recommendations": ["-"]},
           "mental": {"score": 0, "status": "-", "findings": ["-"], "recommendations": ["-"]}
        },
        "bmi": {"value": 0, "category": "-", "recommendation": "-"},
        "immediateConcerns": ["-"],
        "lifestyleRecommendations": ["-"],
        "whenToSeeDoctor": ["-"],
        "summary": "-",
        "nextSteps": ["-"]
      }
    `;

    // 4. Minta AI Menganalisis
    const result = await model.generateContent(analysisPrompt);
    const responseText = result.response.text();
    
    // Parse JSON langsung (karena sudah pakai JSON Mode, regex tidak terlalu dibutuhkan tapi boleh dibiarkan)
    const healthAnalysis = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      data: {
        ...healthAnalysis,
        analyzedAt: new Date().toISOString(),
        disclaimer: 'Analisis AI Gemini. Tetap konsultasi ke dokter asli.'
      }
    });

  } catch (error: any) {
    console.error('Gemini Error:', error); // Cek terminal VS Code untuk melihat error aslinya
    
    return NextResponse.json({
      success: false, // Ubah jadi false agar frontend tahu ini gagal
      error: error.message || "Terjadi kesalahan pada AI",
      data: null 
    }, { status: 500 });
  }
}