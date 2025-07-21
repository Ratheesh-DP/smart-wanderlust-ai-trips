import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Sparkles, 
  MessageSquare, 
  Zap, 
  Target,
  ArrowRight,
  Bot,
  Calendar,
  MapPin
} from "lucide-react"

export const AIPlanner = () => {
  return (
    <section id="ai-planner" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Planning
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Personal
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Travel Assistant
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Experience the future of travel planning with our advanced AI that learns 
              your preferences and creates personalized itineraries in seconds.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Target,
                  title: "Personalized Recommendations",
                  description: "AI learns your travel style and preferences"
                },
                {
                  icon: Zap,
                  title: "Instant Itineraries",
                  description: "Generate complete travel plans in seconds"
                },
                {
                  icon: Bot,
                  title: "24/7 Travel Assistant",
                  description: "Get help and answers anytime, anywhere"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="travel" size="lg">
              Try AI Planner
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Right Content - AI Chat Interface */}
          <div className="relative">
            {/* Chat Interface */}
            <Card className="travel-card p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Travella AI</h4>
                    <p className="text-sm text-muted-foreground">Your travel planning assistant</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6">
                  {/* AI Message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Hi! I'm here to help you plan your perfect trip. Where would you like to go?</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-primary-foreground">I want to visit Japan for 10 days in spring</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm mb-2">Perfect! Spring is cherry blossom season. I've created a 10-day itinerary including:</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>Tokyo • Kyoto • Osaka</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Best viewing spots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Ask me anything about your trip..." 
                    className="flex-1"
                  />
                  <Button size="icon" variant="default">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 glass p-3 rounded-xl animate-float">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute -bottom-4 -left-4 glass p-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}