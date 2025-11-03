import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Leaf, Users, Globe, Award, Heart, Recycle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Timeless Style, Transparent Values
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                We believe fashion should be beautiful, ethical, and built to last. Every piece we create tells a story of
                craftsmanship, sustainability, and the people who make it possible.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-balance">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TTTSL was born from a simple belief: fashion should be transparent, ethical, and timeless. Founded in
                    2020, we set out to create clothing that transcends seasonal trends and stands the test of time.
                  </p>
                  <p>
                    Our journey began when our founders, frustrated by the lack of transparency in the fashion industry,
                    decided to build something different. We partnered with ethical manufacturers, sourced sustainable
                    materials, and committed to radical transparency in everything we do.
                  </p>
                  <p>
                    Today, we're proud to offer clothing that not only looks good but does good – for the people who make
                    it, the planet we share, and the customers who wear it.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=500&width=600&text=Brand+Story+Image"
                  alt="TTTSL founders and team"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-balance">Our Values</h2>
              <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
                These principles guide everything we do, from design to production to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use organic, recycled, and responsibly sourced materials. Our production processes minimize waste
                    and environmental impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We partner with certified factories that provide fair wages, safe working conditions, and respect for
                    workers' rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We share the true cost of our products, from materials to labor to profit margins. No hidden fees, no
                    surprises.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Quality</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every piece is designed to last. We use premium materials and time-tested construction techniques to
                    create clothing that ages beautifully.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Community</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We believe in building relationships, not just transactions. Our community of customers, partners, and
                    team members is at the heart of everything we do.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Recycle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Circularity</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We design for longevity and offer repair services, take-back programs, and recycling initiatives to
                    extend the life of our products.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-balance">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Team+Member+${i}`}
                        alt={`Team member ${i}`}
                        className="w-32 h-32 rounded-full mx-auto object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Team Member {i}</h3>
                    <p className="text-muted-foreground">Position</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-balance">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about our mission, values, or products? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sustainability">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
