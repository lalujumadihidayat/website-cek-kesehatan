'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, Activity, Brain, ChevronLeft, ChevronRight, User, Calendar, Ruler, Weight } from 'lucide-react'

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

interface HealthAssessmentProps {
  onSubmit?: (data: HealthData) => void
}

export default function HealthAssessment({ onSubmit }: HealthAssessmentProps = {}) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [healthData, setHealthData] = useState<HealthData>({
    personalInfo: {
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: ''
    },
    lifestyle: {
      activityLevel: '',
      sleepHours: [7],
      stressLevel: '',
      smokingStatus: '',
      alcoholStatus: ''
    },
    symptoms: [],
    medicalHistory: {
      bloodPressure: '',
      diabetes: '',
      heartDisease: '',
      medications: ''
    }
  })

  const symptoms = [
    'Sakit kepala',
    'Lelah berlebihan',
    'Nyeri dada',
    'Sesak napas',
    'Pusing',
    'Mual',
    'Demam',
    'Batuk',
    'Nyeri sendi',
    'Gangguan tidur',
    'Cemas',
    'Mood swings'
  ]

  const updateHealthData = (category: keyof HealthData, field: string, value: any) => {
    setHealthData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const toggleSymptom = (symptom: string) => {
    setHealthData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    if (onSubmit) {
      onSubmit(healthData)
    } else {
      // Fallback behavior if no onSubmit provided
      console.log('Health data submitted:', healthData)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    
    setIsSubmitting(false)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Slebewwwww Assessment</h1>
          <p className="text-gray-600">Lengkapi data kesehatan Anda untuk mendapatkan analisis menyeluruh</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-semibold">Informasi Personal</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      value={healthData.personalInfo.name}
                      onChange={(e) => updateHealthData('personalInfo', 'name', e.target.value)}
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Usia</Label>
                    <Input
                      id="age"
                      type="number"
                      value={healthData.personalInfo.age}
                      onChange={(e) => updateHealthData('personalInfo', 'age', e.target.value)}
                      placeholder="Masukkan usia Anda"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Jenis Kelamin</Label>
                    <RadioGroup
                      value={healthData.personalInfo.gender}
                      onValueChange={(value) => updateHealthData('personalInfo', 'gender', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Perempuan</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Tinggi Badan (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={healthData.personalInfo.height}
                      onChange={(e) => updateHealthData('personalInfo', 'height', e.target.value)}
                      placeholder="Contoh: 170"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Berat Badan (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={healthData.personalInfo.weight}
                      onChange={(e) => updateHealthData('personalInfo', 'weight', e.target.value)}
                      placeholder="Contoh: 65"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Lifestyle */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-semibold">Gaya Hidup</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tingkat Aktivitas Fisik</Label>
                    <Select
                      value={healthData.lifestyle.activityLevel}
                      onValueChange={(value) => updateHealthData('lifestyle', 'activityLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat aktivitas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Kurang Aktif (Jarang bergerak)</SelectItem>
                        <SelectItem value="light">Ringan (1-3 kali seminggu)</SelectItem>
                        <SelectItem value="moderate">Sedang (3-5 kali seminggu)</SelectItem>
                        <SelectItem value="active">Aktif (6-7 kali seminggu)</SelectItem>
                        <SelectItem value="very-active">Sangat Aktif (Setiap hari)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status Merokok</Label>
                    <Select
                      value={healthData.lifestyle.smokingStatus}
                      onValueChange={(value) => updateHealthData('lifestyle', 'smokingStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status merokok" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Tidak pernah merokok</SelectItem>
                        <SelectItem value="former">Berhenti merokok</SelectItem>
                        <SelectItem value="occasional">Kadang-kadang</SelectItem>
                        <SelectItem value="regular">Perokok rutin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status Alkohol</Label>
                    <Select
                      value={healthData.lifestyle.alcoholStatus}
                      onValueChange={(value) => updateHealthData('lifestyle', 'alcoholStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status alkohol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Tidak pernah</SelectItem>
                        <SelectItem value="occasional">Kadang-kadang</SelectItem>
                        <SelectItem value="moderate">Sedang (1-2 kali seminggu)</SelectItem>
                        <SelectItem value="regular">Rutin (3+ kali seminggu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tingkat Stres</Label>
                    <Select
                      value={healthData.lifestyle.stressLevel}
                      onValueChange={(value) => updateHealthData('lifestyle', 'stressLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat stres" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Rendah</SelectItem>
                        <SelectItem value="moderate">Sedang</SelectItem>
                        <SelectItem value="high">Tinggi</SelectItem>
                        <SelectItem value="very-high">Sangat Tinggi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Jam Tidur per Malam: {healthData.lifestyle.sleepHours[0]} jam</Label>
                    <Slider
                      value={healthData.lifestyle.sleepHours}
                      onValueChange={(value) => updateHealthData('lifestyle', 'sleepHours', value)}
                      max={12}
                      min={4}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>4 jam</span>
                      <span>12 jam</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Symptoms */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-semibold">Gejala yang Dialami</h2>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  Pilih semua gejala yang Anda alami dalam 2 minggu terakhir:
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        healthData.symptoms.includes(symptom)
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={healthData.symptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                        />
                        <label className="text-sm font-medium cursor-pointer">
                          {symptom}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                {healthData.symptoms.length > 0 && (
                  <div className="mt-6">
                    <Label>Gejala yang dipilih:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {healthData.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="bg-emerald-100 text-emerald-800">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Medical History */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-semibold">Riwayat Medis</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tekanan Darah</Label>
                    <Select
                      value={healthData.medicalHistory.bloodPressure}
                      onValueChange={(value) => updateHealthData('medicalHistory', 'bloodPressure', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status tekanan darah" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (120/80 mmHg)</SelectItem>
                        <SelectItem value="prehypertension">Pra-hipertensi (120-139/80-89)</SelectItem>
                        <SelectItem value="stage1">Hipertensi Stage 1 (140-159/90-99)</SelectItem>
                        <SelectItem value="stage2">Hipertensi Stage 2 (160+/100+)</SelectItem>
                        <SelectItem value="unknown">Tidak tahu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Riwayat Diabetes</Label>
                    <Select
                      value={healthData.medicalHistory.diabetes}
                      onValueChange={(value) => updateHealthData('medicalHistory', 'diabetes', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status diabetes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Tidak ada</SelectItem>
                        <SelectItem value="prediabetes">Pra-diabetes</SelectItem>
                        <SelectItem value="type1">Diabetes Tipe 1</SelectItem>
                        <SelectItem value="type2">Diabetes Tipe 2</SelectItem>
                        <SelectItem value="gestational">Diabetes Gestasional</SelectItem>
                        <SelectItem value="unknown">Tidak tahu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Riwayat Penyakit Jantung</Label>
                    <Select
                      value={healthData.medicalHistory.heartDisease}
                      onValueChange={(value) => updateHealthData('medicalHistory', 'heartDisease', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status jantung" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Tidak ada</SelectItem>
                        <SelectItem value="family">Riwayat keluarga</SelectItem>
                        <SelectItem value="personal">Pernah menderita</SelectItem>
                        <SelectItem value="current">Sedang dalam pengobatan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medications">Obat-obatan yang Rutin Dikonsumsi</Label>
                    <Input
                      id="medications"
                      value={healthData.medicalHistory.medications}
                      onChange={(e) => updateHealthData('medicalHistory', 'medications', e.target.value)}
                      placeholder="Sebutkan obat yang rutin dikonsumsi (pisahkan dengan koma)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {isSubmitting ? 'Processing...' : 'Get Health Analysis'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}