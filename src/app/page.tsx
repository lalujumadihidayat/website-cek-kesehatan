'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, Activity, Brain, Shield, Users, Award, ChevronRight, Stethoscope, Apple } from 'lucide-react'
import Link from 'next/link'
import HealthAssessment from '@/components/HealthAssessment'
import HealthResults from '@/components/HealthResults'

interface HealthData {
  personalInfo: {
    name: string
    age: string
    gender: string
    height: string
    weight: string
  }
  lifestyle: {
    activityLevel: string
    sleepHours: number[]
    stressLevel: string
    smokingStatus: string
    alcoholStatus: string
  }
  symptoms: string[]
  medicalHistory: {
    bloodPressure: string
    diabetes: string
    heartDisease: string
    medications: string
  }
}

type ViewType = 'home' | 'assessment' | 'loading' | 'results'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home')
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [scrollY, setScrollY] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    const timer = setTimeout(() => {
      setProgress(85)
    }, 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const handleStartAssessment = () => {
    setCurrentView('assessment')
  }

  const handleAssessmentComplete = async (data: HealthData) => {
    setHealthData(data)
    
    try {
      // Show loading state
      setCurrentView('loading')
      
      const response = await fetch('/api/health-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        setAnalysisResults(result.data)
        setCurrentView('results')
      } else {
        console.error('Analysis failed:', result.error)
        alert('Gagal menganalisis data kesehatan. Silakan coba lagi.')
        setCurrentView('assessment')
      }
    } catch (error) {
      console.error('Error submitting health data:', error)
      alert('Terjadi kesalahan. Silakan coba lagi.')
      setCurrentView('assessment')
    }
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setHealthData(null)
    setAnalysisResults(null)
  }

  // Render Loading
  if (currentView === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Menganalisis Data Kesehatan Anda</h2>
          <p className="text-gray-600">Mohon tunggu sebentar, sistem kami sedang bekerja...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    )
  }

  // Render Assessment Form
  if (currentView === 'assessment') {
    return (
      <div>
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-emerald-100">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Slebewwwww
              </span>
            </div>
            <Button variant="outline" onClick={handleBackToHome}>
              Kembali ke Beranda
            </Button>
          </div>
        </header>
        <HealthAssessment onSubmit={handleAssessmentComplete} />
      </div>
    )
  }

  // Render Results
  if (currentView === 'results' && analysisResults) {
    return (
      <HealthResults 
        analysisData={analysisResults} 
        onBack={handleBackToHome}
      />
    )
  }

  // Render Homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Slebewwwww
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">Fitur</Link>
            <Link href="#assessment" className="text-gray-600 hover:text-emerald-600 transition-colors">Tes Kesehatan</Link>
            <Link href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">Tentang</Link>
            <Button onClick={handleStartAssessment} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Mulai Sekarang
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                <Shield className="w-3 h-3 mr-1" />
                Platform Kesehatan Terpercaya
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Cek Kesehatan Anda
                </span>
                <br />
                <span className="text-gray-800">Secara Cerdas</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Platform kesehatan digital modern yang membantu Anda memantau dan menganalisis kondisi kesehatan secara otomatis berdasarkan data pribadi Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleStartAssessment}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg px-8 py-6"
                >
                  Mulai Tes Kesehatan
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">50K+</div>
                  <div className="text-sm text-gray-600">Pengguna Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">98%</div>
                  <div className="text-sm text-gray-600">Tingkat Akurasi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Pantau Kesehatan</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Slebewwwww Assessment</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">Live</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Heart Health</span>
                            <span className="font-semibold text-emerald-600">Excellent</span>
                          </div>
                          <Progress value={progress} className="h-2 mt-1" />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Activity Level</span>
                            <span className="font-semibold text-teal-600">Good</span>
                          </div>
                          <Progress value={70} className="h-2 mt-1" />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mental Wellness</span>
                            <span className="font-semibold text-purple-600">Balanced</span>
                          </div>
                          <Progress value={85} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleStartAssessment}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    >
                      Mulai Analisis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Fitur Unggulan</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Teknologi Kesehatan <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Modern</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manfaatkan teknologi AI terkini untuk monitoring kesehatan yang akurat dan personal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Analisis Kesehatan AI</CardTitle>
                <CardDescription>
                  Sistem cerdas yang menganalisis data kesehatan Anda dengan akurasi tinggi
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Monitoring Real-time</CardTitle>
                <CardDescription>
                  Pantau kondisi kesehatan Anda secara real-time kapan saja dan di mana saja
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Rekomendasi Personal</CardTitle>
                <CardDescription>
                  Dapatkan saran kesehatan yang dipersonalisasi berdasarkan kondisi Anda
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Nutrition Tracking</CardTitle>
                <CardDescription>
                  Pemantauan asupan gizi dan kalori untuk menjaga keseimbangan tubuh
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Konsultasi Dokter</CardTitle>
                <CardDescription>
                  Terhubung dengan tim medis profesional untuk konsultasi kesehatan
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Health Goals</CardTitle>
                <CardDescription>
                  Tetapkan dan capai tujuan kesehatan Anda dengan panduan yang terstruktur
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="assessment" className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Mulai Perjalanan Kesehatan Anda Hari Ini
              </h2>
              <p className="text-xl mb-8 text-emerald-50">
                Bergabunglah dengan ribuan orang yang telah mempercayai kesehatan mereka kepada kami
              </p>
              <Button 
                size="lg" 
                onClick={handleStartAssessment}
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg"
              >
                Mulai Tes Kesehatan Gratis
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}