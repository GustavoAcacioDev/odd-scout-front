'use client'

import {
  ArrowRight,
  BarChart3,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/shadcn/button'

import LandingFeatures from './LandingFeatures'
import LandingFooter from './LandingFooter'
import LandingHeader from './LandingHeader'
import LandingHero from './LandingHero'
import LandingStats from './LandingStats'
import LandingTestimonials from './LandingTestimonials'

export default function LandingPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <LandingHeader />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingFooter />
    </div>
  )
}
