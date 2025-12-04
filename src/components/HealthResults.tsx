'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Activity, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react'

interface HealthResultsProps {
  analysisData: any
  onBack?: () => void
}

export default function HealthResults({ analysisData, onBack }: HealthResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-100 text-emerald-800'
      case 'good': return 'bg-emerald-100 text-emerald-800'
      case 'fair': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-emerald-100 text-emerald-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'normal': return 'text-emerald-600'
      case 'overweight': return 'text-yellow-600'
      case 'obese': return 'text-red-600'
      case 'underweight': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold">Hasil Analisis Kesehatan</h1>
              <p className="text-gray-600">Laporan kesehatan komprehensif berdasarkan data Anda</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(analysisData.overallScore)}`}>
                  {analysisData.overallScore}
                </div>
                <div className="text-gray-600 text-xl">Skor Kesehatan Keseluruhan</div>
              </div>
              <Badge className={`text-lg px-4 py-2 ${getRiskColor(analysisData.riskLevel)}`}>
                Tingkat Risiko: {analysisData.riskLevel === 'low' ? 'Rendah' : 
                              analysisData.riskLevel === 'medium' ? 'Sedang' :
                              analysisData.riskLevel === 'high' ? 'Tinggi' : 'Kritis'}
              </Badge>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                {analysisData.summary}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            {analysisData.disclaimer}
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Health Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Analisis Kategori Kesehatan</h2>
            
            {/* Cardiovascular */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-red-500" />
                    <CardTitle className="text-lg">Kardiovaskular</CardTitle>
                  </div>
                  <Badge className={getStatusColor(analysisData.categories.cardiovascular.status)}>
                    {analysisData.categories.cardiovascular.status === 'excellent' ? 'Sangat Baik' :
                     analysisData.categories.cardiovascular.status === 'good' ? 'Baik' :
                     analysisData.categories.cardiovascular.status === 'fair' ? 'Cukup' : 'Kurang'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skor</span>
                    <span className={`font-semibold ${getScoreColor(analysisData.categories.cardiovascular.score)}`}>
                      {analysisData.categories.cardiovascular.score}/100
                    </span>
                  </div>
                  <Progress value={analysisData.categories.cardiovascular.score} className="h-2" />
                  
                  {analysisData.categories.cardiovascular.findings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Temuan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisData.categories.cardiovascular.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Metabolic */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                    <CardTitle className="text-lg">Metabolik</CardTitle>
                  </div>
                  <Badge className={getStatusColor(analysisData.categories.metabolic.status)}>
                    {analysisData.categories.metabolic.status === 'excellent' ? 'Sangat Baik' :
                     analysisData.categories.metabolic.status === 'good' ? 'Baik' :
                     analysisData.categories.metabolic.status === 'fair' ? 'Cukup' : 'Kurang'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skor</span>
                    <span className={`font-semibold ${getScoreColor(analysisData.categories.metabolic.score)}`}>
                      {analysisData.categories.metabolic.score}/100
                    </span>
                  </div>
                  <Progress value={analysisData.categories.metabolic.score} className="h-2" />
                  
                  {analysisData.categories.metabolic.findings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Temuan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisData.categories.metabolic.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-emerald-500" />
                    <CardTitle className="text-lg">Gaya Hidup</CardTitle>
                  </div>
                  <Badge className={getStatusColor(analysisData.categories.lifestyle.status)}>
                    {analysisData.categories.lifestyle.status === 'excellent' ? 'Sangat Baik' :
                     analysisData.categories.lifestyle.status === 'good' ? 'Baik' :
                     analysisData.categories.lifestyle.status === 'fair' ? 'Cukup' : 'Kurang'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skor</span>
                    <span className={`font-semibold ${getScoreColor(analysisData.categories.lifestyle.score)}`}>
                      {analysisData.categories.lifestyle.score}/100
                    </span>
                  </div>
                  <Progress value={analysisData.categories.lifestyle.score} className="h-2" />
                  
                  {analysisData.categories.lifestyle.findings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Temuan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisData.categories.lifestyle.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mental */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-purple-500" />
                    <CardTitle className="text-lg">Kesehatan Mental</CardTitle>
                  </div>
                  <Badge className={getStatusColor(analysisData.categories.mental.status)}>
                    {analysisData.categories.mental.status === 'excellent' ? 'Sangat Baik' :
                     analysisData.categories.mental.status === 'good' ? 'Baik' :
                     analysisData.categories.mental.status === 'fair' ? 'Cukup' : 'Kurang'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skor</span>
                    <span className={`font-semibold ${getScoreColor(analysisData.categories.mental.score)}`}>
                      {analysisData.categories.mental.score}/100
                    </span>
                  </div>
                  <Progress value={analysisData.categories.mental.score} className="h-2" />
                  
                  {analysisData.categories.mental.findings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Temuan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisData.categories.mental.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations and BMI */}
          <div className="space-y-6">
            {/* BMI */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Indeks Massa Tubuh (BMI)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getBMICategoryColor(analysisData.bmi.category)}`}>
                    {analysisData.bmi.value}
                  </div>
                  <Badge className={`mt-2 ${getBMICategoryColor(analysisData.bmi.category)}`}>
                    {analysisData.bmi.category === 'underweight' ? 'Kurus' :
                     analysisData.bmi.category === 'normal' ? 'Normal' :
                     analysisData.bmi.category === 'overweight' ? 'Gemuk' : 'Obesitas'}
                  </Badge>
                  <p className="mt-3 text-sm text-gray-600">
                    {analysisData.bmi.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Immediate Concerns */}
            {analysisData.immediateConcerns.length > 0 && (
              <Card className="border-0 shadow-md border-red-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <CardTitle className="text-lg text-red-700">Perlu Perhatian Segera</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisData.immediateConcerns.map((concern: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* When to See Doctor */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Kapan Harus ke Dokter</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData.whenToSeeDoctor.map((condition: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lifestyle Recommendations */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Rekomendasi Gaya Hidup</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData.lifestyleRecommendations.map((recommendation: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="text-lg">Langkah Selanjutnya</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {analysisData.nextSteps.map((step: string, idx: number) => (
                    <li key={idx} className="flex space-x-3">
                      <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}