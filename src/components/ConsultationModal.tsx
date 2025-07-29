
import * as React from "react"
import { useState } from "react"
import { X, Upload, Calendar, Clock, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ConsultationModal = ({ open, onOpenChange }: ConsultationModalProps) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    firstTime: "",
    helpWith: "",
    pictures: null as File | null,
    preferredDate: "",
    selectedSlot: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData(prev => ({ ...prev, pictures: file }))
  }

  const handleSubmit = () => {
    console.log("Consultation form data:", formData)
    // Here you would normally send the data to your backend
    onOpenChange(false)
  }

  const timeSlots = [
    { id: "morning", time: "10 AM - 12 PM", icon: Sun, color: "bg-yellow-100" },
    { id: "afternoon", time: "12 PM - 3 PM", icon: Sun, color: "bg-orange-100" },
    { id: "evening", time: "3 PM - 7 PM", icon: Moon, color: "bg-purple-100" }
  ]

  const helpOptions = [
    { id: "skin", label: "Skin", icon: "🧴" },
    { id: "hair", label: "Hair", icon: "💇" },
    { id: "other", label: "Other", icon: "⚕️" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Tell us about yourself
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Age and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-purple-600">
                Your Age
              </Label>
              <Input
                id="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium text-purple-600">
                Your gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* First Time Consultation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Consulting for the first time?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={formData.firstTime === "yes" ? "default" : "outline"}
                className={`h-12 ${formData.firstTime === "yes" ? "bg-maroon text-background" : "border-2"}`}
                onClick={() => handleInputChange("firstTime", "yes")}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={formData.firstTime === "no" ? "default" : "outline"}
                className={`h-12 ${formData.firstTime === "no" ? "bg-purple-600 text-white" : "border-2"}`}
                onClick={() => handleInputChange("firstTime", "no")}
              >
                No
              </Button>
            </div>
          </div>

          {/* Where can we help you */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Where can we help you?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {helpOptions.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={formData.helpWith === option.id ? "default" : "outline"}
                  className={`h-16 flex flex-col items-center gap-2 ${
                    formData.helpWith === option.id ? "bg-maroon text-background" : "border-2"
                  }`}
                  onClick={() => handleInputChange("helpWith", option.id)}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Share Pictures */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-purple-600">
              Share Pictures (Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                id="picture-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="picture-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {formData.pictures ? formData.pictures.name : "Click on the pin to add"}
                </span>
              </label>
            </div>
          </div>

          {/* Select Preferred Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-purple-600">
              Select Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
              className="border-2"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Available Slots */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Available Slots</h3>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((slot) => {
                const IconComponent = slot.icon
                return (
                  <div
                    key={slot.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.selectedSlot === slot.id
                        ? "border-maroon bg-maroon/5"
                        : "border-gray-200 hover:border-maroon/50"
                    }`}
                    onClick={() => handleInputChange("selectedSlot", slot.id)}
                  >
                    <div className={`w-12 h-12 rounded-lg ${slot.color} flex items-center justify-center mb-3`}>
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="text-sm font-medium text-foreground">{slot.time}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => onOpenChange(false)}
            >
              BACK
            </Button>
            <Button
              className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSubmit}
            >
              BOOK NOW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
