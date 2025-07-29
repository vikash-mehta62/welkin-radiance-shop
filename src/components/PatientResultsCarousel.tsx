
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PatientResultsCarouselProps {
  onConsultClick: () => void
}

export const PatientResultsCarousel = ({ onConsultClick }: PatientResultsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock patient results data
  const patientResults = [
    {
      id: 1,
      beforeImage: "https://images.unsplash.com/photo-1494790108755-2616b332c83f?w=300&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      name: "Priya S.",
      age: 28,
      treatment: "Acne Treatment",
      rating: 5,
      review: "Amazing results! My skin has never looked better."
    },
    {
      id: 2,
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      name: "Rahul K.",
      age: 32,
      treatment: "Hair Loss Treatment",
      rating: 5,
      review: "Excellent consultation and treatment plan. Highly recommended!"
    },
    {
      id: 3,
      beforeImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
      name: "Anjali M.",
      age: 25,
      treatment: "Skin Brightening",
      rating: 5,
      review: "Professional service and great results. Very satisfied!"
    },
    {
      id: 4,
      beforeImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
      name: "Vikash T.",
      age: 29,
      treatment: "Anti-Aging Treatment",
      rating: 5,
      review: "Outstanding results and professional care throughout."
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % patientResults.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + patientResults.length) % patientResults.length)
  }

  const visibleResults = [
    patientResults[currentIndex],
    patientResults[(currentIndex + 1) % patientResults.length],
    patientResults[(currentIndex + 2) % patientResults.length]
  ]

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Real Patients, <span className="text-maroon">Real Results</span>
        </h2>
        <p className="text-muted-foreground">
          See what our satisfied patients have to say about their transformation
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ✓ 10 mins consultation guaranteed monthly
          </Badge>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              (1567 reviews)
            </span>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            ⭐ 4.8 out of 5
          </Badge>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleResults.map((result, index) => (
            <Card 
              key={result.id} 
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={onConsultClick}
            >
              <div className="space-y-4">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="relative overflow-hidden rounded-lg mb-2">
                      <img 
                        src={result.beforeImage} 
                        alt="Before treatment"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1">
                        Before
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative overflow-hidden rounded-lg mb-2">
                      <img 
                        src={result.afterImage} 
                        alt="After treatment"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1">
                        After
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="text-center">
                  <h4 className="font-semibold text-foreground">{result.name}</h4>
                  <p className="text-sm text-muted-foreground">Age: {result.age} • {result.treatment}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(result.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-xs text-muted-foreground text-center italic">
                  "{result.review}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl z-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl z-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Button 
          className="bg-maroon hover:bg-maroon-dark text-background px-8 py-3 rounded-full font-semibold"
          onClick={onConsultClick}
        >
          BOOK NOW
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {patientResults.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-maroon" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
