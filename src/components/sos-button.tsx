"use client"
import * as React from "react"
import { AlertTriangle, Ambulance, ShieldAlert, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/toast-provider"

export function SOSButton() {
    const [open, setOpen] = React.useState(false)
    const { toast } = useToast()

    const handleEmergency = (type: string) => {
        setOpen(false)
        toast({
            title: "SOS SENT!",
            description: `Authorities/Contacts alerted for ${type}. Location shared.`,
        })
    }

    return (
        <>
            <Button
                variant="destructive"
                size="lg"
                className="fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-xl animate-pulse ring-4 ring-destructive/30 hover:scale-110 transition-all duration-200"
                onClick={() => setOpen(true)}
            >
                <span className="font-bold text-xl">SOS</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md animate-scale-in">
                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 z-50 rounded-full p-2 bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-110"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2 text-2xl animate-pulse">
                            <AlertTriangle className="h-6 w-6" /> EMERGENCY ASSISTANCE
                        </DialogTitle>
                        <DialogDescription>
                            Select the nature of your emergency. Help will be dispatched immediately.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 hover:scale-105 transition-all duration-200 animate-fade-in"
                            onClick={() => handleEmergency("Medical Emergency")}
                            style={{ animationDelay: '0.1s' }}
                        >
                            <Ambulance className="h-8 w-8" />
                            Medical
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 hover:scale-105 transition-all duration-200 animate-fade-in"
                            onClick={() => handleEmergency("Theft / Robbery")}
                            style={{ animationDelay: '0.2s' }}
                        >
                            <ShieldAlert className="h-8 w-8" />
                            Theft
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 hover:scale-105 transition-all duration-200 animate-fade-in"
                            onClick={() => handleEmergency("Harassment")}
                            style={{ animationDelay: '0.3s' }}
                        >
                            <AlertTriangle className="h-8 w-8" />
                            Harassment
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 hover:scale-105 transition-all duration-200 animate-fade-in"
                            onClick={() => handleEmergency("Lost / Stranded")}
                            style={{ animationDelay: '0.4s' }}
                        >
                            <Phone className="h-8 w-8" />
                            Lost
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="w-full hover:scale-105 transition-all duration-200"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
