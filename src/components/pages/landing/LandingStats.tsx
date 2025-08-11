export default function LandingStats() {
  const stats = [
    {
      value: '500+',
      label: 'Active Users',
      description: 'Professional bettors trust OddScout'
    },
    {
      value: '$2.1M',
      label: 'Total Profit',
      description: 'Value identified for our users'
    },
    {
      value: '94%',
      label: 'Win Rate',
      description: 'On identified value bets'
    },
    {
      value: '15+',
      label: 'Bookmakers',
      description: 'Monitored in real-time'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}