"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BackgroundSlider } from "@/components/background-slider"
import { User, Mail, Phone, MapPin, ShieldAlert, Edit2, LogOut, Save, Camera, Upload } from "lucide-react"
import { useToast } from "@/components/ui/toast-provider"

export default function ProfilePage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isEditing, setIsEditing] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    // Mock User Data
    const [user, setUser] = React.useState({
        name: "Rohan Kumar",
        email: "rohan.kumar@example.com",
        phone: "+91 98765 43210",
        nationality: "Indian",
        age: "28",
        gender: "Male",
        location: "Mumbai, India",
        emergencyContact: "Rajesh Kumar (+91 99999 88888)",
        imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
        aadharUrl: "https://t4.ftcdn.net/jpg/02/10/89/65/360_F_210896590_g8t5m6p2E3R6t2n6.jpg"
    })

    const profileInputRef = React.useRef<HTMLInputElement>(null)
    const aadharInputRef = React.useRef<HTMLInputElement>(null)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setIsEditing(false)
            toast({ title: "Profile Updated", description: "Your changes have been saved successfully." })
        }, 1000)
    }

    const triggerFileInput = (type: 'profile' | 'aadhar') => {
        if (type === 'profile') {
            profileInputRef.current?.click()
        } else {
            aadharInputRef.current?.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'aadhar') => {
        const file = e.target.files?.[0]
        if (file) {
            toast({ title: "Uploading...", description: "Processing your image..." })

            // Create a local preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setUser(prev => ({
                    ...prev,
                    [type === 'profile' ? 'imageUrl' : 'aadharUrl']: reader.result as string
                }))
                toast({ title: "Upload Complete", description: `${type === 'profile' ? 'Profile picture' : 'ID Proof'} updated successfully.` })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen relative pb-20">
            <BackgroundSlider />
            <div className="absolute inset-0 bg-black/60 fixed" />

            {/* Header (Simplified) */}
            <header className="relative z-10 p-4 flex justify-between items-center text-white">
                <div onClick={() => router.push("/")} className="cursor-pointer flex items-center gap-2 font-bold text-xl">
                    <span className="bg-primary/20 p-2 rounded-lg backdrop-blur-sm">TourSafe</span>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => router.push("/login")}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
            </header>

            <main className="relative z-10 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Profile Header Card */}
                    <Card className="border-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                            <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-full">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={user.imageUrl} className="object-cover" />
                                    <AvatarFallback>RK</AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md hover:bg-white"
                                        onClick={() => triggerFileInput('profile')}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="pt-20 pb-6 px-8 flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <MapPin className="h-4 w-4" /> {user.location} • {user.nationality}
                                </div>
                            </div>
                            <Button onClick={isEditing ? handleSave : () => setIsEditing(true)} variant={isEditing ? "default" : "outline"}>
                                {isEditing ? <><Save className="h-4 w-4 mr-2" /> Save Changes</> : <><Edit2 className="h-4 w-4 mr-2" /> Edit Profile</>}
                            </Button>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Personal Info */}
                        <Card className="md:col-span-2 shadow-lg bg-white/90 backdrop-blur">
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Your personal details and identification.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* ... existing inputs ... */}
                                    {/* Omitted for brevity, targeting the Aadhaar section below */}
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            value={user.name}
                                            disabled={!isEditing}
                                            onChange={e => setUser({ ...user, name: e.target.value })}
                                            className="bg-white/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={user.email}
                                                disabled={!isEditing}
                                                className="pl-9 bg-white/50"
                                                onChange={e => setUser({ ...user, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={user.phone}
                                                disabled={!isEditing}
                                                className="pl-9 bg-white/50"
                                                onChange={e => setUser({ ...user, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Age</Label>
                                        <Input
                                            value={user.age}
                                            disabled={!isEditing}
                                            type="number"
                                            className="bg-white/50"
                                            onChange={e => setUser({ ...user, age: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Input
                                            value={user.gender}
                                            disabled={!isEditing}
                                            className="bg-white/50"
                                            onChange={e => setUser({ ...user, gender: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nationality</Label>
                                        <Input
                                            value={user.nationality}
                                            disabled={!isEditing}
                                            className="bg-white/50"
                                            onChange={e => setUser({ ...user, nationality: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2 pt-2">
                                        <Label className="flex items-center gap-2">
                                            Aadhaar Card / ID Proof
                                            {isEditing && <Badge variant="outline" className="text-xs">Required for Booking</Badge>}
                                        </Label>
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-muted/20 hover:bg-muted/30 transition-colors">
                                            {user.aadharUrl ? (
                                                <div className="relative w-full h-48 rounded-md overflow-hidden bg-black/5">
                                                    {/* Using a placeholder image for demo if URL is generic, else real image */}
                                                    <img src={user.aadharUrl} alt="Aadhaar Card" className="w-full h-full object-contain" />
                                                    {isEditing && (
                                                        <div
                                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10"
                                                            onClick={() => triggerFileInput('aadhar')}
                                                        >
                                                            <div className="bg-white text-black px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium hover:scale-105 transition-transform">
                                                                <Edit2 className="h-3 w-3" /> Change Photo
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <div className="bg-primary/10 p-3 rounded-full inline-flex mb-2">
                                                        <Camera className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <p className="text-sm font-medium">Upload Aadhaar Card</p>
                                                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                                                </div>
                                            )}
                                            {isEditing && !user.aadharUrl && (
                                                <Button size="sm" variant="secondary" className="mt-2">Select File</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Safety & Status */}
                        <div className="space-y-8">
                            <Card className="shadow-lg border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20">
                                <CardHeader>
                                    <CardTitle className="text-red-600 flex items-center gap-2">
                                        <ShieldAlert className="h-5 w-5" /> Emergency Contact
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label>Primary Contact</Label>
                                        <Input
                                            value={user.emergencyContact}
                                            disabled={!isEditing}
                                            className="border-red-200 bg-white"
                                            onChange={e => setUser({ ...user, emergencyContact: e.target.value })}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>Badges & Verification</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                            ✅ ID Verified
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                            👶 Verified Traveller
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-2">
                                        Joined January 2025
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Hidden File Inputs */}
                <input
                    type="file"
                    ref={profileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'profile')}
                />
                <input
                    type="file"
                    ref={aadharInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'aadhar')}
                />
            </main>
        </div>
    )
}
