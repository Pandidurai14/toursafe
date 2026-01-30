"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    X,
    Star,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Users,
    Award,
    Languages,
    MessageCircle,
    CheckCircle,
    Clock
} from "lucide-react"

interface GuideDetailsDialogProps {
    guide: {
        id: number
        name: string
        location: string
        language: string
        rating: number
        imageUrl: string
        price: string
        contact: string
    } | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onStartChat: () => void
}

export function GuideDetailsDialog({ guide, open, onOpenChange, onStartChat }: GuideDetailsDialogProps) {
    if (!guide) return null

    // Mock additional details
    const guideDetails = {
        email: `${guide.name.toLowerCase().replace(' ', '.')}@toursafe.com`,
        experience: "5+ years",
        toursCompleted: 250,
        specialties: ["Historical Sites", "Food Tours", "Adventure", "Cultural Tours"],
        availability: "Available",
        certifications: ["Licensed Tour Guide", "First Aid Certified", "Multilingual Expert"],
        description: `Experienced and passionate tour guide with deep knowledge of ${guide.location}'s history, culture, and hidden gems. Committed to providing safe, informative, and memorable experiences for all travelers.`,
        reviews: [
            { name: "Sarah M.", rating: 5, comment: "Amazing guide! Very knowledgeable and friendly." },
            { name: "John D.", rating: 5, comment: "Best tour experience ever. Highly recommended!" },
            { name: "Priya K.", rating: 4.5, comment: "Great insights into local culture and history." }
        ]
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 z-50 rounded-full p-2 bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 hover:scale-110 shadow-lg"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header with Cover */}
                <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 animate-fade-in">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-end gap-4">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-xl ring-2 ring-primary/20 animate-scale-in">
                                <AvatarImage src={guide.imageUrl} alt={guide.name} className="object-cover" />
                                <AvatarFallback className="text-2xl">{guide.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-white mb-2">
                                <h2 className="text-2xl font-bold">{guide.name}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{guide.location}</span>
                                    <Badge className="ml-2 bg-green-500 hover:bg-green-600 animate-pulse">
                                        {guideDetails.availability}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Rating and Price */}
                    <div className="flex items-center justify-between animate-slide-in-from-bottom">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                <span className="font-bold text-lg">{guide.rating}</span>
                                <span className="text-sm text-muted-foreground">(250 reviews)</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-primary">₹{guide.price}</div>
                            <div className="text-sm text-muted-foreground">per day</div>
                        </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-sm font-semibold">{guideDetails.experience}</div>
                                <div className="text-xs text-muted-foreground">Experience</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-sm font-semibold">{guideDetails.toursCompleted}+</div>
                                <div className="text-xs text-muted-foreground">Tours</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Languages className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-sm font-semibold">{guide.language.split(',').length}</div>
                                <div className="text-xs text-muted-foreground">Languages</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-sm font-semibold">Verified</div>
                                <div className="text-xs text-muted-foreground">Guide</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* About */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.2s' }}>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            About
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{guideDetails.description}</p>
                    </div>

                    {/* Languages */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.3s' }}>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Languages className="h-5 w-5 text-primary" />
                            Languages
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {guide.language.split(',').map((lang, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                    {lang.trim()}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Specialties */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.4s' }}>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Specialties
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {guideDetails.specialties.map((specialty, index) => (
                                <Badge key={index} className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                                    {specialty}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.5s' }}>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Certifications
                        </h3>
                        <div className="space-y-2">
                            {guideDetails.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.6s' }}>
                        <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <a href={`tel:${guide.contact}`} className="hover:text-primary transition-colors">
                                    {guide.contact}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <a href={`mailto:${guideDetails.email}`} className="hover:text-primary transition-colors">
                                    {guideDetails.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.7s' }}>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary" />
                            Recent Reviews
                        </h3>
                        <div className="space-y-3">
                            {guideDetails.reviews.map((review, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm">{review.name}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                <span className="text-sm">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t animate-slide-in-from-bottom" style={{ animationDelay: '0.8s' }}>
                        <Button
                            className="flex-1 h-12 text-base hover:scale-105 transition-all duration-200"
                            onClick={() => {
                                onStartChat()
                                onOpenChange(false)
                            }}
                        >
                            <MessageCircle className="h-5 w-5 mr-2" />
                            Start Chat
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 h-12 text-base hover:scale-105 transition-all duration-200"
                            onClick={() => onOpenChange(false)}
                        >
                            <Phone className="h-5 w-5 mr-2" />
                            Call Now
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
