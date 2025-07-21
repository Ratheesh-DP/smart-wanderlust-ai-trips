import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart, ArrowRight } from "lucide-react"
import tropicalImage from "@/assets/destination-tropical.jpg"
import europeImage from "@/assets/destination-europe.jpg"
import mountainImage from "@/assets/destination-mountain.jpg"

const destinations = [
  {
    id: 1,
    name: "Maldives Paradise",
    location: "Indian Ocean",
    image: tropicalImage,
    rating: 4.9,
    reviews: 1240,
    duration: "7-14 days",
    price: "$2,499",
    tags: ["Luxury", "Beach", "Romantic"],
    description: "Crystal clear waters and overwater villas await in this tropical paradise.",
    featured: true
  },
  {
    id: 2,
    name: "European Heritage",
    location: "Prague, Czech Republic",
    image: europeImage,
    rating: 4.8,
    reviews: 856,
    duration: "5-10 days",
    price: "$1,299",
    tags: ["Culture", "History", "Architecture"],
    description: "Explore medieval castles and charming cobblestone streets.",
    featured: false
  },
  {
    id: 3,
    name: "Alpine Adventure",
    location: "Swiss Alps",
    image: mountainImage,
    rating: 4.9,
    reviews: 945,
    duration: "4-8 days",
    price: "$1,899",
    tags: ["Adventure", "Nature", "Hiking"],
    description: "Breathtaking mountain views and world-class skiing facilities.",
    featured: true
  }
]

export const Destinations = () => {
  return (
    <section id="destinations" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Popular Destinations
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Discover Amazing
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Places
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From tropical paradises to cultural capitals, explore handpicked destinations 
            that offer unforgettable experiences for every type of traveler.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className={`travel-card overflow-hidden group cursor-pointer animate-slide-up ${
                destination.featured ? 'lg:col-span-2 xl:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Favorite Button */}
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>

                {/* Featured Badge */}
                {destination.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}

                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{destination.rating}</span>
                    <span className="text-white/80">({destination.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{destination.price}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{destination.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{destination.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full group">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="travel" size="lg">
            Explore All Destinations
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}