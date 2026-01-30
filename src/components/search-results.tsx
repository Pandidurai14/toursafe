"use client"
import * as React from "react"
import Image from "next/image"
import { guides, hotels, food, hospitals, touristPlaces } from "@/lib/mock-data"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RealTimeTranslationDialog } from "./real-time-translation-dialog"
import { FoodMenuDialog } from "./food-menu-dialog"
import { GuideDetailsDialog } from "./guide-details-dialog"
import { MessageCircle, MapPin, CheckCircle, Phone, Plus, Clock, Ticket, Info } from "lucide-react"

export function SearchResults({ onAddToItinerary, destination }: {
    onAddToItinerary: (title: string, type: string, cost: number) => void,
    destination: string
}) {
    const [selectedGuide, setSelectedGuide] = React.useState<string | null>(null)
    const [selectedGuideDetails, setSelectedGuideDetails] = React.useState<any>(null)
    const [selectedRestaurant, setSelectedRestaurant] = React.useState<string | null>(null)

    const normalizedDestination = React.useMemo(() => {
        const d = destination.toLowerCase().trim()
        if (d.includes('kerala')) return 'Kerala'
        if (d.includes('delhi')) return 'Delhi'
        if (d.includes('mumbai')) return 'Mumbai'
        if (d.includes('coimbatore')) return 'Coimbatore'
        return 'Chennai' // Default
    }, [destination])

    const filteredGuides = React.useMemo(() => guides.filter(g => g.location === normalizedDestination), [normalizedDestination])
    const filteredHotels = React.useMemo(() => hotels.filter(h => h.location === normalizedDestination), [normalizedDestination])
    const filteredFood = React.useMemo(() => food.filter(f => f.location === normalizedDestination), [normalizedDestination])
    const filteredHospitals = React.useMemo(() => hospitals.filter(h => h.location === normalizedDestination), [normalizedDestination])
    const filteredPlaces = React.useMemo(() => touristPlaces.filter(p => p.location === normalizedDestination), [normalizedDestination])

    return (
        <div className="w-full">
            <Tabs defaultValue="places">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="places">Places</TabsTrigger>
                    <TabsTrigger value="guides">Guides</TabsTrigger>
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="food">Food</TabsTrigger>
                    <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
                </TabsList>

                <TabsContent value="places" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPlaces.length === 0 ? (
                        <div className="col-span-2 text-center py-8 text-muted-foreground animate-fade-in">No tourist places found for {normalizedDestination}.</div>
                    ) : (
                        filteredPlaces.map((p, index) => (
                            <Card
                                key={p.id}
                                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in cursor-pointer group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="h-48 bg-muted w-full relative overflow-hidden">
                                    {p.imageUrl ? (
                                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : null}
                                    <Badge className="absolute top-2 right-2 bg-white/90 text-foreground hover:bg-white animate-slide-in-from-top" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                                        {p.category}
                                    </Badge>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                                        <div className="flex items-center text-yellow-500 text-sm">★ {p.rating}</div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            <span>{p.timings}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Ticket className="h-3 w-3" />
                                            <span>Entry: {p.entryFee}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button
                                        className="w-full transition-all duration-200 hover:scale-105"
                                        variant="outline"
                                        onClick={() => {
                                            const fee = p.entryFee === 'Free' || p.entryFee === 'Varies' ? 0 : parseInt(p.entryFee.replace('₹', ''))
                                            onAddToItinerary(p.name, "Tourist Place", fee)
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="guides" className="space-y-4">
                    {filteredGuides.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground animate-fade-in">No guides found for {normalizedDestination}.</div>
                    ) : (
                        filteredGuides.map((g, index) => (
                            <Card
                                key={g.id}
                                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-slide-in-from-left"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardContent className="flex items-center p-4 gap-4">
                                    <Avatar className="h-16 w-16 border ring-2 ring-transparent hover:ring-primary transition-all duration-300">
                                        <AvatarImage src={g.imageUrl} alt={g.name} className="object-cover" />
                                        <AvatarFallback>{g.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedGuideDetails(g)}>{g.name}</h3>
                                            <div className="flex items-center text-yellow-500 text-sm">★ {g.rating}</div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{g.language}</p>
                                        <p className="text-xs text-muted-foreground">📍 {g.location}</p>
                                        <p className="font-bold text-primary mt-1">₹{g.price}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button size="sm" variant="outline" onClick={() => setSelectedGuideDetails(g)} className="transition-all duration-200 hover:scale-105">
                                            <Info className="h-4 w-4 mr-1" /> Details
                                        </Button>
                                        <Button size="sm" onClick={() => setSelectedGuide(g.name)} className="transition-all duration-200 hover:scale-105">
                                            <MessageCircle className="h-4 w-4 mr-1" /> Chat
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => onAddToItinerary(g.name, "Guide", parseInt(g.price))} className="transition-all duration-200 hover:scale-105">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="hotels" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredHotels.length === 0 ? (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">No hotels found for {normalizedDestination}.</div>
                    ) : (
                        filteredHotels.map(h => (
                            <Card key={h.id} className="overflow-hidden">
                                <div className="h-48 bg-muted w-full relative">
                                    {h.imageUrl ? (
                                        <Image src={h.imageUrl} alt={h.name} fill className="object-cover" />
                                    ) : null}
                                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center z-10"><MapPin className="h-3 w-3 mr-1" /> {h.distance}</div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{h.name}</h3>
                                            <p className="text-xs text-muted-foreground">{h.description}</p>
                                        </div>
                                        <span className="text-sm font-bold">₹{h.price}</span>
                                    </div>
                                    <div className="flex text-yellow-500 text-xs mt-1">{'★'.repeat(Math.round(h.rating))}</div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full" onClick={() => onAddToItinerary(h.name, "Hotel", parseInt(h.price))}>Add to Itinerary</Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="food" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredFood.length === 0 ? (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">No food spots found for {normalizedDestination}.</div>
                    ) : (
                        filteredFood.map(f => (
                            <Card key={f.id} className="overflow-hidden">
                                <div className="h-32 bg-muted w-full relative">
                                    {f.imageUrl ? (
                                        <Image src={f.imageUrl} alt={f.name} fill className="object-cover" />
                                    ) : null}
                                </div>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{f.name}</h3>
                                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" /> FSSAI
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{f.cuisine}</p>
                                    </div>
                                    <Button onClick={() => setSelectedRestaurant(f.name)}>View Menu</Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="hospitals" className="space-y-4">
                    {filteredHospitals.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No hospitals found for {normalizedDestination}.</div>
                    ) : (
                        filteredHospitals.map(h => (
                            <Card key={h.id}>
                                <div className="h-40 bg-muted w-full relative">
                                    {h.imageUrl ? (
                                        <Image src={h.imageUrl} alt={h.name} fill className="object-cover" />
                                    ) : null}
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base flex justify-between">
                                        {h.name}
                                        <Badge variant="destructive" className="ml-2">Emergency</Badge>
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.distance} away</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-2">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available Doctors</div>
                                    {h.doctors.map(d => (
                                        <div key={d.id} className="flex items-center gap-3 text-sm border p-2 rounded">
                                            <Avatar className="h-8 w-8"><AvatarFallback>Dr</AvatarFallback></Avatar>
                                            <div>
                                                <div className="font-medium">{d.name}</div>
                                                <div className="text-muted-foreground text-xs">{d.specialty} • {d.gender}</div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="p-4 pt-0 gap-2">
                                    <Button variant="outline" className="flex-1" asChild>
                                        <a href={`tel:${h.contact}`}><Phone className="h-4 w-4 mr-2" /> Call</a>
                                    </Button>
                                    <Button className="flex-1" onClick={() => onAddToItinerary(h.name, "Hospital", 0)}>Save</Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>

            {selectedGuide && (
                <RealTimeTranslationDialog
                    guideName={selectedGuide}
                    open={!!selectedGuide}
                    onOpenChange={(o) => !o && setSelectedGuide(null)}
                />
            )}

            {selectedRestaurant && (
                <FoodMenuDialog
                    restaurantName={selectedRestaurant}
                    open={!!selectedRestaurant}
                    onOpenChange={(o) => !o && setSelectedRestaurant(null)}
                    onAddToItinerary={onAddToItinerary}
                />
            )}

            {selectedGuideDetails && (
                <GuideDetailsDialog
                    guide={selectedGuideDetails}
                    open={!!selectedGuideDetails}
                    onOpenChange={(o) => !o && setSelectedGuideDetails(null)}
                    onStartChat={() => setSelectedGuide(selectedGuideDetails.name)}
                />
            )}
        </div>
    )
}
