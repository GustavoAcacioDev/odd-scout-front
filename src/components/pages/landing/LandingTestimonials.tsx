import { Star } from 'lucide-react'

export default function LandingTestimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Professional Bettor',
      content: 'OddScout has completely transformed my betting strategy. The value detection is incredibly accurate, and I\'ve increased my ROI by 40% in just 3 months.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Sports Analyst',
      content: 'As someone who analyzes sports professionally, I can say OddScout\'s algorithms are top-notch. The real-time monitoring saves me hours of manual work.',
      avatar: '👨‍💻',
      role: 'Sports Analyst',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'Investment Manager',
      content: 'The risk management tools and Kelly Criterion calculator make this platform perfect for treating betting as an investment. Highly recommended!',
      avatar: '👨‍💼',
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Winning Bettors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our users say about their experience with OddScout and how 
            it has helped them achieve consistent profits in sports betting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="text-2xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}