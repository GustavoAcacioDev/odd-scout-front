import { BarChart3, Shield, Target, TrendingUp, Zap, Clock } from 'lucide-react'

export default function LandingFeatures() {
  const features = [
    {
      icon: Target,
      title: 'Value Bet Detection',
      description: 'AI-powered algorithms identify profitable betting opportunities by comparing odds across multiple bookmakers.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your performance with detailed statistics, ROI analysis, and comprehensive betting history.'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Get instant alerts when high-value betting opportunities arise, never miss a profitable bet again.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Built-in Kelly Criterion calculator and bankroll management tools to protect your investment.'
    },
    {
      icon: TrendingUp,
      title: 'Expected Value Focus',
      description: 'Every bet recommendation includes EV calculation and confidence score for informed decision making.'
    },
    {
      icon: Clock,
      title: '24/7 Scanning',
      description: 'Our system continuously monitors odds changes and market movements across all supported bookmakers.'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Win
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            OddScout provides professional-grade tools for value betting, helping you identify 
            and capitalize on profitable opportunities in the sports betting market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}