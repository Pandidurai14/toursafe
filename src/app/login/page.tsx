"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundSlider } from "@/components/background-slider"
import { Phone, User, Mail, Lock, Heart, ShieldAlert, Globe, MapPin } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    // Registration State
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        emergencyContact: "",
        nationality: "",
        age: "",
        gender: "select"
    })

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            // For now, handling "login" by just redirecting to home
            // In a real app, you'd validate credentials or create the user
            alert(isLogin ? "Logged in successfully!" : "Profile created successfully! Welcome to TourSafe.")
            router.push("/")
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Dynamic Background */}
            <BackgroundSlider />

            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

            <Card className="z-20 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300 shadow-2xl border-white/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center tracking-tight">
                        {isLogin ? "Welcome Back" : "Create Your Profile"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin
                            ? "Enter your credentials to access your travel dashboard"
                            : "Help us personalize your safe travel experience"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Login / Register Fields */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        className="pl-9"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="pl-9"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-9"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Additional Registration Fields for Profile Collection */}
                        {!isLogin && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="+91 98765..."
                                                className="pl-9"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            name="age"
                                            type="number"
                                            placeholder="25"
                                            required
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="nationality"
                                            name="nationality"
                                            placeholder="Indian"
                                            className="pl-9"
                                            required
                                            value={formData.nationality}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="select" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContact" className="text-red-500 font-semibold flex items-center gap-1">
                                        <ShieldAlert className="h-3 w-3" /> Emergency Contact
                                    </Label>
                                    <Input
                                        id="emergencyContact"
                                        name="emergencyContact"
                                        placeholder="Parent/Guardian Name & Phone"
                                        required
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        className="border-red-200 focus-visible:ring-red-500"
                                    />
                                </div>
                            </>
                        )}

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform active:scale-95" disabled={loading}>
                            {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Profile")}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground">
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
