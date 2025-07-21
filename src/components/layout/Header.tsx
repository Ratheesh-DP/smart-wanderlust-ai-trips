import { Button } from "@/components/ui/button"
import { MapPin, Menu, User, Sparkles } from "lucide-react"

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Travella
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#destinations" className="text-foreground/80 hover:text-primary transition-colors">
            Destinations
          </a>
          <a href="#experiences" className="text-foreground/80 hover:text-primary transition-colors">
            Experiences
          </a>
          <a href="#ai-planner" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            AI Planner
          </a>
          <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Button variant="travel" size="sm">
            <User className="w-4 h-4" />
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}