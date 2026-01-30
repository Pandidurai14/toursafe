"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
// Removed Dialog imports as we are moving to a custom floating window
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Send, Minus, X, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

export function RealTimeTranslationDialog({ guideName, open, onOpenChange }: { guideName: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    const [userLang, setUserLang] = React.useState("English")
    const [guideLang, setGuideLang] = React.useState("Hindi")
    const [messages, setMessages] = React.useState<{ id: number, text: string, sender: 'user' | 'guide', lang: string, translated?: string }[]>([
        { id: 1, text: "Namaste! How can I help you?", sender: 'guide', lang: 'Hindi', translated: "Hello! How can I help you?" }
    ])
    const [input, setInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)
    const [isMinimized, setIsMinimized] = React.useState(false)

    // Reset minimized state when opened
    React.useEffect(() => {
        if (open) {
            setIsMinimized(false)
        }
    }, [open])

    const languages = [
        { code: "en", name: "English" },
        { code: "hi", name: "Hindi" },
        { code: "ta", name: "Tamil" },
        { code: "es", name: "Spanish" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "ja", name: "Japanese" }
    ]

    const handleSend = () => {
        if (!input.trim()) return;

        // User sends message in their language
        const newMessage = {
            id: Date.now(),
            text: input,
            sender: 'user' as const,
            lang: userLang
        }

        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsTyping(true)

        // Mock reply with translation simulation
        setTimeout(() => {
            const lowerInput = input.toLowerCase()
            let rawResponse = "I am here to ensure you have a safe and great trip. How else can I help?"

            // Context-aware responses
            if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('restaurant') || lowerInput.includes('hungry')) {
                rawResponse = "I can verify the food hygiene for you. There is a verified restaurant nearby with a 5-star safety rating."
            } else if (lowerInput.includes('temple') || lowerInput.includes('god') || lowerInput.includes('worship') || lowerInput.includes('darshan')) {
                rawResponse = "The main temple opens at 6 AM. I can help you get a quick darshan ticket to avoid the queue."
            } else if (lowerInput.includes('time') || lowerInput.includes('open') || lowerInput.includes('when') || lowerInput.includes('hour')) {
                rawResponse = "Most tourist attractions here are open from 9 AM to 6 PM daily."
            } else if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('money') || lowerInput.includes('rupees')) {
                rawResponse = "The entry fees are usually affordable, around ₹50-₹100 per person. I can negotiate for souvenirs."
            } else if (lowerInput.includes('safe') || lowerInput.includes('danger') || lowerInput.includes('scared') || lowerInput.includes('help')) {
                rawResponse = "This area is generally safe, but please keep your valuables close. I am with you, so don't worry!"
            } else if (lowerInput.includes('hotel') || lowerInput.includes('stay') || lowerInput.includes('room')) {
                rawResponse = "I can take you to a verified safe hotel nearby with good reviews."
            }

            // Simulating "foreign" text based on selected language
            let foreignText = rawResponse

            // Simple mock translations for demo purposes (in a real app, this would use an API)
            // We'll just prefix/suffix to show it 'changed' if we don't have exact translations for dynamic text
            if (guideLang === "Hindi") {
                if (rawResponse.includes("food")) foreignText = "मैं आपके लिए भोजन की स्वच्छता की जांच कर सकता हूं। पास में एक सत्यापित रेस्तरां है।"
                else if (rawResponse.includes("temple")) foreignText = "मुख्य मंदिर सुबह 6 बजे खुलता है। मैं आपको कतार से बचने में मदद कर सकता हूं।"
                else if (rawResponse.includes("safe")) foreignText = "यह क्षेत्र आम तौर पर सुरक्षित है, लेकिन कृपया अपना कीमती सामान पास रखें।"
                else foreignText = "(Hindi Translation): " + rawResponse
            }
            else if (guideLang === "Tamil") {
                if (rawResponse.includes("food")) foreignText = "உணவுப் பாதுகாப்பை நான் சரிபார்க்கிறேன். (Tamil Text)"
                else foreignText = "(Tamil Translation): " + rawResponse
            }
            else if (guideLang === "Spanish") foreignText = "(Spanish Translation): " + rawResponse
            else if (guideLang === "French") foreignText = "(French Translation): " + rawResponse
            else if (guideLang === "German") foreignText = "(German Translation): " + rawResponse
            else if (guideLang === "Japanese") foreignText = "(Japanese Translation): " + rawResponse

            // If guide speaks English, return the raw response
            if (guideLang === "English") foreignText = rawResponse

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: foreignText,
                sender: 'guide',
                lang: guideLang,
                translated: guideLang !== userLang ? rawResponse : undefined
            }])
            setIsTyping(false)
        }, 1500)
    }

    if (!open) return null

    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in">
                <Button
                    onClick={() => setIsMinimized(false)}
                    className="rounded-full h-14 pl-4 pr-6 shadow-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 transition-transform hover:scale-105"
                >
                    <div className="relative">
                        <MessageSquare className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-semibold text-sm">Chatting with {guideName}</span>
                        <span className="text-[10px] opacity-80 font-normal">Click to expand</span>
                    </div>
                </Button>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end pointer-events-none">
            <Card className="w-[380px] h-[600px] flex flex-col overflow-hidden shadow-2xl border-0 pointer-events-auto animate-in slide-in-from-bottom-5 fade-in ring-1 ring-black/5">
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold border border-white/20">
                                    {guideName.charAt(0)}
                                </div>
                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">{guideName}</h3>
                                <div className="flex items-center gap-1.5 text-[10px] opacity-90">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    Online • Translating
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={() => setIsMinimized(true)}>
                                <Minus className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={() => onOpenChange(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Language Selectors */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                            <span className="text-[10px] uppercase tracking-wide opacity-70 block mb-1">You</span>
                            <select
                                value={userLang}
                                onChange={(e) => setUserLang(e.target.value)}
                                className="w-full bg-transparent border-none text-sm font-semibold p-0 cursor-pointer focus:ring-0 text-white [&>option]:text-black"
                            >
                                {languages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
                            </select>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10 text-right">
                            <span className="text-[10px] uppercase tracking-wide opacity-70 block mb-1">Guide</span>
                            <select
                                value={guideLang}
                                onChange={(e) => setGuideLang(e.target.value)}
                                className="w-full bg-transparent border-none text-sm font-semibold p-0 cursor-pointer focus:ring-0 text-white text-right [&>option]:text-black"
                            >
                                {languages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-zinc-950/50">
                    {messages.map(m => (
                        <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-full`}>
                            <div className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm text-sm ${m.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-white dark:bg-zinc-800 border rounded-bl-sm'
                                }`}>
                                <p className="leading-relaxed">{m.text}</p>
                                {m.translated && (
                                    <div className={`mt-2 pt-2 border-t border-white/20 text-xs ${m.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                        <span className="font-semibold opacity-70">Translation:</span> <span className="italic block mt-0.5">{m.translated}</span>
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 px-1 opacity-70">
                                {new Date(m.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2 animate-pulse bg-white border px-3 py-2 rounded-full w-fit">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                            </div>
                            Translating...
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-3 bg-white dark:bg-zinc-900 border-t">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2 items-center bg-muted/50 rounded-full px-4 py-1.5 border focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
                    >
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="bg-transparent border-0 focus-visible:ring-0 p-0 shadow-none h-9 flex-1"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                            disabled={!input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
// Removed unused imports from the original file implicitly by not including them but they remain in the file
