import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, Users, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "We believe in the power of nature. Our products are formulated with carefully selected natural ingredients that are gentle yet effective for all skin types."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Every product undergoes rigorous testing to ensure the highest quality standards. We're committed to delivering skincare that truly works."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our customers are at the heart of everything we do. We listen to your feedback and continuously improve our formulations."
    },
    {
      icon: Heart,
      title: "Ethical Practices",
      description: "Cruelty-free, sustainable sourcing, and eco-friendly packaging are non-negotiables in our commitment to responsible beauty."
    }
  ];

const team = [
  {
    name: "XYZ",
    role: "Chief Formulator",
    bio: "15+ years in cosmetic chemistry, specializing in natural skincare formulations.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "XYZ",
    role: "Founder & CEO",
    bio: "Passionate about clean beauty and sustainable business practices.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "XYZ",
    role: "Head of Research",
    bio: "PhD in Dermatology, focused on ingredient safety and efficacy.",
    image: "https://via.placeholder.com/150"
  }
];


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-dark mb-6">
            About Welkin
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
         Welkin Lifesciences is a dermatology-led skincare and wellness brand focused on results you can see and feel.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-sage text-background">Our Story</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Born from a Vision of Pure Beauty
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020, Welkin emerged from a simple yet profound belief: skincare should be 
                  as pure as nature intended. Our journey began when our founder, struggling with sensitive 
                  skin, couldn't find products that were both effective and gentle.
                </p>
                <p>
                  After years of research and collaboration with leading dermatologists and chemists, 
                  we developed our first serum. The results were transformative—not just for our founder's 
                  skin, but for everyone who tried it.
                </p>
                <p>
                  Today, Welkin represents more than just skincare. We're a community of individuals 
                  committed to clean beauty, sustainable practices, and the belief that everyone deserves 
                  healthy, radiant skin.
                </p>
              </div>
            </div>
            <div className="relative ">
              <img
                src="/derma.jpg"
                alt="Natural skincare ingredients"
                className="rounded-lg shadow-elegant object-fit"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-sage-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sage text-background">Our Values</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make, from ingredient sourcing to product development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-sage-light/50 shadow-soft hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-sage-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sage text-background">Our Team</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet the Experts Behind Welkin
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of scientists, researchers, and beauty experts work tirelessly to bring you the best in clean skincare.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-sage-light/50 shadow-soft hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <Badge variant="outline" className="mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16 bg-gradient-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            "To democratize access to clean, effective skincare while maintaining the highest standards 
            of quality, sustainability, and ethical practices. We believe beautiful skin should never come 
            at the cost of your health or our planet's wellbeing."
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Natural Ingredients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;