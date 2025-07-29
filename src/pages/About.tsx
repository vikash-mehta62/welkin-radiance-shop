import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, Users, Heart } from "lucide-react";

import {
  Target, // No Fluff, Just Results
  RefreshCcw, // Continuous Innovation
  UserCheck, // Loyal Users
} from "lucide-react";

import { Sparkles, FlaskConical, Sun, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "No Fluff, Just Results",
      description:
        "No big promises or miracle claims. Our approach is clear: honest skincare that improves your skin’s texture, tone, and resilience over time.",
    },
    {
      icon: RefreshCcw,
      title: "Continuous Innovation",
      description:
        "We're constantly improving—new research, better delivery systems, and more sustainable packaging are always part of what we do next.",
    },
    {
      icon: UserCheck,
      title: "Loyal Users",
      description:
        "From working professionals to skincare minimalists, thousands have chosen Welkin to reduce signs of aging and pigmentation—without resorting to harsh treatments.",
    },
  ];

  const productRange = [
    {
      icon: <Sparkles className="w-10 h-10 text-orange-500 mb-4" />,
      name: "Derma Gold Intense Glow",
      role: "",
      bio: `At the heart of our range is Derma Gold Intense Glow, a powerful cream enriched with Glutathione and Arbutin, designed to visibly reduce dark spots, promote even tone, and restore youthful radiance. It’s more than just a glow cream—it’s the result of years of clinical insight and skin science.`,
    },
    {
      icon: <FlaskConical className="w-10 h-10 text-orange-500 mb-4" />,
      name: "G-4 Max Glow",
      role: "",
      bio: `A nutraceutical supplement that works from within to fight early signs of aging, support collagen health, and brighten skin tone with antioxidants like Lycopene, Wheat Germ Oil, and Selenium.`,
    },
    {
      icon: <Sun className="w-10 h-10 text-orange-500 mb-4" />,
      name: "Derma White",
      role: "",
      bio: `A day cream that offers both skin-brightening and protective benefits, making it ideal for daily use in harsh sun and pollution conditions.`,
    },
    {
      icon: <Shield className="w-10 h-10 text-orange-500 mb-4" />,
      name: "UV Shield Tablets",
      role: "",
      bio: `Formulated with plant-based7 antioxidants like Broccoli Sprouts and Grape Seed Extract, this internal sunscreen helps reduce UV damage and oxidative stress from the inside out.`,
    },
  ];

  const team = [
    {
      name: "XYZ",
      role: "Chief Formulator",
      bio: "15+ years in cosmetic chemistry, specializing in natural skincare formulations.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "XYZ",
      role: "Founder & CEO",
      bio: "Passionate about clean beauty and sustainable business practices.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "XYZ",
      role: "Head of Research",
      bio: "PhD in Dermatology, focused on ingredient safety and efficacy.",
      image: "https://via.placeholder.com/150",
    },
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
            Welkin Pharmaceuticals is a dermatology-led skincare and wellness
            brand focused on results you can see and feel.
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
                  Founded in 2008, Welkin Pharmaceuticals is a dermatology-led
                  skincare and wellness brand focused on results you can see and
                  feel. Our mission is simple: to develop honest, effective, and
                  targeted products that address real concerns like wrinkles,
                  pigmentation, dullness, and photoaging—especially for Indian
                  skin.
                </p>
                <p>
                  Whether it's topical skincare or oral nutraceuticals, every
                  Welkin product is developed with a science-first,
                  results-driven mindset. No gimmicks. No unrealistic promises.
                  Just formulations that work—individually and together—to help
                  you achieve clear, firm, and radiant skin.
                </p>
                <p>
                  Thousands of customers across India trust us with their skin
                  every day—and that’s the standard we work hard to live up to.
                </p>
                <p>Welkin Pharmaceuticals. Proven science. Visible results.</p>
              </div>
            </div>
            <div className="relative inline-block w-full max-w-md">
              <img
                src="/derma.jpg"
                alt="Natural skincare ingredients"
                className="rounded-lg shadow-elegant object-fit w-full h-auto max-h-[400px]"
                loading="lazy"
              />
              <span className="absolute top-10 right-32 text-sm text-white bg-black/60 px-2 py-0.5 rounded">
                TM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-sage-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sage text-background">
              Our Philosophy
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make, from
              ingredient sourcing to product development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-sage-light/50 shadow-soft hover:shadow-card transition-all duration-300"
              >
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

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-sage text-background mb-4">
              Radiant Rituals
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              A Touch of Luxury
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our advanced skincare collection, crafted with clinical
              insight and scientific precision for healthier, radiant skin.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 border border-sage-light/50 hover:shadow-card transition-all duration-300">
            <div className="flex-shrink-0"></div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Derma Gold Intense Glow
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                At the heart of our range is **Derma Gold Intense Glow**, a
                powerful cream enriched with **Glutathione** and **Arbutin**,
                designed to visibly reduce dark spots, promote even tone, and
                restore youthful radiance. It’s more than just a glow cream—it’s
                the result of years of clinical insight and skin science.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-sage-light/50 hover:shadow-card transition-all duration-300">
              <div className="flex-shrink-0 mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                G-4 Max Glow
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                A nutraceutical supplement that works from within to fight early
                signs of aging, support collagen health, and brighten skin tone
                with antioxidants like **Lycopene**, **Wheat Germ Oil**, and
                **Selenium**.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-sage-light/50 hover:shadow-card transition-all duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Derma White
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                A day cream that offers both skin-brightening and protective
                benefits, making it ideal for daily use in harsh sun and
                pollution conditions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-sage-light/50 hover:shadow-card transition-all duration-300">
              <div className="flex-shrink-0 mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                UV Shield Tablets
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Formulated with plant-based antioxidants like **Broccoli
                Sprouts** and **Grape Seed Extract**, this internal sunscreen
                helps reduce UV damage and oxidative stress from the inside out.
              </p>
            </div>
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
            Develop honest, effective, and targeted products that address real
            concerns like wrinkles, pigmentation, dullness, and
            photoaging—especially for Indian skin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
