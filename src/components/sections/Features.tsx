import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Shield, 
  Clock,
  Smartphone,
  Globe,
  TrendingUp
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Travel Assistant",
    description: "Get personalized recommendations based on your preferences, budget, and travel style.",
    color: "text-accent"
  },
  {
    icon: MapPin,
    title: "Real-time Locations",
    description: "Access up-to-date information about destinations, attractions, and local events.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Smart Planning",
    description: "Automatically generate optimized itineraries that maximize your time and experiences.",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Group Coordination",
    description: "Plan trips with friends and family with shared itineraries and collaborative tools.",
    color: "text-success"
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive protection for your trips with 24/7 support and coverage.",
    color: "text-warning"
  },
  {
    icon: Clock,
    title: "Time Optimization",
    description: "Make the most of your time with efficient route planning and scheduling.",
    color: "text-primary"
  },
  {
    icon: Smartphone,
    title: "Mobile Experience",
    description: "Access your travel plans offline with our feature-rich mobile application.",
    color: "text-accent"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Explore destinations worldwide with local insights and cultural information.",
    color: "text-secondary"
  },
  {
    icon: TrendingUp,
    title: "Price Tracking",
    description: "Get the best deals with price alerts and predictive booking recommendations.",
    color: "text-success"
  }
]

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose Travella
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Travel Smarter with
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Technology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of travel planning with our cutting-edge AI technology 
            that understands your preferences and creates perfect itineraries.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="travel-card p-6 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-background to-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "100K+", label: "Happy Travelers" },
            { number: "250+", label: "Destinations" },
            { number: "50K+", label: "Trip Plans" },
            { number: "4.9", label: "Average Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}