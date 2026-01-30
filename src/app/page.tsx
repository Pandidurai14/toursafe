"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin, Shield, Search } from "lucide-react"
import { SearchResults } from "@/components/search-results"
import { ManualItinerary } from "@/components/manual-itinerary"
import { SOSButton } from "@/components/sos-button"
import { EBillDialog } from "@/components/e-bill-dialog"
import { BackgroundSlider } from "@/components/background-slider"
import { CustomCursor } from "@/components/custom-cursor"
import { useToast } from "@/components/ui/toast-provider"

// Toggle Switch Component (Inline)
function Toggle({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (c: boolean) => void }) {
    return (
        <button
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${checked ? 'bg-green-500' : 'bg-input'}`}
            onClick={() => onCheckedChange(!checked)}
        >
            <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform absolute top-1 left-1 ${checked ? 'translate-x-5' : ''}`} />
        </button>
    )
}

export default function Home() {
    const [destination, setDestination] = React.useState("Chennai")
    const [safetyScore, setSafetyScore] = React.useState(8.5)
    // Itinerary State
    const [itinerary, setItinerary] = React.useState<{ id: string, title: string, type: string, cost: number }[]>([])
    const [isEBillOpen, setIsEBillOpen] = React.useState(false)
    const [locationShared, setLocationShared] = React.useState(false)
    const { toast } = useToast()

    React.useEffect(() => {
        // Simulate score changing with destination
        if (destination.toLowerCase().includes('kerala')) setSafetyScore(9.2)
        else if (destination.toLowerCase().includes('delhi')) setSafetyScore(7.5)
        else setSafetyScore(8.5)
    }, [destination])

    const addToItinerary = (title: string, type: string, cost: number) => {
        setItinerary(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), title, type, cost }])
        toast({ title: "Added to Itinerary", description: `${title} added. Cost: ₹${cost}` })
    }

    const removeFromItinerary = (id: string) => {
        setItinerary(prev => prev.filter(i => i.id !== id))
    }

    const handleShareLocation = (enabled: boolean) => {
        setLocationShared(enabled)
        if (enabled) toast({ title: "Live Location Enabled", description: "Sharing with trusted contacts." })
        else toast({ title: "Location Sharing Paused" })
    }

    return (
        <div className="min-h-screen pb-20 relative">
            <CustomCursor />
            <BackgroundSlider />
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 border-b sticky top-0 z-40 shadow-sm animate-slide-in-from-top">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary animate-scale-in">
                        <div className="bg-primary/10 p-1.5 rounded-lg transition-transform hover:scale-110 duration-300">
                            <Shield className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">TourSafe</span>
                    </div>

                    <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border hover:bg-muted/80 transition-all duration-200 hover:scale-105">
                            <span className={locationShared ? "text-green-600 animate-pulse" : "text-muted-foreground"}>●</span>
                            <span className="hidden sm:inline">Live Location</span>
                            <Toggle checked={locationShared} onCheckedChange={handleShareLocation} />
                        </div>
                        <Button onClick={() => window.location.href = "/profile"} variant="outline" size="sm" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all duration-200">
                            <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">R</span>
                            <span className="hidden sm:inline">Rohan Kumar</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">

                {/* Hero / Search */}
                <section className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex-1 w-full space-y-3 animate-slide-in-from-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explore with Confidence</h1>
                        <p className="text-muted-foreground text-lg">Find trusted guides, verified food, and stay safe.</p>
                        <div className="relative max-w-lg group">
                            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                                className="pl-10 h-12 text-lg shadow-sm border-2 focus-visible:ring-primary/20 transition-all duration-300 hover:shadow-md"
                                placeholder="Enter destination (e.g. Chennai, Kerala)..."
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                            />
                        </div>
                    </div>

                    <Card className="p-4 flex items-center gap-4 min-w-[200px] border-l-4 border-l-emerald-500 shadow-md bg-emerald-50/50 dark:bg-emerald-950/10 animate-slide-in-from-right hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-2xl shadow-inner animate-pulse">
                            {safetyScore}
                        </div>
                        <div>
                            <div className="font-bold text-base text-foreground">Safety Score</div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">AI Analyzed</div>
                        </div>
                    </Card>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left: Explore (Tabs) */}
                    <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <SearchResults destination={destination} onAddToItinerary={addToItinerary} />
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="sticky top-24">
                            <ManualItinerary
                                items={itinerary}
                                onRemove={removeFromItinerary}
                                onBook={() => setIsEBillOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <SOSButton />

            <EBillDialog
                open={isEBillOpen}
                onOpenChange={setIsEBillOpen}
                items={itinerary}
                total={itinerary.reduce((acc, item) => acc + item.cost, 0)}
            />
        </div>
    )
}
