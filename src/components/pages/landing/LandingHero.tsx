'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/shadcn/button'

export default function LandingHero() {
  const { data: session } = useSession()

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <span className="text-sm font-medium text-blue-800">
                  🎯 Value Betting Made Simple
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Find{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Profitable
                </span>{' '}
                Bets with AI
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                OddScout uses advanced algorithms to compare odds from multiple bookmakers, 
                identifying value betting opportunities that give you an edge in sports betting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg" className="group">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Link href="/sign-up">
                  <Button size="lg" className="group">
                    Start Finding Value Bets
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">500+</span>
                <span className="ml-1">Active Users</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">$2.1M</span>
                <span className="ml-1">Total Profit Found</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">94%</span>
                <span className="ml-1">Satisfaction Rate</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border">
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-600">OddScout Dashboard</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Expected Value</div>
                    <div className="text-2xl font-bold text-green-700">+12.5%</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Win Rate</div>
                    <div className="text-2xl font-bold text-blue-700">68.2%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Real Madrid vs Barcelona</div>
                      <div className="text-xs text-gray-500">La Liga</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">+8.7% EV</div>
                      <div className="text-xs text-gray-500">2.15 odds</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Liverpool vs Man City</div>
                      <div className="text-xs text-gray-500">Premier League</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">+6.2% EV</div>
                      <div className="text-xs text-gray-500">3.40 odds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}