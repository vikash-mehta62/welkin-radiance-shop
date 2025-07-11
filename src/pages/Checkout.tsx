
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext" // Assuming this context is defined
import { useToast } from "@/hooks/use-toast" // Assuming this hook is defined
import { CreditCard, MapPin } from "lucide-react"
import { BuyProduct } from "@/services2/operations/order"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()

  // State for shipping information
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const shippingInfo = {
      firstName,
      lastName,
      email,
      phone,
      billingAddress: address,
      billingCity: city,
      billingState: state,
      billingPincode: pincode,
    }





    try {
      const response = await BuyProduct(
        authData?.token,
        items,
        shippingInfo,
        total,
        navigate,
        dispatch
      )
      return

      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      })
      clearCart() // Clear cart after successful order
      // Optionally, redirect to a success page
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast({
        title: "Order Placement Failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const finalTotal = total // Assuming total is already calculated from useCart

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="border-sage-light/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select value={state} onValueChange={setState} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-sage-light/50 shadow-soft sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.length === 0 ? (
                      <p className="text-muted-foreground text-center">Your cart is empty.</p>
                    ) : (
                      items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-12 h-12 bg-sage-light/20 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg?height=64&width=64"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <div className="text-sm font-medium">₹{item.price * item.quantity}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-sage">Free</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    variant="default" // Changed to default as 'hero' might be custom
                    size="lg"
                    className="w-full"
                    disabled={isProcessing || items.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground space-y-1">
                    <p>🔒 Your payment information is secure</p>
                    <p>📦 Free delivery on all orders</p>
                    <p>↩️ Easy 30-day returns</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
